# OpenTelemetry Angular Interceptor

@jufab/opentelemetry-angular-interceptor is an Angular Library to deploy [OpenTelemetry](https://opentelemetry.io/) in your Angular application

This library uses [opentelemetry-js package](https://github.com/open-telemetry/opentelemetry-js)

**Only works for Angular >= 9.0.0**

**Breaking Change!!! version 0.12.0 OtelCol exporter works only with Opentelemtry-collector >= 0.12.0 (see example)**

More info : https://jufab.github.io/opentelemetry-angular-interceptor/

[![npm version](https://badge.fury.io/js/%40jufab%2Fopentelemetry-angular-interceptor.svg)](https://badge.fury.io/js/%40jufab%2Fopentelemetry-angular-interceptor)
[![codecov](https://codecov.io/gh/jufab/opentelemetry-angular-interceptor/branch/master/graph/badge.svg)](https://codecov.io/gh/jufab/opentelemetry-angular-interceptor)

## Table of contents

- [OpenTelemetry Angular Interceptor](#opentelemetry-angular-interceptor)
  - [Table of contents](#table-of-contents)
  - [Getting started](#getting-started)
    - [Installation](#installation)
    - [Configuration](#configuration)
      - [Example global Configuration](#example-global-configuration)
      - [Common Configuration](#common-configuration)
      - [OpenTelemetry-collector Configuration](#opentelemetry-collector-configuration)
      - [Jaeger Propagator Configuration](#jaeger-propagator-configuration)
      - [Zipkin Exporter Configuration](#zipkin-exporter-configuration)
      - [B3 Propagator Configuration](#b3-propagator-configuration)
    - [Angular module](#angular-module)
      - [Exporter module](#exporter-module)
      - [Propagator module](#propagator-module)
    - [(Optional) Logging in OtelColExporterModule](#optional-logging-in-otelcolexportermodule)
      - [NGXLogger](#ngxlogger)
  - [How it works](#how-it-works)
  - [Example](#example)
    - [Run](#run)
    - [[Optional] Result in OpenTelemtery-collector](#optional-result-in-opentelemtery-collector)
  - [Troubleshoot](#troubleshoot)
    - [Angular 10 Warning](#angular-10-warning)
    - [Other](#other)

## Getting started

### Installation

With npm :

```
npm install @jufab/opentelemetry-angular-interceptor @opentelemetry/web @opentelemetry/exporter-collector @opentelemetry/exporter-zipkin @opentelemetry/propagator-jaeger @opentelemetry/propagator-b3
```

### Configuration

Use the "OpentelemetryConfig" interface to configure the Tracer

```typescript
export interface OpenTelemetryConfig {
  commonConfig: CommonCollectorConfig;
  otelcolConfig?: OtelCollectorConfig;
  jaegerPropagatorConfig?: JaegerPropagatorConfig;
  zipkinConfig?: ZipkinCollectorConfig;
  b3PropagatorConfig?: B3PropagatorConfig;
}
```

#### Example global Configuration

_From the example-app_

```typescript
opentelemetryConfig: {
    commonConfig: {
      console: true, //(boolean) Display trace on console
      production: false, //(boolean) Send trace with BatchSpanProcessor (true) or SimpleSpanProcessor (false) more info : https://github.com/open-telemetry/opentelemetry-js/tree/master/packages/opentelemetry-api#tracing
      serviceName: 'example-app', //Service name send in trace
      probabilitySampler: '0.7', //Samples a configurable percentage of traces, string value between '0' to '1'
    },
    otelcolConfig: {
      url: 'http://localhost:55681/v1/trace', //URL of opentelemetry collector
    },
    jaegerPropagatorConfig: {
      customHeader: 'custom-header',
    }
  }

```

#### Common Configuration
 
 * console: (boolean) Display trace on console if true
 * production: (boolean)Send trace via BatchSpanProcessor (Async) or SimpleSpanProcessor (Sync) : It's recommend to use BatchSpanProcessor on Production.
 * serviceName: (string) Service name in your trace
 * probabilitySampler: (string) Samples a configurable percentage of traces, value between 0 to 1

#### OpenTelemetry-collector Configuration

* url: (string) url of opentelemetry collector (default : http://localhost:55681/v1/trace)
* headers: list of custom header (more info: https://github.com/open-telemetry/opentelemetry-js/tree/master/packages/opentelemetry-exporter-collector)
* attributes : list of custom attributes (more info : https://github.com/open-telemetry/opentelemetry-js/tree/master/packages/opentelemetry-exporter-collector)

#### Jaeger Propagator Configuration

* customHeader: (string) custom header (more info : https://github.com/open-telemetry/opentelemetry-js-contrib/tree/master/propagators/opentelemetry-propagator-jaeger)

#### Zipkin Exporter Configuration

* url: (string) url of zipkin collector (default : http://localhost:9411/api/v2/spans)
* headers: list of custom header (more info : https://github.com/open-telemetry/opentelemetry-js/tree/master/packages/opentelemetry-exporter-zipkin)

#### B3 Propagator Configuration

* multiHeader : (string) Single or Multi Header for b3propagator (default: multi). Value : 'O' (single), '1' (multi) (more info: https://github.com/open-telemetry/opentelemetry-js/tree/master/packages/opentelemetry-propagator-b3)

### Angular module

To insert OpenTelemetryInterceptorModule, you can add in your application module (generally app.module.ts)

#### Exporter module

There is 3 exporters:
* OtelColExporterModule : OpenTelemetry exporter (more info : https://github.com/open-telemetry/opentelemetry-js/tree/master/packages/opentelemetry-exporter-collector)
* ConsoleSpanExporterModule : Console Exporter
* ZipkinExporterModule : Zipkin Exporter (more info : https://github.com/open-telemetry/opentelemetry-js/tree/master/packages/opentelemetry-exporter-zipkin)

#### Propagator module

there is 5 propagators (more info about propagator: https://github.com/open-telemetry/opentelemetry-js/tree/master/packages/opentelemetry-core)
* NoopHttpTextPropagatorModule : This is a fake propagator
* B3PropagatorModule : Use B3 propagator
* HttpTraceContextPropagatorModule : Use HttpTraceContext propagator
* JaegerHttpTracePropagatorModule : Use JaegerHttpPropagator (more info about this one: https://github.com/open-telemetry/opentelemetry-js-contrib/tree/master/propagators/opentelemetry-propagator-jaeger)
* CompositePropagatorModule : use all of the propagator



```typescript
import { NgModule } from '@angular/core';
...
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OpenTelemetryInterceptorModule, OtelColExporterModule, CompositePropagatorModule } from '@jufab/opentelemetry-angular-interceptor';
import { environment } from '../environments/environment';
...

@NgModule({
  declarations: [AppComponent, ...],
  imports: [
    ...
    HttpClientModule,
    //Insert module OpenTelemetryInterceptorModule with configuration, HttpClientModule is used for interceptor
    OpenTelemetryInterceptorModule.forRoot(environment.opentelemetryConfig),
    //Insert OtelCol exporter module
    OtelColExporterModule,
    //Insert propagator module
    CompositePropagatorModule,
    ...
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### (Optional) Logging in OtelColExporterModule

You can add a logger to the [OtelColExporterModule](projects/opentelemetry-interceptor/src/lib/services/exporter/otelcol/otelcol-exporter.module.ts) with the [OTELCOL_LOGGER](projects/opentelemetry-interceptor/src/lib/configuration/opentelemetry-config.ts) token.

You can use a custom logger which implements the [Logger](https://github.com/open-telemetry/opentelemetry-js/blob/master/packages/opentelemetry-api/src/common/Logger.ts) in @opentelemetry/api.

Or, you can use an existing logger which implements the same functions (error, warn, info, debug) like [ngx-logger](https://www.npmjs.com/package/ngx-logger).

#### NGXLogger

You can use [ngx-logger](https://www.npmjs.com/package/ngx-logger).

In your [appModule](projects/example-app/src/app/app.module.ts), insert LoggerModule and configure it

```typescript
@NgModule({
  ...
  imports: [
    LoggerModule.forRoot(environment.loggerConfig),
  ]
  ...
```
And use OTELCOL_LOGGER token to inject NGXLogger
```typescript
@NgModule({
  ...
  providers: [
    ...
    { provide: OTELCOL_LOGGER, useExisting: NGXLogger }
    ...
  ]
```

> You can see an example in the [example-app](#example).

## How it works

This library is based on [HttpClientModule](https://angular.io/api/common/http/HttpClientModule) and the [HTTP_INTERCEPTORS](https://angular.io/api/common/http/HTTP_INTERCEPTORS)

OpenTelemetryInterceptor implement an [HttpInterceptor](https://angular.io/api/common/http/HttpInterceptor) and the intercept method.

This implementation initialise a [WebTracerProvider](https://github.com/open-telemetry/opentelemetry-js/blob/master/packages/opentelemetry-web/src/WebTracerProvider.ts), create a [Span](https://open-telemetry.github.io/opentelemetry-js/interfaces/span.html) and add [header propagation](https://open-telemetry.github.io/opentelemetry-js/interfaces/httptextpropagator.html) in the current call.

> The response body is adding by an event in span.

## Example

This project have an "example-app" as Angular application example.

[projects/example-app](https://github.com/jufab/opentelemetry-angular-interceptor/tree/master/projects/example-app)

You can see how configure and insert this module.

You can althought test __opentelemetry-angular-interceptor__ with this application.

### Run


To start this Example application, run command :

```
npm run start:complete-example-app
```

and open the application at http://localhost:4200

### [Optional] Result in OpenTelemtery-collector

If you want to see the result in a collector *, there's a docker-compose available in this project.

You can start it with this command :

```
docker-compose -f projects/example-app/collector/docker-compose.yaml up -d
```

Go to the jaeger application (http://localhost:16686) to see result.

More info about the collector here : https://github.com/open-telemetry/opentelemetry-collector

> _* without an Agent or a Collector you can see an error in your browser about sending a "trace"._


## Troubleshoot

### Angular 10 Warning

```shell
WARNING in xxx/fesm2015/jufab-opentelemetry-angular-interceptor.js depends on '@opentelemetry/web'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

WARNING in xxx/fesm2015/jufab-opentelemetry-angular-interceptor.js depends on '@opentelemetry/core'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

WARNING in xxx/fesm2015/jufab-opentelemetry-angular-interceptor.js depends on '@opentelemetry/tracing'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

WARNING in xxx/fesm2015/jufab-opentelemetry-angular-interceptor.js depends on '@opentelemetry/api'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

WARNING in xxx/fesm2015/jufab-opentelemetry-angular-interceptor.js depends on '@opentelemetry/exporter-collector/build/src/platform/browser'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies
```

Add to your angular.json

```json
"options": {
  "allowedCommonJsDependencies": [
    "@opentelemetry/web",
    "@opentelemetry/core",
    "@opentelemetry/tracing",
    "@opentelemetry/api",
    "@opentelemetry/exporter-collector",
    "@opentelemetry/context-base",
    "@opentelemetry/propagator-jaeger",
    "@opentelemetry/propagator-b3"
  ],
```

### Other

|Error|Fix|
|-----|---|
|error TS2694: Namespace 'NodeJS' has no exported member 'Timeout'.|Need dependence @type/node >= 12.0.2|
|error TS1086: An accessor cannot be declared in an ambient context.|Need dependence typescript >= 3.6.0|
