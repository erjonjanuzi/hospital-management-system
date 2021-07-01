using System;

namespace Domain
{
    public class PersonalInfo
    {
        public Guid Id { get; set; }
        public DateTime DateOfBirth { get; set; }
        public String Gender { get; set; }
        public String PhoneNumber { get; set; }
        //public String Height { get; set; } Height te medical info duhet me dal
        public String Address { get; set; }
        public String City { get; set; } //String => City obj.
        public String Country { get; set; } //String => Country obj.
        public Guid NationalityId { get; set; }
        public Nationality Nationality { get; set; } //under development
        public String MaritalStatus { get; set; }
        public String PatientsId { get; set; }

    }
}

// Gender +
// Phone+
// Country+
// City+
// Nationality+
// Address+
// Personal Number
// Gender+
// Marital Status
