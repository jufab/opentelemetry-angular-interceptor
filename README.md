# OpenTelemetry Angular Interceptor

@jufab/opentelemetry-angular-interceptor is an Angular Library to deploy [OpenTelemetry](https://opentelemetry.io/) in your Angular application

This library uses [opentelemetry-js package](https://github.com/open-telemetry/opentelemetry-js)

**Only works for Angular >= 9.0.0**

More info : https://jufab.github.io/opentelemetry-angular-interceptor/

[![npm version](https://badge.fury.io/js/%40jufab%2Fopentelemetry-angular-interceptor.svg)](https://badge.fury.io/js/%40jufab%2Fopentelemetry-angular-interceptor)
[![codecov](https://codecov.io/gh/jufab/opentelemetry-angular-interceptor/branch/master/graph/badge.svg)](https://codecov.io/gh/jufab/opentelemetry-angular-interceptor)

## Table of contents

- [OpenTelemetry Angular Interceptor](#opentelemetry-angular-interceptor)
  - [Table of contents](#table-of-contents)
  - [Getting started](#getting-started)
    - [Content](#content)
    - [Installation](#installation)
    - [Configuration](#configuration)
      - [Example global Configuration](#example-global-configuration)
      - [Common Configuration](#common-configuration)
      - [BatchSpanProcessor Configuration](#batchspanprocessor-configuration)
      - [OpenTelemetry-collector Configuration](#opentelemetry-collector-configuration)
      - [Jaeger Propagator Configuration](#jaeger-propagator-configuration)
      - [Zipkin Exporter Configuration](#zipkin-exporter-configuration)
      - [B3 Propagator Configuration](#b3-propagator-configuration)
      - [Instrumentation Configuration](#instrumentation-configuration)
    - [Angular module](#angular-module)
      - [Commons Module](#commons-module)
        - [Exporter module](#exporter-module)
        - [Propagator module](#propagator-module)
      - [Interceptor Module](#interceptor-module)
      - [Instrumentation Module](#instrumentation-module)
      - [Interceptor Module And Instrumentation Module](#interceptor-module-and-instrumentation-module)
    - [Component otel-instrumentation](#component-otel-instrumentation)
    - [(Optional) Logging in OtelColExporterModule](#optional-logging-in-otelcolexportermodule)
      - [NGXLogger](#ngxlogger)
    - [(Optional) Add span attributes during interception](#optional-add-span-attributes-during-interception)
  - [How it works](#how-it-works)
  - [Example](#example)
    - [Run](#run)
      - [Interceptor](#interceptor)
      - [Instrumentation](#instrumentation)
    - [[Optional] Result in OpenTelemetry-collector](#optional-result-in-opentelemetry-collector)
  - [Troubleshoot](#troubleshoot)
    - [Angular 10 Warning](#angular-10-warning)
    - [Other](#other)

## Getting started

### Content

This library offers two possibilities to use it in Angular App : 
- **Interceptor** : catch every external call with the HttpClient from angular
- **Instrumentation** : use instrumentation from opentelemetry-js with three web plugins : 
  - [@opentelemetry/instrumentation-document-load](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/web/opentelemetry-instrumentation-document-load)
  - [@opentelemetry/instrumentation-fetch](https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-instrumentation-fetch)
  - [@opentelemetry/instrumentation-xml-http-request](https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-instrumentation-xml-http-request)

### Installation

With npm :

```
npm i @jufab/opentelemetry-angular-interceptor @opentelemetry/api @opentelemetry/web @opentelemetry/tracing @opentelemetry/core @opentelemetry/semantic-conventions @opentelemetry/resources @opentelemetry/exporter-collector @opentelemetry/exporter-zipkin @opentelemetry/propagator-b3 @opentelemetry/propagator-jaeger @opentelemetry/context-zone-peer-dep @opentelemetry/instrumentation @opentelemetry/instrumentation-document-load @opentelemetry/instrumentation-fetch @opentelemetry/instrumentation-xml-http-request
```

### Configuration

Use the "OpentelemetryConfig" interface to configure the Tracer

```typescript
export interface OpenTelemetryConfig {
  commonConfig: CommonCollectorConfig;
  batchSpanProcessorConfig?: BatchSpanProcessorConfig;
  otelcolConfig?: OtelCollectorConfig;
  jaegerPropagatorConfig?: JaegerPropagatorConfig;
  zipkinConfig?: ZipkinCollectorConfig;
  b3PropagatorConfig?: B3PropagatorConfig;
  instrumentationConfig?: InstrumentationConfig;
}
```

#### Example global Configuration

_From the interceptor-example_

```typescript
opentelemetryConfig: {
    commonConfig: {
      console: true, //(boolean) Display trace on console
      production: false, //(boolean) Send trace with BatchSpanProcessor (true) or SimpleSpanProcessor (false)
      logBody: true, //(boolean) true add body in a log, nothing otherwise
      serviceName: 'interceptor-example', //Service name send in trace
      probabilitySampler: '0.7', //Samples a configurable percentage of traces, string value between '0' to '1'
      logLevel:DiagLogLevel.ALL //(Enum) DiagLogLevel is an Enum from @opentelemetry/api
    },
    batchSpanProcessorConfig: { //Only if production = true in commonConfig
      maxQueueSize: '2048', // The maximum queue size. After the size is reached spans are dropped.
      maxExportBatchSize: '512', // The maximum batch size of every export. It must be smaller or equal to maxQueueSize.
      scheduledDelayMillis: '5000', // The interval between two consecutive exports
      exportTimeoutMillis: '30000', // How long the export can run before it is cancelled
    },
    otelcolConfig: {
      url: 'http://localhost:55681/v1/traces', //URL of opentelemetry collector
    },
    jaegerPropagatorConfig: {
      customHeader: 'custom-header',
    }
  }
```

_From the instrumentation-example_

```typescript
export const environment: IEnvironment = {
  production: false,
  urlTest: 'http://localhost:4200/api',
  openTelemetryConfig: {
    commonConfig: {
      console: true, // Display trace on console
      production: false, // Send Trace with BatchSpanProcessor (true) or SimpleSpanProcessor (false)
      serviceName: 'instrumentation-example', // Service name send in trace
      probabilitySampler: '0.75', // 75% sampling
      logLevel: DiagLogLevel.ALL //ALL Log, DiagLogLevel is an Enum from @opentelemetry/api
    },
    otelcolConfig: {
      url: 'http://localhost:55681/v1/traces', // URL of opentelemetry collector
    },
    instrumentationConfig: {
      xmlHttpRequest: true,
      fetch: true,
      documentLoad: true,
    }
  }
};

```

#### Common Configuration
 
 * console: (boolean) Display trace on console if true
 * production: (boolean)Send trace via BatchSpanProcessor (Async) or SimpleSpanProcessor (Sync) : It's recommend to use BatchSpanProcessor on Production.
 * serviceName: (string) Service name in your trace
 * probabilitySampler: (string) Samples a configurable percentage of traces, value between 0 to 1
 * logBody: (boolean) true add body in a log, nothing otherwise
 * logLevel: (DiagLogLevel) log level

#### BatchSpanProcessor Configuration

_This configuration applies if production is true in commonConfig._

* maxQueueSize: (string) The maximum queue size. After the size is reached spans are dropped.
* maxExportBatchSize: (string) The maximum batch size of every export. It must be smaller or equal to maxQueueSize.
* scheduledDelayMillis: (string) The interval between two consecutive exports
* exportTimeoutMillis: (string) How long the export can run before it is cancelled

#### OpenTelemetry-collector Configuration

* url: (string) url of opentelemetry collector (default : http://localhost:55681/v1/traces)
* headers: list of custom header (more info: https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-exporter-collector)
* attributes : list of custom attributes (more info : https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-exporter-collector)
* concurrencyLimit (string) : An optional limit on pending requests (more info : https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-exporter-collector)

#### Jaeger Propagator Configuration

* customHeader: (string) custom header (more info : https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-exporter-jaeger)

#### Zipkin Exporter Configuration

* url: (string) url of zipkin collector (default : http://localhost:9411/api/v2/spans)
* headers: list of custom header (more info : hhttps://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-exporter-zipkin)

#### B3 Propagator Configuration

* multiHeader : (string) Single or Multi Header for b3propagator (default: multi). Value : 'O' (single), '1' (multi) (more info: https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-propagator-b3)

#### Instrumentation Configuration

_this configuration is only for the instrumentation Mode_

* xmlHttpRequest: (boolean) Activate XmlHttpRequest plugin
* fetch:(boolean) Activate fetch plugin
* documentLoad: (boolean) Activate documentLoad plugin

### Angular module

You need 3 modules to add to your application.

- [Exporter Module](#exporter-module) : to define type and export of traces.
- [Propagator Module](#propagator-module) : to define propagation in your HTTP header.
- Last Module, 2 choices :  
  - [OpenTelemetryInterceptorModule](#interceptor-module) : to activate interceptor in all your http call.
  - [OtelWebTracerModule](#instrumentation-module) : to activate instrumentation (you need a component to activate it, see [Component otel-instrumentation](#component-otel-instrumentation)).

#### Commons Module

You add this modules in your application module (generally app.module.ts)

##### Exporter module

There is 3 exporters:
* OtelColExporterModule : OpenTelemetry exporter (more info : https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-exporter-collector)
* ConsoleSpanExporterModule : Console Exporter
* ZipkinExporterModule : Zipkin Exporter (more info : https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-exporter-zipkin)

##### Propagator module

there is 5 propagators (more info about propagator: https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-core)
* NoopHttpTextPropagatorModule : This is a fake propagator
* B3PropagatorModule : Use B3 propagator
* HttpTraceContextPropagatorModule : Use HttpTraceContext propagator
* JaegerHttpTracePropagatorModule : Use JaegerHttpPropagator (more info about this one: https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-propagator-jaeger)
* CompositePropagatorModule : use all of the propagator

#### Interceptor Module

Just add OpenTelemetryInterceptorModule to insert Interceptor

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

#### Instrumentation Module

Declare this OtelWebTracerModule to configure instrumentation


```typescript
...
import { OtelColExporterModule, CompositePropagatorModule, OtelWebTracerModule } from 'projects/opentelemetry-interceptor/src/public-api';
...

@NgModule({
  declarations: [AppComponent, ...],
  imports: [
    ...
    // OtelCol Exporter Module
    OtelColExporterModule,
    // Composite Propagator Module
    CompositePropagatorModule,
    // OtelWebTracerModule to configure instrumentation component.
    OtelWebTracerModule.forRoot(environment.openTelemetryConfig),
    ...
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

```

#### Interceptor Module And Instrumentation Module

`Don't use them at the same time : you're going to have the same trace twice.`


### Component otel-instrumentation

A component named `otel-instrumentation` must be add in your application.

_In instrumentation-example, this component is in app.component.html like this :_

```xml
...
<otel-instrumentation></otel-instrumentation>
...
```

_there is no configuration/directive need : all is in OtelWebTracerModule_

### (Optional) Logging in OtelColExporterModule

You can add a logger to the [OtelColExporterModule](projects/opentelemetry-interceptor/src/lib/services/exporter/otelcol/otelcol-exporter.module.ts) with the [OTELCOL_LOGGER](projects/opentelemetry-interceptor/src/lib/configuration/opentelemetry-config.ts) token.

You can use a custom logger which implements the [DiagLogger](https://open-telemetry.github.io/opentelemetry-js/interfaces/diaglogger.html) in @opentelemetry/api.

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

Don't forget to set "logLevel" in [Common Configuration](#common-configuration) (Level must be the same between NGXLogger and common configuration)

> You can see an example in the [interceptor-example](#example).

### (Optional) Add span attributes during interception

_This option is only available for Interceptor Module_

Implement a [`CustomSpan`](projects/opentelemetry-interceptor/src/lib/interceptor/custom-span.interface.ts) and the method `add(span: Span, request: HttpRequest<unknown>, response: HttpResponse<unknown> | HttpErrorResponse): Span`

- span : Current span, you can set or get attributes
- request : Current request in interceptor
- response : Current response in interceptor 


Implement CustomSpan class like : 

```typescript
class CustomSpanImpl implements CustomSpan {
  add(span: Span, request: HttpRequest<unknown>, response: HttpResponse<unknown> | HttpErrorResponse): Span {
    span.setAttribute('mycustom.key', request.params + ";" + response.status);
    return span;
  }
}
```

Inject it in you App module with `CUSTOM_SPAN` :

```typescript
@NgModule({
  ...
  providers: [
    ...
    { provide: CUSTOM_SPAN, useClass: CustomSpanImpl }
    ...
  ]
```

> You can see an example in the [interceptor-example](#example).

## How it works

This library is based on [HttpClientModule](https://angular.io/api/common/http/HttpClientModule) and the [HTTP_INTERCEPTORS](https://angular.io/api/common/http/HTTP_INTERCEPTORS)

OpenTelemetryInterceptor implement an [HttpInterceptor](https://angular.io/api/common/http/HttpInterceptor) and the intercept method.

This implementation initialise a [WebTracerProvider](https://github.com/open-telemetry/opentelemetry-js/blob/main/packages/opentelemetry-web/src/WebTracerProvider.ts), create a [Span](https://open-telemetry.github.io/opentelemetry-js/interfaces/span.html) and add [header propagation](https://open-telemetry.github.io/opentelemetry-js/interfaces/textmappropagator.html) in the current call.

> The response body is adding by an event in span.

## Example

This project has two example Angular Application:

- [projects/interceptor-example](projects/interceptor-example)
- [projects/instrumentation-example](projects/instrumentation-example)


You can see how configure and insert all modules.

You can althought test __opentelemetry-angular-interceptor__ with this two applications.

### Run

#### Interceptor

To start this Interceptor example application, run command :

```
npm run start:complete-interceptor-example
```

and open the application at http://localhost:4200

#### Instrumentation

To start this Instrumentation example application, run command :

```
npm run start:complete-instrumentation-example
```

and open the application at http://localhost:4200

### [Optional] Result in OpenTelemetry-collector

If you want to see the result in a collector *, there's a docker-compose available in this project.

You can start it with this command :

```
docker-compose -f collector/docker-compose.yaml up -d
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
    "@opentelemetry/api",
    "@opentelemetry/exporter-collector",
    "@opentelemetry/exporter-zipkin",
    "@opentelemetry/tracing",
    "@opentelemetry/web",
    "@opentelemetry/core",
    "@opentelemetry/propagator-jaeger",
    "@opentelemetry/propagator-b3",
    "@opentelemetry/instrumentation",
    "@opentelemetry/instrumentation-xml-http-request",
    "@opentelemetry/instrumentation-document-load",
    "@opentelemetry/instrumentation-fetch",
    "@opentelemetry/context-zone-peer-dep"
  ],
```

### Other

|Error|Fix|
|-----|---|
|error TS2694: Namespace 'NodeJS' has no exported member 'Timeout'.|Need dependence @type/node >= 12.0.2|
|error TS1086: An accessor cannot be declared in an ambient context.|Need dependence typescript >= 3.6.0|
