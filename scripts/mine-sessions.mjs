#!/usr/bin/env node
// Portfolio session miner.
// Incrementally reads Claude Code transcripts (~/.claude/projects/<slug>/*.jsonl),
// keeps a per-file cursor so already-seen lines are never re-read, condenses new
// user activity, flags shipping signals, and writes a local (gitignored) digest.
// Raw transcript text never leaves ./.portfolio — only distilled candidates.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { join, basename } from "node:path";

const PROJECTS_DIR = join(homedir(), ".claude", "projects");
const STATE_DIR = join(homedir(), ".claude", "portfolio-miner");
const SEEN_FILE = join(STATE_DIR, "seen.json");
const CONFIG_FILE = join(STATE_DIR, "config.json");
const OUT_DIR = join(process.cwd(), ".portfolio");
const OUT_FILE = join(OUT_DIR, "digest.md");

const SIGNAL = /\b(shipped|deployed|deploy|launched|released|published|merged|went live|is live|demo|finished|completed|won|prize|accepted|open[- ]?sourced|built|created|integrated|implemented|fine[- ]?tuned)\b/i;
const CONFIDENTIAL = /tensium|client|nda/i;
const NOISE = /^(<|system-reminder|\{|\[|\[\[|caveat:|command-|this session is being continued|stop hook feedback|verify |check |read |run |wait fo|final step|ok lets|this is mentioned)/i;

function loadJson(path, fallback) {
  try { return JSON.parse(readFileSync(path, "utf8")); } catch { return fallback; }
}

function decodeSlug(slug) {
  // "-Users-rafa-MscAi-VideoVoice" -> "/Users/rafa/MscAi/VideoVoice"
  return slug.replace(/^-/, "/").replace(/-/g, "/");
}

function textFromMessage(msg) {
  if (!msg) return "";
  const c = msg.content;
  if (typeof c === "string") return c;
  if (Array.isArray(c)) {
    return c
      .filter((b) => b && b.type === "text" && typeof b.text === "string")
      .map((b) => b.text)
      .join(" ");
  }
  return "";
}

function clean(text) {
  return text.replace(/\s+/g, " ").trim();
}

if (!existsSync(PROJECTS_DIR)) {
  console.error(`No Claude Code projects dir at ${PROJECTS_DIR}`);
  process.exit(1);
}

mkdirSync(STATE_DIR, { recursive: true });
mkdirSync(OUT_DIR, { recursive: true });

const seen = loadJson(SEEN_FILE, {});
const config = loadJson(CONFIG_FILE, { allow: [], deny: [] });
const allow = config.allow || [];
const deny = config.deny || [];

const byProject = {};
let newLines = 0;
let filesScanned = 0;

for (const slug of readdirSync(PROJECTS_DIR)) {
  const dir = join(PROJECTS_DIR, slug);
  if (!statSync(dir).isDirectory()) continue;

  const projectPath = decodeSlug(slug);
  const project = basename(projectPath);
  if (allow.length && !allow.includes(project)) continue;
  if (deny.includes(project)) continue;

  const confidential = CONFIDENTIAL.test(projectPath);

  for (const file of readdirSync(dir)) {
    if (!file.endsWith(".jsonl")) continue;
    const abs = join(dir, file);
    const lines = readFileSync(abs, "utf8").split("\n");
    const cursor = seen[abs] || 0;
    if (lines.length <= cursor) continue; // nothing new
    filesScanned++;

    for (let i = cursor; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) continue;
      newLines++;
      let evt;
      try { evt = JSON.parse(line); } catch { continue; }
      if (evt.type !== "user") continue;
      const text = clean(textFromMessage(evt.message));
      if (!text || text.length < 25) continue;
      if (NOISE.test(text)) continue;
      if (!SIGNAL.test(text)) continue;

      const snippet = text.length > 260 ? text.slice(0, 257) + "…" : text;
      (byProject[project] ||= { confidential, items: new Set() }).items.add(snippet);
    }
    seen[abs] = lines.length;
  }
}

writeFileSync(SEEN_FILE, JSON.stringify(seen, null, 2));

// Build digest
const projects = Object.keys(byProject).sort();
let md = `# Portfolio digest\n\n`;
md += `_Generated ${new Date().toISOString()}. New lines scanned: ${newLines} across ${filesScanned} updated session(s)._\n`;
md += `_Only user messages containing shipping signals are shown. Review with a portfolio lens; skip confidential-source items._\n\n`;

if (!projects.length) {
  md += `No new portfolio-worthy signals since last run.\n`;
} else {
  for (const p of projects) {
    const { confidential, items } = byProject[p];
    md += `## ${p}${confidential ? "  ⚠ confidential-source" : ""}\n\n`;
    for (const s of items) md += `- ${s}\n`;
    md += `\n`;
  }
}

writeFileSync(OUT_FILE, md);
console.log(`✓ Wrote ${OUT_FILE}`);
console.log(`  ${newLines} new line(s), ${filesScanned} updated session file(s), ${projects.length} project(s) with signals.`);
if (projects.some((p) => byProject[p].confidential)) {
  console.log("  ⚠ Some candidates come from confidential-source projects — reject those at review.");
}
