using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.OtherVaccs
{
    public class List
    {
        public class Query : IRequest<Result<List<OtherVacc>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<OtherVacc>>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }
            public async Task<Result<List<OtherVacc>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<OtherVacc>>.Success(await context.OtherVaccs.ToListAsync(cancellationToken));
            }
        } 
    }
}