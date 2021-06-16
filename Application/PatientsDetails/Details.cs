using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.PatientsDetails
{
    public class Details
    {
        public class Query : IRequest<Result<PatientsDetail>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PatientsDetail>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<PatientsDetail>> Handle(Query request, CancellationToken cancellationToken)
            {
                var details = await context.PatientsDetails.FindAsync(request.Id);

                return Result<PatientsDetail>.Success(details);
            }
        }
    }
}