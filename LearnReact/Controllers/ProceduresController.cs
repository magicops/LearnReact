using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataAccess;

namespace LearnReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public class ProceduresController : ControllerBase
    {
        private readonly TestContext _context;

        public ProceduresController(TestContext context)
        {
            _context = context;
        }

        // GET: api/Procedures
        [HttpGet]
        public IEnumerable<Procedure> GetProcedures()
        {
            return _context.Procedures;
        }

        // GET: api/Procedures/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProcedure([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Procedure = await _context.Procedures.FindAsync(id);

            if (Procedure == null)
            {
                return NotFound();
            }

            return Ok(Procedure);
        }

        // PUT: api/Procedures/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProcedure([FromRoute] int id, [FromBody] Procedure Procedure)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != Procedure.Id)
            {
                return BadRequest();
            }

            _context.Entry(Procedure).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProcedureExists(id))
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

        // POST: api/Procedures
        [HttpPost]
        public async Task<IActionResult> PostProcedure([FromBody] Procedure Procedure)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Procedures.Add(Procedure);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProcedure", new { id = Procedure.Id }, Procedure);
        }

        // DELETE: api/Procedures/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProcedure([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Procedure = await _context.Procedures.FindAsync(id);
            if (Procedure == null)
            {
                return NotFound();
            }

            _context.Procedures.Remove(Procedure);
            await _context.SaveChangesAsync();

            return Ok(Procedure);
        }

        private bool ProcedureExists(int id)
        {
            return _context.Procedures.Any(e => e.Id == id);
        }
    }
}