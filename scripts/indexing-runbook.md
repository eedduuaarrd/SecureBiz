# Full indexing pipeline (20k+ URLs)

Use this to validate all sitemap URLs in batches and generate one merged report.

## Default run (all URLs)

```powershell
$env:AUDIT_BASE_URL="https://securebiz.org"
$env:AUDIT_BATCH_SIZE="1500"
$env:AUDIT_CONCURRENCY="20"
$env:AUDIT_OUTPUT_DIR="./indexing-audit-reports"
$env:AUDIT_SUMMARY_PATH="./indexing-audit-summary.json"
npm run indexing:full
```

## Resume from a later offset

```powershell
$env:AUDIT_BASE_URL="https://securebiz.org"
$env:AUDIT_BATCH_SIZE="1500"
$env:AUDIT_CONCURRENCY="20"
$env:AUDIT_START_OFFSET="6000"
npm run indexing:full
```

## Expected outputs

- Per-batch files in `indexing-audit-reports/`
- Combined file `indexing-audit-summary.json`

## Pass/Fail

- Exit code `0`: no issues found.
- Exit code `1`: issues found (or a batch had URL-level failures).

The summary file includes grouped counts:
- `status`
- `canonical-missing`
- `canonical-mismatch`
- `meta-noindex`
