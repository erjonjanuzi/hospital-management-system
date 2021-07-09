using Domain;
using FluentValidation;

namespace Application.OtherVaccs
{
    public class OtherVaccsValidator : AbstractValidator<OtherVacc>

    {
        public OtherVaccsValidator()
        {
            RuleFor(x=>x.VaccineType).NotEmpty();
            RuleFor(x=>x.Age).NotEmpty();
            RuleFor(x=>x.Symptoms).NotEmpty();
        }
    }
}