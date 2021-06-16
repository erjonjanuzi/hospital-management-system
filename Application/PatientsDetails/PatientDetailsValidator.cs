using Domain;
using FluentValidation;

namespace Application.PatientsDetails
{
    public class PatientDetailsValidator : AbstractValidator<PatientsDetail>
    {
        public PatientDetailsValidator()
        {
            RuleFor(x => x.Address).NotEmpty();
        }
    }
}