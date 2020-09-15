import { InjectionToken } from '@angular/core';
import { Logger } from '@opentelemetry/api';

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
  /** probabilitySampler */
  probabilitySampler?: string;
}

/**
 * OpenTelemetry Collector configuration
 */
export interface OtelCollectorConfig {
  /**
   * An url (Default value: http://localhost:55681/v1/trace)
   */
  url?: string;
  /**
   * custom headers
   */
  headers?: Partial<Record<string, unknown>>;
  /**
   * attributes : define some custom attributes
   */
  attributes?: Partial<Record<string, unknown>>;
  /**
   * Logger : use an implementation of @opentelemetry/api Logger
   */
  logger?: Logger;
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
  /** otelcolConfig */
  otelcolConfig?: OtelCollectorConfig;
  /** jaegerPropagatorConfig */
  jaegerPropagatorConfig?: JaegerPropagatorConfig;
}

/** OpenTelemetryInjectConfig : Config injection */
export const OpenTelemetryInjectConfig = new InjectionToken<
  OpenTelemetryConfig
>('opentelemetry.config');
