using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PersonalInfos
{
    public class List{
        public class Query : IRequest<Result<List<PersonalInfo>>>
        {
        }
        public class Handler : IRequestHandler<Query, Result<List<PersonalInfo>>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }
            public async Task<Result<List<PersonalInfo>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<PersonalInfo>>.Success(await context.PersonalInfo.ToListAsync(cancellationToken));
            }
        }
    }
}