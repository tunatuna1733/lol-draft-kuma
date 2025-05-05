import TextInput from '@/components/TextInput';
import { useRoomDataStore } from '@/stores/RoomData';
import type { ChampInfo, FearlessBansResponse } from '@/types/lol';
import type { SetGlobalBansMessage } from '@/types/socket';
import { Box, Button, Grid, Text } from '@kuma-ui/core';
import Image from 'next/image';
import { useCallback, useState } from 'react';

type Props = {
	sendMessage: (message: string) => Promise<void>;
	champs: ChampInfo[];
};

const GlobalBans = ({ sendMessage, champs }: Props) => {
	const { id, globalBans } = useRoomDataStore((state) => state);
	const [fearlessId, setFearlessId] = useState('');

	const sendGlobalBans = useCallback(
		(bans: string[]) => {
			const payload: SetGlobalBansMessage = {
				command: 'SetGlobalBans',
				roomID: id,
				bans,
			};
			sendMessage(JSON.stringify(payload));
		},
		[sendMessage, id],
	);

	const getChampInfo = useCallback(
		(champId: string) => {
			return champs.find((champ) => champ.id === champId);
		},
		[champs],
	);

	const isBanned = useCallback(
		(champId: string) => {
			return globalBans.includes(champId);
		},
		[globalBans],
	);

	const onClick = useCallback(
		(champId: string) => {
			const banned = isBanned(champId);
			if (banned) {
				const newBans = globalBans.filter((champ) => champ !== champId);
				sendGlobalBans(newBans);
			} else {
				const newBans = [...globalBans, champId];
				sendGlobalBans(newBans);
			}
		},
		[globalBans, isBanned, sendGlobalBans],
	);

	const sendFearless = useCallback(
		async (fearlessId: string) => {
			const fearlessBansResponse = await fetch(
				`${process.env.NEXT_PUBLIC_WEBSOCKET_HOST}/fearless?fearlessID=${fearlessId}`,
			);
			const fearlessBans: FearlessBansResponse = await fearlessBansResponse.json();
			const newBans = [...globalBans, ...fearlessBans.blue, ...fearlessBans.red];
			sendGlobalBans(newBans);
		},
		[globalBans, sendGlobalBans],
	);

	return (
		<>
			<Text fontSize={'36px'} fontWeight={'bold'} color={'white'} fontFamily={'Arial'}>
				Global Bans
			</Text>
			<Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={10} width={'30%'}>
				<TextInput
					id="fearless-id"
					label="Fearless code"
					labelProps={{ style: { fontSize: '20px', color: 'white', fontFamily: 'Arial' } }}
					value={fearlessId}
					setValue={setFearlessId}
				/>
				<Button background={'none'} border={'none'} fontSize={'40px'} onClick={() => sendFearless(fearlessId)}>
					✅️
				</Button>
			</Box>
			<Box display={'flex'} width={'60%'} overflowX={'scroll'}>
				{globalBans.map((champID) => {
					const champ = getChampInfo(champID);
					if (!champ) return null;
					return (
						<Box
							key={champID}
							display={'flex'}
							justify={'center'}
							flexDirection={'column'}
							width={'120px'}
							height={'150px'}
							bg={'#121212'}
							outline={'none'}
							borderRadius={'10px'}
							position={'relative'}
						>
							<Box display={'flex'} justify={'center'} alignItems={'center'} p={'10px'}>
								<Image src={champ.img} alt={`${champ.name}`} width={100} height={100} loading="lazy" />
							</Box>
							<Text fontSize={13} m={0} pb={'10px'} color={'white'} width={'100%'} textAlign={'center'}>
								{champ.name}
							</Text>
							<Button
								onClick={() => onClick(champID)}
								position={'absolute'}
								top={15}
								right={15}
								p={0}
								zIndex={50}
								background={'none'}
								border={'none'}
							>
								<svg
									fill="#ffffff"
									height="15px"
									width="15px"
									version="1.1"
									id="Capa_1"
									xmlns="http://www.w3.org/2000/svg"
									xmlnsXlink="http://www.w3.org/1999/xlink"
									viewBox="0 0 460.775 460.775"
									xmlSpace="preserve"
								>
									<title>X</title>
									<g id="SVGRepo_bgCarrier" strokeWidth="0" />
									<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
									<g id="SVGRepo_iconCarrier">
										{' '}
										<path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />{' '}
									</g>
								</svg>
							</Button>
						</Box>
					);
				})}
			</Box>
			<details style={{ paddingTop: '30px' }}>
				<summary
					style={{ fontFamily: 'Arial', color: 'white', fontSize: 20, display: 'flex', justifyContent: 'center' }}
				>
					Edit Global Bans
				</summary>
				<Grid display={'grid'} width={'60%'} gridTemplateColumns={'repeat(6, 1fr)'} gap={15}>
					{champs.map((champ) => (
						<Box key={champ.id} display={'flex'} justify={'center'}>
							<Button
								onClick={() => onClick(champ.id)}
								width={'120px'}
								height={'150px'}
								bg={'#121212'}
								outline={'none'}
								borderRadius={'10px'}
								_hover={{ bg: isBanned(champ.id) ? '#121212' : '#202020' }}
								p={0}
							>
								<Box
									width={'100%'}
									height={'100%'}
									bg={isBanned(champ.id) ? '#FF222244' : ''}
									m={0}
									borderRadius={'10px'}
								>
									<Box display={'flex'} justify={'center'} alignItems={'center'} p={'10px'}>
										<Image src={champ.img} alt={`${champ.name}`} width={100} height={100} loading="lazy" />
									</Box>
									<Text fontSize={13} m={0} pb={'10px'} color={'white'}>
										{champ.name}
									</Text>
								</Box>
							</Button>
						</Box>
					))}
				</Grid>
			</details>
		</>
	);
};

export default GlobalBans;
