using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Entities
{
    public class iller
    {
        public int id { get; set; }
        [MaxLength(30)]
        public string sehiradi { get; set; }
    }

   public class ilceler
    {
        public int id { get; set; }
        [MaxLength(30)]
        public string ilceadi { get; set; }
        public int sehirid { get; set; }
    }
}
