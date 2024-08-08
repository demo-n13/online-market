import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import { appConfig } from "./config/app.config.js";
import { categoryRoutes } from "./routes/category.routes.js";
import { productRoutes } from "./routes/product.routes.js";
import bannerRoutes from "./routes/banner.routes.js";

const app = express();



// Middlaware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", categoryRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", bannerRoutes);

app.listen(appConfig.port, appConfig.host, () => {
  console.log(`listening on ${appConfig.port}`);
});
