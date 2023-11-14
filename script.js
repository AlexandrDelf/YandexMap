async function initMap() {
  await ymaps3.ready;

  const {YMap, YMapDefaultSchemeLayer, YMapMarker, YMapFeatureDataSource, YMapLayer } = ymaps3;

  const map = new YMap(
      document.getElementById('app'),
      {
          location: {
              center: [37.588144, 55.733842],
              zoom: 10
          }
      }
  );

  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer());

//   map.addChild(new YMapFeatureDataSource({id: 'popups'}));
//   map.addChild(new YMapLayer({source: 'popups'}));
  
  

  
}


initMap();
