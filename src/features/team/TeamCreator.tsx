'use client';

import BlueButton from '@/components/BlueButton';
import { useTeamDataStore } from '@/stores/TeamData';
import type { TeamCreateDraftMessage } from '@/types/team';
import useTeamSocket from '@/utils/TeamSocket';
import { Box, Heading } from '@kuma-ui/core';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import AddPlayerModal from './AddPlayerModal';
import SwapButton from './SwapButton';
import TeamPlayer from './TeamPlayer';
import TransferButton from './TransferButton';

type Props = {
	teamID: string;
};

const TeamCreator = ({ teamID }: Props) => {
	const [isModalOpen, setModalOpen] = useState(false);

	const { sendMessage } = useTeamSocket(teamID);
	const teamData = useTeamDataStore((state) => state);
	const isReady = teamData.Blue.length === 5 && teamData.Red.length === 5;

	const handleCreateDraft = useCallback(async () => {
		const payload: TeamCreateDraftMessage = {
			command: 'CreateDraft',
			id: teamID,
		};
		sendMessage(JSON.stringify(payload));
	}, [teamID, sendMessage]);

	return (
		<>
			<Box width={'70%'} display={'flex'} flexDirection={'column'} justifySelf={'center'} fontFamily={'Arial'}>
				<Box display={'flex'} mt={'3%'} mb={'50px'}>
					<Box>
						<Box display={'flex'}>
							<Heading color={'white'}>Blue Team</Heading>
							{teamData.draftId !== '' && (
								<BlueButton props={{ m: 10, ml: 30 }}>
									<Link
										href={`/draft/${teamData.draftId}?team=Blue&bypass=true`}
										style={{ textDecoration: 'none', color: 'white', fontSize: 30 }}
									>
										Join Draft
									</Link>
								</BlueButton>
							)}
						</Box>
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
									<TransferButton
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
					<Box>
						<Heading visibility={'hidden'}>a</Heading>
						<Box
							id="swap-buttons"
							width={'100px'}
							display={'flex'}
							flexDirection={'column'}
							px={'15px'}
							pt={'10px'}
							alignItems={'center'}
						>
							{Array.from({ length: Math.min(teamData.Blue.length, teamData.Red.length) }, (_, i) => i).map((index) => (
								<SwapButton
									teamID={teamID}
									bluePlayer={teamData.Blue[index].name}
									redPlayer={teamData.Red[index].name}
									sendMessage={sendMessage}
									key={index}
								/>
							))}
						</Box>
					</Box>
					<Box>
						<Box display={'flex'}>
							<Heading color={'white'} pl={'130px'}>
								Red Team
							</Heading>
							{teamData.draftId !== '' && (
								<BlueButton props={{ m: 10, ml: 30, background: 'red', _hover: { background: 'darkred' } }}>
									<Link
										href={`/draft/${teamData.draftId}?team=Red&bypass=true`}
										style={{ textDecoration: 'none', color: 'white', fontSize: 30 }}
									>
										Join Draft
									</Link>
								</BlueButton>
							)}
						</Box>
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
									<TransferButton
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
			<BlueButton props={{ position: 'fixed', top: '80%', left: '80%' }} onClick={() => setModalOpen(true)}>
				Add Player
			</BlueButton>
			{isReady && teamData.draftId === '' && (
				<BlueButton
					props={{ position: 'fixed', top: '80%', left: '5%', fontSize: 30, p: '20px' }}
					onClick={async () => {
						await handleCreateDraft();
					}}
				>
					Create Draft Room
				</BlueButton>
			)}
			{isModalOpen && (
				<AddPlayerModal teamID={teamID} sendMessage={sendMessage} closeModal={() => setModalOpen(false)} />
			)}
		</>
	);
};

export default TeamCreator;
