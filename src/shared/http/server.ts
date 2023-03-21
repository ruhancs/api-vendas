// criar tabela com typeorm
// yarn typeorm migration:create -n CreateProducts

import 'reflect-metadata'; //para utilizar o typeOrm com typescript
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';//tratamento de erros nas promisses
import cors from 'cors';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination'; //paginaçao das querys
import routes from './routes';
import AppError from '../errors/AppError';
import '../typeorm';//para o typeorm procurar o arquivo ormconfig
import upload from '../../config/upload';
import rateLimiter from './middlewares/raterLimiter';

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter);//limitador de requisiçoes tem que estar antes de todas rotas

app.use(pagination);
//pegar os arquivos aramazenados na pasta uploads que contem as imagens dos users
app.use('/files', express.static(upload.director))
app.use(routes);

app.use(errors());//pegar os erros de validaçao com celebrate

// middleware para captura de erros
app.use(
  (
    error:Error,
    req:Request,
    res:Response,
    next:NextFunction
  ) => {
    // verificar se o erro foi criado com o AppError
    if (error instanceof AppError){
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      })
    }
    
    console.log(error);

    return res.status(500).json({
      status:'error',
      message: 'Internal server error'
    })
  },
  )

app.listen(3333, () => {
  console.log('Server listening on port 3333')
})
