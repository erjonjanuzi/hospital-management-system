using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Pharmacies
{
    public class List
    {
        public class Query : IRequest<Result<List<Pharmacy>>>{}

        public class Handler : IRequestHandler<Query, Result<List<Pharmacy>>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<List<Pharmacy>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Pharmacy>>.Success(await context.Pharmacies.ToListAsync(cancellationToken));
            }
        }
    }
}