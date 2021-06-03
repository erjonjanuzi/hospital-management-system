import { useContext, createContext } from "react";
import AccountManagementStore from "./accountManagementStore";
import cityStore from "./cityStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import PatientStore from "./patientStore";
import UserStore from "./userStore";


interface Store {
    patientStore: PatientStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    accountManagementStore: AccountManagementStore;
    cityStore : cityStore;
}

export const store: Store = {
    patientStore: new PatientStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    accountManagementStore: new AccountManagementStore(),
    cityStore : new cityStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}