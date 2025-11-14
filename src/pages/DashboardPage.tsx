import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DashboardLayout } from '../components/DashboardLayout';
import { Table } from '../components/Table';
import { Pagination } from '../components/Pagination';
import { StatusBadge } from '../components/StatusBadge';
import { FilterModal, type FilterCriteria } from '../components/FilterModal';
import { useUsers, userApi } from '../services/userApi';
import styles from './DashboardPage.module.scss';
import Icon4 from '../assets/icon(4).png';
import Icon5 from '../assets/icon(5).png';
import Icon6 from '../assets/icon(6).png';
import Icon7 from '../assets/icon(7).png';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { users, loading, error } = useUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterPosition, setFilterPosition] = useState<{ top: number; left: number }>({ top: 60, left: 0 });
  const [filters, setFilters] = useState<FilterCriteria>({});
  
  const itemsPerPage = 100;

  // Filter users based on criteria
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      if (filters.organization && user.organization !== filters.organization) return false;
      if (filters.username && !user.username.toLowerCase().includes(filters.username.toLowerCase())) return false;
      if (filters.email && !user.email.toLowerCase().includes(filters.email.toLowerCase())) return false;
      if (filters.phoneNumber && !user.phoneNumber.includes(filters.phoneNumber)) return false;
      if (filters.status && user.status !== filters.status) return false;
      if (filters.dateJoined && user.dateJoined !== filters.dateJoined) return false;
      return true;
    });
  }, [users, filters]);

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Paginate filtered users
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

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

  const handleBlacklistUser = useCallback(async (row: any) => {
    try {
      const success = await userApi.blacklistUser(row.id);
      if (success) {
        toast.success(`User ${row.username} has been blacklisted`, {
          position: 'top-right',
          autoClose: 3000,
        });
        // Refresh page to show updated data after toast shows
        setTimeout(() => window.location.reload(), 3500);
      } else {
        toast.error(`Failed to blacklist user ${row.username}`, {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while blacklisting the user', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }, []);

  const handleActivateUser = useCallback(async (row: any) => {
    try {
      const success = await userApi.activateUser(row.id);
      if (success) {
        toast.success(`User ${row.username} has been activated`, {
          position: 'top-right',
          autoClose: 3000,
        });
        // Refresh page to show updated data after toast shows
        setTimeout(() => window.location.reload(), 3500);
      } else {
        toast.error(`Failed to activate user ${row.username}`, {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while activating the user', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }, []);

  const handleFilter = useCallback((filterCriteria: FilterCriteria) => {
    setFilters(filterCriteria);
    setCurrentPage(1);
  }, []);

  const handleFilterIconClick = useCallback((_columnKey: string, position: { top: number; left: number }) => {
    // Position dropdown centered relative to click position
    const dropdownWidth = 320;
    const padding = 20;
    
    // Center the dropdown on the clicked position
    let leftPos = position.left - (dropdownWidth / 2);
    
    // Ensure dropdown stays within viewport bounds
    if (leftPos < padding) {
      leftPos = padding;
    } else if (leftPos + dropdownWidth > window.innerWidth - padding) {
      leftPos = window.innerWidth - dropdownWidth - padding;
    }
    
    setFilterPosition({ 
      top: position.top + 38, 
      left: leftPos
    });
    setIsFilterOpen(true);
  }, []);

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
                <p className={styles.statValue}>{users.filter(u => u.status === 'inactive').length.toLocaleString()}</p>
              </div>
            </div>

            {/* Stat Card 4 */}
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <img src={Icon7} alt="Users with Savings" />
              </div>
              <div className={styles.statContent}>
                <p className={styles.statLabel}>USERS WITH SAVINGS</p>
                <p className={styles.statValue}>{users.filter(u => u.status === 'pending').length.toLocaleString()}</p>
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
              onFilterClick={handleFilterIconClick}
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

      <FilterModal 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFilter={handleFilter}
        organizations={[...new Set(users.map(u => u.organization))]}
        statuses={[...new Set(users.map(u => u.status))]}
        filterPosition={filterPosition}
      />
    </DashboardLayout>
  );
};
