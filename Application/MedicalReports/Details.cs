using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.MedicalReports
{
    public class Details
    {
        public class Query : IRequest<Result<MedicalReport>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<MedicalReport>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<MedicalReport>> Handle(Query request, CancellationToken cancellationToken)
            {
                var report = await context.MedicalReports.FindAsync(request.Id);

                return Result<MedicalReport>.Success(report);
            }

        }
    }
}