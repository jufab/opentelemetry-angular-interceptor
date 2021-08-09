import { Component, OnInit } from '@angular/core';
import { InstrumentationService } from '../../services/instrumentation/instrumentation.service';


/**
 * Otel Web Tracer Component
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'otel-instrumentation',
  template: '',
})
export class OtelWebTracerComponent implements OnInit {

  /**
   * Constructor
   *
   * @param instrumentationService InstrumentationService
   */
  constructor(private instrumentationService: InstrumentationService) { }

  /**
   * Init Component
   */
  ngOnInit(): void {
   this.instrumentationService.initInstrumentation();
  }

}
