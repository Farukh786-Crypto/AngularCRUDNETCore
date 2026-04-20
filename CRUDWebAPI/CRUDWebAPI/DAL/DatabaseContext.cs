using CRUDWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CRUDWebAPI.DAL
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options):base(options)
        {
        }
        public DbSet<EmployeeMst> employees { get; set; }
    }
    
}
