using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Vaccinations;
using Domain;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers
{
    public class VaccinationController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Vaccination>>> GetVaccinations()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Vaccination>> GetVaccination(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateVaccinationForm(Vaccination vaccine)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Vaccination = vaccine}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditVaccinationForm(Guid id, Vaccination newForm)
        {
            newForm.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{ Vaccination = newForm}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVaccionation(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}