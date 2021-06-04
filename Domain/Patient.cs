using System;

namespace Domain
{
    public class Patient
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public int Age { get; set; }
        public DateTime RegisteredSince { get; set; }

        public string Email { get; set; }
        public string Status { get; set; }

        public Analyse Analyse { get; set; }

    }
}