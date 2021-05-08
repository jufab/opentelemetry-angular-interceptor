import { HttpRequest, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Span } from "@opentelemetry/api";
import { CustomSpan } from "projects/opentelemetry-interceptor/src/public-api";

export class CustomSpanImpl implements CustomSpan {
  private myKey = "mycustom.key";
  add(span: Span, request: HttpRequest<unknown>, response: HttpResponse<unknown> | HttpErrorResponse): Span {
    span.setAttribute(this.myKey , request.params + ";" + response.status);
    return span;
  }
}
