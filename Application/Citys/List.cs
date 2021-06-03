using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Citys
{
    public class List
    {
        public class Query : IRequest<Result<List<City>>> 
        {

        }


        public class Handler : IRequestHandler<Query, Result<List<City>>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<List<City>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<City>>.Success(await context.Cities.ToListAsync(cancellationToken));
            }
        }
    }
}