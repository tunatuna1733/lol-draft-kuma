import type { Metadata } from 'next';
import TeamCreator from '@/features/team/TeamCreator';

export const metadata: Metadata = {
	title: 'LoL Custom Team Organizer',
	description: 'Generate teams for LoL custom match.',
};

const Team = async ({ params }: { params: Promise<{ id: string }> }) => {
	const teamID = (await params).id;
	return <TeamCreator teamID={teamID} />;
};

export default Team;
