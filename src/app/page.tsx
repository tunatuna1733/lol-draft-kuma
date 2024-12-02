import { Flex } from '@kuma-ui/core';
import Link from 'next/link';

export default function Home() {
	return (
		<Flex display={'flex'} justify={'center'} alignItems={'center'}>
			<Link href={'/draft'}>Draft Ban/Pick Tool</Link>
			<Link href={'/team'}>Grouping Tool</Link>
		</Flex>
	);
}
