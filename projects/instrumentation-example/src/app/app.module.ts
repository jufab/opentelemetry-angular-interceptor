import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  OtelColExporterModule,
  CompositePropagatorModule,
  OtelWebTracerModule,
  OTEL_CONFIG } from 'projects/opentelemetry-interceptor/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewBackendComponent } from './view-backend/view-backend.component';
import { HighlightJsModule } from 'ngx-highlight-js';
import { AppRoutingModule } from './app-routing.module';
import { PostBackendComponent } from './post-backend/post-backend.component';
import { JsonpBackendComponent } from './jsonp-backend/jsonp-backend.component';
import { environment } from '../environments/environment';
import { OTEL_INSTRUMENTATION_PLUGINS } from '../../../opentelemetry-interceptor/src/lib/configuration/opentelemetry-config';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';


@NgModule({
  declarations: [AppComponent, ViewBackendComponent, PostBackendComponent, JsonpBackendComponent],
  imports: [
    BrowserModule,
    OtelWebTracerModule.forRoot(
      undefined,
      {provide: OTEL_CONFIG, useFactory: () => (environment.openTelemetryConfig)}
    ),
    OtelColExporterModule,
    CompositePropagatorModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    HighlightJsModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: OTEL_INSTRUMENTATION_PLUGINS, useValue: [new XMLHttpRequestInstrumentation()]}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
