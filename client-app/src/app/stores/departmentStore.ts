import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Department } from "../models/department";



export default class DepartmentStore{
    departmentRegistry = new Map<string, Department>();
    seletedDepartment : Department | undefined = undefined;
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
            departments.forEach(departments =>{
                this.setDepartment(departments);
            })
            this.loadingInitial = false;
        }catch (error){
          //  console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    loadDepartment = async (id: string) =>{
        let department = this.getDepartment(id);
        if(department){
            this.seletedDepartment = department;
            return department;
        }else{
            this.loadingInitial = true;
        try{
            department = await agent.Departments.details(id);
            this.setDepartment(department);
            runInAction(()=>{
                this.seletedDepartment = department;
            })
            this.setLoadingInitial(false);
            return department;
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false);
            }
        }
    }

    private setDepartment =(Department : Department) =>{
        //this.departmentRegistry.set(this.departments.id, this.departments);
    }

    private getDepartment =(id : string) =>{
        return this.departmentRegistry.get(id);
    }

    setLoadingInitial = (state : boolean) =>{
        this.loadingInitial = state;
    }

    createDepartment = async (department : Department) =>{
        this.loading = true;
        try{
            await agent.Departments.create(department);
            runInAction(()=>{
                this.departmentRegistry.set(department.id,department);
                this.seletedDepartment=department;
                this.editMode=false;
                this.loading=false;
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
                this.departmentRegistry.set(department.id,department);
                this.seletedDepartment=department;
                this.editMode=false;
                this.loading=false;
            })
        }catch(error) {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        } 
    }

    deleteDepartment = async (id : string)=>{
        this.loading=true;
        try{
            await agent.Departments.delete(id);
            runInAction(()=>{
                this.departmentRegistry.delete(id);
                this.loading=false;
            })
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }
}
