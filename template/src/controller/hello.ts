import { Controller, TokenPayload, HttpMethod } from "@aldahick/service-utils";
import { Request, Response } from "express";

export class HelloController extends Controller {
  version = "1";
  method = HttpMethod.Get;
  route = "/hello";

  async handle(req: Request, res: Response, payload: TokenPayload) {
    return "Hello, world!";
  }
}
