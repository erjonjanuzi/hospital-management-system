using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.PersonalInfos
{
    public class Details
    {
        public class Query : IRequest<Result<PersonalInfo>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PersonalInfo>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<PersonalInfo>> Handle(Query request, CancellationToken cancellationToken)
            {
                var details = await context.PersonalInfo.FindAsync(request.Id);

                return Result<PersonalInfo>.Success(details);
            }
        }
    }
}