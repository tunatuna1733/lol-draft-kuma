import type { Team } from '@/types/lol';
import { Box } from '@kuma-ui/core';
import Image from 'next/image';
import { Tooltip } from 'react-tooltip';

type Props = {
	team: Team;
	champID: string;
	champName: string;
	inFocus: boolean;
};

const Ban = ({ team, champID, champName, inFocus }: Props) => {
	const height = 200;
	const width = 110;
	const url = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champID}_0.jpg`;

	return (
		<>
			<Box height={height} width={width} position={'relative'} id={`player-ban-${champID}`}>
				{champID !== '' && (
					<Image
						fill={true}
						src={url}
						alt={champID}
						style={{ objectFit: 'contain' }}
						sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
					/>
				)}
				<Box height={'100%'} width={'100%'} bg={team === 'Blue' ? '#00B4FA33' : '#FF003C33'}>
					<Box position={'relative'} display={'flex'} justifyContent={'center'} top={'50%'} zIndex={3}>
						<svg
							width="100px"
							height="100px"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							stroke="#000000"
						>
							<title>Blue Ban</title>
							<g id="SVGRepo_bgCarrier" strokeWidth="0" />
							<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
							<g id="SVGRepo_iconCarrier">
								{' '}
								<g id="Warning / Stop_Sign">
									{' '}
									<path
										id="Vector"
										d="M5.75 5.75L18.25 18.25M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
										stroke={team === 'Blue' ? '#00B4FA' : '#FF003c'}
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>{' '}
								</g>{' '}
							</g>
						</svg>
					</Box>
				</Box>
			</Box>
			<Tooltip anchorSelect={`#player-ban-${champID}`} place="bottom" content={champName} style={{ zIndex: 200 }} />
		</>
	);
};

export default Ban;
