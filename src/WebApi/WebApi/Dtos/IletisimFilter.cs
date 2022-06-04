using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class IletisimFilter
    {
        public string MagzaAdi { get; set; }
        public int? Il { get; set; }
        public int? Ilce { get; set; }
    }
}
