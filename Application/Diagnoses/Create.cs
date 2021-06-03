using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;


namespace Application.Diagnoses
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Diagnosis Diagnosis {get; set;}
        }


        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Diagnosis).SetValidator(new DiagnosisValidator());
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
                context.Diagnoses.Add(request.Diagnosis);

                var result = await context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create Diagnosis");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}