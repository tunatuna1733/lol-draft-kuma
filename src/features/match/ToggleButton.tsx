import { usePhaseData } from '@/stores/PhaseData';
import { useRoomDataStore } from '@/stores/RoomData';
import type { ToggleMessage } from '@/types/socket';
import { Button } from '@kuma-ui/core';
import Image from 'next/image';
import { useCallback } from 'react';

type Props = {
	sendMessage: (message: string) => Promise<void>;
};

const pauseIconUrl =
	'https://raw.githubusercontent.com/google/material-design-icons/refs/heads/master/src/av/pause/materialicons/24px.svg';
const playIconUrl =
	'https://raw.githubusercontent.com/google/material-design-icons/refs/heads/master/src/av/play_arrow/materialicons/24px.svg';

const ToggleButton = ({ sendMessage }: Props) => {
	const paused = usePhaseData((state) => state.paused);
	const roomID = useRoomDataStore((state) => state.id);

	const handleToggle = useCallback(() => {
		const payload: ToggleMessage = {
			command: 'Toggle',
			isPause: !paused,
			roomID,
		};
		sendMessage(JSON.stringify(payload));
	}, [paused, roomID, sendMessage]);

	return (
		<Button
			width={'100%'}
			height={'100%'}
			onClick={handleToggle}
			border={'none'}
			outline={'none'}
			p={0}
			m={0}
			bg={'none'}
			_hover={{ bg: '#1f2937' }}
		>
			<Image
				width={100}
				height={100}
				alt={`${paused ? 'Play' : 'Pause'}`}
				src={paused ? playIconUrl : pauseIconUrl}
				style={{ filter: 'invert(100%) sepia(100%) saturate(0%) hue-rotate(271deg) brightness(105%) contrast(101%)' }}
			/>
		</Button>
	);
};

export default ToggleButton;
