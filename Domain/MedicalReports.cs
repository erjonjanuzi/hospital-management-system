using System;

namespace Domain
{
    public class MedicalReport
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public DateTime RegisteredSince { get; set; }
        public string Report { get; set; }

    }
}