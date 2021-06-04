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
                    new Admin{
                        FirstName = "Admin",
                        LastName = "Admin",
                        Email = "admin@test.com",
                        UserName = "admin",
                        RegisteredSince = DateTime.Now
                    },
                    new Doctor{
                        FirstName = "Doctor",
                        LastName = "Doctor",
                        Email = "doctor@test.com",
                        UserName = "doctor",
                        RegisteredSince = DateTime.Now
                    },
                    new PatientUser{
                        FirstName = "Patient",
                        LastName = "Patient",
                        Email = "patient@test.com",
                        UserName = "patient",
                        RegisteredSince = DateTime.Now
                    }
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

            if (context.Analyses.Any()) return;
            
            var analyses = new List<Analyse>
            {
                new Analyse
                {
                    Eritrocite = 5.6F,
                    Hemoglobina = 160,
                    Leukocite=6.5f,
                    Hemakrotiti=49.5F,
                    Tromobocite=289,
                    Retikulocite=8,
                    Neutrofile=62.9F,
                    Limfocite=31.3F,
                    Monocite=5.6F,
                    Urea=5.4F,
                    Glukoza=4.9F,
                    Kolesteroli=6.5F
                }
            };
             await context.Analyses.AddRangeAsync(analyses);
             await context.SaveChangesAsync();
        }
    }
}