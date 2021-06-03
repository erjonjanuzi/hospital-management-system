using Domain;
using FluentValidation;

namespace Application.Patients
{
    public class PatientValidator : AbstractValidator<Patient>
    {
        public PatientValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
        }
    }
}


