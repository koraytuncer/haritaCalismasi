using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Entities;

namespace WebApi.Context
{
    public class AppDbContext:DbContext
    {
        public string DbPath { get; }

        public AppDbContext()
        {
            DbPath = "iletisim.db";
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite($"Data Source={DbPath}");
        }


        public DbSet<IletisimBilgileri> IletisimBilgileri { get; set; }
        public DbSet<iller> iller { get; set; }
        public DbSet<ilceler> ilceler { get; set; }
    }
}
