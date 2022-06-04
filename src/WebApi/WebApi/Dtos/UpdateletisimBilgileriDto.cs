using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public record UpdateletisimBilgileriDto:CreateIletisimBilgileriDto
    {
        public int Id { get; set; }
    }
}
