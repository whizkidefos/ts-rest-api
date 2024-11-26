import express from 'express';
import authentication from './authentication';
import usersRoute from './usersRoute';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    usersRoute(router);

    return router;
}