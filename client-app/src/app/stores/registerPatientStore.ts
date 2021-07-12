import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { RegisterPatient, RegisterPatientDto } from "../models/registerPatients";
import { store } from "./store";

export default class RegisterPatientStore {
    patientRegistry = new Map<string, RegisterPatient>();
    selectedPatient: RegisterPatient | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get registeredPatients() {
        return Array.from(this.patientRegistry.values());
    }

    private setRegisteredPatient = (patient: RegisterPatient) => {
        this.patientRegistry.set(patient.id, patient);
    }

    private getRegisteredPatient = (id: string) => {
        return this.patientRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    loadRegisteredPatients = async () => {
        try {
            const patients = await agent.RegisterPatients.list();
            patients.forEach(patients => {
                this.setRegisteredPatient(patients);
            })
            this.loadingInitial = false;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }


    loadRegisteredPatient = async (id: string) => {
        let patient = this.getRegisteredPatient(id);
        if (patient) {
            this.selectedPatient = patient;
            return patient;
        } else {
            this.loadingInitial = true;
            try {
                patient = await agent.RegisterPatients.details(id);
                runInAction(() => {
                    this.selectedPatient = patient;
                })
                this.setLoadingInitial(false);
                return patient;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    registerPatient = async (patient: RegisterPatientDto) => {
        this.loading = true;
        try {
            await agent.RegisterPatients.create(patient);
            runInAction(() => {
                this.loadRegisteredPatients();
            })
            store.modalStore.closeModal();
            toast.success("Patient Registered Successfully", {})
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateRegisteredPatient = async (patient: RegisterPatient) => {
        this.loading = true;
        try {
            await agent.RegisterPatients.update(patient);
            runInAction(() => {
                this.patientRegistry.set(patient.id, patient);
                this.selectedPatient = patient;
                this.editMode = false;
                this.loading = false;
                store.modalStore.closeModal();
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteRegisteredPatient = async (id: string) => {
        this.loading = true;
        try {
            await agent.RegisterPatients.delete(id);
            runInAction(() => {
                this.patientRegistry.delete(id);
                this.loading = false;

            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}