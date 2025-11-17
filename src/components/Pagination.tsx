import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  totalItems?: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 100,
  onItemsPerPageChange,
  totalItems = 0,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than or equal to max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Add ellipsis and pages before current page
      if (currentPage > 3) {
        pages.push('...');
      }

      // Add pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      for (let i = startPage; i <= endPage; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      // Add ellipsis and last page
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (onItemsPerPageChange) {
      onItemsPerPageChange(newValue);
    }
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.left}>
        <span className={styles.label}>Showing</span>
        <select 
          className={styles.select}
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span className={styles.label}>out of {totalItems}</span>
      </div>

      <div className={styles.right}>
        <button
          className={styles.navBtn}
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          ←
        </button>

        {getPageNumbers().map((page, idx) => (
          <button
            key={idx}
            className={`${styles.pageBtn} ${currentPage === page ? styles.active : ''}`}
            onClick={() => handlePageClick(page)}
            disabled={page === '...'}
            aria-label={typeof page === 'number' ? `Go to page ${page}` : 'More pages'}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        <button
          className={styles.navBtn}
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          →
        </button>
      </div>
    </div>
  );
};
