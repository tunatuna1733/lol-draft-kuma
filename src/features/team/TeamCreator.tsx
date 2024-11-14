'use client';

import { useTeamDataStore } from '@/stores/TeamData';
import useTeamSocket from '@/utils/TeamSocket';
import { Box, Button, Heading, Text } from '@kuma-ui/core';
import TeamPlayer from './TeamPlayer';
import { useCallback } from 'react';
import type { Team } from '@/types/lol';
import type { TeamTransferPlayerMessage } from '@/types/team';
import SwapButton from './SwapButton';

type Props = {
	teamID: string;
};

const TeamCreator = ({ teamID }: Props) => {
	const { sendMessage } = useTeamSocket(teamID);
	const teamData = useTeamDataStore((state) => state);

	return (
		<>
			<Box width={'70%'} display={'flex'} flexDirection={'column'} justifySelf={'center'}>
				<Box display={'flex'} mt={'10%'} mb={'50px'}>
					<Box>
						<Heading color={'white'}>Blue Team</Heading>
						<Box display={'flex'}>
							<Box
								id="blue-list-box"
								width={'500px'}
								minHeight={'400px'}
								background={'#0c4a6e88'}
								borderRadius={'30px'}
								pt={'10px'}
								display={'flex'}
								flexDirection={'column'}
								alignItems={'center'}
							>
								{teamData.Blue.map((b, i) => (
									<TeamPlayer
										key={`${b.name}-${i}`}
										player={b}
										teamID={teamID}
										sendMessage={sendMessage}
										listed={true}
									/>
								))}
							</Box>
							<Box
								id="blue-arrow-buttons"
								width={'100px'}
								display={'flex'}
								flexDirection={'column'}
								px={'15px'}
								pt={'10px'}
								alignItems={'center'}
							>
								{Array.from({ length: teamData.Blue.length }, (_, i) => i).map((index) => (
									<SwapButton
										teamID={teamID}
										name={teamData.Blue[index].name}
										team={'Red'}
										sendMessage={sendMessage}
										key={index}
									/>
								))}
							</Box>
						</Box>
					</Box>
					<Box id="swap-buttons" width={'200px'}>
						To be added
					</Box>
					<Box>
						<Heading color={'white'} pl={'130px'}>
							Red Team
						</Heading>
						<Box display={'flex'}>
							<Box
								id="red-arrow-buttons"
								width={'100px'}
								display={'flex'}
								flexDirection={'column'}
								px={'15px'}
								pt={'10px'}
								alignItems={'center'}
							>
								{Array.from({ length: teamData.Red.length }, (_, i) => i).map((index) => (
									<SwapButton
										teamID={teamID}
										name={teamData.Red[index].name}
										team={'Blue'}
										sendMessage={sendMessage}
										key={index}
									/>
								))}
							</Box>
							<Box>
								<Box
									id="red-list-box"
									width={'500px'}
									minHeight={'400px'}
									background={'#7f1d1d88'}
									borderRadius={'30px'}
									pt={'10px'}
									display={'flex'}
									flexDirection={'column'}
									alignItems={'center'}
								>
									{teamData.Red.map((r, i) => (
										<TeamPlayer
											key={`${r.name}-${i}`}
											player={r}
											teamID={teamID}
											sendMessage={sendMessage}
											listed={true}
										/>
									))}
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
				<Box px={'10%'}>
					<Heading color={'white'}>Players</Heading>
					{Array.from({ length: Math.trunc(teamData.Unassigned.length / 2 + 0.5) }, (_, i) => i).map((index) => (
						<Box key={index} display={'flex'} justifyContent={'space-between'}>
							{Array.from({ length: 2 }, (_, ii) => ii).map((internalIndex) => {
								if (teamData.Unassigned[index * 2 + internalIndex]) {
									return (
										<TeamPlayer
											player={teamData.Unassigned[index * 2 + internalIndex]}
											teamID={teamID}
											sendMessage={sendMessage}
											listed={false}
											key={index * 2 + internalIndex}
										/>
									);
								}
							})}
						</Box>
					))}
				</Box>
			</Box>
		</>
	);
};

export default TeamCreator;
