// Runtime shape guards for portfolio entries. Used by add-entry to reject
// malformed additions before they touch src/data/portfolioData.ts.
import { z } from "zod";

const url = z.string().url();

export const schemas = {
  currentlyWorkingOn: z.object({
    iconName: z.enum(["brain", "clapperboard", "rocket", "book-open", "building-2"]),
    title: z.string().min(1),
    subtitle: z.string().min(1),
    description: z.string().min(1),
    badges: z.array(z.string()).default([]),
    link: url.optional(),
    accentColor: z.string().regex(/^\d+\s+\d+%\s+\d+%$/, "HSL triplet like '18 58% 42%'"),
    type: z.enum(["building", "reading", "scaling", "working", "fellowship"]),
  }),
  projects: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    badges: z.array(z.string()).default([]),
    link: url.optional(),
  }),
  openSourceContributions: z.object({
    title: z.string().min(1),
    role: z.string().min(1),
    date: z.string().min(1),
    description: z.string().min(1),
    link: url.optional(),
  }),
  achievements: z.object({
    iconName: z.enum(["target", "award", "trophy", "briefcase"]),
    title: z.string().min(1),
    date: z.string().min(1),
    description: z.string().min(1),
    link: url.optional(),
  }),
  certifications: z.object({
    date: z.string().min(1),
    title: z.string().min(1),
    organization: z.string().min(1),
    description: z.string().min(1),
    link: url.optional(),
  }),
  experiences: z.object({
    date: z.string().min(1),
    title: z.string().min(1),
    company: z.string().min(1),
    link: url.optional(),
    points: z.array(z.string()).min(1),
  }),
};

export const sectionNames = Object.keys(schemas);
