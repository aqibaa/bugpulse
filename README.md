# BugPulse

**A clean, fast issue tracker for small teams.** Report bugs, assign them to teammates, move them across a drag-and-drop board, and discuss them in comments, all in the browser with no backend.

**[Live demo](https://aqibaa.github.io/bugpulse/)** | Built with Vue 3, Pinia and Tailwind CSS

<!-- Add 2-3 screenshots here, e.g. ![Board view](./screenshots/board.png) -->

---

## Overview

BugPulse is a bug-tracking web app inspired by tools like Jira and Linear. It focuses on the core workflow of an issue tracker: sign in, report an issue, assign it to someone, track its status, and close it.

Everything runs on the client. User accounts and bugs are persisted in the browser's `localStorage`, so the app works as a self-contained demo and a learning project for state management, routing and component design in Vue.

## Features

**Authentication**
- Separate Sign up and Login pages
- Duplicate-email protection and clear error/success messages
- Route redirect after login and logout
- Greeting with the current user's name and live date on the dashboard

**Bug management**
- Create, edit and delete bugs through a modal form with validation
- Fields: title, description, project, priority, severity, assignee, reporter, due date
- Delete confirmation modal to prevent accidental removal
- Unique bug IDs and creation dates

**Team assignment**
- Assign any bug to any registered user (no hardcoded data)
- Assignee list updates automatically when a new user signs up
- Filter bugs by assignee

**Views**
- **Table view** with colored status and priority badges
- **Board view** with four columns (New, In Progress, Resolved, Closed)
- **Drag and drop** cards between columns to change status instantly
- Switch between Table and Board with one click

**Details and collaboration**
- Slide-in detail drawer with all bug information
- Change status directly from the drawer
- Comment thread per bug, showing the logged-in user's name and initials

**Dashboard and filters**
- Live stats: total, new, in progress, resolved and closed bugs
- Filter by status, priority and assignee, with a "Clear filters" shortcut
- Search by title or bug ID

## Tech stack

| Area | Tools |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| State management | Pinia (setup stores) |
| Routing | Vue Router |
| Styling | Tailwind CSS |
| Drag and drop | vuedraggable (Vue 3 build) |
| Persistence | Browser `localStorage` |
| Build tool | Vite |
| Hosting | GitHub Pages (GitHub Actions) |

## How it works

The app is organised around two Pinia stores:

- **`authStore`** handles sign up, login, logout, the current user and the list of registered users (also used to build the assignee dropdown).
- **`bugStore`** owns all bug data and UI state: the bug list, filters, the active view, the form modal, the detail drawer and the delete modal. Computed values (`filterBugs`, `stats`) derive what each view shows.

Every change follows the same pattern: **update the array, save to `localStorage`, let Vue re-render.** Because the table, board, drawer and dashboard all read from the same store, they always stay in sync. Dragging a card on the board simply calls `updateBugStatus()`, and every other view updates automatically.

### Data stored in the browser

| Key | Contents |
|---|---|
| `registeredUsers` | All created accounts |
| `loggedInUser` | The currently signed-in user |
| `bugpulse_bugs` | All bugs, including comments |

## Project structure

```
src/
  Components/
    Login.vue
    Signup.vue
    appDashboard.vue
    FilterBar.vue
    BugTableView.vue
    BugBoardView.vue
    BugFormModal.vue
    BugDetailDrawer.vue
    DeleteModal.vue
  stores/
    authStore.js
    bugStore.js
  router/
    index.js
  App.vue
  main.js
```

## Getting started

```bash
# 1. Clone the repository
git clone https://github.com/aqibaa/bugpulse.git
cd bugpulse

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Build for production
npm run build
```

Then open the local URL printed in the terminal, create an account on the Sign up page, and log in.

> Tip: sign up with two or three accounts first so you can try assigning bugs to different teammates.

## Deployment

The site is deployed to GitHub Pages with a GitHub Actions workflow (`.github/workflows/deploy.yml`). Every push to `main` builds the project and publishes the `dist` folder automatically.

## Limitations

BugPulse is a front-end demo, not a production system:

- Data lives in `localStorage`, so it is **per browser and per device**. Teammates on other devices will not see your bugs or accounts.
- Passwords are stored in **plain text** in `localStorage`. This is acceptable for a demo but must never be used for real credentials.
- There is no server, email verification or role-based access.

## Roadmap

- Node.js + Express backend with a database (MongoDB or PostgreSQL)
- Secure authentication (hashed passwords, JWT)
- Real-time updates between teammates
- Bug attachments and activity history
- Notifications and due-date reminders

## Author

**Muhammad Aqib**, frontend-focused full-stack developer.

- GitHub: [@aqibaa](https://github.com/aqibaa)
- LinkedIn: add your profile link here

If you find this project useful, a star on the repo is appreciated.
