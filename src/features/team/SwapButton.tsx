import type { TeamTransferPlayerMessage } from '@/types/team';
import { Button } from '@kuma-ui/core';
import { useCallback } from 'react';

type Props = {
	teamID: string;
	bluePlayer: string;
	redPlayer: string;
	sendMessage: (message: string) => Promise<void>;
};

const SwapButton = ({ teamID, bluePlayer, redPlayer, sendMessage }: Props) => {
	const handleSwapPlayer = useCallback(
		async (bluePlayer: string, redPlayer: string) => {
			const payload1: TeamTransferPlayerMessage = {
				command: 'TransferPlayer',
				id: teamID,
				name: bluePlayer,
				team: 'Red',
			};
			const payload2: TeamTransferPlayerMessage = {
				command: 'TransferPlayer',
				id: teamID,
				name: redPlayer,
				team: 'Blue',
			};
			await sendMessage(JSON.stringify(payload1));
			await sendMessage(JSON.stringify(payload2));
		},
		[teamID, sendMessage],
	);

	return (
		<Button
			height={'60px'}
			width={'100%'}
			onClick={() => {
				handleSwapPlayer(bluePlayer, redPlayer);
			}}
			background={'#64748b'}
			borderRadius={'24px'}
			border={'none'}
			outline={'none'}
			m={'10px'}
			_hover={{
				background: '#94a3b8',
			}}
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
				<title>swap</title>
				<path d="m8.707 12.707-1.414-1.414L2.586 16l4.707 4.707 1.414-1.414L6.414 17H19v-2H6.414l2.293-2.293zM15.293 11.293l1.414 1.414L21.414 8l-4.707-4.707-1.414 1.414L17.586 7H5v2h12.586l-2.293 2.293z" />
			</svg>
		</Button>
	);
};

export default SwapButton;
