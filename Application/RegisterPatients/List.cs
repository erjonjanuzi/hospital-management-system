using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.RegisterPatients
{
    public class List
    {
        public class Query : IRequest<Result<List<RegisterPatient>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<RegisterPatient>>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<List<RegisterPatient>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<RegisterPatient>>.Success(await context.RegisterPatients.ToListAsync(cancellationToken));
            }
        }
    }
}