#!/usr/bin/env node
// Safe, non-destructive insert of a validated entry into src/data/portfolioData.ts.
// Usage:
//   node scripts/add-entry.mjs <section> '<json>'
//   node scripts/add-entry.mjs <section> --file path/to/entry.json
// Does NOT commit. Prints the resulting git diff for review.
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { schemas, sectionNames } from "./lib/schema.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA = resolve(__dirname, "../src/data/portfolioData.ts");

function fail(msg) {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
}

const [, , section, arg, arg2] = process.argv;
if (!section || !sectionNames.includes(section)) {
  fail(`Section must be one of: ${sectionNames.join(", ")}`);
}

let raw;
if (arg === "--file") {
  if (!arg2) fail("--file needs a path");
  raw = readFileSync(arg2, "utf8");
} else if (arg) {
  raw = arg;
} else {
  fail("Provide the entry as JSON or --file <path>");
}

let obj;
try {
  obj = JSON.parse(raw);
} catch (e) {
  fail(`Entry is not valid JSON: ${e.message}`);
}

const parsed = schemas[section].safeParse(obj);
if (!parsed.success) {
  fail(`Entry failed schema for "${section}":\n${JSON.stringify(parsed.error.issues, null, 2)}`);
}
const entry = parsed.data;

let src = readFileSync(DATA, "utf8");

// Find "export const <section> ... = [" and insert right after the opening bracket.
const re = new RegExp(`(export const ${section}\\b[^=]*=\\s*\\[)`);
const m = src.match(re);
if (!m) fail(`Could not locate "export const ${section} = [" in portfolioData.ts`);

const serialized = JSON.stringify(entry, null, 4)
  .split("\n")
  .map((line, i) => (i === 0 ? line : "    " + line))
  .join("\n");
const insertion = `\n    ${serialized},`;
src = src.replace(re, `$1${insertion}`);

// Bump lastUpdated (YYYY-MM-DD)
const today = new Date().toISOString().slice(0, 10);
src = src.replace(/export const lastUpdated = "[^"]*";/, `export const lastUpdated = "${today}";`);

writeFileSync(DATA, src);

console.log(`\n✓ Inserted into "${section}" and bumped lastUpdated → ${today}`);
console.log("  Review the diff below, then commit on a branch and open a PR.\n");
try {
  execSync(`git --no-pager diff -- ${DATA}`, { stdio: "inherit" });
} catch {
  /* git diff is best-effort */
}
