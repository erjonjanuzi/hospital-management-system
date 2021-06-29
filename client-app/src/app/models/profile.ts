import { Specialty } from "./specialty";

export interface DoctorProfile {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    specialtyId?: Specialty;
}

export interface PatientProfile {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
}