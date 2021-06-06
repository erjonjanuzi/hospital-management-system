import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { Analyse } from "../models/analyse";
import { store } from "./store";

export default class Analysistore {
    analyseRegistry = new Map<string, Analyse>();
    selectedAnalyse: Analyse | undefined = undefined;
    editMode= false;
    loading = false;
    loadingInitial= false;

    constructor(){
        makeAutoObservable(this);
    }

    get analysis(){
        return Array.from(this.analyseRegistry.values());
    }

    loadAnalysis= async() => {
        try{
            const analysis = await agent.Analysis.list();
            analysis.forEach(analyse =>{
                this.setAnalyse(analyse);
            })
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }


    private setAnalyse = (analyse: Analyse) => {
        this.analyseRegistry.set(analyse.id, analyse);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    private getAnalyse = (id: string) => {
        return this.analyseRegistry.get(id);
    }
        

    loadAnalyse = async (id: string) => {
        let analyse = this.getAnalyse(id);
        if (analyse) {
            this.selectedAnalyse = analyse;
            return analyse;
        } else {
            this.loadingInitial = true;
            try {
                analyse = await agent.Analysis.details(id);
                this.setAnalyse(analyse);
                runInAction(() => {
                    this.selectedAnalyse = analyse;
                })
                this.setLoadingInitial(false);
                return analyse;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    //foreign key
    loadAnalyseP = async (patientId: string) => {
        let analyse = this.getAnalyse(patientId);
        if (analyse) {
            this.selectedAnalyse = analyse;
            return analyse;
        } else {
            this.loadingInitial = true;
            try {
                analyse = await agent.Analysis.details(patientId);
                this.setAnalyse(analyse);
                runInAction(() => {
                    this.selectedAnalyse = analyse;
                })
                this.setLoadingInitial(false);
                return analyse;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    // createAnalyse = async (analyse: Analyse) => {
    //     this.loading = true;
    //     try {
    //       await agent.Analysis.create(analyse);
    //       runInAction(() => {
    //         this.analyseRegistry.set(analyse.id, analyse);
    //         this.selectedAnalyse = analyse;
    //         this.editMode = false;
    //         this.loading = false;
    //       });
    //     } catch (error) {
    //       console.log(error);
    //       runInAction(() => {
    //         this.loading = false;
    //       });
    //     }
    //   };

      

//     createPatient = async (patient: Patient) => {
//         this.loading = true;
//         try {
//             await agent.Patients.create(patient);
//             runInAction(() => {
//                 this.patientRegistry.set(patient.id, patient);
//                 this.selectedPatient = patient;
//                 this.editMode = false;
//                 this.loading = false;
//             })
//         } catch (error) {
//             console.log(error);
//             runInAction(() => {
//                 this.loading = false;
//             })
//         }
//     }

    updateAnalyse = async (analyse: Analyse) => {
        this.loading = true;
        try {
            await agent.Analysis.update(analyse);
            runInAction(() => {
                this.analyseRegistry.set(analyse.id, analyse);
                this.selectedAnalyse = analyse;
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
// //// selectPatient, cancelSelectedPatient, openForm, closeForm, create jon te shtuara nga Gresa
    selectAnalyse = (id: string) => {
        this.selectedAnalyse = this.analyseRegistry.get(id);
    }

    cancelSelectedAnalyse = () => {
        this.selectedAnalyse = undefined;
    }

    closeForm = () => {
        this.editMode = false;
    }

    openForm = (id?: string) => {
        id ? this.selectAnalyse(id) : this.cancelSelectedAnalyse();
        this.editMode = true;
    }

    create = async (creds: Analyse) => {
        try {
            await agent.Analysis.create(creds);
            runInAction(() => {
                this.loadAnalysis();
            })
            toast.success('Patient added successfully');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }


    deleteAnalyse = async (id: string) => {
        this.loading = true;
        try {
            await agent.Analysis.delete(id);
            runInAction(() => {
                this.analyseRegistry.delete(id);
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