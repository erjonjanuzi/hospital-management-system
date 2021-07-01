using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class CountryController : BaseApiController
    {
        private readonly DataContext context;
        private readonly IMapper mapper;
        public CountryController(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCountry(Country country)
        {
            if (country == null) return null;

            context.Country.Add(country);

            var result = await context.SaveChangesAsync() > 0;

            if (result)
                return Ok("Country created \n" + country);
            return BadRequest("Error creating country");
        }

        [HttpGet]
        public async Task<ActionResult<List<Country>>> GetCountries()
        {
            var countries = await context.Country.ToListAsync();

            for (var i = 0; i < countries.Count; i++)
            {
                var cities = context.Cities.Where(x => x.CountryId == countries[i].Id).ToList();
            }

            if (countries == null) return BadRequest("No countries");

            return Ok(countries);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCountry(string Id)
        {
            var country = await context.Country.FindAsync(Id);

            if (country == null) return null;

            context.Country.Remove(country);

            var result = await context.SaveChangesAsync() > 0;

            if (result)
                return Ok();
            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCountry(string Id, Country newCountry)
        {
            var country = await context.Country.FindAsync(Id);

            if (country == null) return null;

            mapper.Map(newCountry, country);

            var result = await context.SaveChangesAsync() > 0;

            if (result) 
                return Ok();
            return BadRequest();
        }
    }
}