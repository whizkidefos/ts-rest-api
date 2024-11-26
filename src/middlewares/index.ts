import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const token = get(req, 'cookies.EFOSA-AUTH');

        if (!token) {
            return res.sendStatus(403);
        }

        const user = await getUserBySessionToken(token);

        if (!user) {
            return res.sendStatus(403);
        }

        merge(req, { user });

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
};

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUser = get(req, 'user._id') as string;

        if (currentUser !== id) {
            return res.sendStatus(403);
        }

        if (currentUser.toString() !== id.toString()) {
            return res.sendStatus(403);
        }

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
}