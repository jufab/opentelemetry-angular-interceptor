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
import { OpenTelemetryInterceptorModule } from 'projects/opentelemetry-interceptor/src/public-api';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewBackendComponent } from './view-backend/view-backend.component';
import { HighlightJsModule } from 'ngx-highlight-js';
import { AppRoutingModule } from './app-routing.module';
import { PostBackendComponent } from './post-backend/post-backend.component';
import { JsonpBackendComponent } from './jsonp-backend/jsonp-backend.component';
import { OtelColExporterModule } from '../../../opentelemetry-interceptor/src/lib/services/exporter/otelcol/otelcol-exporter.module';
// import { ConsoleSpanExporterModule } from '../../../opentelemetry-interceptor/src/lib/services/exporter/console/console-span-exporter.module';
import { CompositePropagatorModule } from '../../../opentelemetry-interceptor/src/lib/services/propagator/composite-propagator/composite-propagator.module';
// import { HttpTraceContextPropagatorModule } from '../../../opentelemetry-interceptor/src/lib/services/propagator/http-trace-context-propagator/http-trace-context-propagator.module';

@NgModule({
  declarations: [AppComponent, ViewBackendComponent, PostBackendComponent, JsonpBackendComponent],
  imports: [
    BrowserModule,
    // Insert module OpenTelemetryInterceptorModule with configuration, HttpClientModule is used for interceptor
    OpenTelemetryInterceptorModule.forRoot(environment.openTelemetryConfig),
    OtelColExporterModule,
    //ConsoleSpanExporterModule,
    CompositePropagatorModule,
    //HttpTraceContextPropagatorModule,
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
