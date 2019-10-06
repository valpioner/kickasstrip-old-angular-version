import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  opened = true;
  dynamicTheme = 'dark';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('flag-en',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/flag-en.svg'));
  }

  ngOnInit() {
    console.log(window.innerWidth);
    // if (window.innerWidth < 768) {
    //   this.sidenav.fixedTopGap = 55;
    //   this.opened = false;
    // } else {
    //   this.sidenav.fixedTopGap = 55;
    //   this.opened = true;
    // }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  onChoseLocation(data: MapClickData) {
    console.log(data);
  }
}

interface MapClickData {
  coords: LatLng;
  placeId: any;
}

interface LatLng {
  lat: number;
  lng: number;
}
