import express from 'express';
import bodyParser from 'body-parser';
import { appConfig } from './config/app.config.js';
import morgan from 'morgan';
import { categoryRoutes } from "./routes/category.routes.js";
import { userRoutes } from './routes/user.routes.js';
import { loginRoutes } from './routes/login.routes.js';
import orderRoutes from './routes/order.routes.js';
import path from 'path';
import { readFileCustom } from "./utils/fs.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use("/api/v1", categoryRoutes);
app.use("/api/v1", userRoutes);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use("/api/v1", orderRoutes);

app.use('/api/public', express.static(path.join(__dirname, 'public')));
app.use("/api/v1", loginRoutes);

app.get('/', (req, res) => {
    const data = JSON.parse(readFileCustom('products.json'));
    res.render('index', { data: data });
});

app.listen(appConfig.port, () => {
    console.log(`Server running on port : http://localhost:${appConfig.port}`);
});
