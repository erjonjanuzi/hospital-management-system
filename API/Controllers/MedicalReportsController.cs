using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.MedicalReports;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    public class MedicalReportsController : BaseApiController
    {

        private DataContext context { get; }
        private IMapper mapper { get; }
        public MedicalReportsController(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<MedicalReport>>> GetMedicalReports()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<MedicalReport>> GetMedicalReport(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpGet("/api/patientReports/{patientsId}")]

        public async Task<ActionResult<MedicalReport>> GetMedicalReportByPatient(string patientsId)
        {
            return HandleResult(await Mediator.Send(new ByPatient.Query { patientsId = patientsId }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateMedicalReport(MedicalReport medicalReport)
        {
            return HandleResult(await Mediator.Send(new Create.Command { MedicalReport = medicalReport }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditMedicalReport(MedicalReport newMedicalReport)
        {
            var report = await context.MedicalReports.FindAsync(newMedicalReport.Id);

            if (report == null) return null;

            report.FirstName = newMedicalReport.FirstName;
            report.LastName = newMedicalReport.LastName;
            report.Age = newMedicalReport.Age;
            report.date = newMedicalReport.date;
            report.Report = newMedicalReport.Report;

            var result = await context.SaveChangesAsync() > 0;

            if (result)
                return Ok(report);
            return BadRequest();
        }

        [HttpDelete("/api/medicalreports/{patientsId}")]
        public async Task<IActionResult> DeletePatient(string patientsId)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { patientsId = patientsId }));
        }
    }
}