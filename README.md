# SA Expiations Analytics (Assig2 React App)

Interactive web app to explore and visualize South Australian expiation (demerit) data. Built with React, it enables authenticated users to filter by suburb, camera type, speeding offence, and date range, compare locations, and view insights like expiation totals, rejections, and weekday patterns.

## Features

- **Authentication**
  - Client-side password hashing with SHA-256 and simple login/registration flow.
  - Protected routes via an `AuthRoute` wrapper.

- **Dashboard (Filters & Results)**
  - Select suburb, camera type, date from/to, and speeding description (autocomplete via datalist).
  - Fetches and displays camera locations and expiation stats for the selected suburb.
  - Shows per-location metrics: total offences, rejected expiations, camera type, road details.
  - Multi-select up to 2 locations to compare in a report.

- **Report (Comparison)**
  - Fetches detailed stats for the selected locations.
  - Displays per-location summary cards (total fee, total demerits, averages).
  - Renders a comparative weekday distribution chart (SVG/D3-based `Graph` component).


## Architecture

- **Framework**: React 18 (Create React App).
- **UI**: CSS + Bootstrap classes; loading indicators via `react-loading-indicators`.
- **Security**: SHA-256 hash of password on the client before sending to backend.
- **Charts**: SVG rendered via custom `Graph` component.

## Backend API

The app expects a backend running locally, exposing these endpoints on `http://localhost:5147`:

- `POST /api/Login?userName={u}&passwordHash={h}` → `true`/`false`
- `POST /api/Register?userName={u}&passwordHash={h}` → `true`/`false`
- `GET  /api/Get_ListCameraSuburbs`
- `GET  /api/Get_ListCamerasInSuburb?suburb={name}&cameraIdsOnly=false`
- `GET  /api/Get_ExpiationStatsForLocationId?locationId={id}&cameraTypeCode={code}&startTime={unix}&endTime={unix}`
- `GET  /api/Get_ExpiationsForLocationId?locationId={id}&cameraTypeCode={code}&startTime={unix}&endTime={unix}`
- `GET  /api/Get_SearchOffencesByDescription?searchTerm={text}&offenceCodesOnly=false`

Note: Endpoints and payloads are inferred from code. Adjust if your backend differs.

## Setup & Run

- Node.js 18+ recommended

```bash
npm install
npm start
```

- App will open at `http://localhost:3000`.
- Ensure the backend API is running and accessible at the configured base URL.

## Usage Guide

- **Login / Register**
  - Visit `/Login` (default when unauthenticated). Register a new user or sign in.
  - On success, you are redirected to `/Home`.

- **Dashboard** (`/Dashboard`)
  - Select a suburb, optionally camera type, dates, and speeding description.
  - A table of locations loads with total offences and rejected expiations.
  - Select exactly 2 locations using the checkboxes. Click “View Report”.

- **Report** (`/Report`)
  - Compares the two selected locations.
  - Shows per-location stats cards and a weekday distribution graph.

Notes:
- In the current code, `generateReport()` uses hard-coded `selectedDetails` (IDs 118 and 170) instead of the checked rows. Replace with the selected rows if needed.

## Authentication Details

- Passwords are hashed on the client with SHA-256 (`crypto-js`) before being sent.
- `AuthRoute` reads `user` from `Outlet` context in `App` to restrict access; no JWT/session persistence is implemented. Refreshing the page will clear the in-memory login state.

## Troubleshooting

- **CORS or Network Errors**
  - Ensure the backend is running and CORS allows requests from `http://localhost:3000`.
  - Update API base URL and ports to match your environment.

- **Empty lists (suburbs/locations)**
  - Backend endpoints must return data. Verify the database is populated.

- **Auth always fails**
  - Confirm backend `Login`/`Register` endpoints exist and accept hashed passwords.

- **Chart not rendering**
  - Check `Graph` component props; ensure `expiationDaysOfWeek` exists in stats response.

## Scripts

- `npm start` — start development server
- `npm run build` — production build
- `npm test` — run tests (CRA default)

