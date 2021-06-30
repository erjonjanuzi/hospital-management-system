import { PatientProfile } from "./profile";

export interface Pharmacy {
    id : string;
    productName : string;
    productCode : string;
    category : string;
    country : string ;
    manufacturer : string;
    prescription : string;
    mg : string;
    price : string;
    modificationDate : string;
    quantity : string;
    patientId: string;
    patient? : PatientProfile;
}
export interface PharmacyDto{
    productName : string;
    productCode : string;
    category : string;
    country : string ;
    manufacturer : string;
    prescription : string;
    mg : string;
    price : string;
    quantity : string;
}