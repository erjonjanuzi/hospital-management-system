using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class CountryController : BaseApiController
    {
        private readonly DataContext context;
        public CountryController(DataContext context)
        {
            this.context = context;
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

        [HttpGet("{id}")]
        public async Task<ActionResult<Country>> GetCountry(string Id)
        {
            var country = await context.Country.FindAsync(Id);

            if (country == null) return null;

            var cities = context.Cities.Where(x => x.CountryId == country.Id).ToList();
            country.Cities = cities;
            
            return Ok(country);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Country>> DeleteCountry(string Id)
        {
            var country = await context.Country.FindAsync(Id);

            if (country == null) return null;
        
            var cities = await context.Cities.Where(x => x.CountryId == country.Id).ToListAsync();

            foreach(City c in cities)
            {
                context.Cities.Remove(c);
            }
            
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

            //mapper.Map(newCountry, country);
            country.Id = newCountry.Id;
            country.Name = newCountry.Name;

            var result = await context.SaveChangesAsync() > 0;

            if (result) 
                return Ok();
            return BadRequest();
        }
    }
}