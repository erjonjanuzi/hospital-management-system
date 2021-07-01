using System;

namespace Domain
{
    public class Vaccination
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public DateTime Date { get; set; }
        public string Received { get; set; }
        public string Vaccine { get; set; }
        public string Allergies { get; set; }
        public string Information { get; set; }
    }
}