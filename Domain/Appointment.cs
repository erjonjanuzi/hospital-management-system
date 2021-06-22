using System;

namespace Domain
{
    public class Appointment
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public PatientUser Patient { get; set; }
        public string PatientId { get; set; }
        public Doctor Doctor { get; set; }
        public string DoctorId { get; set; }
    }
}