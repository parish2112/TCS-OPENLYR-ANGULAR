import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as ol from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM, TileWMS } from 'ol/source';
import { View } from 'ol';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  private map: ol.Map | undefined;
  @Input() initialZoom: number = 5;
  @Input() centerCoordinates: [number, number] = [77.1025, 28.7041];

  @Output() zoomLevelChanged = new EventEmitter<number>();

  zoomLevel: number = this.initialZoom;
  zoomPercentage: string = `${this.zoomLevel}%`;

  ngOnInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.dispose();
    }
  }

  private initMap(): void {
    const center = fromLonLat(this.centerCoordinates);

    const view = new View({
      center: center,
      zoom: this.initialZoom
    });

    // Base OSM Layer
    const osmLayer = new TileLayer({
      source: new OSM()
    });

    // ISRO Bhuvan WMS Layer (for politically accurate India map)
    const bhuvanLayer = new TileLayer({
      source: new TileWMS({
        url: 'https://bhuvan-vec2.nrsc.gov.in/bhuvan/wms', // ISRO WMS Service
        params: {
          'LAYERS': 'india_boundaries', // Adjust based on available layers
          'TILED': true,
          'FORMAT': 'image/png',
          'TRANSPARENT': true
        }
      })
    });

    // Vector source for markers
    const vectorSource = new VectorSource();

    const markers = [
      { lon: 77.1025, lat: 28.7041, name: 'Delhi' },
      { lon: 88.3639, lat: 22.5726, name: 'Kolkata' },
      { lon: 72.8777, lat: 19.0760, name: 'Mumbai' },
      { lon: 80.2785, lat: 13.0827, name: 'Chennai' },
      { lon: 75.8577, lat: 26.9124, name: 'Jaipur' }
    ];

    markers.forEach(marker => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([marker.lon, marker.lat])),
        name: marker.name
      });

      feature.setStyle(new Style({
        image: new Icon({
          src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png',
          scale: 1.1
        })
      }));

      vectorSource.addFeature(feature);
    });

    // Vector layer for markers
    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    // Initialize the map
    this.map = new ol.Map({
      target: 'map',
      layers: [osmLayer, bhuvanLayer, vectorLayer], // Added Bhuvan WMS layer
      view: view,
      controls: []
    });

    // Update zoom level percentage
    view.on('change:resolution', () => {
      this.zoomLevel = view.getZoom() || this.zoomLevel;
      this.zoomPercentage = `${Math.round(this.zoomLevel * 100 / 20)}%`;
      this.zoomLevelChanged.emit(this.zoomLevel);
    });
  }

  zoomIn(): void {
    const view = this.map?.getView();
    if (view) {
      view.setZoom((view.getZoom() || 0) + 1);
    }
  }

  zoomOut(): void {
    const view = this.map?.getView();
    if (view) {
      view.setZoom((view.getZoom() || 0) - 1);
    }
  }
}
