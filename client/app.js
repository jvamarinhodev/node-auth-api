import 'dotenv/config';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
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
    helpers: {
      eq: (a, b) => a === b,
      initial: (name) => (name || '?').charAt(0).toUpperCase(),
      slug: (name) => (name || 'usuario').toLowerCase().replace(/\s+/g, ''),
    },
  })
);

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// *! understand
app.use(express.static(path.join(__dirname, 'src/public')));
app.use('/', router);
