# Gitleaks – Secret Scanning

This directory documents the **secret scanning stage** of the pipeline.

Gitleaks scans the source code for:
- Hardcoded passwords
- API keys
- Tokens and secrets
- Sensitive configuration values

---

## Scan Scope

The scan runs against the project source code and does not require:
- Git history
- Repository metadata

---

## Purpose

Secret scanning helps prevent:
- Credential leakage
- Accidental exposure of sensitive data
- Supply chain risks

Detected findings can be exported and tracked centrally.
