# CI/CD DevSecOps Pipeline

This directory contains a **GitLab CI/CD DevSecOps pipeline template**.

The pipeline demonstrates how security testing can be integrated
into each stage of the software delivery lifecycle.

---

## Pipeline Stages

The pipeline consists of the following stages:

1. **SAST (Static Application Security Testing)**
   - Tool: Semgrep
   - Purpose: Detect insecure coding patterns

2. **SCA (Software Composition Analysis)**
   - Tool: Snyk
   - Purpose: Identify vulnerable third-party dependencies

3. **Secret Scanning**
   - Tool: Gitleaks
   - Purpose: Detect hardcoded secrets and credentials

4. **Build**
   - Tool: Docker
   - Purpose: Build container images (optional step)

5. **DAST (Dynamic Application Security Testing)**
   - Tool: OWASP ZAP
   - Purpose: Scan the running application for runtime vulnerabilities

6. **Vulnerability Management**
   - Platform: DefectDojo
   - Purpose: Centralize and manage security findings

---

## Configuration Model

This pipeline is provided as a **template**.

All sensitive values such as:
- API tokens
- URLs
- Credentials
- Registry details

must be configured via **CI/CD environment variables**.

No secrets are stored in this repository.

---

## Usage Notes

- This pipeline is designed for **educational and demonstration purposes**
- It must be adapted before use in production environments
