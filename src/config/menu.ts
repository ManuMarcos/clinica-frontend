import { faBookMedical, faChartPie, faHandHoldingMedical, faHospitalUser, faUserDoctor, IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface MenuItemType{
    label: string;
    path: string;
    icon?: IconDefinition;
    roles: string[];
}

export const MENU_ITEMS : MenuItemType[] = [
    {
        label : "Dashboard",
        path: "/",
        icon: faChartPie,
        roles: ["ADMIN", "PATIENT", "DOCTOR"],
    },
    {
        label : "Medicos",
        path: "/doctors",
        icon: faUserDoctor,
        roles: ["ADMIN", "PATIENT", "DOCTOR"]
    },
    {
        label : "Pacientes",
        path: "/patients",
        icon: faHospitalUser,
        roles: ["ADMIN", "DOCTOR"]
    },
    {
        label : "Servicios",
        path: "/services",
        icon: faHandHoldingMedical,
        roles: ["ADMIN", "PATIENT", "DOCTOR"]
    },
    {
        label: "Especialidades",
        path: "/specialities",
        icon: faBookMedical,
        roles: ["ADMIN", "PATIENT", "DOCTOR"]
    }
]