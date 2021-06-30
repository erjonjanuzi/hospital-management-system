using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Rooms
{
    public class Details
    {
        public class Query : IRequest<Result<Room>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Room>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Room>> Handle(Query request, CancellationToken cancellationToken)
            {
                var room = await context.Rooms.FindAsync(request.Id);

                return Result<Room>.Success(room);
            }
        }
    }
}