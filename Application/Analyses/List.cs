using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Analyses
{
    public class List
    {
        public class Query : IRequest<Result<List<Analyse>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<Analyse>>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }
            public async Task<Result<List<Analyse>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Analyse>>.Success(await context.Analyses.ToListAsync(cancellationToken));
            }
        }
    }
}