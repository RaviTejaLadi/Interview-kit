# What is the Geolocation API?

The **Geolocation API** allows a website to request the user's **geographic location**, such as latitude and longitude.

The browser normally asks the user for **permission** before providing the location.

Common uses:

* Maps
* Nearby stores/restaurants
* Delivery applications
* Location-based services
* Weather based on location

```javascript
// Request the user's current geographic location
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log("Latitude:", position.coords.latitude);
    console.log("Longitude:", position.coords.longitude);
  },
  (error) => {
    console.error("Unable to get location:", error.message);
  }
);
```

### Important

Geolocation is generally available only in a **secure context (HTTPS)**, with localhost commonly treated as a secure development origin.