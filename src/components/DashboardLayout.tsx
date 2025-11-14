import { ReactNode, useState } from 'react';
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
    icon: <img src={DashboardIcon} alt="Dashboard" style={{ width: '20px', height: '20px' }} />,
    path: '/dashboard',
    section: 'dashboard',
  },
  {
    id: 'users',
    label: 'Users',
    icon: <img src={UserIcon} alt="User" style={{ width: '20px', height: '20px' }} />,
    
    path: '/dashboard/users',
    section: 'customers',
  },
  {
    id: 'guarantors',
    label: 'Guarantors',
        icon: <img src={GuarantorIcon} alt="Guarantor" style={{ width: '20px', height: '20px' }} />,

    path: '/dashboard/guarantors',
    section: 'customers',
  },
  {
    id: 'loans',
    label: 'Loans',
       icon: <img src={LoanIcon} alt="Loan" style={{ width: '20px', height: '20px' }} />,

    path: '/dashboard/loans',
    section: 'customers',
  },
  {
    id: 'decision-models',
    icon: <img src={DecisionIcon} alt="Decision" style={{ width: '20px', height: '20px' }} />,
    
    path: '/dashboard/decision-models',
    section: 'customers',
  },
  {
    id: 'savings',
    label: 'Savings',
       icon: <img src={SavingIcon} alt="Saving" style={{ width: '20px', height: '20px' }} />,

    path: '/dashboard/savings',
    section: 'customers',
  },
  {
    id: 'loan-requests',
    label: 'Loan Requests',
        icon: <img src={LoanRequestIcon} alt="LoanRequest" style={{ width: '20px', height: '20px' }} />,

    path: '/dashboard/loan-requests',
    section: 'customers',
  },
  {
    id: 'whitelist',
    label: 'Whitelist',
       icon: <img src={WhitelistIcon} alt="Whitelist" style={{ width: '20px', height: '20px' }} />,

    path: '/dashboard/whitelist',
    section: 'customers',
  },
  {
    id: 'karma',
    label: 'Karma',
       icon: <img src={KarmaIcon} alt="Karma" style={{ width: '20px', height: '20px' }} />,

    path: '/dashboard/karma',
    section: 'customers',
  },
  {
    id: 'organization',
    label: 'Organization',
       icon: <img src={SwitchIcon} alt="Organization" style={{ width: '20px', height: '20px' }} />,

    path: '/dashboard/organization',
    section: 'businesses',
  },
  {
    id: 'loan-products',
    label: 'Loan Products',
      icon: <img src={ProductIcon} alt="Product" style={{ width: '20px', height: '20px' }} />,

    path: '/dashboard/loan-products',
    section: 'businesses',
  },
  {
    id: 'savings-products',
    label: 'Savings Products',
     icon: <img src={SavingsProductIcon} alt="Savings" style={{ width: '20px', height: '20px' }} />,

    path: '/dashboard/savings-products',
    section: 'businesses',
  },
  {
    id: 'fees-charges',
    label: 'Fees and Charges',
    icon: <img src={FeesIcon} alt="Fees" style={{ width: '20px', height: '20px' }} />,
    
    path: '/dashboard/fees-charges',
    section: 'businesses',
  },
  {
    id: 'transactions',
    label: 'Transactions',
      icon: <img src={TransactionIcon} alt="Transaction" style={{ width: '20px', height: '20px' }} />,

    path: '/dashboard/transactions',
    section: 'businesses',
  },
  {
    id: 'services',
    label: 'Services',
       icon: <img src={ServiceIcon} alt="Services" style={{ width: '20px', height: '20px' }} />,

    path: '/dashboard/services',
    section: 'businesses',
  },
  {
    id: 'service-account',
    label: 'Service Account',
       icon: <img src={ServiceAcctIcon} alt="ServiceAcct" style={{ width: '20px', height: '20px' }} />,

    path: '/dashboard/service-account',
    section: 'businesses',
  },
  {
    id: 'settlements',
    label: 'Settlements',
       icon: <img src={SettlementIcon} alt="Settlement" style={{ width: '20px', height: '20px' }} />,

    path: '/dashboard/settlements',
    section: 'businesses',
  },
  {
    id: 'reports',
    label: 'Reports',
        icon: <img src={ReportIcon} alt="Report" style={{ width: '20px', height: '20px' }} />,

    path: '/dashboard/reports',
    section: 'businesses',
  },
  {
    id: 'preferences',
    label: 'Preferences',
       icon: <img src={PreferenceIcon} alt="Preference" style={{ width: '20px', height: '20px' }} />,

    path: '/dashboard/preferences',
    section: 'settings',
  },
  {
    id: 'fees-pricing',
    label: 'Fees and Pricing',
        icon: <img src={PricingIcon} alt="Fees" style={{ width: '20px', height: '20px' }} />,

    path: '/dashboard/fees-pricing',
    section: 'settings',
  },
   {
    id: 'audit-logs',
    label: 'Audit Logs',
        icon: <img src={AuditIcon} alt="Audit" style={{ width: '20px', height: '20px' }} />,

    path: '/dashboard/audit-logs',
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
