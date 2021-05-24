using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new Admin{DisplayName = "Erjon", UserName = "erjon", Email = "erjon@test.com", Role = "Admin"},
                    new Doctor{DisplayName = "Engjell", UserName = "engjell", Email = "engjell@test.com", Role = "Doctor"}
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (context.Patients.Any()) return;
            
            var patients = new List<Patient>
            {
                new Patient
                {
                    FirstName = "Engjell",
                    LastName = "Avdiu"
                }
            };

            await context.Patients.AddRangeAsync(patients);
            await context.SaveChangesAsync();
        }
    }
}