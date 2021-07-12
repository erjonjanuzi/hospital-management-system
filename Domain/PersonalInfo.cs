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
        public String Address { get; set; }
        public string CountryId { get; set; }
        public Country Country { get; set; }
        public Guid CityId { get; set; }
        public City City { get; set; }
        public Guid NationalityId { get; set; }
        public Nationality Nationality { get; set; }
        public String MaritalStatus { get; set; }
    }
}