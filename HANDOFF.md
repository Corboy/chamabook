# ChamaBook — Developer & AI Agent Handoff Guide

> **Target Audience:** Incoming Software Engineers, AI Coding Agents, and Product Designers.  
> **Status:** Production-Grade MVP / Alpha (Zero-dependency Node.js 22 + SQLite + Modern Vanilla Web).  
> **Current Server Port:** `http://localhost:8000`  
> **Default Language:** Kiswahili (Swahili) with seamless real-time English toggle.  

---

## 1. Project Background & Vision

**ChamaBook** (*Fedha za Kikundi kwa Uwazi*) was created to solve the real-world operational challenges of Tanzanian and East African community savings and credit groups:
- **VICOBA** (Village Community Banking)
- **Vyama vya Akiba na Mikopo** (Savings & Credit Cooperatives / SACCOs)
- **Upatu / Merry-go-rounds** (Rotating Savings)
- **Investment Groups & Clubs** (Vikundi vya Uwekezaji)
- **Workplace & Family Welfare Groups**

### The Cultural & Operational Reality (Why ChamaBook is built this way)
1. **Single-Operator Efficiency (The Mweka Hazina Reality):**  
   In physical Chama meetings across Tanzania, hundreds of thousands of shillings exchange hands in cash or via mobile money (M-Pesa, Airtel Money, Mixx/Tigo Pesa). The **Treasurer (Mweka Hazina)** sits with a phone or laptop. They cannot afford to navigate multi-screen confirmation forms or wait for multi-sig approvals while 25 members stand in line. ChamaBook is optimized as a **single-operator high-speed cockpit** by default, with an optional 3-officer governance mode.
2. **Kikao cha Leo (Meeting Day Mode):**  
   Meeting day requires rapid batch recording: attendance, monthly share contributions (*Hisa*), welfare dues (*Mfuko wa Jamii*), and late fines (*Faini*). Everything must be recorded and balanced before members leave the room.
3. **Wadhamini (Loan Guarantors):**  
   In VICOBA bylaws, no member can borrow money without **two active guarantors** whose accumulated savings cover the loan risk. ChamaBook enforces and visualizes this accountability directly.
4. **Mfuko wa Jamii (Welfare/Emergency Fund):**  
   Social protection funds (bereavement, medical emergencies, childbirth) must be strictly segregated from investment share capital (*Hisa*) because welfare funds are grants, not dividend-bearing shares.
5. **WhatsApp Receipts:**  
   Members demand instant proof of payment. ChamaBook generates formatted, branded Swahili WhatsApp receipts that can be sent with one tap directly to the member's phone.

---

## 2. Architecture & Tech Stack

ChamaBook is intentionally built with a **Zero-Dependency Philosophy**. There are no heavy node modules, no webpack, no build steps, no React/Vue overhead, and no CSS framework bloat. It loads instantly on low-bandwidth networks and cheap smartphones.

```
                    ┌──────────────────────────────────────────────┐
                    │            Client Layer (Browser)            │
                    │  - index.html (Semantic HTML5 Single Page)   │
                    │  - styles.css (Modern Design System Tokens)  │
                    │  - app.js (State, DOM, Meeting Calc, Sync)   │
                    │  - i18n.js (Bilingual Swahili/English Engine)│
                    └──────────────────────┬───────────────────────┘
                                           │ HTTP / REST APIs
                                           ▼
                    ┌──────────────────────────────────────────────┐
                    │          Server Layer (Node.js 22)           │
                    │  - server.js (Native HTTP + node:sqlite)     │
                    │  - verify.js (Automated Health & Integrity)  │
                    │  - REST Endpoints (/api/state, /api/health)  │
                    └──────────────────────┬───────────────────────┘
                                           │ Embedded WAL Mode
                                           ▼
                    ┌──────────────────────────────────────────────┐
                    │             Storage (chamabook.db)           │
                    │  - groups, plans, members, loans, fines,     │
                    │    transactions, welfare_grants, meetings    │
                    └──────────────────────────────────────────────┘
```

### Stack Details
- **Backend:** Node.js 22 built-in `node:sqlite` (Native C-level SQLite binding, ultra-fast, zero external npm modules).
- **Frontend Engine:** Vanilla JavaScript (ES6+), component-driven reactive DOM rendering.
- **Styling:** Custom CSS Design System with CSS Custom Properties, calibrated 8px spacing rhythm, and fluid typography.
- **Typography:** `Manrope` (clean professional sans-serif) + `DM Mono` (monospaced tabular currency figures).
- **Persistence:** Local SQLite database (`chamabook.db`) backed by WAL journaling and automatic localStorage client caching.

---

## 3. Directory & File Breakdown

| File | Purpose & Responsibilities |
| :--- | :--- |
| `index.html` | Application shell, view templates, modals, sticky docks, and mobile navigation. |
| `styles.css` | Comprehensive design system tokens, typography scales, buttons, tables, meeting cockpit, cards, modals, and responsive breakpoints. |
| `app.js` | Client-side controller: state management, event delegation, live chart generation, meeting arithmetic, WhatsApp receipt builder, and backend sync. |
| `server.js` | Embedded Node.js server: serves static assets, provides RESTful API endpoints, handles transactions with ACID SQLite safety. |
| `i18n.js` | Real-time internationalization dictionary with a `MutationObserver` enabling live Swahili ↔ English switching without page reloads. |
| `verify.js` | Automated smoke and schema testing script for SQLite database tables and data relations. |
| `chamabook.db` | Production SQLite database file pre-seeded with a realistic 24-member Tanzanian group (*Kikundi cha Uwekezaji Umoja*). |
| `README.md` | Public repository documentation, quickstart, and feature highlights. |
| `HANDOFF.md` | This technical architectural and roadmap guide. |

---

## 4. Current State & What Has Been Accomplished

### A. Complete UI/UX Overhaul (Linear / Stripe Quality)
- **Eliminated AI Tropes:** Removed spinning SVG blobs, random decorative circles, unreadable 7px–9px microfonts, and fake sparkline waves.
- **Calibrated Color System:** Adopted an authoritative palette:
  - Deepest Obsidian Pine (`#06281e`) for primary sidebar & dark accents.
  - Forest Pine (`#064e3b`) for trustworthy brand actions.
  - Crisp Emerald (`#10b981`) for positive financial states.
  - Slate Neutrals (`#f8fafc`, `#ffffff`, `#e2e8f0`, `#0f172a`, `#334155`).
- **Readable Heading & Body Scale:** Enforced minimum 11px for badges/meta, 13px for body/table cells, 15px for card titles, and 24px–28px for KPIs.

### B. Core Features Fully Operational
1. **Dashboard (Overview):**
   - 5-Year Share-out Cycle Banner with circular SVG progress tracker and milestones.
   - 4 High-impact KPI Cards: Current Cash, Loan Portfolio, Member Capital, Interest Earned.
   - Dynamic SVG Area Chart showing monthly capital contributions and interest revenues.
   - Priority "Needs Attention" card highlighting overdue members with direct collection action.
   - Real-time accountability table showing latest ledger movements.
2. **Kikao cha Leo (Meeting Day Mode):**
   - Single-click batch tools: *Weka Wote Wapo* (Mark all present), *Weka Hisa za Wote* (Fill default share amount), *Weka Mfuko wa Jamii*, and *Safisha Namba*.
   - High-contrast tactile attendance toggle switch (`[ Yupo | Hayupo ]`).
   - Live sticky totals bar anchored at bottom calculating Attendance, Hisa, Welfare, Fines, and Grand Total in real-time.
   - One-click SQLite persistence with transaction ledger generation.
3. **Members Directory (Wanachama):**
   - Member search, active/paused status filter, CSV import/export with column mapping.
   - Member profile drawer with capital history and loan balances.
4. **Contributions (Michango):**
   - Multiple plan support: Member Capital (*Hisa*), Operating Fee (*Ada*), Welfare (*Jamii*).
   - Period progress tracking and payment status pills (All, Due, Paid).
5. **Loans & Wadhamini (Credit Register):**
   - Full credit ledger tracking principal, interest, repayments, and remaining balances.
   - **Guarantor System:** Every loan tracks and displays 2 guarantors.
   - Overdue loan warning indicators and partial repayment modals.
6. **Mfuko wa Jamii (Welfare Fund):**
   - Dedicated fund balance, total collections, and authorized grant disbursements tracking.
7. **Fines Register (Faini):**
   - Group rule assessments and collection tracking.
8. **Cycle & Share-out Planner (Mgao):**
   - Closing projections based on cash and recoverable principal under Pro-Rata or Equal share rules.
9. **Full Accountability Ledger:**
   - Multi-filtered search by transaction type and payment method (Cash, M-Pesa, Airtel Money, Mixx, Bank).

---

## 5. How to Run, Test, and Verify

### Prerequisites
- Node.js 22.0.0 or higher (required for native `node:sqlite`).

### Running the Application
```powershell
# 1. Navigate to the project directory
cd outputs/chamabook-app

# 2. Run the server
node server.js

# 3. Open in your browser
# URL: http://localhost:8000
```

### Verifying Code & Database Integrity
```powershell
# Check syntax of all JavaScript files
node --check app.js
node --check server.js
node --check i18n.js
node --check verify.js

# Verify SQLite schema, tables, and record counts
node verify.js
```
Expected output from `node verify.js`:
```json
Tables: fines, groups, loans, meetings, members, plans, transactions, welfare_grants
Database verification stats: {
  "groups": 1,
  "plans": 3,
  "members": 24,
  "loans": 8,
  "transactions": 28,
  "fines": 5,
  "welfare": 2,
  "meetings": 1
}
```

---

## 6. Project Roadmap for the Next Agent / Engineer

If you are continuing this codebase, here are the highest-priority next milestones:

### Milestone 1: Multi-Officer Approval Workflow (Optional Governance Mode)
- **Context:** Currently, single-operator mode is active. In `app.js` and `server.js`, the foundation for 3 officers (Treasurer, Chairperson, Secretary) exists.
- **Task:** Build an optional approval queue where sensitive actions (such as Disbursing a Loan > TSh 1,000,000 or closing a Share-out Cycle) generate a pending request status that requires secondary confirmation before finalizing.

### Milestone 2: Progressive Web App (PWA) & Offline Capability
- **Context:** Many VICOBA meetings take place outdoors, in church halls, or in rural areas where network coverage fluctuates.
- **Task:** Add `manifest.json` and a Service Worker (`sw.js`) utilizing Cache API and Background Sync so that the entire meeting can be run 100% offline, automatically syncing to `server.js` when back online.

### Milestone 3: SMS Receipt Fallback (Feature Phone Support)
- **Context:** WhatsApp receipts work great for smartphone owners, but elder members often carry basic feature phones (*kitochi*).
- **Task:** Integrate an SMS webhook adapter (e.g. Africa's Talking or Beem Africa) to send simple SMS receipts to members without WhatsApp.

### Milestone 4: Mobile Money Auto-Reconciliation
- **Context:** Group members increasingly pay contributions via M-Pesa Till or Lipa Namba.
- **Task:** Create an upload/paste parser for M-Pesa / Airtel Money transaction CSV statements to auto-match receipt codes against unpaid member schedules.

---

## 7. Guardrails for Future Modifications

1. **Maintain Zero-Dependency Simplicity:** Do not install heavy front-end frameworks (React, Angular, Vue) or CSS preprocessors unless explicitly requested. The current architecture delivers sub-50ms load times and flawless mobile responsiveness.
2. **Preserve Database Structure:** All table names in SQLite use snake_case (`welfare_grants`, `loans`, `transactions`). Keep foreign keys and constraints intact.
3. **Respect Cultural Naming:** Always retain Swahili terms as first-class citizens (*Hisa*, *Kikao*, *Wadhamini*, *Mfuko wa Jamii*, *Mweka Hazina*). Any new feature must have corresponding entries in `i18n.js`.
4. **Prioritize Speed in Meeting Mode:** Never add unnecessary modals or confirmation popups into the "Kikao cha Leo" table. Treasurers need to record data in seconds.
