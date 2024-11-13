import { useRoomDataStore } from '@/stores/RoomData';
import type { Team } from '@/types/lol';
import { getLaneIcon } from '@/utils/lane';
import { Box, Text } from '@kuma-ui/core';

const leafIcon = (
	<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 114.86">
		<title>leaves</title>
		<path
			fill="#01a437"
			d="M59.07,110.77C110.92,105,139.6,71.12,112.44,0c-21.29,14.9-50.39,24.6-65,44.55C57,52.94,64.89,62.23,67.08,74.37c13.19-16.08,27.63-30.72,35.23-47-7.79,39.07-20,53.84-38.78,73.81a93.64,93.64,0,0,1-4.46,9.62Zm-14.9,4C4,105-15.18,76.09,14.27,24.75c23.8,22.92,65.79,37.48,38.39,85.86a27.08,27.08,0,0,1-1.83,2.93C45.9,89.62,26.21,70.69,20.43,50.61,21.77,83.42,31.23,93,45.88,114.86c-.57,0-1.14-.06-1.71-.13Z"
		/>
	</svg>
);

type Props = {
	team: Team;
};

const PlayerList = ({ team }: Props) => {
	const players = useRoomDataStore((state) => state.teams[team].players);

	return (
		<Box display={'flex'} flexDirection={'column'} height={'200px'} justify={'space-between'} ml={'20px'}>
			{players
				.filter((player) => !player.isNPC)
				.map((player) => (
					<Box key={`${player.team}-${player.name}`} display={'flex'} alignItems={'center'}>
						<Box width={'30px'} height={'30px'}>
							{getLaneIcon(player.lane)}
						</Box>
						{player.isBeginner && (
							<Box width={'30px'} height={'30px'}>
								{leafIcon}
							</Box>
						)}
						<Text ml={'5px'} my={0} color={'white'} fontSize={20}>
							{player.name}
						</Text>
					</Box>
				))}
		</Box>
	);
};

export default PlayerList;
