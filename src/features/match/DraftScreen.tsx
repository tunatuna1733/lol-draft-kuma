import BlueButton from '@/components/BlueButton';
import { useMyData } from '@/stores/MyData';
import { useRoomDataStore } from '@/stores/RoomData';
import type { ChampInfo } from '@/types/lol';
import type { StartMessage } from '@/types/socket';
import { Box, Text } from '@kuma-ui/core';
import PickScreen from './Pick/PickScreen';
import WaitingList from './Waiting/WaitingList';

type Props = {
	sendMessage: (message: string) => Promise<void>;
	champs: ChampInfo[];
	bypass?: boolean;
};

const DraftScreen = ({ sendMessage, champs, bypass }: Props) => {
	const roomData = useRoomDataStore((state) => state);
	const myData = useMyData((state) => state);

	if (!roomData.started) {
		// waiting for player
		return (
			<>
				<Box width={'100%'} display={'flex'} flexDirection={'column'} justify={'center'} alignItems={'center'}>
					<WaitingList sendMessage={sendMessage} />
					{!myData.isSpec && (
						<BlueButton
							onClick={() => {
								const payload: StartMessage = {
									command: 'Start',
									roomID: roomData.id,
								};
								sendMessage(JSON.stringify(payload));
							}}
							disabled={!roomData.teams.Blue.isReady || !roomData.teams.Red.isReady}
							props={{ fontSize: '30px', p: '15px' }}
						>
							Start Draft
						</BlueButton>
					)}
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
			<PickScreen sendMessage={sendMessage} champs={champs} bypass={bypass} />
		</Box>
	);
};

export default DraftScreen;
