import type { Lane } from '@/types/lol';
import type { ReactNode } from 'react';

const CustomIcon = ({ url, alt }: { url: string; alt: string }) => {
	return <img height={'100%'} src={url} alt={alt} />;
};

export const Lanes: { name: Lane | 'All'; icon: ReactNode }[] = [
	{
		name: 'All',
		icon: (
			<img
				height={'100%'}
				src="https://raw.githubusercontent.com/google/material-design-icons/refs/heads/master/src/action/all_out/materialicons/24px.svg"
				alt="all-icon"
				style={{ filter: 'invert(100%) sepia(100%) saturate(0%) hue-rotate(271deg) brightness(105%) contrast(101%)' }}
			/>
		),
	},
	{
		name: 'Top',
		icon: (
			<CustomIcon
				url="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/svg/position-top.svg"
				alt="top-icon"
			/>
		),
	},
	{
		name: 'Jungle',
		icon: (
			<CustomIcon
				url="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/svg/position-jungle.svg"
				alt="jungle-icon"
			/>
		),
	},
	{
		name: 'Mid',
		icon: (
			<CustomIcon
				url="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/svg/position-middle.svg"
				alt="mid-icon"
			/>
		),
	},
	{
		name: 'Bot',
		icon: (
			<CustomIcon
				url="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/svg/position-bottom.svg"
				alt="bot-icon"
			/>
		),
	},
	{
		name: 'Support',
		icon: (
			<CustomIcon
				url="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/svg/position-utility.svg"
				alt="support-icon"
			/>
		),
	},
] as const;
