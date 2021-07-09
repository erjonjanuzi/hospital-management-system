using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.OtherVaccs
{
    public class Details
    {
        public class Query : IRequest<Result<OtherVacc>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<OtherVacc>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<OtherVacc>> Handle(Query request, CancellationToken cancellationToken)
            {
                var vaccine = await context.OtherVaccs.FindAsync(request.Id);

                return Result<OtherVacc>.Success(vaccine);
            }
        }
    }
}