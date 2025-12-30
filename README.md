# Vulnerable Node.js DevSecOps CI/CD Pipeline

This repository demonstrates a **full DevSecOps CI/CD pipeline** built around an **intentionally vulnerable Node.js web application**.

The project showcases how security controls can be integrated into every stage of the CI/CD lifecycle, from code commit to deployment and centralized vulnerability management.

---

## Project Overview

The goal of this project is to simulate a **real-world DevSecOps workflow** where:

- Developers push code changes
- Automated security scans are triggered
- The application is containerized and deployed
- Dynamic security testing is performed
- All findings are aggregated into a vulnerability management platform

This repository is designed for:
- DevSecOps learning and demonstrations
- Security labs and internal training
- Portfolio and interview showcase

---

## Architecture & Pipeline Flow

```text
Developer Commit
        ↓
SAST (Semgrep)
        ↓
SCA (Snyk + Dependency Analysis)
        ↓
Secret Scanning (Gitleaks)
        ↓
Docker Build & Push
        ↓
DAST (OWASP ZAP)
        ↓
Vulnerability Management (DefectDojo)
