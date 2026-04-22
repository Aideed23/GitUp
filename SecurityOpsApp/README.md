# SecurityOps Staff Console (Demo)

A lightweight front-end app for security companies to manage day-to-day staff operations.

## Features
- Staff check-in/check-out log.
- Shift assignment by officer, location, and time.
- Patrol task creation with due dates.
- Incident reporting with severity and details.
- Local persistence using browser `localStorage`.

## Run locally (recommended)
From the repository root:

```bash
python3 SecurityOpsApp/server.py
```

Or:

```bash
./SecurityOpsApp/run.sh
```

Then open:
- `http://127.0.0.1:8080/`

## Why you saw "Directory listing for /"
That happens when a web server is started in the wrong folder (for example `/`) and no `index.html` exists there.

This repo now includes `SecurityOpsApp/server.py`, which always serves the correct app directory no matter where you run it from.

## Notes for production
This is a starter demo for operations workflows. For production use, add:
- Authentication and role-based access control.
- Server-side API and database persistence.
- Audit logs and immutable incident records.
- Notification workflows (SMS/email/radio dispatch).
