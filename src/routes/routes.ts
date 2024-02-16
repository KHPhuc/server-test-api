import { Router } from "express";
import requestsRouter from "./requests/requests.router";

const apiRouter = Router();

apiRouter.use("/requests", requestsRouter);

export default apiRouter;
