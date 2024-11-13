const Team = async ({ params }: { params: Promise<{ id: string }> }) => {
	const teamID = (await params).id;
};

export default Team;
