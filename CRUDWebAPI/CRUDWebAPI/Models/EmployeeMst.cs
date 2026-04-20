using System.ComponentModel.DataAnnotations;

namespace CRUDWebAPI.Models
{
    public class EmployeeMst
    {
        [Key]
        public int empId { get; set; }
        [Required]
        public string? empName { get; set; }
        [Required,EmailAddress]
        public string? empEmail { get; set; }
        public string? empPassword { get; set; }
    }
}
