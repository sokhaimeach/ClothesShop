import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements AfterViewInit {
  private map: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');

      // Fix default icon paths
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'assets/marker-icon-2x.png',
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      });


      this.map = L.map('mapid').setView([-23.013104, -43.394365], 13);

      // Use OpenStreetMap for simplicity
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
      }).addTo(this.map);

      L.marker([-23.013104, -43.394365]).addTo(this.map)
        .bindPopup("<b>SH</b><br />Location.")
        .openPopup();

      this.map.scrollWheelZoom.disable();
      this.map.touchZoom.disable();
    }
  }
}
