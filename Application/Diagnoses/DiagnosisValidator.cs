using Domain;
using FluentValidation;

namespace Application.Diagnoses
{
    public class DiagnosisValidator : AbstractValidator<Diagnosis>
    {
        public DiagnosisValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Details).NotEmpty();
        }
    }
}