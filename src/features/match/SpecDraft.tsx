'use client';

import { usePhaseData } from '@/stores/PhaseData';
import { useRoomDataStore } from '@/stores/RoomData';
import type { ChampInfo } from '@/types/lol';
import type { JoinMessage } from '@/types/socket';
import useDraftSocket from '@/utils/DraftSocket';
import { useCallback, useEffect, useState } from 'react';
import DraftScreen from './DraftScreen';
import Header from './Header';

type Props = {
	roomID: string;
	champs: ChampInfo[];
};

const SpecDraft = ({ roomID, champs }: Props) => {
	const [submit, setSubmit] = useState(false);
	const [timer, setTimer] = useState(0);
	const roomData = useRoomDataStore((state) => state);
	const phaseData = usePhaseData((state) => state);
	const { sendMessage, waitForConnect } = useDraftSocket();

	useEffect(() => {
		setTimer(phaseData.remainingTime / 1000);
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

	if (typeof window !== 'undefined') {
		if (roomID && !submit) {
			console.log('Sending spec req');
			waitForConnect(() => {
				const payload: JoinMessage = {
					command: 'Join',
					name: '',
					team: 'Blue',
					isSpec: true,
					roomID,
				};
				sendMessage(JSON.stringify(payload));
				setSubmit(true);
			});
		}
	}

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
};

export default SpecDraft;
