# OpenTelemetry Angular Interceptor

## About

@jufab/opentelemetry-angular-interceptor is an Angular Library to deploy [OpenTelemetry](https://opentelemetry.io/) in your Angular application

## Table of contents

- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
    - [Example global Configuration](#example-global-configuration)
    - [Common Configuration](#common-configuration)
    - [OpenTelemetry-collector Configuration](#opentelemetry-collector-configuration)
    - [Zipkin Collector Configuration](#zipkin-collector-configuration)
    - [Jaeger Collector Configuration](#jaeger-collector-configuration)
  - [Angular Module](#angular-module)
- [Example](#example)
  - [Run](#run)
  - [[Optional] Result in OpenTelemtery-collector](#optional-result-in-opentelemtery-collector)

## Getting started

### Installation

With npm :

```
npm i -P @jufab/opentelemetry-angular-interceptor
```

With angular-cli :

```
ng add @jufab/opentelemetry-angular-interceptor
```

### Configuration

Use the "OpentelemetryConfig" interface to configure the Tracer

```typescript
export interface OpentelemetryConfig {
  commonConfig: CommonCollectorConfig;
  jaegerConfig?: JaegerCollectorConfig;
  zipkinConfig?: ZipkinCollectorConfig;
  otelcolConfig?: OtelCollectorConfig;
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
      collector: Collector.otelcol, //Enum to specified the collector : OpenTelemetry Collector(otelcol), Zipkin (zipkin), Jaeger (jaeger)
      propagator: Propagator.b3, //Enum to propagator : B3 (b3), HttpTraceContext (httpTrace)
    },
    otelcolConfig: {
      url: 'http://localhost:9090/v1/trace', //URL of opentelemetry collector
    },
    zipkinConfig: {
      url: 'http://localhost:9411/api/v2/spans', //url of zipkin collector
    },
    jaegerConfig: {
      host: 'localhost', //Host and port of jaeger's agent.
      port: 6832,
    }
  }

```

#### Common Configuration
 
 * console: (boolean) Display trace on console if true
 * production: (boolean)Send trace via BatchSpanProcessor (Async) or SimpleSpanProcessor (Sync) : It's recommend to use BatchSpanProcessor on Production.
 * serviceName: (string) Service name in your trace
 * collector: (Enum) use Enum Collector (otelcol,zipkin,jaeger)
 * propagator: (Enum) use Propagator Enum (b3,httpTrace)

#### OpenTelemetry-collector Configuration

* url: (string) url of opentelemetry collector (default : http://localhost:9090/v1/trace)

#### Zipkin Collector Configuration

* url: (string) url of zipkin collector (default : http://localhost:9411/api/v2/spans)

#### Jaeger Collector Configuration

* host: (string) host jaeger agent
* port: (string) port jaeger agent

### Angular Module

To insert OpenTelemetryInterceptorModule, you can add in your application module (generally app.module.ts)

```typescript
import { NgModule } from '@angular/core';
...
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OpenTelemetryInterceptorModule } from '@jufab/opentelemetry-angular-interceptor';
import { environment } from '../environments/environment';
...

@NgModule({
  declarations: [AppComponent, ...],
  imports: [
    ...
    HttpClientModule,
    //Insert module OpenTelemetryInterceptorModule with configuration, HttpClientModule is used for interceptor
    OpenTelemetryInterceptorModule.forRoot(environment.opentelemetryConfig),
    ...
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Example

This project have an "example-app" as Angular application example.

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

> _* without an Agent or a Collector you can see an error in your browser about to send a "trace"._
