import { Flex, Heading } from '@kuma-ui/core';
import Link from 'next/link';

export default function Home() {
	return (
		<Flex display={'flex'} flexDirection={'column'} justify={'center'} alignItems={'center'}>
			<Heading color={'white'} fontFamily={'Arial'}>
				Lol Custom Tools
			</Heading>
			<Link href={'/draft'}>Draft Ban/Pick Tool</Link>
			<Link href={'/team'}>Grouping Tool</Link>
		</Flex>
	);
}
