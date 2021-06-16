using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.PatientsDetails;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PatientsDetailsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<PatientsDetail>>> GetPatientsDetails()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PatientsDetail>> GetPatienteDetails(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePatientesDetails(PatientsDetail details)
        {
            return HandleResult(await Mediator.Send(new Create.Command { PatientsDetail = details }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPatientesDetails(Guid id,PatientsDetail patientsDetail)
        {
            patientsDetail.Id=id;
            return HandleResult(await Mediator.Send(new Edit.Command {PatientsDetail = patientsDetail}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult>DeleteDetails(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }
    }
}