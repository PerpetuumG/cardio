'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputTemp = document.querySelector('.form__input--temp');
const inputClimb = document.querySelector('.form__input--climb');

let map;
let mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude, longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude},14z`);

      const coords = [latitude, longitude];

      map = L.map('map').setView(coords, 13);
      // console.log(map);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      /*
      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
        */

      // Обработка клика на карте
      map.on('click', function (event) {
        mapEvent = event;
        form.classList.remove('hidden');
        inputDistance.focus();
      });
    },
    function () {
      alert('Невозможно получить ваше местоположение');
    },
  );
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Очистка полей ввода данных формы
  inputDistance.value = inputDuration.value = inputTemp.value = inputClimb.value = '';


  // Отображение маркера
  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 200,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      }),
    )
    .setPopupContent('Тренировка')
    .openPopup();
});

inputType.addEventListener('change', function(e) {
  // e.preventDefault()
  inputClimb.closest('.form__row').classList.toggle('form__row--hidden')
  inputTemp.closest('.form__row').classList.toggle('form__row--hidden')
})
