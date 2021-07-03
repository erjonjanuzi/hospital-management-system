using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTO;
using API.Services;
using Application.Accounts;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly TokenService tokenService;
        private readonly DataContext context;
        private readonly IMapper mapper;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService,
            DataContext context, IMapper mapper)
        {
            this.tokenService = tokenService;
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized();

            var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return Unauthorized();
        }

        //subject to change, review after completing doctor registering
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email is taken");
                return ValidationProblem();
            }
            if (await userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username", "Username is taken");
                return ValidationProblem();
            }

            AppUser user = null;

            if (registerDto.Role.ToLower().Equals("admin"))
            {
                user = new Admin
                {
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                    PasswordHash = registerDto.PasswordHash,
                    RegisteredSince = DateTime.Now
                };
            }
            else if (registerDto.Role.ToLower().Equals("doctor"))
            {
                user = new Doctor
                {
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                    PasswordHash = registerDto.PasswordHash,
                    RegisteredSince = DateTime.Now
                };
            }
            else if (registerDto.Role.ToLower().Equals("patient"))
            {
                user = new PatientUser
                {
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                    PasswordHash = registerDto.PasswordHash,
                    RegisteredSince = DateTime.Now,
                    Diagnosis = null,
                    Analysis = null,
                    PersonalInfo = null,
                    MedicalReports = null
                };
            }

            var result = await userManager.CreateAsync(user, registerDto.PasswordHash);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest("Problem registering user");
        }

        //doc routes
        [HttpPost("register/doctor")]
        public async Task<ActionResult<UserDto>> RegisterDoctor(Doctor doctor)
        {
            if (await userManager.Users.AnyAsync(x => x.Email == doctor.Email))
            {
                ModelState.AddModelError("email", "Email is taken");
                return ValidationProblem();
            }
            if (await userManager.Users.AnyAsync(x => x.UserName == doctor.UserName))
            {
                ModelState.AddModelError("username", "Username is taken");
                return ValidationProblem();
            }

            Doctor user = new Doctor
            {
                FirstName = doctor.FirstName,
                LastName = doctor.LastName,
                UserName = doctor.UserName,
                Email = doctor.Email,
                PasswordHash = doctor.PasswordHash,
                RegisteredSince = DateTime.Now,
                SpecialtyId = doctor.SpecialtyId,
                PersonalInfo = new PersonalInfo
                {
                    PersonalNumber = doctor.PersonalInfo.PersonalNumber,
                    DateOfBirth = doctor.PersonalInfo.DateOfBirth,
                    Gender = doctor.PersonalInfo.Gender,
                    PhoneNumber = doctor.PersonalInfo.PhoneNumber,
                    Address = doctor.PersonalInfo.Address,
                    CountryId = doctor.PersonalInfo.CountryId,
                    CityId = doctor.PersonalInfo.CityId,
                    NationalityId = doctor.PersonalInfo.NationalityId,
                    MaritalStatus = doctor.PersonalInfo.MaritalStatus,
                }
            };

            var result = await userManager.CreateAsync(user, doctor.PasswordHash);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest("Problem registering user");
        }

        [HttpPut("doctor/{id}")]
        public async Task<IActionResult> EditDoctor(string Id, Doctor newDoctor)
        {
            var existingUser = (Doctor)await userManager.FindByIdAsync(Id);

            if (!newDoctor.Email.Equals(existingUser.Email) && await userManager.FindByEmailAsync(newDoctor.Email) != null)
                return BadRequest("Email exists");
            if (!newDoctor.UserName.Equals(existingUser.UserName) && await userManager.Users.AnyAsync(x => x.UserName == newDoctor.UserName))
                return BadRequest("Username exists");

            PersonalInfo pi = await context.PersonalInfo.FindAsync(newDoctor.PersonalInfoId);
            existingUser.PersonalInfo = pi;

            existingUser.FirstName = newDoctor.FirstName;
            existingUser.LastName = newDoctor.LastName;
            existingUser.UserName = newDoctor.UserName;
            existingUser.Email = newDoctor.Email;
            existingUser.SpecialtyId = newDoctor.SpecialtyId;
            existingUser.PersonalInfo.PersonalNumber = newDoctor.PersonalInfo.PersonalNumber;
            existingUser.PersonalInfo.DateOfBirth = newDoctor.PersonalInfo.DateOfBirth;
            existingUser.PersonalInfo.Gender = newDoctor.PersonalInfo.Gender;
            existingUser.PersonalInfo.PhoneNumber = newDoctor.PersonalInfo.PhoneNumber;
            existingUser.PersonalInfo.Address = newDoctor.PersonalInfo.Address;
            existingUser.PersonalInfo.CountryId = newDoctor.PersonalInfo.CountryId;
            existingUser.PersonalInfo.CityId = newDoctor.PersonalInfo.CityId;
            existingUser.PersonalInfo.NationalityId = newDoctor.PersonalInfo.NationalityId;
            existingUser.PersonalInfo.MaritalStatus = newDoctor.PersonalInfo.MaritalStatus;

            var result = await userManager.UpdateAsync(existingUser);

            if (result.Succeeded)
                return Ok("Doctor updated");

            return BadRequest("Error updating doctor");

        }

        [HttpGet("doctor/{id}")]
        public async Task<ActionResult<Doctor>> GetDoctor(string Id)
        {
            Doctor doctor = (Doctor)await userManager.Users.FirstOrDefaultAsync(x => x.Id == Id);

            if (doctor == null) return null;

            PersonalInfo pi = await context.PersonalInfo.FindAsync(doctor.PersonalInfoId);
            Specialty specialty = await context.Specialty.FindAsync(doctor.SpecialtyId);
            Country country = await context.Country.FindAsync(doctor.PersonalInfo.CountryId);
            Nationality nationality = await context.Nationality.FindAsync(doctor.PersonalInfo.NationalityId);
            City city = await context.Cities.FindAsync(doctor.PersonalInfo.CityId);

            pi.Country = country;
            pi.Nationality = nationality;
            pi.City = city;

            doctor.PersonalInfo = pi;
            doctor.Specialty = specialty;

            return Ok(doctor);
        }

        //patient routes
        [HttpPut("patient/{id}")]
        public async Task<IActionResult> EditPatient(string Id, PatientUser newPatientUser)
        {
            var existingUser = (PatientUser)await userManager.FindByIdAsync(Id);

            if (!newPatientUser.Email.Equals(existingUser.Email) && await userManager.FindByEmailAsync(newPatientUser.Email) != null)
                return BadRequest("Email exists");
            if (!newPatientUser.UserName.Equals(existingUser.UserName) && await userManager.Users.AnyAsync(x => x.UserName == newPatientUser.UserName))
                return BadRequest("Username exists");

            PersonalInfo pi = await context.PersonalInfo.FindAsync(newPatientUser.PersonalInfoId);
            existingUser.PersonalInfo = pi;

            existingUser.FirstName = newPatientUser.FirstName;
            existingUser.LastName = newPatientUser.LastName;
            existingUser.UserName = newPatientUser.UserName;
            existingUser.Email = newPatientUser.Email;
            existingUser.PersonalInfo.PersonalNumber = newPatientUser.PersonalInfo.PersonalNumber;
            existingUser.PersonalInfo.DateOfBirth = newPatientUser.PersonalInfo.DateOfBirth;
            existingUser.PersonalInfo.Gender = newPatientUser.PersonalInfo.Gender;
            existingUser.PersonalInfo.PhoneNumber = newPatientUser.PersonalInfo.PhoneNumber;
            existingUser.PersonalInfo.Address = newPatientUser.PersonalInfo.Address;
            existingUser.PersonalInfo.CountryId = newPatientUser.PersonalInfo.CountryId;
            existingUser.PersonalInfo.CityId = newPatientUser.PersonalInfo.CityId;
            existingUser.PersonalInfo.NationalityId = newPatientUser.PersonalInfo.NationalityId;
            existingUser.PersonalInfo.MaritalStatus = newPatientUser.PersonalInfo.MaritalStatus;

            var result = await userManager.UpdateAsync(existingUser);

            if (result.Succeeded)
                return Ok("Patient updated");

            return BadRequest("Error updating Patient");

        }

        [HttpGet("patient/{id}")]
        public async Task<ActionResult<Patient>> GetPatient(string Id)
        {
            PatientUser patient = (PatientUser)await userManager.Users.FirstOrDefaultAsync(x => x.Id == Id);

            if (patient == null) return null;

            PersonalInfo pi = await context.PersonalInfo.FindAsync(patient.PersonalInfoId);
            Country country = await context.Country.FindAsync(patient.PersonalInfo.CountryId);
            Nationality nationality = await context.Nationality.FindAsync(patient.PersonalInfo.NationalityId);
            City city = await context.Cities.FindAsync(patient.PersonalInfo.CityId);

            pi.Country = country;
            pi.Nationality = nationality;
            pi.City = city;

            patient.PersonalInfo = pi;
            return Ok(patient);
        }

        //[Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Token = tokenService.CreateToken(user),
                Username = user.UserName,
                Role = user.Role
            };
        }

        //[Authorize(Roles = "admin")]
        [HttpGet("all")]
        public async Task<ActionResult<List<AppUser>>> GetAllUsers()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        //[Authorize(Roles = "admin")]
        [HttpGet("user/{id}")]
        public async Task<ActionResult<UserDto>> GetUser(string id)
        {
            var user = await userManager.FindByIdAsync(id);

            return CreateUserObject(user);
        }

        //[Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        //[Authorize(Roles = "admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditUser(string id, UserDto userDto)
        {
            var existingUser = await userManager.FindByIdAsync(id);

            if (!userDto.Email.Equals(existingUser.Email) && await userManager.FindByEmailAsync(userDto.Email) != null)
                return BadRequest("Email exists");
            if (!userDto.Username.Equals(existingUser.UserName) && await userManager.Users.AnyAsync(x => x.UserName == userDto.Username))
                return BadRequest("Username exists");

            existingUser.FirstName = userDto.FirstName;
            existingUser.LastName = userDto.LastName;
            existingUser.UserName = userDto.Username;
            existingUser.Email = userDto.Email;

            var result = await userManager.UpdateAsync(existingUser);

            if (result.Succeeded)
                return Ok("user updated");

            return BadRequest(userDto);
        }

    }
}