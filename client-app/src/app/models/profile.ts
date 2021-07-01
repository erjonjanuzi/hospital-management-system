import { PersonalInfo } from "./personalInfo";
import { Specialty } from "./specialty";

export interface DoctorProfile {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    //registeredSince: string;
    specialty: Specialty;
    personalInfo: PersonalInfo
}

export interface PatientProfile {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
}