import { useMemo, useState } from 'react';
import { naryMenuTree } from '../data/naryMenuData';
import type { NaryNode } from '../classes/NaryNode';
import '../styles/NarySidebar.css';

type NodeItemProps = {
  node: NaryNode;
  depth?: number;
};

function SidebarNodeItem({ node, depth = 0 }: NodeItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.hasChildren();

  const leftPadding = useMemo(() => ({ paddingLeft: `${0.75 + depth * 0.9}rem` }), [depth]);

  return (
    <li className="nary-sidebar-item">
      <div className="nary-sidebar-row" style={leftPadding}>
        {hasChildren ? (
          <button
            type="button"
            className="nary-toggle"
            onClick={() => setIsOpen((currentState) => !currentState)}
            aria-label={isOpen ? `Cerrar ${node.title}` : `Abrir ${node.title}`}
            aria-expanded={isOpen}
          >
            {isOpen ? '▾' : '▸'}
          </button>
        ) : (
          <span className="nary-toggle-placeholder" aria-hidden="true" />
        )}

        <a className="nary-link" href={node.link}>
          {node.title}
        </a>
      </div>

      {hasChildren && isOpen ? (
        <ul className="nary-sidebar-list" role="group">
          {node.children.map((child) => (
            <SidebarNodeItem key={child.id} node={child} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default function NarySidebar() {
  return (
    <section className="nary-sidebar-layout">
      <h1 className="nary-title">Challenge 09 - N-ary Sidebar</h1>
      <aside className="nary-sidebar" aria-label="Menu principal">
        <ul className="nary-sidebar-list">
          <SidebarNodeItem node={naryMenuTree.root} />
        </ul>
      </aside>
    </section>
  );
}
