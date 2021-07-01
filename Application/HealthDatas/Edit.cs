using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.HealthDatas
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public HealthData HealthData { get; set; }
        }
        
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.HealthData).SetValidator(new HealthDatasValidator());
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
                var healthData = await context.HealthDatas.FindAsync(request.HealthData.Id);

                if (healthData == null) return null;

                mapper.Map(request.HealthData,healthData);

                var result = await context.SaveChangesAsync() > 0;
               

                if(!result) return Result<Unit>.Failure("Failder to update !");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}