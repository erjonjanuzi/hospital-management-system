
import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { DoctorProfile, PatientProfile } from "../models/profile";
import { AccountDto, AccountFormValues, RegisterDoctor } from "../models/user";
import { store } from "./store";

export default class ProfileStore {
    selectedDoctor: DoctorProfile | undefined = undefined;    
    selectedPatient: PatientProfile | undefined = undefined;

    constructor(){
        makeAutoObservable(this);
    }

    loadDoctor = async(id: string) => {
        try {
            const doctor = await agent.AccountsManager.getDoctor(id);
            if (doctor)
                this.selectedDoctor = doctor;
        } catch (error){
            console.log(error);
        }
    }

    loadPatient = async(id: string) => {
        try{
            const patient = await agent.AccountsManager.getPatient(id);
            if (patient)
                this.selectedPatient = patient;
        } catch (error){
            console.log(error);
        }
    }

    
    updateDoctor = async (creds: any) => {
        try {
            const doctor = {
                "id" : creds.id,
                "firstName" : creds.firstName,
                "lastName" : creds.lastName,
                "email" : creds.email,
                "userName" : creds.userName,
                "specialtyId" : creds.specialtyId,
                "personalInfoId" : creds.personalInfoId,
                "personalInfo" : {
                    "personalNumber" : creds.personalNumber,
                    "dateOfBirth" : creds.dateOfBirth,
                    "gender" : creds.gender,
                    "phoneNumber" : creds.phoneNumber,
                    "address" : creds.address,
                    "countryId" : creds.countryId,
                    "cityId" : creds.cityId,
                    "nationalityId" : creds.nationalityId,
                    "maritalStatus" : creds.maritalStatus
                }
            };
            await agent.AccountsManager.editDoctor(doctor);
            runInAction(() => {
                this.loadDoctor(doctor.id);
            });
            toast.success('Profile information updated succesfully');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    updatePatient = async (creds: any) => {
        try {
            const patient = {
                "id" : creds.id,
                "firstName" : creds.firstName,
                "lastName" : creds.lastName,
                "email" : creds.email,
                "userName" : creds.userName,
                "personalInfoId" : creds.personalInfoId,
                "personalInfo" : {
                    "personalNumber" : creds.personalNumber,
                    "dateOfBirth" : creds.dateOfBirth,
                    "gender" : creds.gender,
                    "phoneNumber" : creds.phoneNumber,
                    "address" : creds.address,
                    "countryId" : creds.countryId,
                    "cityId" : creds.cityId,
                    "nationalityId" : creds.nationalityId,
                    "maritalStatus" : creds.maritalStatus
                }
            };
            await agent.AccountsManager.editPatient(patient);
            runInAction(() => {
                this.loadPatient(patient.id);
            });
            toast.success('Profile information updated succesfully');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }
}