<template>
  <div class="flex flex-col h-screen max-h-screen">
    <!-- Search / Results -->
    <div
      class="z-20 flex justify-center relative bg-hero-pattern bg-cover px-4 pt-8 pb-32"
    >
      <!-- Search Input -->
      <div class="w-full max-w-screen-sm">
        <h1 class="text-white text-center text-3xl pb-4">IP Address Tracker</h1>
        <div class="flex">
          <form @submit.prevent="getIpInfo" class="w-full flex">
            <input
              v-model="queryIp"
              class="flex-1 py-3 px-2 rounded-tl-md rounded-bl-md focus:outline-none"
              type="text"
              placeholder="Search for any IP address or leave empty to get your IP info"
            />
            <i
              @click="getIpInfo"
              class="fa-solid fa-chevron-right cursor-pointer bg-black text-white px-4 rounded-tr-md rounded-br-md flex items-center"
            ></i>
          </form>
        </div>
      </div>
      <!-- IP Info -->
      <IPInfo v-if="ipInfo" :ipInfo="ipInfo" />
    </div>

    <!-- Map -->
    <div id="mapid" class="h-full z-10"></div>
  </div>
</template>

<script>
import IPInfo from '@/components/IPInfo.vue';
import leaflet from 'leaflet';
import axios from 'axios';
import { onMounted, ref } from 'vue';
export default {
  name: 'HomeView',
  components: {
    IPInfo,
  },
  setup() {
    let mymap;

    const queryIp = ref('');
    const ipInfo = ref(null);

    onMounted(async () => {
      mymap = leaflet.map('mapid').setView([42.5145, -83.0147], 9);
      leaflet
        .tileLayer(
          'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVyYW1pYWhjb2ZmZXkiLCJhIjoiY2wzajJvbWNmMDFsbDNjbng0aHNub3pvcSJ9.77z3nre-klKmmTa5mokpIg',
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken:
              'pk.eyJ1IjoiamVyYW1pYWhjb2ZmZXkiLCJhIjoiY2wzajJvbWNmMDFsbDNjbng0aHNub3pvcSJ9.77z3nre-klKmmTa5mokpIg',
          }
        )
        .addTo(mymap);

      await getIpInfo();
    });

    const getIpInfo = async () => {
      try {
        const res = await axios.get(
          `https://geo.ipify.org/api/v2/country,city?apiKey=at_nqxga0TSRJ7dyZbsm66KTWwYIvS3W&ipAddress=${queryIp.value}`
        );
        const data = res.data;
        ipInfo.value = {
          address: data.ip,
          state: data.location.region,
          timezone: data.location.timezone,
          isp: data.isp,
          lat: data.location.lat,
          lng: data.location.lng,
        };
        leaflet.marker([ipInfo.value.lat, ipInfo.value.lng]).addTo(mymap);
        mymap.setView([ipInfo.value.lat, ipInfo.value.lng], 13);
      } catch (error) {
        if (error.response.status === 422) {
          alert('Please enter a valid IP address');
        } else {
          console.log(error);
          alert(error.message);
        }
      }
    };

    return { queryIp, ipInfo, getIpInfo };
  },
};
</script>
