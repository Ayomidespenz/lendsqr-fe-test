import { useState, useEffect, useRef } from 'react';
import styles from './FilterModal.module.scss';

export interface FilterCriteria {
  organization?: string;
  username?: string;
  email?: string;
  dateJoined?: string;
  phoneNumber?: string;
  status?: string;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: FilterCriteria) => void;
  organizations?: string[];
  statuses?: string[];
  triggerElement?: HTMLElement | null;
  filterPosition?: { top: number; left: number };
}

export const FilterModal = ({
  isOpen,
  onClose,
  onFilter,
  organizations = ['Lendsqr', 'LendStart', 'Fintech Pro', 'Credit Hub', 'MoneyFlow', 'FastCredit', 'Trust Finance', 'Capital Rise'],
  statuses = ['active', 'inactive', 'pending', 'blacklisted'],
  filterPosition = { top: 0, left: 0 },
}: FilterModalProps) => {
  const [filters, setFilters] = useState<FilterCriteria>({
    organization: '',
    username: '',
    email: '',
    dateJoined: '',
    phoneNumber: '',
    status: '',
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof FilterCriteria, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFilter = () => {
    onFilter(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      organization: '',
      username: '',
      email: '',
      dateJoined: '',
      phoneNumber: '',
      status: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className={styles.filterDropdown}
      style={{
        top: `${filterPosition.top}px`,
        left: `${filterPosition.left}px`,
      }}
    >
      <div className={styles.dropdownContent}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Organization</label>
          <select
            className={styles.select}
            value={filters.organization || ''}
            onChange={e => handleInputChange('organization', e.target.value)}
          >
            <option value="">Select</option>
            {organizations.map(org => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Username</label>
          <input
            type="text"
            className={styles.input}
            placeholder="User"
            value={filters.username || ''}
            onChange={e => handleInputChange('username', e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.input}
            placeholder="Email"
            value={filters.email || ''}
            onChange={e => handleInputChange('email', e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Date</label>
          <input
            type="date"
            className={styles.input}
            value={filters.dateJoined || ''}
            onChange={e => handleInputChange('dateJoined', e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="tel"
            className={styles.input}
            placeholder="Phone Number"
            value={filters.phoneNumber || ''}
            onChange={e => handleInputChange('phoneNumber', e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Status</label>
          <select
            className={styles.select}
            value={filters.status || ''}
            onChange={e => handleInputChange('status', e.target.value)}
          >
            <option value="">Select</option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.resetBtn} onClick={handleReset}>
            Reset
          </button>
          <button className={styles.filterBtn} onClick={handleFilter}>
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};
