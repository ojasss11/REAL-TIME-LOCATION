const socket = io();

function requestLocationAccess() {
  navigator.permissions
    .query({ name: "geolocation" })
    .then((permissionStatus) => {
      if (permissionStatus.state === "granted") {
        startTracking();
      } else if (permissionStatus.state === "prompt") {
        startTracking();
      } else {
        showPermissionMessage();
      }
    });
}

function startTracking() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("send-location", { latitude, longitude });
        hidePermissionMessage();
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          showPermissionMessage();
        } else {
          console.error("Error getting location:", error);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPermissionMessage() {
  document.getElementById("permission-message").style.display = "block";
}

function hidePermissionMessage() {
  document.getElementById("permission-message").style.display = "none";
}

const map = L.map("map").setView([18.9123, 73.3219], 13);

L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
  attribution: "OJAS TESTING FOR VIKAS",
}).addTo(map);

const markers = {};

socket.on("received-location", (data) => {
  const { id, latitude, longitude } = data;
  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]);
  } else {
    markers[id] = L.marker([latitude, longitude]).addTo(map);
    if (id === socket.id) {
      showConnectionNotification(); // Notify the user when their marker is added
    }
  }
  updateMapBounds();
});

socket.on("user-disconnected", (id) => {
  if (markers[id]) {
    map.removeLayer(markers[id]);
    delete markers[id];
  }
});

function updateMapBounds() {
  const bounds = L.latLngBounds(
    Object.values(markers).map((marker) => marker.getLatLng())
  );
  map.fitBounds(bounds);
}

function showConnectionNotification() {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = "CONNECTED";
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000); // Hide notification after 3 seconds
}

// Request location access on page load
requestLocationAccess();
