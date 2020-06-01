import { InjectionToken } from '@angular/core';

export enum Collector {
  jaeger = 'jaeger',
  zipkin = 'zipkin',
  otelcol = 'otelcol',
}

export enum Propagator {
  b3 = 'B3Propagator',
  httpTrace = 'HttpTraceContext',
  composite = 'CompositePropagator',
  jaeger = 'JaegerPropagator',
}

/**
 * Common configuration
 */
export interface CommonCollectorConfig {
  /** serviceName : Name of service in trace */
  serviceName: string;
  /** console : boolean to trace in console */
  console?: boolean;
  /** production : boolean to use a BatchSpanExporter(async) or SimpleSpanExporter(sync) */
  production?: boolean;
  /** collector */
  collector?: Collector;
  /** propagator */
  propagator?: Propagator;
  /** probabilitySampler */
  probabilitySampler?: number;
}

/**
 * OpenTelemetry Collector configuration
 */
export interface OtelCollectorConfig {
  /**
   * An url (Default value: http://localhost:9090/v1/trace)
   */
  url?: string;
}

/**
 * Jaeger Collector configuration
 */
export interface JaegerCollectorConfig {
  /** host */
  host?: string;
  /** port */
  port?: number;
}

/**
 * Configuration for Zipkin
 */
export interface ZipkinCollectorConfig {
  /**
   * An url (Default value: http://localhost:9411/api/v2/spans)
   */
  url?: string;
}

/**
 * Configuration for JaegerPropagatorConfig
 */
export interface JaegerPropagatorConfig {
  /**
   * A custom Header for the propagator
   */
  customHeader?: string;
}
/**
 * OpenTelemetryConfig
 */
export interface OpenTelemetryConfig {
  /** commonConfig */
  commonConfig: CommonCollectorConfig;
  /** jaegerConfig */
  jaegerConfig?: JaegerCollectorConfig;
  /** zipkinConfig */
  zipkinConfig?: ZipkinCollectorConfig;
  /** otelcolConfig */
  otelcolConfig?: OtelCollectorConfig;
  /** jaegerPropagatorConfig */
  jaegerPropagatorConfig?: JaegerPropagatorConfig;
}

/** OpenTelemetryInjectConfig : Config injection */
export const OpenTelemetryInjectConfig = new InjectionToken<
  OpenTelemetryConfig
>('opentelemetry.config');
