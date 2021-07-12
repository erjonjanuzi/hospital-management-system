using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Citys;
using Persistence;
using AutoMapper;

namespace API.Controllers
{
    public class CitysController : BaseApiController
    {
        private readonly DataContext context;
        private readonly IMapper mapper;
        public CitysController(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<City>>> GetCities()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }


        [HttpGet("{id}")]

        public async Task<ActionResult<City>> GetCity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }


        [HttpPost]
        public async Task<IActionResult> CreateCity(City city)
        {
            if (city == null) return null;

            context.Cities.Add(city);

            var result = await context.SaveChangesAsync() > 0;

            if (result)
                return Ok("City created");
            return BadRequest("Error creating city");
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditCity(Guid Id, City newCity)
        {
            var city = await context.Cities.FindAsync(Id);

            if (city == null) return null;

            mapper.Map(newCity, city);

            var result = await context.SaveChangesAsync() > 0;

            if (result) 
                return Ok();
            return BadRequest();
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteCity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

    }
}