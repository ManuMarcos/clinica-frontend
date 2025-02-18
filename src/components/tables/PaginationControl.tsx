import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PaginationControlProps {
  page: number; //Pagina actual
  totalPages: number; //Total de paginas
  totalElements: number; //Total de elementos
  first: boolean;
  last: boolean;
  onPageChange: (page: number) => void; //Función para cambiar de pagina
}

export const PaginationControl = ({
  page,
  totalPages,
  totalElements,
  first,
  last,
  onPageChange,
}: PaginationControlProps) => {
  return (
    <div className="flex flex-row justify-end items-center mt-2">
      <span>Total: {totalElements}</span>
      <div className="ml-3">
        <button
          type="button"
          disabled={first}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={() => onPageChange(page - 1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button
          disabled={last}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={() => onPageChange(page + 1)}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};
