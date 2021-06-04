using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Analyses;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    // [Authorize(Roles = "doctor")]
    public class AnalysisController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Patient>>> GetAnalyses()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetAnalyse(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAnalyse(Analyse analyse)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Analyse = analyse}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPatient(Guid id, Analyse newAnalyse)
        {
            newAnalyse.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{ Analyse = newAnalyse}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnalyse(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}