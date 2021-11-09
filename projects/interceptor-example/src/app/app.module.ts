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
// eslint-disable-next-line max-len
import { OpenTelemetryInterceptorModule, OTLP_LOGGER, OtelColExporterModule, CompositePropagatorModule } from 'projects/opentelemetry-interceptor/src/public-api';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewBackendComponent } from './view-backend/view-backend.component';
import { HighlightJsModule } from 'ngx-highlight-js';
import { AppRoutingModule } from './app-routing.module';
import { PostBackendComponent } from './post-backend/post-backend.component';
import { JsonpBackendComponent } from './jsonp-backend/jsonp-backend.component';
import { LoggerModule, NGXLogger } from 'ngx-logger';
import { CUSTOM_SPAN } from '../../../opentelemetry-interceptor/src/lib/configuration/opentelemetry-config';
import { CustomSpanImpl } from './custom-span-impl';

@NgModule({
  declarations: [AppComponent, ViewBackendComponent, PostBackendComponent, JsonpBackendComponent],
  imports: [
    BrowserModule,
    // Insert module OpenTelemetryInterceptorModule with configuration, HttpClientModule is used for interceptor
    OpenTelemetryInterceptorModule.forRoot(environment.openTelemetryConfig),
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
    // Insert a logger (NGXLogger for this example...)
    LoggerModule.forRoot(environment.loggerConfig),
  ],
  providers: [
    // Provide token OTLP_LOGGER with the NGXLogger
    { provide: OTLP_LOGGER, useExisting: NGXLogger },
    { provide: CUSTOM_SPAN, useClass: CustomSpanImpl}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
