# Frontend Architecture Guidelines

This document serves as the **official reference** for folder structure, file placement, and responsibilities in the frontend of this project.  
It applies to features, shared systems, UI components, Redux slices, epics, types, constants, and services.

## 🧠 Golden Rule

> Ask yourself: "Does this code describe business logic, app infrastructure, or just how something looks?"  

- **Core → `core/` global reusable infrastructure**
- **Business / feature logic → `features/<feature>`**  
- **Shared system / infrastructure → `features/shared/<system>`**  
- **Presentation / UI → features/shared/<system>/components OR feature/components**

## 💡 Key Rules / Summary

1. **Core → `core/`**: global reusable infrastructure (shared slices/services/config/constants/types/utils).  
     - Ejemplos: `core/config/reduxStore.ts`, `core/services/apiService.ts`, `core/types/asyncStatus.ts`.  
2. **Business logic → `features/<feature>`**: lógica específica de cada feature (slices, epics, services, pages, components).  
     - Ejemplos: `features/userProvisioning/slices/usersList.slice.ts`, `features/billing/billing.service.ts`.  
3. **Shared system / infrastructure → `features/shared/<system>`**: sistemas transversales usados por varias features (alerts, modals, loaders, session, etc.).  
     - Ejemplos: `features/shared/alerts/alert.slice.ts`, `features/shared/session/session.slice.ts`.  
4. **Presentation / UI → `features/shared/<system>/components` o `features/<feature>/components`**: componentes de UI puros (sin Redux, sin side-effects).  
     - Ejemplos: `features/shared/alerts/components/toast/Toast.tsx`, `features/userProvisioning/components/usersList/UsersTable.tsx`.  
5. **Slices → one slice per unit/request, or global if shared**: cada petición/unidad de negocio tiene su propio slice; si el estado es global, vive en `core/` o `features/shared/`.  
     - Ejemplos: `usersList.slice.ts`, `selectedUser.slice.ts`, `alert.slice.ts`.  
6. **Epics → one epic per slice**: un solo dueño de side-effects por slice (fácil de testear y mantener).  
     - Ejemplos: `usersList.epics.ts`, `alert.epics.ts`.  
7. **Services → feature-specific or core-shared APIs**: todas las llamadas HTTP/WebSocket viven en `services/` (en `core/` si son globales o en `features/` si son de negocio).  
     - Ejemplos: `core/services/socketService.ts`, `features/userProvisioning/services/userProvisioning.service.ts`.  
8. **Streams → Observables / RxJS events**: flujos reactivos de infraestructura (no de UI) como socket, timers, etc.  
     - Ejemplos: `core/streams/socket.streams.ts`.  
9. **Pages → orchestrate slices + UI**: las pages conectan Redux/epics/services con los componentes de presentación.  
     - Ejemplos: `features/userProvisioning/pages/ListUsersPage.tsx`, `UserWizardPage.tsx`.  


## 1️⃣ *Core → `core/` global reusable infrastructure*

```
🏗 src/ ← Frontend Root 
│
├─ 🟪 core/                  ← Global reusable infrastructure
│   ├─ ⚙ config/
│   │    ├─ 📄 axiosInstance.ts       ← Axios config & interceptors (auth headers, baseURL)
│   │    ├─ 📄 socket.ts              ← Socket.IO singleton + global config
│   │    ├─ 📄 reduxStore.ts          ← Redux store configuration
│   │    ├─ 📄 reactQueryClient.ts    ← React Query client
│   │    └─ 📄 zustandStore.ts        ← Zustand global store (optional)
│   │
│   ├─ 🌐 services/
│   │    ├─ 📄 socketService.ts       ← Socket helper: connect, disconnect, emit, on, off
│   │    └─ 📄 apiService.ts          ← Generic API calls (fetcher, GET/POST helpers)
│   │
│   ├─ 🗄 slices/ 
│   │    ├─ 📄 socket.slice.ts        ← Socket connection state (idle, connected, error)
│   │    └─ 📄 alert.slice.ts         ← Global alerts / notifications state
│   │
│   ├─ ⚡ epics/
│   │    ├─ 📄 socket.epics.ts        ← Retry/backoff, flush offline queue
│   │    └─ 📄 alert.epics.ts         ← Auto-dismiss, side-effects for alerts
│   │
│   ├─ 🌊 streams/
│   │    └─ 📄 socket.streams.ts      ← Observables: connected$, disconnected$, errors$
│   │
│   ├─ 📐 types/
│   │    ├─ 📄 asyncStatus.ts         ← AsyncStatus enum (Idle, Loading, Success, Error, NotFound)
│   │    └─ 📄 global.types.ts        ← Shared types: User, Pagination, etc.
│   │
│   ├─ 🏷 constants/
│   │    └─ 📄 app.constants.ts       ← Global constants (regex, colors, formats)
│   │
│   └─ 🧩 utils/
│        └─ 📄 helpers.ts             ← Reusable functions (formatDate, parseJson, debounce)
────────────────────────────────────────────────────────────

```

---

## 2️⃣♻️ *Business logic → `features/<feature>`*

```
🟦 features/userProvisioning (Business / Feature)
│
├─ 🗄 slices/                   ← Slice per unit/request
│    ├─ 📄 usersList.slice.ts       ← GET /users
│    ├─ 📄 selectedUser.slice.ts    ← GET /users/:id
│    ├─ 📄 createUser.slice.ts      ← POST /users
│    ├─ 📄 updateUser.slice.ts      ← PUT /users/:id
│    ├─ 📄 deleteUser.slice.ts      ← DELETE /users/:id
│    └─ 📄 userProvisioningReducer.ts  ← CombineReducers (Example: CombineReducers – Redux)
│
├─ ⚡ epics/
│    ├─ 📄 usersList.epics.ts
│    ├─ 📄 selectedUser.epics.ts
│    └─ 📄 userMutations.epics.ts   ← create/update/delete
│
├─ 🌐 services/
│    └─ 📄 userProvisioning.service.ts
│
├─ 📐 types/
│    └─ 📄 userProvisioning.types.ts
│
├─ 🏷 constants/
│    └─ 📄 userProvisioning.constants.ts
│
├─ 🗺️ pages/
│    ├─ 📄 ListUsersPage.tsx
│    ├─ 📄 UserDetailsPage.tsx
│    └─ 📄 UserWizardPage.tsx
│
└─ 🎨 components/
     ├─ 📂 usersList/
     │    └─ 📄 UsersTable.tsx
     │
     └─ 📂 userWizard/
          └─ 📄 WizardForm.tsx

```

### 📄 Example: CombineReducers – Redux

```ts
// features/userProvisioning/slices/userProvisioningReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import usersListReducer from './usersList.slice';
import selectedUserReducer from './selectedUser.slice';
import createUserReducer from './createUser.slice';
import updateUserReducer from './updateUser.slice';
import deleteUserReducer from './deleteUser.slice';

export const userProvisioningReducer = combineReducers({
  usersList: usersListReducer,
  selectedUser: selectedUserReducer,
  createUser: createUserReducer,
  updateUser: updateUserReducer,
  deleteUser: deleteUserReducer,
});
```


## 3️⃣🎨 *Shared system / infrastructure  → `features/shared/<system>`*

```
🟦 features/shared/alerts (Shared System / Infrastructure)
│
├─ 📄 alert.constants.ts          ← ALERT_TYPES, ALERT_KINDS
├─ 📄 alert.types.ts              ← Alert, AlertKind, AlertType
├─ 📄 alert.slice.ts              ← Redux slice for alert state
├─ 📄 alert.epics.ts              ← Auto-dismiss, async triggers
├─ 📄 alert.service.ts            ← Optional backend persistence
└─ 📄 index.ts                    ← Export slice/actions/types/constants
│
└─ 🎨 components/
     ├─ 📂 toast/
     │    └─ 📄 toast.tsx
     │
     ├─ 📂 notification/
     │    └─ 📄 notification.tsx
     │
     └─ 📂 banner/
          └─ 📄 banner.tsx
```

### 🔍 Shared system vs Presentation / UI

| Dimensión                 | Shared system / infrastructure (`features/shared/<system>/`)                                | Presentation / UI (`features/shared/<system>/components/` o `features/<feature>/components/`) |
|--------------------------|------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| Propósito                | Modelar el sistema compartido: estado, tipos, constantes, epics, services.                   | Renderizar cómo se ve el sistema o feature (pura presentación).                               |
| Contenido típico         | `*.slice.ts`, `*.epics.ts`, `*.types.ts`, `*.constants.ts`, `*.service.ts`, `index.ts`.       | Components React puros `*.tsx` (solo props, sin Redux ni side-effects directos).             |
| Conocimiento de Redux    | Sí: define estado, reducers, actions y side-effects.                                          | No: solo consume props y callbacks que vienen ya preparados.                                  |
| Conocimiento de backend  | Sí: a través de `service.ts` u otros servicios compartidos.                                   | No directamente: delega en callbacks (por ejemplo `onClose`, `onConfirm`).                   |
| Reutilización            | Reutilizable por múltiples features (no depende de una page específica).                     | Puede ser compartido o específico de una feature, pero siempre sin lógica de negocio.        |
| Ejemplo (alerts)         | `features/shared/alerts/alert.slice.ts`, `alert.epics.ts`, `alert.service.ts`, `index.ts`.   | `features/shared/alerts/components/toast/Toast.tsx`, `notification/Notification.tsx`, etc.   |
| Qué pasa si se elimina   | Rompes la lógica del sistema: no hay estado ni side-effects compartidos.                     | Solo pierdes esa implementación visual; puedes reemplazarla por otra UI manteniendo la lógica.|

## 5️⃣ *Slices → one slice per unit/request, or global if shared*

- **Purpose:** Isolate Redux state per request or unit of business logic for better testability and performance.
- **Where:** `core/slices/` for global state, `features/<feature>/slices/` for feature-specific state, `features/shared/<system>/` for shared systems.
- **Examples:**
     - `features/userProvisioning/slices/usersList.slice.ts` → list + filters + pagination.
     - `features/userProvisioning/slices/selectedUser.slice.ts` → selected user + loading.
     - `features/shared/alerts/alert.slice.ts` → global alert queue + visibility.

## 6️⃣ *Epics → one epic per slice*

- **Purpose:** Own side-effects for a single slice (network calls, timers, auto-dismiss, polling).
- **Where:** `core/epics/` or `features/**/epics/` mirroring the slice structure.
- **Examples:**
     - `features/userProvisioning/epics/usersList.epics.ts` → fetch users list when requested.
     - `features/userProvisioning/epics/userMutations.epics.ts` → create/update/delete user flows.
     - `features/shared/alerts/alert.epics.ts` → auto-dismiss alerts after `durationMs`.

## 7️⃣ *Services → feature-specific or core-shared APIs*

- **Purpose:** Centralize all HTTP/WebSocket calls away from components, slices and epics.
- **Where:** `core/services/` for shared infrastructure, `features/<feature>/services/` for feature-specific APIs.
- **Examples:**
     - `core/services/apiService.ts` → generic `get/post/put/delete` wrappers.
     - `core/services/socketService.ts` → connect, disconnect, emit, listen.
     - `features/userProvisioning/services/userProvisioning.service.ts` → `/users` CRUD.

## 8️⃣ *Streams → Observables / RxJS events*

- **Purpose:** Represent infrastructure events as RxJS streams (connection status, timers, background jobs).
- **Where:** `core/streams/`.
- **Examples:**
     - `core/streams/socket.streams.ts` → `connected$`, `disconnected$`, `connectError$`.

## 9️⃣ *Pages → orchestrate slices + UI*

- **Purpose:** Glue layer that wires Redux slices, epics and services to presentational components.
- **Where:** `features/<feature>/pages/`.
- **Examples:**
     - `features/userProvisioning/pages/ListUsersPage.tsx` → loads users list and renders `UsersTable`.
     - `features/userProvisioning/pages/UserWizardPage.tsx` → orchestrates multi-step user creation.





---

## 🏷️ Naming / Terminology

- **System Name:** `Alert System` or `UI Message Bus`
- **Folder:** `features/shared/alerts`
- **Documentation file:** `FRONTEND_ARCHITECTURE.md` (link from main README)
- **Concept:** “Frontend Architecture Guidelines” or “Feature Folder Structure Rules”

---


## 📌 Summary / Golden Rules

En resumen:

- **Core** modela infraestructura global compartida.  
- **Features** modelan casos de uso de negocio y pantallas.  
- **Shared systems (`features/shared/<system>`)** encapsulan lógica común (alerts, modals, session, loaders).  
- **Components (`components/`)** solo renderizan, sin Redux ni side-effects directos.  
- **Slices/Epics/Services** siguen la regla: una unidad de estado → un slice → un epic → un servicio asociado.  

## 8️⃣📚 Full Example 

```
🟦 UserProvisioning Feature
│
├─ 🗄 slices/           ← Redux state per unit
│    ├─ 📄 usersList.slice.ts       (list + filters + pagination)
│    ├─ 📄 userDetails.slice.ts     (selected user + loading)
│    └─ 📄 userWizard.slice.ts      (wizard steps + form values + validation)
│
├─ ⚡ epics/            ← Side-effects / async
│    ├─ 📄 usersList.epics.ts
│    └─ 📄 userWizard.epics.ts
│
├─ 📐 types/            ← TypeScript types
│    ├─ 📄 usersList.types.ts
│    └─ 📄 userWizard.types.ts
│
├─ 🏷 constants/       ← Enums & literals
│    └─ 📄 userWizard.constants.ts
│
├─ 🌐 services/        ← Backend calls
│    └─ 📄 userProvisioning.service.ts
│
├─ 🗺️ pages/           ← Feature pages
│    ├─ 📄 ListUsersPage.tsx
│    ├─ 📄 UserDetailsPage.tsx
│    └─ 📄 UserWizardPage.tsx
│
└─ 🎨 components/      ← Presentation layer (pure components)
     ├─ 📂 usersList/
     │    └─ 📄 UsersList.tsx
     │
     └─ 📂 userWizard/
          └─ 📄 WizardForm.tsx
```
## 🌟 Frontend Architecture – Complete Visual Diagram

```
🏗 Frontend Root
│
├─ 🟪 core/                  ← Shared, reusable infrastructure
│   ├─ 📐 types/
│   │    ├─ user.types.ts         ← Shared types (User, Product, etc.)
│   │    └─ api.types.ts          ← Common API types (Pagination, Response)
│   ├─ 🏷 constants/
│   │    ├─ asyncStatus.ts        ← AsyncStatus enum (Idle, Loading, Success, etc.)
│   │    └─ app.constants.ts      ← Global constants (e.g., date formats, regex)
│   ├─ 🌐 services/
│   │    └─ axiosInstance.ts      ← Axios configured instance
│   ├─ 🧩 utils/
│   │    └─ helpers.ts            ← Utility functions reusable en cualquier feature
│   └─ ⚙ config/
│        ├─ reduxStore.ts         ← Redux store configuration
│        ├─ reactQueryClient.ts   ← React Query client
│        └─ zustandStore.ts       ← Zustand global store (optional)
│
├─ 📦 node_modules/            ← External dependencies
│   ├─ redux, @reduxjs/toolkit
│   ├─ redux-observable
│   ├─ axios
│   ├─ react-query
│   └─ zustand
│
────────────────────────────────────────────────────────────

🟦 features/shared/alerts (Shared System)
│
├─ 🏷 alert.constants.ts
├─ 📐 alert.types.ts
├─ 🗄 alert.slice.ts
├─ ⚡ alert.epics.ts
├─ 🌐 alert.service.ts (optional)
└─ 📦 index.ts
│
└─ 🎨 components/
     ├─ toast/toast.tsx
     ├─ notification/notification.tsx
     └─ banner/banner.tsx

Purpose: Shared system used by multiple features, no feature page. UI pure, reusable, isolated.

────────────────────────────────────────────────────────────

🟦 features/userProvisioning (Business / Feature)
│
├─ 🗄 slices/                ← Slice per unit/request
│    ├─ usersList.slice.ts       ← GET /users
│    ├─ selectedUser.slice.ts    ← GET /users/:id
│    ├─ createUser.slice.ts      ← POST /users
│    ├─ updateUser.slice.ts      ← PUT /users/:id
│    └─ deleteUser.slice.ts      ← DELETE /users/:id
│
├─ ⚡ epics/                    ← Side-effects
│    ├─ usersList.epics.ts
│    ├─ selectedUser.epics.ts
│    └─ userMutations.epics.ts   ← create/update/delete
│
├─ 🌐 services/
│    └─ userProvisioning.service.ts
│
├─ 📐 types/
│    └─ userProvisioning.types.ts
│
├─ 🏷 constants/
│    └─ userProvisioning.constants.ts
│
├─ 🗺️ pages/
│    ├─ ListUsersPage.tsx
│    ├─ UserDetailsPage.tsx
│    └─ UserWizardPage.tsx
│
└─ 🎨 components/
     ├─ usersList/UsersTable.tsx
     └─ userWizard/WizardForm.tsx

Purpose: Business logic, user-facing features, slices encapsulate request-specific state, pages orchestrate UI.

────────────────────────────────────────────────────────────

🟦 features/shared/modals, loaders, etc. (Shared Infrastructure)
│
├─ modals/
├─ loaders/
└─ confirmationDialogs/

Purpose: Shared UI/infrastructure, used across multiple features, no page.

────────────────────────────────────────────────────────────

📌 Summary of purposes:

| Directory                              | Purpose                                                                 |
|----------------------------------------|-------------------------------------------------------------------------|
| `core/`                                | Global shared types, constants, utils, library config (Redux, Axios).   |
| `core/config/`                         | Setup de librerías (Redux store, Query client, socket, etc.).           |
| `core/services/`                       | Servicios globales (API genérica, socket service, etc.).                |
| `core/streams/`                        | Streams RxJS de infraestructura (socket, timers, etc.).                 |
| `features/<feature>/`                  | Lógica de negocio de una feature (slices, epics, services, pages, UI).  |
| `features/<feature>/slices/`           | Redux slices por unidad/petición de esa feature.                         |
| `features/<feature>/epics/`            | Epics que orquestan side-effects de la feature.                          |
| `features/<feature>/services/`         | Servicios HTTP/WebSocket específicos de la feature.                      |
| `features/<feature>/pages/`            | Pages que orquestan slices + services + UI.                              |
| `features/<feature>/components/`       | Componentes de presentación propios de la feature.                       |
| `features/shared/<system>/`            | Sistemas compartidos: alerts, modals, loaders, session, etc.            |
| `features/shared/<system>/components/` | Presentación/UI de sistemas compartidos (puros, sin lógica de negocio). |
| `node_modules/`                        | Dependencias externas: redux, axios, zustand, react-query, etc.         |

────────────────────────────────────────────────────────────

### 🔹 Responsibilities by file type

| File name / patrón       | Contains                                  | Purpose                                                             |
|--------------------------|-------------------------------------------|---------------------------------------------------------------------|
| `*.slice.ts`             | Redux slice                              | Define estado, reducers y actions para una unidad/petición.         |
| `*.epics.ts`             | Redux Observable epics                   | Side-effects: timers, polling, auto-dismiss, llamadas async.        |
| `*.types.ts`             | TypeScript types                         | Estructuras de datos (Alert, User, Pagination, etc.).               |
| `*.constants.ts`         | Enums, literal values                    | Evitar magic strings (por ejemplo `ALERT_TYPES`, `ALERT_KINDS`).    |
| `*.service.ts`           | Backend calls (opcional por sistema)     | Llamadas HTTP/WebSocket relacionadas a una feature o sistema.       |
| `*.streams.ts`           | RxJS Observables                          | Flujos reactivos de infraestructura (socket, conexión, errores).    |
| `index.ts`               | Barrel file                              | Re-exportar slice/actions/types/constants del sistema.              |
| `*Page.tsx`              | Page components                          | Orquestan slices, epics, services y componentes de UI.              |
| `components/**/**/*.tsx` | Presentational components (UI)           | Renderizan solo con props; sin Redux ni side-effects directos.      |

### 🔹 Responsibilities by directory

| Directory / subdirectory             | Purpose                                                                 |
|-------------------------------------|-------------------------------------------------------------------------|
| `core/`                             | Infraestructura global reusable (config, services, types, constants).   |
| `core/config/`                      | Configuración de librerías y singletons globales.                       |
| `core/services/`                    | Servicios reutilizables (API genérica, socket, etc.).                   |
| `core/streams/`                     | Streams globales (socket, timers).                                      |
| `features/<feature>/`               | Todo lo relacionado a una feature concreta.                             |
| `features/<feature>/slices/`        | Estado Redux de la feature.                                             |
| `features/<feature>/epics/`         | Side-effects de la feature.                                             |
| `features/<feature>/services/`      | Integraciones de backend de la feature.                                 |
| `features/<feature>/pages/`         | Pantallas (routes) de esa feature.                                      |
| `features/<feature>/components/`    | Componentes de UI propios de la feature.                                |
| `features/shared/<system>/`         | Lógica + estado de sistemas compartidos.                                |
| `features/shared/<system>/components/` | UI para sistemas compartidos (toast, modals, banners, etc.).        |
| `features/shared/**/`               | Otros sistemas compartidos (modals, loaders, confirmation dialogs).     |
---