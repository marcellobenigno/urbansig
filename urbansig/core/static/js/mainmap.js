const geoserverWMS = $('#geoserver').val() + 'wms/';
const clickUrl = $('#click').val().replace('0/0/', '');

console.log(clickUrl)

const setor = L.tileLayer.wms(geoserverWMS, {
    layers: 'urbansig:cadastro_setor',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    maxZoom: 20,
    zIndex: 1,
    attribution: 'Prefeitura Municipal de Cassilândia'
});

const quadra = L.tileLayer.wms(geoserverWMS, {
    layers: 'urbansig:cadastro_quadra',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    maxZoom: 20,
    zIndex: 1,
    attribution: 'Prefeitura Municipal de Cassilândia'
});

const lote = L.tileLayer.wms(geoserverWMS, {
    layers: 'urbansig:cadastro_lote',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    maxZoom: 20,
    zIndex: 1,
    attribution: 'Prefeitura Municipal de Cassilândia'
});


const googleStreets = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Google Maps'
});

const googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Google Maps'
});

const googleTerrain = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Google Maps'
});

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