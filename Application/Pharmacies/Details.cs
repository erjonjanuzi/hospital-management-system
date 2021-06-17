using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Pharmacies
{
    public class Details
    {
        public class Query : IRequest<Result<Pharmacy>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Pharmacy>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;

            }

            public async Task<Result<Pharmacy>> Handle(Query request, CancellationToken cancellationToken)
            {
                var pharmacy = await context.Pharmacies.FindAsync(request.Id);

                return Result<Pharmacy>.Success(pharmacy);
            }
        }
    }
}