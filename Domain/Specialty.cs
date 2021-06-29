using System;
using System.Collections.Generic;

namespace Domain
{
    public class Specialty
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<Doctor> Doctors { get; set; }
    }
}