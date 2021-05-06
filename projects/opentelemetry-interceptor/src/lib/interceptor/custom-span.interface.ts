import { HttpErrorResponse, HttpRequest, HttpResponse } from "@angular/common/http";
import { Span } from "@opentelemetry/api";

export interface CustomSpan {
  add(span: Span, request: HttpRequest<unknown>, response: HttpResponse<unknown> | HttpErrorResponse): Span
}
