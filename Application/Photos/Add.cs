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
    public class Add
    {
        public class Command : IRequest<Result<Photo>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Photo>>
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

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                string username = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);

                var user = (Doctor) await context.Users.Include(p => ((Doctor)p).Photos)
                    .FirstOrDefaultAsync(x => x.UserName == username);
                
                if (user == null) return null;

                var photoUploadResult = await photoAccessor.AddPhoto(request.File);

                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                if (!user.Photos.Any(x => x.IsMain)) photo.IsMain = true;

                user.Photos.Add(photo);

                user.Image = photo.Url;

                var result = await context.SaveChangesAsync() > 0;

                if (result) return Result<Photo>.Success(photo);

                return Result<Photo>.Failure("Error adding photo");
            }
        }
    }
}