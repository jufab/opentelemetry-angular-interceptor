import { InjectionToken } from '@angular/core';

export class OpentelemetryConfig {
    endpoint?:string;
}

export const OpentelemetryInjectConfig = new InjectionToken<OpentelemetryConfig>('opentelemetry.config');
