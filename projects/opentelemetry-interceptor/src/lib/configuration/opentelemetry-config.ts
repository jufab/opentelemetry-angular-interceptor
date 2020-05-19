import { InjectionToken } from '@angular/core';

export enum Collector {
  jaeger = 'jaeger',
  zipkin = 'zipkin',
  otelcol = 'otelcol',
}

export enum Propagator {
  b3 = 'B3Propagator',
  httpTrace = 'HttpTraceContext',
  composite = 'composite',
}

export interface CommonCollectorConfig {
  serviceName: string;
  console?:boolean;
  production?:boolean;
  collector: Collector;
  propagator: Propagator;
}

export interface OtelCollectorConfig {
  url?: string;
  //voir ici https://github.com/open-telemetry/opentelemetry-js/blob/master/packages/opentelemetry-exporter-collector/src/CollectorExporter.ts
}

export interface JaegerCollectorConfig {
  host?: string;
  port?: number;
  //voir pour rajouter le reste : https://github.com/open-telemetry/opentelemetry-js/blob/master/packages/opentelemetry-exporter-jaeger/src/types.ts
}

export interface ZipkinCollectorConfig {
  url?: string;
  // voir ici pour rajouter : https://github.com/open-telemetry/opentelemetry-js/blob/master/packages/opentelemetry-exporter-zipkin/src/types.ts
}

export interface OpentelemetryConfig {
  commonConfig: CommonCollectorConfig;
  jaegerConfig?: JaegerCollectorConfig;
  zipkinConfig?: ZipkinCollectorConfig;
  otelcolConfig?: OtelCollectorConfig;
}

export const OpentelemetryInjectConfig = new InjectionToken<OpentelemetryConfig>('opentelemetry.config');
