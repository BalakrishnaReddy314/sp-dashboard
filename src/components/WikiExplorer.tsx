import React, { useState, useMemo } from 'react';
import styles from './WikiExplorer.module.css';

// Fluent UI 9 Icons
import {
  Document20Regular,
  Folder20Regular,
  FolderOpen20Regular,
  ChevronRight16Regular,
  ChevronDown16Regular,
  Search20Regular,
  Home20Regular,
  Copy20Regular,
  Print20Regular,
  Person20Regular,
  Calendar20Regular,
  Clock20Regular,
  Warning20Filled,
  ArrowSort20Regular,
  ChevronDoubleDown20Regular,
  ChevronDoubleUp20Regular,
  Checkmark20Regular
} from '@fluentui/react-icons';

export interface WikiPage {
  id: string;
  title: string;
  category?: string; // Optional: If omitted or empty, placed at the parent level
  author?: string;
  date?: string;
  readTime?: string;
  content: string; // Markdown content
}

interface WikiExplorerProps {
  pages?: WikiPage[];
  initialSelectedId?: string;
}

// -------------------------------------------------------------
// Built-in Markdown Renderer
// -------------------------------------------------------------
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const parseInline = (text: string): React.ReactNode[] => {
    // Basic inline formatting: **bold**, *italic*, `code`
    const tokens: React.ReactNode[] = [];
    const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        tokens.push(text.slice(lastIndex, match.index));
      }
      const raw = match[0];
      if (raw.startsWith('**') && raw.endsWith('**')) {
        tokens.push(<strong key={match.index}>{raw.slice(2, -2)}</strong>);
      } else if (raw.startsWith('*') && raw.endsWith('*')) {
        tokens.push(<em key={match.index}>{raw.slice(1, -1)}</em>);
      } else if (raw.startsWith('`') && raw.endsWith('`')) {
        tokens.push(<code key={match.index} className={styles.inlineCode}>{raw.slice(1, -1)}</code>);
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      tokens.push(text.slice(lastIndex));
    }
    return tokens;
  };

  const renderBlocks = () => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Empty line
      if (!line.trim()) {
        i++;
        continue;
      }

      // Headings
      if (line.startsWith('# ')) {
        elements.push(<h1 key={i} className={styles.heading1}>{parseInline(line.slice(2))}</h1>);
        i++;
        continue;
      }
      if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className={styles.heading2}>{parseInline(line.slice(3))}</h2>);
        i++;
        continue;
      }
      if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className={styles.heading3}>{parseInline(line.slice(4))}</h3>);
        i++;
        continue;
      }

      // Warning / Callout syntax: lines starting with `> [!WARNING]` or `> WARNING:`
      if (line.startsWith('> [!WARNING]') || line.startsWith('> WARNING:')) {
        const warningLines: string[] = [];
        // First line warning label
        const firstLineBody = line.replace(/^>\s*(\[!WARNING\]|WARNING:)/, '').trim();
        if (firstLineBody) warningLines.push(firstLineBody);

        i++;
        while (i < lines.length && lines[i].startsWith('>')) {
          warningLines.push(lines[i].replace(/^>\s*/, ''));
          i++;
        }

        elements.push(
          <div key={`warn-${i}`} className={styles.warningCallout}>
            <div className={styles.warningHeader}>
              <Warning20Filled className={styles.warningIcon} />
              <span>WARNING:</span>
            </div>
            <div className={styles.warningContent}>
              {warningLines.map((wLine, idx) => (
                <p key={idx}>{parseInline(wLine)}</p>
              ))}
            </div>
          </div>
        );
        continue;
      }

      // Standard Blockquote
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={i} className={styles.blockquote}>
            {parseInline(line.slice(2))}
          </blockquote>
        );
        i++;
        continue;
      }

      // Ordered list items: 1. Item
      if (/^\d+\.\s/.test(line)) {
        const listItems: React.ReactNode[] = [];
        while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
          const itemText = lines[i].replace(/^\d+\.\s/, '');
          listItems.push(<li key={i}>{parseInline(itemText)}</li>);
          i++;
        }
        elements.push(<ol key={`ol-${i}`} className={styles.orderedList}>{listItems}</ol>);
        continue;
      }

      // Unordered list items: - Item or * Item
      if (/^[-*]\s/.test(line)) {
        const listItems: React.ReactNode[] = [];
        while (i < lines.length && /^[-*]\s/.test(lines[i])) {
          const itemText = lines[i].replace(/^[-*]\s/, '');
          listItems.push(<li key={i}>{parseInline(itemText)}</li>);
          i++;
        }
        elements.push(<ul key={`ul-${i}`} className={styles.unorderedList}>{listItems}</ul>);
        continue;
      }

      // Code Block
      if (line.startsWith('```')) {
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // skip closing ```
        elements.push(
          <pre key={`code-${i}`} className={styles.codeBlock}>
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
        continue;
      }

      // Standard Paragraph
      elements.push(<p key={i} className={styles.paragraph}>{parseInline(line)}</p>);
      i++;
    }

    return elements;
  };

  return <div className={styles.markdownBody}>{renderBlocks()}</div>;
};

// -------------------------------------------------------------
// Sample Initial Data
// -------------------------------------------------------------
const DEFAULT_PAGES: WikiPage[] = [
  {
    id: 'overview',
    title: 'Overview',
    // No category => shows at parent level
    author: 'System Architect',
    date: 'Sep 18, 2026',
    readTime: '2 min read',
    content: `# Engineering Wiki Overview

Welcome to the engineering documentation hub. Browse system guides, architecture tenets, and infrastructure setups.

- Modular micro-frontend architecture
- Zero-trust network compliance
- ADO-aligned pipeline automation`
  },
  {
    id: 'design-principles',
    title: 'Design Principles',
    category: 'Architecture & Standards',
    author: 'System Architect',
    date: 'Sep 20, 2026',
    readTime: '1 min read',
    content: `# Architectural Principles

Guidelines for building reliable and scalable cloud services.

## Core Tenets

1. **Keep It Simple (KISS)**: Minimize extraneous configuration.
2. **Explicit Contracts**: Prefer typed interfaces and schema validation.
3. **Graceful Degradation**: Design for service partition scenarios.

> WARNING:
> Microservices must implement circuit breakers to avoid cascading upstream failures.`
  },
  {
    id: 'security-zero-trust',
    title: 'Security & Zero Trust',
    category: 'Architecture & Standards',
    author: 'SecOps Team',
    date: 'Sep 15, 2026',
    readTime: '4 min read',
    content: `# Security & Zero Trust

All internal ingress traffic requires mTLS authentication and transient JWT tokens.`
  },
  {
    id: 'git-branching',
    title: 'Git Branching Strategy',
    category: 'Engineering Guides',
    author: 'DevEx Lead',
    date: 'Aug 10, 2026',
    readTime: '3 min read',
    content: `# Git Branching Strategy

We enforce trunk-based development with short-lived feature branches protected by branch policies.`
  },
  {
    id: 'cicd-pipeline',
    title: 'CI/CD Pipeline Setup',
    category: 'Engineering Guides',
    author: 'DevOps Eng',
    date: 'Sep 02, 2026',
    readTime: '5 min read',
    content: `# CI/CD Pipeline Setup

Multi-stage deployment configurations powered by Azure DevOps and GitHub Actions.`
  },
  {
    id: 'faq',
    title: 'Frequently Asked Questions',
    // No category => shows at parent level
    author: 'Support Eng',
    date: 'Sep 21, 2026',
    readTime: '2 min read',
    content: `# Frequently Asked Questions

Common questions regarding local environment setups and VPN connections.`
  }
];

// -------------------------------------------------------------
// Wiki Explorer Component
// -------------------------------------------------------------
export const WikiExplorer: React.FC<WikiExplorerProps> = ({
  pages = DEFAULT_PAGES,
  initialSelectedId = 'design-principles'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPageId, setSelectedPageId] = useState<string>(initialSelectedId);
  const [copied, setCopied] = useState(false);

  // Group pages by category (or undefined for root items)
  const categories = useMemo(() => {
    const cats = new Set<string>();
    pages.forEach((p) => {
      if (p.category && p.category.trim() !== '') {
        cats.add(p.category.trim());
      }
    });
    return Array.from(cats);
  }, [pages]);

  // Folder expanded states
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    categories.forEach((cat) => {
      initial[cat] = true; // expand all by default
    });
    return initial;
  });

  const toggleFolder = (category: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const collapseAllFolders = () => {
    setExpandedFolders((prev) => {
      const next: Record<string, boolean> = {};
      Object.keys(prev).forEach((k) => (next[k] = false));
      return next;
    });
  };

  const expandAllFolders = () => {
    setExpandedFolders((prev) => {
      const next: Record<string, boolean> = {};
      Object.keys(prev).forEach((k) => (next[k] = true));
      return next;
    });
  };

  // Filter items according to search query
  const filteredPages = useMemo(() => {
    if (!searchQuery.trim()) return pages;
    const q = searchQuery.toLowerCase();
    return pages.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        p.content.toLowerCase().includes(q)
    );
  }, [pages, searchQuery]);

  // Split into categorized and root-level items
  const { rootPages, categorizedMap } = useMemo(() => {
    const root: WikiPage[] = [];
    const map: Record<string, WikiPage[]> = {};

    filteredPages.forEach((p) => {
      if (!p.category || p.category.trim() === '') {
        root.push(p);
      } else {
        if (!map[p.category]) map[p.category] = [];
        map[p.category].push(p);
      }
    });

    return { rootPages: root, categorizedMap: map };
  }, [filteredPages]);

  const activePage = useMemo(() => {
    return pages.find((p) => p.id === selectedPageId) || pages[0];
  }, [pages, selectedPageId]);

  const handleCopyMarkdown = async () => {
    if (activePage?.content) {
      await navigator.clipboard.writeText(activePage.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.explorerContainer}>
      {/* Blue top accent bar */}
      <div className={styles.topAccentBar} />

      <div className={styles.mainLayout}>
        {/* Left Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <span className={styles.sidebarTitle}>WIKI EXPLORER</span>
            <div className={styles.sidebarHeaderActions}>
              <button
                type="button"
                className={styles.iconButton}
                onClick={expandAllFolders}
                title="Expand All"
              >
                <ChevronDoubleDown20Regular/>
              </button>
              <button
                type="button"
                className={styles.iconButton}
                onClick={collapseAllFolders}
                title="Collapse All"
              >
                <ChevronDoubleUp20Regular/>
              </button>
              <button type="button" className={styles.iconButton} title="Sort">
                <ArrowSort20Regular/>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className={styles.searchWrapper}>
            <Search20Regular className="{styles.searchIcon}"/>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Filter pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Navigation Tree */}
          <nav className={styles.treeNav}>
            {/* Top Root Items (e.g. Overview) */}
            {rootPages
              .filter((p) => p.id === 'overview')
              .map((page) => (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => setSelectedPageId(page.id)}
                  className={`${styles.treeItem} ${styles.rootLevelItem} ${
                    selectedPageId === page.id ? styles.activeTreeItem : ''
                  }`}
                >
                  <Document20Regular className="{styles.itemIcon}"/>
                  <span className={styles.itemLabel}>{page.title}</span>
                </button>
              ))}

            {/* Categorized Folders */}
            {Object.keys(categorizedMap).map((catName) => {
              const isExpanded = expandedFolders[catName] ?? true;
              return (
                <div key={catName} className={styles.folderGroup}>
                  <button
                    type="button"
                    onClick={() => toggleFolder(catName)}
                    className={styles.folderToggle}
                  >
                    <span className={styles.chevronIcon}>
                      {isExpanded ? <ChevronDown16Regular/> : <ChevronRight16Regular/>}
                    </span>
                    <span className={styles.folderIcon}>
                      {isExpanded ? <FolderOpen20Regular/> : <Folder20Regular/>}
                    </span>
                    <span className={styles.folderLabel}>{catName}</span>
                  </button>

                  {isExpanded && (
                    <div className={styles.folderChildren}>
                      {categorizedMap[catName].map((page) => {
                        const isActive = selectedPageId === page.id;
                        return (
                          <button
                            key={page.id}
                            type="button"
                            onClick={() => setSelectedPageId(page.id)}
                            className={`${styles.treeItem} ${isActive ? styles.activeTreeItem : ''}`}
                          >
                            <Document20Regular className="{styles.itemIcon}"/>
                            <span className={styles.itemLabel}>{page.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom Root Items without category (e.g. FAQ) */}
            {rootPages
              .filter((p) => p.id !== 'overview')
              .map((page) => (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => setSelectedPageId(page.id)}
                  className={`${styles.treeItem} ${styles.rootLevelItem} ${
                    selectedPageId === page.id ? styles.activeTreeItem : ''
                  }`}
                >
                  <Document20Regular className="{styles.itemIcon}"/>
                  <span className={styles.itemLabel}>{page.title}</span>
                </button>
              ))}
          </nav>

          {/* Sidebar Footer */}
          <div className={styles.sidebarFooter}>
            <span className={styles.footerCount}>{pages.length} total pages</span>
            <span className={styles.footerFormat}>ADO Format</span>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className={styles.contentPane}>
          {/* Header Bar: Breadcrumb & Actions */}
          <header className={styles.contentHeader}>
            <div className={styles.breadcrumb}>
              <Home20Regular className="{styles.breadcrumbHomeIcon}"/>
              <span className={styles.breadcrumbItem}>Wiki</span>
              {activePage?.category && (
                <>
                  <span className={styles.breadcrumbSeparator}>/</span>
                  <span className={styles.breadcrumbItem}>{activePage.category}</span>
                </>
              )}
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={`${styles.breadcrumbItem} ${styles.breadcrumbActive}`}>
                {activePage?.title}
              </span>
            </div>

            <div className={styles.actionButtons}>
              <button
                type="button"
                className={styles.actionButton}
                onClick={handleCopyMarkdown}
                title="Copy raw markdown to clipboard"
              >
                {copied ? <Checkmark20Regular/> : <Copy20Regular/>}
                <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
              </button>
              <button
                type="button"
                className={styles.actionButton}
                onClick={handlePrint}
                title="Print documentation"
              >
                <Print20Regular/>
              </button>
            </div>
          </header>

          {/* Page Content Body */}
          <div className={styles.scrollableContent}>
            {activePage ? (
              <article className={styles.article}>
                {/* Meta details bar */}
                <div className={styles.metaRow}>
                  {activePage.author && (
                    <div className={styles.metaItem}>
                      <Person20Regular className="{styles.metaIcon}"/>
                      <span>{activePage.author}</span>
                    </div>
                  )}
                  {activePage.date && (
                    <>
                      <span className={styles.metaDot}>•</span>
                      <div className={styles.metaItem}>
                        <Calendar20Regular className="{styles.metaIcon}"/>
                        <span>{activePage.date}</span>
                      </div>
                    </>
                  )}
                  {activePage.readTime && (
                    <>
                      <span className={styles.metaDot}>•</span>
                      <div className={styles.metaItem}>
                        <Clock20Regular className="{styles.metaIcon}"/>
                        <span>{activePage.readTime}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Rendered Markdown Body */}
                <MarkdownRenderer content="{activePage.content}"/>
              </article>
            ) : (
              <div className={styles.emptyState}>Select a document from the explorer.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default WikiExplorer;
