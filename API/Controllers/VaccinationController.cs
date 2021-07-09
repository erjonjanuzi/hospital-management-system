using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Vaccinations;
using Domain;
using AutoMapper;
using Persistence;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class VaccinationController : BaseApiController
   {
        private DataContext context { get; }
        private IMapper mapper { get; }
        public VaccinationController(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<List<Vaccination>>> GetVaccinations()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Vaccination>> GetVaccination(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateVaccinationForm(Vaccination vaccination)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Vaccination = vaccination}));
        }

       [HttpPut("{id}")]
        public async Task<IActionResult> EditVaccination(Vaccination newVaccination)
        {
            var vaccine = await context.Vaccinations.FindAsync(newVaccination.Id);

            if (vaccine == null) return null;
           
            vaccine.FirstName = newVaccination.FirstName;
            vaccine.LastName = newVaccination.LastName;
            vaccine.Age = newVaccination.Age;
            vaccine.Email = newVaccination.Email;
            vaccine.Date = newVaccination.Date;
            vaccine.Received = newVaccination.Received;
            vaccine.Vaccine = newVaccination.Vaccine;
            vaccine.Allergies = newVaccination.Allergies;
            vaccine.Information = newVaccination.Information;

          var result = await context.SaveChangesAsync() > 0;

            if (result)
                return Ok(vaccine);
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVaccionation(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}