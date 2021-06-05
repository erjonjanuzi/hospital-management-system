using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Diagnoses
{
    public class List{
        public class Query : IRequest<Result<List<Diagnosis>>>
        {
        }
        public class Handler : IRequestHandler<Query, Result<List<Diagnosis>>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }
            public async Task<Result<List<Diagnosis>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Diagnosis>>.Success(await context.Diagnoses.ToListAsync(cancellationToken));
            }
        }
    }
}