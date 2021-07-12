using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.OtherVaccs;
using Domain;
using AutoMapper;
using Persistence;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers 
   {
        public class OtherVaccsController : BaseApiController
   { 
        private DataContext context { get; }
        private IMapper mapper { get; }
        public OtherVaccsController(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<List<OtherVacc>>> GetDiffVaccinations()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OtherVacc>> GetDiffVaccination(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateDiffVaccinationForm(OtherVacc vaccination)
        {
            return HandleResult(await Mediator.Send(new Create.Command {OtherVacc = vaccination}));
        }

       [HttpPut("{id}")]
        public async Task<IActionResult> EditDiffVaccination(OtherVacc newVaccination)
        {
            var vaccine = await context.OtherVaccs.FindAsync(newVaccination.Id);

            if (vaccine == null) return null;
           
            vaccine.Feeling = newVaccination.Feeling;
            vaccine.Symptoms = newVaccination.Symptoms;
            vaccine.VaccineType = newVaccination.VaccineType;

          var result = await context.SaveChangesAsync() > 0;

            if (result)
                return Ok(vaccine);
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDiffVaccionation(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}