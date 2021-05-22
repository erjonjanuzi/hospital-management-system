import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Patient } from "../models/patient";

export default class PatientStore {
    patientRegistry = new Map<string, Patient>();
    selectedPatient: Patient | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor(){
        makeAutoObservable(this);
    }

    get patients() {
        return Array.from(this.patientRegistry.values());
    }

    loadPatients = async() => {
        this.loadingInitial = true;
        try {
            const patients = await agent.Patients.list();
            patients.forEach(patient => {
                this.setPatient(patient);
            })
        } catch (error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadPatient = async (id: string) => {
        let patient = this.getPatient(id);
        if (patient) {
            this.selectedPatient = patient;
            return patient;
        } else {
            this.loadingInitial = true;
            try {
                patient = await agent.Patients.details(id);
                this.setPatient(patient);
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

    private setPatient = (patient: Patient) => {
        this.patientRegistry.set(patient.id, patient);
    }

    private getPatient = (id: string) => {
        return this.patientRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createPatient = async (patient: Patient) => {
        this.loading = true;
        try {
            await agent.Patients.create(patient);
            runInAction(() => {
                this.patientRegistry.set(patient.id, patient);
                this.selectedPatient = patient;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updatePatient = async (patient: Patient) => {
        this.loading = true;
        try {
            await agent.Patients.update(patient);
            runInAction(() => {
                this.patientRegistry.set(patient.id, patient);
                this.selectedPatient = patient;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deletePatient = async (id: string) => {
        this.loading = true;
        try {
            await agent.Patients.delete(id);
            runInAction(() => {
                this.patientRegistry.delete(id);
                this.loading = false;
            })
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}