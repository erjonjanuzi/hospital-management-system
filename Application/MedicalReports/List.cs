using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.MedicalReports

{
    public class List
    {
        public class Query : IRequest<Result<List<MedicalReport>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<MedicalReport>>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }
            public async Task<Result<List<MedicalReport>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<MedicalReport>>.Success(await context.MedicalReports.ToListAsync(cancellationToken));
            }
        }
    }
}