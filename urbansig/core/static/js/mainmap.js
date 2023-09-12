const clickUrl = $('#click').val().replace('0/0/', '');

const map = L.map('map', {
    center: [-19.1151240, -51.7317223],
    zoom: 15,
    zoomControl: false,
    layers: [googleSat, lote, quadra, setor]
});

const baseLayers = {
    'Google Satélite': googleSat,
    'Google Streets': googleStreets,
    'Google Terreno': googleTerrain
};

const overlays = {
    'Lotes': lote,
    'Quadras': quadra,
    'Setores': setor,
};

const layerControl = L.control.layers(baseLayers, overlays).addTo(map);

const zoomHome = L.Control.zoomHome();
zoomHome.addTo(map);

var popup = L.popup();


function onMapClick(e) {
    let url = `${clickUrl}${e.latlng.lng}/${e.latlng.lat}/`

    axios.get(url)
        .then(function (response) {
            // handle success
            if (!response.data.includes('****')) {
                popup
                    .setLatLng(e.latlng)
                    .setContent(response.data)
                    .openOn(map);
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

map.on('click', onMapClick);