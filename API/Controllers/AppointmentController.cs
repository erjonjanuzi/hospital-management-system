using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class AppointmentController : BaseApiController
    {
        private DataContext context { get; }
        private IMapper mapper { get; }
        public AppointmentController(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAppointment(Appointment appointment)
        {
            if (appointment == null)
                return BadRequest("Cannot create appointment");

            DateTime minValidDate = DateTime.Now.AddDays(2);

            if (DateTime.Compare(appointment.Date, minValidDate) < 0)
                return BadRequest("Please pick a date at least three days from today");

            if (appointment.Date.Hour < 8 || appointment.Date.Hour > 20)
                return BadRequest("Please pick hours between 08:00AM and 08:00PM");

            await context.Appointments.AddAsync(appointment);

            var result = await context.SaveChangesAsync() > 0;

            if (result)
                return Ok(appointment);

            return BadRequest("Error while creating appointment");
        }

        [HttpGet]
        public async Task<ActionResult<List<Appointment>>> GetAllAppointments()
        {
            var appointments = await context.Appointments.OrderByDescending(x => x.Date).ToListAsync();

            foreach (Appointment a in appointments)
            {
                a.Patient = (PatientUser)await context.Users.FindAsync(a.PatientId);
                a.Doctor = (Doctor)await context.Users.FindAsync(a.DoctorId);

                if (a.Doctor != null)
                {
                    var personalInfo = await context.PersonalInfo.FindAsync(a.Doctor.PersonalInfoId);
                    a.Doctor.PersonalInfo = personalInfo;
                }
            }

            return Ok(appointments);
        }

        [HttpGet("get/{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(Guid id)
        {
            var appointment = await context.Appointments.FindAsync(id);

            appointment.Patient = (PatientUser)await context.Users.FindAsync(appointment.PatientId);
            appointment.Doctor = (Doctor)await context.Users.FindAsync(appointment.DoctorId);

            var personalInfo = await context.PersonalInfo.FindAsync(appointment.Doctor.PersonalInfoId);
            appointment.Doctor.PersonalInfo = personalInfo;

            return Ok(appointment);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Appointment>>> GetPatientAppointments(string id)
        {
            var appointments = await context.Appointments
                .Where(x => x.PatientId == id)
                .OrderByDescending(x => x.Date)
                .ToListAsync();

            foreach (Appointment a in appointments)
            {
                a.Patient = (PatientUser)await context.Users.FindAsync(a.PatientId);
                a.Doctor = (Doctor)await context.Users.FindAsync(a.DoctorId);

                if (a.Doctor != null)
                {
                    var specialty = await context.Specialty.FindAsync(a.Doctor.SpecialtyId);
                    a.Doctor.Specialty = specialty;

                    var personalInfo = await context.PersonalInfo.FindAsync(a.Doctor.PersonalInfoId);
                    a.Doctor.PersonalInfo = personalInfo;
                }
            }

            return Ok(appointments);
        }

        [HttpGet("doctor/{id}")]
        public async Task<ActionResult<List<Appointment>>> GetDoctorAppointments(string id)
        {
            var appointments = await context.Appointments
                .Where(x => x.DoctorId == id)
                .ToListAsync();

            foreach (Appointment a in appointments)
            {
                a.Patient = (PatientUser)await context.Users.FindAsync(a.PatientId);
                a.Doctor = (Doctor)await context.Users.FindAsync(a.DoctorId);
                var personalInfo = await context.PersonalInfo.FindAsync(a.Doctor.PersonalInfoId);
                a.Doctor.PersonalInfo = personalInfo;
            }

            return Ok(appointments);
        }

        [HttpPut("assign/{id}")]
        public async Task<IActionResult> AssignDoctor(Appointment newAppointment)
        {
            var appointment = await context.Appointments.FindAsync(newAppointment.Id);

            if (appointment == null) return null;

            appointment.DoctorId = newAppointment.DoctorId;
            appointment.Status = "Active";

            var result = await context.SaveChangesAsync() > 0;
            if (result)
                return Ok(appointment);
            return BadRequest();
        }

        [HttpPut("cancel/{id}")]
        public async Task<IActionResult> CancelAppointment(Guid id)
        {
            var appointment = await context.Appointments.FindAsync(id);

            if (appointment == null) return null;
            appointment.Status = "Canceled";

            var result = await context.SaveChangesAsync() > 0;
            if (result)
                return Ok(appointment);
            return BadRequest();
        }

        [HttpPut("deny/{id}")]
        public async Task<IActionResult> DenyAppointment(Guid id)
        {
            var appointment = await context.Appointments.FindAsync(id);

            if (appointment == null) return null;
            appointment.Status = "Denied";

            var result = await context.SaveChangesAsync() > 0;
            if (result)
                return Ok(appointment);
            return BadRequest();
        }

        [HttpPut("markcomplete/{id}")]
        public async Task<IActionResult> MarkCompleted(Guid id)
        {
            var appointment = await context.Appointments.FindAsync(id);

            if (appointment == null) return null;
            appointment.Status = "Completed";

            var result = await context.SaveChangesAsync() > 0;
            if (result)
                return Ok(appointment);
            return BadRequest();
        }

        [HttpPut("edit/{id}")]
        public async Task<ActionResult<Appointment>> EditDate(Appointment newAppointment)
        {
            var appointment = await context.Appointments.FindAsync(newAppointment.Id);

            if (appointment == null) return null;
            //int year, int month, int day, int hour, int minute, int second
            int year = newAppointment.Date.Year;
            int month = newAppointment.Date.Month;
            int day = newAppointment.Date.Day;
            int hour = newAppointment.Date.Hour;
            int minute = newAppointment.Date.Minute;
            int second = newAppointment.Date.Second;

            appointment.Date = new DateTime(year, month, day, hour, minute, second);

            var result = await context.SaveChangesAsync() > 0;
            if (result)
                return Ok(appointment);
            return BadRequest("test");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(Guid id)
        {
            var appointment = await context.Appointments.FindAsync(id);

            context.Appointments.Remove(appointment);

            var result = await context.SaveChangesAsync() > 0;

            if (result)
                return Ok("Appointment deleted");

            return BadRequest("Could not delete appointment");
        }

    }
}