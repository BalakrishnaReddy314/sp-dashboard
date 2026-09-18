import React from 'react';
import { Layer24Regular } from '@fluentui/react-icons';
import styles from './DocumentSummaryCard.module.css';

export interface DocumentSummaryCardProps {
  title?: string;
  badgeText?: string;
  matchingCount?: number;
  totalCount?: number;
  statusCount?: number;
  classificationCount?: number;
  foldersSubtitle?: string;
  progressPercent?: number;
}

export const DocumentSummaryCard: React.FC<DocumentSummaryCardProps> = ({
  title = 'Filtered Document Records',
  badgeText = '100% OF LIBRARY',
  matchingCount = 205,
  totalCount = 205,
  statusCount = 2,
  classificationCount = 3,
  foldersSubtitle = 'All 52 Folders Active',
  progressPercent = 100,
}) => {
  return (
    <div className={styles.card}>
      {/* Left side info */}
      <div className={styles.leftSection}>
        <div className={styles.iconBox}>
          <Layer24Regular />
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.headerRow}>
            <span className={styles.categoryTitle}>{title}</span>
            {badgeText && <span className={styles.badge}>{badgeText}</span>}
          </div>

          <div className={styles.metricsRow}>
            <span className={styles.highlightCount}>{matchingCount}</span>
            <span className={styles.description}>
              matching documents out of <strong>{totalCount}</strong> total
            </span>
          </div>
        </div>
      </div>

      {/* Right side status & progress */}
      <div className={styles.rightSection}>
        <div className={styles.divider} />

        <div className={styles.statusContainer}>
          <span className={styles.statusTitle}>
            {statusCount} Statuses &bull; {classificationCount} Classifications
          </span>
          <span className={styles.statusSubtitle}>{foldersSubtitle}</span>
          <div className={styles.progressBarTrack}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentSummaryCard;
