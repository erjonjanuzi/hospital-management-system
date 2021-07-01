using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.RegisterPatients
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public RegisterPatient RegisterPatient { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.RegisterPatient).SetValidator(new RegisterPatientValidator());
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
                var registerPatients = await context.RegisterPatients.FindAsync(request.RegisterPatient.Id);

                if (registerPatients == null) return null;

                mapper.Map(request.RegisterPatient, registerPatients);

                var result = await context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update patient");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}