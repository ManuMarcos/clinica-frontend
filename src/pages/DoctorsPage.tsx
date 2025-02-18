import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Doctor, PaginatedResponse } from "../types/types";
import { axiosInstance } from "../api/axiosInstance";
import { DoctorsTable } from "../components/tables/DoctorsTable";
import { PageHeader } from "../components/PageHeader";

export const DoctorsPage = () => {
  const [doctorList, setDoctorList] = useState<Doctor[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axiosInstance
      .get<PaginatedResponse<Doctor>>("/doctors", {
        params: {
          page: page,
        },
      })
      .then((response) => {
        setDoctorList(response.data.data);
        setTotalElements(response.data.totalElements);
        setTotalPages(response.data.totalPages);
        setFirst(response.data.first);
        setLast(response.data.last);
      });
  }, [page]);

  const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    console.log(search)
  }

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
      <PageHeader title={"Médicos"} />
      <DoctorsTable
        doctors={doctorList}
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
