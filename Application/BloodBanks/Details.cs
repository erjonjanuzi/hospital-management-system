using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.BloodBanks
{
    public class Details
    {
        public class Query : IRequest<Result<BloodBank>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<BloodBank>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<BloodBank>> Handle(Query request, CancellationToken cancellationToken)
            {
                var bloodBank = await context.BloodBanks.FindAsync(request.Id);

                return Result<BloodBank>.Success(bloodBank);
            }
        }
    }
}