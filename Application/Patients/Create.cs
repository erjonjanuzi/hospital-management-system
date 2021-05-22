using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Patients
{
    public class Create
    {
        public class Command : IRequest
        {
            public Patient Patient { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                context.Patients.Add(request.Patient);

                await context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}