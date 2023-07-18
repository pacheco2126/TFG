<template>
    <div>
      <section>   
        <div class="box">
          <h2 style="font-family: 'NombreDeLaFuente', sans-serif; color: aliceblue;">¿Que hacemos?</h2>
          <p style="font-family: 'NombreDeLaFuente', sans-serif; color: aliceblue;" v-html="description"></p>
        </div>

      </section>
      <section>
        <div class="box">
        <h2 style="color:aliceblue">Oficinas</h2>
        <p style="color:aliceblue"> Tenemos nuestra Sede en Barcelona pero queremos ayudar a cantidad de paises     </p>
        </div>
        <div id="map"></div>
      </section>
    </div>
    <button ref="contactButton" @click="showPopup = true" class="contact-button">Contact us</button>
  <transition name="popup">
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-container" :style="popupStyle">
        <button @click="showPopup = false" class="close-button">X</button>
        <table class="contact-table">
          <thead>
            <tr style="color: white">
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr style="color: white">
              <td>John Doe</td>
              <td>john.doe@example.com</td>
              <td>123-456-7890</td>
            </tr>
            <tr style="color: white">
              <td>Jane Smith</td>
              <td>jane.smith@example.com</td>
              <td>987-654-3210</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </transition>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Loader } from "@googlemaps/js-api-loader"

  const description = ref(`En SkateGrowth somos una empresa que nuestro principal objetivo es ayudar a la comunidad Skater a crecer y a mejorar su experiencia en el mundo del Skate. Por eso con nuestra plataforma
  queremos ayudar a los Skaters y los que no tienen la oportunidad de serlo, facilitando descuentos a los skaters que ayudan a los mas necesitados y a los que no tienen la oportunidad de serlo. `);

  declare const google: any;


    const loader = new Loader({
    version: "weekly",
    libraries: ["places"],
});

let map: any;
const showPopup = ref(false);
const contactButton = ref<HTMLElement | null>(null);
const popupStyle = ref({});


loader.load().then(() => {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
});

onMounted(() => {
  if (contactButton.value) {
    const buttonRect = contactButton.value.getBoundingClientRect();
    popupStyle.value = {
      bottom: `${window.innerHeight - buttonRect.top}px`,
      left: `${buttonRect.left}px`,
      transform: 'translate(-100%, 0)',
      maxWidth: `${buttonRect.width}px`
    };
  }
  loader.load().then(() => {
    initMap();
  });
});

function initMap() {
    const locations = [
    { name: 'Rome', lat: 41.9028, lng: 12.4964 },
    { name: 'Madrid', lat: 40.4168, lng: -3.7038 },
    { name: 'Berlin', lat: 52.5200, lng: 13.4050 },
    { name: 'Barcelona', lat: 41.3851, lng: 2.1734 },
    { name: 'Malaga', lat: 36.7213, lng: -4.4214 },
    { name: 'Milan', lat: 45.4642, lng: 9.1900 },
    { name: 'Budapest', lat: 47.4979, lng: 19.0402 },
    { name: 'Frankfurt', lat: 50.1109, lng: 8.6821 },
    { name: 'Paris', lat: 48.8566, lng: 2.3522 },
    { name: 'London', lat: 51.5074, lng: -0.1278 },
    { name: 'Amsterdam', lat: 52.3702, lng: 4.8952 },
    { name: 'Vienna', lat: 48.2082, lng: 16.3738 },
    { name: 'Zurich', lat: 47.3769, lng: 8.5417 },
    { name: 'Stockholm', lat: 59.3293, lng: 18.0686 },
    { name: 'Copenhagen', lat: 55.6761, lng: 12.5683 },
    { name: 'Oslo', lat: 59.9139, lng: 10.7522 },
    { name: 'Dublin', lat: 53.3498, lng: -6.2603 },
    { name: 'Lisbon', lat: 38.7223, lng: -9.1393 },
    { name: 'Athens', lat: 37.9838, lng: 23.7275 }
  ];

  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 48.8566, lng: 2.3522 }, // Paris (default center if no locations found)
    zoom: 6
  });

  locations.forEach(location => {
    new google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map,
      title: location.name
    });
  });
}
  </script>
  
  <style>
  .contact-button {
    position: fixed;
    bottom: 20px;
    left: 20px;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup-container {
    background-color: transparent;
    border-radius: 4px;
    position: fixed;
    max-width: 90vw;
    z-index: 9999; /* Para que este encima de todo*/
  }
  
  .close-button {
    position: absolute;
    top: -1rem;
    right: -24.5em;
    padding: 5px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
  }
  
  .contact-table {
    margin-top: 20px;
    margin-left: 10rem;
    border-collapse: collapse;
    width: 100%;
  }
  
  .contact-table th,
  .contact-table td {
    padding: 8px;
    text-align: left;
  }
  
  .contact-table th {
    background-color: #4caf4fa6;
    color: white;
  }
  
  .contact-table td {
    border-bottom: 1px solid black;
    background-color: rgba(255, 255, 255, 0.592);
  }
  
  .popup-enter-active {
    animation: popup-enter 0.3s ease-out;
  }
  
  .popup-leave-active {
    animation: popup-leave 0.3s ease-in;
  }
  
  @keyframes popup-enter {
    0% {
      opacity: 0;
      transform: translate(-100%, 10px);
    }
    100% {
      opacity: 1;
      transform: translate(-100%, 0);
    }
  }
  
  @keyframes popup-leave {
    0% {
      opacity: 1;
      transform: translate(-100%, 0);
    }
    100% {
      opacity: 0;
      transform: translate(-100%, 10px);
    }
  }
  .box {
    background-color: rgba(42, 59, 72, 0.8);
    padding: 2rem;
    margin-top: 1rem;
    border-radius: 5rem;
  }

  #map {
    height: 50rem;
    width: 80%;
    margin-top: 1rem;
    margin-left: auto;
    margin-right: auto;
}

  #description{
    color: white-space;
  }
 
  </style>
  
