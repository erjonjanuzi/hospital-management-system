using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Domain;
using FluentValidation;
using Persistence;

namespace Application.Vaccinations
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Vaccination Vaccination { get; set; }
        }

        // public class CommandValidator : AbstractValidator<Command>
        // {
        //     public CommandValidator()
        //     {
        //         RuleFor(x => x.Vaccination).SetValidator(new VaccineValidator());
                
        //     }
        // }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                context.Vaccinations.Add(request.Vaccination);

                var result = await context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}