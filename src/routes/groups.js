import express from 'express';
import showGroups from '../controllers/groupController';

const groupRouter = express.Router();

groupRouter.get('/', (req, res) => {
    showGroups(req, res);
});

export default groupRouter;
