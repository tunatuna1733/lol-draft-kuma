export type Lane = 'Top' | 'Jungle' | 'Mid' | 'Bot' | 'Support';

export type Team = 'Blue' | 'Red';

export type RawChampInfo = {
	id: string;
	name: string;
	key: string;
	image: {
		full: string;
	};
};

export type ChampInfo = {
	id: string;
	name: string;
	key: string;
	img: string;
	lanes: Lane[];
};

export type ChampsResponse = {
	data: { [index in string]: RawChampInfo };
};

export type FearlessBansResponse = {
	red: string[];
	blue: string[];
};
