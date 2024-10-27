import type { PhaseData } from '@/types/room';
import { create } from 'zustand';

export const usePhaseData = create<PhaseData>()((set) => ({
	kind: 'Ban',
	team: 'Blue',
	order: 1,
	eta: 0,
	paused: false,
}));
