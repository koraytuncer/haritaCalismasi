﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApi.Context;

namespace WebApi.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20220605112149_add-iller")]
    partial class addiller
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.17");

            modelBuilder.Entity("WebApi.Entities.IletisimBilgileri", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AcikAdres")
                        .HasColumnType("TEXT");

                    b.Property<string>("Boylam")
                        .HasColumnType("TEXT");

                    b.Property<string>("Enlem")
                        .HasColumnType("TEXT");

                    b.Property<int>("Il")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Ilce")
                        .HasColumnType("INTEGER");

                    b.Property<string>("MagzaAdi")
                        .HasColumnType("TEXT");

                    b.Property<string>("Telefon")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("IletisimBilgileri");
                });

            modelBuilder.Entity("WebApi.Entities.iller", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("sehiradi")
                        .HasColumnType("TEXT");

                    b.HasKey("id");

                    b.ToTable("iller");

                    b
                        .HasAnnotation("Relational:SqlQuery", "INSERT INTO iller\r\n(\r\n  sehiradi\r\n)\r\nVALUES\r\n('ADANA'),\r\n('ADIYAMAN'),\r\n('AFYON'),\r\n('AĞRI'),\r\n('AMASYA'),\r\n('ANKARA'),\r\n('ANTALYA'),\r\n('ARTVİN'),\r\n('AYDIN'),\r\n('BALIKESİR'),\r\n('BİLECİK'),\r\n('BİNGÖL'),\r\n('BİTLİS'),\r\n('BOLU'),\r\n('BURDUR'),\r\n('BURSA'),\r\n('ÇANAKKALE'),\r\n('ÇANKIRI'),\r\n('ÇORUM'),\r\n('DENİZLİ'),\r\n('DİYARBAKIR'),\r\n('EDİRNE'),\r\n('ELAZIĞ'),\r\n('ERZİNCAN'),\r\n('ERZURUM'),\r\n('ESKİŞEHİR'),\r\n('GAZİANTEP'),\r\n('GİRESUN'),\r\n('GÜMÜŞHANE'),\r\n('HAKKARİ'),\r\n('HATAY'),\r\n('ISPARTA'),\r\n('İÇEL'),\r\n('İSTANBUL'),\r\n('İZMİR'),\r\n('KARS'),\r\n('KASTAMONU'),\r\n('KAYSERİ'),\r\n('KIRKLARELİ'),\r\n('KIRŞEHİR'),\r\n('KOCAELİ'),\r\n('KONYA'),\r\n('KÜTAHYA'),\r\n('MALATYA'),\r\n('MANİSA'),\r\n('KAHRAMANMARAŞ'),\r\n('MARDİN'),\r\n('MUĞLA'),\r\n('MUŞ'),\r\n('NEVŞEHİR'),\r\n('NİĞDE'),\r\n('ORDU'),\r\n('RİZE'),\r\n('SAKARYA'),\r\n('SAMSUN'),\r\n('SİİRT'),\r\n('SİNOP'),\r\n('SİVAS'),\r\n('TEKİRDAĞ'),\r\n('TOKAT'),\r\n('TRABZON'),\r\n('TUNCELİ'),\r\n('ŞANLIURFA'),\r\n('UŞAK'),\r\n('VAN'),\r\n('YOZGAT'),\r\n('ZONGULDAK'),\r\n('AKSARAY'),\r\n('BAYBURT'),\r\n('KARAMAN'),\r\n('KIRIKKALE'),\r\n('BATMAN'),\r\n('ŞIRNAK'),\r\n('BARTIN'),\r\n('ARDAHAN'),\r\n('IĞDIR'),\r\n('YALOVA'),\r\n('KARABÜK'),\r\n('KİLİS'),\r\n('OSMANİYE'),\r\n('DÜZCE');");
                });
#pragma warning restore 612, 618
        }
    }
}