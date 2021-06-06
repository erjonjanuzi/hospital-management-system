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


interface Store {
    patientStore: PatientStore;
    analysisStore: AnalyseStore; // recently added
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    accountManagementStore: AccountManagementStore;
    cityStore : cityStore;
    departmentStore: DepartmentStore;
    diagnosisStore: DiagnosisStore
}

export const store: Store = {
    patientStore: new PatientStore(),
    analysisStore: new AnalyseStore(), // recently added
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    accountManagementStore: new AccountManagementStore(),
    cityStore : new cityStore(),
    departmentStore: new DepartmentStore(),
    diagnosisStore: new DiagnosisStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}