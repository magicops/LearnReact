using System;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    public class TestContext : DbContext
    {
        public TestContext(DbContextOptions<TestContext> options)
           : base(options)
        { }

        public DbSet<Department> Departments { get; set; }
        public DbSet<Action> Actions { get; set; }
        public DbSet<Inspection> Inspections { get; set; }
        public DbSet<Rule> Rules { get; set; }
        public DbSet<Stage> Stages { get; set; }
    }
}
