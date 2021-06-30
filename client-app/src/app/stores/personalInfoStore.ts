import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";
import { makeAutoObservable, runInAction } from "mobx";import { toast } from "react-toastify";
import agent from "../api/agent";
import { PersonalInfo, PersonalInfoDTO } from "../models/personalInfo";

export default class PersonalInfoStore {
    personalInfoRegistry = new Map<string, PersonalInfo>();
    selectedPersonalInfo: PersonalInfo | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    get personalInfos() {
        return Array.from(this.personalInfoRegistry.values());
    }

    loadPersonalInfos = async () => {
        try{
            const personalInfo = await agent.PersonalInfos.list();
            personalInfo.forEach(personalInfo => {
                this.setPersonalInfo(personalInfo);
            })
        } catch (error) {
            console.log(error);
        }
    }

    loadPersonalInfo = async (id: string) => {
        let personalInfo = this.getPersonalInfo(id);
        if (personalInfo) {
            this.selectedPersonalInfo = personalInfo;
            return personalInfo;
        } else {
            try {
                personalInfo = await agent.PersonalInfos.details(id);
                this.setPersonalInfo(personalInfo);
                runInAction(() => {
                    this.selectedPersonalInfo = personalInfo;
                })
            } catch (error){
                console.log(error);
            }
        }
    }

    editPersonalInfo = async (peronalInfo: PersonalInfo) => {
        try{
            await agent.PersonalInfos.update(peronalInfo);
            toast.info(' Personal Information Updated');
            
        } catch ( error ){
            toast.error(' Personal Info Update Failed! ');
            console.log(error);
        }
    }

    //private functions
    private setPersonalInfo = (personalInfo: PersonalInfo) => {
        this.personalInfoRegistry.set(personalInfo.id!, personalInfo);
    }

    private getPersonalInfo = (id: string) => {
        return this.personalInfoRegistry.get(id);
    }
}