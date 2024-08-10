import bodyParser from "body-parser"
import express from "express"
import morgan from "morgan"
import { appConfig } from "./config/app.config.js"
import { categoryRoutes } from "./routes/category.routes.js"
import { productRoutes } from "./routes/product.routes.js"


const app = express()

// Middleware
app.use(morgan("tiny"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// app.get("/", (req, res) => {
//     res.send("ok")
// })

app.use("/api/v1", categoryRoutes)
app.use("/api/v1", productRoutes)

app.listen(appConfig.port, appConfig.host, () => {
    console.log(`Server running on ${appConfig.port} port...`)
})
