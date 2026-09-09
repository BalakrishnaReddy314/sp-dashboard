import React, { useState, useMemo } from 'react';
import styles from './TemplateCodeExplorer.module.css';

interface DomainFilter {
  id: string;
  label: string;
  count?: number;
}

interface ChoiceValue {
  id: string;
  code: string;
  title: string;
  badgeCount: number;
  domainId: string;
}

const DOMAINS: DomainFilter[] = [
  { id: 'all', label: 'All domains', count: 200 },
  { id: 'finance', label: 'Finance & controlling' },
  { id: 'hr', label: 'People & culture' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'legal', label: 'Legal & compliance' },
  { id: 'operations', label: 'Operations' },
  { id: 'security', label: 'Security' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'sales', label: 'Sales' },
];

const INITIAL_ITEMS: ChoiceValue[] = [
  { id: '1', code: 'FIN-001', title: 'Policy review', badgeCount: 2, domainId: 'finance' },
  { id: '2', code: 'HR-001', title: 'Quarterly assessment', badgeCount: 2, domainId: 'hr' },
  { id: '3', code: 'ENG-001', title: 'Audit protocol', badgeCount: 2, domainId: 'engineering' },
  { id: '4', code: 'LEG-001', title: 'Compliance guide', badgeCount: 2, domainId: 'legal' },
  { id: '5', code: 'OPS-001', title: 'Operating framework', badgeCount: 2, domainId: 'operations' },
  { id: '6', code: 'SEC-001', title: 'Technical specification', badgeCount: 2, domainId: 'security' },
  { id: '7', code: 'MKT-001', title: 'Executive summary', badgeCount: 2, domainId: 'marketing' },
  { id: '8', code: 'SAL-001', title: 'SLA standard', badgeCount: 2, domainId: 'sales' },
  { id: '9', code: 'FIN-002', title: 'Architecture blueprint', badgeCount: 2, domainId: 'finance' },
  { id: '10', code: 'HR-002', title: 'Risk evaluation', badgeCount: 2, domainId: 'hr' },
  { id: '11', code: 'ENG-002', title: 'Procurement schedule', badgeCount: 2, domainId: 'engineering' },
  { id: '12', code: 'LEG-002', title: 'Strategic roadmap', badgeCount: 2, domainId: 'legal' },
  { id: '13', code: 'OPS-002', title: 'Vendor agreement', badgeCount: 2, domainId: 'operations' },
  { id: '14', code: 'SEC-002', title: 'Incident playbook', badgeCount: 2, domainId: 'security' },
  { id: '15', code: 'MKT-002', title: 'Data governance schema', badgeCount: 2, domainId: 'marketing' },
  { id: '16', code: 'SAL-002', title: 'Staffing model', badgeCount: 2, domainId: 'sales' },
  { id: '17', code: 'FIN-003', title: 'Budget forecast', badgeCount: 2, domainId: 'finance' },
  { id: '18', code: 'HR-003', title: 'Recovery plan', badgeCount: 2, domainId: 'hr' },
  { id: '19', code: 'ENG-003', title: 'Quality assurance check', badgeCount: 2, domainId: 'engineering' },
];

export interface MetadataExplorerProps {
  onSelectValue?: (value: ChoiceValue) => void;
  onViewAll?: () => void;
}

export const TemplateCodeExplorer: React.FC<MetadataExplorerProps> = ({
  onSelectValue,
  onViewAll,
}) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = useMemo(() => {
    return INITIAL_ITEMS.filter((item) => {
      const matchesDomain = selectedDomain === 'all' || item.domainId === selectedDomain;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDomain && matchesSearch;
    });
  }, [selectedDomain, searchQuery]);

  return (
    <div className={styles.container}>
      {/* Top Header Section */}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <div className={styles.titleRow}>
            {/* Grid/App icon */}
            <svg
              className={styles.titleIcon}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
            <h2 className={styles.title}>
              Metadata choice value explorer{' '}
              <span className={styles.titleSub}>(200 enterprise values)</span>
            </h2>
          </div>
          <p className={styles.subtitle}>
            Quickly isolate a metadata value to inspect associated documents, distribution volume, and health.
          </p>
        </div>

        {/* Action controls */}
        <div className={styles.actions}>
          <div className={styles.searchWrapper}>
            <svg
              className={styles.searchIcon}
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search 200 choices"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="button" className={styles.viewAllBtn} onClick={onViewAll}>
            View all
          </button>
        </div>
      </div>

      {/* Filter Tabs / Domain Pills */}
      <div className={styles.pillsList}>
        {DOMAINS.map((domain) => {
          const isActive = selectedDomain === domain.id;
          return (
            <button
              key={domain.id}
              type="button"
              className={`${styles.pill} ${isActive ? styles.pillActive : ''}`}
              onClick={() => setSelectedDomain(domain.id)}
            >
              {domain.label}
              {domain.count !== undefined ? ` (${domain.count})` : ''}
            </button>
          );
        })}
      </div>

      <div className={styles.divider} />

      {/* Info Status Row */}
      <div className={styles.statusBar}>
        <span className={styles.statusCount}>
          Showing {filteredItems.length} of 200 choice values
        </span>
        <span className={styles.statusHint}>
          Click a value to filter document records
        </span>
      </div>

      {/* Values Box / Scroll Container */}
      <div className={styles.valuesBox}>
        <div className={styles.valuesGrid}>
          {filteredItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={styles.tagItem}
              onClick={() => onSelectValue?.(item)}
            >
              <span className={styles.tagCode}>{item.code}</span>
              <span className={styles.tagTitle}>{item.title}</span>
              <span className={styles.tagBadge}>{item.badgeCount}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateCodeExplorer;
