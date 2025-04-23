import BlueButton from '@/components/BlueButton';
import { useMyData } from '@/stores/MyData';
import { useRoomDataStore } from '@/stores/RoomData';
import type { ReadyMessage } from '@/types/socket';
import { Box, Text } from '@kuma-ui/core';
import WaitingPlayer from './WaitingPlayer';

type Props = {
	sendMessage: (message: string) => Promise<void>;
};

const WaitingList = ({ sendMessage }: Props) => {
	const roomData = useRoomDataStore((state) => state);
	const myData = useMyData((state) => state);
	const playerIndex = [0, 1, 2, 3, 4];

	return (
		<Box bg={'#121212'}>
			<Box height={'300px'} display={'flex'} flexDirection={'row'} justify={'center'} alignItems={'center'}>
				<Box display={'flex'} height={'100%'}>
					{playerIndex.map((index) => (
						<WaitingPlayer name={roomData.teams.Blue.players[index]?.name} team="Blue" key={`Blue-${index}`} />
					))}
				</Box>
				<Box height={'100%'} width={'100px'}>
					<Text>Picks</Text>
				</Box>
				<Box display={'flex'} height={'100%'}>
					{playerIndex.map((index) => (
						<WaitingPlayer name={roomData.teams.Red.players[index]?.name} team="Red" key={`Red-${index}`} />
					))}
				</Box>
			</Box>
			<Box display={'flex'} flexDirection={'row'} justify={'center'} alignItems={'center'}>
				<Box width={'50%'} display={'flex'} justify={'center'} alignItems={'center'}>
					{myData.team === 'Blue' && (
						<BlueButton
							onClick={() => {
								const payload: ReadyMessage = {
									command: 'Ready',
									isReady: true,
									roomID: roomData.id,
									team: myData.team,
								};
								sendMessage(JSON.stringify(payload));
							}}
							disabled={roomData.teams.Blue.isReady}
							props={{ fontSize: '30px', p: '15px', mr: '30px' }}
						>
							{roomData.teams.Blue.isReady ? 'Waiting for another team...' : 'Ready'}
						</BlueButton>
					)}
					{roomData.teams.Blue.isReady && (
						<Box width={'50px'} height={'50px'}>
							<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 102.97">
								<title>small-check-mark</title>
								<path
									style={{ fill: '#10a64a' }}
									className="cls-1"
									d="M4.82,69.68c-14.89-16,8-39.87,24.52-24.76,5.83,5.32,12.22,11,18.11,16.27L92.81,5.46c15.79-16.33,40.72,7.65,25.13,24.07l-57,68A17.49,17.49,0,0,1,48.26,103a16.94,16.94,0,0,1-11.58-4.39c-9.74-9.1-21.74-20.32-31.86-28.9Z"
								/>
							</svg>
						</Box>
					)}
				</Box>
				<Box width={'50%'} display={'flex'} justify={'center'} alignItems={'center'}>
					{roomData.teams.Red.isReady && (
						<Box width={'50px'} height={'50px'}>
							<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 102.97">
								<title>small-check-mark</title>
								<path
									style={{ fill: '#10a64a' }}
									className="cls-1"
									d="M4.82,69.68c-14.89-16,8-39.87,24.52-24.76,5.83,5.32,12.22,11,18.11,16.27L92.81,5.46c15.79-16.33,40.72,7.65,25.13,24.07l-57,68A17.49,17.49,0,0,1,48.26,103a16.94,16.94,0,0,1-11.58-4.39c-9.74-9.1-21.74-20.32-31.86-28.9Z"
								/>
							</svg>
						</Box>
					)}
					{myData.team === 'Red' && (
						<BlueButton
							onClick={() => {
								const payload: ReadyMessage = {
									command: 'Ready',
									isReady: true,
									roomID: roomData.id,
									team: myData.team,
								};
								sendMessage(JSON.stringify(payload));
							}}
							disabled={roomData.teams.Red.isReady}
							props={{ fontSize: '30px', p: '15px', ml: '30px' }}
						>
							{roomData.teams.Red.isReady ? 'Waiting for another team...' : 'Ready'}
						</BlueButton>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default WaitingList;
