import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { BloodBank, BloodBankTable} from "../models/bloodBank";
import { store } from "./store";
import { toast } from "react-toastify";




export default class BloodBankStore{
    bloodBankRegistry = new Map<string, BloodBank>();
    selectedBloodBank : BloodBank | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this);
    }

    get bloodBanks(){
        return Array.from(this.bloodBankRegistry.values());
    }

    loadBloodBanks = async() =>{
        try{
            const bloodBanks = await agent.BloodBanks.list();
            bloodBanks.forEach(bloodBank =>{
                this.setBloodBank(bloodBank);
            })
            this.loadingInitial = false;
        }catch (error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    loadBloodBank = async (id: string) =>{
        let bloodBank = this.getBloodBank(id);
        if(bloodBank){
            this.selectedBloodBank = bloodBank;
            return bloodBank;
        }else{
            this.loadingInitial = true;
        try{
            bloodBank = await agent.BloodBanks.details(id);
            this.setBloodBank(bloodBank);
            runInAction(()=>{
                this.selectedBloodBank = bloodBank;
            })
            this.setLoadingInitial(false);
            return bloodBank;
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false);
            }
        }
    }

    private setBloodBank =(bloodBank : BloodBank) =>{
        this.bloodBankRegistry.set(bloodBank.name,bloodBank);
    }

    private getBloodBank =(id : string) =>{
        return this.bloodBankRegistry.get(id);
    }

    setLoadingInitial = (state : boolean) =>{
        this.loadingInitial = state;
    }

    createBloodBank = async (bloodBank : BloodBankTable) =>{
        this.loading = true;
        try{
            await agent.BloodBanks.create(bloodBank);
            runInAction(()=>{
                this.loadBloodBanks();
                store.modalStore.closeModal();
                toast.success('Donor added successfully')
            })
        }catch(error) {
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            }) 
        }
    }


    updateBloodBank = async (bloodBank : BloodBank)=>{
        this.loading=true;
        try{
            await agent.BloodBanks.update(bloodBank);
            runInAction(()=>{
                this.loadBloodBanks();
            })
            store.modalStore.closeModal();
        }catch(error) {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        } 
    }
   
         deleteBloodBank = async (id: string) => {
        this.loading = true;
        try {
            if (window.confirm('Are you sure you want to delete this record?')) {
                await agent.BloodBanks.delete(id);
                runInAction(() => {
                    this.bloodBankRegistry.delete(id);
                    this.loading = false;
                    store.modalStore.closeModal();
                    toast.info('Donor deleted successfully')
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



   // deleteDepartment = async (id : string)=>{
       // this.loading=true;
       // try{
         //   await agent.Departments.delete(id);
          //  runInAction(()=>{
              //  this.departmentRegistry.delete(id);
              //  this.loading=false;
          //  })
      //  }catch(error){
          //  console.log(error);
          //  runInAction(()=>{
          //      this.loading=false;
          //  })
       // }
  //  }

}

