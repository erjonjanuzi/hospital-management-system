using Domain;
using FluentValidation;

namespace Application.Vaccinations
{
    public class VaccineValidator : AbstractValidator<Vaccination>

    {
        public VaccineValidator()
        {
            RuleFor(x=>x.Received).NotEmpty();
            RuleFor(x=>x.Vaccine).NotEmpty();
            RuleFor(x=>x.Allergies).NotEmpty();
        }
    }
}