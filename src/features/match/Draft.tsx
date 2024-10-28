'use client';

import { usePhaseData } from '@/stores/PhaseData';
import { useRoomDataStore } from '@/stores/RoomData';
import type { ChampInfo, Team } from '@/types/lol';
import useWebSocket from '@/utils/socket';
import { useEffect, useState } from 'react';
import InputName from './InputName';
import { Box } from '@kuma-ui/core';
import Header from './Header';
import DraftScreen from './DraftScreen';
import { setInterval, clearInterval } from 'worker-timers';

type Props = { roomID: string; team: Team; champs: ChampInfo[] };

const Draft = ({ roomID, team, champs }: Props) => {
	const [submit, setSubmit] = useState(false);
	const [timer, setTimer] = useState(0);

	const roomData = useRoomDataStore((state) => state);
	const phaseData = usePhaseData((state) => state);
	const { sendMessage } = useWebSocket();

	useEffect(() => {
		if (!phaseData.paused) {
			if (phaseData.eta !== 0) {
				setTimer((phaseData.eta - Date.now()) / 1000);
			} else {
				setTimer(30);
			}
		}
		const interval = setInterval(() => {
			if (!phaseData.paused) setTimer((prev) => prev - 0.5);
		}, 500);

		return () => {
			clearInterval(interval);
		};
	}, [phaseData]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (
			roomData.currentPhase.kind !== phaseData.kind ||
			roomData.currentPhase.team !== phaseData.team ||
			roomData.currentPhase.order !== phaseData.order
		) {
			usePhaseData.setState(roomData.currentPhase);
		}
	}, [roomData]);

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
				<Header
					team1Name={roomData.teams.Blue.name}
					team2Name={roomData.teams.Red.name}
					currentTeam={phaseData.team}
					currentKind={phaseData.kind}
					currentTime={Math.trunc(timer)}
					started={roomData.started}
					sendMessage={sendMessage}
				/>
				<DraftScreen sendMessage={sendMessage} champs={champs} />
			</>
		);
	}
	return <div>Error (Draft)</div>;
};

export default Draft;
