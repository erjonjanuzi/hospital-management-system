using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class SpecialtyController : BaseApiController
    {
        private readonly DataContext context;
        private readonly IMapper mapper;
        public SpecialtyController(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateSpecialty(Specialty specialty)
        {
            if (specialty == null) return null;

            await context.Specialty.AddAsync(specialty);

            var result = await context.SaveChangesAsync() > 0;
            if (result)
                return Ok(specialty);
            return BadRequest("Error adding specialty");
        }

        [HttpGet]
        public async Task<ActionResult<List<Specialty>>> GetSpecialties()
        {
            var specialties = await context.Specialty.ToListAsync();

            if(specialties == null) return null;

            return Ok(specialties);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Specialty>> GetSpecialty(Guid id)
        {
            var specialty = await context.Specialty.FindAsync(id);

            if(specialty == null) return null;

            return Ok(specialty);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSpecialty(Guid id)
        {
            var specialty = await context.Specialty.FindAsync(id);

            if(specialty == null)
                return BadRequest("Could not find specialty");
            
            context.Specialty.Remove(specialty);

            var result = await context.SaveChangesAsync() > 0;

            if(result)
                return Ok("Deleted");
            return BadRequest("Error deleting specialty");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditSpecialty(Guid id, Specialty newSpecialty)
        {
            var specialty = await context.Specialty.FindAsync(id);

            if(specialty == null)
                return BadRequest("Could not find specialty");
            
            mapper.Map(newSpecialty, specialty);

            var result = await context.SaveChangesAsync() > 0;

            if(result)
                return Ok("Updated successfully");
            return BadRequest("Error updatinng specialty");
        }

        [HttpPut("doctor/{doctorId}/{id}")]
        public async Task<ActionResult<Doctor>> AddSpecialty(string doctorId, Guid Id)
        {
            var specialty = await context.Specialty.FindAsync(Id);

            if (specialty == null) return null;

            Doctor doctor = (Doctor) await context.Users.FindAsync(doctorId);

            if (doctor == null) return null;

            doctor.Specialty = specialty;  

            var result = await context.SaveChangesAsync() > 0;
            
            if(result)
                return Ok(doctor);
            return BadRequest("Error adding specialty");
        }
    }
}