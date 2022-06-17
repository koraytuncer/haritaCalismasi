using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using WebApi.Entities;

namespace WebApi.Context
{
    public class AppDbContext:DbContext
    {
        public string DbPath { get; }

        public AppDbContext()
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
           var path =  Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);

            optionsBuilder.UseSqlite($"Data Source ={path}/iletisim.db");
        }


        public DbSet<IletisimBilgileri> IletisimBilgileri { get; set; }
        public DbSet<iller> iller { get; set; }
        public DbSet<ilceler> ilceler { get; set; }
    }
}
