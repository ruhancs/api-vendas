import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import auth from "../../../config/auth";
import AppError from "../../errors/AppError";

interface ITokenPayload {
    iat:number;
    exp:number;
    sub:string;
}

function isAuthenticated(req:Request,res:Response,next:NextFunction):void {
    // pegar o token no cabeçalho
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        throw new AppError('JWT Token does not exist')
    }

    // dividir a string Bearer posiçao 0 tera o Bearer na segunda tera o token
    const [ , token] = authHeader.split(' ');

    try {
        const decodedToken = verify(token,auth.jwt.secret);
        // decodedToken.sub contem o id do user
        const { sub } = decodedToken as ITokenPayload;//user id

// adicionado user ao tipo Request em src/@types/express/index.d.ts
        req.user = {
            id:sub
        };

        return next();
    }catch(err){
        throw new AppError('Invalid Token');
    }
}

export default isAuthenticated