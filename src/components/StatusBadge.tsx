import styles from './StatusBadge.module.scss';

type StatusType = 'active' | 'inactive' | 'pending' | 'blacklisted';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

export const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1);
  return <span className={`${styles.badge} ${styles[status]}`}>{displayLabel}</span>;
};
