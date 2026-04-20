using CRUDWebAPI.DAL;
using CRUDWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUDWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public EmployeesController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet("GetEmployeeList")]
        public async Task<IActionResult> GetEmployeeList()
        {
            if(ModelState.IsValid)
            {
                var empList = await _context.employees.AsNoTracking().ToListAsync();
                return Ok(empList);
            }
            return BadRequest(ModelState);
          
        }

        [HttpGet("GetEmployeeListById/{id:int}")]
        public async Task<IActionResult>  GetEmployeeListById(int id)
        {
            if (ModelState.IsValid)
            {
                var empId = await _context.employees.FirstOrDefaultAsync(a => a.empId == id);
                if (empId == null)
                {
                    return BadRequest();
                }
                return Ok(empId);
            }
            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody]EmployeeMst employee)
        {
            if (ModelState.IsValid)
            {
                await _context.employees.AddAsync(employee);
                await _context.SaveChangesAsync(); // Save all changes in database
                return Ok(employee);
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateEmployee([FromBody]EmployeeMst employee)
        {
            if (ModelState.IsValid)
            {
                var empData = _context.employees.FirstOrDefault(s=>s.empId == employee.empId);
                if(empData == null)
                {
                    return NotFound("Employee Not Found");
                }
                empData.empName = employee.empName;
                empData.empPassword = employee.empPassword;
                empData.empEmail = employee.empEmail;

                await _context.SaveChangesAsync();
                return Ok(employee);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{empId:int}")]
        public async Task<IActionResult> DeleteEmployee(int empId)
        {
            if (ModelState.IsValid)
            {
                var empData = await _context.employees.FirstOrDefaultAsync(e => e.empId == empId);
                if (empData == null)
                {
                    return NotFound("Employee Not Found");
                }

                _context.employees.Remove(empData);
                await _context.SaveChangesAsync();
                return Ok();
            }
            return BadRequest(ModelState);    
        }
    }
}
