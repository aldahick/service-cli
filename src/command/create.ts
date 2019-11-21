import * as childProcess from "child_process";
import * as path from "path";
import { promisify } from "util";
import * as fs from "fs-extra";
import * as recursiveCopy from "recursive-copy";
import { LogicError } from "../util/LogicError";

const exec = promisify(childProcess.exec);

export const create = async([name]: string[]) => {
  if (!name) {
    throw new LogicError("Usage: service-cli create <name>");
  }
  const templateDir = path.resolve(__dirname, "../../template");
  const targetDir = path.resolve(process.cwd(), name);
  if (await fs.pathExists(targetDir)) {
    throw new LogicError(`Target directory ${targetDir} already exists!`);
  }
  await fs.mkdirp(targetDir);
  console.log("Initializing Git repository...");
  await exec("git init", { cwd: targetDir });
  console.log("Copying template...");
  const results = await recursiveCopy(templateDir, targetDir, {
    dot: true
  });
  for (const result of results) {
    console.log(`\t${result.src} -> ${result.dest}`);
  }
  console.log("Fixing .gitignore...");
  await fs.move(path.resolve(targetDir, ".npmignore"), path.resolve(targetDir, ".gitignore"));
  console.log("Modifying metadata files...");
  const packageFilename = path.resolve(targetDir, "package.json");
  const packageInfo = await fs.readJSON(packageFilename);
  packageInfo.name = name;
  await fs.writeFile(packageFilename, JSON.stringify(packageInfo, undefined, 2));
  console.log("Installing NPM modules...");
  await exec("npm i", { cwd: targetDir });
  console.log("Finished!");
};
