# OWASP ZAP – Dynamic Application Security Testing (DAST)

This directory documents the **DAST stage** of the pipeline.

OWASP ZAP scans a **running application** to identify:
- SQL Injection
- Cross-Site Scripting (XSS)
- Authentication and session issues
- Security misconfigurations

---

## Target Configuration

The scan target is intentionally **not hardcoded**.

The application URL must be provided via a CI/CD variable:

DAST_TARGET=http://<application-host>:<port>


This design allows the pipeline to be reused across different environments
without exposing infrastructure details.

---

## Reports

The scan generates:
- XML report (machine-readable)
- Optional HTML report (human-readable)

These reports can be archived or imported into vulnerability management systems.
