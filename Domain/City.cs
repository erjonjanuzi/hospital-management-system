using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class City
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Zip { get; set; }

        [ForeignKey("Country")]
        public string CountryId { get; set; }
    }
}