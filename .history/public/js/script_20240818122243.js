const socket = io();
// console.log("Socket.io connected");
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit("send-location", { latitude, longitude });
    },
    (error) => {
      console.error(error);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
}
/*
const map = L.map();
map.setView([0, 0], 10);
*/
// const map = L.map("map").setView([18.9123, 73.3219], 10);
const map = L.map("map").setView([18.9123, 73.3219], 13);

let googleStreets = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
    attribution: "OJAS TESTING FOR VIKAS",
  }
);
googleStreets.addTo(map);
const markers = {};
socket.on("received-location", (data) => {
  const { id, latitude, longitude } = data;
  map.setView([latitude, longitude], 16);
});
