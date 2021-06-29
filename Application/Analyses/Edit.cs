using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Analyses
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Analyse Analyse { get; set; }
        }

        // public class CommandValidator : AbstractValidator<Command>
        // {
        //     public CommandValidator()
        //     {
        //         RuleFor(x => x.Analyse).SetValidator(new AnalysisValidator());
        //     }
        // }

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
                var analysis = await context.Analyses.FindAsync(request.Analyse.Id);

                if (analysis == null) return null;

                mapper.Map(request.Analyse, analysis);

                var result = await context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update analyse");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}