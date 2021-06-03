using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Citys
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public City City { get ; set ; }

        }
        
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.City).SetValidator(new CitysValidator ());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {

            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context=context;
            }

            public async Task<Result<Unit>> Handle(Command request,CancellationToken cancellationToken){
            
                context.Cities.Add(request.City);

                var result = await context.SaveChangesAsync()>0;

                if (!result) return Result<Unit>.Failure("Failed to create City!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}