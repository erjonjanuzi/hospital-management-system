import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { Patient, PatientTable } from "../models/patient";
import { Vaccination, VaccinationDto } from "../models/vaccination";
import { store } from "./store";


export default class VaccinationStore {
    vaccineRegistry = new Map<string, Vaccination>();
    selectedVaccine: Vaccination | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this);
    }

    get vaccine() {
        return Array.from(this.vaccineRegistry.values());
    }

    loadVaccines = async() => {
        try {
            const vaccine = await agent.Vaccinations.list();
            vaccine.forEach(vaccine => {
                this.setVaccine(vaccine);
            })
            this.loadingInitial = false;
        } catch (error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadVaccine = async (id: string) => {
        let vaccine = this.getVaccine(id);
        if (vaccine) {
            this.selectedVaccine = vaccine;
            return vaccine;
        } else {
            this.loadingInitial = true;
            try {
                vaccine = await agent.Vaccinations.details(id);
                this.setVaccine(vaccine);
                runInAction(() => {
                    this.selectedVaccine = vaccine;
                })
                this.setLoadingInitial(false);
                return vaccine;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
     private setVaccine = (vaccine: Vaccination) => {
        this.vaccineRegistry.set(vaccine.id, vaccine);
     }

    private getVaccine = (id: string) => {
        return this.vaccineRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    updateVaccine = async (vaccine: Vaccination) => {
        this.loading = true;
        try {
            await agent.Vaccinations.update(vaccine);
            runInAction(() => {
                this.vaccineRegistry.set(vaccine.id, vaccine);
                this.selectedVaccine = vaccine;
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

    createVaccination = async (vaccine: VaccinationDto) => {
        try {
            await agent.Vaccinations.create(vaccine);
            runInAction(() => {
                this.editMode = false;
                this.loading = false;
                store.modalStore.closeModal();
                toast.success("Vaccine Added Successfully", {
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

    deleteVaccine = async (id: string) => {
        this.loading = true;
        try {
            await agent.Vaccinations.delete(id);
            runInAction(() => {
                this.vaccineRegistry.delete(id);
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