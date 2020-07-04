// routes
import express from 'express';
import lectureRouter from './lectures';
import lecturerRouter from './lecturers';
import startRouter from './startPage';

const routes = express();

routes.use('/', startRouter); // home URL
routes.use('/api/lecturers', lecturerRouter);
routes.use('/api/lectures', lectureRouter);

export default routes;
