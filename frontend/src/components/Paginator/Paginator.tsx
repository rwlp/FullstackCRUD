import styles from './styles.module.scss';

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Paginator = ({ totalItems, currentPage, itemsPerPage, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    onPageChange(Math.max(currentPage - 1, 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(currentPage + 1, totalPages));
  };

  const handlePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      onPageChange(Math.min(Math.max(value, 1), totalPages));
    }
  };

  return (
    <div className={styles.pagination}>
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        &lt;&lt;
      </button>

      <input
        type="number"
        min={1}
        max={totalPages}
        value={currentPage}
        onChange={handlePageInput}
        className={styles.pageInput}
        disabled={true}
      />

      <button onClick={handleNext} disabled={currentPage === totalPages}>
        &gt;&gt;
      </button>

      <span>Total: {totalItems}</span>
    </div>
  );
};
