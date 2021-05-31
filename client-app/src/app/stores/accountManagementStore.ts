import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { AccountDto, AccountFormValues } from "../models/user";
import { store } from "./store";

export default class AccountManagementStore {
    accountRegistry = new Map<string, AccountDto>();
    selectedAccount: AccountDto | undefined = undefined;    
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this);
    }

    get accounts() {
        return Array.from(this.accountRegistry.values());
    }

    loadAccounts = async() => {
        try {
            const accounts = await agent.AccountsManager.list();
            accounts.forEach(account => {
                this.setAccount(account);
            })
            this.loadingInitial = false;
        } catch (error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadAccount = async (id: string) => {
        let account = this.getAccount(id);
        if (account) {
            this.selectedAccount = account;
            return account;
        } else {
            this.loadingInitial = true;
            try {
                account = await agent.AccountsManager.details(id);
                this.setAccount(account);
                runInAction(() => {
                    this.selectedAccount = account;
                })
                this.setLoadingInitial(false);
                return account;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getAccount = (id: string) => {
        return this.accountRegistry.get(id);
    }

    private setAccount = (user: AccountDto) => {
        this.accountRegistry.set(user.id, user);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    deleteAccount = async (id: string) => {
        this.loading = true;
        try {
            await agent.AccountsManager.delete(id);
            runInAction(() => {
                this.accountRegistry.delete(id);
                this.loading = false;
            })
            toast.info('User deleted successfully');
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    register = async (creds: AccountFormValues) => {
        try {
            await agent.AccountsManager.register(creds);
            runInAction(() => {
                this.loadAccounts();
            })
            if (creds.role !== 'patient')
                toast.success('User added successfully');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    update = async (creds: AccountDto) => {
        try {
            await agent.AccountsManager.update(creds);
            runInAction(() => {
                this.loadAccounts();
            })
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }
}