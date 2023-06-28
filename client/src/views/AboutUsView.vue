<template>
    <div>
      <h1>About Us</h1>
      <section>
        <h2 style="color:aliceblue">What We Do</h2>
        <p style="background-color:rgb(158, 152, 152)" v-html="description"></p>
      </section>
      <section>
        <h2 style="color:aliceblue">Offices</h2>
        <p style="color:aliceblue"> We are almost in every European city as
            from NetInventory we offer the best solutions for all the companies.     </p>
        <p style="color:aliceblue"> Make it Easier - Make it faster </p>
        <div id="map"></div>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Loader } from "@googlemaps/js-api-loader"

  const description = ref(`At NetInventory, we specialize in providing comprehensive solutions for efficiently managing your company's inventory and other business needs. Our platform is designed to meet the demands of even the most challenging business environments, offering powerful tools and an intuitive interface that will streamline your daily operations and enable data-driven strategic decision-making.<br><br>

    What do we offer? <br><br>

    Customization and scalability: We understand that every business is unique, which is why our platform is designed to adapt to your specific needs. You can customize workflows, data fields, and reports to align with your business requirements. Moreover, our platform is highly scalable, allowing it to grow alongside your business without disruptions or limitations.<br><br>

    Collaboration and effective communication: We facilitate collaboration and communication across different teams and departments within your company. Our platform enables real-time information sharing, automatic notifications, task assignments, and a clear record of all inventory-related interactions. This improves operational efficiency and helps prevent errors and misunderstandings.<br><br>

    Analysis and reporting: We provide powerful analytics and reporting tools that offer deep insights into your inventory operations. Gain key insights into stock levels, demand trends, costs, and other important indicators to make informed and strategic decisions.<br><br>

    Integrations and compatibility: Our platform seamlessly integrates with other business systems and software such as accounting systems, ERPs, and CRMs. This allows for smooth data synchronization and process optimization across all areas of your business.<br><br>

    At NetInventory, we are committed to your success and strive to be your trusted partner in inventory management and other business needs. With our platform, you can save time, reduce costs, improve efficiency, and make smarter decisions. Let us help you unlock your full business potential!`);

  declare const google: any;


    const loader = new Loader({
    apiKey: "AIzaSyCR1MW2QJEBm9kBIQBqFTDFDNBfPLoFnUw",
    version: "weekly",
    libraries: ["places"],
});

let map: any;

loader.load().then(() => {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
});

onMounted(() => {
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
  #map {
    height: 50rem;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}

  #description{

    color: white-space;
  }
  </style>
  