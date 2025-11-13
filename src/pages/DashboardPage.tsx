import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { Table } from '../components/Table';
import { Pagination } from '../components/Pagination';
import { StatusBadge } from '../components/StatusBadge';
import { useUsers } from '../services/userApi';
import styles from './DashboardPage.module.scss';
import Icon4 from '../assets/icon(4).png';
import Icon5 from '../assets/icon(5).png';
import Icon6 from '../assets/icon(6).png';
import Icon7 from '../assets/icon(7).png';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { users, loading, error } = useUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Paginate users
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = users.slice(startIndex, endIndex);

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

  if (loading) {
    return (
      <DashboardLayout>
        <div className={styles.dashboard}>
          <div className={styles.header}>
            <h1 className={styles.title}>Users</h1>
          </div>
          <div className={styles.content}>
            <p>Loading users from API...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className={styles.dashboard}>
          <div className={styles.header}>
            <h1 className={styles.title}>Users</h1>
          </div>
          <div className={styles.content}>
            <p style={{ color: 'red' }}>Error: {error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
                <p className={styles.statValue}>{totalItems.toLocaleString()}</p>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <img src={Icon5} alt="Active Users" />
              </div>
              <div className={styles.statContent}>
                <p className={styles.statLabel}>ACTIVE USERS</p>
                <p className={styles.statValue}>{users.filter(u => u.status === 'active').length.toLocaleString()}</p>
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
              data={paginatedUsers}
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
