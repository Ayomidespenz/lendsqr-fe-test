import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems = 0,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push('...');

      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push('...');

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.left}>
        <span className={styles.label}>Showing</span>
        <select className={styles.select}>
          <option>100</option>
          <option>50</option>
          <option>25</option>
        </select>
        <span className={styles.label}>out of {totalItems}</span>
      </div>

      <div className={styles.right}>
        <button
          className={styles.navBtn}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ←
        </button>

        {getPageNumbers().map((page, idx) => (
          <button
            key={idx}
            className={`${styles.pageBtn} ${currentPage === page ? styles.active : ''}`}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}

        <button
          className={styles.navBtn}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </div>
    </div>
  );
};
