# System Architecture

This project demonstrates a **vulnerable Node.js web application**
integrated with a **DevSecOps CI/CD pipeline** and a centralized
vulnerability management platform.

---

## High-Level Architecture

The system consists of the following components:

- **Vulnerable Web Application**
  - Node.js (Express)
  - Intentionally insecure code paths
  - Used for security testing and demonstrations

- **Database**
  - MySQL
  - Initialized with vulnerable schema and sample data

- **CI/CD Pipeline (GitLab)**
  - SAST, SCA, Secret Scanning, DAST stages
  - Automated security testing on each commit

- **Vulnerability Management**
  - DefectDojo
  - Centralized storage and tracking of findings

---

## Data Flow

1. Developer pushes code to the repository
2. CI/CD pipeline executes security scans
3. Scan results are generated as artifacts
4. Findings are uploaded to DefectDojo
5. Vulnerabilities are tracked and managed centrally

---

## Design Principles

- Security testing is automated
- No secrets are stored in source code
- All integrations are environment-driven
- The architecture is designed for lab and educational use
