import dotenv = require("dotenv");
import { Application } from "./framework/Application";
import { genresRouter } from "./routes/genresRouter";
import { filmsRouter } from "./routes/filmsRouter";
dotenv.config();

const PORT = process.env.PORT;
const app = new Application();

app.addRouter(genresRouter);
app.addRouter(filmsRouter);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
