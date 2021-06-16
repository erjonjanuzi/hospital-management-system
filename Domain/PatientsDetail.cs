using System;

namespace Domain
{
    public class PatientsDetail
    {
        public Guid Id { get; set; }
        public DateTime DateOfBirth { get; set; }
        public String Gender { get; set; }
        public String PhoneNumber { get; set; }
        public String Height { get; set; }
        public String BloodType { get; set; }
        public String Address { get; set; }
        public City City { get; set; }
        public String State { get; set; }

    }
}