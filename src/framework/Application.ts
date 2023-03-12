import EventEmitter = require("events");
import http = require("http");
import { HttpRequest } from "./HttpRequest";
import { HttpResponse } from "./HttpResponse";
import { Router } from "./Router";

export class Application {
  emitter;
  server;
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._initServer();
  }

  listen(port: string | undefined, callback: () => void): void {
    this.server.listen(port, callback);
  }

  addRouter(router: Router) {
    Object.keys(router.endpoints).forEach(path => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach(method => {
        this.emitter.on(this._getRoute(path, method), (req, res) => {
          endpoint[method](req, res);
        });
      });
    });
  }

  _initServer() {
    return http.createServer((req, res) => {
      let body = "";

      req.on("data", chunk => {
        body += chunk;
      });

      req.on("end", () => {
        const request = this._getRequestFromIncomingMessage(req, body);
        const response = this._getResponseFromServerResponse(res);

        const emitted = this.emitter.emit(
          this._getRoute(request.path, request.method),
          request,
          response
        );

        if (!emitted) {
          response.writeHead(404, "Not found");
          response.end();
        }
      });
    });
  }

  _getRequestFromIncomingMessage(
    req: http.IncomingMessage,
    body: string
  ): HttpRequest {
    const request = req as HttpRequest;
    if (body) {
      request.body = JSON.parse(body);
    }
    if (!request.url) {
      throw new Error("request url is undefined");
    }
    const url = new URL(request.url, `http://${request.headers.host}`);
    request.params = url.searchParams;
    request.path = url.pathname;
    return request;
  }

  _getResponseFromServerResponse(res: http.ServerResponse): HttpResponse {
    const response = res as HttpResponse;
    response.send = (
      statusCode: number,
      contentType: string,
      data: unknown
    ) => {
      response.writeHead(statusCode, { "Content-type": contentType });
      response.end(data);
    };

    return response;
  }

  _getRoute = (path?: string, method?: string) => `[${path}]:[${method}]`;
}
