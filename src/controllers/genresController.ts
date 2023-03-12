import repository = require("../database/repositories/genresRepository");
import { HttpRequest } from "../framework/HttpRequest";
import { HttpResponse } from "../framework/HttpResponse";

export function getGenres(req: HttpRequest, res: HttpResponse) {
  repository
    .getGenres()
    .then(genres => {
      res.send(200, "application/json", JSON.stringify(genres.rows));
    })
    .catch(error => {
      res.send(500, "text/plain", error);
    });
}

export function getGenreById(req: HttpRequest, res: HttpResponse) {
  const genreId = req.params.get("id");
  if (!genreId) {
    res.send(400, "text/plain", "Parameter genreId cannot be empty");
    return;
  }
  repository
    .getGenreById(genreId)
    .then(genres => {
      res.send(200, "application/json", JSON.stringify(genres.rows[0]));
    })
    .catch(error => {
      res.send(500, "text/plain", error.stack);
    });
}

export function addNewGenre(req: HttpRequest, res: HttpResponse) {
  if (!req.body) {
    res.send(400, "text/plain", "Body cannot be empty");
    return;
  }
  const requestBody = req.body as { name: string };
  const name = requestBody.name;
  if (!name) {
    res.send(400, "text/plain", "Parameter name cannot be empty");
    return;
  }
  repository
    .addNewGenre(name)
    .then(genres => {
      res.send(200, "application/json", JSON.stringify(genres.rows[0]));
    })
    .catch(error => {
      res.send(500, "text/plain", error.stack);
    });
}

export function updateGenre(req: HttpRequest, res: HttpResponse) {
  const genreId = req.params.get("id");
  if (!genreId) {
    res.send(400, "text/plain", "Parameter genreId cannot be empty");
    return;
  }
  if (!req.body) {
    res.send(400, "text/plain", "Body cannot be empty");
    return;
  }
  const requestBody = req.body as { name: string };
  const name = requestBody.name;
  if (!name) {
    res.send(400, "text/plain", "Parameter name cannot be empty");
    return;
  }
  repository
    .updateGenre(name, genreId)
    .then(genres => {
      res.send(200, "application/json", JSON.stringify(genres.rows[0]));
    })
    .catch(error => {
      res.send(500, "text/plain", error.stack);
    });
}

export function deleteGenre(req: HttpRequest, res: HttpResponse) {
  const genreId = req.params.get("id");
  if (!genreId) {
    res.send(400, "text/plain", "Parameter genreId cannot be empty");
    return;
  }
  repository
    .deleteGenre(genreId)
    .then(genres => {
      res.send(200, "application/json", JSON.stringify(genres.rows));
    })
    .catch(error => {
      res.send(500, "text/plain", error.stack);
    });
}
