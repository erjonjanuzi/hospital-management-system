using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Analyses;
using Domain;
using AutoMapper;
using Persistence;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AnalysisController : BaseApiController
    {
        private DataContext context { get; }
        private IMapper mapper { get; }
        public AnalysisController(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
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
        public async Task<IActionResult> EditAnalysis(Analyse newAnalyse)
        {
            var analysis = await context.Analyses.FindAsync(newAnalyse.Id);

            if (analysis == null) return null;

            analysis.Eritrocite = newAnalyse.Eritrocite;
            analysis.Hemoglobina = newAnalyse.Hemoglobina;
            analysis.Leukocite = newAnalyse.Leukocite;
            analysis.Hemakrotiti = newAnalyse.Hemakrotiti;
            analysis.Tromobocite = newAnalyse.Tromobocite;
            analysis.Retikulocite = newAnalyse.Retikulocite;
            analysis.Neutrofile = newAnalyse.Neutrofile;
            analysis.Limfocite = newAnalyse.Limfocite;
            analysis.Monocite = newAnalyse.Monocite;
            analysis.Urea = newAnalyse.Urea;
            analysis.Glukoza = newAnalyse.Glukoza;
            analysis.Kolesteroli = newAnalyse.Kolesteroli;


            var result = await context.SaveChangesAsync() > 0;

            if (result)
                return Ok(analysis);
            return BadRequest();
        }

        [HttpDelete("/api/analysis/{patientsId}")]
        public async Task<IActionResult> DeleteAnalyse(string patientsId)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{patientsId = patientsId}));
        }
    }
}