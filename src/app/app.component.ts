import { Component } from '@angular/core';
import { MapComponent } from './map/map.component'; // Import MapComponent

@Component({
  selector: 'app-root',
  standalone: true,  // Mark AppComponent as standalone
  imports: [MapComponent],  // Import MapComponent here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OpenLayers App';
}
