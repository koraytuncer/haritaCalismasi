var map = L.map("haritaGoster").setView([39.2, 32.2], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

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


//Api ile verilerin çekilmesi
let api = "https://localhost:44377/api/IletisimBilgileri";

$.ajax({
  url: api,
  method: "GET",
})
  .done(function (data) {
    data.forEach((hrt, index) => {
      //Sonuc Alanina cardların eklenmesi
      $("#sonucAlani").append(`
            <div id="cardLink${index}" class="card sonucEleman">
            <div class="card-body">
                <span class="magazaAdi">${hrt.magzaAdi}</span>
                <div class="row">
                    <div class="col-12 align-self-center mt-2">
                        <span class="magazaAdres">${hrt.acikAdres}</span>
                    </div>
                    <div class="col-12 align-self-center mt-2">
                        <span class="magazaTelefon">${hrt.telefon}</span>
                    </div>
                </div>
                <div class="d-flex align-items-center mt-3">
                    <a href="http://maps.google.com/maps?q=${hrt.enlem},${hrt.boylam}" target="_blank"
                        class="btn btn-outline-dark">Yol Tarifi</a>
                </div>
            </div>
        </div>
            
            `);

      //Harita açıldığında markerlerin eklenmesi
      var marker = L.marker([hrt.enlem, hrt.boylam]).addTo(map);
      marker.bindPopup(hrt.magzaAdi + "<br/>" + hrt.acikAdres);

      //Mağazalara Zoom işlemi
      $("#cardLink" + index).click(function () {
        map.setView([hrt.enlem, hrt.boylam], 15);
      });
    });
  })
  .fail(function (xhr) {
    console.error(xhr);
  });

//Api ile il verilerinin çekilmesi
let ilApi = "https://localhost:44377/api/IletisimBilgileri/Il";

$.ajax({
  url: ilApi,
  method: "GET",
})
  .done(function (data) {
    //İllerin Listelenmesi
    $("#haritaIl").empty();
    $("#haritaIl").append('<option value="0">İl Seçiniz</option>');

    $.each(data, function () {
      $("#haritaIl").append('<option value="' + this.id + '">' + this.sehiradi + "</option>");
    });
  })
  .fail(function (xhr) {
    console.error(xhr);
  });

//Api ile ilçe verilerinin çekilmesi
$("#haritaIl").on("change", function () {
  let ilId = $(this).val();
  let ilceApi = "https://localhost:44377/api/IletisimBilgileri/Ilce/" + ilId;

  $.ajax({
    url: ilceApi,
    method: "GET",
  })
    .done(function (data) {
      $("#haritaIlce").empty();
      $("#haritaIlce").append('<option value="0">İlçe Seçiniz</option>');
      $.each(data, function () {
        $("#haritaIlce").append('<option value="' + this.id + '">' + this.ilceadi + "</option>");
      });
    })
    .fail(function (xhr) {
      console.error(xhr);
    });
});
