import { useContext, createContext } from "react";
import AccountManagementStore from "./accountManagementStore";
import AnalyseStore from "./analysisStore";
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


interface Store {
    patientStore: PatientStore;
    analysisStore: AnalyseStore; // recently added
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
}

export const store: Store = {
    pharmacyStore: new pharmacyStore(),
    patientStore: new PatientStore(),
    analysisStore: new AnalyseStore(), // recently added
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    accountManagementStore: new AccountManagementStore(),
    cityStore : new cityStore(),
    departmentStore: new DepartmentStore(),
    bloodBankStore: new BloodBankStore(),
    diagnosisStore: new DiagnosisStore(),
    appointmentsStore: new AppointmentsStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}