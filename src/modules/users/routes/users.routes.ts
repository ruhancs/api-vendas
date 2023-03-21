import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import multer from "multer";
import upload from "../../../config/upload";
import UserController from "../controllers/UsersController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import UserAvatarController from "../controllers/UserAvatarController";


const usersRouter = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController()

const multerUpload = multer(upload.multer); 

usersRouter.get('/',isAuthenticated,userController.index);

usersRouter.patch(
    '/avatar',
    isAuthenticated,
    multerUpload.single('avatar'),//upload de 1 file e o nome do campo avatar
    userAvatarController.update
    );

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }
    }),
    userController.create
    );

export default usersRouter;