import filmsRepository = require("../database/repositories/filmsRepository");
import genresRepository = require("../database/repositories/genresRepository");

import { HttpRequest } from "../framework/HttpRequest";
import { HttpResponse } from "../framework/HttpResponse";

export function getFilms(req: HttpRequest, res: HttpResponse) {
  filmsRepository.getFilms().then(films => {
    res.send(200, "applicaton/json", JSON.stringify(films.rows));
  });
}

export function getFilmById(req: HttpRequest, res: HttpResponse) {
  const filmId = validateParameterId(req.params.get("id"));
  if (!filmId) {
    res.send(400, "text/plain", "Parameter id cannot be empty or Nan");
    return;
  }
  filmsRepository
    .getFilmById(filmId)
    .then(films => {
      res.send(200, "application/json", JSON.stringify(films.rows[0]));
    })
    .catch(error => {
      res.send(500, "text/plain", error.stack);
    });
}

export function addNewFilm(req: HttpRequest, res: HttpResponse) {
  const requestBody = validateRequestBody(req.body);
  if (!requestBody) {
    res.send(400, "text/plain", "Invalid body");
    return;
  }
  filmsRepository
    .addNewFilm(requestBody.name, requestBody.year)
    .then(films => {
      res.send(201, "application/json", JSON.stringify(films.rows[0]));
    })
    .catch(error => {
      res.send(500, "text/plain", error.stack);
    });
}

export function updateFilm(req: HttpRequest, res: HttpResponse) {
  {
    const filmId = validateParameterId(req.params.get("id"));
    if (!filmId) {
      res.send(400, "text/plain", "Parameter id cannot be empty or Nan");
      return;
    }
    const requestBody = validateRequestBody(req.body);
    if (!requestBody) {
      res.send(400, "text/plain", "Invalid body");
      return;
    }
    filmsRepository
      .updateFilm(requestBody.name, requestBody.year, filmId)
      .then(films => {
        res.send(200, "application/json", JSON.stringify(films.rows[0]));
      })
      .catch(error => {
        res.send(500, "text/plain", error.stack);
      });
  }
}

export function deleteFilm(req: HttpRequest, res: HttpResponse) {
  const filmId = validateParameterId(req.params.get("id"));
  if (!filmId) {
    res.send(400, "text/plain", "Parameter id cannot be empty or NaN");
    return;
  }
  filmsRepository
    .deleteFilm(filmId)
    .then(films => {
      res.send(200, "application/json", JSON.stringify(films.rows));
    })
    .catch(error => {
      res.send(500, "text/plain", error.stack);
    });
}

export function getGenresByFilmId(req: HttpRequest, res: HttpResponse) {
  const filmId = validateParameterId(req.params.get("id"));
  if (!filmId) {
    res.send(400, "text/plain", "Parameter id cannot be empty or Nan");
    return;
  }
  genresRepository
    .getGenresByFilmId(filmId)
    .then(genres => {
      res.send(200, "application/json", JSON.stringify(genres.rows));
    })
    .catch(error => {
      res.send(500, "text/plain", error.stack);
    });
}

function validateRequestBody(
  body: unknown
): { name: string; year: number } | undefined {
  if (!body) {
    return;
  }
  const requestBody = body as { name: string; year: number };
  const name = requestBody.name;
  const year = requestBody.year;
  if (!name || !year || !isFinite(year)) {
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
