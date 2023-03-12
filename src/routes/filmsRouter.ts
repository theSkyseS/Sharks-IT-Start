import { Router } from "../framework/Router";
import { HttpRequest } from "../framework/HttpRequest";
import { HttpResponse } from "../framework/HttpResponse";
import controller = require("../controllers/filmsController");

export const filmsRouter = new Router();
filmsRouter.pathBase = "/films";

filmsRouter.get("/", (req: HttpRequest, res: HttpResponse) => {
  if (req.params.has("id")) {
    controller.getFilmById(req, res);
  } else {
    controller.getFilms(req, res);
  }
});

filmsRouter.get("/genres/", controller.getGenresByFilmId);
filmsRouter.post("/", controller.addNewFilm);
filmsRouter.put("/", controller.updateFilm);
filmsRouter.delete("/", controller.deleteFilm);
