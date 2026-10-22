import { existsSync } from "node:fs";
import path from "node:path";

// True once an image has actually been added under /public. Checked at build
// time, so dropping the file in and redeploying is all it takes to show it.
export function publicFileExists(src: string) {
  return existsSync(path.join(process.cwd(), "public", src));
}
