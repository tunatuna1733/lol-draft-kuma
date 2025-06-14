import type { Lane, RankedDivision, RankedTier, Team } from './lol';

interface BaseMessage {
	id: string;
}

export interface TeamPickLaneMessage extends BaseMessage {
	command: 'PickLane';
	name: string;
	lane: Lane | '';
}

export interface TeamAddPlayerMessage extends BaseMessage {
	command: 'AddPlayer';
	name: string;
	icon: string;
	lane: Lane | '';
	beginner: boolean;
}

export interface TeamTransferPlayerMessage extends BaseMessage {
	command: 'TransferPlayer';
	name: string;
	team: Team | 'Unassigned';
}

export interface TeamAutoAssignPlayerMessage extends BaseMessage {
	command: 'AutoAssignPlayer';
	name: string;
}

export interface TeamCreateDraftMessage extends BaseMessage {
	command: 'CreateDraft';
}

export interface TeamBalanceMessage extends BaseMessage {
	command: 'Balance';
	excludeJungle: boolean;
}

export interface PlayerData {
	id: string;
	name: string;
	icon: string;
	lane: Lane | '';
	level: number;
	SOLO?: {
		tier: RankedTier;
		rank: RankedDivision;
		leaguePoints: number;
		points: number;
		winRate: number;
	};
	FLEX?: {
		tier: RankedTier;
		rank: RankedDivision;
		leaguePoints: number;
		points: number;
		winRate: number;
	};
}

export interface TeamCreationData {
	id: string;
	createdTime: number;
	channelId?: string;
	Blue: PlayerData[];
	Red: PlayerData[];
	Unassigned: PlayerData[];
	draftId: string;
}
