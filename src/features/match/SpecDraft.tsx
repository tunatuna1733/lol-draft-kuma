'use client';

import BlueButton from '@/components/BlueButton';
import { usePhaseData } from '@/stores/PhaseData';
import { useRoomDataStore } from '@/stores/RoomData';
import type { ChampInfo } from '@/types/lol';
import type { JoinMessage } from '@/types/socket';
import useWebSocket from '@/utils/socket';
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

	const handleSubmit = useCallback(() => {
		const payload: JoinMessage = {
			command: 'Join',
			name: '',
			team: 'Blue',
			isSpec: true,
			roomID,
		};
		sendMessage(JSON.stringify(payload));
		setSubmit(true);
	}, [sendMessage, roomID]);

	if (!submit) {
		return <BlueButton onClick={handleSubmit}>Join as Spec</BlueButton>;
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
				sendMessage={sendMessage}
			/>
			<DraftScreen sendMessage={sendMessage} champs={champs} />
		</>
	);
};

export default SpecDraft;
