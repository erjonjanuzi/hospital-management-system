using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.MedicalReports;
using Domain;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers
{
    public class MedicalReportsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<MedicalReport>>> GetMedicalReports()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<MedicalReport>> GetMedicalReport(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id=id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateMedicalReport(MedicalReport medicalReport)
        {
            return HandleResult(await Mediator.Send(new Create.Command {MedicalReport = medicalReport}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditMedicalReport(Guid id, MedicalReport newMedicalReport)
        {
            newMedicalReport.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{ MedicalReport = newMedicalReport}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}