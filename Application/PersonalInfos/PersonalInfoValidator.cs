using Domain;
using FluentValidation;

namespace Application.PersonalInfos
{
    public class PersonalInfoValidator : AbstractValidator<PersonalInfo>
    {
        public PersonalInfoValidator()
        {
            RuleFor(x => x.Address).NotEmpty();
        }
    }
}