import { useContext, createContext } from "react";
import AccountManagementStore from "./accountManagementStore";
import cityStore from "./cityStore";
import CommonStore from "./commonStore";
import DiagnosisStore from "./diagnosisStore";
import ModalStore from "./modalStore";
import PatientStore from "./patientStore";
import UserStore from "./userStore";
import DepartmentStore from "./departmentStore";
import pharmacyStore from "./pharmacyStore";
import BloodBankStore from "./bloodBankStore";
import AppointmentsStore from "./appointmentsStore";
import medicalReportStore from "./medicalReportStore";
import SpecialtyStore from "./specialtyStore";
import RoomStore from "./roomStore";
import AnalysisStore from "./analysisStore";
import HealthDataStore from "./healthDataStore"
import RegisterPatientStore from "./registerPatientStore";
import CountriesStore from "./countriesStore";
import NationalityStore from "./nationalitiesStore";
import PersonalInfoStore from "./personalInfoStore";
import VaccinationStore from "./vaccinationStore";
import ProfileStore from "./profileStore";


interface Store {
    registerPatientStore : RegisterPatientStore;
    patientStore: PatientStore;
    analysisStore: AnalysisStore; 
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    accountManagementStore: AccountManagementStore;
    cityStore : cityStore;
    pharmacyStore : pharmacyStore;
    departmentStore: DepartmentStore;
    diagnosisStore: DiagnosisStore;
    bloodBankStore: BloodBankStore;
    appointmentsStore: AppointmentsStore
    medicalReportStore : medicalReportStore;
    specialtyStore: SpecialtyStore
    roomStore: RoomStore;
    healthDataStore : HealthDataStore;
    countriesStore : CountriesStore;
    nationalitiesStore :NationalityStore;
    personalInfoStore : PersonalInfoStore;
    vaccinationStore : VaccinationStore;
    profileStore: ProfileStore,
}

export const store: Store = {
    registerPatientStore : new RegisterPatientStore(),
    medicalReportStore : new medicalReportStore(),
    pharmacyStore: new pharmacyStore(),
    patientStore: new PatientStore(),
    analysisStore: new AnalysisStore(), 
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    accountManagementStore: new AccountManagementStore(),
    cityStore : new cityStore(),
    departmentStore: new DepartmentStore(),
    bloodBankStore: new BloodBankStore(),
    diagnosisStore: new DiagnosisStore(),
    appointmentsStore: new AppointmentsStore(),
    specialtyStore: new SpecialtyStore(),
    roomStore: new RoomStore(),
    healthDataStore: new HealthDataStore(),
    countriesStore :new CountriesStore(),
    nationalitiesStore : new NationalityStore(),
    personalInfoStore : new PersonalInfoStore(),
    vaccinationStore : new VaccinationStore(),
    profileStore: new ProfileStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}