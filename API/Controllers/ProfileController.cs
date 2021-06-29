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

        [HttpGet("doctorsbyspecialty/{id}")]
        public async Task<ActionResult<List<Doctor>>> GetDoctorsBySpecialty(Guid Id)
        {
            var specialty = await context.Specialty.FindAsync(Id);
            var users = await context.Users.ToListAsync();
            
            List<Doctor> doctors = new List<Doctor>();

            for (var i = 0; i < users.Count; i++)
            {
                if(users[i] is Doctor)
                {
                    Doctor doctor = (Doctor)users[i];
                    if (doctor.SpecialtyId == specialty.Id)
                        doctors.Add(doctor);
                }
            }
            
            return Ok(doctors);
        }
    }
}