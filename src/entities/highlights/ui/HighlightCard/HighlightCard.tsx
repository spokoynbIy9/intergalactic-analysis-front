import type { WithClassName } from '@/shared/types';
import type { FC } from 'react';
import type { AnalysisHighlight } from '../../model/types/highlight.type';
import { Typography } from '@/shared/ui/Typography';
import cn from 'classnames';

import styles from './HighlightCard.module.css';

type HighlightCardProps = WithClassName & {
	highlight: AnalysisHighlight;
};

export const HighlightCard: FC<HighlightCardProps> = ({
	highlight,
	className,
}) => {
	return (
		<div className={cn(styles.highlightCard, className)}>
			<Typography size="xl" weight="medium">
				{highlight.title}
			</Typography>
			<Typography size="xs">{highlight.description}</Typography>
		</div>
	);
};
