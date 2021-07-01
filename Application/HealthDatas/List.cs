using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.HealthDatas
{
    public class List
    {
        public class Query : IRequest<Result<List<HealthData>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<HealthData>>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }
            public async Task<Result<List<HealthData>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<HealthData>>.Success(await context.HealthDatas.ToListAsync(cancellationToken));
            }
        }
    }
}