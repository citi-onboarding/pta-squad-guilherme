import { Router } from "express";
import bookRoutes from "./bookRoutes";
import loanRoutes from "./loanRoutes";

const routes = Router();

routes.use(bookRoutes);
routes.use(loanRoutes);

export default routes;
