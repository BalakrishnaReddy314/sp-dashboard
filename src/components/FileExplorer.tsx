import React, { useState } from 'react';
import {
  Folder24Regular,
  FolderRegular,
  ChevronRight16Regular,
  ChevronDown16Regular,
  ArrowLeft16Regular,
} from '@fluentui/react-icons';
import styles from './FolderExplorer.module.css';
import { FolderExplorerProps, FolderItem } from './FolderExplorer.types';

export const FolderExplorer: React.FC<FolderExplorerProps> = ({
  data,
  title = '50+ FOLDER & NESTED SUBFOLDER EXPLORER',
  subtitle = 'Supports chevron expansions and full subfolder drilldown',
}) => {
  // Keeps track of the folder currently drilled into (null = root level)
  const [drilldownFolder, setDrilldownFolder] = useState<FolderItem | null>(null);

  // Keeps track of which folders are expanded via chevrons
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  const toggleExpand = (folderName: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const handleDrilldown = (folder: FolderItem) => {
    setDrilldownFolder(folder);
  };

  const handleBack = () => {
    setDrilldownFolder(null);
  };

  return (
    <div className={styles.container}>
      {/* Header Banner */}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <span className={styles.folderHeaderIcon}>
            <Folder24Regular />
          </span>
          <span>{title}</span>
        </div>
        {subtitle && <div className={styles.headerSubtitle}>{subtitle}</div>}
      </div>

      {drilldownFolder ? (
        /* --- DRILLDOWN VIEW --- */
        <div>
          <div className={styles.drilldownBar}>
            <button className={styles.backButton} onClick={handleBack}>
              <ArrowLeft16Regular /> Back to all {data.length} Folders
            </button>
            <div className={styles.currentFolderBadge}>
              <FolderRegular className={styles.currentFolderIcon} />
              <span>{drilldownFolder.folder}</span>
              <span className={styles.docsCount}>{drilldownFolder.count.toLocaleString()} docs</span>
            </div>
          </div>

          <div className={styles.drilldownContextText}>
            Showing nested subfolder volume under <strong>{drilldownFolder.folder}</strong>:
          </div>

          <div className={styles.folderList}>
            {drilldownFolder.subFolders?.map((sub) => {
              const percentage =
                drilldownFolder.count > 0
                  ? Math.round((sub.count / drilldownFolder.count) * 100)
                  : 0;

              return (
                <div key={sub.subFolder} className={styles.folderCard}>
                  <div className={styles.cardMainRow}>
                    <div className={styles.cardHeaderRow}>
                      <span className={styles.drilldownFolderTitle}>
                        <FolderRegular className={styles.folderHeaderIcon} />
                        {sub.subFolder}
                      </span>
                      <div className={styles.cardRightActions}>
                        <span className={styles.subFolderPercentage}>{percentage}%</span>
                        <span className={styles.subCountBadge}>
                          {sub.count.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    {/* Blue horizontal bar */}
                    <div className={styles.progressBarTrack}>
                      <div
                        className={styles.progressBarFill}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* --- ROOT LIST VIEW --- */
        <div className={styles.folderList}>
          {data.map((item) => {
            const isExpanded = !!expandedFolders[item.folder];
            const hasSubfolders = item.subFolders && item.subFolders.length > 0;

            return (
              <div key={item.folder} className={styles.folderCard}>
                <div className={styles.cardMainRow}>
                  <div className={styles.cardHeaderRow}>
                    <button
                      className={styles.chevronBtn}
                      onClick={() => toggleExpand(item.folder)}
                      aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      {isExpanded ? <ChevronDown16Regular /> : <ChevronRight16Regular />}
                    </button>
                    <span className={styles.folderTitle}>{item.folder}</span>

                    <div className={styles.cardRightActions}>
                      <span className={styles.badgeCount}>
                        {hasSubfolders ? item.subFolders!.length : item.count}
                      </span>
                      {hasSubfolders && (
                        <button
                          className={styles.drilldownLink}
                          onClick={() => handleDrilldown(item)}
                        >
                          Drilldown &rarr;
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Accent Line Indicator */}
                  <div className={styles.progressBarTrack}>
                    <div className={styles.progressBarFill} style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Inline Expanded Subfolder List */}
                {isExpanded && hasSubfolders && (
                  <div className={styles.expandedSection}>
                    <div className={styles.expandedTitle}>
                      SUBFOLDERS IN {item.folder}:
                    </div>
                    <div className={styles.subFolderList}>
                      {item.subFolders!.map((sub) => (
                        <div key={sub.subFolder} className={styles.subFolderRow}>
                          <div className={styles.subFolderInfo}>
                            <span className={styles.bulletDot} />
                            <span>{sub.subFolder}</span>
                          </div>
                          <span className={styles.subFolderCount}>
                            {sub.count.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
