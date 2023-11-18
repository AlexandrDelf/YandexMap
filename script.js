window.map = null;

main();
async function main() {
  await ymaps3.ready;

  // Импорт компонентов из библиотеки YMaps3. Компоненты включают в себя YMap (карту),
  // YMapDefaultSchemeLayer (слой со стандартной схемой), YMapFeatureDataSource (источник данных объекта), YMapDefaultFeaturesLayer (слой с объектами по умолчанию), YMapLayer (слой карты).
  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapFeatureDataSource,
    YMapLayer,
    YMapMarker,
  } = ymaps3;

  // Определение координат и уровня масштабирования для карты.
  const LOCATION = {
    center: [30.385018761121277, 59.92475240961908],
    zoom: 16,
  };

  // Создание константы с расположением маркера с тем же значением, что и центр основной карты.
  const DEFAULT_MARKER = [...LOCATION.center];

  // Определение свойств всплывающего окна для маркера.
  // Содержимое - "Good text here", положение - сверху, скрывает маркер - true.
  const DEFAULT_MARKER_POPUP = {
    content: "Good text here",
    position: "top",
    hidesMarker: true,
  };

  // Загружает модуль @yandex/ymaps3-markers и экспортирует из него компонент YMapDefaultMarker для создания маркеров.
  // Команда await говорит о том, что загрузка модуля происходит асинхронно, то есть код продолжает выполняться, пока загружается модуль.
  const { YMapDefaultMarker } = await ymaps3.import(
    "@yandex/ymaps3-markers@0.0.1"
  );

  // Cоздание карты с центром в заданных координатах и уровнем зума. Карта отображается в элементе с ID "app".
  map = new YMap(document.getElementById("app"), { location: LOCATION });

  // Создаёт слой со стандартной схемой.
  map.addChild(new YMapDefaultSchemeLayer());

  // Создаёт слой с объектами по умолчанию.
  map.addChild(new YMapDefaultFeaturesLayer());

  // Добавляет источник данных объектов на карту с идентификатором "popups".
  map.addChild(new YMapFeatureDataSource({ id: "popups" }));

  // Добавляет слой на карту с источником данных "popups".
  map.addChild(new YMapLayer({ source: "popups" }));

  














  // class CustomMarkerWithPopup extends ymaps3.YMapComplexEntity {
  //   _onAttach() {
  //     this._actualize();
  //   }
  //   _onDetach() {
  //     this.marker = null;
  //   }
  //   _onUpdate(props) {
  //     if (props.coordinates) {
  //       this.marker?.update({coordinates: props.coordinates});
  //     }
  //     this._actualize();
  //   }

  //   _actualize() {
  //     const props = this._props;
  //     this._lazyCreatePopup();
  
  //     if (!this._state.popupOpen || !props.popupHidesMarker) {
  //       this.addChild(this.marker);
  //     } else if (this.marker) {
  //       this.removeChild(this.marker);
  //     }

  //     if (this._state.popupOpen) {
  //       this.popupElement.style.display = 'flex';
  //       this._markerElement.removeChild(this._beaconElement);
  //     } else if (this.popupElement) {
  //       this.popupElement.style.display = 'none';
  //       this._markerElement.appendChild(this._beaconElement);
  //     }
  //   }

  //   _lazyCreatePopup() {
  //     if (this.popupElement) return;

  //     const element = document.createElement('div');
  //     element.className = 'popup';

  //     const textElement = document.createElement('div');
  //     textElement.className = 'popup__text';
  //     textElement.textContent = this._props.popupContent;

  //     const closeBtn = document.createElement('div');
  //     closeBtn.className = 'popup__close';
  //     closeBtn.textContent = '✖';
  //     closeBtn.onclick = () => {
  //       this._state.popupOpen = false;
  //       this._actualize();
  //     };

  //     textElement.append(alertBtn);
  //     element.append(textElement, closeBtn);

  //     this.popupElement = element;
  //     }

  //     constructor(props) {
  //       super(props);
  //       this._state = {popupOpen: false};
  //     }
  //   }

    // const PopupContent = (close) => {
    //   const container = document.createElement('div');
    //   container.innerHTML = `<div class="popup">
    //             <button class="popup__close">✖</button>
    //             <img class="popup__img" src="./img/logo.png">
    //             <p>This studio</p>
    //             </div>`;                
    //   container.querySelector('.popup__close').onclick = close;

    //   return container;
    // };


    // function show_popup(){
    //   const popup = document.querySelector("#popup");
    //   popup.style.cssText = "display: flex;";
      
    //   console.log("РАБОТАЕТ");
    // }






  const content = document.createElement("div");
  const customMarker = new ymaps3.YMapMarker(
    {
      coordinates: DEFAULT_MARKER,      
      onClick: () => show_popup(),
    },
    content
  );

  content.innerHTML = `<div class="custom-marker">
          <img src="./img/custom-marker.svg"></div>
          <div class="popup" id="popup">
            <div class="popup__close">✖</div>
            <div class="popup__text"></div>
          </div>`;
    // '<div style="position: absolute; width: 50px; height: 50px;left:-25px; top: -50px; display: block;"><img src="./img/custom-marker.svg"></div>';

  map.addChild(customMarker);

  
  const marker = document.querySelector('.custom-marker')
  const popup = document.querySelector('.popup')  
  const close_btn = document.querySelector('.popup__close')
  console.log(marker);




  marker.addEventListener('click', () => {
  popup.style.display = 'flex'
})

close_btn.addEventListener('click', () => {
  popup.style.display = 'none'
})

}
