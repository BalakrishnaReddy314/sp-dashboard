import React from 'react';
import styles from './ViewModeToggle.module.css';

export type ViewMode = 'hybrid' | 'cards_numbers' | 'charts_only';

export interface ViewModeOption {
  value: ViewMode;
  label: string;
}

export interface ViewModeToggleProps {
  label?: string;
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
  options?: ViewModeOption[];
}

const DEFAULT_OPTIONS: ViewModeOption[] = [
  { value: 'hybrid', label: 'Hybrid (Cards + Charts)' },
  { value: 'cards_numbers', label: 'Cards & Numbers' },
  { value: 'charts_only', label: 'Charts Only' },
];

export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  label = 'View mode for Numbers:',
  value,
  onChange,
  options = DEFAULT_OPTIONS,
}) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <div className={styles.segmentedControl} role="tablist" aria-label={label}>
        {options.map((option) => {
          const isActive = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.segmentButton} ${isActive ? styles.active : ''}`}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ViewModeToggle;
