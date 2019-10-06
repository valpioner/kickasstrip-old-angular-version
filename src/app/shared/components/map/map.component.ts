import { Component, OnInit, ViewChild, Input } from '@angular/core';

import g = google.maps;
import { mockFlights, mockGrounds } from '../../mocks/mapMocks';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  // @Input() center = new g.LatLng(lat, lng);

  @ViewChild('gmap', {static: true}) gmapElement: any;

  map: g.Map;

  mapStyles: g.MapTypeStyle[] = [
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        { "color": "#282828" }]
    },
    {
      "featureType": "landscape",
      "stylers": [
        { "color": "#393939" }]
    },
    {
      "featureType": "road",
      "stylers": [
        { "visibility": "simplified" },
        { "lightness": -32 },
        // { "opacity": 0.2 },
        { "saturation": -9 }]
    },
    {
      "featureType": "road.arterial",
      "stylers": [
        { "visibility": "off" }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        { "saturation": -80 },
        { "lightness": -30 },
        { "visibility": "simplified" },
        { "weight": 0.5 }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        { "visibility": "simplified" }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [
        { "visibility": "off" }
      ]
    },
    {
      "featureType": "road.local",
      "stylers": [
        { "visibility": "off" }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        { "color": "#000000" },
        { "lightness": 19 }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        { "visibility": "off" }]
    },
    {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
        { "visibility": "off" },
        { "color": "#000000" },
        { "lightness": 10 }]
    },
    {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
        { "visibility": "on" },
        { "saturation": -100 },
        { "lightness": 45 }]
    },
    {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [
        { "visibility": "off" }]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        { "color": "#000000" },
        { "lightness": 19 }]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
        { "visibility": "off" }]
    },
    {
      "featureType": "administrative.province",
      "stylers": [
        { "lightness": -50 }]
    },
    {
      "featureType": "administrative",
      "elementType": "labels",
      "stylers": [
        { "visibility": "simplified" }]
    }
  ];

  private MY_MAPTYPE_ID = 'kickasstrip_style';

  private lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 1
  };

  private planeSymbol = {
    path: 'M362.985,430.724l-10.248,51.234l62.332,57.969l-3.293,26.145 l-71.345-23.599l-2.001,13.069l-2.057-13.529l-71.278,22.928l-5.762-23.984l64.097-59.271l-8.913-51.359l0.858-114.43 l-21.945-11.338l-189.358,88.76l-1.18-32.262l213.344-180.08l0.875-107.436l7.973-32.005l7.642-12.054l7.377-3.958l9.238,3.65 l6.367,14.925l7.369,30.363v106.375l211.592,182.082l-1.496,32.247l-188.479-90.61l-21.616,10.087l-0.094,115.684',
    fillColor: '#5A8DBE',
    fillOpacity: 0.6,
    scale: 0.02,
    strokeOpacity: 0.6,
    strokeWeight: 1,
    anchor: new g.Point(300, 300)
  };

  private polyFlightsOptions = {
    geodesic: true,
    strokeColor: '#5A8DBE',//'#58BB7A',
    strokeOpacity: 0,
    strokeWeight: 1,
    map: this.map,
    icons: [{
      icon: this.lineSymbol,
      offset: '0',
      repeat: '5px'
    }, {
      icon: this.planeSymbol,
      offset: '50%',
    }]
  };

  private polyGroundOptions = {
    strokeColor: '#FF6300',
    strokeOpacity: 1.0,
    strokeWeight: 2,
    map: this.map
  };

  private mapOptions: g.MapOptions = {
    center: new g.LatLng(10, 25),
    zoom: 3,
    backgroundColor: 'none',
    disableDefaultUI: true,
    minZoom: 3,
    maxZoom: 12,
    tilt: 45,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.TERRAIN, this.MY_MAPTYPE_ID]
    }
  };

  constructor() { }

  ngOnInit() {
    this.createMap();
    this.addFlights(mockFlights);
    this.addGrounds(mockGrounds)
  }

  private createMap() {
    const styledMap = new g.StyledMapType(this.mapStyles, { name: 'KickAssTrip' });
    this.map = new g.Map(this.gmapElement.nativeElement, this.mapOptions);
    this.map.mapTypes.set(this.MY_MAPTYPE_ID, styledMap);
    this.map.setMapTypeId(this.MY_MAPTYPE_ID);
  }

  private addFlights(flights) {
    for (const flightDetails of flights) {
      flightDetails.reduce((from, to) => {
        const path = [];
        path.push(new g.LatLng(from.lat, from.lng), new g.LatLng(to.lat, to.lng));
        const polyline = new g.Polyline(this.polyFlightsOptions);
        polyline.setPath(path);
        polyline.setMap(this.map);
        return to;
      });
    }
  }

  private addGrounds(grounds) {
    grounds.forEach(ground => {
      const polyline = new g.Polyline(this.polyGroundOptions);
      polyline.setPath(ground);
      polyline.setMap(this.map);
    });
  }
}
