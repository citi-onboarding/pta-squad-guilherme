import { Router } from "express";
import bookRoutes from "./bookRoutes";
import loanRoutes from "./loanRoutes";
import userForExampleRoutes from "./userForExampleRoutes";
import dashboardRoutes from "./dashboardRoutes";

const routes = Router();

routes.use("/books", bookRoutes);
routes.use("/loans", loanRoutes);
routes.use("/users-for-example", userForExampleRoutes);
routes.use("/dashboard", dashboardRoutes);

export default routes;
