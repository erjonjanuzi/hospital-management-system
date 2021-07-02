using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;
using System.Linq;

namespace Application.MedicalReports
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string patientsId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var reports =  context.MedicalReports.SingleOrDefault(reports => reports.patientsId == request.patientsId);

                context.Remove(reports);

                var result = await context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the report");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}