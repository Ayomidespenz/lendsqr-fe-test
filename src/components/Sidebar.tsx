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
}

export const Sidebar = ({ items, activeItem, onItemClick, isCollapsed = false }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(isCollapsed);

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
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      {/* Logo */}
      <div className={styles.logo}>
        <img src={Logo} alt="Lendsqr" className={styles.logoImage} />
        {!collapsed && <span className={styles.logoText}></span>}
      </div>

      {/* Organization Switcher */}
      {!collapsed && (
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
              {section !== 'general' && section !== 'dashboard' && !collapsed && (
                <div className={styles.sectionTitle}>{section.toUpperCase()}</div>
              )}

              <ul className={styles.menu}>
                {sectionItems.map(item => (
                  <li key={item.id}>
                    <button
                      className={`${styles.menuItem} ${activeItem === item.id ? styles.active : ''}`}
                      onClick={() => handleItemClick(item)}
                      title={collapsed ? item.label : ''}
                    >
                      <span className={styles.icon}>{item.icon}</span>
                      {!collapsed && <span className={styles.label}>{item.label}</span>}
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
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? 'Expand' : 'Collapse'}
      >
        {collapsed ? '→' : '←'}
      </button>
    </aside>
  );
};
