import { Avatar, Button, Tooltip } from '@fluentui/react-components';
import { ArrowDownloadRegular, ArrowSyncRegular, DocumentRegular, AlertRegular } from '@fluentui/react-icons';
import styles from '../styles.module.css';

interface HeaderProps { onReset: () => void; }
export function Header({ onReset }: HeaderProps) { return <header className={styles.topbar}><div className={styles.brandMark}><DocumentRegular /></div><div className={styles.brandCopy}><h1>SharePoint Document Intelligence <span>Live sync</span></h1><p>Corporate Portal Documents <b>•</b> 200 taxonomy metadata values</p></div><div className={styles.topActions}><Button appearance="outline" icon={<ArrowDownloadRegular />}>Export CSV</Button><Button appearance="subtle" icon={<ArrowSyncRegular />} onClick={onReset}>Reset filters</Button><Tooltip content="Notifications" relationship="label"><Button appearance="subtle" icon={<AlertRegular />} aria-label="Notifications" /></Tooltip><Avatar name="Balakrishna" size={32} color="brand" /></div></header>; }
