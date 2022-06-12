let map = L.map("map").setView([39.2, 32.2], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

var marker = null;
map.on("click", function mapClickListen(e) {
  if (marker !== null) {
    map.removeLayer(marker);
  }
  marker = L.marker(e.latlng).addTo(map);

  $.ajax({
    method: "POST",
    url: `https://nominatim.openstreetmap.org/reverse.php?lat=${e.latlng.lat}&lon=${e.latlng.lng}&zoom=18&format=jsonv2`,
    type: "json",
  }).done(function (response) {
    var adres = response.display_name;
    var enlem = e.latlng.lat;
    var boylam = e.latlng.lng;

    $("#acikAdres").val(adres);
    $("#enlem").val(enlem);
    $("#boylam").val(boylam);
  });
});

let ilApi = "https://localhost:44377/api/IletisimBilgileri/Il";
let ilceApi = "https://localhost:44377/api/IletisimBilgileri/Ilce/";
let magazaApi = "https://localhost:44377/api/IletisimBilgileri/";

//Api Fonksiyonlar
function illeriGetir(api) {
  $.ajax({
    url: api,
    method: "GET",
  })
    .done(function (data) {
      //İllerin Listelenmesi
      $("#yonetimIl").empty();
      $("#yonetimIl").append('<option value="0">İl Seçiniz</option>');
      $.each(data, function () {
        $("#yonetimIl").append('<option value="' + this.id + '">' + this.sehiradi + "</option>");
      });
    })
    .fail(function (xhr) {
      console.error(xhr);
    });
}
function ilceleriGetir(api, ilId) {
  $.ajax({
    url: api + ilId,
    method: "GET",
  })
    .done(function (data) {
      $("#yonetimIlce").empty();
      $("#yonetimIlce").append('<option value="0">İlçe Seçiniz</option>');
      $.each(data, function () {
        $("#yonetimIlce").append('<option value="' + this.id + '">' + this.ilceadi + "</option>");
      });
    })
    .fail(function (xhr) {
      console.error(xhr);
    });
}
function veriGonder(api, data) {
  $.ajax({
    url: api,
    method: "POST",
    contentType: "application/json",
    dataType: "json",
    data: data,
  })
    .done(function (e) {
      $("#magazaForm")[0].reset();
      map.removeLayer(marker);
      toastr["success"]("Kayıt İşlemi Başarılı");
      $("#magazaListele").html("");
      magazaListele(magazaApi);
    })
    .fail(function (xhr) {
      console.error(xhr);
    });
}
function veriGuncelle(id) {
  $.ajax({
    url: magazaApi + id,
    method: "GET",
  })
    .done(function (data) {
      if (marker !== null) {
        map.removeLayer(marker);
      }
      marker = L.marker([data.enlem, data.boylam]).addTo(map);
      map.setView([data.enlem, data.boylam], 10);
      ilceleriGetir(ilceApi, data.il);

      $("#yonetimIl").val(data.il);
      $("#yonetimIlce").val(data.ilce);
      $("#mazagaAdi").val(data.magzaAdi);
      $("#acikAdres").val(data.acikAdres);
      $("#telefon").val(data.telefon);
      $("#enlem").val(data.enlem);
      $("#boylam").val(data.enlem);
    })
    .fail(function (xhr) {
      console.error(xhr);
    });

  // let data = {
  //   id: id,
  //   magzaAdi:magzaAdi,
  //   acikAdres: acikAdres,
  //   enlem: enlem,
  //   boylam: boylam,
  //   ilId: ilId,
  //   ilceId: ilceId,
  //   telefon: telefon
  // };
  // $.ajax({
  //   url: magazaApi + id,
  //   method: "PUT",
  //   contentType: "application/json",
  //   dataType: "json",
  //   data: JSON.stringify(data),
  // })
  //   .done(function (e) {
  //     $("#magazaForm")[0].reset();
  //     toastr["success"]("Güncelleme İşlemi Başarılı");
  //     $("#magazaListele").html("");
  //     magazaListele();
  //   })
  //   .fail(function (xhr) {
  //     console.error(xhr);
  //   });
}
function veriSil(id, api) {
  $.ajax({
    url: api + id,
    method: "DELETE",
  })
    .done(function (data) {
      toastr["success"]("Silme İşlemi Başarılı");
      $("#magazaListele").html("");
      //map.removeLayer(marker);
      magazaListele(magazaApi);
    })
    .fail(function (xhr) {
      console.error(xhr);
    });
}
function datatableListele(api) {
  $.ajax({
    url: api,
    method: "GET",
  })
    .done(function (data) {
      magazaListele(api);
    })
    .fail(function (xhr) {
      console.error(xhr);
    });
}

//Fonksiyonları Çağırma
illeriGetir(ilApi);
datatableListele(magazaApi);

//Verilerin Veritabanına gönderilmesi
$("#kaydetBtn").on("click", function () {
  let ilceId = $("#yonetimIlce").val();
  let ilId = $("#yonetimIl").val();
  let magzaAdi = $("#mazagaAdi").val();
  let acikAdres = $("#acikAdres").val();
  let telefon = $("#telefon").val();
  let enlem = $("#enlem").val();
  let boylam = $("#boylam").val();

  //Validation Kontrolleri
  if (ilId == 0) {
    toastr["warning"]("Lütfen İl Seçiniz");
    return;
  } else if (ilceId == 0) {
    toastr["warning"]("Lütfen İlçe Seçiniz");
    return;
  } else if (magzaAdi == "") {
    toastr["warning"]("Lütfen Mağaza Adı Giriniz");
    return;
  } else if (acikAdres == "") {
    toastr["warning"]("Lütfen Açık Adres Giriniz");
    return;
  } else if (telefon == "") {
    toastr["warning"]("Lütfen Telefon Numarası Giriniz");
    return;
  } else if (enlem == "") {
    toastr["warning"]("Lütfen Enlem Giriniz");
    return;
  } else if (boylam == "") {
    toastr["warning"]("Lütfen Boylam Giriniz");
    return;
  } else {
    let data = JSON.stringify({
      il: ilId,
      ilce: ilceId,
      magzaAdi: magzaAdi,
      acikAdres: acikAdres,
      telefon: telefon,
      enlem: enlem,
      boylam: boylam,
    });

    veriGonder(magazaApi, data);
  }
});

//Veri Listeleme Fonksiyonu
function magazaListele(api) {
  fetch(api)
    .then((res) => res.json())
    .then((res) => {
      if (res.length > 0) {
        res.forEach((element) => {
          $("#magazaListele").append(`
      <tr>
      <th scope="row">${element.id}</th>
      <td>${element.il}</td>
      <td>${element.ilce}</td>
      <td>${element.magzaAdi}</td>
      <td>${element.acikAdres}</td>
      <td>${element.telefon}</td>
      <td>${parseFloat(element.enlem).toFixed(6)}</td>
      <td>${parseFloat(element.boylam).toFixed(6)}</td>
      <td>
      <button type="button" class="btn btn-sm btn-outline-success" onclick="veriGuncelle(${element.id})">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
                    <span class="visually-hidden">Button</span>
               
                  </button>
           
           <button type="button" class="btn btn-outline-danger btn-sm" onclick="veriSil(${element.id},magazaApi)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                    </svg>
                    <span class="visually-hidden">Button</span>
                  </button>
           
      </td>
      </tr>
      
      `);
        });
      } else {
        $(".tableAlani").append(`
      <p><h6 class="text-center">Mağaza Bulunamadı</h6> </p>
      `);
      }
    });
}
//İlçeleri Listeleme
$("#yonetimIl").on("change", function () {
  let ilId = $(this).val();
  ilceleriGetir(ilceApi, ilId);
});

$("select").on("change", function () {
  let ilKor = $("#yonetimIl option:selected").text();
  let ilceKor = $("#yonetimIlce option:selected").text();
  fetch(`https://nominatim.openstreetmap.org/search.php?q=${ilKor}+${ilceKor}&format=jsonv2`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        map.setView([data[0].lat, data[0].lon], 12);
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
