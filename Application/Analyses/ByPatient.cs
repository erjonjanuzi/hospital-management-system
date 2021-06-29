using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;
using System.Linq;


namespace Application.Analyses
{
    public class ByPatient
    {
        public class Query : IRequest<Result<Analyse>>
        {
            public string patientsId { get; set; }
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
                var anaysis =  context.Analyses.SingleOrDefault(anaysis => anaysis.patientsId == request.patientsId);
                return Result<Analyse>.Success(anaysis);
            }

        }
    }
}