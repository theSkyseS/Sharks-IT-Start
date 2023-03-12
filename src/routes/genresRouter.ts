import { Router } from "../framework/Router";
import { HttpRequest } from "../framework/HttpRequest";
import { HttpResponse } from "../framework/HttpResponse";
import * as controller from "../controllers/genresController";

export const genresRouter = new Router();
genresRouter.pathBase = "/genres";

genresRouter.get("/", (req: HttpRequest, res: HttpResponse) => {
  if (req.params.has("id")) {
    controller.getGenreById(req, res);
  } else {
    controller.getGenres(req, res);
  }
});

genresRouter.post("/", controller.addNewGenre);
genresRouter.put("/", controller.updateGenre);
genresRouter.delete("/", controller.deleteGenre);
