import React, { InputHTMLAttributes } from 'react';
import {
	DeepMap,
	DeepPartial,
	FieldError,
	UseFormRegister,
} from 'react-hook-form';

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
	name: string;
	label?: string;
	register: UseFormRegister<any>;
	formErrors: DeepMap<DeepPartial<any>, FieldError>;
}

const Textarea = ({
	name,
	label,
	register,
	formErrors,
	...inputProps
}: TextareaProps) => {
	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<textarea id={name} {...register(name)} {...inputProps} />
			{formErrors?.[name]?.message && (
				<p style={{ color: 'red', fontSize: '13px' }}>
					{formErrors?.[name]?.message}
				</p>
			)}
		</div>
	);
};

export default Textarea;
