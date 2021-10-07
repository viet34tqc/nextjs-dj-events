import eventApi from 'api/eventApi';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import { Event } from 'type/event';
import ImageUpload from '../../../components/ImageUpload';
import Modal from '../../../components/Modal';

interface ImagePreviewProps {
	evt: Event;
	token: string;
}

const ImagePreview = ({ evt, token }: ImagePreviewProps) => {
	const [imagePreview, setImagePreview] = useState(
		evt?.image?.formats?.thumbnail?.url
	);

	const imageUploaded = async () => {
		const data = await eventApi.getById(evt.id);
		setImagePreview(data.image.formats.thumbnail.url);
		setShowModal(false);
	};

	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<h2>Event Image</h2>
			{imagePreview ? (
				<>
					<Image src={imagePreview} height={100} width={170} alt={evt.slug} />
				</>
			) : (
				<div>
					<p>No image uploaded</p>
				</div>
			)}

			<div>
				<button
					className="btn-icon btn-secondary"
					onClick={() => setShowModal(true)}
				>
					<FaImage /> Edit image
				</button>
			</div>
			<Modal show={showModal} onClose={() => setShowModal(false)}>
				<ImageUpload
					evtId={evt.id}
					imageUploaded={imageUploaded}
					token={token}
				/>
			</Modal>
		</>
	);
};

export default ImagePreview;
