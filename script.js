main();

async function main() {
    await ymaps3.ready;

    // Добовляем всякую херню из апишки
    const {YMap, YMapDefaultSchemeLayer, YMapMarker, YMapControls, YMapDefaultFeaturesLayer} = ymaps3;

    // Импортим какуюто херню для контролов 
    //const {YMapZoomControl} = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');
    
    // Импортим какуюто херню для маркеров
    const {YMapDefaultMarker} = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');

    // Собираем настройки карты и ставим ее в блок на странице
    const LOCATION = {center: [37.64, 55.76], zoom: 10};
    map = new YMap(document.getElementById('app'), {location: LOCATION});

    // Я так понимаю задаем схему для карты ( цвет фото ид... )
    map.addChild((scheme = new YMapDefaultSchemeLayer()));

    // Добовляет контролы увеличения
    //map.addChild(new YMapControls({position: 'right'}).addChild(new YMapZoomControl({})));

    // Это тоже чет интересное ( хз без этого метка не ставится ) 
    map.addChild(new YMapDefaultFeaturesLayer({id: 'features'}));
    
    // Собираем метку которя будет на карте
    const INC_POINT = {coordinates: [37.64, 55.76], title: 'Тута стоит метка'};
    const marker = new YMapDefaultMarker(INC_POINT);

    // Добовляем метку на карту
    //map.addChild(marker);

    //const LOCATION = {center: [37.623082, 55.75254], zoom: 9};
    const el = document.createElement('img');
    el.className = 'my-marker';
    el.src = './хай.png';
    el.onclick = () => map.update({location: {...LOCATION, duration: 400}});
    map.addChild(new YMapMarker({coordinates: LOCATION.center}, el));    

    
}
