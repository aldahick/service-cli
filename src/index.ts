#!/usr/bin/env node

import * as commands from "./command";
import { LogicError } from "./util/LogicError";

const main = async() => {
  const [command, ...params] = process.argv.slice(2);
  let commandFunc: (params: string[]) => Promise<void>;
  if (command === "create") {
    commandFunc = commands.create;
  } else {
    console.error("Usage: service-cli <command> [...params]");
    process.exit(1);
  }
  try {
    await commandFunc(params);
  } catch (err) {
    if (err instanceof LogicError) {
      console.error(err.message);
      process.exit(1);
    }
    throw err;
  }
};

if (require.main?.id === module.id) {
  main().catch(console.error);
}
