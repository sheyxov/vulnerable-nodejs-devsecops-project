# Threat Model

This document outlines a **basic threat model**
for the vulnerable web application used in this project.

---

## Assets

- User credentials
- Application data
- Database content
- CI/CD pipeline integrity

---

## Threat Actors

- External attackers
- Unauthorized internal users
- Automated scanning tools

---

## Identified Threats

- SQL Injection
- Cross-Site Scripting (XSS)
- Weak authentication and session handling
- Dependency vulnerabilities
- Hardcoded secrets

---

## Attack Surfaces

- Web application endpoints
- User input fields
- Third-party dependencies
- CI/CD pipeline configuration

---

## Mitigation Strategy

- Automated security testing in CI/CD
- Centralized vulnerability tracking
- Visibility into findings across the SDLC
