import { Controller } from "@hotwired/stimulus"
import { right } from "@popperjs/core";
// import 'mapbox-gl/dist/mapbox-gl.css';
// Connects to data-controller="map"
export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array
  }

  connect() {
    mapboxgl.accessToken = this.apiKeyValue

    const bounds = [
      [4.818024, 52.336513],
      [4.949514, 52.374759]
      ];

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/rosevdg/clbdfwq0v001m14oz0eh6pen9",
      bounds: bounds,
      attributionControl: false,
    })

    this.#addMarkersToMap()
    let lastMarker = new mapboxgl.Marker()
        .setLngLat([ this.markersValue[this.markersValue.length - 1].lng, this.markersValue[this.markersValue.length - 1].lat ])
        .addTo(this.map)

    const timeInterval = () => {
        this.map.resize()
        lastMarker.setLngLat([ this.markersValue[this.markersValue.length - 1].lng, this.markersValue[this.markersValue.length - 1].lat ])
        setTimeout(() => {
          timeInterval()
        }, 500);
    }

    timeInterval()
  }

  #addMarkersToMap() {
    this.markersValue.forEach((marker) => {
      const customMarker = document.createElement("div")
      customMarker.className = "marker"
      customMarker.style.backgroundImage = `url('${marker.image_url}')`
      customMarker.style.backgroundSize = "contain"
      customMarker.style.backgroundRepeat = "no-repeat"
      customMarker.style.width = "30px"
      customMarker.style.height = "30px"

      const popup = new mapboxgl.Popup().setHTML(marker.info_window)
      new mapboxgl.Marker(customMarker, {offset: [0, -50/2]})
        .setLngLat([ marker.lng, marker.lat ])
        .setPopup(popup)
        .addTo(this.map)
        .getElement().addEventListener('click', () => {
          this.map.flyTo(
            {center:[marker.lng, marker.lat],
              zoom: 13
            }
            );;
        });
    })
  }

  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds()
    this.markersValue.forEach(marker => bounds.extend([ marker.lng, marker.lat ]))
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 })
  }

  #addMarkersToMapCustom() {
      new mapboxgl.Marker()
        .setLngLat([ this.markersValue[this.markersValue.length - 1].lng, this.markersValue[this.markersValue.length - 1].lat ])
        .addTo(this.map)
  }
}
