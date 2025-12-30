# Semgrep – Static Application Security Testing (SAST)

This directory documents the **SAST stage** of the pipeline.

Semgrep is used to analyze source code for:
- Insecure coding patterns
- Common vulnerability classes
- Security misconfigurations

---

## Current Setup

The pipeline uses the default Semgrep ruleset:


This provides broad coverage for common security issues.

---

## Custom Rules (Optional)

To extend SAST coverage:
1. Add custom Semgrep rules to this directory
2. Update the GitLab CI configuration to reference them

This structure allows easy customization without modifying the main pipeline logic.
