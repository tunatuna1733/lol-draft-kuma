'use client';

import BlueButton from '@/components/BlueButton';
import { Box } from '@kuma-ui/core';
import { useRouter } from 'next/navigation';

const sendCreateRoomRequest = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_WEBSOCKET_HOST || ''}/createTeam`, {
		method: 'POST',
		body: JSON.stringify({ players: [] }),
	});
	const resJson: { id: string } = await res.json();
	return resJson.id;
};

const CreateRoom = () => {
	const router = useRouter();
	return (
		<Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
			<BlueButton
				onClick={async () => {
					const id = await sendCreateRoomRequest();
					router.push(`/team/${id}`);
				}}
			>
				Create Team Room
			</BlueButton>
		</Box>
	);
};

export default CreateRoom;
