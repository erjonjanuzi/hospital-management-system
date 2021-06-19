using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.BloodBanks
{
    public class List
    {
        public class Query : IRequest<Result<List<BloodBank>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<BloodBank>>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }
            public async Task<Result<List<BloodBank>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<BloodBank>>.Success(await context.BloodBanks.ToListAsync(cancellationToken));
            }
        }
    }
}