using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Rooms;

namespace API.Controllers
{
    public class RoomsController : BaseApiController
    {

        [HttpGet]

        public async Task<ActionResult<List<Room>>> GetRooms()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }


        [HttpGet("{id}")]

        public async Task<ActionResult<Department>> GetRooms(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id=id}));
        }


        [HttpPost]
        public async Task<IActionResult> CreateRoom(Room room)
        {
            return HandleResult(await Mediator.Send(new Create.Command{ Room = room }));
        }


        [HttpPut("{id}")]

        public async Task<IActionResult> EditRoom(Guid id,Room newRoom)
        {
            newRoom.Id=id;
            return HandleResult(await Mediator.Send(new Edit.Command {Room = newRoom}));
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult>DeleteRoom(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }

    }
}