using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Diagnoses
{
    public class Details
    {
        public class Query : IRequest<Result<Diagnosis>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Diagnosis>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Diagnosis>> Handle(Query request, CancellationToken cancellationToken)
            {
                var diagnosis = await context.Diagnoses.FindAsync(request.Id);

                return Result<Diagnosis>.Success(diagnosis);
            }
        }
    }
}