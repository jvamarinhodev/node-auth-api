import 'dotenv/config';
import express from 'express';

import router from './src/routers/userRouter.js';

await import('./src/database/connection.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

export default app;
