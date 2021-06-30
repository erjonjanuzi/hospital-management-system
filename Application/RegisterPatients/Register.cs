using Application.Core;
using MediatR;
using Domain;
using FluentValidation;
using System.Threading.Tasks;
using System.Threading;
using Persistence;


namespace Application.RegisterPatients
{
    public class Register
    {
        public class Command : IRequest<Result<Unit>>
        {
            public RegisterPatient RegisterPatient { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.RegisterPatient).SetValidator(new RegisterPatientValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                context.RegisterPatients.Add(request.RegisterPatient);

                var result = await context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to register patient");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}