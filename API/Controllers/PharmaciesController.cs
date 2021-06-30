using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Pharmacies;


namespace API.Controllers
{
    public class PharmaciesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Pharmacy>>> GetPharmacies()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Pharmacy>> GetPharmacy(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id=id}));
        }


        [HttpPost]

        public async Task<IActionResult> CreatePharmacy(Pharmacy pharmacy)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Pharmacy = pharmacy}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPharmacy(Guid id,Pharmacy newPharmacy)
        {
            newPharmacy.Id=id;
            return HandleResult(await Mediator.Send(new Edit.Command { Pharmacy = newPharmacy}));
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePharmacy(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }
    }
}