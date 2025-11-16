import { useState } from 'react';
import styles from './Sidebar.module.scss';
import Logo from '../assets/Group.svg';
import SwitchIcon from '../assets/switch.png';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  section?: string;
}

interface SidebarProps {
  items: SidebarItem[];
  activeItem?: string;
  onItemClick?: (item: SidebarItem) => void;
  isCollapsed?: boolean;
  onCollapseToggle?: (collapsed: boolean) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ items, activeItem, onItemClick, isCollapsed = false, onCollapseToggle, isOpen = false, onClose }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(isCollapsed);

  // Update internal state when prop changes
  const currentCollapsed = collapsed;

  const handleCollapse = () => {
    const newCollapsed = !currentCollapsed;
    setCollapsed(newCollapsed);
    if (onCollapseToggle) {
      onCollapseToggle(newCollapsed);
    }
  };

  // Group items by section
  const groupedItems = items.reduce((acc: Record<string, SidebarItem[]>, item) => {
    const section = item.section || 'general';
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {});

  const sectionOrder = ['general', 'dashboard', 'customers', 'businesses', 'settings'];

  const handleItemClick = (item: SidebarItem) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <>
      {/* Backdrop - Only visible on mobile when sidebar is open */}
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`${styles.sidebar} ${currentCollapsed ? styles.collapsed : ''} ${isOpen ? styles.open : ''}`}>
        {/* Logo */}
        <div className={styles.logo}>
          <img src={Logo} alt="Lendsqr" className={styles.logoImage} />
          {!currentCollapsed && <span className={styles.logoText}></span>}
        </div>

        {/* Organization Switcher */}
        {!currentCollapsed && (
          <div className={styles.organizationSwitcher}>
            <div className={styles.switcherWrapper}>
              <img src={SwitchIcon} alt="Switch" className={styles.switchIcon} />
              <select className={styles.select}>
                <option>Switch Organization</option>
                <option>Organization 1</option>
                <option>Organization 2</option>
              </select>
            </div>
          </div>
        )}

      {/* Navigation Menu */}
      <nav className={styles.nav}>
        {sectionOrder.map(section => {
          const sectionItems = groupedItems[section];
          if (!sectionItems || sectionItems.length === 0) return null;

          return (
            <div key={section} className={styles.section}>
              {section !== 'general' && section !== 'dashboard' && !currentCollapsed && (
                <div className={styles.sectionTitle}>{section === 'user-actions' ? 'USER ACTIONS' : section.toUpperCase()}</div>
              )}

              <ul className={styles.menu}>
                {sectionItems.map(item => (
                  <li key={item.id}>
                    <button
                      className={`${styles.menuItem} ${activeItem === item.id ? styles.active : ''}`}
                      onClick={() => handleItemClick(item)}
                      title={currentCollapsed ? item.label : ''}
                    >
                      <span className={styles.icon}>{item.icon}</span>
                      {!currentCollapsed && <span className={styles.label}>{item.label}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        className={styles.collapseToggle}
        onClick={handleCollapse}
        title={currentCollapsed ? 'Expand' : 'Collapse'}
      >
        {currentCollapsed ? '→' : '←'}
      </button>
      </aside>
    </>
  );
};
