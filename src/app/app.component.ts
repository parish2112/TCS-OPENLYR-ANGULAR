import { Component } from '@angular/core';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  initialZoom = 4; 
  indiaCenter: [number, number] = [78.9629, 20.5937];

  onZoomLevelChange(zoomLevel: number): void {
    console.log('Zoom Level Changed:', zoomLevel); 
  }
}
