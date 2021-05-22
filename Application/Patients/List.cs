using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Patients
{
    public class List
    {
        public class Query : IRequest<Result<List<Patient>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<Patient>>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }
            public async Task<Result<List<Patient>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Patient>>.Success(await context.Patients.ToListAsync(cancellationToken));
            }
        }
    }
}