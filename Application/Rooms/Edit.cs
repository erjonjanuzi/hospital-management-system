using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Rooms
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Room Room { get; set; }
        }
        
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.Room).SetValidator(new RoomsValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {

            private readonly DataContext context;

            private readonly IMapper mapper;

            public Handler(DataContext context,IMapper mapper)
            {
                this.mapper=mapper;
                this.context=context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var room = await context.Rooms.FindAsync(request.Room.Id);

                if (room == null) return null;

                mapper.Map(request.Room,room);

                var result = await context.SaveChangesAsync() > 0;
               

                if(!result) return Result<Unit>.Failure("Failder to update !");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}