import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { MedicalReport, MedicalReportDto } from "../models/medicalReport";
import { store } from "./store";

export default class medicalReportStore{
    reportRegistry = new Map<string, MedicalReport>();
    selectedReport : MedicalReport | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this);
    }

    get reports(){
        return Array.from(this.reportRegistry.values());
    }

    private setReport = (report : MedicalReport)=>{
        this.reportRegistry.set(report.firstName,report);
    }

    private getReport = (id : string)=>{
        return this.reportRegistry.get(id);
    }
    setLoadingInitial = (state : boolean)=>{
        this.loadingInitial= state;
    }

    loadReports = async() =>{
        try{
            const reports = await agent.MedicalReports.list();
            reports.forEach(report =>{
                this.setReport(report);
            })
            this.loadingInitial = false;
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    loadReport = async(id : string)=>{
        let report = this.getReport(id);
        if(report){
            this.selectedReport = report;
            return report
        }else{
            this.loadingInitial = true;
            try{
                report = await agent.MedicalReports.details(id);
                this.setReport(report);
                runInAction(()=>{
                    this.selectedReport = report;
                })
                this.setLoadingInitial(false);
                return report;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    createReport = async (report : MedicalReportDto)=>{
        this.loading = true;
        try{
            await agent.MedicalReports.create(report);
            runInAction(()=>{
                this.loadReports();
            })
            toast.success('Report added successfully');
            store.modalStore.closeModal();
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }

    updateReport = async (report : MedicalReport)=>{
        this.loading = true;
        try{
            await agent.MedicalReports.update(report);
            runInAction(()=>{
                this.loadReports();
            })
            toast.success('Report updated successfully');
            store.modalStore.closeModal();
        }catch(error){
            throw error;
        }
    }

    deleteReport = async(id : string)=>{
        this.loading=true;
        try{
            if(window.confirm('Are you sure you want to delete this report?')){
                await agent.MedicalReports.delete(id);
                runInAction(()=>{
                    this.reportRegistry.delete(id);
                    this.loading=false;
                    store.modalStore.closeModal();
                    window.location.reload();
                })
            }
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }
}  