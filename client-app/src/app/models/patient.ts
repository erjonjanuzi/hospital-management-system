export interface Patient {
    id: string;
    firstName: string;
    lastName: string;
    age: string;
    registeredSince: string;
    email: string;
    status:string;

}

export interface PatientTable {
    firstName: string;
    lastName: string;
    age: string;
    // registeredSince: string;
    email: string;
    status: string;
}