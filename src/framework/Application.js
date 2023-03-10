const http = require("http");
const EventEmitter = require("events");

module.exports = class Application {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._initServer();
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  addRouter(router) {
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
        if (body) {
          req.body = JSON.parse(body);
        }
        this._parseUrl(req);

        const emitted = this.emitter.emit(
          this._getRoute(req.path, req.method),
          req,
          res
        );

        if (!emitted) {
          res.writeHead(404, "Not found");
          res.end();
        }
      });
    });
  }

  _parseUrl(request) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    request.searchParams = url.searchParams;
    request.path = url.pathname;
  }

  _getRoute = (path, method) => `[${path}]:[${method}]`;
};
