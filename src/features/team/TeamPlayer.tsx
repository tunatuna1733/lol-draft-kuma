import type { PlayerData } from '@/types/team';
import { getLaneIcon } from '@/utils/lane';
import { Box, Text } from '@kuma-ui/core';

type Props = {
	player: PlayerData;
	disabled: boolean;
};

const TeamPlayer = ({ player, disabled }: Props) => {
	return (
		<Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
			<Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
				<Box display={'flex'} alignItems={'center'} justifyContent={'center'} width={'80px'} height={'80px'}>
					<img src={player.icon} alt={`${player.name} icon`} />
				</Box>
				<Box display={'flex'} alignItems={'center'} justifyContent={'center'} height={'80px'}>
					<Text>{player.name}</Text>
				</Box>
			</Box>
			<Box display={'flex'} alignItems={'center'} justifyContent={'center'} width={'80px'} height={'80px'}>
				{getLaneIcon(player.lane)}
			</Box>
		</Box>
	);
};

export default TeamPlayer;
