import type { Team } from '@/types/lol';
import { create } from 'zustand';

interface MyData {
	name: string;
	team: Team;
	isSpec: boolean;
	isRoomNotFound: boolean;
	setName: (name: string) => void;
	setTeam: (team: Team) => void;
	setSpec: (spec: boolean) => void;
	setRoomNotFound: (notFound: boolean) => void;
}

export const useMyData = create<MyData>()((set) => ({
	name: '',
	team: 'Blue',
	isSpec: false,
	isRoomNotFound: false,
	setName: (name) => set(() => ({ name })),
	setTeam: (team) => set(() => ({ team })),
	setSpec: (spec) => set(() => ({ isSpec: spec })),
	setRoomNotFound: (notFound) => set(() => ({ isRoomNotFound: notFound })),
}));
