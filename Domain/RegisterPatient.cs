using System;

namespace Domain
{
    public class RegisterPatient
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public char Gender { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public string About { get; set; }

        public string Allergic { get; set; }
    }
}