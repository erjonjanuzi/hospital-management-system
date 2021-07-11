using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.OtherVaccs;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers 
   {
        public class OtherVaccsController : BaseApiController
   { 
        [HttpGet]
        public async Task<ActionResult<List<OtherVacc>>> GetDiffVaccinations()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OtherVacc>> GetDiffVaccination(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateDiffVaccinationForm(OtherVacc vaccination)
        {
            return HandleResult(await Mediator.Send(new Create.Command {OtherVacc = vaccination}));
        }

       [HttpPut("{id}")]
        public async Task<IActionResult> EditDiffVaccination(Guid id, OtherVacc newVaccination)
        {

            newVaccination.Id=id;
            return HandleResult(await Mediator.Send(new Edit.Command{OtherVacc = newVaccination}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDiffVaccionation(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}