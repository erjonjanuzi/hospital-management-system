import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { OtherVacc, OtherVaccDto } from "../models/vaccs";
import { store } from "./store";


export default class OtherVaccsStore {
    vaccRegistry = new Map<string, OtherVacc>();
    selectedOtherVacc: OtherVacc | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this);
    }

    get other() {
        return Array.from(this.vaccRegistry.values());
    }

    loadDiffVaccines = async() => {
        try {
            const vaccine = await agent.OtherVaccs.list();
            vaccine.forEach(vaccine => {
                this.setDiffVaccine(vaccine);
            })
            this.loadingInitial = false;
        } catch (error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadDiffVaccine = async (id: string) => {
        let vaccine = this.getDiffVaccine(id);
        if (vaccine) {
            this.selectedOtherVacc = vaccine;
            return vaccine;
        } else {
            this.loadingInitial = true;
            try {
                vaccine = await agent.OtherVaccs.details(id);
                this.setDiffVaccine(vaccine);
                runInAction(() => {
                    this.selectedOtherVacc = vaccine;
                })
                this.setLoadingInitial(false);
                return vaccine;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setDiffVaccine = (vaccine: OtherVacc) => {
        this.vaccRegistry.set(vaccine.id, vaccine);
    }
    private getDiffVaccine = (id: string) => {
        return this.vaccRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    update = async (vaccine: OtherVacc) => {
        this.loading = true;
        try {
            await agent.OtherVaccs.update(vaccine);
            runInAction(() => {
                this.loadDiffVaccines();
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
                store.modalStore.closeModal();

            })
        }
    }

    create = async (vaccine: OtherVaccDto) => {
        this.loading = true;
        try {
            await agent.OtherVaccs.create(vaccine);
            runInAction(() => {
                this.loadDiffVaccines();
                store.modalStore.closeModal();
                toast.success('Vaccination Form Added Successfully')
            })
        }catch(error) {
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            }) 
        }
    }


    deleteDiffVaccine = async (id: string) => {
        this.loading = true;
        try {
            await agent.OtherVaccs.delete(id);
            runInAction(() => {
                this.vaccRegistry.delete(id);
                this.loading = false;
                store.modalStore.closeModal();
            })
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}
