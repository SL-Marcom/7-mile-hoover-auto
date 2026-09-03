import { industryProfiles } from "@/lib/industry-knowledge";

/**
 * @deprecated Use `industryProfiles` from `@/lib/industry-knowledge` instead.
 * Kept as a re-export for backward compatibility with the shape previously
 * exposed here (name, tone, emphasis only).
 */
export const industryPresets = Object.fromEntries(
  Object.entries(industryProfiles).map(([key, profile]) => [
    key,
    { name: profile.name, tone: profile.tone, emphasis: profile.emphasis },
  ]),
);
