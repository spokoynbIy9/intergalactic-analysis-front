import type { FC, PropsWithChildren } from 'react';
import { Portal } from '../Portal';
import cn from 'classnames';
import styles from './Modal.module.css';
import { Button } from '../Button';
import { Cross } from '@/shared/assets/icons/iconsName';
import type { WithTestId } from '@/shared/types/WithTestId';

type ModalProps = PropsWithChildren &
	WithTestId & {
		isOpen: boolean;
		onClose?: () => void;
	};

export const Modal: FC<ModalProps> = ({
	isOpen,
	children,
	onClose,
	'data-testid': testId,
}) => {
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget && onClose) {
			onClose();
		}
	};

	const handleModalClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	if (!isOpen) {
		return null;
	}

	return (
		<Portal>
			<div
				className={cn(styles.backdrop, {
					[styles.backdropShown]: isOpen,
				})}
				onClick={handleBackdropClick}
			>
				<div
					className={styles.modal}
					onClick={handleModalClick}
					data-testid={testId ? `${testId}` : 'modal'}
				>
					{onClose && (
						<Button
							variant="clear"
							className={styles.closeButton}
							onClick={onClose}
							data-testid="modal-close-button"
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
