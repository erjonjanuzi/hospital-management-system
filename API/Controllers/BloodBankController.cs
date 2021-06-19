using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.BloodBanks;

namespace API.Controllers
{
    public class BloodBankController : BaseApiController
    {

        [HttpGet]

        public async Task<ActionResult<List<BloodBank>>> GetBloodBanks()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }


        [HttpGet("{id}")]

        public async Task<ActionResult<BloodBank>> GetBloodBank(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id=id}));
        }


        [HttpPost]
        public async Task<IActionResult> CreateBloodBank(BloodBank bloodBank)
        {
            return HandleResult(await Mediator.Send(new Create.Command{ BloodBank = bloodBank }));
        }


        [HttpPut("{id}")]

        public async Task<IActionResult> EditBloodBank(Guid id,BloodBank newBloodBank)
        {
            newBloodBank.Id=id;
            return HandleResult(await Mediator.Send(new Edit.Command {BloodBank = newBloodBank}));
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult>DeleteBloodBank(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }

    }
}