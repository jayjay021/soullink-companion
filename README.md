# 🧩 Soullink Companion

A fullstack web app built for playing local multiplayer **Pokémon Nuzlocke Soullink Challenges** with up to 3 players. Share your emulator screen, manage Pokémon teams, and track linked encounters in real-time.

---

## ✨ Features

- 🎮 Each player can manage their own team and encounter history
- 🔄 Real-time syncing of game state via **Socket.IO**
- 🎥 Screen sharing via **WebRTC** (each player can stream their emulator window)
- 🖥️ Fullscreen **viewer dashboard** for TV display
- 🔗 Built-in logic for **Soullink rules** and team validation
- 🧠 Smart tooltips for fixing invalid links and syncing teams
- 🧩 Pokémon autocompletion powered by **PokéAPI**
- 🌓 Dark mode and responsive UI using **Mantine**

---

## 🎮 Soullink Rules

- Each player may only catch the **first encounter** per route.
- If a player **fails to catch** their encounter, all other players **lose their chance** on that route.
- If all players catch a Pokémon on a route, they become **linked**.
- If one linked Pokémon **dies**, all partners must be **marked as dead**.
- If a duplicate species is encountered, it must be **re-rolled**.

---

## 🧑‍💻 Player View (Control Panel)

- ✅ **Add Encounter**

  - Pokémon name (autocomplete from PokéAPI)
  - Route name (autocomplete from others' entries)
  - Mark as `caught` or `not caught` (fail/death)

- 🟰 **Team Management**

  - 6-slot party + Pokémon box
  - Drag-and-drop to organize active team
  - Red border: Dead
  - Yellow border: Link mismatch
  - Hover tooltips on invalid Pokémon show partner suggestions
  - Click suggestion to auto-swap linked Pokémon

- ❌ **Death Marking**

  - Players can manually mark Pokémon as dead
  - Dead Pokémon cannot be added to the party

- 📺 **Streaming**
  - Start screen share (app window or entire screen)
  - Other users can click a stream icon to open your stream
  - Multiple users can stream and view simultaneously

---

## 🖥️ Viewer Mode

- Fullscreen display for shared viewing (TV/projector)
- Shows only each player's current 6 Pokémon
- Red border: Dead Pokémon
- Yellow border: Link mismatch
- Hover on Pokémon shows their linked partners across players
- Read-only display

---

## 🧑‍🤝‍🧑 Sessions

- Replaces traditional “rooms”
- Users can **create** or **join** a session by ID
- First-time users pick a **username**
- Session state is persisted in a **SQLite database**
- All player actions are synced across the session

---

## 🧠 Tech Stack

- **Framework:** Next.js (App Router, Fullstack)
- **Language:** TypeScript
- **UI Library:** Mantine (with custom theme + dark mode)
- **Realtime:** Socket.IO (via API Route)
- **Database:** SQLite (via Prisma ORM)
- **Streaming:** WebRTC (peer-to-peer)
- **Styling:** Prettier, ESLint, Commitlint, Husky
- **Dev Tools:** Docker, GitHub Actions, Seed data

---

## 📂 Key Folders

## Getting Started

To run the development server:

```bash
pnpm dev
```

## Features

- TypeScript support
- ESLint for code linting
- App Router for routing

## Installation

Install dependencies:

```bash
pnpm install
```

## Development

Start the development server:

```bash
pnpm dev
```

## Build

Build the application for production:

```bash
pnpm build
```

## Deployment

Follow Next.js deployment guidelines for hosting your application.
