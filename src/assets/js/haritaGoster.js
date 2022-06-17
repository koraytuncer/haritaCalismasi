var map = L.map("haritaGoster").setView([39.2, 32.2], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

//Api ile verilerin çekilmesi
let api = "https://localhost:5001/api/IletisimBilgileri";
let filtreleApi = "https://localhost:5001/api/IletisimBilgileri/Filter";

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
                    <i class="bi bi-telephone-fill"></i>
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
        map.setView([hrt.enlem, hrt.boylam], 12);
      });
    });

    uniqueIl = data.filter(
      (
        (set) => (f) =>
          !set.has(f.il) && set.add(f.il)
      )(new Set())
    );

    //İllerin Listelenmesi
    $("#haritaIl").empty();
    $("#haritaIl").append('<option value="0">İl Seçiniz</option>');

    $.each(uniqueIl, function () {
      $("#haritaIl").append(
        '<option value="' + this.id + '">' + this.il + "</option>"
      );
    });

    //İl filtreleme

    $("#haritaIl").on("change", function (event) {
      let ilKor = $("#haritaIl option:selected").text();

      for (let i = 0; i < data.length; i++) {
        if (ilKor === data[i].il) {
          map.setView([data[i].enlem, data[i].boylam], 8);
        }
      }

      const ilceFilter = data.filter((ilce) => {
        return ilce.il === ilKor ? ilce : "";
      });
      $("#haritaIlce").on("change", function (event) {
        var ilceKor = $("#haritaIlce option:selected").text();
        if (ilceKor) {
          for (let i = 0; i < ilceFilter.length; i++) {
            if (ilceKor === ilceFilter[i].ilce) {
              map.setView([ilceFilter[i].enlem, ilceFilter[i].boylam], 13);
            }
          }
        }
      });

      console.log(ilceFilter);
      // uniqueIlce = data.filter(
      //   (
      //     (set) => (f) =>
      //       !set.has(f.ilce) && set.add(f.ilce)
      //   )(new Set())
      // );
      //İlçelerin Listelenmesi
      $("#haritaIlce").empty();
      $("#haritaIlce").append('<option value="0">İlçe Seçiniz</option>');
      $.each(ilceFilter, function () {
        $("#haritaIlce").append(
          '<option value="' + this.id + '">' + this.ilce + "</option>"
        );
      });
    });
  })
  .fail(function (xhr) {
    console.error(xhr);
  });


  $(document).ready(function() {
    $('.select2').select2();
  });