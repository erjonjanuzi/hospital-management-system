using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;
using System.Linq;
namespace Application.Analyses
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
                var analysis = context.Analyses.SingleOrDefault(analysis => analysis.patientsId == request.patientsId);

                context.Remove(analysis);

                var result = await context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the analyse");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}