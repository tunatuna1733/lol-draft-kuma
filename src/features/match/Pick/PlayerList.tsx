import { Lanes } from '@/data/lane';
import { useRoomDataStore } from '@/stores/RoomData';
import type { Lane, Team } from '@/types/lol';
import { Box, Text } from '@kuma-ui/core';

const getLaneIcon = (lane: Lane | '') => {
	switch (lane) {
		case 'Top':
			return Lanes[1].icon;
		case 'Jungle':
			return Lanes[2].icon;
		case 'Mid':
			return Lanes[3].icon;
		case 'Bot':
			return Lanes[4].icon;
		case 'Support':
			return Lanes[5].icon;
		default:
			return;
	}
};

type Props = {
	team: Team;
};

const PlayerList = ({ team }: Props) => {
	const players = useRoomDataStore((state) => state.teams[team].players);

	return (
		<Box display={'flex'} flexDirection={'column'} height={'200px'} justify={'space-between'} ml={'20px'}>
			{players.map((player) => (
				<Box key={`${player.team}-${player.name}`} display={'flex'} alignItems={'center'}>
					<Box width={'30px'} height={'30px'}>
						{getLaneIcon(player.lane)}
					</Box>
					<Text ml={'5px'} my={0} color={'white'} fontSize={20}>
						{player.name}
					</Text>
				</Box>
			))}
		</Box>
	);
};

export default PlayerList;
