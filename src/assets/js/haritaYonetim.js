let map = L.map("map").setView([39.2, 32.2], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

let marker;

map.on("click", function mapClickListen(e) {
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

  var pos = e.latlng;
  var marker = L.marker(pos);

  marker.on("click", function (e) {
    map.removeLayer(marker);
    $("#magazaForm")[0].reset();
  });

  marker.addTo(map);
});

let ilApi = "https://localhost:44377/api/IletisimBilgileri/Il";
let ilceApi = "https://localhost:44377/api/IletisimBilgileri/Ilce/";
let magazaApi = "https://localhost:44377/api/IletisimBilgileri/";

//Fonksiyonlar
function illeriGetir() {
  $.ajax({
    url: ilApi,
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
function ilceleriGetir(api) {
  $("#yonetimIl").on("change", function () {
    let ilId = $(this).val();
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
      toastr["success"]("Kayıt İşlemi Başarılı");
      $("#magazaListele").html("");
      magazaListele();
    })
    .fail(function (xhr) {
      console.error(xhr);
    });
}
function veriSil(id) {
  $.ajax({
    url: "https://localhost:44377/api/IletisimBilgileri/" + id,
    method: "DELETE",
  })
    .done(function (data) {
      toastr["success"]("Silme İşlemi Başarılı");
      $("#magazaListele").html("");
      magazaListele();
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
      magazaListele(data);
    })
    .fail(function (xhr) {
      console.error(xhr);
    });
}

//Fonksiyonları Çağırma
illeriGetir(ilApi);
ilceleriGetir(ilceApi);
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
function magazaListele() {
  fetch("https://localhost:44377/api/IletisimBilgileri")
    .then((res) => res.json())
    .then((res) => {
      res.forEach((element) => {
        $("#magazaListele").append(`
    <tr>
    <th scope="row">${element.id}</th>
    <td>${element.il}</td>
    <td>${element.ilce}</td>
    <td>${element.magzaAdi}</td>
    <td>${element.acikAdres}</td>
    <td>${element.telefon}</td>
    <td>${element.enlem}</td>
    <td>${element.boylam}</td>
    <td>
    <button class="btn btn-sm btn-success" onclick="veriSil(${element.id})">Sil</button>
    <a onclick="" class="btn btn-success">Düzenle</a>
    </td>
    </tr>
    
    `);
      });
    });
}
//Datatable Listeleme
