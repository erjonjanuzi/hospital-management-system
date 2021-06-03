import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { City } from "../models/city";



export default class cityStore{
    cityRegistry = new Map<string, City>();
    seletedCity : City | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this);
    }

    get citys(){
        return Array.from(this.cityRegistry.values());
    }

    loadCities = async() =>{
        try{
            const citys = await agent.Citys.list();
            citys.forEach(city =>{
                this.setCity(city);
            })
            this.loadingInitial = false;
        }catch (error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    loadCity = async (id: string) =>{
        let city = this.getCity(id);
        if(city){
            this.seletedCity = city;
            return city;
        }else{
            this.loadingInitial = true;
        try{
            city = await agent.Citys.details(id);
            this.setCity(city);
            runInAction(()=>{
                this.seletedCity = city;
            })
            this.setLoadingInitial(false);
            return city;
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false);
            }
        }
    }

    private setCity =(city : City) =>{
        this.cityRegistry.set(city.id,city);
    }

    private getCity =(id : string) =>{
        return this.cityRegistry.get(id);
    }

    setLoadingInitial = (state : boolean) =>{
        this.loadingInitial = state;
    }

    createCity = async (city : City) =>{
        this.loading = true;
        try{
            await agent.Citys.create(city);
            runInAction(()=>{
                this.cityRegistry.set(city.id,city);
                this.seletedCity=city;
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


    updateCity = async (city : City)=>{
        this.loading=true;
        try{
            await agent.Citys.update(city);
            runInAction(()=>{
                this.cityRegistry.set(city.id,city);
                this.seletedCity=city;
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

    deleteCity = async (id : string)=>{
        this.loading=true;
        try{
            await agent.Citys.delete(id);
            runInAction(()=>{
                this.cityRegistry.delete(id);
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
