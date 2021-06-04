using System;
using System.Collections.Generic;

namespace Domain
{
    public class Analyse
    {
        public Guid Id { get; set; }
        public float Eritrocite { get; set; }
        public float Hemoglobina { get; set; }
        public float Leukocite { get; set; }
        public float Hemakrotiti { get; set; }
        public float Tromobocite { get; set; }
        public float Retikulocite { get; set; }
        public float Neutrofile { get; set; }
        public float Limfocite { get; set; }
        public float Monocite { get; set; }
        public float Urea { get; set; }
        public float Glukoza { get; set; }
        public float Kolesteroli { get; set; }
        public Guid PatientId { get; set; }
        public string PatientFirstName { get; set; }
        public string PatientLastName { get; set; }
        public Patient Patient {get; set;}
    }
}