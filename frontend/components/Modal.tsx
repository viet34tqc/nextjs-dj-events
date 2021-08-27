import styles from '@/styles/Modal.module.scss';
import { MouseEvent, ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';

// https://devrecipes.net/modal-component-with-next-js/
// We will use the React Portal to build the modal
// Basically, React Portal allows you to render a component in a specific DOM node outside the root one that renders the rest of the UI.

interface ModalProps {
	show: boolean;
	onClose: () => void;
	children: ReactNode;
	title?: string;
}

const Modal = ({ show, onClose, children, title }: ModalProps) => {
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => {
		setIsBrowser(true);

		// Close modal when press Esc.
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && show) {
				onClose();
			}
		});
	}, [show, onClose]);

	const handleClose = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		onClose();
	};

	const modalContent = show ? (
		<div className={styles.wrapper}>
			<div className={styles.overlay} onClick={onClose}></div>
			<div className={styles.modal}>
				<div className={styles.header}>
					<button className={styles.close} type="button" onClick={onClose}>
						<FaTimes />
					</button>
				</div>
				{title && <div>{title}</div>}
				<div className={styles.body}>{children}</div>
			</div>
		</div>
	) : null;

	if (isBrowser) {
		return ReactDOM.createPortal(
			modalContent,
			document.getElementById('modal-root') as HTMLElement
		);
	} else {
		return null;
	}
};

export default Modal;
