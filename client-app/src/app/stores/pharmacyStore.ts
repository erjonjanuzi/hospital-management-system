import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { Pharmacy, PharmacyDto } from "../models/pharmacy";
import { store } from "./store";

export default class pharmacyStore{
    pharmacyRegistry = new Map<string, Pharmacy>();
    selectedPharmacy : Pharmacy | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    

    constructor(){
        makeAutoObservable(this);
    }

    get pharmacies(){
        return Array.from(this.pharmacyRegistry.values());
    }

    loadPharmacies = async() =>{
        try{
            const pharmacies = await agent.Pharmacies.list();
            pharmacies.forEach(pharmacy =>{
                this.setPharmacy(pharmacy);
            })
            this.loadingInitial = false;
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadPharmacy = async(id : string)=>{
        let pharmacy = this.getPharmacy(id);
            if(pharmacy){
                this.selectedPharmacy = pharmacy;
                return pharmacy
            }else{
                this.loadingInitial = true;
            try{
                pharmacy = await agent.Pharmacies.details(id);
                this.setPharmacy(pharmacy);
                runInAction(()=>{
                    this.selectedPharmacy=pharmacy;
                })
                this.setLoadingInitial(false);
                return pharmacy;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setPharmacy =(pharmacy : Pharmacy)=>{
        this.pharmacyRegistry.set(pharmacy.productName,pharmacy);
    }

    private getPharmacy =(id : string)=>{
        return this.pharmacyRegistry.get(id);
    }

    setLoadingInitial = (state : boolean)=>{
        this.loadingInitial= state;
    }


    createPharmacy = async(pharmacy : PharmacyDto)=>{
        this.loading = true;
        try{
            await agent.Pharmacies.create(pharmacy);
            runInAction(()=>{
                this.loadPharmacies();
            })
            toast.success('Product added successfully');
            store.modalStore.closeModal();
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }

    updatePharmacy = async (pharmacy : Pharmacy)=>{
        this.loading = true;
        try{
            await agent.Pharmacies.update(pharmacy);
            runInAction(()=>{
                this.loadPharmacies();
            })
            toast.success('Product updated successfully');
            store.modalStore.closeModal();
        }catch(error){
            throw error;
        }
    }

    deletePharmacy = async(id : string)=>{
        this.loading = true;
        try{
            await agent.Pharmacies.delete(id);
            runInAction(()=>{
                this.pharmacyRegistry.delete(id);
                this.loading=false;
            })
            toast.info('Product deleted successfully');
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }

}