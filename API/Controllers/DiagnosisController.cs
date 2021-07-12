using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Diagnoses;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    public class DiagnosisController : BaseApiController
    {

        private DataContext context { get; }
        private IMapper mapper { get; }
        public DiagnosisController(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<Diagnosis>>> GetDiagnoses()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Diagnosis>> GetDiagnosis(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpGet("/api/patient/{patientsId}")]
        public async Task<ActionResult<Diagnosis>> GetDiagnosisByPatient(string patientsId)
        {
            return HandleResult(await Mediator.Send(new ByPatient.Query { patientsId = patientsId }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateDiagnosis(Diagnosis diagnosis)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Diagnosis = diagnosis }));
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditDiagnosis(Diagnosis newDiagnosis)
        {
            var diagnosis = await context.Diagnoses.FindAsync(newDiagnosis.Id);

            if (diagnosis == null) return null;

            diagnosis.Title = newDiagnosis.Title;
            diagnosis.Stage = newDiagnosis.Stage;
            diagnosis.Type = newDiagnosis.Type;
            diagnosis.Details = newDiagnosis.Details;
            diagnosis.date = newDiagnosis.date;


            var result = await context.SaveChangesAsync() > 0;

            if (result)
                return Ok(diagnosis);
            return BadRequest();
        }

        [HttpDelete("/api/diagnosis/{patientsId}")]
        public async Task<IActionResult> DeleteDiagnosis(string patientsId)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { patientsId = patientsId }));
        }
    }
}