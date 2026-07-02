import 'dotenv/config';
import express from 'express';
import { engine } from 'express-handlebars';

import router from './src/routers/userRouter.js';

await import('./src/database/conection.js');

const app = express();

app.use('/api', router);

export default app;
