import React, { InputHTMLAttributes } from 'react';
import {
	DeepMap,
	DeepPartial,
	FieldError,
	UseFormRegister,
} from 'react-hook-form';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	register: UseFormRegister<any>;
	formErrors: DeepMap<DeepPartial<any>, FieldError>;
}

const InputField = ({
	name,
	label,
	register,
	formErrors,
	...inputProps
}: InputFieldProps) => {
	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<input id={name} {...register(name)} {...inputProps} />
			{formErrors?.[name]?.message && (
				<p style={{ color: 'red', fontSize: '13px' }}>
					{formErrors?.[name]?.message}
				</p>
			)}
		</div>
	);
};

export default InputField;
