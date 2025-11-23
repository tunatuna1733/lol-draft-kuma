import { Input, type InputProps } from '@kuma-ui/core';
import type { ChangeEvent, DetailedHTMLProps, Dispatch, LabelHTMLAttributes, SetStateAction } from 'react';

type Props = {
	id: string;
	label: string;
	placeholder?: string;
	value?: string;
	setValue?: Dispatch<SetStateAction<string>> | ((text: string) => void);
	isReadOnly?: boolean;
	labelProps?: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
	inputProps?: InputProps;
};

const TextInput = ({ id, label, placeholder, value, setValue, labelProps, inputProps, isReadOnly }: Props) => {
	return (
		<>
			<label
				htmlFor={id}
				style={{
					color: 'white',
					fontWeight: '500',
					marginBottom: 3,
					fontFamily: 'Arial',
				}}
				{...labelProps}
			>
				{label}
			</label>
			<Input
				id={id}
				placeholder={placeholder}
				value={value || ''}
				onChange={
					setValue &&
					((e: ChangeEvent<HTMLInputElement>) => {
						setValue(e.target.value);
					})
				}
				p="10px"
				fontSize="1.125rem"
				lineHeight="1.75rem"
				color="white"
				background="#374151"
				_hover={{ background: '#4b5563' }}
				borderRadius="10px"
				borderColor="#1e40af"
				readOnly={isReadOnly}
				{...inputProps}
			/>
		</>
	);
};

export default TextInput;
