import 'dotenv/config';
import express from 'express';
import { engine } from 'express-handlebars';

import router from './src/routers/userRouter.js';

await import('./src/database/conection.js');

const app = express();
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
app.use('/api', router);

export default app;
