using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Entities
{
    public class IletisimBilgileri
    {
        public int Id { get; set; }
        public int Il { get; set; }
        public int Ilce { get; set; }
        public string MagzaAdi { get; set; }
        public string AcikAdres { get; set; }
        public string Telefon { get; set; }
        public string Enlem { get; set; }
        public string Boylam { get; set; }

    }
}
