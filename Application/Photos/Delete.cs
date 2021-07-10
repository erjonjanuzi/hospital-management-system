using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IPhotoAccessor photoAccessor;
            private readonly IHttpContextAccessor httpContextAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor, IHttpContextAccessor httpContextAccessor)
            {
                this.context = context;
                this.photoAccessor = photoAccessor;
                this.httpContextAccessor = httpContextAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                string username = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);

                var user = (Doctor) await context.Users.Include(p => ((Doctor)p).Photos)
                    .FirstOrDefaultAsync(x => x.UserName == username);

                if (user == null) return null;

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if (photo == null) return null;

                var result = await photoAccessor.DeletePhoto(photo.Id);

                if (result == null) return Result<Unit>.Failure("Problem deleting photo");

                user.Photos.Remove(photo);

                user.Image = null;

                var success = await context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem deleting photo from API");
            }
        }
    }
}