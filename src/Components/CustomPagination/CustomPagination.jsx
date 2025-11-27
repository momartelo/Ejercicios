import Pagination from "react-bootstrap/Pagination";
import styles from "./CustomPagination.module.css";

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const items = [];

  const itemClass = (page) =>
    page === currentPage
      ? `${styles.customPagination} ${styles.activePagination}`
      : styles.customPagination;

  if (totalPages === 2) {
    items.push(
      <Pagination.Item
        key={1}
        active={currentPage === 1}
        onClick={() => onPageChange(1)}
        className={itemClass(1)}
      >
        1
      </Pagination.Item>
    );
    items.push(
      <Pagination.Item
        key={2}
        active={currentPage === 2}
        onClick={() => onPageChange(2)}
        className={itemClass(2)}
      >
        2
      </Pagination.Item>
    );

    return <Pagination>{items}</Pagination>;
  }

  items.push(
    <Pagination.Item
      key={1}
      active={currentPage === 1}
      onClick={() => onPageChange(1)}
      className={itemClass(1)}
    >
      1
    </Pagination.Item>
  );

  if (currentPage > 3) {
    items.push(<Pagination.Ellipsis key="left-ellipsis" disabled />);
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={currentPage === i}
        onClick={() => onPageChange(i)}
        className={itemClass(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  if (currentPage < totalPages - 2) {
    items.push(<Pagination.Ellipsis key="right-ellipsis" disabled />);
  }

  items.push(
    <Pagination.Item
      key={totalPages}
      active={currentPage === totalPages}
      onClick={() => onPageChange(totalPages)}
      className={itemClass(totalPages)}
    >
      {totalPages}
    </Pagination.Item>
  );

  return (
    <Pagination className="d-flex justify-content-center mt-4">
      {items}
    </Pagination>
  );
};

export default CustomPagination;
