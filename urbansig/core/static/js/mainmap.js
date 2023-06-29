const geoserverWMS = $('#geoserver').val() + 'wms/'
const clickUrl = $('#click').val().replace('0/0/', '')
const setorApi = $('#setor_api').val()

const setor = L.tileLayer.wms(geoserverWMS, {
    layers: 'urbansig:cadastro_setor',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    maxZoom: 20,
    zIndex: 1,
    attribution: 'Prefeitura Municipal de Cassilândia'
})

const quadra = L.tileLayer.wms(geoserverWMS, {
    layers: 'urbansig:cadastro_quadra',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    maxZoom: 20,
    zIndex: 1,
    attribution: 'Prefeitura Municipal de Cassilândia'
})

const lote = L.tileLayer.wms(geoserverWMS, {
    layers: 'urbansig:cadastro_lote',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    maxZoom: 20,
    zIndex: 1,
    attribution: 'Prefeitura Municipal de Cassilândia'
})

const googleStreets = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Google Maps'
})

const googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Google Maps'
})

const googleTerrain = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Google Maps'
})

const baseLayers = {
    'Google Satélite': googleSat,
    'Google Streets': googleStreets,
    'Google Terreno': googleTerrain
}

const overlays = {
    'Lotes': lote,
    'Quadras': quadra,
    'Setores': setor,
}

const {createApp, ref} = Vue

const app = createApp({
    data() {
        return {
            map: null,
            popup: L.popup(),
            setores: [],
            setorEscolhido: null,
            setorGeoJson: L.geoJSON(),
        }
    },
    methods: {
        initMap() {
            this.map = L.map('map', {
                    zoom: 15,
                    center: [-19.1151240, -51.7317223],
                    zoomControl: false,
                    layers: [googleSat, lote, quadra, setor],
                }
            )
            L.Control.zoomHome().addTo(this.map)
            L.control.layers(baseLayers, overlays).addTo(this.map)
        },
        onMapClick(e) {
            let url = `${clickUrl}${e.latlng.lng}/${e.latlng.lat}/`
            axios.get(url)
                .then((response) => {
                    if (!response.data.includes('****')) {
                        this.popup
                            .setLatLng(e.latlng)
                            .setContent(response.data)
                            .openOn(this.map)
                    }
                })
                .catch(response => {
                    console.log('error')
                })
        },
        getSetores() {
            axios.get(setorApi)
                .then((response) => {
                    this.setores = response.data.features;
                })
                .catch(resonse => {
                    console.log('error')
                })
        },
    },
    mounted() {
        this.initMap()
        this.map.on('click', this.onMapClick)
        this.getSetores()
    },
    watch: {
        setorEscolhido: {
            handler(newValue, oldValue) {
                this.map.fitBounds(newValue.properties.bounds)
                this.setorGeoJson.clearLayers()
                this.setorGeoJson.addData(newValue.geometry).addTo(this.map)
            },
            deep: true
        }
    }
})

// Delimiters changed to ES6 template string style
app.config.compilerOptions.delimiters = ['${', '}']
app.mount('#app')


// const map = L.map('map', {
//     center: [-19.1151240, -51.7317223],
//     zoom: 15,
//     zoomControl: false,
//     layers: [googleSat, lote, quadra, setor]
// });
//
// const baseLayers = {
//     'Google Satélite': googleSat,
//     'Google Streets': googleStreets,
//     'Google Terreno': googleTerrain
// };
//
// const overlays = {
//     'Lotes': lote,
//     'Quadras': quadra,
//     'Setores': setor,
// };
//
// const layerControl = L.control.layers(baseLayers, overlays).addTo(map);
//
// const zoomHome = L.Control.zoomHome();
// zoomHome.addTo(map);
//
// var popup = L.popup();
//
//
// function onMapClick(e) {
//     let url = `${clickUrl}${e.latlng.lng}/${e.latlng.lat}/`
//
//     axios.get(url)
//         .then(function (response) {
//             // handle success
//             if (!response.data.includes('****')) {
//                 popup
//                     .setLatLng(e.latlng)
//                     .setContent(response.data)
//                     .openOn(map);
//             }
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//         })
//         .finally(function () {
//             // always executed
//         });
// }
//
// map.on('click', onMapClick);