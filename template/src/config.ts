import { Config } from "@aldahick/service-utils";

export const config = {
  httpPort: Config.required("HTTP_PORT", Number),
  jwtKey: Config.required("JWT_KEY")
};
