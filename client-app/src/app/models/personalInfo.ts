import { City, Country } from "./city";
import { Nationality } from "./nationality";

export interface PersonalInfo {
    id: string;
    dateOfBirth: string;
    personalNumber: string;
    gender: string;
    phoneNumber: string;
    address: string;
    city: City;
    country: Country;
    nationality: Nationality;
    maritalStatus: string;
}

export interface PersonalInfoDTO {
    dateofbirth: string;
    gender: string;
    phonenumber: string;
    height: string;
    address: string;
    city: string;
    country: string;
    nationality: string;
    maritalstatus: string;
    patientsId: string;
}

