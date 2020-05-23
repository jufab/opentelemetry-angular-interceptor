# OpenTelemetry Angular Interceptor

## About

@jufab/opentelemetry-angular-interceptor library is a Library as an Angular Module to integrate [OpenTelemetry](https://opentelemetry.io/) in your angular application

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


#### Common Configuration




#### OpenTelemetry-collector Configuration


#### Zipkin Collector Configuration


#### Jaeger Collector Configuration

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
