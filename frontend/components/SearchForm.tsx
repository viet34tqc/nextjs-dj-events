import styles from '@/styles/SearchForm.module.scss';
import { useRouter } from 'next/dist/client/router';
import { FormEvent, useState } from 'react';

const SearchForm = () => {
	const [term, setTerm] = useState('');

	const router = useRouter();

	const handleInput = (e: FormEvent<HTMLInputElement>) => {
		const { value } = e.target as HTMLInputElement;
		setTerm(value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		router.push(`/events/search/?term=${term}`);
		setTerm('');
	};

	return (
		<form className={styles.search} onSubmit={handleSubmit}>
			<input
				type="text"
				value={term}
				onInput={handleInput}
				placeholder="Search events"
			/>
		</form>
	);
};

export default SearchForm;
