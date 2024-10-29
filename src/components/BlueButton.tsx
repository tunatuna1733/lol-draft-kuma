import { Button, type ButtonProps } from '@kuma-ui/core';
import type { MouseEventHandler, ReactNode } from 'react';

type Props = {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
	props?: ButtonProps;
	children?: ReactNode;
};

const BlueButton = ({ onClick, disabled, props, children }: Props) => {
	return (
		<Button
			onClick={onClick}
			color="white"
			background={disabled ? '#4b5563' : '#2563eb'}
			_hover={{ background: disabled ? '#4b5563' : '#1d4ed8' }}
			_focus={{ outline: 'none' }}
			border="none"
			borderRadius="10px"
			fontSize="1.125rem"
			lineHeight="1.75rem"
			px={'10px'}
			py={'7px'}
			disabled={disabled}
			{...props}
		>
			{children}
		</Button>
	);
};

export default BlueButton;
