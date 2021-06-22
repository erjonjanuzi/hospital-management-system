using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.MedicalReports
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public MedicalReport MedicalReport { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.MedicalReport).SetValidator(new MedicalReportValidator());
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
                var report = await context.MedicalReports.FindAsync(request.MedicalReport.Id);

                if (report == null) return null;

                mapper.Map(request.MedicalReport, report);

                var result = await context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update report");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}