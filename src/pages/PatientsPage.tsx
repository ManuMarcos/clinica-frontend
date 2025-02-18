import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { PaginatedResponse, Patient } from "../types/types";
import { PatientsTable } from "../components/tables/PatientsTable";
import { axiosInstance } from "../api/axiosInstance";
import { PageHeader } from "../components/PageHeader";

export const PatientsPage = () => {
  const [patientsList, setPatientsList] = useState<Patient[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axiosInstance
      .get<PaginatedResponse<Patient>>("/patients", {
        params: {
          page: page,
        },
      })
      .then((response) => {
        setPatientsList(response.data.data);
        setTotalElements(response.data.totalElements);
        setTotalPages(response.data.totalPages);
        setFirst(response.data.first);
        setLast(response.data.last);
      });
  }, [page]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleEdit = (id: number) => {
    console.log("Edit: ", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete: ", id);
  };

  return (
    <Layout>
      <PageHeader title="Pacientes" />
      <PatientsTable
        patients={patientsList}
        currentPage={page}
        totalElements={totalElements}
        onPageChange={handlePageChange}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearchChange={handleSearch}
        totalPages={totalPages}
        first={first}
        last={last}
        search={search}
      />
    </Layout>
  );
};
