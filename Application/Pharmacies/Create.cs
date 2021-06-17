using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Pharmacies
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Pharmacy Pharmacy { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Pharmacy).SetValidator(new PharmaciesValidator());
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
                context.Pharmacies.Add(request.Pharmacy);

                var result = await context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("Failed to create Product");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}