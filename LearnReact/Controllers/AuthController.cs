using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace LearnReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public class TokenRequest
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        // GET: api/Rules/Login
        [AllowAnonymous]
        [HttpPost("Login")]
        public IActionResult login([FromBody] TokenRequest request)
        {
            if (request.Username == "user" && request.Password == "123")
            {
                var claims = new[]
                {
                    new Claim(ClaimTypes.Name, request.Username)
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(Startup.SECRET));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

                var token = new JwtSecurityToken(
                    issuer: Startup.DOMAIN,
                    audience: Startup.DOMAIN,
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }

            return BadRequest("Could not verify username and password");
        }
    }
}