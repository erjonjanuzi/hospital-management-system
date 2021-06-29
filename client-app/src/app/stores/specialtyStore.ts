import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { DoctorProfile } from "../models/profile";
import { Specialty } from "../models/specialty";
import { store } from "./store";

export default class SpecialtyStore {
    specialtyRegistry = new Map<string, Specialty>();
    selectedSpecialty: Specialty | undefined = undefined;
    doctorRegistry = new Map<string, DoctorProfile>();

    constructor() {
        makeAutoObservable(this);
    }

    get specialties() {
        return Array.from(this.specialtyRegistry.values());
    }

    loadSpecialties = async () => {
        try {
            const specialties = await agent.Specialties.list();
            specialties.forEach(specialty => {
                this.setSpecialty(specialty);
            })
        } catch (error) {
            console.log(error);
        }
    }

    private setSpecialty = (specialty: Specialty) => {
        this.specialtyRegistry.set(specialty.id!, specialty);
    }

    get doctors() {
        return Array.from(this.doctorRegistry.values());
    }

    private setDoctor = (doctor: DoctorProfile) => {
        this.doctorRegistry.set(doctor.id, doctor);
    }

    loadDoctors = async (id: any) => {
        try {
            const doctors = await agent.Specialties.getDoctorsBySpecialty(id);
            doctors.forEach(doctor => {
                this.setDoctor(doctor);
            })
        } catch (error){
            console.log(error)
        }
    }
}