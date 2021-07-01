import axios, { AxiosError, AxiosResponse } from "axios";
import { history } from '../..';
import { toast } from "react-toastify";
import { Patient, PatientTable } from "../models/patient";
import { City, Country } from "../models/city"
import { store } from "../stores/store";
import { User, UserFormValues, AccountDto, AccountFormValues } from "../models/user";
import { Diagnosis, DiagnosisDto } from "../models/diagnosis";
import { Department,DepartmentTable } from "../models/department";
import { Analyse, AnalyseDto } from "../models/analyse";
import { Pharmacy, PharmacyDto } from "../models/pharmacy";
import { BloodBank,BloodBankTable } from "../models/bloodBank";
import { Appointment } from "../models/appointment";
import { MedicalReport,MedicalReportDto } from "../models/medicalReport";
import { Specialty } from "../models/specialty";
import { DoctorProfile } from "../models/profile";
import { Room,RoomDto } from "../models/room";
import { RegisterPatient, RegisterPatientDto } from "../models/registerPatients";
import { PersonalInfo, PersonalInfoDTO } from "../models/personalInfo";
import { Nationality } from "../models/nationality";


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Patients = {
    list: () => requests.get<Patient[]>('/patients'),
    details: (id: string) => requests.get<Patient>(`/patients/${id}`),
    create: (user: PatientTable) => axios.post<void>('patients', user),
    update: (patient: Patient) => axios.put<void>(`/patients/${patient.id}`, patient),
    delete: (id: string) => axios.delete<void>(`/patients/${id}`)
}

const RegisterPatients = {
    list: () => requests.get<RegisterPatient[]>('/registerPatients'),
    details: (id: string) => requests.get<RegisterPatient>(`/registerPatients/${id}`),
    create: (user: RegisterPatientDto) => axios.post<void>('registerPatients', user),
    update: (registerPatient: RegisterPatient) => axios.put<void>(`/registerPatients/${registerPatient.id}`, registerPatient),
    delete: (id: string) => axios.delete<void>(`/registerPatients/${id}`)
}

const Pharmacies ={
    list : () => requests.get<Pharmacy[]>('/pharmacies'),
    details : (id: string) => requests.get<Pharmacy>(`/pharmacies/${id}`),
    delete :(id: string) => axios.delete<void>(`/pharmacies/${id}`),
    create : (pharmacy : PharmacyDto) => requests.post<void>('/pharmacies/',pharmacy),
    update : (pharmacy : Pharmacy) => axios.put<void>(`/pharmacies/${pharmacy.id}`,pharmacy)
}

const MedicalReports ={
    list : () => requests.get<MedicalReport[]>('/medicalreports'),
    details : (id : string) => requests.get<MedicalReport>(`/medicalreports/${id}`),
    delete :(id: string) => axios.delete<void>(`/medicalreports/${id}`),
    create : (medicalReport : MedicalReportDto) => requests.post<void>('/medicalreports/',medicalReport),
    update : (medicalReport : MedicalReport) => axios.put<void>(`/medicalreports/${medicalReport.id}`,medicalReport)
}

const Citys = {
    list: () => requests.get<City[]>('/citys'),
    details: (id: string) => requests.get<City>(`/citys/${id}`),
    delete: (id: string) => axios.delete<void>(`/citys/${id}`),
    create: (city: City) => requests.post<void>('/citys/', city),
    update: (city: City) => axios.put<void>(`/citys/${city.id}`, city)
}

const Countries = {
    list: () => requests.get<Country[]>('/Country'),
    create: (country: Country) => requests.post<void>('/Country', country),
    details: (id: any) => requests.get<Country>(`/Country/${id}`),
    delete: (id: any) => axios.delete<void>(`/Country/${id}`),
    update: (country: Country) => axios.put<void>(`/Country/${country.id}`, country)
}

const Nationalities = {
    list: () => requests.get<Nationality[]>('/Nationality'),
    create: (nationality: Nationality) => requests.post<void>('/Nationality', nationality),
    details: (id: any) => requests.get<Nationality>(`/Nationality/${id}`),
    delete: (id: any) => axios.delete<void>(`/Nationality/${id}`),
    update: (nationality: Nationality) => axios.put<void>(`/Nationality/${nationality.id}`, nationality)
}

const Analysis = {
    list: () => requests.get<Analyse[]>('/analysis'),
    details: (id: string) => requests.get<Analyse>(`/analysis/${id}`),
    create: (analysis: AnalyseDto) => axios.post<void>('analysis', analysis),
    update: (analyse: Analyse) => axios.put<void>(`/analysis/${analyse.id}`, analyse),
    delete: (id: string) => axios.delete<void>(`/analysis/${id}`),
    ByPatient: (patientsId: string) => requests.get<Analyse>(`/patientAnalyse/${patientsId}`)
}

const Departments = {
    list: () => requests.get<Department[]>('/departments'),
    details: (id: string) => requests.get<Department>(`/departments/${id}`),
    delete: (id: string) => axios.delete<void>(`/departments/${id}`),
    create: (department: DepartmentTable) => axios.post<void>('departments', department),
    update: (department: Department) => axios.put<void>(`/departments/${department.id}`, department),

}

const BloodBanks = {
    list: () => requests.get<BloodBank[]>('/bloodBank'),
    details: (id: string) => requests.get<BloodBank>(`/bloodBank/${id}`),
    delete: (id: string) => axios.delete<void>(`/bloodBank/${id}`),
    create: (bloodBank: BloodBankTable) => axios.post<void>('bloodBank', bloodBank),
    update: (bloodBank: BloodBank) => axios.put<void>(`/bloodBank/${bloodBank.id}`, bloodBank),

}
const Rooms = {
    list: () => requests.get<Room[]>('/rooms'),
    details: (id: string) => requests.get<Room>(`/rooms/${id}`),
    delete: (id: string) => axios.delete<void>(`/rooms/${id}`),
    create: (room: RoomDto) => axios.post<void>('rooms', room),
    update: (room: Room) => axios.put<void>(`/rooms/${room.id}`, room),

}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: AccountFormValues) => requests.post<User>('/account/register', user)
}

const UserPatients = {
    list: () => requests.get<Patient[]>('/account/all'),
    details: (id: string) => requests.get<Patient>(`/account/user/${id}`),
    delete: (id: string) => axios.delete<void>(`/account/${id}`),
    update: (user: Patient) => axios.put<void>(`/account/${user.id}`, user),
    register: (user: AccountFormValues) => requests.post('/account/register', user),
}

const AccountsManager = {
    list: () => requests.get<AccountDto[]>('/account/all'),
    details: (id: string) => requests.get<AccountDto>(`/account/user/${id}`),
    delete: (id: string) => axios.delete<void>(`/account/${id}`),
    update: (user: AccountDto) => axios.put<void>(`/account/${user.id}`, user),
    register: (user: AccountFormValues) => requests.post('/account/register', user)
}

const DiagnosisManager = {
    list: () => requests.get<Diagnosis[]>('/diagnosis'),
    delete: (id: string) => axios.delete<void>(`/diagnosis/${id}`),
    details: (id: string) => requests.get<Diagnosis>(`/diagnosis/${id}`),
    update: (diagnosis: Diagnosis) => axios.put<void>(`/diagnosis/${diagnosis.id}`, diagnosis),
    create: (diagnosis: DiagnosisDto) => axios.post<void>('/diagnosis', diagnosis),
    byPatient: (patientsId: string) => requests.get<Diagnosis>(`/patient/${patientsId}`)
}

const Appointments = {
    list: () => requests.get<Appointment[]>('/Appointment'),
    patientAppointments: (id: string) => requests.get<Appointment[]>(`/Appointment/${id}`),
    create: (appointment: Appointment) => requests.post<void>('/Appointment', appointment),
    details: (id: any) => requests.get<Appointment>(`/Appointment/get/${id}`),
    delete: (id: any) => axios.delete<void>(`/appointment/${id}`),
    assignDoctor: (appointment: Appointment) => axios.put<void>(`/Appointment/assign/${appointment.id}`, appointment),
    cancelAppointment: (id: any) => axios.put<void>(`/Appointment/cancel/${id}`),
    denyAppointment: (id: any) => axios.put<void>(`/appointment/deny/${id}`),
    edit: (appointment: Appointment) => axios.put<void>(`/Appointment/edit/${appointment.id}`, appointment)
}

const Specialties = {
    list: () => requests.get<Specialty[]>('/specialty'),
    getDoctorsBySpecialty: (id: any) => requests.get<DoctorProfile[]>(`/Profile/doctorsbyspecialty/${id}`),
}

const PersonalInfos = {
    list: () => requests.get<PersonalInfo[]>('/personalInfo'),
    delete: (id: string) => axios.delete<void>(`/personalInfo/${id}`),
    details: (id: string) => requests.get<PersonalInfo>(`/personalInfo/${id}`),
    update: (personalInfo: PersonalInfo) => axios.put<void>(`/personalInfo/${personalInfo.id}`, personalInfo),
    create: (personalInfo: PersonalInfoDTO) => axios.post<void>('/personalInfo', personalInfo),
}

const agent = {
    MedicalReports,
    RegisterPatients, 
    Pharmacies,
    Analysis,
    DiagnosisManager,
    Citys,
    Patients,
    UserPatients,
    Account,
    AccountsManager,
    BloodBanks,
    Departments,
    Appointments,
    Rooms,
    Specialties,
    Countries,
    PersonalInfos,
    Nationalities
}

export default agent;