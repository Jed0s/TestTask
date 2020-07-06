import express from 'express';
import { createStudent } from '../controllers/studentController';

const studentRouter = express.Router();

studentRouter.post('/', (req, res) => {
    createStudent(req, res); // POST METHOD
});

export default studentRouter;
