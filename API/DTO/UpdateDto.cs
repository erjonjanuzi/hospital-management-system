using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class UpdateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
    }
}