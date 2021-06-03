using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Citys
{
    public class Details
    {
        public class Query : IRequest<Result<City>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<City>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<City>> Handle(Query request, CancellationToken cancellationToken)
            {
                var city = await context.Cities.FindAsync(request.Id);

                return Result<City>.Success(city);
            }
        }
    }
}