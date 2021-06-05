import axios, { AxiosError, AxiosResponse } from "axios";
import { history } from '../..';
import { toast } from "react-toastify";
import { Patient, PatientTable } from "../models/patient";
import { City } from "../models/city"
import { store } from "../stores/store";
import { User, UserFormValues, AccountDto, AccountFormValues } from "../models/user";
import { Diagnosis } from "../models/diagnosis";
<<<<<<< Updated upstream
import { request } from "http";
import { Analyse } from "../models/analyse";
=======
import { warnAboutProxyRequirement } from "mobx/dist/internal";
import { request } from "http";
>>>>>>> Stashed changes

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

 
const Citys = {
    list: () => requests.get<City[]>('/citys'),
    details: (id: string) => requests.get<City>(`/citys/${id}`),
    delete: (id: string) => axios.delete<void>(`/citys/${id}`),
    create: (city: City) => axios.post<void>('citys', city),
    update: (city: City) => axios.put<void>(`/citys/${city.id}`, city)
}
const Analysis = {
    list: () => requests.get<Analyse[]>('/analysis'),
    details: (id: string) => requests.get<Analyse>(`/analysis/${id}`),
    create: (user: Analyse) => axios.post<void>('analysis', user),
    update: (analyse: Analyse) => axios.put<void>(`/analysis/${analyse.id}`, analyse),
    delete: (id: string) => axios.delete<void>(`/analysis/${id}`)
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
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
    register: (user: AccountFormValues) => requests.post('/account/register', user),
}

const DiagnosisManager = {
    list: () => requests.get<Diagnosis[]>('/diagnosis'),
    delete: (id: string) => axios.delete<void>(`/diagnosis/delete/${id}`),
    details: (id: string) => requests.get<Diagnosis>(`/diagnosis/${id}`),
    update: (diagnosis: Diagnosis) => axios.put<void>(`/diagnosis/${diagnosis.patientsId}`, diagnosis),
    create: (diagnosis: Diagnosis) => axios.post<void>('/diagnosis', diagnosis),
    byPatient: (patientsId: string) => requests.get<Diagnosis>(`diagnosis/patient/${patientsId}`)
}

const agent = {
    DiagnosisManager,
    Citys,
    Patients,
    UserPatients,
    Account,
    AccountsManager,
    Analysis
}

export default agent;