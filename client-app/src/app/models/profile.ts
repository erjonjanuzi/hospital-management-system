import { PersonalInfo } from "./personalInfo";
import { Specialty } from "./specialty";

export interface DoctorProfile {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    image?: string;
    photos?: Photo[];
    registeredSince: string;
    specialty: Specialty;
    personalInfo: PersonalInfo
}

export interface PatientProfile {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    registeredSince: string;
    personalInfo: PersonalInfo;
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
}