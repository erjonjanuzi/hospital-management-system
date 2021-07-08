import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { Appointment } from "../models/appointment";
import { store } from "./store";

export default class AppointmentsStore {
    appointmentRegistry = new Map<string, Appointment>();
    selectedAppointment: Appointment | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    get appointments() {
        return Array.from(this.appointmentRegistry.values());
    }

    get numberOfPendingAppointments() {
        let count = 0;
        for (let i = 0; i < this.appointments.length; i++) {
            if (this.appointments[i].status === 'Pending')
                count++;
        }
        return count;
    }

    loadAppointments = async () => {
        try {
            const appointments = await agent.Appointments.list();
            appointments.forEach(appointment => {
                this.setAppointment(appointment);
            })
        } catch (error) {
            console.log(error);
        }
    }

    loadPatientAppointments = async (id: string) => {
        try {
            const appointments = await agent.Appointments.patientAppointments(id);
            appointments.forEach(appointment => {
                this.setAppointment(appointment);
            })
        } catch (error) {
            console.log(error);
        }
    }

    loadDoctorAppointments = async (id: string) => {
        try {
            const appointments = await agent.Appointments.doctorAppointments(id);
            appointments.forEach(appointment => {
                this.setAppointment(appointment);
            })
        } catch (error) {
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
            toast.error(error);
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

    assignDoctor = async (id: any, docId: string) => {
        try {
            const appointment = this.getAppointment(id);

            appointment!.doctorId = docId;

            await agent.Appointments.assignDoctor(appointment!);

            runInAction(() => {
                this.loadAppointments();
            });
            store.modalStore.closeModal();
            toast.info("Doctor assigned");
        } catch (error) {
            console.log(error);
        }
    }

    cancelAppointment = async (id: any) => {
        try {
            const appointment = this.getAppointment(id);

            if (appointment === null) return null;

            await agent.Appointments.cancelAppointment(id);

            runInAction(() => {
                this.loadAppointments();
            });
            toast.info("Appointment canceled by your request");
        } catch (error) {
            toast.error('Unexpected error');
        }
    }

    denyAppointment = async (id: any) => {
        try {
            const appointment = this.getAppointment(id);

            if (appointment === null) return null;

            await agent.Appointments.denyAppointment(id);

            runInAction(() => {
                this.loadAppointments();
            });
            toast.info("Appointment denied");
        } catch (error) {
            console.log(error);
        }
    }

    markAsComplete = async (id: any) => {
        try {
            const appointment = this.getAppointment(id);

            if (appointment === null) return null;

            await agent.Appointments.markAsComplete(id);

            runInAction(() => {
                this.loadAppointments();
            });
            toast.info("Appointment completed");
        } catch (error) {
            console.log(error);
        }
    }

    deleteAppointment = async (id: any) => {
        try {
            await agent.Appointments.delete(id);
            runInAction(() => {
                this.appointmentRegistry.delete(id);
            })
            toast.info('Appointment deleted');
        } catch (error) {
            console.log(error);
        }
    }

    editAppointment = async (appointment: Appointment) => {
        try {
            await agent.Appointments.edit(appointment);

            runInAction(() => {
                this.loadAppointments();
                this.selectedAppointment!.date = new Date(appointment.date);
            })

            toast.info('Appointment updated');
        } catch (error) {
            console.log(error);
        }
    }
}