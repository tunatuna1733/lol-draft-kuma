import type { TeamCreationData } from '@/types/team';
import { create } from 'zustand';

export const useTeamDataStore = create<TeamCreationData>()((set) => ({
	id: '',
	createdTime: 0,
	Blue: [],
	Red: [],
	Unassigned: [],
	draftId: '',
}));
