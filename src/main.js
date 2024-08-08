  import morgan from "morgan";
  import bodyParser from "body-parser";
  import express from "express";
  import { appConfig } from "./config/app.config.js";
  import { categoryRoutes } from "./routes/category.routes.js";
  import { productRoutes } from "./routes/product.routes.js";
  import { render } from "ejs";
  import path from 'path';

  

  const app = express();
  // View papkasini o'rnatish
  app.set('view engine', 'ejs');
  app.set('views', path.join(process.cwd(), 'src/views'));


  app.use(express.static(path.join(process.cwd(), 'src')));

  // Middlaware
  app.use(morgan("tiny"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use("/api/v1", categoryRoutes)
  app.use("/api/v1", productRoutes)

  app.use("/user/settings", (req, res)=>{
    res.render('user-settings')
  })
app


app.get("/superadmin", (req, res) => {
    res.render("superadmin");
});

app.get("/admin", (req, res) => {
    res.render("admin.ejs");
});

app.get("/seller", (req, res) => {
    res.render("seller.ejs");
});

app.get("/main", (req, res) => {
    res.render("main.ejs");
});

app.get("/404", (req, res) => {
    res.render("404");
});


  app.listen(appConfig.port, appConfig.host, () => {
    console.log(`listening on ${appConfig.port}`);
  })