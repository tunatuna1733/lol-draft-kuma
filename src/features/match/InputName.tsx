import BlueButton from '@/components/BlueButton';
import TextInput from '@/components/TextInput';
import { useMyData } from '@/stores/MyData';
import type { Team } from '@/types/lol';
import type { JoinMessage } from '@/types/socket';
import useStore from '@/utils/store';
import { Box, Text } from '@kuma-ui/core';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

type Props = {
	team: Team;
	roomID: string;
	sendMessage: (message: string) => void;
	setSubmit: Dispatch<SetStateAction<boolean>>;
};

const InputName = ({ team, roomID, sendMessage, setSubmit }: Props) => {
	const { setName, setTeam } = useMyData((state) => state);
	const [inputText, setInputText] = useState<string>();
	const [toastOpen, setToastOpen] = useState(false);

	useEffect(() => {
		const savedName = localStorage.getItem('lol-draft-my-name');
		if (savedName) setInputText(savedName);
	}, []);

	const handleSubmit = () => {
		if (!inputText || inputText === '') {
			handleOpenToast();
			return;
		}
		const payload: JoinMessage = {
			command: 'Join',
			name: inputText,
			team,
			roomID,
		};
		sendMessage(JSON.stringify(payload));

		setName(inputText);
		setTeam(team);
		localStorage.setItem('lol-draft-my-name', inputText);
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
				<>
					<TextInput
						id="name-input"
						label="名前を入力してください"
						value={inputText}
						setValue={setInputText}
						placeholder="Name"
						inputProps={{ borderColor: team === 'Red' ? '#991b1b' : '#1e40af', mt: '5px', width: '100%' }}
					/>
					<Box display={'flex'} justify={'center'} mt={'10px'}>
						<BlueButton onClick={handleSubmit}>Submit</BlueButton>
					</Box>
				</>
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
