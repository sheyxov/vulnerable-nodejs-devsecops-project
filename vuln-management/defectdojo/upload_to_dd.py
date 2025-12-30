import requests
import json
import os

DOJO_URL = os.getenv("DOJO_URL")
API_KEY = os.getenv("DOJO_API_KEY")
PRODUCT_NAME = os.getenv("DOJO_PRODUCT_NAME")

HEADERS = {
    "Authorization": f"Token {API_KEY}"
}

SCAN_FILES = [
    ("Semgrep JSON", "semgrep.json", "Semgrep JSON"),
    ("Snyk Scan", "snyk-report.json", "Snyk Scan"),
    ("Gitleaks Scan", "gitleaks-report.json", "Gitleaks Scan"),
    ("ZAP Scan", "zap_output/zap_report.xml", "ZAP Scan"),
]

def get_product_id():
    r = requests.get(f"{DOJO_URL}/api/v2/products/", headers=HEADERS)
    r.raise_for_status()
    products = r.json()["results"]
    for p in products:
        if p["name"] == PRODUCT_NAME:
            return p["id"]
    raise Exception("Product not found")

def create_engagement(product_id):
    r = requests.post(
        f"{DOJO_URL}/api/v2/engagements/",
        headers=HEADERS,
        data={
            "product": product_id,
            "name": "CI/CD Scan",
            "target_start": "2024-01-01",
            "target_end": "2024-12-31",
            "status": "In Progress"
        }
    )
    r.raise_for_status()
    return r.json()["id"]

def upload_scan(engagement_id, scan_type, file_path, scan_name):
    with open(file_path, "rb") as f:
        files = {"file": (os.path.basename(file_path), f)}
        data = {
            "engagement": engagement_id,
            "scan_type": scan_type,
            "name": scan_name,
            "verified": "true",
            "active": "true"
        }
        r = requests.post(f"{DOJO_URL}/api/v2/import-scan/", headers=HEADERS, data=data, files=files)
        print(f"[+] Uploaded {scan_type} - status: {r.status_code}")
        r.raise_for_status()

product_id = get_product_id()
engagement_id = create_engagement(product_id)

for scan_type, file_path, scan_name in SCAN_FILES:
    if os.path.exists(file_path):
        upload_scan(engagement_id, scan_type, file_path, scan_name)
    else:
        print(f"[-] File not found: {file_path}")
