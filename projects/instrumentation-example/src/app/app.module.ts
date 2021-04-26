import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OtelColExporterModule, CompositePropagatorModule, OtelWebTracerModule } from 'projects/opentelemetry-interceptor/src/public-api';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    OtelColExporterModule,
    CompositePropagatorModule,
    OtelWebTracerModule.forRoot(environment.openTelemetryConfig),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
