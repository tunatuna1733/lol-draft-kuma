'use client';

import BlueButton from '@/components/BlueButton';
import CopyButton from '@/components/CopyButton';
import TextInput from '@/components/TextInput';
import { Box } from '@kuma-ui/core';
import { useState } from 'react';

const sendCreateRoomRequest = async (matchName: string, team1Name: string, team2Name: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_WEBSOCKET_HOST || ''}/createRoom?matchName=${matchName}&team1Name=${team1Name}&team2Name=${team2Name}`,
		{ method: 'POST' },
	);
	const resJson: { id: string } = await res.json();
	return resJson.id;
};

const InputTeam = () => {
	const [matchName, setMatchName] = useState('');
	const [team1Name, setTeam1Name] = useState('Team 1');
	const [team2Name, setTeam2Name] = useState('Team 2');
	const [matchID, setMatchID] = useState<string>();

	if (!matchID) {
		return (
			<Box width="60%" display={'flex'} flexDirection={'column'} gap={10} mt={'50px'}>
				<TextInput
					id="match-name-input"
					label="Match name"
					placeholder="Match name"
					value={matchName}
					setValue={setMatchName}
					inputProps={{ borderColor: '#6b7280' }}
				/>
				<Box display="flex" flexDirection="row" width="100%" justify="space-between" alignItems="center">
					<Box width="40%" display="flex" flexDirection="column">
						<TextInput id="team1-name-input" label="Team1 name" value={team1Name} setValue={setTeam1Name} />
					</Box>
					<Box width="40%" display="flex" flexDirection="column">
						<TextInput
							id="team2-name-input"
							label="Team2 name"
							value={team2Name}
							setValue={setTeam2Name}
							inputProps={{ borderColor: '#991b1b' }}
						/>
					</Box>
				</Box>
				<Box display="flex" width="100%" justify="center" alignItems="center">
					<BlueButton
						onClick={async () => {
							const id = await sendCreateRoomRequest(matchName, team1Name, team2Name);
							setMatchID(id);
						}}
					>
						Create Room
					</BlueButton>
				</Box>
			</Box>
		);
	}

	return (
		<Box width="60%" display={'flex'} flexDirection={'column'} gap={10} mt={'50px'}>
			<Box display={'flex'} justify={'space-between'} alignItems={'center'}>
				<Box display={'flex'} flexDirection={'column'} width={'90%'}>
					<TextInput
						id="team1-name"
						label={team1Name}
						value={`${window.location}/${matchID}?team=Blue`}
						isReadOnly={true}
						inputProps={{ background: '#3b82f633' }}
					/>
				</Box>
				<Box width={'50px'} height={'50px'} display={'flex'} alignItems={'center'} mt={'20px'}>
					<CopyButton text={`${window.location}/${matchID}?team=Blue`} />
				</Box>
			</Box>
			<Box display={'flex'} justify={'space-between'} alignItems={'center'} mt={'50px'}>
				<Box display={'flex'} flexDirection={'column'} width={'90%'}>
					<TextInput
						id="team2-name"
						label={team2Name}
						value={`${window.location}/${matchID}?team=Red`}
						isReadOnly={true}
						inputProps={{ background: '#ef444433' }}
					/>
				</Box>
				<Box width={'50px'} height={'50px'} display={'flex'} alignItems={'center'} mt={'20px'}>
					<CopyButton text={`${window.location}/${matchID}?team=Red`} />
				</Box>
			</Box>
			<Box display={'flex'} justify={'space-between'} alignItems={'center'} mt={'50px'}>
				<Box display={'flex'} flexDirection={'column'} width={'90%'}>
					<TextInput
						id="spectator"
						label={'Spectator'}
						value={`${window.location}/${matchID}`}
						isReadOnly={true}
						inputProps={{ background: '#37415133' }}
					/>
				</Box>
				<Box width={'50px'} height={'50px'} display={'flex'} alignItems={'center'} mt={'20px'}>
					<CopyButton text={`${window.location}/${matchID}`} />
				</Box>
			</Box>
		</Box>
	);
};

export default InputTeam;
