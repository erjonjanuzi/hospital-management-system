import { City, Country } from "./city";
import { Nationality } from "./nationality";

//changes made here/////
export interface PersonalInfo {
    id: string;
    dateOfBirth: string;
    gender: string;
    phonenumber: string;
    address: string;
    city: City;
    country: Country;
    nationality: Nationality;
    maritalstatus: string;
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

