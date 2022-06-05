new Autocomplete("search", {
    selectFirst: true,
    insertToInput: true,
    cache: true,
    howManyCharacters: 2,
    // onSearch
    onSearch: ({ currentValue }) => {
      // api
      const api = `https://nominatim.openstreetmap.org/search?format=geojson&limit=5&city=${encodeURI(currentValue)}`;

      
  
      // You can also use static files
      // const api = './search.json'
  
      /**
       * jquery
       * If you want to use jquery you have to add the
       * jquery library to head html
       * https://cdnjs.com/libraries/jquery
       */
      // return $.ajax({
      //   url: api,
      //   method: 'GET',
      // })
      //   .done(function (data) {
      //     return data
      //   })
      //   .fail(function (xhr) {
      //     console.error(xhr);
      //   });
  
      // OR ----------------------------------
  
      /**
       * axios
       * If you want to use axios you have to add the
       * axios library to head html
       * https://cdnjs.com/libraries/axios
       */
      // return axios.get(api)
      //   .then((response) => {
      //     return response.data;
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
  
      // OR ----------------------------------
  
      /**
       * Promise
       */
      return new Promise((resolve) => {
        fetch(api)
          .then((response) => response.json())
          .then((data) => {
            resolve(data.features);
            console.log(data.features);
              var il = data[0].properties.city;
              var ilce = data[0].properties.county;
              document.getElementById("il").value = il ? il : data[0].properties.state;
              document.getElementById("ilce").value = ilce ? ilce : data[0].properties.town || data[0].properties.suburb
          })
          .catch((error) => {
            console.error(error);
          });
      });
    },
  
    // nominatim GeoJSON format
    onResults: ({ currentValue, matches, template }) => {
      const regex = new RegExp(currentValue, "gi");

      // if the result returns 0 we
      // show the no results element
      return matches === 0
        ? template
        : matches
            .map((element) => {
              return `
                  <li>
                    <p>
                      ${element.properties.display_name.replace(
                        regex,
                        (str) => `<b>${str}</b>`
                      )}
                    </p>
                  </li> `;
            })
            .join("");
    },
  
    onSubmit: ({ object,response }) => {
      // remove all layers from the map
      map.eachLayer(function (layer) {
        if (!!layer.toGeoJSON) {
          map.removeLayer(layer);
        }
      });
  
      const { display_name } = object.properties;
      const [lat, lng] = object.geometry.coordinates;
      // custom id for marker
  
      const marker = L.marker([lng, lat], {
        title: display_name,
      });

        document.getElementById("enlem").value = lat;
        document.getElementById("boylam").value = lng;
        document.getElementById('acikAdres').value = display_name;
  
      marker.addTo(map);

      map.setView([lng, lat], 15);

      marker.on("click", function (e) {
        map.removeLayer(marker)
      });



    },
  
    // get index and data from li element after
    // hovering over li with the mouse or using
    // arrow keys ↓ | ↑
    onSelectedItem: ({ index, element, object }) => {
      console.log("onSelectedItem:", { index, element, object });
      console.log(object)
    },
  
    // the method presents no results
    // no results
    noResults: ({ currentValue, template }) =>
      template(`<li>No results found: "${currentValue}"</li>`),
  });
