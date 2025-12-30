# CI/CD Pipeline Flow

This document describes the **DevSecOps pipeline flow**
implemented in this project.

---

## Pipeline Stages Overview

1. **SAST – Static Application Security Testing**
   - Tool: Semgrep
   - Scans source code for insecure patterns

2. **SCA – Software Composition Analysis**
   - Tool: Snyk
   - Detects vulnerable third-party dependencies

3. **Secret Scanning**
   - Tool: Gitleaks
   - Identifies hardcoded secrets and credentials

4. **Build**
   - Docker image build (optional)
   - Used for runtime security testing

5. **DAST – Dynamic Application Security Testing**
   - Tool: OWASP ZAP
   - Scans the running application

6. **Vulnerability Management**
   - Platform: DefectDojo
   - Imports and centralizes all findings

---

## Pipeline Logic

- Security scans run automatically on code changes
- Failures do not block the pipeline by default
- Findings are preserved and tracked beyond CI artifacts

---

## Key DevSecOps Concept

Security is treated as a **continuous process**
rather than a one-time testing activity.
