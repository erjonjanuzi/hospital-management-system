using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Analyses
{
    public class Details
    {
        public class Query : IRequest<Result<Analyse>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Analyse>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Analyse>> Handle(Query request, CancellationToken cancellationToken)
            {
                var analyse = await context.Analyses.FindAsync(request.Id);

                return Result<Analyse>.Success(analyse);
            }
        }
    }
}