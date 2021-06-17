using System;

namespace Domain
{
    public class Pharmacy
    {
        public Guid Id { get; set; }

        public string ProductName { get; set; }

        public int ProductCode { get; set; }

        public float Price { get; set; }

        public DateTime ModificationDate { get; set; }

        public int Quantity { get; set; }
    }
}