using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Accounts
{
    public class List
    {
        public class Query : IRequest<Result<List<AppUser>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<AppUser>>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }
            public async Task<Result<List<AppUser>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<AppUser>>.Success(await context.Users.ToListAsync(cancellationToken));
            }
        }
    }
}