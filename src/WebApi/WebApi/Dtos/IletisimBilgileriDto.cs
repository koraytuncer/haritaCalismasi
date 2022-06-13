using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class IletisimBilgileriDto
    {
        public int Id { get; set; }
        public string Il { get; set; }
        public string Ilce { get; set; }
        public int IlId { get; set; }
        public int IlceId { get; set; }
        public string MagzaAdi { get; set; }
        public string AcikAdres { get; set; }
        public string Telefon { get; set; }
        public string Enlem { get; set; }
        public string Boylam { get; set; }
    }
}
