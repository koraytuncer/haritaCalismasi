var map = L.map('map').setView([39.2, 32.2], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);



map.on("click",function(e){
    L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

    var xmlhttp = new XMLHttpRequest();
    var url = `https://nominatim.openstreetmap.org/reverse.php?lat=${e.latlng.lat}&lon=${e.latlng.lng}&zoom=18&format=jsonv2`;
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            
            document.getElementById('acikAdres').value = `${myArr.display_name}`;
            document.getElementById('enlem').value = `${myArr.lat}`;
            document.getElementById('boylam').value = `${myArr.lon}`;

           
        }
      
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    
    
})

