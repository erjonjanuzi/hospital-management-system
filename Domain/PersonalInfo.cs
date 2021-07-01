using System;

namespace Domain
{
    public class PersonalInfo
    {
        public Guid Id { get; set; }
        public String PersonalNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public String Gender { get; set; }
        public String PhoneNumber { get; set; }
        //public String Height { get; set; } Height te medical info duhet me dal
        public String Address { get; set; }
        public string CountryId { get; set; }
        public Country Country { get; set; } //String => Country obj.
        public Guid CityId { get; set; }
        public City City { get; set; }
        public Guid NationalityId { get; set; }
        public Nationality Nationality { get; set; }
        public String MaritalStatus { get; set; }
        //public String PatientsId { get; set; }//po ja heku qetow
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
