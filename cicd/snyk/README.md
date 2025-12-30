# Snyk – Software Composition Analysis (SCA)

This directory documents the **dependency security scanning stage**.

Snyk is used to:
- Analyze project dependencies
- Detect known vulnerabilities (CVEs)
- Provide severity and remediation guidance

---

## Requirements

To enable this stage, the following CI/CD variable must be configured:

SNYK_TOKEN
---

## Output

The scan generates a machine-readable JSON report that can be:
- Reviewed manually
- Imported into vulnerability management platforms

This setup demonstrates **secure dependency management** in CI/CD pipelines.
