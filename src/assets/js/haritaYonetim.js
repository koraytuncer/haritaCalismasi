var map = L.map("map").setView([39.2, 32.2], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);


map.on("click", function mapClickListen(e) {
  var pos = e.latlng;

  $.ajax({
    method: "POST",
    url: `https://nominatim.openstreetmap.org/reverse.php?lat=${e.latlng.lat}&lon=${e.latlng.lng}&zoom=18&format=jsonv2`,
    type: "json",
  }).done(function (response, statusText, jqXHR) {
    var adres = response.display_name;
    var enlem = response.lat;
    var boylam = response.lon;

    document.getElementById("acikAdres").value = adres;
    document.getElementById("enlem").value = enlem;
    document.getElementById("boylam").value = boylam;
  });

  var marker = L.marker(pos);

  marker.on("click", function (e) {
    map.removeLayer(marker);
  });
  marker.addTo(map);
});


