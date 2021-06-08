using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Departments
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {

            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context=context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var department = await context.Departments.FindAsync(request.Id);
                
                context.Remove(department);

                var result = await context.SaveChangesAsync()>0;

                if(!result)return Result<Unit>.Failure("Failed to delete the city!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}