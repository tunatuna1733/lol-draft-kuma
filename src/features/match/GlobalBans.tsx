import { useRoomDataStore } from '@/stores/RoomData';
import type { ChampInfo } from '@/types/lol';
import type { SetGlobalBansMessage } from '@/types/socket';
import { Box, Button, Grid, Text } from '@kuma-ui/core';
import Image from 'next/image';
import { useCallback, useState } from 'react';

type Props = {
	sendMessage: (message: string) => Promise<void>;
	champs: ChampInfo[];
};

const GlobalBans = ({ sendMessage, champs }: Props) => {
	const [selectedChamps, setSelectedChamps] = useState<string[]>([]);
	const { id } = useRoomDataStore((state) => state);

	const sendGlobalBans = useCallback(() => {
		const payload: SetGlobalBansMessage = {
			command: 'SetGlobalBans',
			roomID: id,
			bans: selectedChamps,
		};
		sendMessage(JSON.stringify(payload));
	}, [sendMessage, selectedChamps, id]);

	const isBanned = useCallback(
		(champId: string) => {
			return selectedChamps.includes(champId);
		},
		[selectedChamps],
	);

	const onClick = useCallback(
		(champId: string) => {
			const banned = isBanned(champId);
			if (banned) {
				setSelectedChamps((c) => c.filter((champ) => champ !== champId));
			} else {
				setSelectedChamps([...selectedChamps, champId]);
			}
		},
		[isBanned, selectedChamps],
	);

	return (
		<details>
			<summary>Global Bans</summary>
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
	);
};

export default GlobalBans;
