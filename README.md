# Taskly — Next.js Authentication Todo App

A full-stack task management app built with **Next.js 16** (App Router), featuring custom JWT-based authentication and a MySQL backend.

## Features

### Authentication
- Email & password registration and login
- Password hashing with `bcryptjs` (cost factor 12)
- JWT sessions via `jose` (HS256, 7-day expiry, httpOnly cookie)
- Protected routes with server-side session validation
- Input validation with `zod`

### Task Management
- Create, edit, toggle (complete/incomplete), and delete tasks
- Tasks scoped per user (row-level filtering)
- Progress tracking (percentage, completed/pending counts)
- Tasks grouped by creation date with timestamps
- Inline editing with save-on-submit

## Tech Stack

| Layer          | Technology                                                  |
|----------------|-------------------------------------------------------------|
| Framework      | [Next.js 16](https://nextjs.org) (App Router, Turbopack)    |
| Language       | TypeScript                                                  |
| Auth           | Custom JWT — `jose` + `bcryptjs`                            |
| Database       | MySQL via `mysql2/promise` (connection pool, raw SQL)       |
| Validation     | [Zod](https://zod.dev)                                      |
| Styling        | [Tailwind CSS v4](https://tailwindcss.com)                  |
| Runtime        | Node.js 20+                                                 |

## Project Structure

```
app/
├── page.tsx                # Landing page (public)
├── layout.tsx              # Root layout
├── globals.css             # Tailwind entry
├── login/
│   ├── page.tsx            # Login page
│   └── login-form.tsx      # Login form (client component)
├── register/
│   ├── page.tsx            # Register page
│   └── register-form.tsx   # Register form (client component)
├── todos/
│   ├── page.tsx            # Dashboard (protected)
│   └── delete-task-button.tsx  # Delete confirmation (client component)
└── actions/
    ├── auth.ts             # Server actions: register, login, logout
    └── todos.ts            # Server actions: createTask, toggleTask, updateTask, deleteTask
lib/
├── auth.ts                 # requireUser() — session guard + user fetch
├── db.ts                   # MySQL connection pool
└── session.ts              # JWT create / verify / delete helpers
```

## Prerequisites

- **Node.js** 20+
- **MySQL** 8.0+

## Database Setup

Create the database and tables:

```sql
CREATE DATABASE IF NOT EXISTS nextjs_auth;
USE nextjs_auth;

CREATE TABLE users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(255)  NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT           NOT NULL,
  title      VARCHAR(255)  NOT NULL,
  completed  TINYINT(1)    NOT NULL DEFAULT 0,
  created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=nextjs_auth
SESSION_SECRET=<random-256-bit-hex-string>
```

Generate a session secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

| Command         | Description               |
|-----------------|---------------------------|
| `npm run dev`   | Start dev server          |
| `npm run build` | Production build          |
| `npm start`     | Start production server   |
| `npm run lint`  | Run ESLint                |

## Deploy on Vercel

The easiest way to deploy is with the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). You'll need to configure a MySQL-compatible database (e.g., PlanetScale, Aiven, or Railway) and set the environment variables in Vercel's dashboard.

See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 📞 Contact & Support

### Get in Touch
- **Instagram**: [@mr._nirav_09](https://www.instagram.com/mr._nirav_09/)
- **GitHub**: [@nirav-gajera](https://github.com/nirav-gajera)
- **Email**: Contact via GitHub

### Issues & Bugs
- Report issues on GitHub Issues
- Provide detailed description and screenshots
- Include steps to reproduce the bug

---

<div align="center">

### Made with ❤️ by Nirav Gajera

**If you find this project helpful, please consider giving it a ⭐ on GitHub!**

[⬆️ Back to Top](#taskly--nextjs-authentication-todo-app)
