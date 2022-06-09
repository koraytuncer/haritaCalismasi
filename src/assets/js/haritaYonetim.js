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
    $("#magazaForm")[0].reset();
  });

  marker.addTo(map);
});

//Api ile il verilerinin çekilmesi
var ilApi = "https://localhost:44377/api/IletisimBilgileri/Il";

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

//Api ile ilçe verilerinin çekilmesi
$("#yonetimIl").on("change", function () {
  var ilId = $(this).val();
  var ilceApi = "https://localhost:44377/api/IletisimBilgileri/Ilce/" + ilId;

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
  // var ilceAd = $("#yonetimIlce :selected").text()
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
        $("#magazaForm")[0].reset()
        location.reload();
        toastr["success"]("Kayıt İşlemi Başarılı");
      })
      .fail(function (xhr) {
        console.error(xhr);
      });
  }
});

//Datatable Listeleme
  $.ajax({
    url: "https://localhost:44377/api/IletisimBilgileri",
    method: "GET",
  })
    .done(function (data) {
      $("#magazaListele").DataTable({
        language: {
          url: "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Turkish.json",
        },
        data: data,
        columns: [{ data: "id" }, { data: "il" }, { data: "ilce" }, { data: "magzaAdi" }, { data: "acikAdres" }, { data: "telefon" }, { data: "enlem" }, { data: "boylam" }],
        columnDefs: [
          {
            targets: [0, 1, 2, 3, 4, 5, 6, 7],
            className: "text-left",
          },
          {
            targets: [8],
            className: "text-center",
            render: function (data, type, row) {
              return `<button class="btn btn-danger btn-sm" onclick="magazaSil(${row.id})">Sil</button>`;
            },
          },
        ],
      });
     
    })
    .fail(function (xhr) {
      console.error(xhr);
    });

//Silme İşlemleri
function magazaSil(id) {
  $.ajax({
    url: "https://localhost:44377/api/IletisimBilgileri/" + id,
    method: "DELETE",
  })
    .done(function (e) {
      toastr["success"]("Silme İşlemi Başarılı");
      location.reload();
    })
    .fail(function (xhr) {
      console.error(xhr);
    });
}

