import { useContext, createContext } from "react";
import CommonStore from "./commonStore";
import PatientStore from "./patientStore";

interface Store {
    patientStore: PatientStore;
    commonStore: CommonStore;
}

export const store: Store = {
    patientStore: new PatientStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}