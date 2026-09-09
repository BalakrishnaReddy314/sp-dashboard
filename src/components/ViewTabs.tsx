import { Tab, TabList } from '@fluentui/react-components';
import type { Classification } from '../types/documents';
import styles from '../styles.module.css';
interface ViewTabsProps { value: Classification; onChange: (value: Classification) => void; }
const tabs: { value: Classification; label: string; count: number }[] = [{ value: 'Combined', label: 'Combined overview', count: 450 }, { value: 'Type 1', label: 'Type 1 documents', count: 225 }, { value: 'Type 2', label: 'Type 2 documents', count: 225 }];
export function ViewTabs({ value, onChange }: ViewTabsProps) { return <section className={styles.viewStrip}><TabList selectedValue={value} onTabSelect={(_, data) => onChange(data.value as Classification)}>{tabs.map(tab => <Tab value={tab.value} key={tab.value}>{tab.label}<b>{tab.count}</b></Tab>)}</TabList></section>; }
