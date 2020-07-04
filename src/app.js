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
app.use('/', routes);

app.listen(process.env.PORT, () => {
    console.log('Listening on port 3000');
    console.log('You can do test right here: http://localhost:3000');
});
