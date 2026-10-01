# ChamaBook — Fedha za Kikundi, kwa Uwazi

[![Node.js 22](https://img.shields.io/badge/Node.js-22.x%20LTS-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![SQLite Native](https://img.shields.io/badge/SQLite-Native%20node%3Asqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org/)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero%20(Pure%20Vanilla)-success?style=for-the-badge)](https://developer.mozilla.org/)
[![Tanzania VICOBA Ready](https://img.shields.io/badge/Region-Tanzania%20%26%20East%20Africa-007A3D?style=for-the-badge)](https://en.wikipedia.org/wiki/Tanzania)

> **ChamaBook** ni mfumo wa kisasa wa kidijitali uliotengenezwa mahsusi kusimamia fedha, hisa, mikopo, faini, na mifuko ya jamii kwa ajili ya **Vyama vya Akiba, VICOBA, Upatu, Vikundi vya Uwekezaji na SACCOs** nchini Tanzania na Afrika Mashariki.

---

## 🌟 Kwa Nini ChamaBook? (Why ChamaBook?)

Katika vikundi vingi vya kijamii, fedha bado zinarekodiwa kwenye madaftari ya karatasi au Excel zenye makosa mengi na ukosefu wa uwazi. ChamaBook inaleta heshima na usalama wa mifumo mikubwa ya benki (Linear/Stripe caliber) katika muundo mwepesi, usiohitaji intaneti kubwa, na unaoeleweka na kila mwanachama.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CHAMABOOK ECOSYSTEM                               │
│                                                                             │
│  ⚡ Kikao cha Leo         👥 Wadhamini wa Mkopo      🏥 Mfuko wa Jamii      │
│  (Rapid Batch Entry)     (2-Guarantor Security)    (Welfare Grants)         │
│                                                                             │
│  💬 WhatsApp Risiti      📊 Mzunguko & Mgao         💾 SQLite Data Store    │
│  (Instant Receipts)      (5-Year Share-out)        (Native Zero-Config)     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Vipengele Muhimu (Key Features)

### 1. ⚡ Kikao cha Leo (Meeting Day Mode)
* Mfumo ulioundwa kwa ajili ya **Mweka Hazina mmoja** kurekodi mahudhurio na makusanyo ya wanachama 25–50 ndani ya dakika chache mkutanoni.
* **Zana za Haraka:** Weka wote wapo, jaza hisa za mwezi kwa wote kwa mbofyo mmoja.
* **Tactile Attendance Switch:** `[ Yupo | Hayupo ]` yenye utofauti mkali wa rangi.
* **Sticky Totals Dock:** Inanata chini ya skrini ikionyesha hesabu ya papo hapo: Waliohudhuria, Jumla ya Hisa, Mfuko wa Jamii, Faini na **JUMLA KUU YA LEO**.

### 2. 👥 Wadhamini wa Mikopo (Loan Guarantors)
* Kulingana na kanuni halisi za VICOBA, kila mkopo unalindwa na **Wadhamini wawili (2)** wenye hisa hai.
* Salio la hisa za wadhamini linaonekana wazi kabla ya mkopo kuidhinishwa, kuzuia madeni hewa na mikopo chechefu.

### 3. 🏥 Mfuko wa Jamii (Welfare & Emergency Fund)
* Michango na misaada ya dharura (matibabu, misiba, uzazi) inatenganishwa rasmi na Hisa za uwekezaji.
* Mfuko huu hautolewi gawio wakati wa mgao bali unalindwa kwa ajili ya kusaidiana.

### 4. 💬 Risiti za Kidijitali za WhatsApp
* Kila mwanachama anapolipa hisa au marejesho, mfumo unatengeneza risiti rasmi ya kidijitali.
* Mtunza hazina anatuma risiti yenye jina la kikundi, namba ya muamala, na mchanganuo wa malipo kwa **WhatsApp kwa mbofyo mmoja tu**.

### 5. 📊 Mzunguko na Mgao (Share-out & Cycle Planner)
* Ufuatiliaji wa mzunguko wa miaka 5 (*Long-term Share-out Cycle*).
* Makadirio sahihi ya gawio kulingana na hisa zilizolipwa (*Pro-rata by capital*) au mgao sawa.

### 6. 🌐 Lugha Mbili (Kiswahili & English)
* Inafunguka kwa **Kiswahili sanifu** kinachotumiwa kwenye vyama vya Tanzania, ikiwa na uwezo wa kubadilisha kwenda **English** papo hapo bila ku-refresh ukurasa.

---

## 🛠️ Muundo wa Teknolojia (Tech Stack)

* **Backend:** Node.js 22.x LTS inayotumia native module ya `node:sqlite` (hakuna npm packages za nje zinazohitajika!).
* **Frontend:** Semantic HTML5, Modular CSS Design System (yenye design tokens za Linear & Stripe), na Pure Vanilla JavaScript (ES6+).
* **Database:** SQLite (`chamabook.db`) yenye ACID compliance na Write-Ahead Logging (WAL) kwa ajili ya kasi na usalama wa taarifa.
* **Typography:** `Manrope` (Font safi ya kisasa) + `DM Mono` (kwa namba na tarakimu za fedha za Tanzania - TSh).

---

## 💻 Jinsi ya Kuanza (Quick Start)

### Mahitaji (Prerequisites)
* Hakikisha umesakinisha **Node.js 22.0.0 au zaidi** kwenye kompyuta yako:
  ```bash
  node --version
  ```

### Kuendesha Mfumo
```bash
# 1. Ingia kwenye folda ya mradi
cd outputs/chamabook-app

# 2. Anzisha seva ya Node.js
node server.js

# 3. Fungua kivinjari chako
# Tembelea: http://localhost:8000
```

### Uhakiki wa Database (Database Health Check)
```bash
node verify.js
```
*Hii itakagua majedwali 8 ya SQLite (`groups`, `plans`, `members`, `loans`, `transactions`, `fines`, `welfare_grants`, `meetings`) na kuthibitisha rekodi zote zipo salama.*

---

## 📂 Mpangilio wa Faili (File Structure)

```
chamabook-app/
├── index.html        # Muundo mkuu wa kurasa, moduli, na docks
├── styles.css        # Design system kamili, tokens, rangi za pine/emerald, na responsive layout
├── app.js            # Engine ya JavaScript, hesabu za kikao, DOM updates na SQLite sync
├── server.js         # Seva ya asili ya Node 22 SQLite na REST API endpoints
├── i18n.js           # Kamusi ya Kiswahili na Kiingereza yenye MutationObserver
├── verify.js         # Script ya kuthibitisha uimara wa database ya SQLite
├── chamabook.db      # Database ya SQLite iliyosheheni data ya wanachama 24 na mikopo 8
├── HANDOFF.md        # Mwongozo wa kina wa kiufundi kwa ajili ya developer au AI Agent anayefuata
└── README.md         # Mwongozo huu wa mradi
```

---

## 🤝 Mwongozo kwa Developer au AI Agent Mpya (Handoff)

Ikiwa wewe ni Software Engineer au AI Coding Agent unayechukua mradi huu kuendeleza:
👉 **Tafadhali soma faili la [`HANDOFF.md`](HANDOFF.md)** kabla ya kuanza kuandika kodi. Linajumuisha:
* Historia kamili na falsafa ya ujenzi wa ChamaBook.
* Ufafanuzi wa kina wa kila API endpoint na jedwali la database.
* Ramani ya mradi (Roadmap): *Multi-Officer Sign-off, Offline PWA mode, SMS Gateway integration, na M-Pesa Statement Auto-Reconciliation*.
* Miiko na miongozo ya kulinda ubora wa mfumo.

---

## 📜 Leseni (License)

Mradi huu umesajiliwa chini ya Leseni ya **MIT License**. Unaweza kuutumia, kuuboresha, na kuutumia kwa ajili ya maendeleo ya kiuchumi ya jamii zetu.

*Imejengwa kwa ajili ya maendeleo ya kiuchumi na uwazi wa fedha za kijamii Tanzania 🇹🇿.*
