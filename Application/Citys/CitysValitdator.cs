using FluentValidation;
using Domain;

namespace Application.Citys
{
    public class CitysValidator : AbstractValidator<City>
    {
        public CitysValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
        }
    }
}