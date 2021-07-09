using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using FluentValidation;
using Persistence;

namespace Application.OtherVaccs
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public OtherVacc OtherVacc { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.OtherVacc).SetValidator(new OtherVaccsValidator());
                
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var vaccine = await context.OtherVaccs.FindAsync(request.OtherVacc.Id);

                if (vaccine == null) return null;

                mapper.Map(request.OtherVacc, vaccine);

                var result = await context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update the vaccination form");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}