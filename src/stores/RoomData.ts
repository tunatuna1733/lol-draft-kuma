import type { RoomData } from '@/types/room';
import { create } from 'zustand';

export const useRoomDataStore = create<RoomData>()((set) => ({
	id: '',
	name: '',
	currentPhase: {
		kind: 'Ban',
		team: 'Blue',
		order: 1,
		eta: 0,
		remainingTime: 0,
		paused: false,
	},
	selectedChamp: '',
	teams: {
		Blue: {
			name: 'Team 1',
			players: [],
			bans: [],
			isReady: false,
		},
		Red: {
			name: 'Team 2',
			players: [],
			bans: [],
			isReady: false,
		},
	},
	starting: false,
	started: false,
	ended: false,
	expire: Date.now() + 20 * 60 * 1000,
}));
