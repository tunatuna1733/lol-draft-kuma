import type { Team } from '@/types/lol';
import { create } from 'zustand';

interface MyData {
	name: string;
	team: Team;
	isSpec: boolean;
	setName: (name: string) => void;
	setTeam: (team: Team) => void;
	setSpec: (spec: boolean) => void;
}

export const useMyData = create<MyData>()((set) => ({
	name: '',
	team: 'Blue',
	isSpec: false,
	setName: (name) => set(() => ({ name })),
	setTeam: (team) => set(() => ({ team })),
	setSpec: (spec) => set(() => ({ isSpec: spec })),
}));
