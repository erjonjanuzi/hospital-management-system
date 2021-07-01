using System;

namespace Domain
{
    public class HealthData
    {
        public Guid Id { get; set; }
        public string  Medication { get; set; }
        public string Checkup { get; set; }
        public string Drugs { get; set; }
        public string Allergies { get; set; }
        public string Injections { get; set; }
        public string Asthma { get; set; }
        public string Disease { get; set; }
        public string Immune { get; set; }
        public string Smoke { get; set; }
        public string Relatives { get; set; }
    }
}