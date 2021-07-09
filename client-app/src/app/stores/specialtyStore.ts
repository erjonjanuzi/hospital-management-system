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

    loadSpecialty = async (id: any) => {
        let specialty = this.getSpecialty(id);
        if (specialty) {
            this.selectedSpecialty = specialty;
            return specialty;
        } else {
            try {
                specialty = await agent.Specialties.details(id);
                this.setSpecialty(specialty);
                runInAction(() => {
                    this.selectedSpecialty = specialty;
                })
                return specialty;
            } catch (error) {
                console.log(error);
            }
        }
    }

    private getSpecialty = (id: any) => {
        return this.specialtyRegistry.get(id);
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

    loadDoctors = async (id: any, date: Date) => {
        try {
            this.doctorRegistry.clear();
            const doctors = await agent.Appointments.getAvailableDoctors(id, date);
            doctors.forEach(doctor => {
                this.setDoctor(doctor);
            })
        } catch (error){
            console.log(error)
        }
    }

    deleteSpecialty = async (id: any) => {
        try {
            await agent.Specialties.delete(id);
            runInAction(() => {
                this.specialtyRegistry.delete(id);
            });
            toast.success("Specialty deleted successfully");
        } catch (error) {
            console.log(error);
            toast.error("Error deleting specialty")
        }
    }

    editSpecialty = async (specialty: Specialty) => {
        try {
            await agent.Specialties.update(specialty);

            runInAction(() => {
                this.loadSpecialties();
            })

            toast.info('Specialty updated');
        } catch (error) {
            console.log(error);
        }
    }

    createSpecialty = async (specialty: Specialty) => {
        try {
            if (specialty == null) return null;

            await agent.Specialties.create(specialty);

            runInAction(() => {
                this.loadSpecialties();
            })
            toast.success('Specialty created successfully');
        } catch (error) {
            console.log(error);
        }
    }
}