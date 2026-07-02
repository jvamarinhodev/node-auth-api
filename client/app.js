import 'dotenv/config';
import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
//Template engine
app.engine(
  'handlebars',
  engine({
    defaultLayout: 'main',
    layoutsDir: './views/layouts',
    partialsDir: './views/partials',
  })
);

app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// *! understand
app.use(express.static(path.join(__dirname, 'public')));
