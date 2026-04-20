# SecurityOps Staff Console (Demo)

A lightweight front-end app for security companies to manage day-to-day staff operations.

## Features
- Staff check-in/check-out log.
- Shift assignment by officer, location, and time.
- Patrol task creation with due dates.
- Incident reporting with severity and details.
- Local persistence using browser `localStorage`.

## Run locally
```bash
cd SecurityOpsApp
python3 -m http.server 8080
```
Then open `http://localhost:8080`.

## Notes
This is a starter demo for operations workflows. For production use, add:
- Authentication and role-based access control.
- Server-side API and database persistence.
- Audit logs and immutable incident records.
- Notification workflows (SMS/email/radio dispatch).
