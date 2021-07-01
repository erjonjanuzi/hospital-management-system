import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { HealthData, HealthDataTable} from "../models/healthData";
import { store } from "./store";
import { toast } from "react-toastify";




export default class HealthDataStore{
    healthDataRegistry = new Map<string, HealthData>();
    selectedHealthData : HealthData | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this);
    }

    get healthDatas(){
        return Array.from(this.healthDataRegistry.values());
    }

    loadHealthDatas = async() =>{
        try{
            const healthDatas = await agent.HealthDatas.list();
            healthDatas.forEach(healthData =>{
                this.setHealthData(healthData);
            })
            this.loadingInitial = false;
        }catch (error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    loadHealthData = async (id: string) =>{
        let healthData = this.getHealthData(id);
        if(healthData){
            this.selectedHealthData = healthData;
            return healthData;
        }else{
            this.loadingInitial = true;
        try{
            healthData = await agent.HealthDatas.details(id);
            this.setHealthData(healthData);
            runInAction(()=>{
                this.selectedHealthData = healthData;
            })
            this.setLoadingInitial(false);
            return healthData;
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false);
            }
        }
    }

    private setHealthData =(healthData : HealthData) =>{
        this.healthDataRegistry.set(healthData.medication,healthData);
    }

    private getHealthData =(id : string) =>{
        return this.healthDataRegistry.get(id);
    }

    setLoadingInitial = (state : boolean) =>{
        this.loadingInitial = state;
    }

    createHealthData = async (healthData : HealthDataTable) =>{
        this.loading = true;
        try{
            await agent.HealthDatas.create(healthData);
            runInAction(()=>{
                this.loadHealthDatas();
                store.modalStore.closeModal();
                toast.success('Data added successfully')
            })
        }catch(error) {
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            }) 
        }
    }


    updateHealthData = async (healthData : HealthData)=>{
        this.loading=true;
        try{
            await agent.HealthDatas.update(healthData);
            runInAction(()=>{
                this.loadHealthDatas();
            })
            store.modalStore.closeModal();
        }catch(error) {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        } 
    }
   
         deleteHealthData = async (id: string) => {
        this.loading = true;
        try {
            if (window.confirm('Are you sure you want to delete this record?')) {
                await agent.HealthDatas.delete(id);
                runInAction(() => {
                    this.healthDataRegistry.delete(id);
                    this.loading = false;
                    store.modalStore.closeModal();
                    toast.info('Data deleted successfully')
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

