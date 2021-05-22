import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Patient } from "../models/patient";

export default class PatientStore {
    patientRegistry = new Map<string, Patient>();
    selectedPatient: Patient | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this);
    }

    get patients() {
        return [
            {
                "id": "e0363e9c-1dc6-40fb-b56e-08d9194df289",
                "firstName": "Engjell",
                "lastName": "Avdiu"
            },
            {
                "id": "0bf249b7-426d-4aae-91c5-08d91d3ca8d4",
                "firstName": "Erjon Updated Test",
                "lastName": "Januzi"
            },
            {
                "id": "9ceb3c7f-4710-4657-9f85-2480abe4a644",
                "firstName": "test",
                "lastName": "test"
            },
            {
                "id": "35a7cd7c-0bff-479b-b50a-346b00566690",
                "firstName": "test2",
                "lastName": "test2"
            }
        ];
    }

    loadPatients = async() => {
        try {
            const patients = await agent.Patients.list();
            patients.forEach(patient => {
                this.setPatient(patient);
            })
            this.loadingInitial = false;
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