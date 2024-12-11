import InputTeam from '@/features/home/InputTeam';
import { Flex } from '@kuma-ui/core';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'LoL Draft Pick',
	description: 'Draft pick tool for LoL custom match.',
};

const DraftIndex = () => {
	return (
		<Flex display={'flex'} justify={'center'} alignItems={'center'}>
			<InputTeam />
		</Flex>
	);
};

export default DraftIndex;
