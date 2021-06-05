import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Diagnosis } from "../models/diagnosis";

export default class DiagnosisStore {
    diagnosisRegistry = new Map<string, Diagnosis>();
    selectedDiagnosis: Diagnosis | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    getDiagnoses() {
        return Array.from(this.diagnosisRegistry.values());
    }

    loadDiagnoses = async () => {
        try {
            const diagnoses = await agent.DiagnosisManager.list();
            diagnoses.forEach(diagnosis => {
                this.setDiagnosis(diagnosis);
            })
            this.loadingInitial = false;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadDiagnosis = async (id: string) => {
        let diagnosis = this.getDiagnosis(id);
        if (diagnosis) {
            this.selectedDiagnosis = diagnosis;
            return diagnosis;
        }
        else{
            this.loadingInitial = true;
            try{
                diagnosis = await agent.DiagnosisManager.details(id);
                this.setDiagnosis(diagnosis);
                runInAction(() => {
                    this.selectedDiagnosis = diagnosis;
                })
                this.setLoadingInitial(false);
                return diagnosis;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        } 
    }

    loadDiagnosisByPatient = async (patientId: string) => {
        let diagnosis = this.getDiagnosis(patientId);
        if (diagnosis) {
            this.selectedDiagnosis = diagnosis;
            return diagnosis;
        }
        else{
            this.loadingInitial = true;
            try{
                diagnosis = await agent.DiagnosisManager.byPatient(patientId);
                this.setDiagnosis(diagnosis);
                runInAction(() => {
                    this.selectedDiagnosis = diagnosis;
                })
                this.setLoadingInitial(false);
                return diagnosis;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        } 
    }

    createDiagnosis = async (diagnosis: Diagnosis) => {
        this.loading = true;
        try {
            await agent.DiagnosisManager.create(diagnosis);
            runInAction(() => {
                this.diagnosisRegistry.set(diagnosis.patientsId, diagnosis);
                this.selectedDiagnosis = diagnosis;
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


    private setDiagnosis = (diagnosis: Diagnosis) => {
        this.diagnosisRegistry.set(diagnosis.patientsId, diagnosis);
    }
    private getDiagnosis = (id: string) => {
        return this.diagnosisRegistry.get(id);
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
<<<<<<< Updated upstream
} 
=======
    
}
>>>>>>> Stashed changes
