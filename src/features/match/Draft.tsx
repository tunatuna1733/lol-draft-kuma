'use client';

import type { ChampInfo, Team } from '@/types/lol';
import useDraftSocket from '@/utils/DraftSocket';
import { Box } from '@kuma-ui/core';
import { useState } from 'react';
import DraftScreen from './DraftScreen';
import Header from './Header';
import InputName from './InputName';
import type { JoinMessage } from '@/types/socket';
import { useMyData } from '@/stores/MyData';

type Props = { roomID: string; team: Team; champs: ChampInfo[]; bypass: boolean };

const Draft = ({ roomID, team, champs, bypass }: Props) => {
	const [submit, setSubmit] = useState(false);

	const { sendMessage, waitForConnect } = useDraftSocket();

	const setTeam = useMyData((state) => state.setTeam);

	if (typeof window !== 'undefined') {
		if (roomID && !submit && bypass) {
			waitForConnect(() => {
				const payload: JoinMessage = {
					command: 'Join',
					name: '',
					team: 'Blue',
					isSpec: false,
					roomID,
					bypass,
				};
				sendMessage(JSON.stringify(payload));
				setSubmit(true);
				setTeam(team);
			});
		}
	}

	if (!submit && (team === 'Blue' || team === 'Red')) {
		return (
			<Box display={'flex'} justify={'center'} alignItems={'center'}>
				<InputName team={team} roomID={roomID} sendMessage={sendMessage} setSubmit={setSubmit} />
			</Box>
		);
	}

	if (team === 'Blue' || team === 'Red') {
		return (
			<>
				<Header sendMessage={sendMessage} />
				<DraftScreen sendMessage={sendMessage} champs={champs} bypass={bypass} />
			</>
		);
	}
	return <div>Error (Draft)</div>;
};

export default Draft;
