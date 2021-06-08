using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Departments
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Department Department { get; set; }
        }
        
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.Department).SetValidator(new DepartmentsValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {

            private readonly DataContext context;

            private readonly IMapper mapper;

            public Handler(DataContext context,IMapper mapper)
            {
                this.mapper=mapper;
                this.context=context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var department = await context.Departments.FindAsync(request.Department.Id);

                if (department == null) return null;

                mapper.Map(request.Department,department);

                var result = await context.SaveChangesAsync() > 0;
               

                if(!result) return Result<Unit>.Failure("Failder to update Department!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}