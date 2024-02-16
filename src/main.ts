/**
 * Required External Modules
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import apiRouter from "./routes/routes";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT = process.env.PORT;

const app = express();

/**
 * App Configuration
 */

app.use(helmet());
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/api/v1", apiRouter);

app.get("/", (req, res) => {
  res.send("Welcome!");
});

/**
 * Server Activation
 */

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}\nhttp://localhost:3000`);
});

/**
 * Webpack HMR Activation
 */

type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
