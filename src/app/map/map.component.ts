import { Component } from '@angular/core';
import * as ol from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import { View } from 'ol';

@Component({
  selector: 'app-map',
  standalone: true,  // Standalone component
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  private map: ol.Map | undefined;

  ngOnInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.dispose();
    }
  }

  private initMap(): void {
    // Coordinates for the center of India (around New Delhi)
    const indiaCenter = ([77.1025, 28.7041]); // Transform to EPSG:3857

    this.map = new ol.Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: indiaCenter,  // Use the transformed coordinates
        zoom: 8  // Adjust zoom level to fit India on the map
      })
    });
  }
}
