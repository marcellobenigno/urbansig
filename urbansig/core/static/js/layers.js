const geoserverWMS = $('#geoserver').val() + 'wms/';

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