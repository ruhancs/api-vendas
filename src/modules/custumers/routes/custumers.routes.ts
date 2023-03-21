import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import CustumersController from "../CustumersController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";

const custumersRouter = Router();
const custumersController = new CustumersController();

custumersRouter.use(isAuthenticated);

custumersRouter.get('/',custumersController.index);

custumersRouter.get(
    '/:id',
    celebrate({//middleware para tratamento de erros
        [Segments.PARAMS] : {
            id: Joi.string().uuid().required(),
        },
    }),
    custumersController.show
    );

custumersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name:Joi.string().required(),
            email:Joi.string().email().required(),
        }
    }),
    custumersController.create
    );

custumersRouter.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            name:Joi.string().required(),
            email:Joi.string().email().required(),
        },
        [Segments.PARAMS] : {
            id: Joi.string().uuid().required(),
        },
    }),
    custumersController.update
    );

custumersRouter.delete(
    '/:id',
    celebrate({//middleware para tratamento de erros
        [Segments.PARAMS] : {
            id: Joi.string().uuid().required(),
        },
    }),
    custumersController.delete
    );

export default custumersRouter;