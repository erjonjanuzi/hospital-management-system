import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Department, DepartmentTable} from "../models/department";
import { store } from "./store";
import { toast } from "react-toastify";




export default class departmentStore{
    departmentRegistry = new Map<string, Department>();
    selectedDepartment : Department | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this);
    }

    get departments(){
        return Array.from(this.departmentRegistry.values());
    }

    loadDepartments = async() =>{
        try{
            const departments = await agent.Departments.list();
            departments.forEach(department =>{
                this.setDepartment(department);
            })
            this.loadingInitial = false;
        }catch (error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    loadDepartment = async (id: string) =>{
        let department = this.getDepartment(id);
        if(department){
            this.selectedDepartment = department;
            return department;
        }else{
            this.loadingInitial = true;
        try{
            department = await agent.Departments.details(id);
            this.setDepartment(department);
            runInAction(()=>{
                this.selectedDepartment = department;
            })
            this.setLoadingInitial(false);
            return department;
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false);
            }
        }
    }

    private setDepartment =(department : Department) =>{
        this.departmentRegistry.set(department.name,department);
    }

    private getDepartment =(id : string) =>{
        return this.departmentRegistry.get(id);
    }

    setLoadingInitial = (state : boolean) =>{
        this.loadingInitial = state;
    }

    createDepartment = async (department : DepartmentTable) =>{
        this.loading = true;
        try{
            await agent.Departments.create(department);
            runInAction(()=>{
                this.loadDepartments();
                store.modalStore.closeModal();
                toast.success('Department added successfully')
            })
        }catch(error) {
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            }) 
        }
    }


    updateDepartment = async (department : Department)=>{
        this.loading=true;
        try{
            await agent.Departments.update(department);
            runInAction(()=>{
                this.loadDepartments();
            })
            store.modalStore.closeModal();
        }catch(error) {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        } 
    }
   
         deleteDepartment = async (id: string) => {
        this.loading = true;
        try {
            if (window.confirm('Are you sure you want to delete this record?')) {
                await agent.Departments.delete(id);
                runInAction(() => {
                    this.departmentRegistry.delete(id);
                    this.loading = false;
                    store.modalStore.closeModal();
                    toast.info('Department deleted successfully')
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

