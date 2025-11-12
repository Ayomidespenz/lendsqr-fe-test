import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { Table } from '../components/Table';
import { Pagination } from '../components/Pagination';
import { StatusBadge } from '../components/StatusBadge';
import styles from './DashboardPage.module.scss';
import Icon4 from '../assets/icon(4).png';
import Icon5 from '../assets/icon(5).png';
import Icon6 from '../assets/icon(6).png';
import Icon7 from '../assets/icon(7).png';

interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: 'active' | 'inactive' | 'pending' | 'blacklisted';
}

const SAMPLE_USERS: User[] = [
  {
    id: '1',
    organization: 'Lendsqr',
    username: 'adekunleadebisi',
    email: 'adekunleadebisi@gmail.com',
    phoneNumber: '09031940409',
    dateJoined: 'May 15, 2020 10:30 PM',
    status: 'active',
  },
  {
    id: '2',
    organization: 'LendStart',
    username: 'olatunji_femi',
    email: 'femi.olatunji@email.com',
    phoneNumber: '08012345678',
    dateJoined: 'Jun 12, 2020 2:15 PM',
    status: 'inactive',
  },
  {
    id: '3',
    organization: 'Fintech Pro',
    username: 'chioma_nwosu',
    email: 'chioma.nwosu@example.com',
    phoneNumber: '07012345678',
    dateJoined: 'Jul 8, 2020 9:45 AM',
    status: 'pending',
  },
  {
    id: '4',
    organization: 'Credit Hub',
    username: 'amara_okonkwo',
    email: 'amara@credithub.ng',
    phoneNumber: '09087654321',
    dateJoined: 'Aug 22, 2020 4:20 PM',
    status: 'blacklisted',
  },
  {
    id: '5',
    organization: 'MoneyFlow',
    username: 'tunde_ajibade',
    email: 'tunde@moneyflow.com',
    phoneNumber: '08123456789',
    dateJoined: 'Sep 3, 2020 11:00 AM',
    status: 'active',
  },
  {
    id: '6',
    organization: 'Lendsqr',
    username: 'blessing_olowa',
    email: 'blessing.olowa@gmail.com',
    phoneNumber: '07098765432',
    dateJoined: 'Sep 18, 2020 3:30 PM',
    status: 'active',
  },
  {
    id: '7',
    organization: 'FastCredit',
    username: 'naomi_adeyemi',
    email: 'naomi@fastcredit.io',
    phoneNumber: '09156789012',
    dateJoined: 'Oct 5, 2020 8:45 AM',
    status: 'inactive',
  },
  {
    id: '8',
    organization: 'Trust Finance',
    username: 'james_murphy',
    email: 'james.m@trustfinance.co.uk',
    phoneNumber: '08011223344',
    dateJoined: 'Oct 20, 2020 2:15 PM',
    status: 'pending',
  },
  {
    id: '9',
    organization: 'Lendsqr',
    username: 'zainab_hussein',
    email: 'zainab.h@email.com',
    phoneNumber: '07055667788',
    dateJoined: 'Nov 2, 2020 10:30 AM',
    status: 'active',
  },
  {
    id: '10',
    organization: 'Capital Rise',
    username: 'david_okafor',
    email: 'david.okafor@caprise.com',
    phoneNumber: '09199887766',
    dateJoined: 'Nov 15, 2020 5:00 PM',
    status: 'blacklisted',
  },
];

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const totalItems = SAMPLE_USERS.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const columns = [
    {
      key: 'organization',
      label: 'Organization',
      render: (value: string) => <span>{value}</span>,
    },
    {
      key: 'username',
      label: 'Username',
      render: (value: string) => <span>{value}</span>,
    },
    {
      key: 'email',
      label: 'Email',
      render: (value: string) => <span>{value}</span>,
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number',
      render: (value: string) => <span>{value}</span>,
    },
    {
      key: 'dateJoined',
      label: 'Date Joined',
      render: (value: string) => <span>{value}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <StatusBadge 
          label={String(value).charAt(0).toUpperCase() + String(value).slice(1)}
          status={value as 'active' | 'inactive' | 'pending' | 'blacklisted'} 
        />
      ),
    },
  ];

  const handleViewDetails = (row: any) => {
    navigate(`/dashboard/users/${row.id}`);
  };

  const handleBlacklistUser = (row: any) => {
    console.log('Blacklist user:', row.username);
    // Call API to blacklist user
  };

  const handleActivateUser = (row: any) => {
    console.log('Activate user:', row.username);
    // Call API to activate user
  };

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Users</h1>
        </div>

        {/* Dashboard Content */}
        <div className={styles.content}>
          <div className={styles.statsGrid}>
            {/* Stat Card 1 */}
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <img src={Icon4} alt="Users" />
              </div>
              <div className={styles.statContent}>
                <p className={styles.statLabel}>USERS</p>
                <p className={styles.statValue}>2,453</p>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <img src={Icon5} alt="Active Users" />
              </div>
              <div className={styles.statContent}>
                <p className={styles.statLabel}>ACTIVE USERS</p>
                <p className={styles.statValue}>2,453</p>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <img src={Icon6} alt="Users with Loans" />
              </div>
              <div className={styles.statContent}>
                <p className={styles.statLabel}>USERS WITH LOANS</p>
                <p className={styles.statValue}>12,453</p>
              </div>
            </div>

            {/* Stat Card 4 */}
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <img src={Icon7} alt="Users with Savings" />
              </div>
              <div className={styles.statContent}>
                <p className={styles.statLabel}>USERS WITH SAVINGS</p>
                <p className={styles.statValue}>102,453</p>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className={styles.tableContainer}>
            <Table 
              columns={columns} 
              data={SAMPLE_USERS}
              onViewDetails={handleViewDetails}
              onBlacklistUser={handleBlacklistUser}
              onActivateUser={handleActivateUser}
            />
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
