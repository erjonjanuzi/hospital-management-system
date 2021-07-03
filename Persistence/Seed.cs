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

            if (context.Specialty.Any()) return;
            var specialties = new List<Specialty>
            {
                new Specialty
                {
                    Name = "Allergy and Immunology",
                    Description = "Specialists in allergy and immunology work with both adult and pediatric patients suffering from allergies and diseases of the respiratory tract or immune system. They may help patients suffering from common diseases such as asthma, food and drug allergies, immune deficiencies, and diseases of the lung. Specialists in allergy and immunology can pursue opportunities in research, education, or clinical practice."
                },
                new Specialty
                {
                    Name = "Anesthesiology",
                    Description = "Anesthesiology is the branch of medicine dedicated to pain relief for patients before, during, and after surgery"
                },
                new Specialty
                {
                    Name = "Dermatology",
                    Description = "Dermatologists are physicians who treat adult and pediatric patients with disorders of the skin, hair, nails, and adjacent mucous membranes. They diagnose everything from skin cancer, tumors, inflammatory diseases of the skin, and infectious diseases. They also perform skin biopsies and dermatological surgical procedures."
                },
                new Specialty
                {
                    Name = "Diagnostic Radiology",
                    Description = "Physicians specializing in diagnostic radiology are trained to diagnose illnesses in patients through the use of x-rays, radioactive substances, sound waves in ultrasounds, or the body’s natural magnetism in magnetic resonance images (MRIs)."
                }
            };

            await context.Specialty.AddRangeAsync(specialties);
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