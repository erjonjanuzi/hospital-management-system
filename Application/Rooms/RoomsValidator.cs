using Domain;
using FluentValidation;

namespace Application.Rooms
{
    public class RoomsValidator : AbstractValidator<Room>
    {
        public RoomsValidator()
        {
            RuleFor(x => x.RoomNo).NotEmpty();
            RuleFor(x => x.RoomType).NotEmpty();
            RuleFor(x => x.Patient).NotEmpty();
        }
    
        
    }
}