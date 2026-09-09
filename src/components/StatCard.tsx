import React from 'react';
import styles from './StatCard.module.css';

export interface StatItem {
  id: string;
  title: string;
  value: string | number;
  highlightText?: string;
  highlightVariant?: 'muted' | 'green' | 'amber';
  description: string;
  icon: React.ReactNode;
  iconTheme: 'blue' | 'purple' | 'green' | 'amber';
}

interface StatCardProps {
  data: StatItem;
}

export const StatCard: React.FC<StatCardProps> = ({ data }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{data.title}</span>
        <div className={`${styles.iconWrapper} ${styles[data.iconTheme]}`}>
          {data.icon}
        </div>
      </div>

      <div className={styles.valueRow}>
        <span className={styles.value}>{data.value}</span>
        {data.highlightText && (
          <span
            className={`${styles.highlight} ${
              data.highlightVariant ? styles[data.highlightVariant] : ''
            }`}
          >
            {data.highlightText}
          </span>
        )}
      </div>

      <p className={styles.description}>{data.description}</p>
    </div>
  );
};

// Ready-to-use grid wrapper with the exact data from the screenshot
export const StatCardsGrid: React.FC = () => {
  const stats: StatItem[] = [
    {
      id: '1',
      title: 'TOTAL DOCUMENTS',
      value: '450',
      description: 'Across all site document libraries',
      iconTheme: 'blue',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      id: '2',
      title: 'METADATA CHOICES',
      value: '173',
      highlightText: '/ 200 defined',
      highlightVariant: 'muted',
      description: 'Taxonomy property values cataloged',
      iconTheme: 'purple',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      ),
    },
    {
      id: '3',
      title: 'CHOICE COVERAGE',
      value: '87%',
      highlightText: 'choices utilized',
      highlightVariant: 'green',
      description: 'Values with ≥ 1 document tagged',
      iconTheme: 'green',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      id: '4',
      title: 'RESTRICTED / CONFID.',
      value: '225',
      highlightText: 'audited',
      highlightVariant: 'amber',
      description: 'Protected by sensitivity labels',
      iconTheme: 'amber',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
  ];

  return (
    <div className={styles.grid}>
      {stats.map((stat) => (
        <StatCard key={stat.id} data={stat} />
      ))}
    </div>
  );
};
