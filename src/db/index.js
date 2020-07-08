// main method(CRUD) + db connection

import mongoose from 'mongoose';
import '../models/index'; // import all created models
import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../config/.env` });

const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;

mongoose.set('useFindAndModify', false);

mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.');
    } else {
        console.log(`Error in DB connection: ${err}`);
    }
});
