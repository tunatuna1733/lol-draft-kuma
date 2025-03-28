import Draft from '@/features/match/Draft';
import SpecDraft from '@/features/match/SpecDraft';
import type { ChampInfo, ChampsResponse, Lane, Team } from '@/types/lol';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'LoL Draft Pick',
	description: 'Draft pick tool for LoL custom match.',
};

type rawLaneInfo = {
	SUPPORT: { [key: string]: number };
	JUNGLE: { [key: string]: number };
	TOP: { [key: string]: number };
	BOTTOM: { [key: string]: number };
	MIDDLE: { [key: string]: number };
};

type LaneInfo = { [key in Lane]: string[] };

const convertLane = (rawLane: string): Lane | '' => {
	switch (rawLane) {
		case 'SUPPORT':
			return 'Support';
		case 'JUNGLE':
			return 'Jungle';
		case 'TOP':
			return 'Top';
		case 'BOTTOM':
			return 'Bot';
		case 'MIDDLE':
			return 'Mid';
		default:
			return '';
	}
};

const findLanes = (champKey: string, laneInfo?: LaneInfo) => {
	if (!laneInfo) return [];
	const lanes: Lane[] = [];
	for (const [laneName, keys] of Object.entries(laneInfo)) {
		if (keys.includes(champKey)) {
			lanes.push(laneName as Lane);
		}
	}
	return lanes;
};

const fetchChampLanes = async () => {
	const jscodeRes = await fetch(
		'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champion-statistics/global/default/rcp-fe-lol-champion-statistics.js',
	);
	const jscode = await jscodeRes.text();
	const roleStr = jscode.match(/JSON\.parse\('({.*})'\)/);
	if (roleStr?.[1]) {
		const rawData: rawLaneInfo = JSON.parse(roleStr[1]);
		const data: LaneInfo = { Top: [], Jungle: [], Mid: [], Bot: [], Support: [] };
		Object.entries(rawData).map(([key, val]) => {
			const lane = convertLane(key);
			if (lane === '') return;
			data[lane] = Object.keys(val);
		});
		return data;
	}
};

const fetchLatestVersion = async () => {
	const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
	const versions: string[] = await res.json();
	return versions[0];
};

const fetchAllChamps = async () => {
	const version = await fetchLatestVersion();
	const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/ja_JP/champion.json`);
	const champsResponse: ChampsResponse = await res.json();
	const laneInfo = await fetchChampLanes();
	const champs: ChampInfo[] = Object.values(champsResponse.data)
		.map((champ) => ({
			id: champ.id,
			name: champ.name,
			key: champ.key,
			img: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.id}.png`,
			lanes: findLanes(champ.key, laneInfo),
		}))
		.sort((a, b) => {
			return a.name.localeCompare(b.name, 'ja');
		});
	return champs;
};

const Match = async ({
	params,
	searchParams,
}: { params: Promise<{ match: string }>; searchParams?: Promise<{ team: string; bypass?: string }> }) => {
	const rawTeam = (await searchParams)?.team;
	const rawBypass = (await searchParams)?.bypass;
	const team = rawTeam !== 'Blue' && rawTeam !== 'Red' ? 'Spec' : (rawTeam as Team);
	const bypass = rawBypass === 'true';
	const champs = await fetchAllChamps();
	const roomID = (await params).match;
	return (
		<>
			{team === 'Spec' ? (
				<SpecDraft roomID={roomID} champs={champs} />
			) : (
				<Draft roomID={roomID} champs={champs} team={team} bypass={bypass} />
			)}
		</>
	);
};

export default Match;
