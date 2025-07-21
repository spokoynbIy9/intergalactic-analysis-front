import { Button } from '@/shared/ui/Button';
import { Typography } from '@/shared/ui/Typography';

import styles from './GeneratePage.module.css';
import { useState } from 'react';
import { API_HOST } from '@/shared/config/api';
import { Loader } from '@/shared/ui/Loader';
import cn from 'classnames';
import { Clear } from '@/shared/assets/icons/iconsName';

const DEFAULT_SIZE = 0.01;

const GeneratePage = () => {
	const [isGenerating, setIsGenerating] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const onClear = () => {
		setSuccessMessage(null);
		setError(null);
	};

	const handleGenerate = async () => {
		if (isGenerating || error) {
			return;
		}

		try {
			setIsGenerating(true);
			setError(null);

			const response = await fetch(
				`${API_HOST}/report?size=${DEFAULT_SIZE}`,
				{
					method: 'GET',
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.error
						? `Произошла ошибка: ${errorData.error}`
						: 'Неизвестная ошибка при попытке сгенерировать отчёт'
				);
			}

			const contentDisposition = response.headers.get(
				'Content-Disposition'
			);
			const filename = contentDisposition
				? contentDisposition.split('filename=')[1].replace(/"/g, '')
				: 'report.csv';

			const blob = await response.blob();

			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = filename;

			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);

			setSuccessMessage('файл сгенерирован!');
		} catch (error) {
			setError(
				error instanceof Error
					? error.message
					: 'Неизвестная ошибка при попытке сгенерировать отчёт'
			);
		} finally {
			setIsGenerating(false);
		}
	};

	// useEffect(() => {
	// 	if (!successMessage) {
	// 		return;
	// 	}

	// 	const timeout = setTimeout(() => {
	// 		setSuccessMessage(null);
	// 	}, 2000);

	// 	return () => clearTimeout(timeout);
	// }, [successMessage]);

	const renderStatusText = () => {
		if (error) {
			return 'Ошибка';
		}
		if (isGenerating) {
			return <Loader />;
		}
		if (successMessage) {
			return 'Done!';
		}

		return 'Начать генерацию';
	};

	return (
		<div className={styles.container}>
			<Typography as="h1" size="m" className={styles.title}>
				Сгенерируйте готовый csv-файл нажатием одной кнопки
			</Typography>

			<div className={styles.buttonWrapper}>
				<Button
					type="button"
					variant={isGenerating ? 'process' : 'primary'}
					onClick={handleGenerate}
					className={cn(styles.generateButton, {
						[styles.isGenerating]: isGenerating,
						[styles.completed]: successMessage,
						[styles.gotError]: error,
					})}
				>
					{renderStatusText()}
				</Button>

				{successMessage || error ? (
					<Button
						type="button"
						variant="clear"
						className={cn(
							styles.clearFileButton,
							styles.customBorder
						)}
						onClick={onClear}
					>
						<Clear size={22} />
					</Button>
				) : (
					<></>
				)}
			</div>
			{successMessage && (
				<Typography as="p" size="l">
					{successMessage}
				</Typography>
			)}
			{error && (
				<Typography as="p" size="l" color="error">
					{error}
				</Typography>
			)}
		</div>
	);
};

export default GeneratePage;
