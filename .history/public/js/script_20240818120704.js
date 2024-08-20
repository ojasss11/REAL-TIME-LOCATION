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
L.map("map").setView([0, 0]);
