using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.PersonalInfos;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PersonalInfoController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<PersonalInfo>>> GetPersonalInfo()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PersonalInfo>> GetPatienteDetails(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePatientesDetails(PersonalInfo PersonalInfo)
        {
            return HandleResult(await Mediator.Send(new Create.Command { PersonalInfo = PersonalInfo }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPatientesDetails(Guid id, PersonalInfo PersonalInfo)
        {
            PersonalInfo.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { PersonalInfo = PersonalInfo }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDetails(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}