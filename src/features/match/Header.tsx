import { Box, Text } from '@kuma-ui/core';
import ToggleButton from './ToggleButton';
import { usePhaseData } from '@/stores/PhaseData';
import { useRoomDataStore } from '@/stores/RoomData';
import { useEffect, useState } from 'react';
import { clearInterval, setInterval } from 'worker-timers';
import { useMyData } from '@/stores/MyData';

type Props = {
	sendMessage: (message: string) => Promise<void>;
};

const Header = ({ sendMessage }: Props) => {
	const [timer, setTimer] = useState(0);
	const roomData = useRoomDataStore((state) => state);
	const phaseData = usePhaseData((state) => state);
	const myTeam = useMyData((state) => state.team);

	useEffect(() => {
		setTimer(phaseData.remainingTime / 1000);
		const interval = setInterval(() => {
			if (!phaseData.paused) setTimer((prev) => prev - 0.5);
		}, 500);

		return () => {
			clearInterval(interval);
		};
	}, [phaseData]);

	return (
		<Box
			display={'grid'}
			width={'100%'}
			height={'100px'}
			position={'sticky'}
			bg={'#121212'}
			zIndex={100}
			top={0}
			left={0}
			gridTemplateColumns={'1fr 100px 1fr'}
		>
			<Box width={'100%'}>
				<Box
					display={'flex'}
					width={'100%'}
					height={'90px'}
					background={myTeam === 'Blue' ? 'rgb(20 20 240 / 0.2)' : ''}
				>
					<Box width={'60%'} display={'flex'} alignItems={'center'}>
						<Text
							color={'white'}
							fontSize={60}
							my={'auto'}
							ml={'10%'}
							fontFamily={'Arial'}
							textShadow={'3px 5px 6px rgba(0, 60, 255, 1)'}
						>
							{roomData.teams.Blue.name}
						</Text>
					</Box>
					<Box width={'40%'} display={'flex'} justify={'right'} alignItems={'center'}>
						<Text color={'white'} fontSize={60} my={'auto'} fontFamily={'Arial'} mr={'50px'}>
							{roomData.started && !roomData.ended && phaseData.team === 'Blue'
								? `${phaseData.kind} ${Math.trunc(timer)}s`
								: ''}
						</Text>
					</Box>
				</Box>
				{roomData.started && !roomData.ended && phaseData.team === 'Blue' ? (
					<Box width={'100%'} height={'10px'} position={'relative'} overflow={'hidden'} transform={'scaleX(-1)'}>
						<Box
							height={'100%'}
							background={'#1e40af'}
							position={'absolute'}
							width={`${(Math.trunc(timer) / 30) * 100}%`}
							transition={'width 1s linear'}
						/>
					</Box>
				) : (
					<></>
				)}
			</Box>
			<Box width={'100%'} height={'100px'}>
				{roomData.started && !roomData.ended && <ToggleButton sendMessage={sendMessage} />}
			</Box>
			<Box width={'100%'}>
				<Box
					display={'flex'}
					width={'100%'}
					height={'90px'}
					background={myTeam === 'Red' ? 'rgb(240 20 20 / 0.1)' : ''}
				>
					<Box width={'40%'} display={'flex'} alignItems={'center'}>
						<Text color={'white'} fontSize={60} my={'auto'} fontFamily={'Arial'} ml={'50px'}>
							{roomData.started && !roomData.ended && phaseData.team === 'Red'
								? `${phaseData.kind} ${Math.trunc(timer)}s`
								: ''}
						</Text>
					</Box>
					<Box width={'60%'} display={'flex'} justify={'right'} alignItems={'center'}>
						<Text
							color={'white'}
							fontSize={60}
							my={'auto'}
							mr={'10%'}
							fontFamily={'Arial'}
							textShadow={'3px 5px 6px rgba(255, 60, 0, 1)'}
						>
							{roomData.teams.Red.name}
						</Text>
					</Box>
				</Box>
				{roomData.started && !roomData.ended && phaseData.team === 'Red' ? (
					<Box width={'100%'} height={'10px'} position={'relative'} overflow={'hidden'}>
						<Box
							height={'100%'}
							background={'#991b1b'}
							position={'absolute'}
							width={`${(Math.trunc(timer) / 30) * 100}%`}
							transition={'width 1s linear'}
						/>
					</Box>
				) : (
					<></>
				)}
			</Box>
		</Box>
	);
};

export default Header;
