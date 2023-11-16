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
  } = ymaps3;

  // Определение координат и уровня масштабирования для карты.
  const LOCATION = {
    center: [30.385018761121277, 59.92475240961908],
    zoom: 16,
  };

  const TOP_DEFAULT_MARKER = [...LOCATION.center];

  // Определение свойств всплывающего окна для маркера.
  // Содержимое - "Good text here", положение - сверху, скрывает маркер - true.
  const TOP_DEFAULT_MARKER_POPUP = {
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

  // Создаёт слой с объектами по умолчанию
  map.addChild(new YMapDefaultFeaturesLayer());

  // Добавляет источник данных объектов на карту с идентификатором "popups".
  map.addChild(new YMapFeatureDataSource({ id: "popups" }));

  // Добавляет слой на карту с источником данных "popups".
  map.addChild(new YMapLayer({ source: "popups" }));

  // Создание класса который наследуется от класса YMapComplexEntity из библиотеки ymaps3.
  class MyMarkerWithPopup extends ymaps3.YMapComplexEntity {
    // Обработка событий присоединения.
    _onAttach() {
      this._actualize();
    }

    // Обработка событий отсоединения.
    _onDetach() {
      this.marker = null;
    }

    // Обработка событий обновления объекта.
    _onUpdate(props) {
      if (props.coordinates) {
        this.marker?.update({ coordinates: props.coordinates });
      }
      this._actualize();
    }

    // функция в JavaScript классе, которая создает и настраивает маркер и его всплывающее окно на карте.
    _actualize() {
      // Условие проверяет, открыто ли всплывающее окно маркера и должен ли он скрываться.
      // Если всплывающее окно не открыто или маркер должен быть виден, то маркер добавляется на карту.
      // Если всплывающее окно открыто и маркер должен быть скрыт, то маркер удаляется с карты.
      if (!this._state.popupOpen || !props.popupHidesMarker) {
        this.addChild(this.marker);
      } else if (this.marker) {
        this.removeChild(this.marker);
      }

      // Условие проверяет, открыто ли всплывающее окно. Если оно открыто, то стиль отображения устанавливается на "flex".
      // Если нет, то он устанавливается на "none". Также проверяется наличие элемента маяка во всплывающем окне,
      // если он есть, то он удаляется или добавляется в зависимости от состояния видимости.
      if (this._state.popupOpen) {
        this.popupElement.style.display = "flex";
        this._markerElement.removeChild(this._beaconElement);
      } else if (this.popupElement) {
        this.popupElement.style.display = "none";
        this._markerElement.appendChild(this._beaconElement);
      }
    }
  }

  // добавляет на карту маркер с заданными координатами и свойствами всплывающего окна.
  map.addChild(
    new YMapDefaultMarker({
      coordinates: TOP_DEFAULT_MARKER,
      popup: TOP_DEFAULT_MARKER_POPUP,
    })
  );
}
