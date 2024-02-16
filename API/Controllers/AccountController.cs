using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly TokenService _tokenService;
    public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
    {
        _tokenService = tokenService;
        _userManager = userManager;
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<ActionResult<UserDto>> LoginAsync(LoginDto login)
    {
        var user = await _userManager.FindByEmailAsync(login.Email);
        if (user is null)
            return Unauthorized();

        var result = await _userManager.CheckPasswordAsync(user, login.Password);
        if (result)
            return new UserDto()
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = _tokenService.CreateToken(user),
                UserName = user.UserName
            };

        return Unauthorized();
    }

    [AllowAnonymous]
    [HttpPost("Register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto register)
    {
        if (await _userManager.Users.AnyAsync(x => x.UserName == register.Username))
        {
            ModelState.AddModelError("username","UserName is already taken");
            return ValidationProblem(ModelState);
        }
        if (await _userManager.Users.AnyAsync(x => x.Email == register.Email))
        {
            ModelState.AddModelError("email","email is already taken");
            return ValidationProblem(ModelState);
        }
        var user = new AppUser
        {
            Email = register.Email,
            UserName = register.Username,
            DisplayName = register.DisplayName,

        };
        var result = await _userManager.CreateAsync(user, register.Password);
        if (result.Succeeded)
            return CreateUserObject(user);

        return BadRequest(result.Errors);
    }

    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
        return CreateUserObject(user);
    }

    private UserDto CreateUserObject(AppUser user)
    {
        return new UserDto
        {
            DisplayName = user.DisplayName,
            Image = null,
            Token = _tokenService.CreateToken(user),
            UserName = user.UserName
        };
    }
}
