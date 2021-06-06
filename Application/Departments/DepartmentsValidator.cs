using Domain;
using FluentValidation;

namespace Application.Departments
{
    public class DepartmentsValidator : AbstractValidator<Department>
    {
        public DepartmentsValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Capacity).NotEmpty();
        }
    
        
    }
}