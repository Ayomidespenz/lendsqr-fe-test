import styles from './Table.module.scss';
import FilterIcon from '../assets/filtericon.png';
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
  loading?: boolean;
}

export const Table = ({ 
  columns, 
  data, 
  onRowClick, 
  onViewDetails, 
  onBlacklistUser, 
  onActivateUser,
  loading 
}: TableProps) => {
  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const getActionItems = (row: TableRow) => [
    {
      label: 'View Details',
      onClick: () => onViewDetails?.(row),
    },
    {
      label: 'Blacklist User',
      onClick: () => onBlacklistUser?.(row),
    },
    {
      label: 'Activate User',
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
                  <img src={FilterIcon} alt="Filter" className={styles.filterIcon} />
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
