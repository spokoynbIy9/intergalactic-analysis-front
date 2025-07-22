import type { FC, PropsWithChildren } from 'react';
import { Portal } from '../Portal';
import cn from 'classnames';
import styles from './Modal.module.css';
import { Button } from '../Button';
import { Cross } from '@/shared/assets/icons/iconsName';

type ModalProps = PropsWithChildren & {
	isOpen: boolean;
	onClose?: () => void;
};

export const Modal: FC<ModalProps> = ({ isOpen, children, onClose }) => {
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget && onClose) {
			onClose();
		}
	};

	const handleModalClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<Portal>
			<div
				className={cn(styles.backdrop, {
					[styles.backdropShown]: isOpen,
				})}
				onClick={handleBackdropClick}
			>
				<div className={styles.modal} onClick={handleModalClick}>
					{onClose && (
						<Button
							variant="clear"
							className={styles.closeButton}
							onClick={onClose}
						>
							<Cross size={32} />
						</Button>
					)}
					{children}
				</div>
			</div>
		</Portal>
	);
};
