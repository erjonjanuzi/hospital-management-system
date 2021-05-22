using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Patients
{
    public class Details
    {
        public class Query : IRequest<Patient>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Patient>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Patient> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Patients.FindAsync(request.Id);
            }
        }
    }
}