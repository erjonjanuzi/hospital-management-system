using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Accounts
{
    public class Details
    {
        public class Query : IRequest<Result<AppUser>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<AppUser>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<AppUser>> Handle(Query request, CancellationToken cancellationToken)
            {
                var account = await context.Users.FindAsync(request.Id);

                return Result<AppUser>.Success(account);
            }
        }
    }
}