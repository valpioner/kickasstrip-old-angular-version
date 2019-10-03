import { Component, OnInit, ViewChild, Input } from '@angular/core';

import g = google.maps;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('gmap', {static: true}) gmapElement: any;
  map: g.Map;

  @Input() center?;

  //maps = google.maps;
  //center = new this.maps.LatLng(lat, lng);

  constructor() { }

  ngOnInit() {
    var mapProp: g.MapOptions = {
      center: new g.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new g.Map(this.gmapElement.nativeElement, mapProp);

    // const map = new google.maps.Map(this.gmapElement.nativeElement, this.createMapConfig());
  }

  // private createMapConfig(): {
  //   return {
  //     center,
  //     zoom: zoom,
  //     backgroundColor: "none",
  //     disableDefaultUI: true,
  //     minZoom: 3,
  //     maxZoom: 8,
  //     tilt: 45,
  //     mapTypeControlOptions: {
  //       mapTypeIds: [google.maps.MapTypeId.TERRAIN, MY_MAPTYPE_ID]
  //     },
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };
  // }

}
