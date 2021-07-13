using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class NationalityController : BaseApiController
    {
        private readonly DataContext context;
        public NationalityController(DataContext context)
        {
            this.context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Nationality>> CreateNationality(Nationality nationality)
        {
            if (nationality == null) return null;

            context.Nationality.Add(nationality);

            var result = await context.SaveChangesAsync() > 0;

            if (result)
                return Ok(nationality);
            return BadRequest("Problem creating nationality");
        }

        [HttpGet]
        public async Task<ActionResult<List<Nationality>>> GetNationalities()
        {
            var nationalities = await context.Nationality.ToListAsync();

            if (nationalities == null)
                return null;

            return Ok(nationalities);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Nationality>> GetNationality(Guid Id)
        {
            var nationality = await context.Nationality.FindAsync(Id);

            if (nationality == null) return null;

            return Ok(nationality);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditNationality(Guid Id, Nationality newNationality)
        {
            var nationality = await context.Nationality.FindAsync(Id);

            if (nationality == null) return null;

            nationality.Name = newNationality.Name;

            var result = await context.SaveChangesAsync() > 0;

            if (result)
                return Ok("Updated successfully");
            return BadRequest("Problem updating nationality");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNationality(Guid Id)
        {
            var nationality = await context.Nationality.FindAsync(Id);

            if (nationality == null) return null;

            context.Nationality.Remove(nationality);

            var result = await context.SaveChangesAsync() > 0;

            if (result)
                return Ok("Deleted successfully");
            return BadRequest("Problem deleting nationality");
        }
    }
}