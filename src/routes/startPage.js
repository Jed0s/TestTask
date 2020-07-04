import express from 'express';
import showStartPage from '../controllers/startController';

const startRouter = express();

startRouter.get('/', (req, res) => {
    showStartPage(req, res);
});

export default startRouter;
