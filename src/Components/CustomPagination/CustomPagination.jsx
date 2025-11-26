import Pagination from "react-bootstrap/Pagination";

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const items = [];

  // --- Caso: solo 2 páginas → mostrar ambas
  if (totalPages === 2) {
    items.push(
      <Pagination.Item
        key={1}
        active={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        1
      </Pagination.Item>
    );
    items.push(
      <Pagination.Item
        key={2}
        active={currentPage === 2}
        onClick={() => onPageChange(2)}
      >
        2
      </Pagination.Item>
    );

    return <Pagination>{items}</Pagination>;
  }

  // --- Caso: 3 o más páginas → sistema con puntos (...)

  // Primera página
  items.push(
    <Pagination.Item
      key={1}
      active={currentPage === 1}
      onClick={() => onPageChange(1)}
    >
      1
    </Pagination.Item>
  );

  // Puntos suspensivos izquierdo
  if (currentPage > 3) {
    items.push(<Pagination.Ellipsis key="left-ellipsis" disabled />);
  }

  // Páginas centrales (current-1, current, current+1)
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={currentPage === i}
        onClick={() => onPageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  // Puntos suspensivos derecho
  if (currentPage < totalPages - 2) {
    items.push(<Pagination.Ellipsis key="right-ellipsis" disabled />);
  }

  // Última página
  items.push(
    <Pagination.Item
      key={totalPages}
      active={currentPage === totalPages}
      onClick={() => onPageChange(totalPages)}
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
