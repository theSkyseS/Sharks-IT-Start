import dotenv = require("dotenv");
import { Application } from "./framework/Application";
import { genresRouter } from "./routes/genresRouter";
dotenv.config();

const PORT = process.env.PORT;
const app = new Application();

app.addRouter(genresRouter);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
