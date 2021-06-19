using Domain;
using FluentValidation;

namespace Application.BloodBanks
{
    public class BloodBanksValidator : AbstractValidator<BloodBank>
    {
        public BloodBanksValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Blood).NotEmpty();
        }
    
        
    }
}