using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class AppointmentController : BaseApiController
    {
        private DataContext context { get; }
        public AppointmentController(DataContext context)
        {
            this.context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAppointment([FromBody] Appointment appointment)
        {
            if (appointment == null)
                return BadRequest("Cannot create appointment");

            await context.Appointments.AddAsync(appointment);
            var result = await context.SaveChangesAsync() > 0;
            if (result)
                return Ok(appointment);
            return BadRequest("Error while creating appointment");
        }

        [HttpGet]
        public async Task<ActionResult<List<Appointment>>> GetAllAppointments()
        {
            var appointments = await context.Appointments.ToListAsync();
            foreach (Appointment a in appointments)
            {
                a.Patient = (PatientUser) await context.Users.FindAsync(a.PatientId);
            }

            return Ok(appointments);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PatientUser>> GetPatientAppointments(string id)
        {
            var query = await context.Appointments
                        .Where(x => x.PatientId == id)
                        .ToListAsync();

            return Ok(query);
        }
    }
}