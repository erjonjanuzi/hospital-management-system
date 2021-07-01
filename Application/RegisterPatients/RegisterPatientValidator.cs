using Domain;
using FluentValidation;

namespace Application.RegisterPatients
{
    public class RegisterPatientValidator : AbstractValidator<RegisterPatient>
    {
        public RegisterPatientValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
        }
    }
}