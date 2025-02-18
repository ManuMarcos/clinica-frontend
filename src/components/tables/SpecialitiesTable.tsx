import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PaginationControl } from "./PaginationControl";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { SearchInput } from "./SearchInput";
import { Speciality } from "../../types/types";


interface PatientsTableProps {
    specialities: Speciality[];
    currentPage: number;
    totalPages: number;
    totalElements: number;
    first: boolean;
    last: boolean;
    search: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPageChange: (page: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onSelect : (id: number) => void;
  }
  
  export const SpecialitiesTable = ({
    specialities,
    currentPage,
    totalPages,
    totalElements,
    first,
    last,
    search,
    onPageChange,
    onSearchChange,
    onEdit,
    onDelete,
    onSelect
  }: PatientsTableProps) => (
    <div>
      <SearchInput
        className="flex mb-2 flex-row items-center"
        value={search}
        onChange={onSearchChange}
        placeholder="Buscar especialidad"
      />
      <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {specialities.map((speciality) => (
              <tr onClick={() => onSelect(speciality.id)} className="bg-white text-nowrap border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{speciality.name}</td>
                <td className="flex flex-row justify-end px-6 py-4 text-right">
                  <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(speciality.id);
                    }}
                    type="button"
                    className="text-white bg-red-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <FontAwesomeIcon icon={faPencil} />
                    <span className="sr-only">Edit</span>
                  </button>
                  <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(speciality.id)
                    }}
                    type="button"
                    className="text-white bg-red-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-red-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    <span className="sr-only">Eliminar</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationControl
          page={currentPage}
          totalElements={totalElements}
          totalPages={totalElements}
          onPageChange={onPageChange}
          first={first}
          last={last}
        />
      </div>
    </div>
  );