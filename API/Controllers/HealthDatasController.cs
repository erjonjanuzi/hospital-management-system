using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.HealthDatas;

namespace API.Controllers
{
    public class HealthDatasController : BaseApiController
    {

        [HttpGet]

        public async Task<ActionResult<List<HealthData>>> GetHealthDatas()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }


        [HttpGet("{id}")]

        public async Task<ActionResult<HealthData>> GetHealthData(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }


        [HttpPost]
        public async Task<IActionResult> CreateHealthData(HealthData healthData)
        {
            return HandleResult(await Mediator.Send(new Create.Command { HealthData = healthData }));
        }


        [HttpPut("{id}")]

        public async Task<IActionResult> EditHealthData(Guid id, HealthData newHealthData)
        {
            newHealthData.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { HealthData = newHealthData }));
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteHealthData(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

    }
}