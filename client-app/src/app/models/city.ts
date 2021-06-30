export interface City {
    id?: string;
    name: string;
    zip: string;
    countryId: string;
}

export interface Country {
    id: string;
    name: string;
    cities?: City[];
}
