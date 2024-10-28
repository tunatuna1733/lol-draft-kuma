'use client';

import { Button } from '@kuma-ui/core';

const CopyButton = ({ text }: { text: string }) => {
	const handleClick = async () => {
		await navigator.clipboard.writeText(text);
	};

	return (
		<Button
			onClick={handleClick}
			width={'100%'}
			height={'100%'}
			border={'none'}
			outline={'none'}
			bg={'none'}
			_hover={{ bg: '#374151' }}
		>
			<img
				width={'100%'}
				height={'100%'}
				src="https://raw.githubusercontent.com/google/material-design-icons/refs/heads/master/src/content/content_copy/materialicons/24px.svg"
				alt="Copy icon"
				style={{ filter: 'invert(100%) sepia(100%) saturate(0%) hue-rotate(271deg) brightness(105%) contrast(101%)' }}
			/>
		</Button>
	);
};

export default CopyButton;
