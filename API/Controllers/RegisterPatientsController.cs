using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.RegisterPatients;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RegisterPatientsController : BaseApiController
    {
        [HttpGet]

        public async Task<ActionResult<List<RegisterPatient>>> GetRegisterPatients()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatient(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]

        public async Task<IActionResult> RegisterPatient(RegisterPatient registerPatient)
        {
            return HandleResult(await Mediator.Send(new Register.Command { RegisterPatient = registerPatient}));
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> EditRegisterPatient(Guid id, RegisterPatient newRegisterPatient)
        {
            newRegisterPatient.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{ RegisterPatient = newRegisterPatient}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegisterPatient(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}