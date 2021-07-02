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
        this.reportRegistry.set(report.patientsId,report);
    }

    private getReport = (id : string)=>{
        return this.reportRegistry.get(id);
    }
    setLoadingInitial = (state : boolean)=>{
        this.loadingInitial= state;
    }

    hasReport= async(id: string) => {
        const reports = await agent.MedicalReports.list();
        reports.forEach(reports =>{
            if(reports.patientsId === id){
                console.log("This patient already has an report")
                // this.setAnalyse(analyse);
            }
            else{
                console.log("This patient does not have an report");
            }
        })
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

    loadReportsByPatient = async (patientId: string) => {
        let reports = this.getReport(patientId);
        if (reports) {
            this.selectedReport = reports;
            return reports;
        }
        else {
            this.loadingInitial = true;
            try {
                reports = await agent.MedicalReports.ByPatient(patientId);
                this.setReport(reports);
                runInAction(() => {
                    this.selectedReport = reports;
                })
                this.setLoadingInitial(false);
                return reports;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    createReport = async (report : MedicalReportDto)=>{
        this.loading = true;
        const reports = await agent.MedicalReports.list();

        for (let i = 0; i < reports.length; i++) {
            if (reports[i].patientsId === report.patientsId) {
                toast.error("Patient already has a Report", {
                    autoClose: 3000
                })
                return;
            }
          }
        try {
            await agent.MedicalReports.create(report);
            runInAction(() => {
                this.editMode = false;
                this.loading = false;
                store.modalStore.closeModal();
                toast.success("Report Added Successfully", {
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