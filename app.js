(() => {
  'use strict';

  const STORAGE_KEY = 'chamabook-demo-v1';
  const demoPeriodStart = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-01`;
  const money = (amount, compact = false) => {
    const value = Number(amount) || 0;
    if (compact && Math.abs(value) >= 1_000_000) return `TSh ${(value / 1_000_000).toFixed(2)}m`;
    if (compact && Math.abs(value) >= 10_000) return `TSh ${(value / 1_000).toFixed(0)}k`;
    return `TSh ${Math.round(value).toLocaleString('en-TZ')}`;
  };
  const esc = (value = '') => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const isoToday = () => ymd(new Date());
  const dateAfterDays = days => { const date = new Date(); date.setDate(date.getDate() + days); return ymd(date); };
  const dateText = value => value ? new Intl.DateTimeFormat(window.ChamaI18n?.lang === 'sw' ? 'sw-TZ' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${value}T12:00:00`)) : '—';
  const initials = name => String(name || '?').trim().split(/\s+/).slice(0, 2).map(part => part[0] || '').join('').toUpperCase();

  const names = [
    'Neema Mushi', 'Daniel Mrema', 'Amina Hassan', 'Joseph Mallya', 'Rehema Ally', 'Baraka Peter',
    'Grace Mwinyi', 'Emmanuel Juma', 'Fatuma Omari', 'John Kimaro', 'Zawadi Charles', 'David Mwakalinga',
    'Joyce Michael', 'Abdallah Said', 'Esther Kweka', 'Peter Mollel', 'Rose Simon', 'Hassan Rashid',
    'Agnes Nyerere', 'Frank Leonard', 'Mariam Jafari', 'George Paulo', 'Sarah Mushi', 'Moses Laurent'
  ];
  const capitalWeights = [2.2, 1.8, 1.75, 1.6, 1.5, 1.45, 1.4, 1.35, 1.3, 1.25, 1.2, 1.15, 1.1, 1.05, 1, .95, .9, .85, .8, .75, .7, .65, .6, .5];
  const weightTotal = capitalWeights.reduce((sum, item) => sum + item, 0);
  const loanSeed = [
    { memberIndex: 0, original: 1_500_000, principalRemaining: 1_200_000, interest: 180_000, interestPaid: 120_000, repaid: 520_000, status: 'Active', due: '2026-10-12' },
    { memberIndex: 2, original: 1_200_000, principalRemaining: 1_000_000, interest: 144_000, interestPaid: 70_000, repaid: 374_000, status: 'Overdue', due: '2026-08-30' },
    { memberIndex: 3, original: 1_000_000, principalRemaining: 950_000, interest: 120_000, interestPaid: 45_000, repaid: 195_000, status: 'Overdue', due: '2026-09-10' },
    { memberIndex: 6, original: 1_250_000, principalRemaining: 1_100_000, interest: 150_000, interestPaid: 88_000, repaid: 338_000, status: 'Active', due: '2026-10-05' },
    { memberIndex: 8, original: 1_100_000, principalRemaining: 1_000_000, interest: 132_000, interestPaid: 40_000, repaid: 272_000, status: 'Overdue', due: '2026-09-01' },
    { memberIndex: 10, original: 900_000, principalRemaining: 850_000, interest: 108_000, interestPaid: 35_000, repaid: 193_000, status: 'Active', due: '2026-10-18' },
    { memberIndex: 14, original: 1_050_000, principalRemaining: 900_000, interest: 126_000, interestPaid: 58_000, repaid: 308_000, status: 'Active', due: '2026-10-25' },
    { memberIndex: 19, original: 850_000, principalRemaining: 750_000, interest: 102_000, interestPaid: 22_000, repaid: 172_000, status: 'Active', due: '2026-11-04' }
  ];
  const transactionSeeds = [
    ['Member capital', 60_000, 0, 'M-Pesa', 'RC-0925-024', '2026-09-24'],
    ['Loan repayment', 180_000, 0, 'Bank', 'RP-0924-023', '2026-09-23'],
    ['Operating fee', 10_000, 4, 'Cash', 'OF-0923-022', '2026-09-22'],
    ['Member capital', 60_000, 5, 'Airtel Money', 'MC-0922-021', '2026-09-21'],
    ['Expense', 85_000, null, 'Bank', 'EX-0921-020', '2026-09-20'],
    ['Loan repayment', 125_000, 6, 'M-Pesa', 'RP-0920-019', '2026-09-19'],
    ['Member capital', 60_000, 7, 'M-Pesa', 'MC-0919-018', '2026-09-18'],
    ['Loan disbursement', 350_000, 10, 'Bank', 'LN-0918-017', '2026-09-18'],
    ['Operating fee', 10_000, 11, 'Cash', 'OF-0917-016', '2026-09-17'],
    ['Member capital', 60_000, 12, 'M-Pesa', 'MC-0916-015', '2026-09-16'],
    ['Loan repayment', 90_000, 14, 'Cash', 'RP-0915-014', '2026-09-15'],
    ['Member capital', 60_000, 15, 'Bank', 'MC-0914-013', '2026-09-14'],
    ['Expense', 42_000, null, 'Cash', 'EX-0913-012', '2026-09-13'],
    ['Member capital', 60_000, 16, 'M-Pesa', 'MC-0912-011', '2026-09-12'],
    ['Loan repayment', 70_000, 18, 'Airtel Money', 'RP-0911-010', '2026-09-11'],
    ['Operating fee', 10_000, 19, 'Cash', 'OF-0910-009', '2026-09-10'],
    ['Member capital', 60_000, 20, 'M-Pesa', 'MC-0909-008', '2026-09-09'],
    ['Loan disbursement', 200_000, 21, 'Bank', 'LN-0908-007', '2026-09-08'],
    ['Member capital', 60_000, 22, 'M-Pesa', 'MC-0907-006', '2026-09-07'],
    ['Loan repayment', 95_000, 1, 'Bank', 'RP-0906-005', '2026-09-06'],
    ['Operating fee', 10_000, 3, 'Cash', 'OF-0905-004', '2026-09-05'],
    ['Member capital', 60_000, 9, 'Airtel Money', 'MC-0904-003', '2026-09-04'],
    ['Expense', 25_000, null, 'M-Pesa', 'EX-0903-002', '2026-09-03'],
    ['Member capital', 60_000, 13, 'M-Pesa', 'MC-0902-001', '2026-09-02']
  ];

  function createInitialState() {
    const members = names.map((name, index) => ({
      id: `CB-${String(index + 1).padStart(3, '0')}`,
      name,
      phone: `07${String(10000000 + index * 143219).slice(0, 8)}`,
      joined: `202${index % 4}-${String((index % 12) + 1).padStart(2, '0')}-01`,
      capital: Math.round((capitalWeights[index] / weightTotal) * 32_480_000),
      status: index === 22 ? 'Paused' : 'Active',
      paidPeriods: [1, 2, 3, 9].includes(index) ? {} : { 'PL-1': `PL-1-${demoPeriodStart}` }
    }));
    // Make the sample aggregate match its displayed opening balance exactly.
    members[0].capital += 32_480_000 - members.reduce((sum, member) => sum + member.capital, 0);
    const loans = loanSeed.map((loan, index) => ({ id: `LN-${String(index + 1).padStart(3, '0')}`, memberId: `CB-${String(loan.memberIndex + 1).padStart(3, '0')}`, ...loan }));
    const transactions = transactionSeeds.map(([type, amount, memberIndex, method, reference, date], index) => {
      const contributionPlanId = type === 'Member capital' ? 'PL-1' : type === 'Operating fee' ? 'PL-2' : null;
      const plan = contributionPlanId ? { id: contributionPlanId, cadence: 'Monthly', startDate: demoPeriodStart } : null;
      return {
        id: `TX-${String(index + 1).padStart(4, '0')}`, type, amount, memberId: memberIndex === null ? null : `CB-${String(memberIndex + 1).padStart(3, '0')}`,
        method, reference, date, note: type === 'Expense' ? 'Group administration' : '', recordedBy: 'Asha M.',
        ...(plan ? { contributionPlanId, contributionPeriodKey: scheduleFor(plan, new Date(`${date}T12:00:00`)).key } : {})
      };
    });
    const fines = [
      { id: 'FN-001', memberId: 'CB-003', reason: 'Missed group meeting', amount: 10_000, paid: 0, date: '2026-09-02' },
      { id: 'FN-002', memberId: 'CB-004', reason: 'Late contribution', amount: 5_000, paid: 0, date: '2026-09-08' },
      { id: 'FN-003', memberId: 'CB-009', reason: 'Missed group meeting', amount: 10_000, paid: 5_000, date: '2026-08-14' },
      { id: 'FN-004', memberId: 'CB-012', reason: 'Late contribution', amount: 5_000, paid: 5_000, date: '2026-08-30' },
      { id: 'FN-005', memberId: 'CB-015', reason: 'Other: agreed group rule', amount: 15_000, paid: 0, date: '2026-09-17' }
    ];
    const fineLedger = [
      ...fines.map(fine => ({ id: `TX-${fine.id}-A`, type: 'Fine assessed', amount: fine.amount, memberId: fine.memberId, method: '—', reference: fine.id, date: fine.date, note: fine.reason, recordedBy: 'Asha M.' })),
      ...fines.filter(fine => fine.paid > 0).map(fine => ({ id: `TX-${fine.id}-P`, type: 'Fine payment', amount: fine.paid, memberId: fine.memberId, method: 'Cash', reference: `${fine.id}-RCPT`, date: fine.date, note: fine.reason, recordedBy: 'Asha M.' }))
    ];
    return {
      group: { name: 'Kikundi cha Uwekezaji Umoja', description: 'Akiba, mikopo na uwekezaji wa wanachama.', type: 'Investment group', phone: '+255 7xx xxx xxx', location: 'Dar es Salaam, Tanzania', established: '2022-10-01', cycleName: 'Mzunguko wa muda mrefu wa Umoja', start: '2022-10-01', end: '2027-09-30', distribution: 'pro-rata', rate: 12, reservePercent: 5, plans: [
        { id: 'PL-1', name: 'Hisa za kila mwezi', type: 'Member capital', amount: 60_000, cadence: 'Monthly', startDate: demoPeriodStart },
        { id: 'PL-2', name: 'Ada ya uendeshaji wa kikundi', type: 'Operating fee', amount: 10_000, cadence: 'Monthly', startDate: demoPeriodStart },
        { id: 'PL-3', name: 'Welfare fund', type: 'Welfare fund', amount: 5_000, cadence: 'Monthly', startDate: demoPeriodStart }
      ] },
      members, loans, transactions: [...transactions, ...fineLedger], fines, cash: 18_450_000, interestCollected: 4_285_000, expenses: 0,
      contributionFilter: 'all', toast: ''
    };
  }

  function isUsableState(candidate) {
    const numeric = value => Number.isFinite(Number(value));
    return Boolean(candidate && typeof candidate === 'object' && candidate.group && typeof candidate.group === 'object' &&
      typeof candidate.group.name === 'string' && Array.isArray(candidate.group.plans) && candidate.group.plans.every(plan =>
        plan && typeof plan.id === 'string' && typeof plan.name === 'string' && typeof plan.type === 'string' && numeric(plan.amount) && typeof plan.cadence === 'string') &&
      Array.isArray(candidate.members) && candidate.members.every(member => member && typeof member.id === 'string' && typeof member.name === 'string' && numeric(member.capital)) &&
      Array.isArray(candidate.loans) && candidate.loans.every(loan => loan && typeof loan.id === 'string' && typeof loan.memberId === 'string' && numeric(loan.original) && numeric(loan.principalRemaining)) &&
      Array.isArray(candidate.transactions) && candidate.transactions.every(tx => tx && typeof tx.id === 'string' && typeof tx.type === 'string' && numeric(tx.amount)) &&
      (candidate.fines == null || Array.isArray(candidate.fines) && candidate.fines.every(fine => fine && typeof fine.id === 'string' && typeof fine.memberId === 'string' && numeric(fine.amount) && numeric(fine.paid))) &&
      Number.isFinite(Number(candidate.cash)));
  }
  let state;
  let storageReadIssue = '';
  let stateRecoveryNeeded = false;
  let unreadableRawState = null;
  let stateLoadedFromStorage = false;
  let saveFailure = false;
  let lastSavedAt = null;
  try {
    const rawSavedState = localStorage.getItem(STORAGE_KEY);
    if (rawSavedState !== null) {
      try {
        const storedState = JSON.parse(rawSavedState);
        if (!isUsableState(storedState)) throw new Error('Stored records are incomplete.');
        state = storedState;
        const storedSaveTime = storedState.lastSavedAt ? new Date(storedState.lastSavedAt) : null;
        lastSavedAt = storedSaveTime && !Number.isNaN(storedSaveTime.getTime()) ? storedSaveTime : null;
        stateLoadedFromStorage = true;
      } catch {
        // Keep the unreadable value in place. Never replace a possibly useful ledger with demo data silently.
        stateRecoveryNeeded = true;
        unreadableRawState = rawSavedState;
        state = createInitialState();
      }
    } else state = createInitialState();
  } catch {
    storageReadIssue = 'unavailable';
    state = createInitialState();
  }
  let importFile = null;
  let importHeaders = [];
  let importRows = [];
  let importMapping = {};
  let memberPage = 1;
  let selectedContributionPlanId = '';
  let isBackendConnected = false;
  const API_BASE = window.location.origin.startsWith('http') ? window.location.origin : 'http://localhost:8000';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];

  function updateBackendPill(online) {
    isBackendConnected = Boolean(online);
    updateStorageStatus();
  }

  function updateStorageStatus() {
    const button = $('#dataSafetyButton');
    const label = $('#dataStatusText');
    if (!button || !label) return;
    const lang = window.ChamaI18n?.lang === 'en' ? 'en' : 'sw';
    const status = stateRecoveryNeeded ? 'recovery' : storageReadIssue || saveFailure ? 'error' : isBackendConnected ? 'backend' : stateLoadedFromStorage || lastSavedAt ? 'saved' : 'warning';
    const labels = {
      sw: { saved: 'Imehifadhiwa hapa', backend: 'SQLite Ipo Hewani', warning: 'Bado haijahifadhiwa', error: 'Hifadhi imekwama', recovery: 'Kagua data' },
      en: { saved: 'Saved on device', backend: 'SQLite Live', warning: 'Not saved yet', error: 'Save problem', recovery: 'Check data' }
    };
    const fullLabels = {
      sw: { saved: 'Taarifa zimehifadhiwa kwenye kivinjari hiki', backend: 'Taarifa zinahifadhiwa salama kwenye database ya SQLite', warning: 'Taarifa bado hazijahifadhiwa', error: 'Taarifa hazijahifadhiwa. Fungua hapa uone hatua za kuchukua.', recovery: 'Kumbukumbu haijasomeka. Data ya zamani haijafutwa wala kubadilishwa.' },
      en: { saved: 'Records are saved in this browser', backend: 'Records are permanently stored in the SQLite database', warning: 'Records have not been saved yet', error: 'Records are not saved. Open this panel for next steps.', recovery: 'The saved record could not be read. The old data has not been deleted or replaced.' }
    };
    button.dataset.state = status === 'backend' || status === 'saved' ? 'saved' : status === 'warning' ? 'warning' : 'error';
    label.textContent = labels[lang][status] || labels[lang].saved;
    button.title = fullLabels[lang][status] || fullLabels[lang].saved;
    button.setAttribute('aria-label', fullLabels[lang][status] || fullLabels[lang].saved);
  }

  const save = () => {
    if (stateRecoveryNeeded || storageReadIssue) { updateStorageStatus(); return false; }
    try {
      state.lastSavedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      lastSavedAt = new Date(state.lastSavedAt); stateLoadedFromStorage = true; saveFailure = false;
      updateStorageStatus();

      // Async sync to SQLite backend
      if (isBackendConnected || window.location.origin.startsWith('http')) {
        fetch(`${API_BASE}/api/state`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state)
        }).then(res => {
          if (res.ok) {
            isBackendConnected = true;
            updateBackendPill(true);
            updateStorageStatus();
          } else {
            updateBackendPill(false);
          }
        }).catch(() => {
          updateBackendPill(false);
        });
      }

      return true;
    } catch {
      saveFailure = true;
      updateStorageStatus();
      return false;
    }
  };
  const nextId = (prefix, records) => {
    let number = records.length + 1;
    let candidate = `${prefix}-${String(number).padStart(3, '0')}`;
    while (records.some(record => record.id === candidate)) candidate = `${prefix}-${String(++number).padStart(3, '0')}`;
    return candidate;
  };
  const activeMembers = () => state.members.filter(member => member.status === 'Active');
  const totalCapital = () => state.members.reduce((sum, member) => sum + member.capital, 0);
  const principalOutstanding = () => state.loans.reduce((sum, loan) => sum + Math.max(0, loan.principalRemaining), 0);
  const loanRemaining = loan => Math.max(0, loan.principalRemaining) + Math.max(0, loan.interest - loan.interestPaid);
  const loanStatus = loan => loanRemaining(loan) <= 0 ? 'Paid' : loan.due && loan.due < isoToday() ? 'Overdue' : 'Active';
  const getMember = id => state.members.find(member => member.id === id);
  const memberLoansTotal = memberId => state.loans.filter(loan => loan.memberId === memberId).reduce((sum, loan) => sum + Math.max(0, loan.principalRemaining), 0);
  const duePlan = () => state.group.plans.find(plan => plan.type === 'Member capital') || state.group.plans[0];
  const dueMembers = (plan = duePlan()) => {
    if (!plan) return [];
    const schedule = scheduleFor(plan);
    if (!schedule.isStarted || new Date(`${schedule.dueDate}T23:59:00`) > new Date()) return [];
    return activeMembers().filter(member => member.paidPeriods?.[plan.id] !== schedule.key);
  };
  function ymd(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; }
  function scheduleFor(plan, referenceDate = new Date()) {
    const today = referenceDate;
    const start = new Date(`${plan.startDate || isoToday()}T12:00:00`);
    let periodStart = new Date(start);
    const cadence = String(plan.cadence || 'Monthly').toLowerCase();
    let isStarted = today >= start;
    if (['weekly', 'biweekly', 'custom'].includes(cadence)) {
      const days = cadence === 'weekly' ? 7 : cadence === 'biweekly' ? 14 : Math.max(1, Number(plan.intervalDays) || 30);
      if (isStarted) periodStart.setDate(start.getDate() + Math.floor((today - start) / (days * 86400000)) * days);
      const due = new Date(periodStart); due.setDate(due.getDate() + days - 1);
      return { key: `${plan.id}-${ymd(periodStart)}`, periodStart: ymd(periodStart), dueDate: ymd(due), isStarted };
    }
    if (cadence === 'one-off') return { key: `${plan.id}-${ymd(start)}`, periodStart: ymd(start), dueDate: ymd(start), isStarted };
    const step = cadence === 'quarterly' ? 3 : cadence === 'annually' ? 12 : 1;
    if (isStarted) {
      for (let i = 0; i < 600; i++) {
        const next = new Date(start); next.setMonth(start.getMonth() + (i + 1) * step);
        if (next > today) break;
        periodStart = next;
      }
    }
    return { key: `${plan.id}-${ymd(periodStart)}`, periodStart: ymd(periodStart), dueDate: ymd(periodStart), isStarted };
  }
  const memberPaid = (member, plan) => {
    return contributionPaidAmount(member, plan) >= (Number(plan?.amount) || 0);
  };
  const contributionPaidAmount = (member, plan, paymentDate = new Date()) => {
    if (!member || !plan) return 0;
    const schedule = scheduleFor(plan, paymentDate);
    const recorded = (state.transactions || []).filter(tx => tx.memberId === member.id && tx.contributionPlanId === plan.id && tx.contributionPeriodKey === schedule.key)
      .reduce((sum, tx) => sum + Math.max(0, Number(tx.amount) || 0), 0);
    const legacyPaid = member.paidPeriods?.[plan.id] === schedule.key ? Number(plan.amount) || 0 : 0;
    return Math.min(Number(plan.amount) || 0, Math.max(recorded, legacyPaid));
  };
  const isPositive = type => ['Member capital', 'Operating fee', 'Welfare fund', 'Other contribution', 'Loan repayment', 'Fine payment', 'Other income'].includes(type);
  const amountClass = type => type === 'Fine assessed' ? 'amount-neutral' : isPositive(type) ? 'amount-positive' : 'amount-negative';
  const typeIcon = type => ({ 'Member capital': ['◉', 'type-capital'], 'Operating fee': ['↗', 'type-fee'], 'Welfare fund': ['♡', 'type-fee'], 'Loan disbursement': ['⇄', 'type-loan'], 'Loan repayment': ['↙', 'type-interest'], 'Fine payment': ['!', 'type-fee'], 'Fine assessed': ['!', 'type-expense'], 'Expense': ['−', 'type-expense'] }[type] || ['•', 'type-capital']);
  const statusBadge = status => `<span class="status-badge ${status === 'Paid' ? 'badge-paid' : status === 'Overdue' ? 'badge-overdue' : status === 'Due' ? 'badge-due' : status === 'Paused' ? 'badge-paused' : status === 'Upcoming' ? 'badge-upcoming' : status === 'Partial' ? 'badge-partial' : 'badge-active'}"><i></i>${esc(status)}</span>`;
  const methodLabel = method => `<span class="method-tag"><i class="method-mark">${esc((method || '—').slice(0, 1))}</i>${esc(method || '—')}</span>`;
  const memberCell = member => member ? `<span class="member-cell"><span class="small-avatar">${esc(initials(member.name))}</span>${esc(member.name)}</span>` : '<span class="member-cell">Group</span>';
  const transactionLabel = tx => {
    const [icon, tone] = typeIcon(tx.type);
    return `<div class="transaction-cell"><span class="type-icon ${tone}">${icon}</span><span class="transaction-label"><strong>${esc(tx.type)}</strong><small>${esc(tx.note || tx.reference || 'Recorded transaction')}</small></span></div>`;
  };
  function toast(message) {
    const node = $('#toast');
    node.textContent = window.ChamaI18n?.translate(message) || message;
    node.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => node.classList.remove('show'), 3000);
  }
  function addTransaction({ type, amount, memberId = null, method = 'Cash', note = '', reference = '', date = isoToday(), contributionPlanId = null, contributionPeriodKey = null, interestPart = null, principalPart = null }) {
    const tx = { id: `TX-${Date.now()}`, type, amount: Number(amount), memberId, method, note, reference: reference || `${type.slice(0, 2).toUpperCase()}-${Date.now().toString().slice(-7)}`, date, recordedBy: state.group.officials?.[0]?.name || 'Asha M.', ...(contributionPlanId ? { contributionPlanId, contributionPeriodKey } : {}), ...(interestPart ? { interestPart } : {}), ...(principalPart ? { principalPart } : {}) };
    state.transactions.unshift(tx);
    return tx;
  }

  // WHATSAPP SHAREABLE RECEIPT GENERATOR
  function showWhatsAppReceipt({ member, type, amount, reference, date, method }) {
    if (!member && typeof member === 'string') member = getMember(member);
    const groupName = state.group.name || 'Kikundi cha Uwekezaji Umoja';
    const txDate = dateText(date || isoToday());
    const memberName = member?.name || 'Mwanachama';
    const memberId = member?.id || '—';
    const totalShares = money(member?.capital || 0);
    const officialName = state.group.officials?.[0]?.name || 'Asha M.';
    const refCode = reference || `TX-${Date.now().toString().slice(-7)}`;

    let extraLoanInfo = '';
    const activeLoan = state.loans.find(l => l.memberId === member?.id && loanRemaining(l) > 0);
    if (activeLoan) {
      extraLoanInfo = `\n📉 Salio la Mkopo Lililobaki: *${money(loanRemaining(activeLoan))}*`;
    }

    const whatsappMessage = `🏛️ *${groupName.toUpperCase()}*
📜 *STAKABADHI YA MALIPO / RECEIPT*
━━━━━━━━━━━━━━━━━━━━
👤 Mwanachama: *${memberName}* (${memberId})
💰 Kiasi: *${money(amount)}*
📌 Aina: *${type}*
💳 Njia: *${method || 'M-Pesa'}* (Ref: ${refCode})
📅 Tarehe: *${txDate}*
━━━━━━━━━━━━━━━━━━━━
📊 Jumla ya Hisa: *${totalShares}*${extraLoanInfo}
🧾 Namba ya Muamala: *${refCode}*
✍️ Mweka Hazina: *${officialName}*
━━━━━━━━━━━━━━━━━━━━
_Asante kwa uaminifu wako kwenye kikundi!_`;

    const encodedText = encodeURIComponent(whatsappMessage);
    const waUrl = member?.phone ? `https://api.whatsapp.com/send?phone=255${member.phone.replace(/^0/, '')}&text=${encodedText}` : `https://api.whatsapp.com/send?text=${encodedText}`;

    openModal('Stakabadhi ya WhatsApp', 'UTAWALA WA FEDHA', `
      <div class="receipt-modal-wrap">
        <div class="receipt-paper" id="receiptPaper">
          <div class="receipt-brand-row">
            <div>
              <p class="receipt-title">${esc(groupName)}</p>
              <small style="color:#64746a;font-size:10px;">${esc(state.group.type || 'VICOBA / Chama')}</small>
            </div>
            <span class="receipt-badge">STAKABADHI RASMI</span>
          </div>

          <div class="receipt-amount-box">
            <span>Kiasi Kilicholipwa</span>
            <strong>${money(amount)}</strong>
          </div>

          <div class="receipt-details-list">
            <div class="receipt-detail-item">
              <span>Mwanachama:</span>
              <strong>${esc(memberName)} (${esc(memberId)})</strong>
            </div>
            <div class="receipt-detail-item">
              <span>Aina ya Malipo:</span>
              <strong>${esc(type)}</strong>
            </div>
            <div class="receipt-detail-item">
              <span>Njia na Namba:</span>
              <strong>${esc(method || 'Cash')} · ${esc(refCode)}</strong>
            </div>
            <div class="receipt-detail-item">
              <span>Tarehe ya Muamala:</span>
              <strong>${txDate}</strong>
            </div>
            <div class="receipt-detail-item">
              <span>Jumla ya Hisa za Mwanachama:</span>
              <strong style="color:#047857">${totalShares}</strong>
            </div>
            ${activeLoan ? `<div class="receipt-detail-item"><span>Deni Lililobaki la Mkopo:</span><strong style="color:#b91c1c">${money(loanRemaining(activeLoan))}</strong></div>` : ''}
            <div class="receipt-detail-item" style="border-top:1px dashed #dbe6dc;padding-top:8px;margin-top:4px;">
              <span>Mweka Hazina:</span>
              <strong>${esc(officialName)}</strong>
            </div>
          </div>
        </div>

        <div class="receipt-actions">
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="button btn-whatsapp" style="text-decoration:none;">
            <span>💬 Tuma WhatsApp</span>
          </a>
          <button type="button" class="button btn-copy" id="btnCopyReceiptText">
            <span>📋 Nakili Ujumbe</span>
          </button>
        </div>
      </div>
    `);

    $('#btnCopyReceiptText')?.addEventListener('click', () => {
      navigator.clipboard.writeText(whatsappMessage).then(() => {
        toast('Receipt copied to clipboard!');
      }).catch(() => {
        toast('Stakabadhi imenakiliwa!');
      });
    });
  }

  // MEETING MODE / KIKAO CHA LEO LOGIC
  let meetingAttendance = {};
  let meetingHisa = {};
  let meetingWelfare = {};
  let meetingFines = {};
  let meetingMethods = {};

  function initMeetingState() {
    const hisaPlan = state.group.plans.find(p => p.type === 'Member capital') || state.group.plans[0];
    const welfarePlan = state.group.plans.find(p => p.type === 'Welfare fund') || state.group.plans[2];
    const defHisa = hisaPlan?.amount || 60000;
    const defWelfare = welfarePlan?.amount || 5000;

    const hisaLabel = $('#quickHisaAmount');
    if (hisaLabel) hisaLabel.textContent = money(defHisa);
    const welfareLabel = $('#quickWelfareAmount');
    if (welfareLabel) welfareLabel.textContent = money(defWelfare);

    activeMembers().forEach(m => {
      if (meetingAttendance[m.id] === undefined) meetingAttendance[m.id] = true;
      if (meetingHisa[m.id] === undefined) meetingHisa[m.id] = defHisa;
      if (meetingWelfare[m.id] === undefined) meetingWelfare[m.id] = defWelfare;
      if (meetingFines[m.id] === undefined) meetingFines[m.id] = 0;
      if (meetingMethods[m.id] === undefined) meetingMethods[m.id] = 'Cash';
    });
  }

  function renderMeeting() {
    initMeetingState();
    const tableBody = $('#meetingTableBody');
    if (!tableBody) return;

    const members = activeMembers();
    const countEl = $('#meetingMembersCount');
    if (countEl) countEl.textContent = `${members.length} Wanachama Hai`;
    const dateEl = $('#meetingDateDisplay');
    if (dateEl) dateEl.textContent = `KIKAO CHA: ${dateText(isoToday()).toUpperCase()}`;

    tableBody.innerHTML = members.map(m => {
      const isPresent = meetingAttendance[m.id] !== false;
      const hisaVal = meetingHisa[m.id] ?? 60000;
      const welfareVal = meetingWelfare[m.id] ?? 5000;
      const fineVal = meetingFines[m.id] ?? 0;
      const methodVal = meetingMethods[m.id] || 'Cash';

      return `
        <tr data-member="${esc(m.id)}">
          <td>
            <div class="member-name-wrap">
              <span class="small-avatar">${esc(initials(m.name))}</span>
              <div>
                <strong>${esc(m.name)}</strong>
                <small>${esc(m.id)} · Hisa: ${money(m.capital)}</small>
              </div>
            </div>
          </td>
          <td>
            <div class="attendance-toggle">
              <button type="button" class="attendance-opt present ${isPresent ? 'active' : ''}" data-action="toggle-attend" data-id="${esc(m.id)}" data-val="true">Yupo</button>
              <button type="button" class="attendance-opt absent ${!isPresent ? 'active' : ''}" data-action="toggle-attend" data-id="${esc(m.id)}" data-val="false">Hayupo</button>
            </div>
          </td>
          <td>
            <input type="number" step="1000" class="meeting-input input-hisa" data-id="${esc(m.id)}" value="${isPresent ? hisaVal : 0}" ${!isPresent ? 'disabled' : ''}>
          </td>
          <td>
            <input type="number" step="1000" class="meeting-input input-welfare" data-id="${esc(m.id)}" value="${isPresent ? welfareVal : 0}" ${!isPresent ? 'disabled' : ''}>
          </td>
          <td>
            <input type="number" step="1000" class="meeting-input input-fine" data-id="${esc(m.id)}" value="${fineVal}" placeholder="0">
          </td>
          <td>
            <select class="filter-select select-method" style="min-width:90px;height:32px;padding:2px 6px;" data-id="${esc(m.id)}">
              ${['Cash', 'M-Pesa', 'Airtel Money', 'Mixx', 'Bank'].map(opt => `<option value="${opt}" ${methodVal === opt ? 'selected' : ''}>${opt}</option>`).join('')}
            </select>
          </td>
          <td>
            <button type="button" class="button button-small button-outline" data-action="member-receipt" data-id="${esc(m.id)}" title="Tengeneza na Tuma Risiti ya WhatsApp">
              💬 Risiti
            </button>
          </td>
        </tr>
      `;
    }).join('');

    calculateMeetingTotals();
  }

  function calculateMeetingTotals() {
    const members = activeMembers();
    let presentCount = 0;
    let totalHisa = 0;
    let totalWelfare = 0;
    let totalFines = 0;

    members.forEach(m => {
      const isPresent = meetingAttendance[m.id] !== false;
      if (isPresent) {
        presentCount++;
        totalHisa += Number(meetingHisa[m.id]) || 0;
        totalWelfare += Number(meetingWelfare[m.id]) || 0;
      }
      totalFines += Number(meetingFines[m.id]) || 0;
    });

    const grandTotal = totalHisa + totalWelfare + totalFines;

    const presEl = $('#meetingTotalPresent');
    if (presEl) presEl.textContent = `${presentCount} / ${members.length}`;
    const hisaEl = $('#meetingTotalHisa');
    if (hisaEl) hisaEl.textContent = money(totalHisa);
    const welfEl = $('#meetingTotalWelfare');
    if (welfEl) welfEl.textContent = money(totalWelfare);
    const finesEl = $('#meetingTotalFines');
    if (finesEl) finesEl.textContent = money(totalFines);
    const totalEl = $('#meetingTotalCollected');
    if (totalEl) totalEl.textContent = money(grandTotal);
  }

  function saveMeetingSession() {
    const members = activeMembers();
    const hisaPlan = state.group.plans.find(p => p.type === 'Member capital') || state.group.plans[0];
    const welfarePlan = state.group.plans.find(p => p.type === 'Welfare fund') || state.group.plans[2];
    const meetingDate = isoToday();
    const periodKeyHisa = hisaPlan ? scheduleFor(hisaPlan).key : null;
    const periodKeyWelfare = welfarePlan ? scheduleFor(welfarePlan).key : null;

    let totalCollected = 0;
    let transactionsCreated = 0;
    const batchItems = [];

    members.forEach(m => {
      const isPresent = meetingAttendance[m.id] !== false;
      const method = meetingMethods[m.id] || 'Cash';

      if (isPresent) {
        const hisaAmt = Number(meetingHisa[m.id]) || 0;
        if (hisaAmt > 0) {
          totalCollected += hisaAmt;
          m.capital += hisaAmt;
          state.cash += hisaAmt;
          m.paidPeriods ||= {};
          if (hisaPlan) m.paidPeriods[hisaPlan.id] = periodKeyHisa;
          addTransaction({
            type: 'Member capital',
            amount: hisaAmt,
            memberId: m.id,
            method,
            date: meetingDate,
            note: 'Hisa ya kikao cha leo',
            reference: `MTG-CAP-${m.id}`,
            contributionPlanId: hisaPlan?.id,
            contributionPeriodKey: periodKeyHisa
          });
          batchItems.push({ type: 'Member capital', amount: hisaAmt, memberId: m.id, method, planId: hisaPlan?.id, periodKey: periodKeyHisa });
          transactionsCreated++;
        }

        const welfareAmt = Number(meetingWelfare[m.id]) || 0;
        if (welfareAmt > 0) {
          totalCollected += welfareAmt;
          state.cash += welfareAmt;
          m.paidPeriods ||= {};
          if (welfarePlan) m.paidPeriods[welfarePlan.id] = periodKeyWelfare;
          addTransaction({
            type: 'Welfare fund',
            amount: welfareAmt,
            memberId: m.id,
            method,
            date: meetingDate,
            note: 'Mfuko wa jamii kikao cha leo',
            reference: `MTG-WLF-${m.id}`,
            contributionPlanId: welfarePlan?.id,
            contributionPeriodKey: periodKeyWelfare
          });
          batchItems.push({ type: 'Welfare fund', amount: welfareAmt, memberId: m.id, method, planId: welfarePlan?.id, periodKey: periodKeyWelfare });
          transactionsCreated++;
        }
      }

      const fineAmt = Number(meetingFines[m.id]) || 0;
      if (fineAmt > 0) {
        totalCollected += fineAmt;
        state.cash += fineAmt;
        const fineId = nextId('FN', state.fines);
        state.fines.push({ id: fineId, memberId: m.id, reason: 'Faini ya kikao (Kuchelewa/Kukosa)', amount: fineAmt, paid: fineAmt, date: meetingDate });
        addTransaction({
          type: 'Fine payment',
          amount: fineAmt,
          memberId: m.id,
          method,
          date: meetingDate,
          note: 'Malipo ya faini ya kikao',
          reference: `MTG-FN-${m.id}`
        });
        batchItems.push({ type: 'Fine payment', amount: fineAmt, memberId: m.id, method });
        transactionsCreated++;
      }
    });

    state.meetings ||= [];
    state.meetings.unshift({
      id: `MT-${Date.now()}`,
      date: meetingDate,
      title: `Kikao cha ${dateText(meetingDate)}`,
      totalCollected,
      attendance: { ...meetingAttendance },
      recordedBy: state.group.officials?.[0]?.name || 'Asha M.'
    });

    save();
    renderAll();
    toast(`Kikao kimehifadhiwa! Jumla ya ${money(totalCollected)} imerekodiwa kwa miamala ${transactionsCreated}.`);
  }

  // WELFARE FUND LOGIC
  function renderWelfare() {
    state.welfareGrants ||= [];
    const totalCollected = (state.transactions || []).filter(tx => tx.type === 'Welfare fund').reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
    const totalDisbursed = state.welfareGrants.reduce((sum, g) => sum + Number(g.amount || 0), 0);
    const balance = Math.max(0, totalCollected - totalDisbursed);

    const balEl = $('#welfareBalance');
    if (balEl) balEl.textContent = money(balance);
    const collEl = $('#welfareTotalCollected');
    if (collEl) collEl.textContent = money(totalCollected);
    const disbEl = $('#welfareTotalDisbursed');
    if (disbEl) disbEl.textContent = money(totalDisbursed);
    const countEl = $('#welfareGrantCount');
    if (countEl) countEl.textContent = `${state.welfareGrants.length} misaada iliyotolewa`;

    const welfarePlan = state.group.plans.find(p => p.type === 'Welfare fund');
    const perEl = $('#welfarePerMember');
    if (perEl) perEl.textContent = money(welfarePlan?.amount || 5000);

    const tableBody = $('#welfareTableBody');
    if (tableBody) {
      tableBody.innerHTML = state.welfareGrants.map(grant => {
        const member = getMember(grant.memberId);
        return `
          <tr>
            <td>${memberCell(member)}</td>
            <td><strong>${esc(grant.reason)}</strong>${grant.note ? `<br><small style="color:#64746a">${esc(grant.note)}</small>` : ''}</td>
            <td>${dateText(grant.date)}</td>
            <td><span class="recorded-by">${esc(grant.approvedBy || 'Uongozi')}</span></td>
            <td class="amount-negative align-right">−${money(grant.amount)}</td>
          </tr>
        `;
      }).join('') || '<tr><td colspan="5">Bado hakuna msaada wa kijamii uliotolewa. Mfuko upo salama.</td></tr>';
    }
  }

  function disburseWelfareForm() {
    openModal('Toa Msaada wa Jamii (Welfare Assistance)', 'MFUKO WA JAMII', `
      <form id="welfareForm">
        <div class="modal-info">
          Mfuko wa jamii unatoa misaada isiyorejeshwa kwa wanachama waliopatwa na matatizo (matibabu, msiba, au uzazi) kulingana na katiba ya kikundi.
        </div>
        <div class="form-grid">
          <div class="field full">
            <label for="welfareMember">Mwanachama Mfaidika</label>
            <select id="welfareMember" name="memberId" required>
              ${memberOptions()}
            </select>
          </div>
          <div class="field">
            <label for="welfareAmount">Kiasi cha Msaada (TSh)</label>
            <input id="welfareAmount" name="amount" type="number" min="1000" step="1000" value="50000" required>
          </div>
          <div class="field">
            <label for="welfareReason">Sababu ya Msaada</label>
            <select id="welfareReason" name="reason" required>
              <option value="Matibabu ya hospitali">Matibabu ya hospitali</option>
              <option value="Msiba na rambirambi">Msiba na rambirambi</option>
              <option value="Msaada wa uzazi">Msaada wa uzazi</option>
              <option value="Dharura nyingine ya kijamii">Dharura nyingine ya kijamii</option>
            </select>
          </div>
          <div class="field">
            <label for="welfareDate">Tarehe</label>
            <input id="welfareDate" name="date" type="date" value="${isoToday()}" required>
          </div>
          <div class="field">
            <label for="welfareMethod">Njia ya Kutoa</label>
            <select id="welfareMethod" name="method">${methodOptions('M-Pesa')}</select>
          </div>
          <div class="field full">
            <label for="welfareNote">Kumbukumbu ya Uthibitisho / Maelezo</label>
            <input id="welfareNote" name="note" placeholder="Mfano: Barua ya hospitali au taarifa ya msiba">
          </div>
        </div>
        ${modalActions('Ghairi')}
      </form>
    `);
  }
  function cycleProgress() {
    const start = new Date(`${state.group.start}T12:00:00`).getTime();
    const end = new Date(`${state.group.end}T12:00:00`).getTime();
    const now = Date.now();
    return Math.max(0, Math.min(100, Math.round(((now - start) / Math.max(1, end - start)) * 100)));
  }
  function fmtCycleDate(date) { return dateText(date); }
  function cycleDurationYears() {
    return Math.max(1, Math.round((new Date(`${state.group.end}T12:00:00`) - new Date(`${state.group.start}T12:00:00`)) / (365.25 * 86400000)));
  }

  function renderCycle() {
    const progress = cycleProgress();
    const years = cycleDurationYears();
    const elapsed = Math.min(years, Math.max(1, Math.ceil(progress / 100 * years)));
    const start = fmtCycleDate(state.group.start);
    const end = fmtCycleDate(state.group.end);
    const pct = `${progress}%`;
    $('#cycleYearsLabel').textContent = `YEAR ${elapsed} OF ${years}`;
    $('#cycleStartLabel').textContent = start;
    $('#cycleEndLabel').textContent = end;
    $('#cyclePercent').textContent = pct;
    $('#ringProgress').style.strokeDasharray = `${(progress / 100) * 308} 308`;
    $('#cycleMilestones').innerHTML = Array.from({ length: years }, (_, index) => `<span class="milestone-segment ${index < elapsed ? 'done' : ''}" title="${window.ChamaI18n?.lang === 'sw' ? 'Mwaka ' + (index + 1) : 'Year ' + (index + 1)}"></span>`).join('');
    $('#sidebarProgressLabel').textContent = pct;
    $('#sidebarProgress').style.width = pct;
    $('#sidebarCycleYear').textContent = `Year ${elapsed} of ${years}`;
    $('#sidebarCycleEnd').textContent = new Intl.DateTimeFormat(window.ChamaI18n?.lang === 'sw' ? 'sw-TZ' : 'en', { month: 'short', year: 'numeric' }).format(new Date(`${state.group.end}T12:00:00`));
    $('#shareoutCycleName').textContent = state.group.cycleName;
    $('#shareoutStart').textContent = start;
    $('#shareoutEnd').textContent = end;
    $('#shareoutYearLabel').textContent = `Year ${elapsed} of ${years}`;
    $('#shareoutProgressLabel').textContent = pct;
    $('#shareoutProgress').style.width = pct;
    $('#shareoutMilestones').innerHTML = Array.from({ length: years }, (_, index) => `<i class="${index < elapsed ? 'done' : ''}"></i>`).join('');
    const cash = state.cash;
    const receivable = principalOutstanding();
    const reserve = Math.round((cash + receivable) * (Number(state.group.reservePercent) || 0) / 100);
    const projected = Math.max(0, cash + receivable - reserve);
    $('#projectedShareout').textContent = money(projected);
    $('#shareoutCash').textContent = money(cash);
    $('#shareoutReceivable').textContent = money(receivable);
    const distributionLabels = { 'pro-rata': 'Pro rata by paid-up member capital', equal: 'Equal share across active members', capitalPlusEqual: 'Capital-weighted with equal bonus' };
    $('#distributionRuleLabel').textContent = distributionLabels[state.group.distribution] || state.group.distribution;
    const capital = totalCapital() || 1;
    $('#shareoutTable').innerHTML = activeMembers().sort((a, b) => b.capital - a.capital).map(member => {
      const share = state.group.distribution === 'equal' ? 1 / Math.max(1, activeMembers().length) : member.capital / capital;
      const adjusted = state.group.distribution === 'capitalPlusEqual' ? share * .9 + (1 / Math.max(1, activeMembers().length)) * .1 : share;
      return `<tr><td>${memberCell(member)}</td><td class="table-number">${money(member.capital)}</td><td>${(adjusted * 100).toFixed(1)}%</td><td class="table-number">${money(projected * adjusted)}</td></tr>`;
    }).join('');
  }

  function renderChart() {
    const count = Number($('#chartRange').value || 6);
    const labels = [];
    const capital = [];
    const interest = [];
    const now = new Date();
    for (let i = count - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      labels.push(new Intl.DateTimeFormat(window.ChamaI18n?.lang === 'sw' ? 'sw-TZ' : 'en', { month: 'short' }).format(date));
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const inMonth = state.transactions.filter(tx => String(tx.date || '').slice(0, 7) === monthKey);
      capital.push(inMonth.filter(tx => tx.type === 'Member capital').reduce((sum, tx) => sum + Number(tx.amount || 0), 0));
      interest.push(inMonth.filter(tx => tx.type === 'Loan repayment').reduce((sum, tx) => {
        if (Number.isFinite(Number(tx.interestPart))) return sum + Number(tx.interestPart);
        const legacy = String(tx.note || '').match(/^\s*(?:TSh\s*)?([\d,]+)\s+interest\b/i);
        return sum + (legacy ? Number(legacy[1].replace(/,/g, '')) : 0);
      }, 0));
    }
    const max = Math.max(...capital, ...interest, 100) * 1.12;
    $$('.chart-y-labels span').forEach((label, index) => {
      const value = max * (4 - index) / 4;
      label.textContent = value >= 1_000_000 ? `${(value / 1_000_000).toFixed(1)}m` : value >= 1_000 ? `${Math.round(value / 1_000)}k` : String(Math.round(value));
    });
    const points = values => values.map((value, index) => `${(index * 700 / Math.max(1, count - 1)).toFixed(1)},${(174 - (value / max) * 155).toFixed(1)}`);
    const capPts = points(capital);
    const intPts = points(interest);
    const capPath = capPts.map((point, i) => `${i ? 'L' : 'M'}${point}`).join(' ');
    $('#capitalLine').setAttribute('d', capPath);
    $('#capitalArea').setAttribute('d', `${capPath} L700,180 L0,180 Z`);
    $('#interestLine').setAttribute('d', intPts.map((point, i) => `${i ? 'L' : 'M'}${point}`).join(' '));
    $('#chartPoints').innerHTML = capPts.map(point => { const [x, y] = point.split(','); return `<circle class="chart-point" cx="${x}" cy="${y}" r="3.5"/>`; }).join('');
    $('#chartMonths').innerHTML = labels.map(label => `<span>${label}</span>`).join('');
    $('#chartTotal').textContent = money(totalCapital(), true);
  }

  function renderDashboard() {
    const membersCapital = totalCapital();
    const portfolio = principalOutstanding();
    $('#cashValue').textContent = money(state.cash);
    $('#loanValue').textContent = money(portfolio);
    $('#capitalValue').textContent = money(membersCapital);
    $('#interestValue').textContent = money(state.interestCollected);
    const monthKey = isoToday().slice(0, 7);
    const monthTransactions = state.transactions.filter(tx => String(tx.date || '').slice(0, 7) === monthKey);
    const monthCapital = monthTransactions.filter(tx => tx.type === 'Member capital').reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
    const monthInterest = monthTransactions.filter(tx => tx.type === 'Loan repayment').reduce((sum, tx) => {
      if (Number.isFinite(Number(tx.interestPart))) return sum + Number(tx.interestPart);
      const legacy = String(tx.note || '').match(/^\s*(?:TSh\s*)?([\d,]+)\s+interest\b/i);
      return sum + (legacy ? Number(legacy[1].replace(/,/g, '')) : 0);
    }, 0);
    $('#capitalThisMonth').textContent = money(monthCapital);
    $('#interestThisMonth').textContent = money(monthInterest);
    const overdueLoans = state.loans.filter(loan => loanStatus(loan) === 'Overdue');
    const membersDue = dueMembers();
    $('#unpaidCount').textContent = membersDue.length;
    const dueAmount = membersDue.length * (duePlan()?.amount || 0);
    $('#dueSummaryLabel').textContent = `${duePlan()?.cadence || 'Contribution'} schedule · ${money(dueAmount)} due`;
    $('#dueList').innerHTML = membersDue.slice(0, 4).map(member => `<div class="due-row"><span class="small-avatar">${esc(initials(member.name))}</span><span class="due-info"><strong>${esc(member.name)}</strong><small>${esc(member.id)} · payment due</small></span><span class="due-amount">${money(duePlan()?.amount || 0)}</span></div>`).join('') || '<div class="due-empty">All active members are up to date.</div>';
    const recent = [...state.transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
    $('#recentTransactions').innerHTML = recent.map(tx => `<tr><td>${transactionLabel(tx)}</td><td>${memberCell(getMember(tx.memberId))}</td><td>${methodLabel(tx.method)}</td><td><span class="recorded-by">${esc(tx.recordedBy)}</span></td><td>${dateText(tx.date)}</td><td class="${amountClass(tx.type)}">${tx.type === 'Fine assessed' ? '' : isPositive(tx.type) ? '+' : '−'}${money(tx.amount)}</td></tr>`).join('');
    const currentDate = new Date();
    $('#todayLabel').textContent = new Intl.DateTimeFormat(window.ChamaI18n?.lang === 'sw' ? 'sw-TZ' : 'en-GB', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }).format(currentDate).toUpperCase();
    $('#memberCount').textContent = state.members.length;
    $('#pageTitle').innerHTML = `Good ${currentDate.getHours() < 12 ? 'morning' : currentDate.getHours() < 17 ? 'afternoon' : 'evening'}, Asha <span class="wave">✳</span>`;
    renderChart();
    renderCycle();
    $('#overdueLoanSummary').textContent = window.ChamaI18n?.lang === 'en'
      ? `${overdueLoans.length} loans overdue`
      : `Mikopo ${overdueLoans.length} imechelewa`;
  }

  function renderMembers() {
    const search = ($('#memberSearch').value || $('#globalSearch').value || '').toLowerCase();
    const filter = $('#memberStatusFilter').value;
    const list = state.members.filter(member => (filter === 'all' || member.status === filter) && (!search || `${member.name} ${member.id} ${member.phone}`.toLowerCase().includes(search)));
    const pageSize = 12;
    const pageCount = Math.max(1, Math.ceil(list.length / pageSize));
    memberPage = Math.min(memberPage, pageCount);
    $('#membersTotal').textContent = activeMembers().length;
    $('#membersCapital').textContent = money(totalCapital());
    $('#membersWithLoans').textContent = new Set(state.loans.filter(loan => loanRemaining(loan) > 0).map(loan => loan.memberId)).size;
    $('#membersTable').innerHTML = list.slice((memberPage - 1) * pageSize, memberPage * pageSize).map(member => `<tr><td><div class="member-name-wrap"><span class="small-avatar">${esc(initials(member.name))}</span><div><strong>${esc(member.name)}</strong><small>${esc(member.phone || '')}</small></div></div></td><td><span class="member-id">${esc(member.id)}</span></td><td>${dateText(member.joined)}</td><td class="table-number">${money(member.capital)}</td><td class="table-number ${memberLoansTotal(member.id) ? '' : 'loan-balance-zero'}">${money(memberLoansTotal(member.id))}</td><td>${statusBadge(member.status)}</td><td><button class="row-action" data-action="member-menu" data-id="${esc(member.id)}" aria-label="Member actions">···</button></td></tr>`).join('') || '<tr><td colspan="7">No matching members.</td></tr>';
    const pageButtons = Array.from({ length: pageCount }, (_, index) => `<button type="button" class="page-number ${memberPage === index + 1 ? 'active' : ''}" data-action="member-page" data-page="${index + 1}">${index + 1}</button>`).join('');
    $('.pagination').innerHTML = `<button type="button" aria-label="Previous page" data-action="member-page" data-page="${Math.max(1, memberPage - 1)}" ${memberPage === 1 ? 'disabled' : ''}>‹</button>${pageButtons}<button type="button" aria-label="Next page" data-action="member-page" data-page="${Math.min(pageCount, memberPage + 1)}" ${memberPage === pageCount ? 'disabled' : ''}>›</button>`;
    const first = list.length ? (memberPage - 1) * pageSize + 1 : 0;
    $('#memberFooterCount').textContent = `Showing ${first}–${Math.min(memberPage * pageSize, list.length)} of ${list.length} members`;
  }

  function renderContributions() {
    const plans = state.group.plans || [];
    const defaultPlan = duePlan();
    if (!plans.some(item => item.id === selectedContributionPlanId)) selectedContributionPlanId = defaultPlan?.id || '';
    const plan = plans.find(item => item.id === selectedContributionPlanId) || defaultPlan;
    const due = dueMembers(plan);
    const planSelect = $('#contributionPlanSelect');
    planSelect.innerHTML = plans.map(item => `<option value="${esc(item.id)}" ${item.id === plan?.id ? 'selected' : ''}>${esc(item.name)}</option>`).join('');
    planSelect.disabled = plans.length < 2;
    const schedule = plan ? scheduleFor(plan) : null;
    const periodStarted = Boolean(schedule?.isStarted);
    const totalDue = periodStarted ? activeMembers().length * (plan?.amount || 0) : 0;
    const totalPaid = periodStarted ? activeMembers().reduce((sum, member) => sum + contributionPaidAmount(member, plan), 0) : 0;
    const percent = totalDue ? Math.round(totalPaid / totalDue * 100) : 0;
    $('.collection-highlight .eyebrow').textContent = `${plan?.cadence || 'CUSTOM'} CONTRIBUTION PLAN · ${plan ? dateText(scheduleFor(plan).periodStart).toUpperCase() : ''}`;
    $('.collection-progress > div:last-child span').textContent = ` of ${money(totalDue)} expected this period`;
    $('#collectedThisMonth').textContent = money(totalPaid);
    $('#collectionPercent').textContent = `${percent}%`;
    $('#collectionDue').textContent = due.length;
    $('#collectionProgress').style.width = `${percent}%`;
    $('#duePillCount').textContent = due.length;
    $('#planGrid').innerHTML = state.group.plans.map((item, index) => `<div class="plan-item"><div><i class="legend-dot ${index % 2 ? 'legend-interest' : 'legend-capital'}"></i>${esc(item.name)}</div><strong>${money(item.amount)} <small>/ ${esc(item.cadence.toLowerCase())}</small></strong><span>${esc(item.type)}</span></div>`).join('');
    const activeFilter = state.contributionFilter || 'all';
    $$('[data-contribution-filter]').forEach(button => button.classList.toggle('active', button.dataset.contributionFilter === activeFilter));
    const rows = activeMembers().filter(member => activeFilter === 'all' || (activeFilter === 'Due' ? !memberPaid(member, plan) && due.includes(member) : memberPaid(member, plan)));
    $('#contributionStatusTable').innerHTML = rows.slice(0, 18).map(member => {
      const paidAmount = contributionPaidAmount(member, plan);
      const paid = plan && paidAmount >= plan.amount;
      const status = paid ? 'Paid' : paidAmount > 0 ? 'Partial' : schedule && !due.includes(member) ? 'Upcoming' : 'Due';
      return `<tr><td>${memberCell(member)}</td><td>${esc(plan?.name || 'Contribution')}</td><td>${dateText(schedule?.dueDate)}</td><td class="table-number">${plan && paidAmount > 0 ? `${money(paidAmount)} / ` : ''}${money(plan?.amount || 0)}</td><td>${statusBadge(status)}</td><td>${paid ? '' : `<button class="button button-small button-outline" data-action="pay-member" data-id="${esc(member.id)}">Record</button>`}</td></tr>`;
    }).join('');
  }

  function renderLoans() {
    const filter = $('#loanFilter').value;
    const overdue = state.loans.filter(loan => loanStatus(loan) === 'Overdue');
    const today = isoToday();
    const weekFromToday = new Date();
    weekFromToday.setDate(weekFromToday.getDate() + 7);
    const lastDayOfWindow = ymd(weekFromToday);
    const upcoming = state.loans.filter(loan => loanStatus(loan) === 'Active' && loan.due && loan.due >= today && loan.due <= lastDayOfWindow);
    $('#loanBookTotal').textContent = money(principalOutstanding());
    $('#loanInterestTotal').textContent = money(state.interestCollected);
    $('#overdueTotal').textContent = money(overdue.reduce((sum, loan) => sum + loanRemaining(loan), 0));
    $('#overdueCount').textContent = `${overdue.length} loans`;
    $('#upcomingTotal').textContent = money(upcoming.reduce((sum, loan) => sum + loanRemaining(loan), 0));
    const overdueMembers = new Set(overdue.map(loan => loan.memberId)).size;
    $('#membersLoanFollowup').textContent = window.ChamaI18n?.lang === 'en'
      ? `${overdueMembers} members need follow-up`
      : `Wanachama ${overdueMembers} wanahitaji kufuatiliwa`;
    const loans = [...state.loans].filter(loan => filter === 'all' || loanStatus(loan) === filter);
    $('#loansTable').innerHTML = loans.map(loan => {
      const member = getMember(loan.memberId);
      const remaining = loanRemaining(loan);
      const status = loanStatus(loan);
      const repaidPrincipal = Math.max(0, loan.original - loan.principalRemaining);
      const g1 = loan.guarantor1Id ? getMember(loan.guarantor1Id) : null;
      const g2 = loan.guarantor2Id ? getMember(loan.guarantor2Id) : null;
      const guarantorsText = (g1 || g2) ? `<br><small style="color:#5f7066;font-size:9px;">👥 Wadhamini: ${[g1?.name, g2?.name].filter(Boolean).join(', ')}</small>` : '';

      return `<tr><td>${memberCell(member)}${guarantorsText}</td><td><span class="member-id">${esc(loan.id)}</span></td><td class="table-number">${money(loan.original)}</td><td class="table-number">${money(loan.interest)}</td><td class="table-number">${money(repaidPrincipal + loan.interestPaid)}</td><td class="table-number">${money(remaining)}</td><td>${statusBadge(status)}</td><td>${remaining ? `<button class="row-action" data-action="repay-loan" data-id="${esc(loan.id)}" aria-label="Record repayment">↙</button>` : ''}</td></tr>`;
    }).join('') || '<tr><td colspan="8">No loans match this filter.</td></tr>';
  }

  function renderFines() {
    state.fines ||= [];
    const filter = $('#fineFilter').value;
    const assessed = state.fines.reduce((sum, fine) => sum + fine.amount, 0);
    const outstanding = state.fines.reduce((sum, fine) => sum + Math.max(0, fine.amount - fine.paid), 0);
    const collected = state.transactions.filter(tx => tx.type === 'Fine payment').reduce((sum, tx) => sum + tx.amount, 0);
    $('#finesOutstanding').textContent = money(outstanding);
    $('#finesAssessed').textContent = state.fines.length;
    $('#finesCollected').textContent = money(collected);
    const fines = [...state.fines].filter(fine => filter === 'all' || (filter === 'Paid' ? fine.paid >= fine.amount : fine.paid < fine.amount));
    $('#finesTable').innerHTML = fines.map(fine => {
      const remaining = Math.max(0, fine.amount - fine.paid);
      return `<tr><td>${memberCell(getMember(fine.memberId))}</td><td>${esc(fine.reason)}</td><td>${dateText(fine.date)}</td><td class="table-number">${money(fine.amount)}</td><td class="table-number">${money(fine.paid)}</td><td class="table-number">${money(remaining)}</td><td>${statusBadge(remaining ? 'Due' : 'Paid')}</td><td>${remaining ? `<button class="row-action" data-action="pay-fine" data-id="${esc(fine.id)}" aria-label="Record fine payment">↙</button>` : ''}</td></tr>`;
    }).join('') || '<tr><td colspan="8">No fines match this filter.</td></tr>';
  }

  function renderLedger() {
    const search = $('#ledgerSearch').value.toLowerCase();
    const type = $('#transactionTypeFilter').value;
    const method = $('#paymentMethodFilter').value;
    const rows = [...state.transactions].sort((a, b) => b.date.localeCompare(a.date)).filter(tx => {
      const member = getMember(tx.memberId);
      return (type === 'all' || tx.type === type) && (method === 'all' || tx.method === method) && (!search || `${tx.type} ${tx.reference} ${tx.note} ${member?.name || 'Group'}`.toLowerCase().includes(search));
    });
    $('#ledgerTable').innerHTML = rows.map(tx => `<tr><td>${transactionLabel(tx)}</td><td>${memberCell(getMember(tx.memberId))}</td><td><span class="member-id">${esc(tx.reference)}</span></td><td>${methodLabel(tx.method)}</td><td><span class="recorded-by">${esc(tx.recordedBy)}</span></td><td>${dateText(tx.date)}</td><td class="${amountClass(tx.type)}">${tx.type === 'Fine assessed' ? '' : isPositive(tx.type) ? '+' : '−'}${money(tx.amount)}</td></tr>`).join('') || '<tr><td colspan="7">No transactions match those filters.</td></tr>';
    $('#ledgerFooterCount').textContent = `${rows.length} transaction${rows.length === 1 ? '' : 's'}`;
  }

  function renderAll() {
    state.fines ||= [];
    state.welfareGrants ||= [];
    state.meetings ||= [];
    if (state.group.name === 'Umoja Investment Group') state.group.name = 'Kikundi cha Uwekezaji Umoja';
    if (state.group.description === 'Member savings, lending and long-term investment.') state.group.description = 'Akiba, mikopo na uwekezaji wa wanachama.';
    if (state.group.cycleName === 'Umoja long-term cycle') state.group.cycleName = 'Mzunguko wa muda mrefu wa Umoja';
    if (state.group.plans.find(plan => plan.id === 'PL-1' && plan.name === 'Monthly share')) state.group.plans.find(plan => plan.id === 'PL-1').name = 'Hisa za kila mwezi';
    if (state.group.plans.find(plan => plan.id === 'PL-2' && plan.name === 'Group running fee')) state.group.plans.find(plan => plan.id === 'PL-2').name = 'Ada ya uendeshaji wa kikundi';
    state.members.forEach(member => {
      member.paidPeriods ||= {};
      if (member.paidThisMonth && duePlan()) member.paidPeriods[duePlan().id] = scheduleFor(duePlan()).key;
      delete member.paidThisMonth;
    });
    $('#sidebarGroupName').textContent = state.group.name;
    $('#sidebarGroupType').textContent = state.group.type;
    $('#breadcrumbGroup').textContent = state.group.name;
    const gWords = (state.group.name || '').split(/\s+/).filter(w => !['cha', 'ya', 'wa', 'la', 'za', 'na', 'of', 'and', 'the'].includes(w.toLowerCase()));
    $('#groupSwitcher .group-avatar').textContent = /umoja/i.test(state.group.name) ? 'UM' : (gWords.length >= 2 ? (gWords[0][0] + gWords[gWords.length - 1][0]).toUpperCase() : 'CH');
    renderDashboard(); renderMembers(); renderContributions(); renderLoans(); renderFines(); renderLedger();
    renderMeeting(); renderWelfare();
    window.ChamaI18n?.apply();
  }

  function setView(view) {
    $$('.view').forEach(section => section.classList.toggle('active', section.id === `view-${view}`));
    $$('.nav-item[data-view]').forEach(button => {
      const active = button.dataset.view === view;
      button.classList.toggle('active', active);
      if (active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    $$('.mobile-nav-btn[data-view]').forEach(button => {
      button.classList.toggle('active', button.dataset.view === view);
    });
    const label = ({ dashboard: 'Overview', meeting: 'Kikao cha Leo', members: 'Members', contributions: 'Contributions', loans: 'Loans', welfare: 'Mfuko wa Jamii', fines: 'Fines', shareout: 'Cycle & share-out', ledger: 'Transactions' })[view] || 'Overview';
    $('#breadcrumbPage').textContent = label;
    $('#sidebar').classList.remove('open');
    $('#mobileScrim').classList.remove('show');
    $('.search-wrap').classList.remove('search-open');
    updateMenuControls();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view === 'meeting') renderMeeting();
    if (view === 'welfare') renderWelfare();
    window.ChamaI18n?.apply();
  }

  function updateMenuControls() {
    const isHidden = document.body.classList.contains('sidebar-hidden');
    const isOpenOnMobile = $('#sidebar').classList.contains('open');
    const desktopLabel = isHidden ? 'Show menu' : 'Hide menu';
    const mobileLabel = isOpenOnMobile ? 'Close navigation' : 'Open navigation';
    $('#sidebarToggle').setAttribute('aria-expanded', String(!isHidden));
    $('#sidebarToggle').setAttribute('aria-label', window.ChamaI18n?.translate(desktopLabel) || desktopLabel);
    $('#mobileMenu').setAttribute('aria-expanded', String(isOpenOnMobile));
    $('#mobileMenu').setAttribute('aria-label', window.ChamaI18n?.translate(mobileLabel) || mobileLabel);
  }

  const modal = $('#appModal');
  function openModal(title, eyebrow, body) {
    modal.dataset.panel = '';
    $('#modalTitle').textContent = title;
    $('#modalEyebrow').textContent = eyebrow;
    $('#modalContent').innerHTML = body;
    if (!modal.open) modal.showModal();
    window.ChamaI18n?.apply();
  }
  function dataSafetyForm() {
    const lang = window.ChamaI18n?.lang === 'en' ? 'en' : 'sw';
    const attention = stateRecoveryNeeded || storageReadIssue || saveFailure;
    const title = lang === 'sw' ? 'Data na nakala' : 'Data and backups';
    const statusTitle = stateRecoveryNeeded
      ? (lang === 'sw' ? 'Data ya zamani haijasomeka' : 'The saved data could not be read')
      : storageReadIssue
        ? (lang === 'sw' ? 'Kivinjari kimezuia kuhifadhi' : 'Browser storage is blocked')
        : saveFailure
          ? (lang === 'sw' ? 'Mabadiliko hayajahifadhiwa' : 'Changes were not saved')
          : (lang === 'sw' ? 'Hali ya data' : 'Data status');
    const statusText = stateRecoveryNeeded
      ? (lang === 'sw' ? 'Data ya zamani bado ipo kwenye kivinjari. Haijafutwa wala kubadilishwa. Rejesha nakala inayojulikana kuwa sahihi ili kuendelea kuhifadhi.' : 'The old value is still in this browser. It has not been deleted or replaced. Restore a known-good backup to resume saving.')
      : storageReadIssue || saveFailure
        ? (lang === 'sw' ? 'Kivinjari hakikukubali kuhifadhi mabadiliko. Pakua nakala ya taarifa zinazoonekana sasa, kisha kagua ruhusa na nafasi ya kivinjari.' : 'The browser could not save your changes. Download a backup of the data currently shown, then check browser permissions and available space.')
        : (lang === 'sw' ? 'Data yako iko kwenye kivinjari hiki tu. Haionekani kwenye kifaa kingine.' : 'Your data is stored in this browser only. It is not shared with another device.');
    const savedLabel = stateRecoveryNeeded
      ? (lang === 'sw' ? 'Haiwezi kusomwa' : 'Cannot be read')
      : storageReadIssue || saveFailure
        ? (lang === 'sw' ? 'Haijahifadhiwa' : 'Not saved')
        : stateLoadedFromStorage
          ? (lang === 'sw' ? 'Imehifadhiwa hapa' : 'Saved here')
          : (lang === 'sw' ? 'Data ya mfano' : 'Sample data');
    const backupTime = state.lastBackupAt ? new Date(state.lastBackupAt) : null;
    const backupValue = backupTime && !Number.isNaN(backupTime.getTime())
      ? new Intl.DateTimeFormat(lang === 'sw' ? 'sw-TZ' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(backupTime)
      : (lang === 'sw' ? 'Bado haijapakuliwa' : 'Not downloaded yet');
    const savedDate = lastSavedAt && !Number.isNaN(lastSavedAt.getTime())
      ? new Intl.DateTimeFormat(lang === 'sw' ? 'sw-TZ' : 'en-GB', { timeStyle: 'short' }).format(lastSavedAt)
      : (lang === 'sw' ? 'Muda haujarekodiwa' : 'Time not recorded');
    const recordSummary = stateRecoveryNeeded || storageReadIssue
      ? `<p class="data-safety-footnote">${lang === 'sw' ? 'Taarifa zinazoonekana sasa ni za mfano. Hatuwezi kuthibitisha idadi au hali ya rekodi zako za zamani.' : 'The records currently shown are sample data. We cannot confirm the number or condition of your previous records.'}</p>`
      : `<div class="data-safety-stats"><div class="data-safety-stat"><span>${lang === 'sw' ? 'Wanachama' : 'Members'}</span><strong>${state.members.length}</strong></div><div class="data-safety-stat"><span>${lang === 'sw' ? 'Miamala' : 'Transactions'}</span><strong>${state.transactions.length}</strong></div></div>`;
    const backupButtonText = stateRecoveryNeeded
      ? (lang === 'sw' ? 'Pakua data ya kurejesha' : 'Download recovery data')
      : (lang === 'sw' ? 'Pakua nakala kamili' : 'Download full backup');
    openModal(title, lang === 'sw' ? 'UTUNZAJI WA TAARIFA' : 'DATA CARE', `<div class="data-safety">
      <div class="data-safety-callout ${attention ? 'warning' : ''}"><span class="data-safety-icon" aria-hidden="true">${attention ? '!' : '✓'}</span><div class="data-safety-copy"><strong>${statusTitle}</strong><p>${statusText}</p></div></div>
      <div class="data-safety-stats"><div class="data-safety-stat"><span>${lang === 'sw' ? 'Hali ya kuhifadhi' : 'Save status'}</span><strong>${savedLabel}</strong></div><div class="data-safety-stat"><span>${lang === 'sw' ? 'Nakala ya mwisho' : 'Last backup'}</span><strong>${backupValue}</strong></div></div>
      ${recordSummary}
      <p class="data-safety-footnote">${lang === 'sw' ? `Mabadiliko ya mwisho kuhifadhiwa: ${savedDate}. Pakua nakala mara kwa mara. Faili la nakala lina majina, simu na taarifa za fedha; liweke sehemu salama.` : `Last saved: ${savedDate}. Download backups regularly. A backup contains names, phone numbers, and financial records; keep the file private.`}</p>
      <div class="data-safety-callout warning"><span class="data-safety-icon" aria-hidden="true">i</span><div class="data-safety-copy"><strong>${lang === 'sw' ? 'Kumbuka: hii bado ni app ya mfano' : 'Note: this is still a demo app'}</strong><p>${lang === 'sw' ? 'Taarifa ziko kwenye kivinjari hiki tu. Hakuna akaunti, usimbaji wa data, au nakala ya mtandaoni. Usitumie taarifa halisi za kikundi kabla ya kuweka mfumo wa seva wenye ulinzi.' : 'Data stays in this browser. There are no accounts, data encryption, or online backups. Do not use real group records until a protected server system is in place.'}</p></div></div>
      <div class="data-safety-actions"><button class="button button-primary" type="button" data-action="save-state">${lang === 'sw' ? 'Hifadhi sasa' : 'Save now'}</button><button class="button button-outline" type="button" data-action="download-backup">${backupButtonText}</button><button class="button button-outline" type="button" data-action="restore-backup">${lang === 'sw' ? 'Rejesha nakala' : 'Restore a backup'}</button></div>
      <div class="modal-actions"><button class="button button-quiet" type="button" data-action="close-modal">${lang === 'sw' ? 'Funga' : 'Close'}</button></div>
    </div>`);
    modal.dataset.panel = 'data-safety';
  }
  const modalActions = cancelText => `<div class="modal-actions"><button class="button button-quiet" type="button" data-action="close-modal">${cancelText || 'Cancel'}</button><button class="button button-primary" type="submit">Save record</button></div>`;
  const memberOptions = selected => state.members.filter(member => member.status === 'Active').map(member => `<option value="${esc(member.id)}" ${selected === member.id ? 'selected' : ''}>${esc(member.name)} · ${esc(member.id)}</option>`).join('');
  const methodOptions = selected => ['M-Pesa', 'Airtel Money', 'Mixx', 'Cash', 'Bank', 'Other'].map(method => `<option value="${method}" ${selected === method ? 'selected' : ''}>${method}</option>`).join('');

  function paymentForm(memberId) {
    const selectedPlan = state.group.plans.find(item => item.id === selectedContributionPlanId) || duePlan();
    const selected = memberId || dueMembers(selectedPlan)[0]?.id || state.members.find(member => selectedPlan && contributionPaidAmount(member, selectedPlan) < selectedPlan.amount)?.id || state.members[0]?.id;
    const plan = state.group.plans.find(item => item.id === selectedContributionPlanId) || duePlan();
    const currentMember = getMember(selected);
    const remaining = Math.max(0, Number(plan?.amount || 0) - contributionPaidAmount(currentMember, plan));
    openModal('Record a contribution', 'MEMBER PAYMENT', `<form id="paymentForm"><div class="modal-info">${window.ChamaI18n?.lang === 'en' ? 'Choose which fund receives this payment. You can record part of the amount and add another payment later.' : 'Chagua mfuko wa kuweka malipo haya. Unaweza kulipa sehemu na kurekodi salio baadaye.'}</div><div class="form-grid"><div class="field full"><label for="paymentMember">Member</label><select name="memberId" id="paymentMember" required>${memberOptions(selected)}</select></div><div class="field"><label for="paymentFund">Contribution plan</label><select name="planId" id="paymentFund">${state.group.plans.map(item => `<option value="${esc(item.id)}" data-amount="${item.amount}" ${item.id === plan?.id ? 'selected' : ''}>${esc(item.name)} — ${esc(item.cadence)} · ${esc(item.type)}</option>`).join('')}</select></div><div class="field"><label for="paymentAmount">Amount (TSh)</label><input id="paymentAmount" name="amount" type="number" min="1" step="1000" max="${remaining}" value="${remaining}" required><small class="field-hint" id="paymentRemainingHint">${window.ChamaI18n?.lang === 'en' ? 'Remaining for this period:' : 'Salio la kipindi hiki:'} ${money(remaining)}</small></div><div class="field"><label for="paymentMethod">Payment method</label><select id="paymentMethod" name="method">${methodOptions('M-Pesa')}</select></div><div class="field"><label for="paymentDate">Date</label><input id="paymentDate" name="date" type="date" value="${isoToday()}" max="${isoToday()}" required></div><div class="field full"><label for="paymentReference">Reference / note</label><input id="paymentReference" name="reference" placeholder="e.g. M-Pesa transaction code"></div></div>${modalActions('Cancel')}</form>`);
    const refreshRemainder = () => {
      const currentPlan = state.group.plans.find(item => item.id === $('#paymentFund').value);
      const currentMember = getMember($('#paymentMember').value);
      const dateValue = $('#paymentDate').value || isoToday();
      const left = Math.max(0, Number(currentPlan?.amount || 0) - contributionPaidAmount(currentMember, currentPlan, new Date(`${dateValue}T12:00:00`)));
      $('#paymentAmount').max = String(left);
      $('#paymentAmount').value = left > 0 ? String(left) : '';
      $('#paymentForm button[type="submit"]').disabled = left <= 0;
      $('#paymentRemainingHint').textContent = `${window.ChamaI18n?.lang === 'en' ? 'Remaining for this period:' : 'Salio la kipindi hiki:'} ${money(left)}`;
    };
    $('#paymentFund').addEventListener('change', refreshRemainder);
    $('#paymentMember').addEventListener('change', refreshRemainder);
    $('#paymentDate').addEventListener('change', refreshRemainder);
    refreshRemainder();
  }
  function addMemberForm() {
    openModal('Add a group member', 'MEMBER RECORD', `<form id="memberForm"><div class="form-grid"><div class="field full"><label for="newMemberName">Full name</label><input id="newMemberName" name="name" placeholder="Member name" required></div><div class="field"><label for="newMemberPhone">Phone number</label><input id="newMemberPhone" name="phone" placeholder="07xx xxx xxx"></div><div class="field"><label for="newMemberJoined">Date joined</label><input id="newMemberJoined" name="joined" type="date" value="${isoToday()}" required></div><div class="field"><label for="newMemberCapital">Opening capital (TSh)</label><input id="newMemberCapital" name="capital" type="number" min="0" step="1000" value="0"></div><div class="field"><label for="newMemberStatus">Status</label><select id="newMemberStatus" name="status"><option value="Active">Active</option><option value="Paused">Paused</option></select></div></div>${modalActions()}</form>`);
  }
  function editMemberForm(memberId) {
    const member = getMember(memberId);
    if (!member) return;
    openModal('Edit member details', 'MEMBER RECORD', `<form id="editMemberForm" data-id="${esc(member.id)}"><div class="modal-info">Member ID stays fixed so financial history keeps its link to this person.</div><div class="form-grid"><div class="field full"><label for="editMemberName">Full name</label><input id="editMemberName" name="name" value="${esc(member.name)}" required></div><div class="field"><label for="editMemberPhone">Phone number</label><input id="editMemberPhone" name="phone" value="${esc(member.phone)}"></div><div class="field"><label for="editMemberJoined">Date joined</label><input id="editMemberJoined" name="joined" type="date" value="${esc(member.joined)}" required></div><div class="field full"><label for="editMemberStatus">Status</label><select id="editMemberStatus" name="status"><option value="Active" ${member.status === 'Active' ? 'selected' : ''}>Active</option><option value="Paused" ${member.status === 'Paused' ? 'selected' : ''}>Paused</option></select></div></div>${modalActions()}</form>`);
  }
  function newLoanForm(memberId) {
    const rate = Number(state.group.rate) || 0;
    const active = activeMembers();
    const borrowerId = memberId || active[0]?.id;
    const potentialGuarantors = active.filter(m => m.id !== borrowerId);

    const guarantorOptions = selectedId => potentialGuarantors.map(m =>
      `<option value="${esc(m.id)}" ${m.id === selectedId ? 'selected' : ''}>${esc(m.name)} (Hisa: ${money(m.capital)})</option>`
    ).join('');

    openModal('Toa Mkopo wa Kikundi (Chama Loan)', 'IDHINI YA MKOPO & WADHAMINI', `<form id="loanForm"><div class="modal-info">Mikopo ya VICOBA/Chama inahitaji wadhamini wawili (2) wenye hisa za kutosha ndani ya kikundi ili kuweka usalama wa fedha.</div><div class="form-grid"><div class="field full"><label for="loanMember">Mkopaji (Borrower)</label><select id="loanMember" name="memberId" required>${memberOptions(borrowerId)}</select></div><div class="field"><label for="loanPrincipal">Kiasi cha Mkopo (TSh)</label><input id="loanPrincipal" name="principal" type="number" min="1000" step="1000" placeholder="500000" required></div><div class="field"><label for="loanTerm">Muda wa Mkopo (Miezi)</label><input id="loanTerm" name="term" type="number" min="1" max="120" value="6" required></div><div class="field"><label for="loanRate">Riba ya Mwaka (%)</label><input id="loanRate" name="rate" type="number" min="0" max="100" step="0.1" value="${rate}" required></div><div class="field"><label for="loanDue">Tarehe ya Marejesho ya Kwanza</label><input id="loanDue" name="due" type="date" value="${dateAfterDays(30)}" required></div><div class="field"><label for="loanMethod">Njia ya Kutoa Fedha</label><select id="loanMethod" name="method">${methodOptions('M-Pesa')}</select></div><div class="field full guarantor-card-wrap"><label style="font-weight:700;color:var(--pine);">👥 Wadhamini wa Mkopo (Loan Guarantors)</label><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:6px;"><div><label for="loanGuarantor1" style="font-size:11px;">Mdhamini wa 1</label><select id="loanGuarantor1" name="guarantor1Id" required><option value="">-- Chagua Mdhamini 1 --</option>${guarantorOptions(potentialGuarantors[0]?.id)}</select></div><div><label for="loanGuarantor2" style="font-size:11px;">Mdhamini wa 2</label><select id="loanGuarantor2" name="guarantor2Id" required><option value="">-- Chagua Mdhamini 2 --</option>${guarantorOptions(potentialGuarantors[1]?.id)}</select></div></div><small class="field-hint">Wadhamini lazima wawe wanachama wawili tofauti wenye hisa hai.</small></div><div class="field full"><label for="loanNote">Kumbukumbu ya Idhini ya Kikao</label><input id="loanNote" name="note" placeholder="Mfano: Kikao cha idhini namba #12"></div></div>${modalActions('Cancel')}</form>`);
  }
  function repaymentForm(loanId) {
    const loan = state.loans.find(item => item.id === loanId);
    if (!loan) return;
    const due = loanRemaining(loan);
    openModal('Record a loan repayment', 'LOAN COLLECTION', `<form id="repaymentForm" data-loan="${esc(loan.id)}"><div class="modal-info">${esc(getMember(loan.memberId)?.name || 'Member')} · ${esc(loan.id)} · ${money(due)} total remaining. Repayment is applied to interest first, then to principal.</div><div class="form-grid"><div class="field"><label for="repayAmount">Amount received (TSh)</label><input id="repayAmount" name="amount" type="number" min="1" max="${due}" step="1000" value="${Math.min(due, 100000)}" required></div><div class="field"><label for="repayMethod">Payment method</label><select id="repayMethod" name="method">${methodOptions('M-Pesa')}</select></div><div class="field"><label for="repayDate">Date</label><input id="repayDate" name="date" type="date" value="${isoToday()}" required></div><div class="field"><label for="repayReference">Reference</label><input id="repayReference" name="reference" placeholder="Receipt / transaction ID"></div></div>${modalActions('Cancel')}</form>`);
  }
  function expenseForm() {
    openModal('Record a group expense', 'CASH OUT', `<form id="expenseForm"><div class="form-grid"><div class="field full"><label for="expenseReason">Expense description</label><input id="expenseReason" name="note" placeholder="e.g. Meeting venue" required></div><div class="field"><label for="expenseCategory">Category</label><select id="expenseCategory" name="category"><option value="Meeting">Meeting</option><option value="Transport">Transport</option><option value="Food">Food</option><option value="Administration">Administration</option><option value="Emergency">Emergency</option><option value="Other">Other</option></select></div><div class="field"><label for="expenseAmount">Amount (TSh)</label><input id="expenseAmount" name="amount" type="number" min="1" step="1000" required></div><div class="field"><label for="expenseMethod">Paid by</label><select id="expenseMethod" name="method">${methodOptions('Cash')}</select></div><div class="field"><label for="expenseDate">Date</label><input id="expenseDate" name="date" type="date" value="${isoToday()}" required></div><div class="field full"><label for="expenseReference">Receipt / note</label><input id="expenseReference" name="reference" placeholder="Optional receipt reference"></div></div>${modalActions()}</form>`);
  }
  function fineForm(memberId) {
    openModal('Record a group fine', 'FINE ASSESSMENT', `<form id="fineForm"><div class="modal-info">Recording an assessed fine does not move cash. Use “Record payment” when a member pays it.</div><div class="form-grid"><div class="field full"><label for="fineMember">Member</label><select id="fineMember" name="memberId" required>${memberOptions(memberId)}</select></div><div class="field"><label for="fineAmount">Fine amount (TSh)</label><input id="fineAmount" name="amount" type="number" min="1" step="1000" required></div><div class="field"><label for="fineDate">Date assessed</label><input id="fineDate" name="date" type="date" value="${isoToday()}" required></div><div class="field full"><label for="fineReason">Reason under group rules</label><input id="fineReason" name="reason" placeholder="e.g. Missed group meeting" required></div></div>${modalActions()}</form>`);
  }
  function finePaymentForm(fineId) {
    const fine = state.fines.find(item => item.id === fineId);
    if (!fine) return;
    const remaining = fine.amount - fine.paid;
    openModal('Record a fine payment', 'FINE COLLECTION', `<form id="finePaymentForm" data-id="${esc(fine.id)}"><div class="modal-info">${esc(getMember(fine.memberId)?.name || 'Member')} · ${esc(fine.reason)} · ${money(remaining)} still due.</div><div class="form-grid"><div class="field"><label for="finePaymentAmount">Amount received (TSh)</label><input id="finePaymentAmount" name="amount" type="number" min="1" max="${remaining}" step="1000" value="${remaining}" required></div><div class="field"><label for="finePaymentMethod">Payment method</label><select id="finePaymentMethod" name="method">${methodOptions('Cash')}</select></div><div class="field"><label for="finePaymentDate">Date</label><input id="finePaymentDate" name="date" type="date" value="${isoToday()}" required></div><div class="field"><label for="finePaymentReference">Reference</label><input id="finePaymentReference" name="reference" placeholder="Optional receipt / transaction ID"></div></div>${modalActions()}</form>`);
  }
  function addPlanForm() {
    openModal('Add a contribution plan', 'GROUP RULES', `<form id="planForm"><div class="modal-info">Set a schedule that fits this group. Expected dues and payment status are shown for the current schedule period.</div><div class="form-grid"><div class="field full"><label for="planName">Plan name</label><input id="planName" name="name" placeholder="e.g. Emergency fund" required></div><div class="field"><label for="planType">Fund type</label><select id="planType" name="type"><option value="Member capital">Member capital</option><option value="Operating fee">Operating fee</option><option value="Welfare fund">Welfare fund</option><option value="Other contribution">Other contribution</option></select></div><div class="field"><label for="planAmount">Amount (TSh)</label><input id="planAmount" name="amount" type="number" min="1" step="1000" required></div><div class="field"><label for="planCadence">How often?</label><select id="planCadence" name="cadence"><option value="Weekly">Weekly</option><option value="Biweekly">Biweekly</option><option value="Monthly" selected>Monthly</option><option value="Quarterly">Quarterly</option><option value="Annually">Annually</option><option value="Custom">Custom</option><option value="One-off">One-off</option></select></div><div class="field"><label for="planStart">Schedule starts</label><input id="planStart" name="startDate" type="date" value="${isoToday()}" required></div><div class="field full"><label for="planInterval">Custom interval (days)</label><input id="planInterval" name="intervalDays" type="number" min="1" value="30"><small class="field-hint">Used only when Custom is selected.</small></div></div>${modalActions()}</form>`);
  }
  function cycleSettingsForm() {
    const distribution = state.group.distribution;
    const operatorMode = state.group.operatorMode || 'single';
    const officials = state.group.officials || [
      { role: 'Mweka Hazina', name: 'Asha M.', phone: '0712000001' },
      { role: 'Mwenyekiti', name: 'Juma K.', phone: '0754000002' },
      { role: 'Katibu', name: 'Zainab S.', phone: '0784000003' }
    ];

    openModal('Mipangilio ya Kikundi na Mzunguko', 'SANIDI MFUMO HUU', `<form id="settingsForm"><div class="modal-info">Sanidi mfumo huu kwa VICOBA, Upatu, au Kikundi cha Akiba. Chagua kama mfumo utaendeshwa na mtu mmoja pekee (Default) au viongozi watatu.</div><div class="form-grid"><div class="field full"><label for="groupName">Jina la Kikundi</label><input id="groupName" name="name" value="${esc(state.group.name)}" required></div><div class="field"><label for="groupType">Aina ya Kikundi</label><select id="groupType" name="type">${['Chama cha Hisa / VICOBA', 'VICOBA', 'Upatu', 'Kikundi cha Akiba', 'Investment group', 'Workplace group', 'Family / community group', 'SACCO'].map(type => `<option value="${esc(type)}" ${state.group.type === type ? 'selected' : ''}>${esc(type)}</option>`).join('')}</select></div><div class="field"><label for="groupPhone">Simu ya Kikundi</label><input id="groupPhone" name="phone" value="${esc(state.group.phone || '')}" placeholder="+255 ..."></div><div class="field"><label for="groupLocation">Mahali Kilipo</label><input id="groupLocation" name="location" value="${esc(state.group.location || '')}" placeholder="Dar es Salaam, Tanzania"></div><div class="field"><label for="groupEstablished">Tarehe Kilipoanzishwa</label><input id="groupEstablished" name="established" type="date" value="${esc(state.group.established || state.group.start)}"></div><div class="field full guarantor-card-wrap"><label style="font-weight:700;color:var(--pine);">⚙️ Mtindo wa Uendeshaji (Operator Mode)</label><select id="operatorMode" name="operatorMode" style="margin-top:6px;"><option value="single" ${operatorMode === 'single' ? 'selected' : ''}>Msimamizi Mmoja tu (Single Operator - DEFAULT: Mweka Hazina anaingiza kila kitu moja kwa moja)</option><option value="multi" ${operatorMode === 'multi' ? 'selected' : ''}>Idhini ya Viongozi Watatu (Multi-Officer: Mweka Hazina, Mwenyekiti na Katibu)</option></select><small class="field-hint">Katika hali ya kawaida, mtu mmoja anarekodi bila vikwazo vya kusubiri idhini za wengine mkutanoni.</small><div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:8px;margin-top:10px;"><div><label style="font-size:10px;">Mweka Hazina (Jina)</label><input id="officialTreasurer" name="officialTreasurer" value="${esc(officials[0]?.name || 'Asha M.')}" style="min-height:36px;font-size:12px;"></div><div><label style="font-size:10px;">Mwenyekiti (Jina)</label><input id="officialChair" name="officialChair" value="${esc(officials[1]?.name || 'Juma K.')}" style="min-height:36px;font-size:12px;"></div><div><label style="font-size:10px;">Katibu (Jina)</label><input id="officialSecretary" name="officialSecretary" value="${esc(officials[2]?.name || 'Zainab S.')}" style="min-height:36px;font-size:12px;"></div></div></div><div class="field full"><label for="groupDescription">Maelezo ya Kikundi</label><textarea id="groupDescription" name="description" placeholder="Kikundi hiki kinafanya nini?">${esc(state.group.description || '')}</textarea></div><div class="field full"><label for="cycleName">Jina la Mzunguko</label><input id="cycleName" name="cycleName" value="${esc(state.group.cycleName)}" required></div><div class="field"><label for="cycleStart">Mzunguko Unaanza</label><input id="cycleStart" name="start" type="date" value="${state.group.start}" required></div><div class="field"><label for="cycleEnd">Tarehe ya Mgao</label><input id="cycleEnd" name="end" type="date" value="${state.group.end}" required></div><div class="field"><label for="annualRate">Riba ya Mkopo kwa Mwaka (%)</label><input id="annualRate" name="rate" type="number" min="0" max="100" step="0.1" value="${state.group.rate}" required></div><div class="field"><label for="reservePercent">Akiba ya Dharura / Reserve (%)</label><input id="reservePercent" name="reservePercent" type="number" min="0" max="100" step="1" value="${state.group.reservePercent}" required></div><div class="field full"><label for="distribution">Kanuni ya Gawio</label><select id="distribution" name="distribution"><option value="pro-rata" ${distribution === 'pro-rata' ? 'selected' : ''}>Pro rata: Kwa uwiano wa hisa zilizolipwa</option><option value="equal" ${distribution === 'equal' ? 'selected' : ''}>Sawa: Kiasi sawa kwa kila mwanachama hai</option><option value="capitalPlusEqual" ${distribution === 'capitalPlusEqual' ? 'selected' : ''}>Mchanganyiko: Uwiano wa hisa + zawadi sawa</option></select></div></div>${modalActions('Cancel')}</form>`);
  }
  function shareoutPreview() {
    const total = Math.max(0, state.cash + principalOutstanding() - (state.cash + principalOutstanding()) * (Number(state.group.reservePercent) || 0) / 100);
    const capital = totalCapital() || 1;
    const distributionLabels = { 'pro-rata': 'Pro rata by paid-up capital', equal: 'Equal across active members', capitalPlusEqual: 'Capital-weighted with equal bonus' };
    const list = activeMembers().sort((a, b) => b.capital - a.capital).map(member => {
      const share = state.group.distribution === 'equal' ? 1 / Math.max(1, activeMembers().length) : member.capital / capital;
      const adjusted = state.group.distribution === 'capitalPlusEqual' ? share * .9 + .1 / Math.max(1, activeMembers().length) : share;
      return `<div class="preview-row"><span>${esc(member.name)} · ${(adjusted * 100).toFixed(1)}%</span><strong>${money(total * adjusted)}</strong></div>`;
    }).join('');
    openModal('Illustrative share-out preview', 'PLANNING ESTIMATE', `<div class="modal-info">This is a projection under “${distributionLabels[state.group.distribution]}”. It assumes outstanding loan principal is recovered. It is not a member resolution, approved payout, or promise of return.</div><div class="preview-breakdown"><div><span>Cash available now</span><strong>${money(state.cash)}</strong></div><div><span>Loan principal outstanding</span><strong>${money(principalOutstanding())}</strong></div><div><span>Planning reserve (${Number(state.group.reservePercent) || 0}%)</span><strong>− ${money((state.cash + principalOutstanding()) * (Number(state.group.reservePercent) || 0) / 100)}</strong></div><div><span>Illustrative amount for distribution</span><strong>${money(total)}</strong></div></div><div class="preview-list">${list}</div><div class="modal-actions"><button class="button button-primary" type="button" data-action="close-modal">Done</button></div>`);
  }
  function importMembersForm() {
    importFile = null; importHeaders = []; importRows = []; importMapping = {};
    openModal('Import members from a spreadsheet', 'STEP 1 OF 4 · UPLOAD', `<div class="modal-info">Import safely: upload, match columns, review duplicates and missing names, then confirm. Supported formats: CSV and Excel .xlsx.</div><div class="field"><label for="memberCsv">Spreadsheet file</label><input type="file" id="memberCsv" accept=".csv,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"><small class="field-hint">Expected header example: Member Name, Phone Number, Contribution, Loan Balance, Fine Balance</small></div><div id="importFeedback" class="field-hint" style="margin-top:12px"></div><div class="modal-actions"><button class="button button-quiet" type="button" data-action="download-template">Download template</button><button class="button button-quiet" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" id="previewImportButton" type="button" disabled>Review rows</button></div>`);
  }
  const importFields = [
    { key: 'name', label: 'Member name', aliases: ['name', 'member name', 'full name', 'jina', 'jina la mwanachama'] },
    { key: 'phone', label: 'Phone number', aliases: ['phone', 'phone number', 'mobile', 'simu', 'namba ya simu'] },
    { key: 'memberId', label: 'Member ID', aliases: ['member id', 'id', 'namba ya mwanachama'] },
    { key: 'joined', label: 'Date joined', aliases: ['date joined', 'joined', 'tarehe ya kujiunga'] },
    { key: 'capital', label: 'Contribution / capital', aliases: ['contribution', 'capital', 'mchango', 'shares'] },
    { key: 'loanBalance', label: 'Loan balance', aliases: ['loan balance', 'loan', 'deni', 'mkopo'] },
    { key: 'fineBalance', label: 'Fine balance', aliases: ['fine balance', 'fine', 'faini'] },
    { key: 'status', label: 'Status', aliases: ['status', 'hali'] }
  ];
  function parseCSV(text) {
    const rows = []; let row = []; let cell = ''; let quoted = false;
    const input = text.replace(/^\uFEFF/, '');
    for (let index = 0; index < input.length; index++) {
      const char = input[index];
      if (char === '"') {
        if (quoted && input[index + 1] === '"') { cell += '"'; index++; }
        else quoted = !quoted;
      } else if (char === ',' && !quoted) { row.push(cell.trim()); cell = ''; }
      else if ((char === '\n' || char === '\r') && !quoted) {
        if (char === '\r' && input[index + 1] === '\n') index++;
        row.push(cell.trim()); cell = '';
        if (row.some(value => value !== '')) rows.push(row);
        row = [];
      } else cell += char;
    }
    if (cell || row.length) { row.push(cell.trim()); if (row.some(value => value !== '')) rows.push(row); }
    return rows;
  }
  async function parseXlsx(file) {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer); const view = new DataView(buffer);
    let endRecord = -1;
    for (let offset = Math.max(0, bytes.length - 65_558); offset <= bytes.length - 22; offset++) {
      if (view.getUint32(offset, true) === 0x06054b50) endRecord = offset;
    }
    if (endRecord < 0) throw new Error('This does not look like a valid .xlsx workbook.');
    const entries = new Map();
    let pointer = view.getUint32(endRecord + 16, true);
    const count = view.getUint16(endRecord + 10, true);
    const decoder = new TextDecoder();
    for (let index = 0; index < count; index++) {
      if (view.getUint32(pointer, true) !== 0x02014b50) break;
      const method = view.getUint16(pointer + 10, true);
      const compressedSize = view.getUint32(pointer + 20, true);
      const nameLength = view.getUint16(pointer + 28, true);
      const extraLength = view.getUint16(pointer + 30, true);
      const commentLength = view.getUint16(pointer + 32, true);
      const localOffset = view.getUint32(pointer + 42, true);
      const name = decoder.decode(bytes.slice(pointer + 46, pointer + 46 + nameLength));
      entries.set(name, { method, compressedSize, localOffset });
      pointer += 46 + nameLength + extraLength + commentLength;
    }
    const readEntry = async name => {
      const entry = entries.get(name);
      if (!entry) return '';
      const local = entry.localOffset;
      const nameLength = view.getUint16(local + 26, true);
      const extraLength = view.getUint16(local + 28, true);
      const start = local + 30 + nameLength + extraLength;
      const compressed = bytes.slice(start, start + entry.compressedSize);
      if (entry.method === 0) return decoder.decode(compressed);
      if (entry.method !== 8 || typeof DecompressionStream === 'undefined') throw new Error('This browser cannot unpack the Excel file. Save it as CSV and try again.');
      const stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
      return decoder.decode(await new Response(stream).arrayBuffer());
    };
    const normalizePath = path => {
      const parts = [];
      for (const part of path.split('/')) { if (!part || part === '.') continue; if (part === '..') parts.pop(); else parts.push(part); }
      return parts.join('/');
    };
    const parseXml = content => {
      const document = new DOMParser().parseFromString(content, 'application/xml');
      if (document.querySelector('parsererror')) throw new Error('Could not read an Excel workbook sheet.');
      return document;
    };
    const workbook = parseXml(await readEntry('xl/workbook.xml'));
    const relations = parseXml(await readEntry('xl/_rels/workbook.xml.rels'));
    const firstSheet = workbook.getElementsByTagNameNS('*', 'sheet')[0];
    if (!firstSheet) throw new Error('The workbook does not contain a worksheet.');
    const relationshipId = firstSheet.getAttribute('r:id') || firstSheet.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'id');
    const relation = [...relations.getElementsByTagNameNS('*', 'Relationship')].find(item => item.getAttribute('Id') === relationshipId);
    if (!relation) throw new Error('Could not find the first worksheet in this workbook.');
    const target = relation.getAttribute('Target');
    const sheetPath = normalizePath(target.startsWith('/') ? target.slice(1) : target.startsWith('xl/') ? target : `xl/${target}`);
    const sharedXml = entries.has('xl/sharedStrings.xml') ? parseXml(await readEntry('xl/sharedStrings.xml')) : null;
    const shared = sharedXml ? [...sharedXml.getElementsByTagNameNS('*', 'si')].map(item => [...item.getElementsByTagNameNS('*', 't')].map(text => text.textContent).join('')) : [];
    const sheet = parseXml(await readEntry(sheetPath));
    const columnIndex = address => {
      const letters = String(address).match(/^[A-Z]+/i)?.[0]?.toUpperCase() || 'A';
      let result = 0; for (const char of letters) result = result * 26 + char.charCodeAt(0) - 64;
      return result - 1;
    };
    return [...sheet.getElementsByTagNameNS('*', 'row')].map(row => {
      const values = [];
      for (const cell of row.getElementsByTagNameNS('*', 'c')) {
        const index = columnIndex(cell.getAttribute('r'));
        const type = cell.getAttribute('t');
        const inline = cell.getElementsByTagNameNS('*', 'is')[0];
        const value = cell.getElementsByTagNameNS('*', 'v')[0]?.textContent || '';
        values[index] = type === 's' ? (shared[Number(value)] || '') : type === 'inlineStr' && inline ? inline.textContent : value;
      }
      return values.map(value => value ?? '');
    }).filter(row => row.some(value => String(value).trim()));
  }
  function renderImportPreview() {
    const mappingFields = importFields.map(field => {
      const match = importHeaders.findIndex(header => field.aliases.includes(header.trim().toLowerCase()));
      if (importMapping[field.key] === undefined) importMapping[field.key] = match >= 0 ? String(match) : '';
      return `<div class="field"><label for="map-${field.key}">${field.label}${field.key === 'name' ? ' *' : ''}</label><select class="mapping-select" data-map="${field.key}" id="map-${field.key}"><option value="">Skip this field</option>${importHeaders.map((header, index) => `<option value="${index}" ${String(importMapping[field.key]) === String(index) ? 'selected' : ''}>${esc(header || `Column ${index + 1}`)}</option>`).join('')}</select></div>`;
    }).join('');
    const fieldIndex = key => importMapping[key] === '' ? -1 : Number(importMapping[key]);
    const usedNames = new Set(state.members.map(member => member.name.toLowerCase()));
    const usedPhones = new Set(state.members.map(member => (member.phone || '').replace(/\D/g, '')).filter(Boolean));
    const checked = importRows.map(row => {
      const value = key => { const column = fieldIndex(key); return column < 0 ? '' : String(row[column] || '').trim(); };
      const name = value('name'); const phone = value('phone').replace(/\D/g, '');
      const duplicate = Boolean(name && usedNames.has(name.toLowerCase()) || phone && usedPhones.has(phone));
      if (name) usedNames.add(name.toLowerCase()); if (phone) usedPhones.add(phone);
      return { row, name, phone: value('phone'), duplicate, missing: !name, values: Object.fromEntries(importFields.map(field => [field.key, value(field.key)])) };
    });
    const valid = checked.filter(record => record.name && !record.duplicate);
    const duplicateCount = checked.filter(record => record.duplicate).length;
    const missingCount = checked.filter(record => record.missing).length;
    const sampleRows = checked.slice(0, 7).map(record => `<tr><td>${esc(record.name || 'Missing')}</td><td>${esc(record.phone || '—')}</td><td>${record.duplicate ? 'Duplicate' : record.missing ? 'Missing name' : 'Ready'}</td></tr>`).join('');
    $('#modalEyebrow').textContent = 'STEP 2–4 · MATCH, VALIDATE & PREVIEW';
    $('#modalTitle').textContent = 'Review member import';
    $('#modalContent').innerHTML = `<div class="modal-info">${checked.length} rows detected · ${valid.length} ready · ${duplicateCount} duplicates · ${missingCount} missing name. Only ready records will be imported.</div><div class="form-grid">${mappingFields}</div><div class="table-scroll" style="margin-top:14px"><table><thead><tr><th>NAME</th><th>PHONE</th><th>VALIDATION</th></tr></thead><tbody>${sampleRows || '<tr><td colspan="3">No data rows detected.</td></tr>'}</tbody></table></div><div class="modal-actions"><button class="button button-quiet" type="button" data-action="import-back">Choose another file</button><button class="button button-primary" id="confirmMemberImport" type="button" ${valid.length ? '' : 'disabled'}>Confirm import ${valid.length} members</button></div>`;
    $('#confirmMemberImport').dataset.importable = String(valid.length);
  }

  function csvDownload(filename, headers, rows) {
    const csv = [headers, ...rows].map(row => row.map(item => `"${String(item ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }));
    link.download = filename;
    document.body.append(link); link.click(); link.remove(); URL.revokeObjectURL(link.href);
    toast(`${filename} downloaded`);
  }
  function exportMembers() {
    csvDownload('chamabook-members.csv', ['Member ID', 'Name', 'Phone', 'Joined', 'Capital paid', 'Loan principal outstanding', 'Status'], state.members.map(member => [member.id, member.name, member.phone, member.joined, member.capital, memberLoansTotal(member.id), member.status]));
  }
  function exportLoans() {
    csvDownload('chamabook-loans.csv', ['Loan ID', 'Borrower', 'Principal', 'Interest assessed', 'Interest collected', 'Principal remaining', 'Total remaining', 'Status', 'Due date'], state.loans.map(loan => [loan.id, getMember(loan.memberId)?.name || '', loan.original, loan.interest, loan.interestPaid, loan.principalRemaining, loanRemaining(loan), loanStatus(loan), loan.due]));
  }
  function downloadTemplate() {
    csvDownload('chamabook-member-template.csv', ['Member Name', 'Phone Number', 'Member ID', 'Date Joined', 'Contribution', 'Loan Balance', 'Fine Balance', 'Status'], [['Sample Member', '0712345678', 'CB-001', isoToday(), '0', '0', '0', 'Active']]);
  }
  function exportLedger() {
    csvDownload('chamabook-transactions.csv', ['Transaction ID', 'Type', 'Member', 'Amount', 'Method', 'Reference', 'Date', 'Note', 'Contribution plan ID', 'Contribution period', 'Recorded by'], state.transactions.map(tx => [tx.id, tx.type, getMember(tx.memberId)?.name || 'Group', tx.amount, tx.method, tx.reference, tx.date, tx.note, tx.contributionPlanId || '', tx.contributionPeriodKey || '', tx.recordedBy]));
  }
  function downloadJson(filename, payload) {
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url; link.download = filename; document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function downloadBackup() {
    const stamp = isoToday();
    if (stateRecoveryNeeded && unreadableRawState !== null) {
      downloadJson(`chamabook-recovery-${stamp}.json`, { format: 'chamabook-recovery', version: 1, createdAt: new Date().toISOString(), unreadableData: unreadableRawState });
      modal.close();
      toast(window.ChamaI18n?.lang === 'en' ? 'Unreadable browser data was copied to a recovery file.' : 'Data ya zamani imehifadhiwa kwenye faili la kurejesha.');
      return;
    }
    state.lastBackupAt = new Date().toISOString();
    state.lastSavedAt = new Date().toISOString();
    downloadJson(`chamabook-backup-${stamp}.json`, { format: 'chamabook-backup', version: 1, createdAt: state.lastBackupAt, data: state });
    const saved = save();
    modal.close();
    toast(saved
      ? (window.ChamaI18n?.lang === 'en' ? 'Full backup downloaded.' : 'Nakala kamili imepakuliwa.')
      : (window.ChamaI18n?.lang === 'en' ? 'Backup downloaded. Browser storage still needs attention.' : 'Nakala imepakuliwa. Bado kuna tatizo la kuhifadhi kwenye kivinjari.'));
  }
  function saveCurrentState() {
    const persisted = save();
    dataSafetyForm();
    toast(persisted
      ? (window.ChamaI18n?.lang === 'en' ? 'Current records saved on this device.' : 'Taarifa za sasa zimehifadhiwa kwenye kifaa hiki.')
      : stateRecoveryNeeded
        ? (window.ChamaI18n?.lang === 'en' ? 'Saving is paused to protect unreadable data. Restore a valid backup first.' : 'Hifadhi imesitishwa ili kulinda data isiyosomeka. Rejesha nakala sahihi kwanza.')
        : (window.ChamaI18n?.lang === 'en' ? 'The browser could not save these records. Download a backup and check storage space.' : 'Kivinjari hakikuweza kuhifadhi taarifa hizi. Pakua nakala na kagua nafasi ya kivinjari.'));
  }
  function restoreBackup(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      let payload;
      try { payload = JSON.parse(String(reader.result || '')); }
      catch { return toast(window.ChamaI18n?.lang === 'en' ? 'This backup file is not valid JSON.' : 'Faili hili la nakala halijasomeka.'); }
      if (payload?.format !== 'chamabook-backup' || payload?.version !== 1 || !isUsableState(payload.data)) {
        return toast(window.ChamaI18n?.lang === 'en' ? 'This is not a valid ChamaBook backup.' : 'Hii si nakala sahihi ya ChamaBook.');
      }
      const english = window.ChamaI18n?.lang === 'en';
      const approved = window.confirm(english
        ? 'Restoring replaces the records currently in this browser with the selected backup. Continue?'
        : 'Kurejesha nakala kutabadilisha rekodi zilizopo kwenye kivinjari hiki. Uko tayari kuendelea?');
      if (!approved) return;
      try {
        const restored = payload.data;
        restored.lastSavedAt = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(restored));
        state = restored;
        state.fines ||= [];
        stateRecoveryNeeded = false; unreadableRawState = null; storageReadIssue = ''; saveFailure = false;
        stateLoadedFromStorage = true; lastSavedAt = new Date(restored.lastSavedAt);
        modal.close(); renderAll(); updateStorageStatus();
        toast(english ? 'Backup restored and saved on this device.' : 'Nakala imerejeshwa na kuhifadhiwa kwenye kifaa hiki.');
      } catch {
        saveFailure = true; updateStorageStatus();
        toast(english ? 'The browser could not save this backup. Your current screen data was not replaced.' : 'Kivinjari hakikuweza kuhifadhi nakala hii. Taarifa zinazoonekana hazijabadilishwa.');
      }
    };
    reader.onerror = () => toast(window.ChamaI18n?.lang === 'en' ? 'The backup file could not be read.' : 'Faili la nakala halikuweza kusomwa.');
    reader.readAsText(file);
  }

  document.addEventListener('click', event => {
    const viewButton = event.target.closest('[data-view], [data-view-link]');
    if (viewButton) { setView(viewButton.dataset.view || viewButton.dataset.viewLink); return; }
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const id = button.dataset.id;
    switch (button.dataset.action) {
      case 'open-meeting': setView('meeting'); break;
      case 'disburse-welfare': disburseWelfareForm(); break;
      case 'member-receipt': {
        const member = getMember(id);
        if (member) {
          const hisaAmt = Number(meetingHisa[member.id]) || 60000;
          const welfAmt = Number(meetingWelfare[member.id]) || 5000;
          const totalAmt = (meetingAttendance[member.id] !== false ? hisaAmt + welfAmt : 0) + (Number(meetingFines[member.id]) || 0);
          showWhatsAppReceipt({
            member,
            amount: totalAmt > 0 ? totalAmt : hisaAmt,
            type: 'Mchango wa Kikao cha Leo',
            method: meetingMethods[member.id] || 'Cash',
            refCode: `MTG-${member.id}`,
            txDate: isoToday()
          });
        }
        break;
      }
      case 'toggle-attend': {
        const memberId = button.dataset.id;
        const isPresent = button.dataset.val === 'true';
        meetingAttendance[memberId] = isPresent;
        const tr = button.closest('tr');
        if (tr) {
          tr.querySelectorAll('.attendance-opt').forEach(opt => opt.classList.toggle('active', opt.dataset.val === String(isPresent)));
          const hisaInput = tr.querySelector('.input-hisa');
          const welfInput = tr.querySelector('.input-welfare');
          if (hisaInput) hisaInput.disabled = !isPresent;
          if (welfInput) welfInput.disabled = !isPresent;
        }
        calculateMeetingTotals();
        break;
      }
      case 'record-payment': paymentForm(); break;
      case 'pay-member': paymentForm(id); break;
      case 'add-member': addMemberForm(); break;
      case 'edit-member': modal.close(); editMemberForm(id); break;
      case 'member-page': memberPage = Number(button.dataset.page) || 1; renderMembers(); break;
      case 'new-loan': newLoanForm(); break;
      case 'repay-loan': repaymentForm(id); break;
      case 'add-fine': fineForm(); break;
      case 'pay-fine': finePaymentForm(id); break;
      case 'add-expense': expenseForm(); break;
      case 'add-plan': addPlanForm(); break;
      case 'cycle-settings': case 'settings': cycleSettingsForm(); break;
      case 'preview-shareout': shareoutPreview(); break;
      case 'import-members': importMembersForm(); break;
      case 'import-back': importMembersForm(); break;
      case 'export': exportLedger(); break;
      case 'export-members': exportMembers(); break;
      case 'export-loans': exportLoans(); break;
      case 'download-template': downloadTemplate(); break;
      case 'manage-data': dataSafetyForm(); break;
      case 'save-state': saveCurrentState(); break;
      case 'download-backup': downloadBackup(); break;
      case 'restore-backup': $('#backupFilePicker').click(); break;
      case 'close-modal': modal.close(); break;
      case 'member-menu': {
        const member = getMember(id);
        const recentHistory = state.transactions.filter(tx => tx.memberId === id).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
        const historyHtml = recentHistory.map(tx => `<div class="preview-row"><span>${esc(tx.type)} · ${dateText(tx.date)}</span><strong>${money(tx.amount)}</strong></div>`).join('') || '<div class="field-hint" style="padding:10px">No financial history recorded.</div>';
        openModal(esc(member?.name || 'Member actions'), 'MEMBER PROFILE', `<div class="preview-breakdown"><div><span>Member ID</span><strong>${esc(id)}</strong></div><div><span>Capital paid</span><strong>${money(member?.capital || 0)}</strong></div><div><span>Loan balance</span><strong>${money(memberLoansTotal(id))}</strong></div><div><span>Outstanding fines</span><strong>${money(state.fines.filter(fine => fine.memberId === id).reduce((sum, fine) => sum + Math.max(0, fine.amount - fine.paid), 0))}</strong></div></div><div class="preview-list">${historyHtml}</div><div class="modal-actions"><button class="button button-quiet" type="button" data-action="toggle-member" data-id="${esc(id)}">${member?.status === 'Paused' ? 'Reactivate member' : 'Pause member'}</button><button class="button button-quiet" type="button" data-action="edit-member" data-id="${esc(id)}">Edit details</button><button class="button button-primary" type="button" data-action="close-modal">Done</button></div>`);
        break;
      }
      case 'toggle-member': {
        const member = getMember(id);
        if (member) {
          member.status = member.status === 'Paused' ? 'Active' : 'Paused';
          const persisted = save(); modal.close(); renderAll();
          toast(persisted ? `${member.name} is now ${member.status.toLowerCase()}` : (window.ChamaI18n?.lang === 'en' ? 'Changed on screen only; browser storage failed. Download a backup.' : 'Mabadiliko yanaonekana tu, hayajahifadhiwa. Pakua nakala ya data.'));
        }
        break;
      }
    }
  });

  document.addEventListener('submit', event => {
    const form = event.target;
    if (!form.matches('form')) return;
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if (form.id === 'paymentForm') {
      const member = getMember(data.memberId);
      const amount = Number(data.amount);
      const plan = state.group.plans.find(item => item.id === data.planId);
      if (!member || !plan || amount <= 0) return toast('Enter a valid member, plan and amount.');
      const paymentDate = new Date(`${data.date}T12:00:00`);
      const alreadyPaid = contributionPaidAmount(member, plan, paymentDate);
      const remaining = Math.max(0, Number(plan.amount) - alreadyPaid);
      if (remaining <= 0) return toast(window.ChamaI18n?.lang === 'en'
        ? 'This member has already paid this plan for the current period.'
        : 'Mchango wa mpango huu tayari umerekodiwa kwa kipindi hiki.');
      if (amount > remaining) return toast(window.ChamaI18n?.lang === 'en'
        ? `The amount is higher than the remaining ${money(remaining)} for this period.`
        : `Kiasi kimezidi salio la ${money(remaining)} la kipindi hiki.`);
      member.paidPeriods ||= {};
      const periodKey = scheduleFor(plan, paymentDate).key;
      addTransaction({ type: plan.type, amount, memberId: member.id, method: data.method, date: data.date, reference: data.reference || '', note: plan.name, contributionPlanId: plan.id, contributionPeriodKey: periodKey });
      if (alreadyPaid + amount >= Number(plan.amount)) member.paidPeriods[plan.id] = periodKey;
      if (plan.type === 'Member capital') member.capital += amount;
      state.cash += amount;
      toast(`${money(amount)} contribution recorded for ${member.name}.`);
      setTimeout(() => {
        showWhatsAppReceipt({
          member,
          amount,
          type: plan.name || plan.type,
          method: data.method,
          refCode: data.reference || 'MPESA-TX',
          txDate: data.date
        });
      }, 350);
    } else if (form.id === 'memberForm') {
      const openingCapital = Math.max(0, Number(data.capital) || 0);
      const member = { id: nextId('CB', state.members), name: data.name.trim(), phone: data.phone.trim(), joined: data.joined, capital: openingCapital, status: data.status, paidPeriods: {} };
      state.members.unshift(member);
      if (member.capital > 0) { state.cash += member.capital; addTransaction({ type: 'Member capital', amount: member.capital, memberId: member.id, method: 'Cash', note: 'Opening capital balance', date: member.joined }); }
      toast(`${member.name} added to the group.`);
    } else if (form.id === 'editMemberForm') {
      const member = getMember(form.dataset.id);
      if (member) Object.assign(member, { name: data.name.trim(), phone: data.phone.trim(), joined: data.joined, status: data.status });
      toast('Member details updated.');
    } else if (form.id === 'loanForm') {
      const principal = Number(data.principal);
      if (principal > state.cash) return toast('The requested loan is higher than cash currently available.');
      if (!data.guarantor1Id || !data.guarantor2Id) return toast('Tafadhali chagua wadhamini wawili (2) wa mkopo.');
      if (data.guarantor1Id === data.guarantor2Id) return toast('Mdhamini wa kwanza na wa pili hawawezi kuwa mtu mmoja.');
      if (data.guarantor1Id === data.memberId || data.guarantor2Id === data.memberId) return toast('Mkopaji hawezi kujidhamini mwenyewe.');
      const g1 = getMember(data.guarantor1Id);
      const g2 = getMember(data.guarantor2Id);
      const term = Number(data.term);
      const interest = Math.round(principal * (Number(data.rate) / 100) * (term / 12));
      const loan = {
        id: nextId('LN', state.loans),
        memberId: data.memberId,
        original: principal,
        principalRemaining: principal,
        interest,
        interestPaid: 0,
        repaid: 0,
        status: 'Active',
        due: data.due,
        guarantor1Id: data.guarantor1Id,
        guarantor2Id: data.guarantor2Id
      };
      state.loans.unshift(loan);
      state.cash -= principal;
      addTransaction({
        type: 'Loan disbursement',
        amount: principal,
        memberId: loan.memberId,
        method: data.method,
        date: isoToday(),
        note: `Approved ${term}-month loan · Wadhamini: ${g1?.name || data.guarantor1Id}, ${g2?.name || data.guarantor2Id}${data.note ? ` · ${data.note}` : ''}`
      });
      toast(`Loan ${loan.id} recorded with guarantors ${g1?.name} & ${g2?.name}. Estimated interest: ${money(interest)}.`);
    } else if (form.id === 'repaymentForm') {
      const loan = state.loans.find(item => item.id === form.dataset.loan);
      const amount = Number(data.amount);
      if (!loan || amount <= 0 || amount > loanRemaining(loan)) return toast('Enter an amount up to the remaining loan balance.');
      const interestDue = Math.max(0, loan.interest - loan.interestPaid);
      const interestPart = Math.min(amount, interestDue);
      const principalPart = Math.min(Math.max(0, amount - interestPart), loan.principalRemaining);
      loan.interestPaid += interestPart;
      loan.principalRemaining -= principalPart;
      loan.repaid += amount;
      if (loanRemaining(loan) <= 0) loan.status = 'Paid';
      state.cash += amount;
      state.interestCollected += interestPart;
      addTransaction({ type: 'Loan repayment', amount, memberId: loan.memberId, method: data.method, date: data.date, reference: data.reference || '', note: `${money(interestPart)} interest · ${money(principalPart)} principal`, interestPart, principalPart });
      toast(`Repayment recorded: ${money(interestPart)} interest and ${money(principalPart)} principal.`);
      const borrower = getMember(loan.memberId);
      setTimeout(() => {
        showWhatsAppReceipt({
          member: borrower,
          amount,
          type: 'Marejesho ya Mkopo (Loan Repayment)',
          method: data.method,
          refCode: data.reference || `RP-${loan.id}`,
          txDate: data.date
        });
      }, 350);
    } else if (form.id === 'welfareForm') {
      const amount = Number(data.amount);
      if (amount <= 0) return toast('Weka kiasi sahihi cha msaada.');
      if (amount > state.cash) return toast('Kiasi hiki kinazidi fedha taslimu zilizopo kwenye kikundi.');
      const member = getMember(data.memberId);
      if (!member) return toast('Chagua mwanachama sahihi.');
      state.welfareGrants ||= [];
      const grantId = `WG-${Date.now()}`;
      const grant = {
        id: grantId,
        memberId: member.id,
        amount,
        reason: data.reason,
        date: data.date,
        method: data.method,
        note: (data.note || '').trim(),
        approvedBy: (state.group.officials?.[0]?.name || 'Uongozi')
      };
      state.welfareGrants.unshift(grant);
      state.cash -= amount;
      addTransaction({
        type: 'Welfare assistance',
        amount,
        memberId: member.id,
        method: data.method,
        date: data.date,
        note: `${data.reason}${data.note ? ` · ${data.note}` : ''}`,
        reference: grantId
      });
      toast(`Msaada wa ${money(amount)} kwa ${member.name} umerekodiwa.`);
    } else if (form.id === 'expenseForm') {
      const amount = Number(data.amount);
      if (amount > state.cash) return toast('This expense is higher than the cash currently available.');
      state.cash -= amount; state.expenses += amount;
      addTransaction({ type: 'Expense', amount, method: data.method, note: `${data.category}: ${data.note}`, date: data.date, reference: data.reference || '' });
      toast(`${money(amount)} expense recorded.`);
    } else if (form.id === 'fineForm') {
      const fine = { id: nextId('FN', state.fines), memberId: data.memberId, reason: data.reason.trim(), amount: Number(data.amount), paid: 0, date: data.date };
      state.fines.push(fine);
      addTransaction({ type: 'Fine assessed', amount: fine.amount, memberId: fine.memberId, method: '—', note: fine.reason, date: fine.date, reference: fine.id });
      toast(`${money(fine.amount)} fine recorded for ${getMember(fine.memberId)?.name || 'member'}.`);
    } else if (form.id === 'finePaymentForm') {
      const fine = state.fines.find(item => item.id === form.dataset.id);
      const amount = Number(data.amount);
      if (!fine || amount <= 0 || amount > fine.amount - fine.paid) return toast('Enter an amount up to the remaining fine balance.');
      fine.paid += amount; state.cash += amount;
      addTransaction({ type: 'Fine payment', amount, memberId: fine.memberId, method: data.method, date: data.date, reference: data.reference || '', note: fine.reason });
      toast(`${money(amount)} fine payment recorded.`);
    } else if (form.id === 'planForm') {
      state.group.plans.push({ id: `PL-${Date.now()}`, name: data.name.trim(), type: data.type, amount: Number(data.amount), cadence: data.cadence, startDate: data.startDate, intervalDays: Math.max(1, Number(data.intervalDays) || 30) });
      toast(`${data.name} plan added.`);
    } else if (form.id === 'settingsForm') {
      if (new Date(data.end) <= new Date(data.start)) return toast('Share-out date must be after the cycle start date.');
      Object.assign(state.group, {
        name: data.name.trim(),
        type: data.type,
        phone: data.phone.trim(),
        location: data.location.trim(),
        established: data.established,
        description: data.description.trim(),
        cycleName: data.cycleName.trim(),
        start: data.start,
        end: data.end,
        rate: Number(data.rate),
        reservePercent: Number(data.reservePercent),
        distribution: data.distribution,
        operatorMode: data.operatorMode || 'single',
        officials: [
          { role: 'Mweka Hazina', name: (data.officialTreasurer || 'Asha M.').trim() },
          { role: 'Mwenyekiti', name: (data.officialChair || 'Juma K.').trim() },
          { role: 'Katibu', name: (data.officialSecretary || 'Zainab S.').trim() }
        ]
      });
      toast('Group and cycle settings saved.');
    }
    const persisted = save(); modal.close(); renderAll();
    if (!persisted) toast(window.ChamaI18n?.lang === 'en'
      ? 'Change shown on screen only; it was not saved. Download a backup before continuing.'
      : 'Mabadiliko yanaonekana tu, hayajahifadhiwa. Pakua nakala kabla ya kuendelea.');
  });

  $('#modalClose').addEventListener('click', () => modal.close());
  modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });
  $('#settingsButton').addEventListener('click', () => cycleSettingsForm());
  $('#chartRange').addEventListener('change', renderChart);
  $('#memberSearch').addEventListener('input', () => { memberPage = 1; renderMembers(); });
  $('#memberStatusFilter').addEventListener('change', () => { memberPage = 1; renderMembers(); });
  $('#loanFilter').addEventListener('change', renderLoans);
  $('#fineFilter').addEventListener('change', renderFines);
  $('#ledgerSearch').addEventListener('input', renderLedger);
  $('#transactionTypeFilter').addEventListener('change', renderLedger);
  $('#paymentMethodFilter').addEventListener('change', renderLedger);
  $('#globalSearch').addEventListener('input', event => {
    const value = event.target.value;
    if ($('#view-members').classList.contains('active')) { $('#memberSearch').value = value; memberPage = 1; renderMembers(); }
  });
  $('#globalSearch').addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.target.value = '';
      $('#memberSearch').value = '';
      memberPage = 1;
      if ($('#view-members').classList.contains('active')) renderMembers();
      $('.search-wrap').classList.remove('search-open');
      event.target.blur();
    }
    if (event.key === 'Enter') { $('#memberSearch').value = event.target.value.trim(); memberPage = 1; setView('members'); renderMembers(); event.target.blur(); }
  });
  $('#mobileSearchButton').addEventListener('click', () => {
    const searchWrap = $('.search-wrap');
    const isOpen = searchWrap.classList.toggle('search-open');
    if (isOpen) $('#globalSearch').focus();
    else $('#globalSearch').blur();
  });
  document.addEventListener('keydown', event => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); $('#globalSearch').focus(); } });
  $$('[data-contribution-filter]').forEach(button => button.addEventListener('click', () => { state.contributionFilter = button.dataset.contributionFilter; renderContributions(); }));
  $('#contributionPlanSelect').addEventListener('change', event => { selectedContributionPlanId = event.target.value; state.contributionFilter = 'all'; renderContributions(); });
  $('#sidebarToggle').addEventListener('click', () => {
    document.body.classList.toggle('sidebar-hidden');
    updateMenuControls();
  });
  $('#mobileMenu').addEventListener('click', () => {
    const isOpen = $('#sidebar').classList.toggle('open');
    $('#mobileScrim').classList.toggle('show', isOpen);
    updateMenuControls();
  });
  $('#mobileScrim').addEventListener('click', () => {
    $('#sidebar').classList.remove('open');
    $('#mobileScrim').classList.remove('show');
    updateMenuControls();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && $('#sidebar').classList.contains('open')) {
      $('#sidebar').classList.remove('open');
      $('#mobileScrim').classList.remove('show');
      $('#mobileMenu').focus();
      updateMenuControls();
    }
  });
  $('#notificationButton').addEventListener('click', () => toast(`${dueMembers().length} members have a contribution balance due.`));
  window.addEventListener('chama:languagechange', () => {
    renderAll(); updateStorageStatus();
    if (modal.open && modal.dataset.panel === 'data-safety') dataSafetyForm();
  });
  $('#modalContent').addEventListener('change', event => {
    if (event.target.id === 'paymentFund') {
      const amount = event.target.selectedOptions[0]?.dataset.amount;
      if (amount) $('#paymentAmount').value = amount;
    }
    if (event.target.id === 'memberCsv') {
      const file = event.target.files?.[0];
      if (!file) return;
      importFile = file;
      $('#importFeedback').textContent = `Selected ${file.name} · ready to review`;
      $('#previewImportButton').disabled = false;
      return;
    }
    if (event.target.matches('.mapping-select')) {
      importMapping[event.target.dataset.map] = event.target.value;
      renderImportPreview();
    }
  });
  $('#backupFilePicker').addEventListener('change', event => {
    const file = event.target.files?.[0];
    event.target.value = '';
    restoreBackup(file);
  });
  $('#modalContent').addEventListener('click', async event => {
    if (event.target.id === 'previewImportButton') {
      if (!importFile) return;
      let rows;
      try { rows = /\.xlsx$/i.test(importFile.name) ? await parseXlsx(importFile) : parseCSV(await importFile.text()); }
      catch (error) { toast(error.message || 'Could not read this spreadsheet.'); return; }
      if (rows.length < 2) return toast('The CSV needs a header row and at least one member row.');
      importHeaders = rows[0]; importRows = rows.slice(1); importMapping = {};
      renderImportPreview();
      return;
    }
    if (event.target.id !== 'confirmMemberImport') return;
    const fieldColumn = key => importMapping[key] === '' || importMapping[key] == null ? -1 : Number(importMapping[key]);
    const readValue = (row, key) => { const index = fieldColumn(key); return index < 0 ? '' : String(row[index] || '').trim(); };
    const knownNames = new Set(state.members.map(member => member.name.toLowerCase()));
    const knownPhones = new Set(state.members.map(member => (member.phone || '').replace(/\D/g, '')).filter(Boolean));
    let imported = 0;
    importRows.forEach(row => {
      const name = readValue(row, 'name');
      const phone = readValue(row, 'phone');
      const phoneDigits = phone.replace(/\D/g, '');
      if (!name || knownNames.has(name.toLowerCase()) || phoneDigits && knownPhones.has(phoneDigits)) return;
      const toAmount = key => { const raw = readValue(row, key).replace(/[\s,TSh]/gi, ''); const value = Number(raw); return Number.isFinite(value) && value > 0 ? value : 0; };
      const desiredId = readValue(row, 'memberId');
      let memberId = desiredId || nextId('CB', state.members);
      if (state.members.some(member => member.id.toLowerCase() === memberId.toLowerCase())) memberId = nextId('CB', state.members);
      const joinedText = readValue(row, 'joined');
      let joined = /^\d{4}-\d{2}-\d{2}$/.test(joinedText) ? joinedText : '';
      if (!joined && /^\d+(\.\d+)?$/.test(joinedText)) {
        const serial = Number(joinedText);
        if (serial > 1 && serial < 100_000) joined = new Date(Date.UTC(1899, 11, 30) + serial * 86400000).toISOString().slice(0, 10);
      }
      if (!joined) {
        const localDate = joinedText.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
        if (localDate) joined = `${localDate[3]}-${localDate[2].padStart(2, '0')}-${localDate[1].padStart(2, '0')}`;
      }
      if (!joined) joined = isoToday();
      const status = /^paused$/i.test(readValue(row, 'status')) ? 'Paused' : 'Active';
      const member = { id: memberId, name, phone, joined, capital: toAmount('capital'), status, paidPeriods: {} };
      state.members.push(member); knownNames.add(name.toLowerCase()); if (phoneDigits) knownPhones.add(phoneDigits);
      const loanBalance = toAmount('loanBalance');
      if (loanBalance) state.loans.push({ id: nextId('LN', state.loans), memberId, original: loanBalance, principalRemaining: loanBalance, interest: 0, interestPaid: 0, repaid: 0, status: 'Active', due: '' });
      const fineBalance = toAmount('fineBalance');
      if (fineBalance) state.fines.push({ id: nextId('FN', state.fines), memberId, reason: 'Imported opening fine balance', amount: fineBalance, paid: 0, date: joined });
      imported++;
    });
    if (!imported) return toast('There are no valid new members to import.');
    const persisted = save(); modal.close(); renderAll();
    toast(persisted ? `${imported} member records imported.` : (window.ChamaI18n?.lang === 'en'
      ? 'Import shown on screen only; it was not saved. Download a backup before continuing.'
      : 'Wanachama wameingizwa kwenye skrini tu; hawajahifadhiwa. Pakua nakala ya data.'));
  });

  // Kikao cha Leo Action Controls & Table Events
  $('#btnQuickMeeting')?.addEventListener('click', () => setView('meeting'));
  $('#btnMarkAllPresent')?.addEventListener('click', () => {
    activeMembers().forEach(m => meetingAttendance[m.id] = true);
    renderMeeting();
    toast('Wanachama wote wamewekwa: Yupo');
  });
  $('#btnApplyAllHisa')?.addEventListener('click', () => {
    const hisaPlan = state.group.plans.find(p => p.type === 'Member capital') || state.group.plans[0];
    const def = hisaPlan?.amount || 60000;
    activeMembers().forEach(m => meetingHisa[m.id] = def);
    renderMeeting();
    toast(`Kila mwanachama amepewa hisa ya ${money(def)}`);
  });
  $('#btnApplyAllWelfare')?.addEventListener('click', () => {
    const welfarePlan = state.group.plans.find(p => p.type === 'Welfare fund') || state.group.plans[2];
    const def = welfarePlan?.amount || 5000;
    activeMembers().forEach(m => meetingWelfare[m.id] = def);
    renderMeeting();
    toast(`Kila mwanachama amepewa mfuko wa jamii wa ${money(def)}`);
  });
  $('#btnClearAmounts')?.addEventListener('click', () => {
    activeMembers().forEach(m => {
      meetingHisa[m.id] = 0;
      meetingWelfare[m.id] = 0;
      meetingFines[m.id] = 0;
    });
    renderMeeting();
    toast('Kiasi kote kimewekwa 0');
  });
  $('#btnSaveMeeting')?.addEventListener('click', () => saveMeetingSession());

  $('#meetingTableBody')?.addEventListener('input', event => {
    const input = event.target;
    const id = input.dataset.id;
    if (!id) return;
    if (input.classList.contains('input-hisa')) {
      meetingHisa[id] = Number(input.value) || 0;
      calculateMeetingTotals();
    } else if (input.classList.contains('input-welfare')) {
      meetingWelfare[id] = Number(input.value) || 0;
      calculateMeetingTotals();
    } else if (input.classList.contains('input-fine')) {
      meetingFines[id] = Number(input.value) || 0;
      calculateMeetingTotals();
    }
  });

  $('#meetingTableBody')?.addEventListener('change', event => {
    const select = event.target;
    const id = select.dataset.id;
    if (id && select.classList.contains('select-method')) {
      meetingMethods[id] = select.value;
    }
  });

  function checkAndSyncBackend() {
    fetch(`${API_BASE}/api/state`)
      .then(res => res.ok ? res.json() : null)
      .then(remoteState => {
        if (remoteState && isUsableState(remoteState)) {
          isBackendConnected = true;
          updateBackendPill(true);
          if (!stateLoadedFromStorage || stateRecoveryNeeded) {
            state = remoteState;
            stateRecoveryNeeded = false;
            stateLoadedFromStorage = true;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            renderAll();
          }
          updateStorageStatus();
        } else {
          fetch(`${API_BASE}/api/health`)
            .then(r => r.ok ? r.json() : null)
            .then(h => {
              if (h?.status === 'online') {
                isBackendConnected = true;
                updateBackendPill(true);
                updateStorageStatus();
              }
            }).catch(() => updateBackendPill(false));
        }
      })
      .catch(() => updateBackendPill(false));
  }

  checkAndSyncBackend();
  renderAll();
  updateStorageStatus();
  const hadStoredRecords = stateLoadedFromStorage;
  if (!stateLoadedFromStorage && !stateRecoveryNeeded && !storageReadIssue) save();
  const welcomeStatus = $('#welcomeStatus');
  if (welcomeStatus) {
    const english = window.ChamaI18n?.lang === 'en';
    welcomeStatus.textContent = stateRecoveryNeeded
      ? (english ? 'Checking the saved records before continuing…' : 'Tunakagua taarifa za zamani kabla ya kuendelea…')
      : hadStoredRecords
        ? (english ? 'Opening records saved on this device…' : 'Tunafungua taarifa zilizohifadhiwa kwenye kifaa hiki…')
        : (english ? 'Preparing a sample workspace…' : 'Tunaandaa mfano wa app kukuonyesha inavyofanya kazi…');
    window.ChamaI18n?.apply();
  }
  const welcomeLoader = $('#welcomeLoader');
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  window.setTimeout(() => {
    welcomeLoader?.classList.add('is-exiting');
    document.body.classList.remove('booting');
    document.querySelector('.app-shell')?.setAttribute('aria-busy', 'false');
    $('.page-wrap')?.setAttribute('aria-busy', 'false');
    window.setTimeout(() => welcomeLoader?.remove(), reducedMotion ? 30 : 380);
    if (stateRecoveryNeeded || storageReadIssue || saveFailure) dataSafetyForm();
  }, reducedMotion ? 100 : 480);
})();
