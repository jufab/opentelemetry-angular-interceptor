import { InjectionToken } from '@angular/core';

export enum Collector {
  jaeger = 'jaeger',
  zipkin = 'zipkin',
  otelcol = 'otelcol',
}

export enum Propagator {
  b3 = 'B3Propagator',
  httpTrace = 'HttpTraceContext',
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
  //see here https://github.com/open-telemetry/opentelemetry-js/blob/master/packages/opentelemetry-exporter-collector/src/CollectorExporter.ts
}

export interface JaegerCollectorConfig {
  host?: string;
  port?: number;
  //see here : https://github.com/open-telemetry/opentelemetry-js/blob/master/packages/opentelemetry-exporter-jaeger/src/types.ts
}

export interface ZipkinCollectorConfig {
  url?: string;
  // see here : https://github.com/open-telemetry/opentelemetry-js/blob/master/packages/opentelemetry-exporter-zipkin/src/types.ts
}

export interface OpentelemetryConfig {
  commonConfig: CommonCollectorConfig;
  jaegerConfig?: JaegerCollectorConfig;
  zipkinConfig?: ZipkinCollectorConfig;
  otelcolConfig?: OtelCollectorConfig;
}

export const OpentelemetryInjectConfig = new InjectionToken<OpentelemetryConfig>('opentelemetry.config');
