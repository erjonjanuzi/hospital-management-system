export interface RegisterPatient {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    phone: string;
    email: string;
    address:string;
    about: string;
    allergic: string;
}

export interface RegisterPatientDto {
    firstName: string;
    lastName: string;
    gender: string;
    phone: string;
    email: string;
    address:string;
    about: string;
    allergic: string;
}