# Security Guidance

Treat the starter as a safe foundation for client websites.

- Do not deploy, publish, change DNS, add analytics IDs, or connect external services without explicit approval.
- Avoid introducing unnecessary third-party dependencies or integrations.
- Keep secrets and credentials out of code and configuration.
- Follow secure defaults for forms, links, and data handling.
- Be cautious with user input, external content, and environment variables.
- Prefer privacy-preserving implementations over broad tracking or embedded services.
- Route the final security and deployment-readiness check through the Reviewer/QA Engine. A secret found in the repository, or an unapproved integration or analytics tool, must block launch readiness rather than being treated as a warning.
- Use the Deployment/Publishing Engine's environment variable checks for actual deployments: record variable names only, never values, and treat anything shaped like a real secret as a hard block.
