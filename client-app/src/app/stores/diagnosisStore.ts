import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Diagnosis, DiagnosisDto } from "../models/diagnosis";
import ModalStore from "./modalStore";
import { store } from "./store";
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from "react-toastify";

export default class DiagnosisStore {
    diagnosisRegistry = new Map<string, Diagnosis>();
    selectedDiagnosis: Diagnosis | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    modalStore = new ModalStore();

    constructor() {
        makeAutoObservable(this);
    }

    getDiagnoses() {
        return Array.from(this.diagnosisRegistry.values());
    }

    hasDiagnosis = async (id: string) => {
        const diagnoses = await agent.DiagnosisManager.list();
        diagnoses.forEach(diagnosis => {
            if (diagnosis.patientsId === id) {
                console.log('qiky ka diagnoz')
            }
            else {
                console.log('qiky ska diagnoz')
            }
        })
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
        else {
            this.loadingInitial = true;
            try {
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
        else {
            this.loadingInitial = true;
            try {
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

    createDiagnosis = async (diagnosis: DiagnosisDto) => {
        this.loading = true;
        const diagnoses = await agent.DiagnosisManager.list();

        for (let i = 0; i < diagnoses.length; i++) {
            if (diagnoses[i].patientsId === diagnosis.patientsId) {
                toast.error("Patient already has a Diagnose", {
                    autoClose: 3000
                })
                return;
            }
          }
        try {
            await agent.DiagnosisManager.create(diagnosis);
            runInAction(() => {
                this.editMode = false;
                this.loading = false;
                store.modalStore.closeModal();
                toast.success("Diagnose Added Successfully", {
                    autoClose: 3000,
                    hideProgressBar: false,
                })
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteDiagnosis = async (id: string) => {
        this.loading = true;
        try {
            if (window.confirm('Delete ?')) {
                await agent.DiagnosisManager.delete(id);
                runInAction(() => {
                    this.diagnosisRegistry.delete(id);
                    this.loading = false;
                    store.modalStore.closeModal();
                    window.location.reload();
                    // toast.success("Diagnose Deleted Successfully", {
                    //     autoClose: 3000,
                    //     hideProgressBar: false,
                    // })
                })
                
            }
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

} 



