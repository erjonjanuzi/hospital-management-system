import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { Patient, PatientTable } from "../models/patient";
import { store } from "./store";


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
        return Array.from(this.patientRegistry.values());
    }
        
    loadPatients = async() => {
        try {
            const patients = await agent.UserPatients.list();
            patients.forEach(patients => {
                this.setPatient(patients);
            })
            this.loadingInitial = false;
        } catch (error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    GresaLoadPatients = async() => {
        try {
            const patients = await agent.Patients.list();
            patients.forEach(patient => {
                this.GresasetPatient(patient);
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
     private GresasetPatient = (patient: Patient) => {
        this.patientRegistry.set(patient.id, patient);
     }


     private setPatient = (patient: Patient) => {
        if(patient.role === 'patient'){
            this.patientRegistry.set(patient.id, patient);
        }else{
            console.log("Can't load Patients")
        }
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
//// selectPatient, cancelSelectedPatient, openForm, closeForm, create jon te shtuara nga Gresa
    selectPatient = (id: string) => {
        this.selectedPatient = this.patientRegistry.get(id);
    }

    cancelSelectedPatient = () => {
        this.selectedPatient = undefined;
    }

    closeForm = () => {
        this.editMode = false;
    }

    openForm = (id?: string) => {
        id ? this.selectPatient(id) : this.cancelSelectedPatient();
        this.editMode = true;
    }

    create = async (creds: PatientTable) => {
        try {
            await agent.Patients.create(creds);
            runInAction(() => {
                this.loadPatients();
            })
            toast.success('Patient added successfully');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
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