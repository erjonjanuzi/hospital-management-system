using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Citys
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public City City { get; set; }
        }
        
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.City).SetValidator(new CitysValidator());
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
                var city = await context.Cities.FindAsync(request.City.Id);

                if (city == null) return null;

                mapper.Map(request.City,city);
                
                var result = await context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("Failder to update City!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}