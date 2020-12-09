import { InjectionToken } from '@angular/core';
import { Logger, Attributes } from '@opentelemetry/api';

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
  attributes?: Attributes;
}

/**
 * Configuration for Zipkin
 */
export interface ZipkinCollectorConfig {
  /**
   * An url (Default value: http://localhost:9411/api/v2/spans)
   */
  url?: string;
  /**
   * custom headers
   */
  headers?: {
    [key: string]: string;
  };
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
 * Configuration for B3PropagatorConfig
 */
export interface B3PropagatorConfig {
  /**
   * Single or Multi Header for b3propagator (default: multi)
   * Value : 'O' (single), '1' (multi)
   */
  multiHeader?: string;
}
/**
 * OpenTelemetryConfig
 */
export interface OpenTelemetryConfig {
  /** commonConfig */
  commonConfig: CommonCollectorConfig;
  /** otelcolConfig */
  otelcolConfig?: OtelCollectorConfig;
  /** zipkinConfig */
  zipkinConfig?: ZipkinCollectorConfig;
  /** jaegerPropagatorConfig */
  jaegerPropagatorConfig?: JaegerPropagatorConfig;
  /** b3PropagatorConfig */
  b3PropagatorConfig?: B3PropagatorConfig;
}

/** OpenTelemetryInjectConfig : Config injection */
export const OpenTelemetryInjectConfig = new InjectionToken<OpenTelemetryConfig>('opentelemetry.config');

/** Logger : injection for a logger compatible */
export const OTELCOL_LOGGER = new InjectionToken<Logger>('otelcol.logger');
