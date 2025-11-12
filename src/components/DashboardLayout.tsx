import { ReactNode, useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import styles from './DashboardLayout.module.scss';

// Import icons (you'll need to add these or use a library)
const sidebarItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    path: '/dashboard',
    section: 'dashboard',
  },
  {
    id: 'users',
    label: 'Users',
    icon: '👥',
    path: '/dashboard/users',
    section: 'customers',
  },
  {
    id: 'guarantors',
    label: 'Guarantors',
    icon: '🛡️',
    path: '/dashboard/guarantors',
    section: 'customers',
  },
  {
    id: 'loans',
    label: 'Loans',
    icon: '💰',
    path: '/dashboard/loans',
    section: 'customers',
  },
  {
    id: 'decision-models',
    label: 'Decision Models',
    icon: '⚙️',
    path: '/dashboard/decision-models',
    section: 'customers',
  },
  {
    id: 'savings',
    label: 'Savings',
    icon: '🏦',
    path: '/dashboard/savings',
    section: 'customers',
  },
  {
    id: 'loan-requests',
    label: 'Loan Requests',
    icon: '📋',
    path: '/dashboard/loan-requests',
    section: 'customers',
  },
  {
    id: 'whitelist',
    label: 'Whitelist',
    icon: '✅',
    path: '/dashboard/whitelist',
    section: 'customers',
  },
  {
    id: 'karma',
    label: 'Karma',
    icon: '⭐',
    path: '/dashboard/karma',
    section: 'customers',
  },
  {
    id: 'organization',
    label: 'Organization',
    icon: '🏢',
    path: '/dashboard/organization',
    section: 'businesses',
  },
  {
    id: 'loan-products',
    label: 'Loan Products',
    icon: '📦',
    path: '/dashboard/loan-products',
    section: 'businesses',
  },
  {
    id: 'savings-products',
    label: 'Savings Products',
    icon: '💳',
    path: '/dashboard/savings-products',
    section: 'businesses',
  },
  {
    id: 'fees-charges',
    label: 'Fees and Charges',
    icon: '💸',
    path: '/dashboard/fees-charges',
    section: 'businesses',
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: '📱',
    path: '/dashboard/transactions',
    section: 'businesses',
  },
  {
    id: 'services',
    label: 'Services',
    icon: '🔧',
    path: '/dashboard/services',
    section: 'businesses',
  },
  {
    id: 'service-account',
    label: 'Service Account',
    icon: '👤',
    path: '/dashboard/service-account',
    section: 'businesses',
  },
  {
    id: 'settlements',
    label: 'Settlements',
    icon: '📊',
    path: '/dashboard/settlements',
    section: 'businesses',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: '📈',
    path: '/dashboard/reports',
    section: 'businesses',
  },
  {
    id: 'preferences',
    label: 'Preferences',
    icon: '⚙️',
    path: '/dashboard/preferences',
    section: 'settings',
  },
  {
    id: 'fees-pricing',
    label: 'Fees and Pricing',
    icon: '💰',
    path: '/dashboard/fees-pricing',
    section: 'settings',
  },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [activeMenuId, setActiveMenuId] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleMenuClick = (item: any) => {
    setActiveMenuId(item.id);
    // Navigate to the path if needed
    // navigate(item.path);
  };

  return (
    <div className={styles.layout}>
      <Navbar userName="Adedoyin" />
      <div className={styles.container}>
        <Sidebar
          items={sidebarItems}
          activeItem={activeMenuId}
          onItemClick={handleMenuClick}
          isCollapsed={sidebarCollapsed}
        />
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
};
