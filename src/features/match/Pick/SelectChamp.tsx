import type { ChampInfo } from '@/types/lol';
import { Box, Button, Text } from '@kuma-ui/core';
import Image from 'next/image';
import { memo, type MouseEventHandler } from 'react';

type Props = {
	info: ChampInfo;
	onClick: MouseEventHandler<HTMLButtonElement>;
	selected: boolean;
	disabled: boolean;
	banned: boolean;
};

const SelectChamp = memo(({ info, onClick, selected, disabled, banned }: Props) => {
	return (
		<Button
			onClick={onClick}
			disabled={disabled || banned}
			width={'120px'}
			height={'150px'}
			bg={'#121212'}
			outline={'none'}
			borderRadius={'10px'}
			_hover={{ bg: disabled || banned ? '#121212' : '#202020' }}
			p={0}
		>
			<Box
				width={'100%'}
				height={'100%'}
				bg={selected ? '#00FFFF44' : banned ? '#FF222244' : ''}
				m={0}
				borderRadius={'10px'}
			>
				<Box display={'flex'} justify={'center'} alignItems={'center'} p={'10px'}>
					<Image
						src={info.img}
						alt={`${info.name}`}
						width={100}
						height={100}
						style={{
							filter: disabled || banned ? 'grayscale(90%)' : '',
						}}
						loading="lazy"
					/>
				</Box>
				<Text fontSize={13} m={0} pb={'10px'} color={'white'}>
					{info.name}
				</Text>
			</Box>
		</Button>
	);
});

SelectChamp.displayName = 'SelectChamp';

export default SelectChamp;
