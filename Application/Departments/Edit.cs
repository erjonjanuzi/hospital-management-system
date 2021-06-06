using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Departments
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Department Department { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            private readonly IMapper maper;
            public Handler(DataContext context, IMapper maper)
            {
                this.maper = maper;
                this.context = context;

            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var department = await context.Departments.FindAsync(request.Department.Id);

                maper.Map(request.Department, department);

                await context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}