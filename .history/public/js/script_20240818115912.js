const socket = io();
// console.log("Socket.io connected");
if (navigator.geolocation) {
  navigator.geolocation.watchPosition((position) => {
    position.coords;
  });
}
