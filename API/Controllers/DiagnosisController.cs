using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Diagnoses;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DiagnosisController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Diagnosis>>> GetDiagnoses()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Diagnosis>> GetDiagnosis(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpGet("/patient/{patientsId}")]
        public async Task<ActionResult<Diagnosis>> GetDiagnosisByPatient(string patientsId)
        {
            return HandleResult(await Mediator.Send(new ByPatient.Query{patientsId = patientsId}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateDiagnosis(Diagnosis diagnosis)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Diagnosis = diagnosis }));
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> EditDiagnosis(Guid id, Diagnosis newDiagnosis)
        {
            newDiagnosis.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{ Diagnosis = newDiagnosis}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDiagnosis(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}