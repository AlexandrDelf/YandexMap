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

map.addChild(new YMapFeatureDataSource({id: 'popups'}));
map.addChild(new YMapLayer({source: 'popups'}));

const INC_POINT = {coordinates: [37.588144, 55.733842], title: 'Marker inc #0'};
const INC2_POINT = {coordinates: [37.588144, 55.733842], color: '#fcc', draggable: true};

const POINTS = [
    {
        coordinates: [37.588144, 55.733842],
        color: '#477510',
        title: 'nose color Donatello',
        subtitle: 'Very long but incredibly interesting text',
        draggable: true
      }
];

function circle(props) {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.color = props.color;
    props.radius && circle.style.setProperty('--radius', props.radius);
    props.icon && circle.style.setProperty('--icon', props.icon);
    circle.title = props.title;
    return circle;
}
  return circle;
}
  
initMap();
