import type { Lane } from '@/types/lol';
import type {
	PlayerData,
	TeamAutoAssignPlayerMessage,
	TeamPickLaneMessage,
	TeamTransferPlayerMessage,
} from '@/types/team';
import { getLaneIcon } from '@/utils/lane';
import { Box, Button, Select, Text } from '@kuma-ui/core';
import { type ChangeEvent, useCallback } from 'react';

type Props = {
	player: PlayerData;
	teamID: string;
	sendMessage: (message: string) => Promise<void>;
	listed: boolean;
};

const TeamPlayer = ({ player, teamID, sendMessage, listed }: Props) => {
	const handleLanePick = useCallback(
		(val: string) => {
			if (val === 'Top' || val === 'Jungle' || val === 'Mid' || val === 'Bot' || val === 'Support') {
				const payload: TeamPickLaneMessage = {
					command: 'PickLane',
					id: teamID,
					name: player.name,
					lane: val as Lane,
				};
				sendMessage(JSON.stringify(payload));
			}
		},
		[sendMessage, teamID, player.name],
	);

	const unassignPlayer = useCallback(() => {
		const payload: TeamTransferPlayerMessage = {
			command: 'TransferPlayer',
			id: teamID,
			name: player.name,
			team: 'Unassigned',
		};
		sendMessage(JSON.stringify(payload));
	}, [sendMessage, teamID, player.name]);

	const autoAssignPlayer = useCallback(() => {
		const payload: TeamAutoAssignPlayerMessage = {
			command: 'AutoAssignPlayer',
			id: teamID,
			name: player.name,
		};
		sendMessage(JSON.stringify(payload));
	}, [sendMessage, teamID, player.name]);

	return (
		<Box
			width={'400px'}
			display={'flex'}
			flexDirection={'row'}
			alignItems={'center'}
			justifyContent={'space-between'}
			borderRadius={'20px'}
			background={'#242424'}
			px={'20px'}
			py={'10px'}
			mb={'10px'}
		>
			<Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
				<Box
					display={'flex'}
					alignItems={'center'}
					justifyContent={'center'}
					width={'50px'}
					height={'50px'}
					borderRadius={'50%'}
				>
					{player.icon && <img src={player.icon} alt={`${player.name} icon`} width={'100%'} height={'100%'} />}
				</Box>
				<Box display={'flex'} alignItems={'center'} justifyContent={'center'} height={'50px'} pl={'10px'}>
					<Text color={'white'}>{player.name}</Text>
				</Box>
			</Box>
			<Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
				<Box display={'flex'} alignItems={'center'} justifyContent={'center'} width={'50px'} height={'50px'}>
					{getLaneIcon(player.lane)}
				</Box>
				<Box>
					<Select
						value={player.lane}
						onChange={(e: ChangeEvent<HTMLSelectElement>) => {
							handleLanePick(e.target.value);
						}}
						borderRadius={'10px'}
						p={'5px'}
						fontSize={'16px'}
						width={'100px'}
					>
						<option value={''}>Lane...</option>
						<option value={'Top'}>Top</option>
						<option value={'Jungle'}>Jungle</option>
						<option value={'Mid'}>Mid</option>
						<option value={'Bot'}>Bot</option>
						<option value={'Support'}>Support</option>
					</Select>
				</Box>
				{listed ? (
					<Box
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
						width={'50px'}
						height={'50px'}
						pl={'8px'}
					>
						<Button
							width={'100%'}
							height={'100%'}
							onClick={unassignPlayer}
							background={'#64748b'}
							borderRadius={'16px'}
							border={'none'}
							outline={'none'}
							_hover={{
								background: '#94a3b8',
							}}
						>
							<svg
								viewBox="0 0 512 512"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								xmlnsXlink="http://www.w3.org/1999/xlink"
								fill="#000000"
							>
								<title>cancel</title>
								<g id="SVGRepo_bgCarrier" strokeWidth="0" />
								<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
								<g id="SVGRepo_iconCarrier">
									{' '}
									<title>cancel</title>{' '}
									<g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
										{' '}
										<g id="work-case" fill="#000000" transform="translate(91.520000, 91.520000)">
											{' '}
											<polygon
												id="Close"
												points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"
											>
												{' '}
											</polygon>{' '}
										</g>{' '}
									</g>{' '}
								</g>
							</svg>
						</Button>
					</Box>
				) : (
					<Box
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
						width={'50px'}
						height={'50px'}
						pl={'8px'}
					>
						<Button
							width={'100%'}
							height={'100%'}
							onClick={autoAssignPlayer}
							background={'#64748b'}
							borderRadius={'16px'}
							border={'none'}
							outline={'none'}
							_hover={{
								background: '#94a3b8',
							}}
						>
							<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<title>up arrow</title>
								<g id="SVGRepo_bgCarrier" strokeWidth="0" />
								<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
								<g id="SVGRepo_iconCarrier">
									{' '}
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z"
										fill="#000000"
									/>{' '}
								</g>
							</svg>
						</Button>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default TeamPlayer;
