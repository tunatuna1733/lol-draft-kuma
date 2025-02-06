import TeamCreator from '@/features/team/TeamCreator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'LoL Custom Team Organizer',
	description: 'Generate teams for LoL custom match.',
};

const Team = async ({ params }: { params: Promise<{ id: string }> }) => {
	const teamID = (await params).id;
	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<TeamCreator teamID={teamID} />
		</div>
	);
};

export default Team;
