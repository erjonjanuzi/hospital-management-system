import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { Nationality } from "../models/nationality";

export default class NationalityStore {
    nationalitiesRegistry = new Map<string, Nationality>();
    selectedNationality: Nationality | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    get nationalities() {
        return Array.from(this.nationalitiesRegistry.values());
    }

    loadNationalities = async () => {
        try {
            const nationalities = await agent.Nationalities.list();
            nationalities.forEach(nationality => {
                this.setNationality(nationality);
            })
        } catch (error) {
            console.log(error);
        }
    }

    private setNationality = (nationality: Nationality) => {
        this.nationalitiesRegistry.set(nationality.id!, nationality);
    }

    loadNationality = async (id: any) => {
        let nationality = this.getNationality(id);
        if (nationality) {
            this.selectedNationality = nationality;
            return nationality;
        } else {
            try {
                nationality = await agent.Nationalities.details(id);
                this.setNationality(nationality);
                runInAction(() => {
                    this.selectedNationality = nationality;
                })
                return nationality;
            } catch (error) {
                console.log(error);
            }
        }
    }

    private getNationality = (id: any) => {
        return this.nationalitiesRegistry.get(id);
    }

    createNationality = async (nationality: Nationality) => {
        try {
            if (nationality == null) return null;

            await agent.Nationalities.create(nationality);

            runInAction(() => {
                this.loadNationalities();
            })
            toast.success('Nationality created successfully');
        } catch (error) {
            console.log(error);
        }
    }

    deleteNationality = async (id: any) => {
        try {
            await agent.Nationalities.delete(id);
            runInAction(() => {
                this.nationalitiesRegistry.delete(id);
            })
            toast.success('Nationality deleted successfully');
        } catch (error) {
            console.log(error);
        }
    }

    updateNationality = async (nationality: Nationality) => {
        try {
            await agent.Nationalities.update(nationality);
            runInAction(() => {
                this.loadNationalities();
            })
            toast.success("Nationality updated successfully");
        } catch (error) {
            console.log(error);
            toast.error("Error updating country");
        }
    }
}