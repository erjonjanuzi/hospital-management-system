using Domain;
using FluentValidation;

namespace Application.Pharmacies
{
    public class PharmaciesValidator : AbstractValidator<Pharmacy>
    {
        public PharmaciesValidator()
        {
            RuleFor(x => x.ProductName).NotEmpty();
            RuleFor(x => x.ProductCode).NotEmpty();
            RuleFor(x => x.Price).NotEmpty();
            RuleFor(x => x.Quantity).NotEmpty();

        }
    }
}