using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Context;
using WebApi.Dtos;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IletisimBilgileriController : ControllerBase
    {
        private readonly AppDbContext _context;

        public IletisimBilgileriController(AppDbContext context)
        {
            _context = context;
            _context.Database.Migrate();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _context.IletisimBilgileri.ToListAsync();
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await _context.IletisimBilgileri.FindAsync(id);
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Add(CreateIletisimBilgileriDto model)
        {

            if (string.IsNullOrEmpty( model.AcikAdres)
                || string.IsNullOrEmpty(model.MagzaAdi)
                || string.IsNullOrEmpty(model.Enlem)
                || string.IsNullOrEmpty(model.Boylam))
                return BadRequest();

            var add = _context.IletisimBilgileri.Add(new Entities.IletisimBilgileri
            {
                AcikAdres = model.AcikAdres,
                Boylam = model.Boylam,
                Enlem = model.Enlem,
                Il = model.Il,
                Ilce = model.Ilce,
                MagzaAdi = model.MagzaAdi,
                Telefon = model.Telefon
            });

            await _context.SaveChangesAsync();

            return Created("", model);
        }
        [HttpPut]
        public async Task<IActionResult> Update(UpdateletisimBilgileriDto model)
        {

            if (string.IsNullOrEmpty(model.AcikAdres)
                || string.IsNullOrEmpty(model.MagzaAdi)
                || string.IsNullOrEmpty(model.Enlem)
                || string.IsNullOrEmpty(model.Boylam))
                return BadRequest();

            var add = _context.IletisimBilgileri.Update(new Entities.IletisimBilgileri
            {
                Id=model.Id,
                AcikAdres = model.AcikAdres,
                Boylam = model.Boylam,
                Enlem = model.Enlem,
                Il = model.Il,
                Ilce = model.Ilce,
                MagzaAdi = model.MagzaAdi,
                Telefon = model.Telefon
            });

            await _context.SaveChangesAsync();

            return Created("", model);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var data = await _context.IletisimBilgileri.FindAsync(id);
            _context.IletisimBilgileri.Remove(data);
            await _context.SaveChangesAsync();
            return Ok(data);
        }
    }
}
