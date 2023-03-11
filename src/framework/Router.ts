import { HttpRequest } from "./HttpRequest";
import { HttpResponse } from "./HttpResponse";

interface Endpoints {
  [key: string]: {
    [key: string]: (req: HttpRequest, res: HttpResponse) => void;
  };
}

export class Router {
  endpoints: Endpoints;
  pathBase: string;
  constructor() {
    this.endpoints = {};
    this.pathBase = "";
  }

  request(
    method: string,
    path: string,
    handler: (req: HttpRequest, res: HttpResponse) => void
  ) {
    const fullPath = this.pathBase + path;
    if (!this.endpoints[fullPath]) {
      this.endpoints[fullPath] = {};
    }
    const endpoint = this.endpoints[fullPath];
    if (endpoint[method]) {
      throw new Error(`[$fullPath]:[$method] route already exists`);
    }

    endpoint[method] = handler;
  }

  get(path: string, handler: (req: HttpRequest, res: HttpResponse) => void) {
    this.request("GET", path, handler);
  }
  post(path: string, handler: (req: HttpRequest, res: HttpResponse) => void) {
    this.request("POST", path, handler);
  }
  put(path: string, handler: (req: HttpRequest, res: HttpResponse) => void) {
    this.request("PUT", path, handler);
  }
  delete(path: string, handler: (req: HttpRequest, res: HttpResponse) => void) {
    this.request("DELETE", path, handler);
  }
}
