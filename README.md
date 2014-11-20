This module uses the webgl-heatmap from [https://github.com/pyalot/webgl-heatmap](https://github.com/pyalot/webgl-heatmap). This adds a Canvas element and overlays that on top of a mapbox-gl map.

The heatmap will reset on map state change.

usage:

```

var mapboxgl_heatmap = require('mapboxgl-heatmap');
var heatmap;

function msgRec(msg) {
    var latlng = new mapboxgl.LatLng(msg.lat, msg.lng);
    var point = map.project(latlng);
    heatmap.addPoint(point.x, point.y, 25, 0.5);
}

mapboxgl.accessToken = 'pk.enter-your-access-token-here';

map = new mapboxgl.Map({
    container: 'map',
    style: 'https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v6.json',
    center: [37.830348, -95.486052],
    zoom: 4
});

// Add heatmap to the map
heatmap = mapboxgl_heatmap.heatmap(map);

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.Navigation());

//bootstrap web socket
webSocket.on('data', msgRec);


```
