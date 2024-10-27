import type { Team } from '@/types/lol';
import { Box, Text } from '@kuma-ui/core';
import ToggleButton from './ToggleButton';

type Props = {
	team1Name: string;
	team2Name: string;
	currentTeam?: Team;
	currentKind?: 'Ban' | 'Pick';
	currentTime: number;
	started: boolean;
	sendMessage: (message: string) => Promise<void>;
};

const Header = ({ team1Name, team2Name, currentTeam, currentKind, currentTime, started, sendMessage }: Props) => {
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
				<Box display={'flex'} width={'100%'} height={'90px'}>
					<Box width={'60%'} display={'flex'} alignItems={'center'}>
						<Text
							color={'white'}
							fontSize={60}
							my={'auto'}
							ml={'10%'}
							fontFamily={'Arial'}
							textShadow={'3px 5px 6px rgba(0, 60, 255, 1)'}
						>
							{team1Name}
						</Text>
					</Box>
					<Box width={'40%'} display={'flex'} justify={'right'} alignItems={'center'}>
						<Text color={'white'} fontSize={60} my={'auto'} fontFamily={'Arial'} mr={'50px'}>
							{started && currentTeam === 'Blue' ? `${currentKind} ${currentTime}s` : ''}
						</Text>
					</Box>
				</Box>
				{started && currentTeam === 'Blue' ? (
					<Box width={'100%'} height={'10px'} position={'relative'} overflow={'hidden'} transform={'scaleX(-1)'}>
						<Box
							height={'100%'}
							background={'#1e40af'}
							position={'absolute'}
							width={`${(currentTime / 30) * 100}%`}
							transition={'width 1s linear'}
						/>
					</Box>
				) : (
					<></>
				)}
			</Box>
			<Box width={'100%'} height={'100px'}>
				{started && <ToggleButton sendMessage={sendMessage} />}
			</Box>
			<Box width={'100%'}>
				<Box display={'flex'} width={'100%'} height={'90px'}>
					<Box width={'40%'} display={'flex'} alignItems={'center'}>
						<Text color={'white'} fontSize={60} my={'auto'} fontFamily={'Arial'} ml={'50px'}>
							{started && currentTeam === 'Red' ? `${currentKind} ${currentTime}s` : ''}
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
							{team2Name}
						</Text>
					</Box>
				</Box>
				{started && currentTeam === 'Red' ? (
					<Box width={'100%'} height={'10px'} position={'relative'} overflow={'hidden'}>
						<Box
							height={'100%'}
							background={'#991b1b'}
							position={'absolute'}
							width={`${(currentTime / 30) * 100}%`}
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
