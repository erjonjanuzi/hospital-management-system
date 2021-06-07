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

export interface AccountFormValues {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    passwordHash: string;
    role: string;
}

export interface AccountDto {
    id: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
    registeredSince: string;
    userName: string;
    email: string;
    role: string;
}
