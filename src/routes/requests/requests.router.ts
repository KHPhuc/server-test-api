import { Router } from "express";
import { requests } from "../../controllers/requests/requests.controller";

const requestsRouter = Router();

requestsRouter.post("/", requests);

export default requestsRouter