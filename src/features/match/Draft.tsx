'use client';

import { usePhaseData } from '@/stores/PhaseData';
import { useRoomDataStore } from '@/stores/RoomData';
import type { ChampInfo, Team } from '@/types/lol';
import useDraftSocket from '@/utils/DraftSocket';
import { Box } from '@kuma-ui/core';
import { useEffect, useState } from 'react';
import { clearInterval, setInterval } from 'worker-timers';
import DraftScreen from './DraftScreen';
import Header from './Header';
import InputName from './InputName';

type Props = { roomID: string; team: Team; champs: ChampInfo[] };

const Draft = ({ roomID, team, champs }: Props) => {
	const [submit, setSubmit] = useState(false);
	const [timer, setTimer] = useState(0);

	const roomData = useRoomDataStore((state) => state);
	const phaseData = usePhaseData((state) => state);
	const { sendMessage } = useDraftSocket();

	useEffect(() => {
		// if (!phaseData.paused) {
		// if (phaseData.eta !== 0) {
		setTimer(phaseData.remainingTime / 1000);
		// } else {
		// 	setTimer(30);
		// }
		// }
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
					ended={roomData.ended}
					sendMessage={sendMessage}
				/>
				<DraftScreen sendMessage={sendMessage} champs={champs} />
			</>
		);
	}
	return <div>Error (Draft)</div>;
};

export default Draft;
