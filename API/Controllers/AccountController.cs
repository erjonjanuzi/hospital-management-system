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
        
        [HttpPost("admin/register")]
        public async Task<ActionResult<UserDto>> Register(Admin admin)
        {
            if (await userManager.Users.AnyAsync(x => x.Email == admin.Email))
            {
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            }
            if (await userManager.Users.AnyAsync(x => x.UserName == admin.UserName))
            {
                ModelState.AddModelError("username", "Username taken");
                return ValidationProblem();
            }

            Admin user = new Admin {
                FirstName = admin.FirstName,
                LastName = admin.LastName,
                UserName = admin.UserName,
                Email = admin.Email,
                PasswordHash = admin.PasswordHash,
                RegisteredSince = DateTime.Now
            };

            var result = await userManager.CreateAsync(user, admin.PasswordHash);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest("Problem registering user");
        }


        [Authorize]
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

        // Add Authorization later for all below
        [HttpGet("all")]
        public async Task<ActionResult<List<AppUser>>> GetAllUsers()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("user/{id}")]
        public async Task<ActionResult<AppUser>> GetUser(string id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> EditUser(string id, [FromBody] UpdateDto updateDto)
        {
            var existingUser = await userManager.FindByIdAsync(id);

            if (await userManager.FindByEmailAsync(updateDto.Email) != null)
                return BadRequest("email exists");

            existingUser.FirstName = updateDto.FirstName;
            existingUser.LastName = updateDto.LastName;
            if (updateDto.Username != null)
                existingUser.UserName = updateDto.Username;
            existingUser.Email = updateDto.Email;

            var result = await userManager.UpdateAsync(existingUser);

            if (result.Succeeded)
                return Ok("user updated");
            
            return BadRequest(updateDto);
        }

    }
}