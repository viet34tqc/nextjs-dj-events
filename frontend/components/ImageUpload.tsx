import styles from '@/styles/EditForm.module.scss';
import eventApi from 'api/eventApi';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface ImageUploadProps {
	evtId: string;
	imageUploaded: () => void;
	token: string;
}

const ImageUpload = ({ evtId, imageUploaded, token }: ImageUploadProps) => {
	const [image, setImage] = useState<Blob | string>('');
	const [disable, setDisabled] = useState(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('files', image);
		formData.append('ref', 'events');
		formData.append('refId', evtId);
		formData.append('field', 'image');

		try {
			setDisabled(true); // Disable the submit button
			await eventApi.upload(formData, token); // Here we update the event's thumbnail
			imageUploaded(); // Then we update the event's preview image on edit page and close the modal
			toast.success('Successfully updated');
		} catch (e) {
			toast.error(e.message);
		}
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		setImage(e.target.files?.[0] || '');
	};

	return (
		<div className={styles.editForm}>
			<h1>Upload Event Image</h1>
			<ToastContainer />
			<form onSubmit={handleSubmit}>
				<div className={styles.file}>
					<input type="file" onChange={handleFileChange} />
				</div>
				<input
					type="submit"
					disabled={!image || disable} // the button disabled when no input or when the form is submitting
					value="Upload"
					className="btn"
				/>
			</form>
		</div>
	);
};

export default ImageUpload;
