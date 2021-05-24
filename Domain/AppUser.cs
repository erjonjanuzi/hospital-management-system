using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public abstract class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public abstract string Role {get; set;}
        
    }

    public class Admin : AppUser
    {
        public override string Role { get; set; }
    }

    public class Doctor : AppUser
    {
        public override string Role { get; set; }
    }
}