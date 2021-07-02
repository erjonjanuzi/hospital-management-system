using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;
using System.Linq;

namespace Application.MedicalReports
{
    public class ByPatient
    {
        public class Query : IRequest<Result<MedicalReport>>
        {
            public string patientsId { get; set; }
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
                var report = context.MedicalReports.SingleOrDefault(MedicalReports => MedicalReports.patientsId == request.patientsId);
                return Result<MedicalReport>.Success(report);
            }
        }
    }
}