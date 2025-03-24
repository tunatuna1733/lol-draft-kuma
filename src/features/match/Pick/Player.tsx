import type { Team } from '@/types/lol';
import { Box, Image } from '@kuma-ui/core';
import { Tooltip } from 'react-tooltip';

type Props = {
	team: Team;
	champID: string;
	champName: string;
	inFocus: boolean;
	selectedChampID: string;
	selectedChampName: string;
};

const Player = ({ team, champID, champName, inFocus, selectedChampID, selectedChampName }: Props) => {
	const height = 300;
	const width = 165;
	const url = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champID}_0.jpg`;
	const selectedUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${selectedChampID}_0.jpg`;

	return (
		<>
			<style>{'@keyframes fadeinout { 0%{ opacity: 0.1;} 100%{ opacity: 0.5;} }'}</style>
			<Box
				height={height}
				width={width}
				position={'relative'}
				id={inFocus ? `player-picking-${selectedChampID}` : `player-pick-${champID}`}
			>
				{champID !== '' ? (
					<Image src={url} alt={champID} style={{ objectFit: 'contain' }} w={'100%'} h={'100%'} />
				) : inFocus && selectedChampID !== '' ? (
					<Image src={selectedUrl} alt={selectedChampID} style={{ objectFit: 'contain' }} w={'100%'} h={'100%'} />
				) : (
					<Box
						position={'relative'}
						top={'0%'}
						left={'0%'}
						height={'100%'}
						width={'100%'}
						bg={team === 'Blue' ? '#00B4FA33' : '#FF003C33'}
					/>
				)}
				{inFocus && (
					<Box
						position={'absolute'}
						top={'0%'}
						left={'0%'}
						height={'100%'}
						width={'100%'}
						bg={'white'}
						animation={'fadeinout 1s linear infinite alternate'}
					/>
				)}
				{/*
				<Text
					position={'absolute'}
					top={'80%'}
					width={'100%'}
					textAlign={'center'}
					fontSize={'60'}
					zIndex={3}
					color={'white'}
				>
					{name}
				</Text>
				<Box
					position={'absolute'}
					top={'50%'}
					left={'0%'}
					height={'50%'}
					width={'100%'}
					bg={'linear-gradient(to bottom, #00000000, #121212)'}
					zIndex={2}
				/>
        */}
			</Box>
			<Tooltip
				anchorSelect={inFocus ? `#player-picking-${selectedChampID}` : `#player-pick-${champID}`}
				place="bottom"
				content={inFocus ? selectedChampName : champName}
				style={{ zIndex: 200 }}
			/>
		</>
	);
};

export default Player;
