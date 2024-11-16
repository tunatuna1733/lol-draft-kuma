import { Lanes } from '@/data/lane';
import type { Lane } from '@/types/lol';

export const getLaneIcon = (lane: Lane | '') => {
	switch (lane) {
		case 'Top':
			return Lanes[1].icon;
		case 'Jungle':
			return Lanes[2].icon;
		case 'Mid':
			return Lanes[3].icon;
		case 'Bot':
			return Lanes[4].icon;
		case 'Support':
			return Lanes[5].icon;
		default:
			return;
	}
};
