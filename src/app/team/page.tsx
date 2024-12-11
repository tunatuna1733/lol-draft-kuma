import CreateRoom from '@/features/team/CreateRoom';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'LoL Custom Team Organizer',
	description: 'Generate teams for LoL custom match.',
};

const TeamIndex = () => {
	return <CreateRoom />;
};

export default TeamIndex;
