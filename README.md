# OpenTelemetry Angular Interceptor

## About

@jufab/opentelemetry-angular-interceptor is a Library as an Angular Module to integrate [OpenTelemetry](https://opentelemetry.io/) in your Angular application

## Getting started

### Installation

With npm :

```console
npm i -P @jufab/opentelemetry-angular-interceptor
```

With angular-cli :

```console
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

```json
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

## Example

"example-app" is an Angular application .....

### Run


To start this Example application, run command :

```console
npm run start:complete-example-app
```

### [Optional] Result in OpenTelemtery-collector

If you want to see the result in a collector*, there's a docker-compose in this project.

you can start it with this command :

```console
docker-compose -f projects/example-app/collector/docker-compose.yaml up -d
```

And you can see the result of your generate trace in Jaeger (http://localhost:16686)

More info about the collector here : https://github.com/open-telemetry/opentelemetry-collector

\* _Note : without an Agent or a Collector you can see an error in your browser about send a "trace"._
