import { useContext, createContext } from "react";
import PatientStore from "./patientStore";

interface Store {
    patientStore: PatientStore
}

export const store: Store = {
    patientStore: new PatientStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}