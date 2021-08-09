import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Span } from '@opentelemetry/api';

/**
 * Interface Injected in HttpInterceptor to add attributes in a Span.
 * Implements this interface
 */
export interface CustomSpan {
  /**
   * To add Attributes in a Span during interception.
   *
   * @param span Span
   * @param request an HttpRequest
   * @param response an HttpResponse
   */
  add(span: Span, request: HttpRequest<unknown>, response: HttpResponse<unknown> | HttpErrorResponse): Span;
}
