import { useMemo, useState } from 'react';
import { Button, Card, Dialog, DialogBody, DialogContent, DialogSurface, DialogTitle, Input, Tab, TabList } from '@fluentui/react-components';
import { DismissRegular, GridRegular, SearchRegular } from '@fluentui/react-icons';
import { domains, metadataChoices } from '../data/mockData';
import type { MetadataChoice } from '../types/documents';
import styles from '../styles.module.css';

interface Props {
  choices: MetadataChoice[];
  activeDomain: string;
  selectedChoice: MetadataChoice | null;
  query: string;
  onDomainChange: (value: string) => void;
  onQueryChange: (value: string) => void;
  onChoiceChange: (value: MetadataChoice | null) => void;
}

export function MetadataExplorer({ choices, activeDomain, selectedChoice, query, onDomainChange, onQueryChange, onChoiceChange }: Props) {
  const [isCatalogOpen, setCatalogOpen] = useState(false);
  const [catalogQuery, setCatalogQuery] = useState('');
  const catalogChoices = useMemo(() => metadataChoices.filter(choice => `${choice.id} ${choice.name} ${choice.domain}`.toLowerCase().includes(catalogQuery.toLowerCase())), [catalogQuery]);
  const selectFromCatalog = (choice: MetadataChoice) => { onChoiceChange(choice); setCatalogOpen(false); };

  return <>
    <Card className={`${styles.explorer} ${styles.panel}`}>
      <div className={styles.panelHeading}>
        <div><h2><GridRegular /> Metadata choice value explorer <b>(200 enterprise values)</b></h2><p>Quickly isolate a metadata value to inspect associated documents, distribution volume, and health.</p></div>
        <div className={styles.explorerActions}><Input contentBefore={<SearchRegular />} placeholder="Search 200 choices" value={query} onChange={(_, data) => onQueryChange(data.value)} /><Button appearance="secondary" onClick={() => setCatalogOpen(true)}>View all</Button></div>
      </div>
      <TabList className={styles.domainTabs} selectedValue={activeDomain} onTabSelect={(_, data) => onDomainChange(data.value as string)}><Tab value="All">All domains <b>(200)</b></Tab>{domains.map(([code, label]) => <Tab value={code} key={code}>{label}</Tab>)}</TabList>
      <div className={styles.choiceHelp}><span>Showing {choices.length} of 200 choice values</span><em>Click a value to filter document records</em></div>
      <div className={styles.choiceGrid}>{choices.map(choice => <Button appearance={selectedChoice?.id === choice.id ? 'primary' : 'outline'} className={styles.choice} key={choice.id} onClick={() => onChoiceChange(selectedChoice?.id === choice.id ? null : choice)}><code>{choice.id}</code><span>{choice.name}</span><b>{choice.count}</b></Button>)}</div>
    </Card>
    <Dialog open={isCatalogOpen} onOpenChange={(_, data) => setCatalogOpen(data.open)}>
      <DialogSurface className={styles.catalogDialog}>
        <DialogBody>
          <div className={styles.catalogTitleRow}><DialogTitle>Complete 200 Choice Values Catalog <small>Browse document counts for every single enterprise metadata choice.</small></DialogTitle><Button appearance="subtle" icon={<DismissRegular />} aria-label="Close catalog" onClick={() => setCatalogOpen(false)} /></div>
          <DialogContent className={styles.catalogContent}>
            <Input className={styles.catalogSearch} contentBefore={<SearchRegular />} placeholder="Filter modal choices by code or description..." value={catalogQuery} onChange={(_, data) => setCatalogQuery(data.value)} />
            <div className={styles.catalogScroll}>{domains.map(([code, label]) => { const group = catalogChoices.filter(choice => choice.domain === code); if (!group.length) return null; return <section className={styles.catalogGroup} key={code}><div className={styles.catalogGroupTitle}><strong>{label}</strong><code>{code}</code></div><div className={styles.catalogGrid}>{group.map(choice => <Button key={choice.id} appearance={selectedChoice?.id === choice.id ? 'primary' : 'outline'} className={styles.catalogChoice} onClick={() => selectFromCatalog(choice)}><code>{choice.id}</code><span>{choice.name}</span><b>{choice.count}</b></Button>)}</div></section>; })}</div>
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  </>;
}
