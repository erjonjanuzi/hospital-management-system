using Application.Core;
using MediatR;
using Domain;
using System;
using System.Threading.Tasks;
using System.Threading;
using Persistence;

namespace Application.RegisterPatients
{
    public class Details
    {
        public class Query : IRequest<Result<RegisterPatient>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<RegisterPatient>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<RegisterPatient>> Handle(Query request, CancellationToken cancellationToken)
            {
                var registerPatient = await context.RegisterPatients.FindAsync(request.Id);

                return Result<RegisterPatient>.Success(registerPatient);
            }
        }
    }
}