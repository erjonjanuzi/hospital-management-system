import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { Appointment } from "../models/appointment";
import { AccountDto, AccountFormValues, User } from "../models/user";
import { store } from "./store";

export default class AppointmentsStore {
    appointmentRegistry = new Map<string, Appointment>();
    selectedAppointment: Appointment | undefined = undefined;

    constructor(){
        makeAutoObservable(this);
    }

    get appointments() {
        return Array.from(this.appointmentRegistry.values());
    }

    get numberOfPendingAppointments() {
        let count = 0;
        for (let i = 0; i < this.appointments.length; i++){
            if (this.appointments[i].status === 'Pending')
                count++;
        }
        return count;
    }

    loadAppointments = async() => {
        try {
            const appointments = await agent.Appointments.list();
            appointments.forEach(appointment => {
                this.setAppointment(appointment);
            })
        } catch (error){
            console.log(error);
        }
    }

    loadPatientAppointments = async(id: string) => {
        try {
            const appointments = await agent.Appointments.patientAppointments(id);
            appointments.forEach(appointment => {
                this.setAppointment(appointment);
            })
        } catch (error){
            console.log(error);
        }
    }

    private setAppointment = (appointment: Appointment) => {
        this.appointmentRegistry.set(appointment.id!, appointment);
    }

    create = async (appointment: Appointment) => {
        try {
            await agent.Appointments.create(appointment);
            runInAction(() => {
                this.loadPatientAppointments(appointment.patientId);
            })
            toast.success('Appointment created succesfully');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    loadAppointment = async (id: string) => {
        let appointment = this.getAppointment(id);
        if (appointment) {
            this.selectedAppointment = appointment;
            return appointment;
        } else {
            try {
                appointment = await agent.Appointments.details(id);
                this.setAppointment(appointment);
                runInAction(() => {
                    this.selectedAppointment = appointment;
                })
                return appointment;
            } catch (error) {
                console.log(error);
            }
        }
    }

    private getAppointment = (id: string) => {
        return this.appointmentRegistry.get(id);
    }

    deleteAppointment = async (id: any) => {
        try {
            await agent.Appointments.delete(id);
            runInAction(() => {
                this.appointmentRegistry.delete(id);
            })
            toast.info('Appointment deleted');
        } catch(error) {
            console.log(error);
        }
    }

    /*loadPatientAccounts = async() => {
        try {
            const accounts = await agent.AccountsManager.list();
            accounts.forEach(account => {
                this.setPatient(account);
            })
            this.loadingInitial = false;
        } catch (error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadAccount = async (id: string) => {
        let account = this.getAccount(id);
        if (account) {
            this.selectedAccount = account;
            return account;
        } else {
            this.loadingInitial = true;
            try {
                account = await agent.AccountsManager.details(id);
                this.setAccount(account);
                runInAction(() => {
                    this.selectedAccount = account;
                })
                this.setLoadingInitial(false);
                return account;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getAccount = (id: string) => {
        return this.accountRegistry.get(id);
    }

    private setAccount = (user: AccountDto) => {
        this.accountRegistry.set(user.id, user);
    }

    private setPatient = (user: AccountDto) => {
        if(user.role === 'patient'){
            this.accountRegistry.set(user.id, user);
        }else{
            console.log("Can't load Patients")
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    deleteAccount = async (id: string) => {
        this.loading = true;
        try {
            await agent.AccountsManager.delete(id);
            runInAction(() => {
                this.accountRegistry.delete(id);
                this.loading = false;
            })
            toast.info('User deleted successfully');
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    register = async (creds: AccountFormValues) => {
        try {
            await agent.AccountsManager.register(creds);
            runInAction(() => {
                this.loadAccounts();
            })
            if (creds.role !== 'patient')
                toast.success('User added successfully');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    update = async (creds: AccountDto) => {
        try {
            await agent.AccountsManager.update(creds);
            runInAction(() => {
                this.loadAccounts();
            })
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }*/
}