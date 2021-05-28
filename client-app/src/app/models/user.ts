export interface User {
    username: string;
    displayName: string;
    token: string;
    role: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
    role?: string;
}

export interface AccountDto {
    id: string;
    firstName: string;
    lastName: string;
    registeredSince: string;
    userName: string;
    email: string;
    role: string;
}

export interface UpdateUser{
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
}