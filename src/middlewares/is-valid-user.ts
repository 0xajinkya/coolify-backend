import { NextFunction, Request, Response } from "express";
import { Userv2 } from "../models";
import { NonParametricError } from "../errors";


declare global {
    namespace Express {
        interface Request {
            user?: Userv2
        }
    }
}

export const isValidUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.currentUser!;

        const user = await Userv2.findByPk(id);
        if(!user) {
            throw new NonParametricError([{message: "Invalid request or user not found!", code: "NOT_ALLOWED_ACCESS"}]);
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}