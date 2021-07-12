import { DoctorProfile, PatientProfile } from "./profile";

export interface Appointment {
    id?: string;
    reason: string;
    comment?: string;
    status: string;
    date: Date;
    patientId: string;
    doctorId?: string;
    doctor?: DoctorProfile;
    patient?: PatientProfile;
}