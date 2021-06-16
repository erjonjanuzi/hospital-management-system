using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PatientsDetails
{
    public class List{
        public class Query : IRequest<Result<List<PatientsDetail>>>
        {
        }
        public class Handler : IRequestHandler<Query, Result<List<PatientsDetail>>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }
            public async Task<Result<List<PatientsDetail>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<PatientsDetail>>.Success(await context.PatientsDetails.ToListAsync(cancellationToken));
            }
        }
    }
}