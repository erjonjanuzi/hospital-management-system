using FluentValidation;
using Domain;
namespace Application.MedicalReports
{
    public class MedicalReportValidator : AbstractValidator<MedicalReport>
    {
        public MedicalReportValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
        }
    }
}