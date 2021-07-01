using System.Collections.Generic;

namespace Domain
{
    public class Country
    {
        public string Id { get; set; } //Id is set manually to the country's abbreviation of the name
        public string Name { get; set; }
        public ICollection<City> Cities { get; set; }
    }
}