using System;

namespace Domain
{
    public class Department
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Capacity { get; set; }
        public string Description { get; set; }
    }
}