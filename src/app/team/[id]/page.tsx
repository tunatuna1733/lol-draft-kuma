import TeamCreator from '@/features/team/TeamCreator';

const Team = async ({ params }: { params: Promise<{ id: string }> }) => {
	const teamID = (await params).id;
	return <TeamCreator teamID={teamID} />;
};

export default Team;
