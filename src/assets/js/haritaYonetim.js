var map = L.map("map").setView([39.2, 32.2], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

var marker;

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
  });
  marker.addTo(map);
});

//Api ile il verilerinin çekilmesi
let ilApi = "https://localhost:44377/api/IletisimBilgileri/Il";

$.ajax({
  url: ilApi,
  method: "GET",
})
  .done(function (data) {
    //İllerin Listelenmesi
    $("#yonetimIl").empty();
    $("#yonetimIl").append('<option value="0">İl Seçiniz</option>');
    Listele()

    $.each(data, function () {
      $("#yonetimIl").append('<option value="' + this.id + '">' + this.sehiradi + "</option>");
    });
  })
  .fail(function (xhr) {
    console.error(xhr);
  });

//Api ile ilçe verilerinin çekilmesi
$("#yonetimIl").on("change", function () {
  let ilId = $(this).val();
  let ilceApi = "https://localhost:44377/api/IletisimBilgileri/Ilce/" + ilId;

  $.ajax({
    url: ilceApi,
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

//Verilerin Gönderilmesi
$("#kaydetBtn").on("click", function () {
  var ilceId = $("#yonetimIlce").val();
  var ilId = $("#yonetimIl").val();
  var magzaAdi = $("#mazagaAdi").val();
  var acikAdres = $("#acikAdres").val();
  var telefon = $("#telefon").val();
  var enlem = $("#enlem").val();
  var boylam = $("#boylam").val();

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
    var data = JSON.stringify({
      il: ilId,
      ilce: ilceId,
      magzaAdi: magzaAdi,
      acikAdres: acikAdres,
      telefon: telefon,
      enlem: enlem,
      boylam: boylam,
    });

    $.ajax({
      url: "https://localhost:44377/api/IletisimBilgileri",
      method: "POST",
      contentType: "application/json",
      dataType: "json",
      data: data,
    })
      .done(function (e) {
        $("#magazaForm")[0].reset();
        toastr["success"]("Kayıt İşlemi Başarılı");
      })
      .fail(function (xhr) {
        console.error(xhr);
      });
  }
});

//Datatable Listeleme
function Listele() {
  $.ajax({
    url: "https://localhost:44377/api/IletisimBilgileri",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
  }).done(function (data) {
    data.forEach((data) => {
      
      $("#magazaListele").append(`
    
    <tr>
      <td scope="row">${data.id}</td>
      <td>${data.il}</td>
      <td>${data.ilce}</td>
      <td>${data.magzaAdi}</td>
      <td>${data.acikAdres}</td>
      <td>${data.telefon}</td>
      <td>${data.enlem}</td>
      <td>${data.boylam}</td>
      <td style="width:120px ;">   
         <a href="" type="button" class="btn btn-success">
             <i class="bi bi-pencil-square"></i>
         </a>
         <a href="" type="button" class="btn btn-danger">
             <i class="bi bi-trash"></i>
         </a>
      </td>
  </tr>   
    
    `);
    });
  });
};
