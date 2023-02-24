import express from 'express';
import { routesApp } from './config/routes';
import 'dotenv/config';
import cors from 'cors';

const allowedOrigins = ['*'];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
};

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

routesApp(app);

app.listen(port, () => console.log('Server from api errands is running ✔'));
