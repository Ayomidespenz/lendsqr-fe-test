import styles from './Table.module.scss';
import FilterIcon from '../assets/filtericon.png';
import ViewIcon from '../assets/view.png';
import BlacklistIcon from '../assets/blacklist.png';
import ActivateIcon from '../assets/activate.png';
import { ActionMenu } from './ActionMenu';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface TableRow {
  [key: string]: any;
}

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  onRowClick?: (row: TableRow) => void;
  onViewDetails?: (row: TableRow) => void;
  onBlacklistUser?: (row: TableRow) => void;
  onActivateUser?: (row: TableRow) => void;
  onFilterClick?: (columnKey: string, position: { top: number; left: number }) => void;
  loading?: boolean;
}

export const Table = ({ 
  columns, 
  data, 
  onRowClick, 
  onViewDetails, 
  onBlacklistUser, 
  onActivateUser,
  onFilterClick,
  loading 
}: TableProps) => {
  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const getActionItems = (row: TableRow) => [
    {
      label: 'View Details',
      icon: ViewIcon,
      onClick: () => onViewDetails?.(row),
    },
    {
      label: 'Blacklist User',
      icon: BlacklistIcon,
      onClick: () => onBlacklistUser?.(row),
    },
    {
      label: 'Activate User',
      icon: ActivateIcon,
      onClick: () => onActivateUser?.(row),
    },
  ];

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.key} className={styles.th}>
                <div className={styles.headerContent}>
                  <span>{column.label}</span>
                  <img 
                    src={FilterIcon} 
                    alt="Filter" 
                    className={styles.filterIcon}
                    onClick={(e) => {
                      e.stopPropagation();
                      const rect = (e.currentTarget.closest('th') as HTMLElement)?.getBoundingClientRect();
                      if (rect) {
                        onFilterClick?.(column.key, { 
                          top: rect.bottom + 10, 
                          left: rect.left 
                        });
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </th>
            ))}
            <th className={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr key={idx} className={styles.tr} onClick={() => onRowClick?.(row)}>
                {columns.map(column => (
                  <td key={column.key} className={styles.td}>
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
                <td className={styles.td} onClick={(e) => e.stopPropagation()}>
                  <ActionMenu items={getActionItems(row)} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className={styles.emptyState}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
