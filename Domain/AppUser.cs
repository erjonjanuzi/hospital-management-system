using System;
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
        // public ICollection<Appointment> Appointments 
    }

    public class PatientUser : AppUser
    {
        public override string Role { get; set; } = "patient";
        // public ICollection<Appointment> Appointments 
    }
}