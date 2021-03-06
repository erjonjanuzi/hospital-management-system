export interface Patient {
    id: string;
    firstName: string;
    lastName: string;
    age: string;
    registeredSince: string;
    email: string;
    status:string;
    role: string;
    username: string;
    diagnosis: string;
    analysis: string;
    report : string;
}

export interface PatientTable {
    firstName: string;
    lastName: string;
    age: string;
    registeredSince: string;
    email: string;
    status: string;
    username: string;
    role: string;
    diagnosis: string;
    analysis: string;
}