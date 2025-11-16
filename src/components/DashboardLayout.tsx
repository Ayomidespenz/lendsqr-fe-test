import type { ReactNode } from 'react';
import { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import styles from './DashboardLayout.module.scss';
import DashboardIcon from '../assets/dashboard.png';
import UserIcon from '../assets/user.png';
import GuarantorIcon from '../assets/guarantor.png';
import LoanIcon from '../assets/loan.png';
import DecisionIcon from '../assets/decision.png';
import SavingIcon from '../assets/saving.png';
import LoanRequestIcon from '../assets/loanrequest.png';
import WhitelistIcon from '../assets/whitelist.png';
import KarmaIcon from '../assets/karma.png';
import SwitchIcon from '../assets/switch.png';
import ProductIcon from '../assets/product.png';
import SavingsProductIcon from '../assets/savingsproduct.png';
import FeesIcon from '../assets/fees.png';
import TransactionIcon from '../assets/transaction.png';
import ServiceIcon from '../assets/service.png';
import ServiceAcctIcon from '../assets/serviceacct.png';
import SettlementIcon from '../assets/settlement.png';
import ReportIcon from '../assets/report.png';
import PreferenceIcon from '../assets/preference.png';
import PricingIcon from '../assets/pricing.png';
import AuditIcon from '../assets/audit.png';

// Import icons (you'll need to add these or use a library)
const sidebarItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <img src={DashboardIcon} alt="Dashboard" />,
    path: '/dashboard',
    section: 'dashboard',
  },
  {
    id: 'users',
    label: 'Users',
    icon: <img src={UserIcon} alt="User" />,
    
    path: '/dashboard/users',
    section: 'customers',
  },
  {
    id: 'guarantors',
    label: 'Guarantors',
        icon: <img src={GuarantorIcon} alt="Guarantor" />,

    path: '/dashboard/guarantors',
    section: 'customers',
  },
  {
    id: 'loans',
    label: 'Loans',
       icon: <img src={LoanIcon} alt="Loan" />,

    path: '/dashboard/loans',
    section: 'customers',
  },
  {
    id: 'decision-models',
    label: 'Decision Models',
    icon: <img src={DecisionIcon} alt="Decision" />,
    path: '/dashboard/decision-models',
    section: 'customers',
  },
  {
    id: 'savings',
    label: 'Savings',
       icon: <img src={SavingIcon} alt="Saving" />,

    path: '/dashboard/savings',
    section: 'customers',
  },
  {
    id: 'loan-requests',
    label: 'Loan Requests',
        icon: <img src={LoanRequestIcon} alt="LoanRequest" />,

    path: '/dashboard/loan-requests',
    section: 'customers',
  },
  {
    id: 'whitelist',
    label: 'Whitelist',
       icon: <img src={WhitelistIcon} alt="Whitelist" />,

    path: '/dashboard/whitelist',
    section: 'customers',
  },
  {
    id: 'karma',
    label: 'Karma',
       icon: <img src={KarmaIcon} alt="Karma" />,

    path: '/dashboard/karma',
    section: 'customers',
  },
  {
    id: 'organization',
    label: 'Organization',
       icon: <img src={SwitchIcon} alt="Organization" />,

    path: '/dashboard/organization',
    section: 'businesses',
  },
  {
    id: 'loan-products',
    label: 'Loan Products',
      icon: <img src={ProductIcon} alt="Product" />,

    path: '/dashboard/loan-products',
    section: 'businesses',
  },
  {
    id: 'savings-products',
    label: 'Savings Products',
     icon: <img src={SavingsProductIcon} alt="Savings" />,

    path: '/dashboard/savings-products',
    section: 'businesses',
  },
  {
    id: 'fees-charges',
    label: 'Fees and Charges',
    icon: <img src={FeesIcon} alt="Fees" />,
    
    path: '/dashboard/fees-charges',
    section: 'businesses',
  },
  {
    id: 'transactions',
    label: 'Transactions',
      icon: <img src={TransactionIcon} alt="Transaction" />,

    path: '/dashboard/transactions',
    section: 'businesses',
  },
  {
    id: 'services',
    label: 'Services',
       icon: <img src={ServiceIcon} alt="Services" />,

    path: '/dashboard/services',
    section: 'businesses',
  },
  {
    id: 'service-account',
    label: 'Service Account',
       icon: <img src={ServiceAcctIcon} alt="ServiceAcct" />,

    path: '/dashboard/service-account',
    section: 'businesses',
  },
  {
    id: 'settlements',
    label: 'Settlements',
       icon: <img src={SettlementIcon} alt="Settlement" />,

    path: '/dashboard/settlements',
    section: 'businesses',
  },
  {
    id: 'reports',
    label: 'Reports',
        icon: <img src={ReportIcon} alt="Report" />,

    path: '/dashboard/reports',
    section: 'businesses',
  },
  {
    id: 'preferences',
    label: 'Preferences',
       icon: <img src={PreferenceIcon} alt="Preference" />,

    path: '/dashboard/preferences',
    section: 'settings',
  },
  {
    id: 'fees-pricing',
    label: 'Fees and Pricing',
        icon: <img src={PricingIcon} alt="Fees" />,

    path: '/dashboard/fees-pricing',
    section: 'settings',
  },
   {
    id: 'audit-logs',
    label: 'Audit Logs',
        icon: <img src={AuditIcon} alt="Audit" />,

    path: '/dashboard/audit-logs',
    section: 'settings',
  },
];

interface DashboardLayoutProps {
  children: ReactNode;
  additionalSidebarItems?: Array<{
    id: string;
    label: string;
    icon: React.ReactNode;
    path?: string;
    section?: string;
  }>;
}

export const DashboardLayout = ({ children, additionalSidebarItems = [] }: DashboardLayoutProps) => {
  const [activeMenuId, setActiveMenuId] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = (item: any) => {
    setActiveMenuId(item.id);
    setSidebarOpen(false); // Close sidebar on mobile when clicking item
  };

  const handleCollapseToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Combine default items with additional items
  const allSidebarItems = [...sidebarItems, ...additionalSidebarItems];

  return (
    <div className={styles.layout}>
      <Navbar userName="Adedoyin" onSidebarToggle={handleSidebarToggle} sidebarOpen={sidebarOpen} />
      <div className={styles.container}>
        <Sidebar
          items={allSidebarItems}
          activeItem={activeMenuId}
          onItemClick={handleMenuClick}
          isCollapsed={sidebarCollapsed}
          onCollapseToggle={handleCollapseToggle}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className={`${styles.main} ${sidebarCollapsed ? styles.mainCollapsed : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};
