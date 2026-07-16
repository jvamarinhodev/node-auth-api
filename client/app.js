import 'dotenv/config';
import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import { router } from './src/routers/authRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
//Template engine
app.engine(
  'handlebars',
  engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'src/views/layouts'),
    partialsDir: path.join(__dirname, 'src/views/partials'),
  })
);

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// *! understand
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);
