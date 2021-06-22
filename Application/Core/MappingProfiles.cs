using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Patient, Patient>();
            CreateMap<AppUser, AppUser>();
            CreateMap<City ,City>();
            CreateMap<Department, Department>();
            CreateMap<Pharmacy, Pharmacy>();
            CreateMap<BloodBank, BloodBank>();
            CreateMap<MedicalReport, MedicalReport>();
        }
    }
}