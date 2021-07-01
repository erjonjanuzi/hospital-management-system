using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Vaccinations
{
    public class Details
    {
        public class Query : IRequest<Result<Vaccination>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Vaccination>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Vaccination>> Handle(Query request, CancellationToken cancellationToken)
            {
                var vaccine = await context.Vaccinations.FindAsync(request.Id);

                return Result<Vaccination>.Success(vaccine);
            }
        }
    }
}