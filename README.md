# 👤 User Management Application

A React + TypeScript frontend application integrating the public **JSONPlaceholder API**, following clean component architecture and custom hook patterns.

Browse users in a sortable/paginated DataGrid, search in real time with debounced filtering, view detailed user profiles with posts, and favourite users with priority sorting — all persisted to localStorage.

---

## 🛠️ Tech Stack

| Technology                | Purpose                         |
| ------------------------- | ------------------------------- |
| **React 19** + TypeScript | UI framework with type safety   |
| **Vite 6**                | Build tool & dev server         |
| **Material UI (MUI) v6**  | Component library & theming     |
| **MUI X DataGrid**        | Paginated, sortable table       |
| **Redux Toolkit**         | State management & async thunks |
| **React Router v7**       | Client-side routing             |
| **Axios**                 | HTTP client                     |
| **Vitest**                | Unit testing framework          |
| **Testing Library**       | React component & hook testing  |
| **SCSS**                  | Custom styling & CSS modules    |
| **ESLint + Prettier**     | Code quality & formatting       |

---

## ✨ Key Features

### 👥 User List

- Fetch all users from `/users` endpoint
- Display in paginated MUI DataGrid with sortable columns
- Columns: Name, Email, Company, City
- Loading indicator & error alert on failure

### 🔍 Search & Filter

- Debounced search input (300 ms delay) via custom `useDebounce` hook
- Client-side filtering across name and email fields
- Clearable search with icon toggle

### 📋 User Detail View

- Click any table row to navigate to `/users/:id`
- Full profile display: Personal info, Address, Company details
- User's posts fetched from `/posts?userId=:id`
- Back navigation to user list

### ⭐ Favourites

- Star icon toggle on every table row
- Favourited users automatically sort to the top of the list
- Stable sort preserves relative order within each group
- Persisted to `localStorage` — survives page refresh
- Custom `useFavourites` hook manages state with `useState<Set<number>>`

### 🧪 Testing

- **14 unit tests** across 2 test files — all passing
- `useFavourites` hook: init, toggle on/off, multiple favourites, localStorage persistence/restore, corrupted data handling
- Favourite sorting logic: no favourites, single/multiple, all favourited, empty list, non-existent IDs, immutability

---

## 📁 Project Structure

```
src/
├── assets/theme/                # MUI theme, SCSS variables & base styles
├── components/                  # Reusable UI components
│   ├── shared/                  # PageHeader, SearchInput
│   └── users/                   # UserTable (DataGrid), UserPosts
├── pages/                       # Route-level page components
│   ├── Dashboard/               # Dashboard (placeholder)
│   ├── Users/                   # User list with search & favourites
│   ├── UserDetail/              # User profile & posts
│   └── Posts/                   # Posts (placeholder)
├── redux/                       # State management
│   ├── actions/                 # Thunk action creators (*Request pattern)
│   ├── reducers/                # Switch/case reducers with initial state DTOs
│   ├── slices/                  # RTK slices (search)
│   └── store/                   # Store configuration & type exports
├── routes/                      # Route definitions
├── services/                    # Axios API service layer
├── templates/                   # AppLayout with header & sidebar
└── utilities/                   # Constants, models, helpers, hooks
    ├── constants/               # Action types, app config, route paths
    ├── helpers/                 # Data mappers (toUserListItem)
    ├── hooks/                   # useDebounce, useFavourites
    └── models/                  # TypeScript interfaces (User, Post, etc.)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ (v22 recommended)
- **npm** or **yarn**

### 1. Clone the repository

```bash
git clone <repository-url>
cd React-TS_Practical_Coding_Test_Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev           # App runs on http://localhost:5173
```

### 4. Run tests

```bash
npm run test          # Runs all 14 unit tests via Vitest
```

---

## 📜 Available Scripts

| Script            | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start Vite dev server               |
| `npm run build`   | TypeScript check + production build |
| `npm run test`    | Run unit tests with Vitest          |
| `npm run lint`    | Lint source files with ESLint       |
| `npm run format`  | Format code with Prettier           |
| `npm run preview` | Preview production build locally    |

---

## 🌐 API Integration

| Endpoint            | Method | Description             |
| ------------------- | ------ | ----------------------- |
| `/users`            | GET    | Fetch all users         |
| `/users/:id`        | GET    | Fetch single user by ID |
| `/posts?userId=:id` | GET    | Fetch posts for a user  |

**Base URL:** `https://jsonplaceholder.typicode.com`

---

## 🗺️ Routes

| Path         | Page       | Description                        |
| ------------ | ---------- | ---------------------------------- |
| `/`          | Dashboard  | Application dashboard              |
| `/users`     | Users      | User list with search & favourites |
| `/users/:id` | UserDetail | Detailed user profile with posts   |
| `/posts`     | Posts      | Posts listing (placeholder)        |
