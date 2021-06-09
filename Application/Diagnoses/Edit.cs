using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Diagnoses
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Diagnosis Diagnosis { get; set; }
        }
        
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.Diagnosis).SetValidator(new DiagnosisValidator());
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
                var diagnosis = await context.Diagnoses.FindAsync(request.Diagnosis.Id);

                if (diagnosis == null) return null;

                mapper.Map(request.Diagnosis,diagnosis);
                
                var result = await context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("Failed to update Diagnosis!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}