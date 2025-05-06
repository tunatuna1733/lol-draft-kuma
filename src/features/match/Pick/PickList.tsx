import { usePhaseData } from '@/stores/PhaseData';
import { useRoomDataStore } from '@/stores/RoomData';
import type { ChampInfo } from '@/types/lol';
import type { DraftImageMessage } from '@/types/socket';
import { Box, Text } from '@kuma-ui/core';
import { toPng } from 'html-to-image';
import { useEffect, useRef, useState } from 'react';
import Ban from './Ban';
import Player from './Player';
import PlayerList from './PlayerList';

const filter = (node: HTMLElement) => {
	const exclusionClasses = ['div-bar'];
	return !exclusionClasses.some((classname) => node.classList?.contains(classname));
};

type Props = {
	sendMessage: (message: string) => Promise<void>;
	champs: ChampInfo[];
};

const PickList = ({ sendMessage, champs }: Props) => {
	const roomData = useRoomDataStore((state) => state);
	const phaseData = usePhaseData((state) => state);
	const ref = useRef<HTMLDivElement>(null);
	const [imageSent, setImageSent] = useState(false);

	useEffect(() => {
		if (roomData.ended && ref.current && !imageSent) {
			toPng(ref.current, { cacheBust: true, includeQueryParams: true, filter }).then((dataUrl) => {
				const payload: DraftImageMessage = {
					command: 'DraftImage',
					roomID: roomData.id,
					image: dataUrl,
					channelId: roomData.channelId,
					fearlessId: roomData.fearlessId,
				};
				sendMessage(JSON.stringify(payload));
				setImageSent(true);
			});
		}
	}, [roomData.ended, roomData.id, roomData.channelId, roomData.fearlessId, sendMessage, imageSent]);

	return (
		<Box height={'520px'} bg={'#121212'} ref={ref}>
			<Box display={'flex'} flexDirection={'column'}>
				{/* Pick */}
				<Box height={'300px'} display={'flex'} flexDirection={'row'} justify={'center'} alignItems={'center'}>
					<Box display={'flex'} flexDirection={'row'} height={'100%'}>
						{roomData.teams.Blue.players.map((player, index) => (
							<Box display={'flex'} key={`Blue-Pick-${index}-${player.name}`}>
								<Player
									team="Blue"
									champID={player.champ}
									champName={champs.find((c) => c.id === player.champ)?.name || ''}
									inFocus={
										phaseData.kind === 'Pick' &&
										phaseData.team === 'Blue' &&
										phaseData.order === index + 1 &&
										!roomData.ended
									}
									selectedChampID={roomData.selectedChamp}
									selectedChampName={champs.find((c) => c.id === roomData.selectedChamp)?.name || ''}
								/>
								{index !== 0 && (
									<Box
										position={'absolute'}
										width={'4px'}
										height={300}
										bg={'#9ca3af'}
										ml={'-2px'}
										className="div-bar"
									/>
								)}
							</Box>
						))}
					</Box>
					<Box height={'100%'} width={'100px'}>
						<Text textAlign={'center'} color={'white'} fontFamily={'Arial'} fontSize={'x-large'}>
							Picks
						</Text>
					</Box>
					<Box display={'flex'} flexDirection={'row'} height={'100%'}>
						{roomData.teams.Red.players.map((player, index) => (
							<Box display={'flex'} key={`Red-Pick-${index}-${player.name}`}>
								<Player
									team="Red"
									champID={player.champ}
									champName={champs.find((c) => c.id === player.champ)?.name || ''}
									inFocus={
										phaseData.kind === 'Pick' &&
										phaseData.team === 'Red' &&
										phaseData.order === index + 1 &&
										!roomData.ended
									}
									selectedChampID={roomData.selectedChamp}
									selectedChampName={champs.find((c) => c.id === roomData.selectedChamp)?.name || ''}
								/>
								{index !== 0 && (
									<Box
										position={'absolute'}
										width={'4px'}
										height={300}
										bg={'#9ca3af'}
										ml={'-2px'}
										className="div-bar"
									/>
								)}
							</Box>
						))}
					</Box>
				</Box>
				{/* Ban */}
				<Box height={'300px'} display={'flex'} flexDirection={'row'} justify={'center'} mt={'20px'}>
					<Box width={'15%'}>
						<PlayerList team="Blue" />
					</Box>
					<Box display={'flex'} flexDirection={'row'} height={'100%'}>
						{roomData.teams.Blue.bans.map((ban, index) => (
							<Box display={'flex'} key={`Blue-Ban-${index}-${ban}`}>
								<Ban
									team="Blue"
									champID={ban}
									champName={champs.find((c) => c.id === ban)?.name || ''}
									inFocus={
										phaseData.kind === 'Ban' &&
										phaseData.team === 'Blue' &&
										phaseData.order === index + 1 &&
										!roomData.ended
									}
									selectedChampID={roomData.selectedChamp}
									selectedChampName={champs.find((c) => c.id === roomData.selectedChamp)?.name || ''}
								/>
								{index !== 0 && (
									<Box
										position={'absolute'}
										width={'4px'}
										height={200}
										bg={'#9ca3af'}
										ml={'-2px'}
										className="div-bar"
									/>
								)}
							</Box>
						))}
					</Box>
					<Box height={'100%'} width={'100px'}>
						<Text textAlign={'center'} color={'white'} fontFamily={'Arial'} fontSize={'x-large'}>
							Bans
						</Text>
					</Box>
					<Box display={'flex'} flexDirection={'row'} height={'100%'}>
						{roomData.teams.Red.bans.map((ban, index) => (
							<Box display={'flex'} key={`Red-Ban-${index}-${ban}`}>
								<Ban
									team="Red"
									champID={ban}
									champName={champs.find((c) => c.id === ban)?.name || ''}
									inFocus={
										phaseData.kind === 'Ban' &&
										phaseData.team === 'Red' &&
										phaseData.order === index + 1 &&
										!roomData.ended
									}
									selectedChampID={roomData.selectedChamp}
									selectedChampName={champs.find((c) => c.id === roomData.selectedChamp)?.name || ''}
								/>
								{index !== 0 && (
									<Box
										position={'absolute'}
										width={'4px'}
										height={200}
										bg={'#9ca3af'}
										ml={'-2px'}
										className="div-bar"
									/>
								)}
							</Box>
						))}
					</Box>
					<Box width={'15%'}>
						<PlayerList team="Red" />
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default PickList;
