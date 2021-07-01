using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.HealthDatas
{
    public class Details
    {
        public class Query : IRequest<Result<HealthData>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<HealthData>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<HealthData>> Handle(Query request, CancellationToken cancellationToken)
            {
                var healthData = await context.HealthDatas.FindAsync(request.Id);

                return Result<HealthData>.Success(healthData);
            }
        }
    }
}