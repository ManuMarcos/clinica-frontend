export interface User{
    id: number,
    name : string,
    surname : string,
    email: string,
    dni: string,
    birth_date : string,
    role : string
}

export interface Doctor extends User {
    speciality: string,
    salary : number,
    workingHours: WorkingHour[],
    services: Service[];
}

export interface Admin extends User {
    position: String;
}

export interface Patient extends User {
    health_insurance: HealthInsurance;
}

export interface HealthInsurance{
    name: string;
    plan: string;
    number: string;
}

export interface WorkingHour {
    id: number,
    day_of_week : string,
    time_from: string,
    time_to: string
}

export interface Service{
    id: number;
    name: string;
    description: string;
    service_code : string;
    price: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
}

export interface Speciality {
    id: number;
    name: string;
}