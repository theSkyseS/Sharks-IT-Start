import genresRepository = require("../database/repositories/genresRepository");
import filmsRepository = require("../database/repositories/filmsRepository");
import { HttpRequest } from "../framework/HttpRequest";
import { HttpResponse } from "../framework/HttpResponse";

export function getGenres(req: HttpRequest, res: HttpResponse) {
  genresRepository
    .getGenres()
    .then(genres => {
      res.send(200, "application/json", JSON.stringify(genres.rows));
    })
    .catch(error => {
      res.send(500, "text/plain", error);
    });
}

export function getGenreById(req: HttpRequest, res: HttpResponse) {
  const genreId = validateParameterId(req.params.get("id"));
  if (!genreId) {
    res.send(400, "text/plain", "Parameter id cannot be empty or NaN");
    return;
  }
  genresRepository
    .getGenreById(genreId)
    .then(genres => {
      res.send(200, "application/json", JSON.stringify(genres.rows[0]));
    })
    .catch(error => {
      res.send(500, "text/plain", error.stack);
    });
}

export function addNewGenre(req: HttpRequest, res: HttpResponse) {
  const requestBody = validateRequestBody(req.body);
  if (!requestBody) {
    res.send(400, "text/plain", "Request body is invalid");
    return;
  }
  genresRepository
    .addNewGenre(requestBody.name)
    .then(genres => {
      res.send(201, "application/json", JSON.stringify(genres.rows[0]));
    })
    .catch(error => {
      res.send(500, "text/plain", error.stack);
    });
}

export function updateGenre(req: HttpRequest, res: HttpResponse) {
  const genreId = validateParameterId(req.params.get("id"));
  if (!genreId) {
    res.send(400, "text/plain", "Parameter id cannot be empty or NaN");
    return;
  }
  const requestBody = validateRequestBody(req.body);
  if (!requestBody) {
    res.send(400, "text/plain", "Request body is invalid");
    return;
  }
  genresRepository
    .updateGenre(requestBody.name, +genreId)
    .then(genres => {
      res.send(200, "application/json", JSON.stringify(genres.rows[0]));
    })
    .catch(error => {
      res.send(500, "text/plain", error.stack);
    });
}

export function deleteGenre(req: HttpRequest, res: HttpResponse) {
  const genreId = validateParameterId(req.params.get("id"));
  if (!genreId) {
    res.send(400, "text/plain", "Parameter id cannot be empty or NaN");
    return;
  }
  genresRepository
    .deleteGenre(genreId)
    .then(genres => {
      res.send(200, "application/json", JSON.stringify(genres.rows));
    })
    .catch(error => {
      res.send(500, "text/plain", error.stack);
    });
}

export function getFilmsByGenreId(req: HttpRequest, res: HttpResponse) {
  const genreId = validateParameterId(req.params.get("id"));
  if (!genreId) {
    res.send(400, "text/plain", "Parameter id cannot be empty or Nan");
    return;
  }
  filmsRepository
    .getFilmsByGenreId(genreId)
    .then(films => {
      res.send(200, "application/json", JSON.stringify(films.rows));
    })
    .catch(error => {
      res.send(500, "text/plain", error.stack);
    });
}

function validateRequestBody(body: unknown): { name: string } | undefined {
  if (!body) {
    return;
  }
  const requestBody = body as { name: string };
  const name = requestBody.name;
  if (!name) {
    return;
  }
  return requestBody;
}

function validateParameterId(id: unknown): number | undefined {
  if (!id || !isFinite(+id)) {
    return;
  }
  return +id;
}
