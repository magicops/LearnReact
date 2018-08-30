using DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace LearnReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RulesController : ControllerBase
    {
        private readonly TestContext _context;

        public RulesController(TestContext context)
        {
            _context = context;
        }

        // GET: api/Rules
        [HttpGet]
        public IEnumerable<Rule> GetRules()
        {
            return _context.Rules;
        }

        // GET: api/Rules/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRule([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rule = await _context.Rules.FindAsync(id);

            if (rule == null)
            {
                return NotFound();
            }

            return Ok(rule);
        }

        // PUT: api/Rules/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRule([FromRoute] int id, [FromBody] Rule rule)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != rule.Id)
            {
                return BadRequest();
            }

            _context.Entry(rule).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RuleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Rules
        [HttpPost]
        public async Task<IActionResult> PostRule([FromBody] Rule rule)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Rules.Add(rule);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRule", new { id = rule.Id }, rule);
        }

        // DELETE: api/Rules/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRule([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rule = await _context.Rules.FindAsync(id);
            if (rule == null)
            {
                return NotFound();
            }

            _context.Rules.Remove(rule);
            await _context.SaveChangesAsync();

            return Ok(rule);
        }

        private bool RuleExists(int id)
        {
            return _context.Rules.Any(e => e.Id == id);
        }

        // GET: api/Rules/GetToken
        [HttpGet("GetToken")]
        public IActionResult GetToken()
        {
            var claims = new[]
                {
                  new Claim(JwtRegisteredClaimNames.Sub, "jeremy@jeremylikness.com"),
                  new Claim(JwtRegisteredClaimNames.Jti, System.Guid.NewGuid().ToString()),
                };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(Startup.SECRET));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken("http://localhost:44340", //issued by
                "http://localhost:44343", //issued for
                claims, //payload
                expires: System.DateTime.Now.AddMinutes(30), // valid for 1/2 hour
                signingCredentials: creds); // signature

            var tokenEncoded = new JwtSecurityTokenHandler().WriteToken(token);

            return new OkObjectResult(new { token = tokenEncoded });
        }
    }
}