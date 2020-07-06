/* eslint-disable prefer-destructuring */
// express app entry point

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import './db/index';
import routes from './routes/index';

dotenv.config({ path: `${__dirname}/config/.env` });

const app = express();
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.json());
app.use('/', routes);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
    console.log(`You can do test right here: http://localhost:${process.env.PORT}`);
});
