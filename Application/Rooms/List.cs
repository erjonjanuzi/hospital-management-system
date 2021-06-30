using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Rooms
{
    public class List
    {
        public class Query : IRequest<Result<List<Room>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<Room>>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }
            public async Task<Result<List<Room>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Room>>.Success(await context.Rooms.ToListAsync(cancellationToken));
            }
        }
    }
}