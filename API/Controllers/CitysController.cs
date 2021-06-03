using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Citys;

namespace API.Controllers
{
    public class CitysController : BaseApiController
    {

        [HttpGet]

        public async Task<ActionResult<List<City>>> GetCities()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }


        [HttpGet("{id}")]

        public async Task<ActionResult<City>> GetCity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id=id}));
        }


        [HttpPost]
        public async Task<IActionResult> CreateCity(City city)
        {
            return HandleResult(await Mediator.Send(new Create.Command{ City = city }));
        }


        [HttpPut("{id}")]

        public async Task<IActionResult> EditCity(Guid id,City newCity)
        {
            newCity.Id=id;
            return HandleResult(await Mediator.Send(new Edit.Command {City = newCity}));
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult>DeleteCity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }

    }
}