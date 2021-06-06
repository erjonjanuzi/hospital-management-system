using System;

namespace Domain
{
    public class Diagnosis
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public string Stage { get; set; }
        public string Details { get; set; }
        public DateTime date { get; set; }
        public string patientsId { get; set; }
    }
}


