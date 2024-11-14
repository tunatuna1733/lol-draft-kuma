'use client';

import { useTeamDataStore } from '@/stores/TeamData';
import useTeamSocket from '@/utils/TeamSocket';
import { Box, Button, Heading } from '@kuma-ui/core';
import TeamPlayer from './TeamPlayer';
import SwapButton from './SwapButton';
import { useCallback, useState } from 'react';
import type { Lane } from '@/types/lol';
import type { TeamAddPlayerMessage } from '@/types/team';
import AddPlayerModal from './AddPlayerModal';

type Props = {
	teamID: string;
};

const TeamCreator = ({ teamID }: Props) => {
	const [isModalOpen, setModalOpen] = useState(false);

	const { sendMessage } = useTeamSocket(teamID);
	const teamData = useTeamDataStore((state) => state);

	return (
		<>
			<Box width={'70%'} display={'flex'} flexDirection={'column'} justifySelf={'center'} fontFamily={'Arial'}>
				<Box display={'flex'} mt={'3%'} mb={'50px'}>
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
			<Button position={'fixed'} top={'80%'} left={'80%'} onClick={() => setModalOpen(true)}>
				Add Player
			</Button>
			{isModalOpen && (
				<AddPlayerModal teamID={teamID} sendMessage={sendMessage} closeModal={() => setModalOpen(false)} />
			)}
		</>
	);
};

export default TeamCreator;
