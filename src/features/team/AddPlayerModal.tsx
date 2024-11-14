import BlueButton from '@/components/BlueButton';
import TextInput from '@/components/TextInput';
import type { Lane } from '@/types/lol';
import type { TeamAddPlayerMessage } from '@/types/team';
import { Box, Button, Select, Text } from '@kuma-ui/core';
import { type ChangeEvent, useCallback, useState } from 'react';

type Props = {
	teamID: string;
	sendMessage: (message: string) => Promise<void>;
	closeModal: () => void;
};

const AddPlayerModal = ({ teamID, sendMessage, closeModal }: Props) => {
	const [name, setName] = useState('');
	const [icon, setIcon] = useState('');
	const [lane, setLane] = useState<Lane | ''>('');

	const addPlayer = useCallback(
		(name: string, icon: string, lane: Lane | '') => {
			const payload: TeamAddPlayerMessage = {
				id: teamID,
				command: 'AddPlayer',
				name,
				icon,
				lane,
				beginner: false,
			};
			sendMessage(JSON.stringify(payload));
		},
		[sendMessage, teamID],
	);

	return (
		<Box
			position={'fixed'}
			top={0}
			left={0}
			width={'100%'}
			height={'100%'}
			background={'rgba(0, 0, 0, 0.5)'}
			display={'flex'}
			justifyContent={'center'}
			alignItems={'center'}
		>
			<Box
				position={'relative'}
				p={'20px'}
				borderRadius={'10px'}
				width={'700px'}
				height={'600px'}
				background={'#121212'}
				fontFamily={'Arial'}
				display={'flex'}
				flexDirection={'column'}
				alignItems={'center'}
			>
				<Box display={'flex'} flexDirection={'column'} width={'90%'} mt={'50px'} mb={'40px'}>
					<TextInput id="add-player-name" label="Player name" value={name} setValue={setName} />
				</Box>
				<Box display={'flex'} flexDirection={'column'} width={'90%'} mb={'40px'}>
					<TextInput id="add-player-icon" label="Player icon (optional)" value={icon} setValue={setIcon} />
				</Box>
				<Box display={'flex'} flexDirection={'row'} alignItems={'center'} mb={'60px'}>
					<Text color={'white'}>Lane (optional)</Text>
					<Select
						value={lane}
						onChange={(e: ChangeEvent<HTMLSelectElement>) => {
							setLane(e.target.value as Lane | '');
						}}
						borderRadius={'10px'}
						p={'5px'}
						ml={'20px'}
						fontSize={'16px'}
						width={'100px'}
						height={'30px'}
					>
						<option value={''}>Lane...</option>
						<option value={'Top'}>Top</option>
						<option value={'Jungle'}>Jungle</option>
						<option value={'Mid'}>Mid</option>
						<option value={'Bot'}>Bot</option>
						<option value={'Support'}>Support</option>
					</Select>
				</Box>
				<BlueButton
					onClick={() => {
						if (name !== '') {
							addPlayer(name, icon, lane);
							closeModal();
						}
					}}
					props={{ width: '100px' }}
				>
					Add
				</BlueButton>
				<Button
					position={'absolute'}
					top={'20px'}
					right={'20px'}
					width={'50px'}
					height={'50px'}
					onClick={closeModal}
					background={'none'}
					border={'none'}
					outline={'none'}
				>
					<svg
						viewBox="0 0 512 512"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						fill="#FFFFFF"
					>
						<title>cancel</title>
						<g id="SVGRepo_bgCarrier" strokeWidth="0" />
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
						<g id="SVGRepo_iconCarrier">
							{' '}
							<title>cancel</title>{' '}
							<g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
								{' '}
								<g id="work-case" fill="#FFFFFF" transform="translate(91.520000, 91.520000)">
									{' '}
									<polygon
										id="Close"
										points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"
									>
										{' '}
									</polygon>{' '}
								</g>{' '}
							</g>{' '}
						</g>
					</svg>
				</Button>
			</Box>
		</Box>
	);
};

export default AddPlayerModal;
