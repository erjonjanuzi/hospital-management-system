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


            if (context.Departments.Any()) return;
            
            var departments = new List<Department>
            {
                new Department
                {
                    Name = "Cardiology",
                    Capacity = "22/100",
                    Description="test",
                }
            };

            await context.Departments.AddRangeAsync(departments);
            await context.SaveChangesAsync();
            

             if (context.Rooms.Any()) return;
            
            var rooms = new List<Room>
            {
                new Room
                {
                    RoomNo= 9111,
                    RoomType="Critical Room",
                    Floor="2nd Floor",
                    Department = "Cardiology",
                    Patient="Engjell Avdiu",
                    
                }
            };

            await context.Rooms.AddRangeAsync(rooms);
            await context.SaveChangesAsync();

        }
    }
}