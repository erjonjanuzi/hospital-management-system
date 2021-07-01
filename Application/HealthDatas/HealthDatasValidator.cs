using Domain;
using FluentValidation;

namespace Application.HealthDatas
{
    public class HealthDatasValidator : AbstractValidator<HealthData>
    {
        public HealthDatasValidator()
        {
            RuleFor(x => x.Allergies).NotEmpty();
            RuleFor(x => x.Asthma).NotEmpty();
        }
    
        
    }
}