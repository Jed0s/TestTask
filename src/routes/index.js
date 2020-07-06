// routes
import express from 'express';
import lectureRouter from './lectures';
import lecturerRouter from './lecturers';
import startRouter from './startPage';
import groupRouter from './groups';
import studentRouter from './students';

const routes = express();

routes.use('/', startRouter); // home URL
routes.use('/api/groups', groupRouter);
routes.use('/api/lecturers', lecturerRouter);
routes.use('/api/lectures', lectureRouter);
routes.use('/api/students', studentRouter);

export default routes;
