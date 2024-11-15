import type { PhaseData } from '@/types/room';
import { create } from 'zustand';

export const usePhaseData = create<PhaseData>()((set) => ({
	kind: 'Ban',
	team: 'Blue',
	order: 0,
	eta: 0,
	remainingTime: 0,
	paused: false,
}));
