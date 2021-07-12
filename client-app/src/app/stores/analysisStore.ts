import { makeAutoObservable, runInAction } from "mobx";
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from "react-toastify";
import agent from "../api/agent";
import { Analyse, AnalyseDto } from "../models/analyse";
import ModalStore from "./modalStore";
import { store } from "./store";

export default class AnalysisStore {
    analyseRegistry = new Map<string, Analyse>();
    selectedAnalyse: Analyse | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    modalStore = new ModalStore();

    constructor() {
        makeAutoObservable(this);
    }

    getAnalyses() {
        return Array.from(this.analyseRegistry.values());
    }

    hasAnalysis = async (id: string) => {
        const analyses = await agent.Analysis.list();
        analyses.forEach(analyse => {
            if (analyse.patientsId === id) {
                console.log("This patient already has an analysis")
                // this.setAnalyse(analyse);
            }
            else {
                console.log("This patient does not have an analysis");
            }
        })
    }

    loadAnalyses = async () => {
        try {
            const analyses = await agent.Analysis.list();
            analyses.forEach(analysis => {
                this.setAnalyse(analysis);
            })
            this.loadingInitial = false;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadAnalysis = async (id: string) => {
        let analysis = this.getAnalyse(id);
        if (analysis) {
            this.selectedAnalyse = analysis;
            return analysis;
        } else {
            this.loadingInitial = true;
            try {
                analysis = await agent.Analysis.details(id);
                this.setAnalyse(analysis);
                runInAction(() => {
                    this.selectedAnalyse = analysis;
                })
                this.setLoadingInitial(false);
                return analysis;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    loadAnalysisByPatient = async (patientId: string) => {
        let analysis = this.getAnalyse(patientId);
        if (analysis) {
            this.selectedAnalyse = analysis;
            return analysis;
        } else {
            this.loadingInitial = true;
            try {
                analysis = await agent.Analysis.ByPatient(patientId);
                this.setAnalyse(analysis);
                runInAction(() => {
                    this.selectedAnalyse = analysis;
                })
                this.setLoadingInitial(false);
                return analysis;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    createAnalyse = async (analysis: AnalyseDto) => {
        this.loading = true;
        const analyses = await agent.Analysis.list();

        for (let i = 0; i < analyses.length; i++) {
            if (analyses[i].patientsId === analysis.patientsId) {
                toast.error("Patient already has an analyse", {
                    autoClose: 3000
                })
                return;
            }
        }
        try {
            await agent.Analysis.create(analysis);
            runInAction(() => {
                this.editMode = false;
                this.loading = false;
                store.modalStore.closeModal();
                toast.success("Analyse Added Successfully", {
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

    updateAnalyse = async (analyse: Analyse) => {
        this.loading = true;
        try {
            await agent.Analysis.update(analyse);
            runInAction(() => {
                this.analyseRegistry.set(analyse.id, analyse);
                this.selectedAnalyse = analyse;
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

    deleteAnalyse = async (id: string) => {
        this.loading = true;
        try {
            // if (window.confirm('Delete?')) {
            await agent.Analysis.delete(id);
            runInAction(() => {
                this.analyseRegistry.delete(id);
                this.loading = false;
                store.modalStore.closeModal();
                window.location.reload();

            })

            // }
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    private setAnalyse = (analysis: Analyse) => {
        this.analyseRegistry.set(analysis.patientsId, analysis);
    }
    private getAnalyse = (id: string) => {
        return this.analyseRegistry.get(id);
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
}