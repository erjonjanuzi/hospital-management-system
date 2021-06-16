using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;
using System.Linq;

namespace Application.Diagnoses
{
    public class ByPatient
    {
        public class Query : IRequest<Result<Diagnosis>>
        {
            public string patientsId { get; set; }
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
                var diagnosis = context.Diagnoses.SingleOrDefault(diagnosis => diagnosis.patientsId == request.patientsId);
                return Result<Diagnosis>.Success(diagnosis);
            }
        }
    }
}