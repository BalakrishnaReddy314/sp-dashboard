export type Classification = 'Combined' | 'Type 1' | 'Type 2';
export type FileType = 'DOCX' | 'PDF' | 'XLSX' | 'PPTX' | 'ONE';
export type LifecycleStatus = 'Approved' | 'In review' | 'Attention' | 'Draft' | 'Archived';
export type Sensitivity = 'Public' | 'General' | 'Confidential' | 'Restricted';

export interface MetadataChoice { id: string; name: string; domain: string; count: number; }
export interface DocumentRecord { id: string; title: string; choice: MetadataChoice; type: FileType; author: string; classification: Exclude<Classification, 'Combined'>; status: LifecycleStatus; sensitivity: Sensitivity; date: string; size: string; }
export interface Filters { domain: string; choice: MetadataChoice | null; fileType: FileType | 'All'; status: LifecycleStatus | 'All'; sensitivity: Sensitivity | 'All'; query: string; choiceQuery: string; classification: Classification; }
