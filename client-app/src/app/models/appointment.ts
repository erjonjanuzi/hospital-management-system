export interface Appointment {
    id: string;
    description: string;
    status: string;
    date: Date;
    patientId: string;
    doctorId?: string;
}