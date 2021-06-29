using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.PersonalInfos
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public PersonalInfo PersonalInfo { get; set; }
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
                var details = await context.PersonalInfo.FindAsync(request.PersonalInfo.Id);

                if (details == null) return null;

                mapper.Map(request.PersonalInfo, details);

                var result = await context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update Patient's Details");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}