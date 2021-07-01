using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.Vaccinations
{
    public class List
    {
        public class Query : IRequest<Result<List<Vaccination>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<Vaccination>>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }
            public async Task<Result<List<Vaccination>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Vaccination>>.Success(await context.Vaccinations.ToListAsync(cancellationToken));
            }
        } 
    }
}