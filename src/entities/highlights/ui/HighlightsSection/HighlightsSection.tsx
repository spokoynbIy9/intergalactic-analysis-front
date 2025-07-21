import { Typography } from '@/shared/ui/Typography';
import type { AnalysisHighlight } from '../../model/types/highlight.type';
import type { FC } from 'react';
import styles from './HighlightsSection.module.css';
import { HighlightCard } from '../HighlightCard';

type HighlightsSectionProps = {
	highlights: AnalysisHighlight[];
};

export const HighlightsSection: FC<HighlightsSectionProps> = ({
	highlights,
}) => {
	if (highlights.length === 0) {
		return (
			<Typography size="xl" className={styles.highlightsPlaceholder}>
				Здесь появятся хайлайты
			</Typography>
		);
	}

	return (
		<div className={styles.highlightsGrid}>
			{highlights.map((highlight: AnalysisHighlight, index: number) => (
				<HighlightCard key={index} highlight={highlight} />
			))}
		</div>
	);
};
