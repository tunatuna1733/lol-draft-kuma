import type { Team } from '@/types/lol';
import { Box, Text } from '@kuma-ui/core';

type Props = {
	name?: string;
	team: Team;
};

const WaitingPlayer = ({ name, team }: Props) => {
	const height = 300;
	const width = 165;

	return (
		<>
			<style>{'@keyframes spin{ 0%{transform: rotate(0deg);} 100%{transform: rotate(360deg);} }'}</style>
			<Box height={height} width={width} position={'relative'}>
				<Box
					position={'relative'}
					top={'0%'}
					left={'0%'}
					height={'100%'}
					width={'100%'}
					bg={team === 'Blue' ? '#00B4FA33' : '#FF003C33'}
				/>
				<Text
					position={'absolute'}
					top={'80%'}
					width={'100%'}
					textAlign={'center'}
					fontSize={'20px'}
					zIndex={3}
					color={'white'}
					fontFamily={'Arial'}
				>
					{name || 'Waiting...'}
				</Text>
				<Box
					position={'absolute'}
					top={'0%'}
					left={'0%'}
					height={'100%'}
					width={'100%'}
					bg="linear-gradient(to bottom, #00000000, #121212)"
					zIndex={2}
				/>
				{!name && (
					<Box position={'absolute'} top={'50%'} left={'50%'} transform="translate(-50%, -50%)">
						<Box
							width={'80px'}
							aspectRatio={1}
							borderRadius={'50%'}
							bg={`radial-gradient(farthest-side,${team === 'Blue' ? '#1d4ed8' : '#b91c1c'} 94%,#0000) top/8px 8px no-repeat,conic-gradient(#0000 30%,${team === 'Blue' ? '#1d4ed8' : '#b91c1c'})`}
							animation={'spin 1s infinite linear'}
							style={{ WebkitMask: 'radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0)' }}
						/>
					</Box>
				)}
			</Box>
		</>
	);
};

export default WaitingPlayer;
