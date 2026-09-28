import React, { useState } from 'react';
import { StackedBarChart, IChartProps, IChartDataPoint } from '@fluentui/react-charting';
import { Icon } from '@fluentui/react/lib/Icon';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import styles from './SecurityComplianceWidget.module.css';

// Initialize Fluent UI icons (if not already done at app root)
initializeIcons();

export interface TierData {
  id: string;
  name: string;
  count: number;
  color: string;
}

interface SecurityComplianceWidgetProps {
  tiers?: TierData[];
  onTierSelect?: (tierId: string | null) => void;
}

const DEFAULT_TIERS: TierData[] = [
  { id: 'internal', name: 'Internal', count: 69, color: '#0078d4' },
  { id: 'confidential', name: 'Confidential', count: 68, color: '#f59e0b' },
  { id: 'restricted', name: 'Restricted', count: 68, color: '#d13438' },
];

export const SecurityComplianceWidget: React.FC<SecurityComplianceWidgetProps> = ({
  tiers = DEFAULT_TIERS,
  onTierSelect,
}) => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const totalCount = tiers.reduce((sum, item) => sum + item.count, 0);

  const handleCardClick = (tierId: string) => {
    const nextSelected = selectedTier === tierId ? null : tierId;
    setSelectedTier(nextSelected);
    if (onTierSelect) {
      onTierSelect(nextSelected);
    }
  };

  // Prepare chart data format for Fluent UI 8 StackedBarChart
  const chartPoints: IChartDataPoint[] = tiers.map((tier) => ({
    legend: tier.name,
    data: tier.count,
    color: tier.color,
    onClick: () => handleCardClick(tier.id),
  }));

  const chartData: IChartProps = {
    chartTitle: 'Security Compliance Tiers',
    chartData: chartPoints,
  };

  return (
    <div className={styles.container}>
      {/* Top Header Row */}
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={styles.shieldIconWrapper}>
            <Icon iconName="ShieldAlert" className={styles.shieldIcon} />
          </span>
          <h2 className={styles.title}>{tiers.length} Security Compliance Tiers</h2>
        </div>
        <div className={styles.pathMeta}>
          {tiers.map((t) => t.name).join(' / ')}
        </div>
      </div>

      {/* Subtitle */}
      <p className={styles.subtitle}>
        Categorized under corporate data classification tiers. Click any card to filter.
      </p>

      {/* Fluent UI 8 Stacked Bar Chart */}
      <div className={styles.chartContainer}>
        <StackedBarChart
          data={chartData}
          barHeight={16}
          hideNumberDisplay={true}
          hideLegend={true}
          styles={{
            root: { width: '100%' },
            chart: { width: '100%', borderRadius: 4, overflow: 'hidden' },
          }}
        />
      </div>

      {/* Summary Cards */}
      <div className={styles.cardsGrid}>
        {tiers.map((tier) => {
          const percentage = totalCount > 0 ? Math.round((tier.count / totalCount) * 100) : 0;
          const isSelected = selectedTier === tier.id;

          return (
            <div
              key={tier.id}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
              onClick={() => handleCardClick(tier.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(tier.id);
                }
              }}
            >
              <div className={styles.cardHeader}>
                <span
                  className={styles.colorIndicatorDot}
                  style={{ backgroundColor: tier.color }}
                />
                <span className={styles.tierName}>{tier.name}</span>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.count}>{tier.count}</span>
                <span className={styles.percentage}>{percentage}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SecurityComplianceWidget;
