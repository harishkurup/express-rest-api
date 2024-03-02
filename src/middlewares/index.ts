import { getUserBySessionToken } from '../db/users';
import express from 'express';
import {merge, get} from 'lodash';


export const isOwner =  async (req: express.Request, res: express.Response, next: express.NextFunction) => { 
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;
        
        if(!currentUserId) {
            return res.sendStatus(403);
        }

        if(currentUserId.toString() !== id) {
            return res.sendStatus(403);
        }

        return next();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessiontoken = req.cookies['EXPRESS-API-AUTH'];

        if(!sessiontoken) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserBySessionToken(sessiontoken);

        if(!existingUser) {
            return res.sendStatus(403)
        }

        merge(req, { identity: existingUser });

        return next();
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}
