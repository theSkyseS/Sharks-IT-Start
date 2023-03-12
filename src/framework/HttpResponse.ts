import http = require("http");

export interface HttpResponse extends http.ServerResponse {
  send: (statusCode: number, contentType: string, data: unknown) => void;
}
