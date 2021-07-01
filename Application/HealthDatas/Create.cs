using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.HealthDatas
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public HealthData HealthData { get ; set ; }

        }
        
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.HealthData).SetValidator(new HealthDatasValidator ());
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
            
                context.HealthDatas.Add(request.HealthData);

                var result = await context.SaveChangesAsync()>0;

                if (!result) return Result<Unit>.Failure("Failed to create Department!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}