import { useRoomDataStore } from '@/stores/RoomData';
import { Box, Text } from '@kuma-ui/core';
import WaitingPlayer from './WaitingPlayer';

const WaitingList = () => {
	const roomData = useRoomDataStore((state) => state);
	const playerIndex = [0, 1, 2, 3, 4];

	return (
		<Box height={'500px'} bg={'#121212'}>
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
		</Box>
	);
};

export default WaitingList;
