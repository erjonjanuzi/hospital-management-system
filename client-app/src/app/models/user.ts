export interface User {
    id: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
    registeredSince: string;
    userName: string;
    email: string;
    role: string;
    token: string;
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

export interface RegisterDoctor {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    passwordHash: string;
    specialtyId: string;
    personalInfo: {
        personalNumber: string;
        dateOfBirth: Date;
        gender: string;
        phoneNumber: string;
        address: string;
        countryId: string;
        cityId: string;
        nationalityId: string;
        maritalStatus: string;
    }
}