import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { EspecialidadesPills } from "../components/PillsList";
import { PaginatedResponse, Speciality } from "../types/types";
import { axiosInstance } from "../api/axiosInstance";
import { SpecialitiesTable } from "../components/tables/SpecialitiesTable";

export const SpecialitiesPage = () => {
  const [specialitiesList, setSpecialitiesList] = useState<Speciality[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axiosInstance
      .get<Speciality[]>("/specialities")
      .then((response) => {
        setSpecialitiesList(response.data);
        //setTotalElements(response.data.totalElements);
        //setTotalPages(response.data.totalPages);
        //setFirst(response.data.first);
        //setLast(response.data.last);
      });
  }, [page]);


  const doctors = [
    { id: 1, name: "Dr. Pérez", specialtyId: 1 },
    { id: 2, name: "Dra. Gómez", specialtyId: 1 },
    { id: 3, name: "Dr. López", specialtyId: 2 },
    { id: 4, name: "Dra. Martínez", specialtyId: 3 },
  ];

  const [selectedSpecialty, setSelectedSpecialty] = useState<Speciality | null>(
    null
  );

  const handleEdit = (id : number) => {
    console.log("Editar especialidad con ID:", id);
  };
  
  const handleDelete = (id : number) => {
    console.log("Eliminar especialidad con ID:", id);
  };
  
  const handleSelect = (id : number) => {
    console.log("Seleccionaste la especialidad con ID:", id);
  };

  const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    console.log(search)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  

  return (
    <Layout>
      <h2 className="flex text-4xl font-bold dark:text-white justify-center mb-3">
        Especialidades
      </h2>
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* 📋 Tabla de Especialidades */}
        <div className="border p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Especialidades</h2>
          <SpecialitiesTable specialities={specialitiesList} onDelete={handleDelete} onSelect={handleSelect}
            onEdit={handleEdit} onPageChange={handlePageChange} onSearchChange={handleSearch} totalElements={totalElements}
            totalPages={totalPages} last={last} first={first} currentPage={page} search={search}
          />
        </div>

        {/* 👨‍⚕️ Tabla de Médicos por Especialidad */}
        <div className="border p-4 rounded-lg shadow">
          {selectedSpecialty ? (
            <>
              <h2 className="text-lg font-semibold mb-2">
                Médicos en {selectedSpecialty.name}
              </h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors
                    .filter(
                      (doctor) => doctor.specialtyId === selectedSpecialty.id
                    )
                    .map((doctor) => (
                      <tr key={doctor.id} className="hover:bg-gray-200">
                        <td className="p-2 border">{doctor.name}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          ) : (
            <p className="text-gray-500">
              Selecciona una especialidad para ver los médicos.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};
