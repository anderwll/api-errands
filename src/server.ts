import express from 'express';
import { routesApp } from './config/routes';
import 'dotenv/config';

const app = express();
app.use(express.json());
const port = process.env.PORT;

routesApp(app);

app.listen(port, () => console.log('Server from api errands is running ✔'));
