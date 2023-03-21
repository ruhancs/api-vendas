import { Router } from "express";
import custumersRouter from "../../../modules/custumers/routes/custumers.routes";
import ordersRouter from "../../../modules/orders/routes/orders.routes";
import productsRouter from "../../../modules/products/routes/products.routes";
import passwordRouter from "../../../modules/users/routes/password.routes";
import profileRouter from "../../../modules/users/routes/profile.routes";
import sessionsRouter from "../../../modules/users/routes/session.routes";
import usersRouter from "../../../modules/users/routes/users.routes";


const routes = Router();

routes.use('/products',productsRouter);
routes.use('/users',usersRouter);
routes.use('/sessions',sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers',custumersRouter);
routes.use('/orders', ordersRouter);

export default routes;