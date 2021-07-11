using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Analyses;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AnalysisController : BaseApiController
    {

         [HttpGet]
        public async Task<ActionResult<List<Analyse>>> GetAnalyses()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Analyse>> GetAnalysis(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpGet("/api/patientAnalyse/{patientsId}")]
        public async Task<ActionResult<Analyse>> GetAnalysisByPatient(string patientsId)
        {
            return HandleResult(await Mediator.Send(new ByPatient.Query{patientsId = patientsId}));
        }

          [HttpPost]
        public async Task<IActionResult> CreateAnalyses(Analyse analyse)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Analyse = analyse}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAnalysis(Guid id, Analyse newAnalyse)
        {
            newAnalyse.Id=id;
            return HandleResult(await Mediator.Send(new Edit.Command{Analyse = newAnalyse}));
        }

        [HttpDelete("/api/analysis/{patientsId}")]
        public async Task<IActionResult> DeleteAnalyse(string patientsId)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{patientsId = patientsId}));
        }
    }
}