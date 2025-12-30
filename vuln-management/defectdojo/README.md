# Vulnerability Management – DefectDojo

This directory contains the **DefectDojo integration** used in the DevSecOps pipeline
to centralize and manage security scan results.

The goal of this integration is to ensure that findings from different
security tools are not lost as CI artifacts, but are instead tracked
in a dedicated vulnerability management platform.

---

## What This Integration Does

- Collects security scan results generated during CI/CD
- Automatically creates an engagement in DefectDojo
- Imports findings from multiple security tools into a single dashboard

Supported scan sources:
- Semgrep (SAST)
- Snyk (SCA)
- Gitleaks (Secret Scanning)
- OWASP ZAP (DAST)

---

## Script Overview

- `upload_to_dd.py`  
  A functional script that uploads scan results to DefectDojo using
  the REST API. All configuration is handled via environment variables.

- `upload_to_dd.example.py`  
  A template file that demonstrates how DefectDojo configuration
  values should be defined. This file is **not executable**.

---

## Configuration Model

No secrets or credentials are stored in this repository.

The integration relies on the following environment variables:

- `DOJO_URL`
- `DOJO_API_KEY`
- `DOJO_PRODUCT_NAME`

If any required variable is missing, the script exits safely with an error.

---

## Usage Notes

- This setup is intended for **local, lab, and demonstration purposes**
- It is designed to be reusable and tool-agnostic
- Additional customization may be required for production environments
