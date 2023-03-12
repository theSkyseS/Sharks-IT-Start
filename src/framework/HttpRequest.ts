import http = require("http");

export interface HttpRequest extends http.IncomingMessage {
  body: unknown;
  params: URLSearchParams;
  path: string;
}
