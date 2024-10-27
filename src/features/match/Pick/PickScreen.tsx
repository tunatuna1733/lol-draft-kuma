'use client';

import type { ChampInfo, Lane } from '@/types/lol';
import { type ChangeEvent, memo, useCallback, useEffect, useMemo, useState } from 'react';
import SelectChamp from './SelectChamp';
import type {
	PickBanChampMessage,
	PickChampMessage,
	PickLaneMessage,
	SelectBanChampMessage,
	SelectChampMessage,
} from '@/types/socket';
import useDebounce from '@/utils/debounce';
import { Lanes } from '@/data/lane';
import { useRoomDataStore } from '@/stores/RoomData';
import { usePhaseData } from '@/stores/PhaseData';
import type { PhaseData } from '@/types/room';
import PickList from './PickList';
import { useMyData } from '@/stores/MyData';
import { Box, Button, Grid, Heading, Select, Text } from '@kuma-ui/core';
import TextInput from '@/components/TextInput';
import BlueButton from '@/components/BlueButton';

const getPhaseText = (phaseData: PhaseData) => {
	return `${phaseData.kind}-${phaseData.team}-${phaseData.order}`;
};

type Props = {
	sendMessage: (message: string) => Promise<void>;
	champs: ChampInfo[];
};

const PickScreen = ({ sendMessage, champs }: Props) => {
	const [selectedLane, setSelectedLane] = useState<Lane | 'All'>('All');
	const [selectedChampID, setSelectedChampID] = useState<string>();
	const [searchString, setSearchString] = useState('');
	const debouncedText = useDebounce(searchString, 500);

	const [myLane, setMyLane] = useState<Lane>();

	const { team, name, isSpec } = useMyData((state) => state);
	const { teams, id } = useRoomDataStore((state) => state);
	const phaseData = usePhaseData((state) => state);

	const [phaseText, setPhaseText] = useState(`${phaseData.kind}-${phaseData.team}-${phaseData.order}`);

	const bans = [
		...Object.values(teams).flatMap((t) => t.bans),
		...Object.values(teams).flatMap((t) => t.players.map((p) => p.champ)),
	];

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const pt = getPhaseText(phaseData);
		if (pt !== phaseText) {
			setSelectedChampID(undefined);
			setPhaseText(pt);
		}
	}, [phaseData]);

	useEffect(() => {
		filterChamps(debouncedText, selectedLane);
	}, [debouncedText, selectedLane]);

	const filterChamps = useCallback(
		(input: string, lane: Lane | 'All') => {
			return champs.filter(
				(c) => (lane === 'All' || c.lanes.includes(lane)) && (input !== '' ? c.name.includes(input) : true),
			);
		},
		[champs],
	);

	const filteredChamps = useMemo(
		() => filterChamps(debouncedText, selectedLane),
		[filterChamps, debouncedText, selectedLane],
	);

	const handleChampSelect = useCallback(
		(champID: string) => {
			setSelectedChampID(champID);
			if (phaseData.kind === 'Ban') {
				const payload: SelectBanChampMessage = {
					command: 'SelectBanChamp',
					champ: champID,
					team,
					order: phaseData.order,
					roomID: id,
				};
				sendMessage(JSON.stringify(payload));
				return;
			}
			const payload: SelectChampMessage = {
				command: 'SelectChamp',
				champ: champID,
				team,
				order: phaseData.order,
				roomID: id,
			};
			sendMessage(JSON.stringify(payload));
		},
		[phaseData.kind, team, phaseData.order, id, sendMessage],
	);

	const handleChampPick = useCallback(
		(champID: string) => {
			if (phaseData.kind === 'Ban') {
				const payload: PickBanChampMessage = {
					command: 'PickBanChamp',
					champ: champID,
					team,
					order: phaseData.order,
					roomID: id,
				};
				sendMessage(JSON.stringify(payload));
				return;
			}
			const payload: PickChampMessage = {
				command: 'PickChamp',
				champ: champID,
				team,
				order: phaseData.order,
				roomID: id,
			};
			sendMessage(JSON.stringify(payload));
		},
		[phaseData.kind, team, phaseData.order, id, sendMessage],
	);

	const handleLanePick = useCallback(
		(val: string) => {
			if (val === 'Top' || val === 'Jungle' || val === 'Mid' || val === 'Bot' || val === 'Support') {
				setMyLane(val);
				const payload: PickLaneMessage = {
					command: 'PickLane',
					name,
					team,
					roomID: id,
					lane: val as Lane,
				};
				sendMessage(JSON.stringify(payload));
			}
		},
		[sendMessage, name, team, id],
	);

	if (isSpec) {
		return <PickList champs={champs} />;
	}

	return (
		<>
			<Box display={'flex'} flexDirection={'column'} width={'100%'} justify={'center'} alignItems={'center'} gap={10}>
				<PickList champs={champs} />
				<Box
					width={'60%'}
					display={'flex'}
					justify={'space-between'}
					height={'100px'}
					position={'sticky'}
					top={'100px'}
					left={'20%'}
					bg={'#121212'}
					zIndex={5}
				>
					{Lanes.map((lane) => (
						<Button
							key={lane.name}
							onClick={() => setSelectedLane(lane.name)}
							bg={'none'}
							border={'none'}
							outline={'none'}
						>
							<Box
								width={'80px'}
								height={'80px'}
								display={'flex'}
								flexDirection={'column'}
								justify={'center'}
								alignItems={'center'}
							>
								{lane.icon}
								<Text textAlign={'center'} fontSize={20} m={0} color={selectedLane === lane.name ? '#2563eb' : 'white'}>
									{lane.name}
								</Text>
							</Box>
						</Button>
					))}
				</Box>
				<Box my={30}>
					<TextInput id="champ-search" label="チャンピオン検索" value={searchString} setValue={setSearchString} />
				</Box>
				<Grid display={'grid'} width={'60%'} gridTemplateColumns={'repeat(6, 1fr)'} gap={15}>
					{filteredChamps.map((champ) => (
						<Box key={champ.id} display={'flex'} justify={'center'}>
							<SelectChamp
								info={champ}
								selected={selectedChampID === champ.id}
								onClick={() => handleChampSelect(champ.id)}
								disabled={phaseData.team !== team}
								banned={bans.includes(champ.id)}
							/>
						</Box>
					))}
				</Grid>
			</Box>
			<BlueButton
				onClick={() => handleChampPick(selectedChampID || '')}
				disabled={!selectedChampID || phaseData.team !== team}
				props={{
					top: '85%',
					left: '85%',
					position: 'fixed',
					width: '150px',
					height: '60px',
					fontSize: 30,
				}}
			>
				LOCK IN
			</BlueButton>
			<Box position={'fixed'} top={'80%'} left={'5%'} display={'flex'} flexDirection={'column'}>
				<Heading as="h2" color={'white'} mb={0}>
					Lane select
				</Heading>
				<Select
					value={myLane}
					onChange={(e: ChangeEvent<HTMLSelectElement>) => {
						handleLanePick(e.target.value);
					}}
					borderRadius={'10px'}
					p={'5px'}
					mt={'5px'}
					fontSize={'20px'}
					width={'200px'}
				>
					<option value={'Top'}>Top</option>
					<option value={'Jungle'}>Jungle</option>
					<option value={'Mid'}>Mid</option>
					<option value={'Bot'}>Bot</option>
					<option value={'Support'}>Top</option>
				</Select>
			</Box>
		</>
	);
};

export default memo(PickScreen);
