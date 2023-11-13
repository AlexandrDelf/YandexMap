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

    map.addChild(
        new YMapFeatureDataSource({
          id: 'markerSource'
        })
      );

    map.addChild(
        new YMapLayer({
          source: 'markerSource',
          type: 'markers',
          zIndex: 2020
        })
      );

    const markerElement = document.createElement('div');
    markerElement.className = 'marker-class';
    markerElement.innerText = "I'm marker!";

    const marker = new YMapMarker(
    {
        source: 'markerSource',
        coordinates: [37.588144, 55.733842],
        draggable: true,
        mapFollowsOnDrag: true
    },
    markerElement
    );

    map.addChild(marker);
}

initMap();