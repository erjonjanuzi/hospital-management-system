using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Pharmacies
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Pharmacy Pharmacy { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Pharmacy).SetValidator(new PharmaciesValidator());
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
                var pharmacy = await context.Pharmacies.FindAsync(request.Pharmacy.Id);

                if(pharmacy == null) return null;

                mapper.Map(request.Pharmacy, pharmacy);

                var result = await context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("Failed to update Product!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}