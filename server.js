// ChamaBook SQLite Full-Stack Server
// Built with native Node.js: node:http, node:sqlite, node:fs, node:path
// Zero third-party dependencies required. High performance & reliability.

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const PORT = process.env.PORT || 8000;
const DB_PATH = path.join(__dirname, 'chamabook.db');
const BACKUP_DIR = path.join(__dirname, 'backups');

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Initialize SQLite database
const db = new DatabaseSync(DB_PATH);
db.exec('PRAGMA foreign_keys = ON;');
db.exec('PRAGMA journal_mode = WAL;');

// Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS groups (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    phone TEXT,
    location TEXT,
    established TEXT,
    cycle_name TEXT,
    start_date TEXT,
    end_date TEXT,
    rate REAL DEFAULT 12,
    reserve_percent REAL DEFAULT 5,
    distribution TEXT DEFAULT 'pro-rata',
    operator_mode TEXT DEFAULT 'single',
    officials_json TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS plans (
    id TEXT PRIMARY KEY,
    group_id TEXT NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    amount REAL NOT NULL,
    cadence TEXT NOT NULL,
    start_date TEXT,
    interval_days INTEGER DEFAULT 30,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS members (
    id TEXT PRIMARY KEY,
    group_id TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    joined_date TEXT,
    capital REAL DEFAULT 0,
    status TEXT DEFAULT 'Active',
    notes TEXT,
    paid_periods_json TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS loans (
    id TEXT PRIMARY KEY,
    group_id TEXT NOT NULL,
    member_id TEXT NOT NULL,
    original REAL NOT NULL,
    principal_remaining REAL NOT NULL,
    interest REAL DEFAULT 0,
    interest_paid REAL DEFAULT 0,
    repaid REAL DEFAULT 0,
    status TEXT DEFAULT 'Active',
    due_date TEXT,
    guarantor1_id TEXT,
    guarantor2_id TEXT,
    note TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS fines (
    id TEXT PRIMARY KEY,
    group_id TEXT NOT NULL,
    member_id TEXT NOT NULL,
    reason TEXT NOT NULL,
    amount REAL NOT NULL,
    paid REAL DEFAULT 0,
    assessed_date TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    group_id TEXT NOT NULL,
    type TEXT NOT NULL,
    amount REAL NOT NULL,
    member_id TEXT,
    method TEXT DEFAULT 'Cash',
    reference TEXT,
    date TEXT,
    note TEXT,
    recorded_by TEXT DEFAULT 'Asha M.',
    verified_by TEXT,
    contribution_plan_id TEXT,
    contribution_period_key TEXT,
    interest_part REAL,
    principal_part REAL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS welfare_grants (
    id TEXT PRIMARY KEY,
    group_id TEXT NOT NULL,
    member_id TEXT NOT NULL,
    amount REAL NOT NULL,
    reason TEXT NOT NULL,
    date TEXT,
    approved_by TEXT,
    note TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS meetings (
    id TEXT PRIMARY KEY,
    group_id TEXT NOT NULL,
    date TEXT NOT NULL,
    title TEXT,
    attendance_json TEXT,
    summary TEXT,
    total_collected REAL DEFAULT 0,
    recorded_by TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
  );
`);

// Seed Default Data if empty
function seedDatabaseIfEmpty() {
  const count = db.prepare('SELECT COUNT(*) as count FROM groups').get().count;
  if (count > 0) return;

  console.log('Seeding initial ChamaBook database...');
  const groupId = 'GRP-001';
  const demoPeriodStart = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-01`;

  const insertGroup = db.prepare(`
    INSERT INTO groups (id, name, description, type, phone, location, established, cycle_name, start_date, end_date, rate, reserve_percent, distribution, operator_mode, officials_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertGroup.run(
    groupId,
    'Kikundi cha Uwekezaji Umoja',
    'Akiba, mikopo na uwekezaji wa wanachama.',
    'Chama cha Hisa / VICOBA',
    '+255 754 000 111',
    'Dar es Salaam, Tanzania',
    '2022-10-01',
    'Mzunguko wa muda mrefu wa Umoja',
    '2022-10-01',
    '2027-09-30',
    12,
    5,
    'pro-rata',
    'single',
    JSON.stringify([
      { role: 'Mweka Hazina', name: 'Asha M.', phone: '0712000001' },
      { role: 'Mwenyekiti', name: 'Juma K.', phone: '0754000002' },
      { role: 'Katibu', name: 'Zainab S.', phone: '0784000003' }
    ])
  );

  const insertPlan = db.prepare(`
    INSERT INTO plans (id, group_id, name, type, amount, cadence, start_date, interval_days)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertPlan.run('PL-1', groupId, 'Hisa za kila mwezi', 'Member capital', 60000, 'Monthly', demoPeriodStart, 30);
  insertPlan.run('PL-2', groupId, 'Ada ya uendeshaji wa kikundi', 'Operating fee', 10000, 'Monthly', demoPeriodStart, 30);
  insertPlan.run('PL-3', groupId, 'Mfuko wa Jamii (Welfare)', 'Welfare fund', 5000, 'Monthly', demoPeriodStart, 30);

  const names = [
    'Neema Mushi', 'Daniel Mrema', 'Amina Hassan', 'Joseph Mallya', 'Rehema Ally', 'Baraka Peter',
    'Grace Mwinyi', 'Emmanuel Juma', 'Fatuma Omari', 'John Kimaro', 'Zawadi Charles', 'David Mwakalinga',
    'Joyce Michael', 'Abdallah Said', 'Esther Kweka', 'Peter Mollel', 'Rose Simon', 'Hassan Rashid',
    'Agnes Nyerere', 'Frank Leonard', 'Mariam Jafari', 'George Paulo', 'Sarah Mushi', 'Moses Laurent'
  ];
  const capitalWeights = [2.2, 1.8, 1.75, 1.6, 1.5, 1.45, 1.4, 1.35, 1.3, 1.25, 1.2, 1.15, 1.1, 1.05, 1, .95, .9, .85, .8, .75, .7, .65, .6, .5];
  const weightTotal = capitalWeights.reduce((s, w) => s + w, 0);

  const insertMember = db.prepare(`
    INSERT INTO members (id, group_id, name, phone, joined_date, capital, status, paid_periods_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  names.forEach((name, i) => {
    const memberId = `CB-${String(i + 1).padStart(3, '0')}`;
    let cap = Math.round((capitalWeights[i] / weightTotal) * 32480000);
    const status = i === 22 ? 'Paused' : 'Active';
    const paidPeriods = [1, 2, 3, 9].includes(i) ? {} : { 'PL-1': `PL-1-${demoPeriodStart}` };
    insertMember.run(memberId, groupId, name, `07${String(10000000 + i * 143219).slice(0, 8)}`, `202${i % 4}-${String((i % 12) + 1).padStart(2, '0')}-01`, cap, status, JSON.stringify(paidPeriods));
  });

  // Seed Loans (with guarantors)
  const loanSeed = [
    { memberIndex: 0, g1: 1, g2: 4, original: 1500000, remaining: 1200000, interest: 180000, interestPaid: 120000, repaid: 520000, status: 'Active', due: '2026-10-12' },
    { memberIndex: 2, g1: 0, g2: 5, original: 1200000, remaining: 1000000, interest: 144000, interestPaid: 70000, repaid: 374000, status: 'Overdue', due: '2026-08-30' },
    { memberIndex: 3, g1: 2, g2: 6, original: 1000000, remaining: 950000, interest: 120000, interestPaid: 45000, repaid: 195000, status: 'Overdue', due: '2026-09-10' },
    { memberIndex: 6, g1: 3, g2: 7, original: 1250000, remaining: 1100000, interest: 150000, interestPaid: 88000, repaid: 338000, status: 'Active', due: '2026-10-05' },
    { memberIndex: 8, g1: 4, g2: 9, original: 1100000, remaining: 1000000, interest: 132000, interestPaid: 40000, repaid: 272000, status: 'Overdue', due: '2026-09-01' },
    { memberIndex: 10, g1: 5, g2: 11, original: 900000, remaining: 850000, interest: 108000, interestPaid: 35000, repaid: 193000, status: 'Active', due: '2026-10-18' },
    { memberIndex: 14, g1: 7, g2: 12, original: 1050000, remaining: 900000, interest: 126000, interestPaid: 58000, repaid: 308000, status: 'Active', due: '2026-10-25' },
    { memberIndex: 19, g1: 8, g2: 13, original: 850000, remaining: 750000, interest: 102000, interestPaid: 22000, repaid: 172000, status: 'Active', due: '2026-11-04' }
  ];

  const insertLoan = db.prepare(`
    INSERT INTO loans (id, group_id, member_id, original, principal_remaining, interest, interest_paid, repaid, status, due_date, guarantor1_id, guarantor2_id, note)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  loanSeed.forEach((loan, idx) => {
    insertLoan.run(
      `LN-${String(idx + 1).padStart(3, '0')}`,
      groupId,
      `CB-${String(loan.memberIndex + 1).padStart(3, '0')}`,
      loan.original,
      loan.remaining,
      loan.interest,
      loan.interestPaid,
      loan.repaid,
      loan.status,
      loan.due,
      `CB-${String(loan.g1 + 1).padStart(3, '0')}`,
      `CB-${String(loan.g2 + 1).padStart(3, '0')}`,
      'Kikao cha idhini ya mkopo'
    );
  });

  // Seed Fines
  const finesSeed = [
    { id: 'FN-001', memberId: 'CB-003', reason: 'Kukosa kikao cha kikundi', amount: 10000, paid: 0, date: '2026-09-02' },
    { id: 'FN-002', memberId: 'CB-004', reason: 'Kuchelewa mchango', amount: 5000, paid: 0, date: '2026-09-08' },
    { id: 'FN-003', memberId: 'CB-009', reason: 'Kukosa kikao cha kikundi', amount: 10000, paid: 5000, date: '2026-08-14' },
    { id: 'FN-004', memberId: 'CB-012', reason: 'Kuchelewa mchango', amount: 5000, paid: 5000, date: '2026-08-30' },
    { id: 'FN-005', memberId: 'CB-015', reason: 'Kupiga simu wakati wa kikao', amount: 5000, paid: 0, date: '2026-09-17' }
  ];

  const insertFine = db.prepare(`
    INSERT INTO fines (id, group_id, member_id, reason, amount, paid, assessed_date)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  finesSeed.forEach(f => insertFine.run(f.id, groupId, f.memberId, f.reason, f.amount, f.paid, f.date));

  // Seed Transactions
  const txSeeds = [
    ['Member capital', 60000, 0, 'M-Pesa', 'RC-0925-024', '2026-09-24', 'PL-1'],
    ['Loan repayment', 180000, 0, 'Bank', 'RP-0924-023', '2026-09-23', null],
    ['Operating fee', 10000, 4, 'Cash', 'OF-0923-022', '2026-09-22', 'PL-2'],
    ['Member capital', 60000, 5, 'Airtel Money', 'MC-0922-021', '2026-09-21', 'PL-1'],
    ['Expense', 85000, null, 'Bank', 'EX-0921-020', '2026-09-20', null],
    ['Loan repayment', 125000, 6, 'M-Pesa', 'RP-0920-019', '2026-09-19', null],
    ['Member capital', 60000, 7, 'M-Pesa', 'MC-0919-018', '2026-09-18', 'PL-1'],
    ['Loan disbursement', 350000, 10, 'Bank', 'LN-0918-017', '2026-09-18', null],
    ['Operating fee', 10000, 11, 'Cash', 'OF-0917-016', '2026-09-17', 'PL-2'],
    ['Member capital', 60000, 12, 'M-Pesa', 'MC-0916-015', '2026-09-16', 'PL-1'],
    ['Loan repayment', 90000, 14, 'Cash', 'RP-0915-014', '2026-09-15', null],
    ['Member capital', 60000, 15, 'Bank', 'MC-0914-013', '2026-09-14', 'PL-1'],
    ['Expense', 42000, null, 'Cash', 'EX-0913-012', '2026-09-13', null],
    ['Member capital', 60000, 16, 'M-Pesa', 'MC-0912-011', '2026-09-12', 'PL-1'],
    ['Loan repayment', 70000, 18, 'Airtel Money', 'RP-0911-010', '2026-09-11', null],
    ['Operating fee', 10000, 19, 'Cash', 'OF-0910-009', '2026-09-10', 'PL-2'],
    ['Member capital', 60000, 20, 'M-Pesa', 'MC-0909-008', '2026-09-09', 'PL-1'],
    ['Loan disbursement', 200000, 21, 'Bank', 'LN-0908-007', '2026-09-08', null],
    ['Member capital', 60000, 22, 'M-Pesa', 'MC-0907-006', '2026-09-07', 'PL-1'],
    ['Loan repayment', 95000, 1, 'Bank', 'RP-0906-005', '2026-09-06', null],
    ['Operating fee', 10000, 3, 'Cash', 'OF-0905-004', '2026-09-05', 'PL-2'],
    ['Member capital', 60000, 9, 'Airtel Money', 'MC-0904-003', '2026-09-04', 'PL-1'],
    ['Expense', 25000, null, 'M-Pesa', 'EX-0903-002', '2026-09-03', null],
    ['Member capital', 60000, 13, 'M-Pesa', 'MC-0902-001', '2026-09-02', 'PL-1']
  ];

  const insertTx = db.prepare(`
    INSERT INTO transactions (id, group_id, type, amount, member_id, method, reference, date, note, recorded_by, contribution_plan_id, contribution_period_key)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  txSeeds.forEach(([type, amount, memberIdx, method, reference, date, planId], i) => {
    insertTx.run(
      `TX-${String(i + 1).padStart(4, '0')}`,
      groupId,
      type,
      amount,
      memberIdx !== null ? `CB-${String(memberIdx + 1).padStart(3, '0')}` : null,
      method,
      reference,
      date,
      type === 'Expense' ? 'Uendeshaji wa kikundi' : 'Mchango wa kawaida',
      'Asha M.',
      planId,
      planId ? `${planId}-${demoPeriodStart}` : null
    );
  });

  // Welfare Seed
  const insertWelfare = db.prepare(`
    INSERT INTO welfare_grants (id, group_id, member_id, amount, reason, date, approved_by, note)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertWelfare.run('WF-001', groupId, 'CB-005', 50000, 'Matibabu ya hospitali', '2026-08-20', 'Asha M.', 'Msaada wa kikundi kulingana na kanuni');

  console.log('ChamaBook database seeded successfully!');
}

seedDatabaseIfEmpty();

// Helper to assemble full application state
function getFullState(groupId = 'GRP-001') {
  const groupRow = db.prepare('SELECT * FROM groups WHERE id = ?').get(groupId);
  if (!groupRow) return null;

  const plans = db.prepare('SELECT id, name, type, amount, cadence, start_date as startDate, interval_days as intervalDays FROM plans WHERE group_id = ?').all(groupId);
  const membersRows = db.prepare('SELECT id, name, phone, joined_date as joined, capital, status, notes, paid_periods_json FROM members WHERE group_id = ?').all(groupId);
  const members = membersRows.map(m => ({
    id: m.id,
    name: m.name,
    phone: m.phone,
    joined: m.joined,
    capital: m.capital,
    status: m.status,
    notes: m.notes,
    paidPeriods: m.paid_periods_json ? JSON.parse(m.paid_periods_json) : {}
  }));

  const loans = db.prepare('SELECT id, member_id as memberId, original, principal_remaining as principalRemaining, interest, interest_paid as interestPaid, repaid, status, due_date as due, guarantor1_id as guarantor1Id, guarantor2_id as guarantor2Id, note FROM loans WHERE group_id = ?').all(groupId);
  const fines = db.prepare('SELECT id, member_id as memberId, reason, amount, paid, assessed_date as date FROM fines WHERE group_id = ?').all(groupId);
  const transactions = db.prepare('SELECT id, type, amount, member_id as memberId, method, reference, date, note, recorded_by as recordedBy, verified_by as verifiedBy, contribution_plan_id as contributionPlanId, contribution_period_key as contributionPeriodKey, interest_part as interestPart, principal_part as principalPart FROM transactions WHERE group_id = ? ORDER BY date DESC, id DESC').all(groupId);
  const welfareGrants = db.prepare('SELECT id, member_id as memberId, amount, reason, date, approved_by as approvedBy, note FROM welfare_grants WHERE group_id = ? ORDER BY date DESC').all(groupId);
  const meetings = db.prepare('SELECT id, date, title, attendance_json as attendanceJson, summary, total_collected as totalCollected, recorded_by as recordedBy FROM meetings WHERE group_id = ? ORDER BY date DESC').all(groupId);

  // Derive cash, interest, and expenses from ledger
  let cash = 18450000;
  let interestCollected = 4285000;
  let expenses = 0;

  const positiveTypes = ['Member capital', 'Operating fee', 'Welfare fund', 'Other contribution', 'Loan repayment', 'Fine payment', 'Other income'];
  transactions.forEach(tx => {
    if (positiveTypes.includes(tx.type)) {
      cash += tx.amount;
    } else if (tx.type === 'Loan disbursement' || tx.type === 'Expense') {
      cash -= tx.amount;
    }
    if (tx.type === 'Loan repayment' && tx.interestPart) {
      interestCollected += tx.interestPart;
    }
    if (tx.type === 'Expense') {
      expenses += tx.amount;
    }
  });

  return {
    group: {
      id: groupRow.id,
      name: groupRow.name,
      description: groupRow.description,
      type: groupRow.type,
      phone: groupRow.phone,
      location: groupRow.location,
      established: groupRow.established,
      cycleName: groupRow.cycle_name,
      start: groupRow.start_date,
      end: groupRow.end_date,
      rate: groupRow.rate,
      reservePercent: groupRow.reserve_percent,
      distribution: groupRow.distribution,
      operatorMode: groupRow.operator_mode || 'single',
      officials: groupRow.officials_json ? JSON.parse(groupRow.officials_json) : [],
      plans
    },
    members,
    loans,
    fines,
    transactions,
    welfareGrants,
    meetings,
    cash: Math.max(0, cash),
    interestCollected,
    expenses,
    lastSavedAt: new Date().toISOString(),
    isBackend: true
  };
}

// MIME types dictionary for static files
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.md': 'text/markdown; charset=utf-8'
};

// HTTP Request Handler
const server = http.createServer((req, res) => {
  // Enable CORS for local cross-origin development if needed
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // JSON Body Parser helper
  const getBody = () => new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });

  // REST API Routes
  if (pathname.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // Health Check
    if (pathname === '/api/health') {
      const stats = {
        status: 'online',
        server: 'ChamaBook Native SQLite Server',
        database: DB_PATH,
        membersCount: db.prepare('SELECT COUNT(*) as c FROM members').get().c,
        loansCount: db.prepare('SELECT COUNT(*) as c FROM loans').get().c,
        transactionsCount: db.prepare('SELECT COUNT(*) as c FROM transactions').get().c,
        timestamp: new Date().toISOString()
      };
      res.writeHead(200);
      res.end(JSON.stringify(stats));
      return;
    }

    // Get Full State
    if (pathname === '/api/state' && req.method === 'GET') {
      try {
        const state = getFullState();
        res.writeHead(200);
        res.end(JSON.stringify(state));
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    // Full State Bulk Save / Sync
    if (pathname === '/api/state' && req.method === 'POST') {
      getBody().then(incoming => {
        try {
          if (!incoming || !incoming.group) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: 'Invalid state structure.' }));
            return;
          }

          // Atomic transaction
          db.exec('BEGIN TRANSACTION;');

          const g = incoming.group;
          const groupId = g.id || 'GRP-001';

          // Upsert Group
          db.prepare(`
            INSERT INTO groups (id, name, description, type, phone, location, established, cycle_name, start_date, end_date, rate, reserve_percent, distribution, operator_mode, officials_json, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
            ON CONFLICT(id) DO UPDATE SET
              name = excluded.name,
              description = excluded.description,
              type = excluded.type,
              phone = excluded.phone,
              location = excluded.location,
              established = excluded.established,
              cycle_name = excluded.cycle_name,
              start_date = excluded.start_date,
              end_date = excluded.end_date,
              rate = excluded.rate,
              reserve_percent = excluded.reserve_percent,
              distribution = excluded.distribution,
              operator_mode = excluded.operator_mode,
              officials_json = excluded.officials_json,
              updated_at = datetime('now')
          `).run(
            groupId, g.name, g.description, g.type, g.phone || '', g.location || '', g.established || '',
            g.cycleName, g.start, g.end, Number(g.rate) || 12, Number(g.reservePercent) || 5, g.distribution || 'pro-rata',
            g.operatorMode || 'single', JSON.stringify(g.officials || [])
          );

          // Plans
          if (Array.isArray(g.plans)) {
            db.prepare('DELETE FROM plans WHERE group_id = ?').run(groupId);
            const insPlan = db.prepare(`
              INSERT INTO plans (id, group_id, name, type, amount, cadence, start_date, interval_days)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `);
            g.plans.forEach(p => insPlan.run(p.id, groupId, p.name, p.type, Number(p.amount) || 0, p.cadence, p.startDate, Number(p.intervalDays) || 30));
          }

          // Members
          if (Array.isArray(incoming.members)) {
            const insMem = db.prepare(`
              INSERT INTO members (id, group_id, name, phone, joined_date, capital, status, notes, paid_periods_json)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(id) DO UPDATE SET
                name = excluded.name,
                phone = excluded.phone,
                joined_date = excluded.joined_date,
                capital = excluded.capital,
                status = excluded.status,
                notes = excluded.notes,
                paid_periods_json = excluded.paid_periods_json
            `);
            incoming.members.forEach(m => insMem.run(m.id, groupId, m.name, m.phone || '', m.joined, Number(m.capital) || 0, m.status || 'Active', m.notes || '', JSON.stringify(m.paidPeriods || {})));
          }

          // Loans
          if (Array.isArray(incoming.loans)) {
            const insLoan = db.prepare(`
              INSERT INTO loans (id, group_id, member_id, original, principal_remaining, interest, interest_paid, repaid, status, due_date, guarantor1_id, guarantor2_id, note)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(id) DO UPDATE SET
                principal_remaining = excluded.principal_remaining,
                interest = excluded.interest,
                interest_paid = excluded.interest_paid,
                repaid = excluded.repaid,
                status = excluded.status,
                due_date = excluded.due_date,
                guarantor1_id = excluded.guarantor1_id,
                guarantor2_id = excluded.guarantor2_id,
                note = excluded.note
            `);
            incoming.loans.forEach(l => insLoan.run(l.id, groupId, l.memberId, Number(l.original) || 0, Number(l.principalRemaining) || 0, Number(l.interest) || 0, Number(l.interestPaid) || 0, Number(l.repaid) || 0, l.status || 'Active', l.due, l.guarantor1Id || null, l.guarantor2Id || null, l.note || ''));
          }

          // Fines
          if (Array.isArray(incoming.fines)) {
            const insFine = db.prepare(`
              INSERT INTO fines (id, group_id, member_id, reason, amount, paid, assessed_date)
              VALUES (?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(id) DO UPDATE SET
                reason = excluded.reason,
                amount = excluded.amount,
                paid = excluded.paid,
                assessed_date = excluded.assessed_date
            `);
            incoming.fines.forEach(f => insFine.run(f.id, groupId, f.memberId, f.reason, Number(f.amount) || 0, Number(f.paid) || 0, f.date));
          }

          // Transactions
          if (Array.isArray(incoming.transactions)) {
            const insTx = db.prepare(`
              INSERT OR IGNORE INTO transactions (id, group_id, type, amount, member_id, method, reference, date, note, recorded_by, verified_by, contribution_plan_id, contribution_period_key, interest_part, principal_part)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);
            incoming.transactions.forEach(tx => insTx.run(
              tx.id, groupId, tx.type, Number(tx.amount) || 0, tx.memberId || null, tx.method || 'Cash',
              tx.reference || '', tx.date, tx.note || '', tx.recordedBy || 'Asha M.', tx.verifiedBy || null,
              tx.contributionPlanId || null, tx.contributionPeriodKey || null, tx.interestPart || null, tx.principalPart || null
            ));
          }

          db.exec('COMMIT;');

          res.writeHead(200);
          res.end(JSON.stringify({ success: true, savedAt: new Date().toISOString() }));
        } catch (err) {
          db.exec('ROLLBACK;');
          res.writeHead(500);
          res.end(JSON.stringify({ error: err.message }));
        }
      }).catch(err => {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'JSON parse error' }));
      });
      return;
    }

    // Record Single Transaction API
    if (pathname === '/api/transactions' && req.method === 'POST') {
      getBody().then(tx => {
        try {
          const groupId = tx.groupId || 'GRP-001';
          const id = tx.id || `TX-${Date.now()}`;
          const amount = Number(tx.amount) || 0;

          db.exec('BEGIN TRANSACTION;');

          db.prepare(`
            INSERT INTO transactions (id, group_id, type, amount, member_id, method, reference, date, note, recorded_by, verified_by, contribution_plan_id, contribution_period_key, interest_part, principal_part)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).run(
            id, groupId, tx.type, amount, tx.memberId || null, tx.method || 'Cash',
            tx.reference || `${tx.type.slice(0, 2).toUpperCase()}-${Date.now().toString().slice(-7)}`,
            tx.date || new Date().toISOString().slice(0, 10), tx.note || '', tx.recordedBy || 'Asha M.',
            tx.verifiedBy || null, tx.contributionPlanId || null, tx.contributionPeriodKey || null,
            tx.interestPart || null, tx.principalPart || null
          );

          // Update member capital if contribution
          if (tx.type === 'Member capital' && tx.memberId) {
            db.prepare('UPDATE members SET capital = capital + ? WHERE id = ?').run(amount, tx.memberId);
          }

          // Update paidPeriods if plan key supplied
          if (tx.contributionPlanId && tx.contributionPeriodKey && tx.memberId) {
            const member = db.prepare('SELECT paid_periods_json FROM members WHERE id = ?').get(tx.memberId);
            if (member) {
              const current = member.paid_periods_json ? JSON.parse(member.paid_periods_json) : {};
              current[tx.contributionPlanId] = tx.contributionPeriodKey;
              db.prepare('UPDATE members SET paid_periods_json = ? WHERE id = ?').run(JSON.stringify(current), tx.memberId);
            }
          }

          db.exec('COMMIT;');

          res.writeHead(200);
          res.end(JSON.stringify({ success: true, id }));
        } catch (err) {
          db.exec('ROLLBACK;');
          res.writeHead(500);
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }

    // Welfare Grants List API
    if (pathname === '/api/welfare' && req.method === 'GET') {
      try {
        const rows = db.prepare('SELECT * FROM welfare_grants ORDER BY date DESC').all();
        res.writeHead(200);
        res.end(JSON.stringify(rows));
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    // Meeting Sessions List API
    if (pathname === '/api/meetings' && req.method === 'GET') {
      try {
        const rows = db.prepare('SELECT * FROM meetings ORDER BY date DESC').all();
        res.writeHead(200);
        res.end(JSON.stringify(rows));
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    // Welfare Emergency Grant API
    if (pathname === '/api/welfare' && req.method === 'POST') {
      getBody().then(data => {
        try {
          const groupId = data.groupId || 'GRP-001';
          const id = `WF-${Date.now()}`;
          const amount = Number(data.amount) || 0;

          db.exec('BEGIN TRANSACTION;');

          db.prepare(`
            INSERT INTO welfare_grants (id, group_id, member_id, amount, reason, date, approved_by, note)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `).run(id, groupId, data.memberId, amount, data.reason, data.date || new Date().toISOString().slice(0, 10), data.approvedBy || 'Uongozi wa Chama', data.note || '');

          // Record in transactions as Welfare disbursement
          db.prepare(`
            INSERT INTO transactions (id, group_id, type, amount, member_id, method, reference, date, note, recorded_by)
            VALUES (?, ?, 'Expense', ?, ?, ?, ?, ?, ?, ?)
          `).run(
            `TX-${id}`, groupId, amount, data.memberId, data.method || 'M-Pesa',
            `WF-GRANT-${id.slice(-6)}`, data.date || new Date().toISOString().slice(0, 10),
            `Msaada wa Jamii: ${data.reason}`, data.approvedBy || 'Asha M.'
          );

          db.exec('COMMIT;');
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, id }));
        } catch (err) {
          db.exec('ROLLBACK;');
          res.writeHead(500);
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }

    // Meeting Session Batch Collection API
    if (pathname === '/api/meetings' && req.method === 'POST') {
      getBody().then(meeting => {
        try {
          const groupId = meeting.groupId || 'GRP-001';
          const id = `MT-${Date.now()}`;
          const date = meeting.date || new Date().toISOString().slice(0, 10);

          db.exec('BEGIN TRANSACTION;');

          db.prepare(`
            INSERT INTO meetings (id, group_id, date, title, attendance_json, summary, total_collected, recorded_by)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `).run(
            id, groupId, date, meeting.title || `Kikao cha ${date}`,
            JSON.stringify(meeting.attendance || {}), meeting.summary || '',
            Number(meeting.totalCollected) || 0, meeting.recordedBy || 'Asha M.'
          );

          // Process batch items if provided
          if (Array.isArray(meeting.items)) {
            for (const item of meeting.items) {
              const txId = `TX-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
              db.prepare(`
                INSERT INTO transactions (id, group_id, type, amount, member_id, method, reference, date, note, recorded_by, contribution_plan_id, contribution_period_key)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              `).run(
                txId, groupId, item.type, Number(item.amount), item.memberId,
                item.method || 'Cash', item.reference || `MTG-${id.slice(-6)}`,
                date, item.note || `Kikao: ${meeting.title || date}`,
                meeting.recordedBy || 'Asha M.', item.planId || null, item.periodKey || null
              );

              if (item.type === 'Member capital') {
                db.prepare('UPDATE members SET capital = capital + ? WHERE id = ?').run(Number(item.amount), item.memberId);
              }
              if (item.planId && item.periodKey) {
                const mem = db.prepare('SELECT paid_periods_json FROM members WHERE id = ?').get(item.memberId);
                const cur = mem?.paid_periods_json ? JSON.parse(mem.paid_periods_json) : {};
                cur[item.planId] = item.periodKey;
                db.prepare('UPDATE members SET paid_periods_json = ? WHERE id = ?').run(JSON.stringify(cur), item.memberId);
              }
            }
          }

          db.exec('COMMIT;');
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, id }));
        } catch (err) {
          db.exec('ROLLBACK;');
          res.writeHead(500);
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }

    // Database Backup Download Endpoint
    if (pathname === '/api/backup') {
      try {
        const state = getFullState();
        const filename = `chamabook-backup-${new Date().toISOString().slice(0, 10)}.json`;
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.writeHead(200);
        res.end(JSON.stringify(state, null, 2));
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    // 404 for unhandled API
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
    return;
  }

  // Static File Serving
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

  // Security check to avoid directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Access Denied');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA if not found
      filePath = path.join(__dirname, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500);
        res.end('Error loading file');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 ChamaBook Full-Stack Server Running!`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`💾 SQLite Database: ${DB_PATH}`);
  console.log(`⚡ Mode: Native High-Performance Node.js Engine`);
  console.log(`======================================================\n`);
});
