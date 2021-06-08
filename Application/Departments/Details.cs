using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Departments
{
    public class Details
    {
        public class Query : IRequest<Result<Department>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Department>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Department>> Handle(Query request, CancellationToken cancellationToken)
            {
                var department = await context.Departments.FindAsync(request.Id);

                return Result<Department>.Success(department);
            }
        }
    }
}