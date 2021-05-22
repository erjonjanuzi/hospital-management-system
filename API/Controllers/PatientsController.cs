using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Patients;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;


namespace API.Controllers
{
    public class PatientsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Patient>>> GetPatients()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatient(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePatient(Patient patient)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Patient = patient}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPatient(Guid id, Patient newPatient)
        {
            newPatient.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{ Patient = newPatient}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}