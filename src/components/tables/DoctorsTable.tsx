import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Doctor } from "../../types/types";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { PaginationControl } from "./PaginationControl";
import { SearchInput } from "./SearchInput";
import { useAuth } from "../context/AuthContext";

interface DoctorsTableProps {
  doctors: Doctor[];
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
}

export const DoctorsTable = ({
  doctors,
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
}: DoctorsTableProps) => {
  const { user } = useAuth();

  return (
    <div>
      <SearchInput
        className="flex mb-2 flex-row items-center"
        value={search}
        onChange={onSearchChange}
        placeholder="Buscar médicos"
      />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Apellido
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                DNI
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha Nac
              </th>
              <th scope="col" className="px-6 py-3">
                Especialidad
              </th>
              {user?.role == "ADMIN" && (
                <th scope="col" className="px-6 py-3">
                  Salario
                </th>
              )}
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr className="bg-white text-nowrap border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{doctor.name}</td>
                <td className="px-6 py-4">{doctor.surname}</td>
                <td className="px-6 py-4">{doctor.email}</td>
                <td className="px-6 py-4">{doctor.dni}</td>
                <td className="px-6 py-4">{doctor.birth_date}</td>
                <td className="px-6 py-4">{doctor.speciality}</td>
                {user?.role == "ADMIN" && (
                  <td className="px-6 py-4">${doctor.salary}</td>
                )}
                <td className="flex flex-row px-6 py-4 text-right">
                  <button
                    type="button"
                    className="text-white bg-red-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <FontAwesomeIcon icon={faPencil} />
                    <span className="sr-only">Edit</span>
                  </button>
                  <button
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
};
