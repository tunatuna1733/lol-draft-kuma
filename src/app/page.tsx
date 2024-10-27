import InputTeam from '@/features/home/InputTeam';
import { Flex } from '@kuma-ui/core';

export default function Home() {
	return (
		<Flex display={'flex'} justify={'center'} alignItems={'center'}>
			<InputTeam />
		</Flex>
	);
}
