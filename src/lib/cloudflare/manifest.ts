export const cloudflareConfig = {
  compatibilityDate: "2026-07-31",
  routes: [
    {
      pattern: "/*",
      zoneName: "[Your Zone]",
    },
  ],
  buildCommand: "npm run build",
  outputDirectory: ".next",
};
