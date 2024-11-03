import BlueButton from '@/components/BlueButton';
import TextInput from '@/components/TextInput';
import { useMyData } from '@/stores/MyData';
import { useMyName } from '@/stores/MyName';
import type { Team } from '@/types/lol';
import type { JoinMessage } from '@/types/socket';
import useStore from '@/utils/store';
import { Box, Text } from '@kuma-ui/core';
import { type Dispatch, type SetStateAction, useState } from 'react';

type Props = {
	team: Team;
	roomID: string;
	sendMessage: (message: string) => void;
	setSubmit: Dispatch<SetStateAction<boolean>>;
};

const InputName = ({ team, roomID, sendMessage, setSubmit }: Props) => {
	const { setName, setTeam } = useMyData((state) => state);
	const myNameStore = useStore(useMyName, (state) => state);
	const [toastOpen, setToastOpen] = useState(false);

	const handleSubmit = () => {
		if (!myNameStore) return;
		if (myNameStore.myName === '') {
			handleOpenToast();
			return;
		}
		const payload: JoinMessage = {
			command: 'Join',
			name: myNameStore.myName,
			team,
			roomID,
		};
		sendMessage(JSON.stringify(payload));

		setName(myNameStore.myName);
		setTeam(team);
		// save persistent name here
		setSubmit(true);
	};

	const handleOpenToast = () => {
		setToastOpen(true);
		setTimeout(() => {
			setToastOpen(false);
		}, 4900);
	};

	return (
		<>
			<style>
				{
					'@keyframes fadein { from{ bottom 0; opacity: 0;} to{ bottom: 10%; opacity: 1;}} @keyframes fadeout { from{ bottom 10%; opacity: 1;} to{ bottom: 0; opacity: 0;}}'
				}
			</style>
			<Box
				width={'40%'}
				display={'flex'}
				flexDirection={'column'}
				justify={'center'}
				alignItems={'center'}
				gap={3}
				mt={'10%'}
			>
				{myNameStore && (
					<>
						<TextInput
							id="name-input"
							label="名前を入力してください"
							value={myNameStore.myName}
							setValue={myNameStore.setMyName}
							placeholder="Name"
							inputProps={{ borderColor: team === 'Red' ? '#991b1b' : '#1e40af', mt: '5px' }}
						/>
						<Box display={'flex'} justify={'center'} mt={'10px'}>
							<BlueButton onClick={handleSubmit}>Submit</BlueButton>
						</Box>
					</>
				)}
			</Box>
			{toastOpen && (
				<Box
					position={'absolute'}
					top={'90%'}
					left={'50%'}
					borderRadius={'15px'}
					width={'500px'}
					height={'50px'}
					bg={'#991b1b'}
					display={'flex'}
					alignItems={'center'}
					transform={'translate(-50%, 0%)'}
					animation={'fadein 0.5s, fadeout 0.5s 4.5s'}
				>
					<Text ml={'20px'} fontSize={20} color={'white'}>
						名前を入力してください！
					</Text>
				</Box>
			)}
		</>
	);
};

export default InputName;
