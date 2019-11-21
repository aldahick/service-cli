import "source-map-support/register";

import { Controller } from "@aldahick/service-utils";
import * as bodyParser from "body-parser";
import * as express from "express";
import * as controllers from "./controller";
import { config } from "./config";

const main = async() => {
  const app = express();

  app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

  Controller.register(app, Object.values(controllers), config.jwtKey);

  app.listen(config.httpPort, () => {
    console.log(`listening on port ${config.httpPort}`);
  });
};

main().catch(console.error);
