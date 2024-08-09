import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { appConfig } from "./config/app.config.js";
import { routes } from "./routes/index.js";

const app = express();

// Middlaware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/v1", routes)


app.listen(appConfig.port, appConfig.host, () => {
  console.log(`listening on ${appConfig.port}`);
});
