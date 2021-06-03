using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTO;
using API.Services;
using Application.Accounts;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            this.tokenService = tokenService;
            this.signInManager = signInManager;
            this.userManager = userManager;
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
            } else if (registerDto.Role.ToLower().Equals("doctor"))
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
            } else if (registerDto.Role.ToLower().Equals("patient"))
            {
                user = new PatientUser
                {
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                    PasswordHash = registerDto.PasswordHash,
                    RegisteredSince = DateTime.Now,
                    Diagnosis = null
                };
            }

            var result = await userManager.CreateAsync(user, registerDto.PasswordHash);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest("Problem registering user");
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
        public async Task<ActionResult<AppUser>> GetUser(string id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
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