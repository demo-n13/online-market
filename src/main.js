import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import { appConfig } from "./config/app.config.js";

const app = express();


// Middlaware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("ok");
});

app.listen(appConfig.port, appConfig.host, () => {
  console.log(`listening on ${appConfig.port}`);
});
