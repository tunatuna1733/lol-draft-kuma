import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
	myName: string;
	setMyName: (myName: string) => void;
};

export const useMyName = create<State>()(
	persist(
		(set) => ({
			myName: '',
			setMyName: (myName) => set(() => ({ myName })),
		}),
		{
			name: 'lol-draft-my-name',
		},
	),
);
