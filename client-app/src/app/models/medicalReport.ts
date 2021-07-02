export interface MedicalReport{
    id : string;
    firstName : string;
    lastName : string;
    age : string;
    report : string;
    date: string; 
    patientsId: string;
}
export interface MedicalReportDto{
    firstName : string;
    lastName : string;
    age : string;
    report : string;
    date: string; 
    patientsId: string;
}