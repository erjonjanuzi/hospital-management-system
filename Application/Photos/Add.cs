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

                var user = (Doctor) await context.Users.Include(p => ((Doctor)p).Photo)
                    .FirstOrDefaultAsync(x => x.UserName == username);
                
                if (user == null) return null;

                if (user.Image != null) 
                {
                    var existingPhoto = await context.Photos.FindAsync((user.Image.Split("/")[7]).Split(".")[0]);
                    if (existingPhoto != null)
                        await photoAccessor.DeletePhoto(existingPhoto.Id);
                } 

                var photoUploadResult = await photoAccessor.AddPhoto(request.File);

                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                user.Photo = photo;

                user.Image = photo.Url;

                var result = await context.SaveChangesAsync() > 0;

                if (result) return Result<Photo>.Success(photo);

                return Result<Photo>.Failure("Error adding photo");
            }
        }
    }
}