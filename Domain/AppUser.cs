using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public abstract class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime RegisteredSince { get; set; }
        public abstract string Role { get; set; }
    }

    public class Admin : AppUser
    {
        public override string Role { get; set; } = "admin";
    }

    public class Doctor : AppUser
    {
        public override string Role { get; set; } = "doctor";
        public Guid? SpecialtyId { get; set; }
        public Specialty Specialty { get; set; }
        public Guid PersonalInfoId { get; set; }
        public PersonalInfo PersonalInfo { get; set; }
        public string Image { get; set; }
        public Photo Photo { get; set; }
    }

    public class PatientUser : AppUser
    {
        public override string Role { get; set; } = "patient";
        public ICollection<Diagnosis> Diagnosis { get; set; }
       public ICollection<Appointment> Appointments { get; set; }
        public ICollection<Analyse> Analysis { get; set; }
        public Guid? PersonalInfoId { get; set; }
        public PersonalInfo PersonalInfo { get; set; }
        public ICollection<MedicalReport> MedicalReports { get; set; }

    }
}