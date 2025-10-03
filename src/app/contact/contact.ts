import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { Telegramservice } from '../Service/telegramservice';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements AfterViewInit {
  private map: any;

  alert = signal('');
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private telegram: Telegramservice) { }

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



  // send message 
  Message(name: string, phone: string, subject: string, message: string) {
    if((name || phone || subject || message) == undefined) return;
    let concat = '======== FROM CONTACT ========\n\n';
    concat += 'Name : ' + name + '\n';
    concat += 'Email : ' + phone + '\n';
    concat += 'Subject : ' + subject + '\n';
    concat += '\nMessage : ' + message;

    this.telegram.sendRecipt(concat).subscribe(res => console.log('successfully'));

    this.alert.set('success');
    setTimeout(() => this.alert.set(''), 3100);
  }
}
