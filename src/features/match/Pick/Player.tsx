import type { Team } from '@/types/lol';
import { Box } from '@kuma-ui/core';
import Image from 'next/image';
import { Tooltip } from 'react-tooltip';

type Props = {
	team: Team;
	champID: string;
	champName: string;
	inFocus: boolean;
	selectedChampID: string;
};

const Player = ({ team, champID, champName, inFocus, selectedChampID }: Props) => {
	const height = 300;
	const width = 165;
	const url = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champID}_0.jpg`;
	const selectedUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${selectedChampID}_0.jpg`;

	return (
		<>
			<style>{'@keyframes fadeinout { 0%{ opacity: 0.2;} 100%{ opacity: 0.6;} }'}</style>
			<Box height={height} width={width} position={'relative'} id={`player-pick-${champID}`}>
				{champID !== '' ? (
					<Image
						fill={true}
						src={url}
						alt={champID}
						style={{ objectFit: 'contain' }}
						sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
					/>
				) : inFocus && selectedChampID !== '' ? (
					<Image
						fill={true}
						src={selectedUrl}
						alt={selectedChampID}
						style={{ objectFit: 'contain' }}
						sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
					/>
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
			<Tooltip anchorSelect={`#player-pick-${champID}`} place="bottom" content={champName} style={{ zIndex: 200 }} />
		</>
	);
};

export default Player;
