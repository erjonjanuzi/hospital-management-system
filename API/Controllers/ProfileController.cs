using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ProfileController : BaseApiController
    {
        private readonly DataContext context;
        public ProfileController(DataContext context)
        {
            this.context = context;
        }

        /**
        * This method is used to find available doctors by specifying their specialty
        * and then checking if they are available for appointments during those hours
        */
        [HttpGet("availabledoctors/{id}/{date}")]
        public async Task<ActionResult<List<Doctor>>> GetAvailableDoctors(Guid Id, DateTime date)
        {
            var specialty = await context.Specialty.FindAsync(Id);
            var users = await context.Users.ToListAsync();

            List<Doctor> doctors = new List<Doctor>();

            for (var i = 0; i < users.Count; i++)
            {
                if (users[i] is Doctor)
                {
                    Doctor doctor = (Doctor)users[i];
                    bool isAvailable = true;
                    var appointments = await context.Appointments
                        .Where(a => a.DoctorId == doctor.Id)
                        .ToListAsync();
                    
                    foreach (Appointment a in appointments)
                    {
                        if (a.Date.Day == date.Day && a.Date.Hour == date.Hour)
                            isAvailable = false;
                    }

                    if (isAvailable && doctor.SpecialtyId == specialty.Id)
                    {
                        doctors.Add(doctor);
                    }
                }
            }

            return Ok(doctors);
        }
        
        [HttpGet("{doctors}")]
        public async Task<ActionResult<List<Doctor>>> GetDoctorProfiles()
        {
            var users = await context.Users.Where(x => x.Role == "doctor").ToListAsync();

            List<Doctor> doctors = new List<Doctor>();

            foreach (AppUser u in users)
            {
                if (u is Doctor){
                    Doctor doctor = (Doctor)u;
                    var specialty = await context.Specialty.FindAsync(doctor.SpecialtyId);
                    doctor.Specialty = specialty;
                    doctors.Add(doctor);
                }
            }
            
            return Ok(doctors);
        }

    }
}