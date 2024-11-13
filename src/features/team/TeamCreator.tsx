import { useTeamDataStore } from '@/stores/TeamData';
import useTeamSocket from '@/utils/TeamSocket';
import { Box, Button } from '@kuma-ui/core';
import TeamPlayer from './TeamPlayer';
import { useCallback } from 'react';
import type { Team } from '@/types/lol';
import type { TeamTransferPlayerMessage } from '@/types/team';

type Props = {
	teamID: string;
};

const TeamCreator = ({ teamID }: Props) => {
	const { sendMessage } = useTeamSocket(teamID);
	const teamData = useTeamDataStore((state) => state);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const transferTeam = useCallback((name: string, team: Team | 'Unassigned') => {
		const payload: TeamTransferPlayerMessage = {
			id: teamID,
			command: 'TransferPlayer',
			name,
			team,
		};
		sendMessage(JSON.stringify(payload));
	}, []);

	return (
		<>
			<Box height={'40%'} mt={'10%'} display={'flex'}>
				<Box id="blue-list-box" width={'500px'} height={'100%'}>
					{teamData.Blue.map((b, i) => (
						<TeamPlayer player={b} key={`${b.name}-${i}`} disabled={false} />
					))}
				</Box>
				<Box id="blue-arrow-buttons" width={'100px'} height={'100%'}>
					{Array.from({ length: teamData.Blue.length }, (_, i) => i).map((index) => (
						<Button
							height={'80px'}
							onClick={() => {
								transferTeam(teamData.Blue[index].name, 'Red');
							}}
							key={index}
						>
							→
						</Button>
					))}
				</Box>
				<Box id="swap-buttons" width={'200px'} height={'100%'}>
					To be added
				</Box>
				<Box id="red-arrow-buttons" width={'100px'} height={'100%'}>
					{Array.from({ length: teamData.Red.length }, (_, i) => i).map((index) => (
						<Button
							height={'80px'}
							onClick={() => {
								transferTeam(teamData.Red[index].name, 'Red');
							}}
							key={index}
						>
							←
						</Button>
					))}
				</Box>
				<Box id="red-list-box" width={'500px'} height={'100%'}>
					{teamData.Red.map((r, i) => (
						<TeamPlayer player={r} key={`${r.name}-${i}`} disabled={false} />
					))}
				</Box>
			</Box>
			<Box>
				{Array.from({ length: Math.trunc(teamData.Unassigned.length / 2) }, (_, i) => i).map((index) => (
					<Box key={index} display={'flex'} justifyContent={'space-between'}>
						<TeamPlayer player={teamData.Unassigned[index]} disabled={false} />
						{teamData.Unassigned[index + 1] && <TeamPlayer player={teamData.Unassigned[index + 1]} disabled={false} />}
					</Box>
				))}
			</Box>
		</>
	);
};

export default TeamCreator;
