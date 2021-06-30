import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { City, Country } from "../models/city";

export default class CountriesStore {
    countriesRegistry = new Map<string, Country>();
    selectedCountry: Country | undefined = undefined;
    cityRegistry = new Map<string, City>();
    selectedCity: City | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    get countries() {
        return Array.from(this.countriesRegistry.values());
    }

    loadCountries = async () => {
        try {
            const countries = await agent.Countries.list();
            countries.forEach(country => {
                this.setCountry(country);
            })
        } catch (error) {
            console.log(error);
        }
    }

    private setCountry = (country: Country) => {
        this.countriesRegistry.set(country.id!, country);
    }

    loadCountry = async (id: string) => {
        let country = this.getCountry(id);
        if (country) {
            this.selectedCountry = country;
            return country;
        } else {
            try {
                country = await agent.Countries.details(id);
                this.setCountry(country);
                runInAction(() => {
                    this.selectedCountry = country;
                })
                return country;
            } catch (error) {
                console.log(error);
            }
        }
    }

    private getCountry = (id: string) => {
        return this.countriesRegistry.get(id);
    }

    createCountry = async (country: Country) => {
        try {
            if (country == null) return null;

            await agent.Countries.create(country);

            runInAction(() => {
                this.setCountry(country);
                this.loadCountries();
            })
            toast.success('Country created successfully');
        } catch (error) {
            console.log(error);
        }
    }

    deleteCountry = async (id: string) => {
        try {
            await agent.Countries.delete(id);
            runInAction(() => {
                this.countriesRegistry.delete(id);
            })
            toast.success('Country deleted successfully');
        } catch (error) {
            console.log(error);
        }
    }

    updateCountry = async (country: Country) => {
        try {
            await agent.Countries.update(country);
            runInAction(() => {
                this.loadCountries();
            })
            toast.success("Country updated successfully");
        } catch (error) {
            console.log(error);
            toast.error("Error updating country");
        }
    }

    get citys() {
        return Array.from(this.cityRegistry.values());
    }

    loadCities = async () => {
        try {
            const citys = await agent.Citys.list();
            citys.forEach(city => {
                this.setCity(city);
            })
        } catch (error) {
            console.log(error);
        }
    }

    loadCity = async (id: string) => {
        let city = this.getCity(id);
        if (city) {
            this.selectedCity = city;
            return city;
        } else {
            try {
                city = await agent.Citys.details(id);
                this.setCity(city);
                runInAction(() => {
                    this.selectedCity = city;
                })
                return city;
            } catch (error) {
                console.log(error);
            }
        }
    }

    private setCity = (city: City) => {
        this.cityRegistry.set(city.name, city);
    }

    private getCity = (id: string) => {
        return this.cityRegistry.get(id);
    }

    createCity = async (city: City) => {
        try {
            if (city == null) return null;

            await agent.Citys.create(city);

            runInAction(() => {
                this.loadCountries();
            })

            toast.success('City added successfully');
        } catch (error) {
            console.log(error);
        }
    }

    deleteCity = async (id: string) => {
        try {
            await agent.Citys.delete(id);
            runInAction(() => {
                this.loadCountries();
            })
            toast.success('City deleted successfully');
        } catch (error) {
            console.log(error);
        }
    }

    updateCity = async (city: City) => {
        try {
            await agent.Citys.update(city);
            runInAction(() => {
                this.loadCountries();
                this.loadCountry(city.countryId);
            })
            toast.success("City updated successfully");
        } catch (error) {
            console.log(error);
            toast.error("Error updating city");
        }
    }
}