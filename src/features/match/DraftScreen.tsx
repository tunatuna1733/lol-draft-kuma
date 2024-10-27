import BlueButton from '@/components/BlueButton';
import { useMyData } from '@/stores/MyData';
import { useRoomDataStore } from '@/stores/RoomData';
import type { ChampInfo } from '@/types/lol';
import type { ReadyMessage } from '@/types/socket';
import { Box, Text } from '@kuma-ui/core';
import { useState } from 'react';
import WaitingList from './Waiting/WaitingList';
import PickScreen from './Pick/PickScreen';

type Props = {
	sendMessage: (message: string) => Promise<void>;
	champs: ChampInfo[];
};

const DraftScreen = ({ sendMessage, champs }: Props) => {
	const [ready, setReady] = useState(false);
	const roomData = useRoomDataStore((state) => state);
	const myData = useMyData((state) => state);

	if (!roomData.started) {
		if (roomData.starting) {
			// waiting for 5 secs
		}
		// waiting for player
		return (
			<>
				<Box width={'100%'} display={'flex'} flexDirection={'column'} justify={'center'} alignItems={'center'}>
					<WaitingList />
					<BlueButton
						onClick={() => {
							const payload: ReadyMessage = {
								command: 'Ready',
								isReady: true,
								roomID: roomData.id,
								team: myData.team,
							};
							sendMessage(JSON.stringify(payload));
							setReady(true);
						}}
						disabled={ready}
						props={{ fontSize: '30px', p: '15px' }}
					>
						{ready ? 'Waiting for another team...' : 'Ready'}
					</BlueButton>
				</Box>
				{roomData.starting && (
					<>
						<Box
							width={'100%'}
							height={'100%'}
							position={'absolute'}
							top={0}
							left={0}
							bg={'rgba(107, 114, 128, 0.7)'}
							zIndex={200}
						/>
						<Text
							position={'absolute'}
							top={'50%'}
							left={'50%'}
							transform={'translate(-50%, -50%)'}
							color={'white'}
							fontSize={'50px'}
							zIndex={201}
						>
							Starting draft...
						</Text>
					</>
				)}
			</>
		);
	}
	return (
		<Box>
			<PickScreen sendMessage={sendMessage} champs={champs} />
		</Box>
	);
};

export default DraftScreen;
