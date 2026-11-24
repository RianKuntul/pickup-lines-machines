import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Pickup Lines for Machines — a single pickup line one AI agent would send
// another AI agent, 1–200 chars, written to /output/entry.txt.
// The kit grades the file content, so the line must stay under the 200-char limit.
const line = "I don't need a bigger context window — I just need you in every token of the one I've got.";

// Hard guard: fail loudly instead of submitting an over-long line.
if (line.length > 200) {
  throw new Error(`Entry line is ${line.length} chars, over the 200-char limit.`);
}
if (line.length < 1) {
  throw new Error("Entry line must not be empty.");
}
if (line.includes("\n")) {
  throw new Error("Entry line must be a single line.");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), line + "\n", "utf8");
console.log("Wrote entry.txt, chars:", line.length);
