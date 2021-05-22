using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Patients
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Patient Patient { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Patient).SetValidator(new PatientValidator());
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
                var patient = await context.Patients.FindAsync(request.Patient.Id);

                if (patient == null) return null;

                mapper.Map(request.Patient, patient);

                var result = await context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update patient");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}