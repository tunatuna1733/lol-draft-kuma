import type { Lane, Team } from './lol';

export interface PlayerData {
	name: string;
	team: Team;
	lane: Lane | '';
	champ: string;
	isNPC: boolean;
	isBeginner: boolean;
}

export interface PhaseData {
	kind: 'Ban' | 'Pick';
	team: Team;
	order: number;
	eta: number;
	remainingTime: number;
	paused: boolean;
}

interface TeamData {
	name: string;
	players: PlayerData[];
	bans: string[];
	isReady: boolean;
}

export interface RoomData {
	id: string;
	name?: string;
	currentPhase: PhaseData;
	selectedChamp: string;
	teams: {
		Blue: TeamData;
		Red: TeamData;
	};
	starting: boolean;
	started: boolean;
	ended: boolean;
	expire: number;
	channelId?: string;
	globalBans: string[];
}

export interface StartPhase extends PhaseData {
	command: 'StartPhase';
}

export interface CurrentPhase extends PhaseData {
	command: 'CurrentPhase';
}

export interface ResultMessage {
	success: boolean;
}

export interface MakeSpec {
	command: 'MakeSpec';
	roomID: string;
}
