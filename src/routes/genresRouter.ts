import { Router } from "../framework/Router";
import { HttpRequest } from "../framework/HttpRequest";
import { HttpResponse } from "../framework/HttpResponse";
import controller = require("../controllers/genresController");

export const genresRouter = new Router();
genresRouter.pathBase = "/genres";

genresRouter.get("/", (req: HttpRequest, res: HttpResponse) => {
  if (req.params.has("id")) {
    controller.getGenreById(req, res);
  } else {
    controller.getGenres(req, res);
  }
});

genresRouter.get("/films/", controller.getFilmsByGenreId);
genresRouter.post("/", controller.addNewGenre);
genresRouter.put("/", controller.updateGenre);
genresRouter.delete("/", controller.deleteGenre);
