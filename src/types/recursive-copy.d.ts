declare module "recursive-copy" {
  import { Stats } from "fs";

  interface CopyOptions {
    overwrite?: boolean;
    expand?: boolean;
    dot?: boolean;
    junk?: boolean;
    filter?: Function | RegExp | string | any[];
    rename?: Function;
    transform?: Function;
    results?: boolean;
    concurrency?: number;
    debug?: boolean;
  }

  const copy: (src: string, dest: string, options?: CopyOptions) => Promise<{
    src: string;
    dest: string;
    stats: Stats;
  }[]>;

  export = copy;
}
