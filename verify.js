const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('chamabook.db');

const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();
console.log('Tables:', tables.map(t => t.name).join(', '));

const counts = {
  groups: db.prepare('SELECT COUNT(*) as c FROM groups').get().c,
  plans: db.prepare('SELECT COUNT(*) as c FROM plans').get().c,
  members: db.prepare('SELECT COUNT(*) as c FROM members').get().c,
  loans: db.prepare('SELECT COUNT(*) as c FROM loans').get().c,
  transactions: db.prepare('SELECT COUNT(*) as c FROM transactions').get().c,
  fines: db.prepare('SELECT COUNT(*) as c FROM fines').get().c,
  welfare: db.prepare('SELECT COUNT(*) as c FROM welfare_grants').get().c,
  meetings: db.prepare('SELECT COUNT(*) as c FROM meetings').get().c
};
console.log('Database verification stats:', JSON.stringify(counts, null, 2));

// Test a sample loan with guarantors
const sampleLoan = db.prepare("SELECT * FROM loans WHERE guarantor1_id IS NOT NULL LIMIT 1").get();
console.log('Sample loan with guarantors:', {
  loanId: sampleLoan.id,
  borrower: sampleLoan.member_id,
  guarantor1: sampleLoan.guarantor1_id,
  guarantor2: sampleLoan.guarantor2_id,
  principal: sampleLoan.original
});
