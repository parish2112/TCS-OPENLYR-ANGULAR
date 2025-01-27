import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MapComponent } from './map/map.component'; // Import standalone component

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Import CUSTOM_ELEMENTS_SCHEMA

@NgModule({
  imports: [
    BrowserModule,
    MapComponent // Import the MapComponent here as well
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add CUSTOM_ELEMENTS_SCHEMA to allow custom elements
})
export class AppModule { }
