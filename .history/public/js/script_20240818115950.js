const socket = io();
// console.log("Socket.io connected");
if (navigator.geolocation) {
  navigator.geolocation.watchPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit("send-location");
  });
}
