using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Patients
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Patient Patient { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Patient).SetValidator(new PatientValidator());
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
                context.Patients.Add(request.Patient);

                var result = await context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create patient");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}