(() => {
  'use strict';

  const KEY = 'chamabook-language';
  const words = {
    'WORKSPACE': 'KAZI ZA KIKUNDI',
    'Ruka menyu, nenda kwenye maudhui': 'Skip navigation, go to content',
    'Overview': 'Muhtasari', 'Members': 'Wanachama', 'Contributions': 'Michango', 'Loans': 'Mikopo', 'Fines': 'Faini',
    'Cycle & share-out': 'Mzunguko na mgao', 'Transactions': 'Miamala', 'Group settings': 'Mipangilio ya kikundi',
    'SHARE-OUT CYCLE': 'MZUNGUKO WA MGAO', 'Year': 'Mwaka', 'complete': 'imekamilika', 'Started': 'Umeanza',
    'Share-out date': 'Tarehe ya mgao', 'Cycle started': 'Mzunguko umeanza', 'LONG-TERM GROUP CYCLE': 'MZUNGUKO WA MUDA MREFU',
    'Your contributions are building': 'Michango yenu inajenga', 'toward a shared future.': 'kwa ajili ya malengo yenu ya pamoja.',
    'Current cash balance': 'Salio la fedha lililopo', 'Cash in the group': 'Fedha za kikundi', 'loans shown separately': 'mikopo imeonyeshwa kando',
    'Loan portfolio': 'Jumla ya mikopo', 'Member capital': 'Hisa za wanachama', 'Interest earned': 'Riba iliyopatikana',
    '3 loans overdue': 'Mikopo 3 imechelewa', 'to recover': 'inayopaswa kurejeshwa', 'this cycle': 'katika mzunguko huu',
    'collected this month': 'iliyokusanywa mwezi huu', 'FUND PERFORMANCE': 'MWENDO WA FEDHA', 'Capital collected': 'Hisa zilizokusanywa',
    'Last 6 months': 'Miezi 6 iliyopita', 'Last 12 months': 'Miezi 12 iliyopita', 'Member capital': 'Hisa za wanachama',
    'Interest collected': 'Riba iliyokusanywa', 'NEEDS ATTENTION': 'INAHITAJI UANGALIZI', 'Payment follow-up': 'Malipo ya kufuatilia',
    'View all': 'Ona yote', 'members have a balance due': 'wanachama wana michango inayodaiwa',
    'Contribution schedule': 'Ratiba ya michango', 'Record a payment': 'Rekodi malipo', 'Recent transactions': 'Miamala ya hivi karibuni',
    'ACCOUNTABILITY': 'UWAZI WA FEDHA', 'Full ledger': 'Orodha yote ya miamala', 'TRANSACTION': 'MUAMALA', 'MEMBER': 'MWANACHAMA',
    'METHOD': 'NJIA', 'RECORDED BY': 'ALIYEINGIZA', 'DATE': 'TAREHE', 'AMOUNT': 'KIASI',
    'SAMPLE DATA': 'TAARIFA ZA MFANO', 'Demo treasurer': 'Mtunza fedha wa mfano', 'Sample treasurer': 'Mtunza fedha wa mfano', 'Sample treasurer Asha M.': 'Asha M., mtunza fedha wa mfano',
    'ChamaBook keeps your group records together.': 'ChamaBook huweka kumbukumbu za kikundi sehemu moja.',
    'Demo workspace · Data stays in this browser': 'Mfano tu · Data inabaki kwenye kivinjari hiki',
    'YOUR GROUP': 'KIKUNDI CHAKO', 'A clear view of each member’s capital, contributions and loans.': 'Ona hisa, michango na mikopo ya kila mwanachama.',
    'Import members': 'Ingiza wanachama', 'Add member': 'Ongeza mwanachama', 'Active members': 'Wanachama hai',
    'Across this group': 'Katika kikundi hiki', 'Paid into the group': 'Zilizowekwa kwenye kikundi', 'Members with loans': 'Wanachama wenye mikopo',
    '3 require follow-up': '3 wanahitaji kufuatiliwa', 'Search by name or member ID': 'Tafuta kwa jina au namba ya mwanachama',
    'Search members': 'Tafuta wanachama', 'All members': 'Wanachama wote', 'Active': 'Hai', 'Paused': 'Amesitishwa',
    'Previous page': 'Ukurasa uliopita', 'Next page': 'Ukurasa unaofuata', 'MEMBER ID': 'NAMBA YA MWANACHAMA', 'JOINED': 'ALIPOJIUNGA',
    'CAPITAL PAID': 'HISA ALIZOLIPA', 'LOAN BALANCE': 'DENI LA MKOPO', 'STATUS': 'HALI', 'Demo records only; this version has no user sign-in.': 'Taarifa za mfano tu; toleo hili halina akaunti za watumiaji.', 'Changes save on this device.': 'Mabadiliko huhifadhiwa kwenye kifaa hiki.',
    'Interest and approval rules depend on your group’s decisions.': 'Masharti ya riba na idhini huamuliwa na kikundi chako.', 'This demo has no audit trail or correction flow.': 'Mfano huu hauna historia ya ukaguzi wala njia ya kusahihisha miamala.',
    'Last updated just now': 'Imesasishwa sasa hivi', 'COLLECTIONS': 'MICHANGO', 'Track what members owe and what the group has actually received.': 'Fuatilia michango inayodaiwa na fedha ambazo kikundi kimepokea.',
    'Export': 'Pakua taarifa', 'Export report': 'Pakua ripoti', 'Export CSV': 'Pakua CSV', 'Export members': 'Pakua orodha ya wanachama',
    'CONTRIBUTION PLAN': 'RATIBA YA MCHANGO', 'Stay on top of member dues.': 'Fuatilia michango ya wanachama kwa urahisi.',
    'Member capital is tracked separately from operating fees and other group funds.': 'Hisa za wanachama hutenganishwa na ada za uendeshaji na mifuko mingine.',
    'expected this period': 'zinazotarajiwa kipindi hiki', 'Collected': 'Zilizokusanywa', 'Members due': 'Wanachama wanaodaiwa',
    'GROUP RULES': 'KANUNI ZA KIKUNDI', 'Contribution plans': 'Ratiba za michango', 'Add plan': 'Ongeza ratiba', 'THIS MONTH': 'KIPINDI HIKI',
    'THIS PERIOD': 'KIPINDI HIKI', 'Choose a contribution plan': 'Chagua ratiba ya mchango', 'Member payment status': 'Hali ya malipo ya wanachama', 'Partial': 'Sehemu imelipwa', 'PAID / EXPECTED': 'ILIVYOLIPWA / KINACHOTARAJIWA', 'All': 'Zote', 'Due': 'Inadaiwa', 'Paid': 'Imelipwa', 'DUE DATE': 'TAREHE YA KULIPA',
    'PLAN': 'RATIBA', 'Plans are configurable for each group.': 'Kila kikundi kinaweza kupanga ratiba zake.',
    'Member capital and operating fees stay separate.': 'Hisa za wanachama na ada za uendeshaji hutenganishwa.',
    'CREDIT & RECOVERY': 'MIKOPO NA MAREJESHO', 'Follow each loan from approval to its final repayment.': 'Fuatilia kila mkopo tangu utolewe hadi ulipwe wote.',
    'New loan': 'Toa mkopo', 'Principal outstanding': 'Deni la msingi lililobaki', 'Money currently lent out': 'Fedha zilizokopeshwa',
    'Realized income this cycle': 'Riba iliyopokelewa katika mzunguko huu', 'Demo total; not filtered by cycle': 'Jumla ya mfano; haijachujwa kwa mzunguko', 'Past due': 'Iliyochelewa', 'loans': 'mikopo',
    'need follow-up': 'inahitaji kufuatiliwa', 'Upcoming this week': 'Inayotarajiwa wiki hii', 'Expected repayments': 'Marejesho yanayotarajiwa',
    'ACTIVE LOANS': 'MIKOPO INAYOENDELEA', 'Loan register': 'Orodha ya mikopo', 'All loans': 'Mikopo yote', 'Overdue': 'Imechelewa',
    'On track': 'Inaendelea vizuri', 'Paid': 'Imelipwa', 'BORROWER': 'ALIYEKOPA', 'LOAN ID': 'NAMBA YA MKOPO', 'PRINCIPAL': 'FEDHA ZA MKOPO',
    'INTEREST': 'RIBA', 'REPAID': 'ILIVYOREJESHWA', 'REMAINING': 'DENI LILILOSALIA',
    'Loan principal is shown as money owed to the group; only collected interest counts as earned income.': 'Fedha za mkopo ni deni la kikundi. Riba huhesabika kama mapato baada ya kupokelewa.',
    'Interest calculation and approval rules are set by each group.': 'Kikundi huamua jinsi ya kukokotoa riba na kuidhinisha mikopo.',
    'Corrections are recorded in the audit trail.': 'Marekebisho huwekwa kwenye historia ya kumbukumbu.', 'MEMBER OBLIGATIONS': 'MADENI YA WANACHAMA',
    'Record group-approved fines and track payments against each member.': 'Rekodi faini zilizoidhinishwa na ufuatilie malipo ya kila mwanachama.',
    'Record a fine': 'Rekodi faini', 'Outstanding fines': 'Faini ambazo hazijalipwa', 'Unpaid fine balance': 'Jumla ya faini zinazodaiwa',
    'Fines assessed': 'Faini zilizotolewa', 'Group records': 'Rekodi za kikundi', 'Collected this cycle': 'Zilizokusanywa katika mzunguko huu', 'Total fines received': 'Jumla ya faini zilizopokelewa', 'All recorded fine payments': 'Malipo yote ya faini yaliyorekodiwa',
    'Actually received': 'Fedha zilizopokelewa', 'FINE REGISTER': 'ORODHA YA FAINI', 'Member fines': 'Faini za wanachama',
    'All fines': 'Faini zote', 'Unpaid': 'Haijalipwa', 'REASON': 'SABABU', 'ASSESSED': 'ILIYOTOLEWA', 'PAID': 'ILIVYOLIPWA', 'BALANCE': 'DENI',
    'A fine is a group record. Recording the fine itself does not change the cash balance; only a fine payment does.': 'Kurekodi faini hakuongezi wala kupunguza fedha. Salio hubadilika tu faini ikilipwa.',
    'Apply fines only under your group’s approved rules.': 'Toa faini kulingana na kanuni zilizoidhinishwa na kikundi chako.',
    'Payments appear in the transaction ledger.': 'Malipo yanaonekana kwenye orodha ya miamala.', 'CYCLE PLANNING': 'MIPANGO YA MZUNGUKO',
    'Prepare a fair closing statement under your group’s rules.': 'Andaa mgao kulingana na kanuni za kikundi chako.',
    'Cycle settings': 'Mipangilio ya mzunguko', 'Preview share-out': 'Ona mfano wa mgao', 'CURRENT CYCLE': 'MZUNGUKO WA SASA',
    'In progress': 'Unaendelea', 'ESTIMATED GROUP VALUE AT CLOSE': 'MAKADIRIO YA FEDHA MWISHONI',
    'Includes current cash and outstanding loan principal, assuming loans are recovered by the closing date.': 'Makadirio yanajumuisha fedha zilizopo na marejesho ya mikopo yanayotarajiwa kufika tarehe ya mwisho.',
    'Cash available now': 'Fedha zilizopo sasa', 'Loan principal to recover': 'Fedha za mkopo zinazotarajiwa kurejeshwa',
    'Projection only · not yet approved for payout': 'Makadirio tu · mgao bado haujaidhinishwa', 'DISTRIBUTION RULE': 'KANUNI YA MGAO',
    'Pro rata by paid-up member capital': 'Kwa uwiano wa hisa zilizolipwa', 'Equal share across active members': 'Sawa kwa kila mwanachama hai',
    'Capital-weighted with equal bonus': 'Kwa uwiano wa hisa pamoja na nyongeza sawa',
    'The group’s approved rules decide what is included in a final share-out.': 'Kanuni za kikundi ndizo huamua kiasi cha mwisho cha mgao.',
    'Edit rule': 'Badili kanuni', 'MEMBER ENTITLEMENT': 'MGawo WA MWANACHAMA', 'Illustrative share-out by member': 'Mfano wa mgao kwa kila mwanachama',
    'Based on paid-up capital': 'Kulingana na hisa zilizolipwa', 'SHARE OF CAPITAL': 'ASILIMIA YA HISSA', 'ESTIMATED SHARE-OUT': 'MAKADIRIO YA MGAO',
    'Final amounts can only be confirmed after repayments, expenses, reserves and member capital records are reconciled.': 'Kiasi halisi kitajulikana baada ya kuhakiki marejesho, matumizi, akiba na hisa za wanachama.',
    'Every cycle close should have a recorded group resolution.': 'Mwisho wa mzunguko uidhinishwe na kikao cha kikundi.',
    'Current projections update as records change.': 'Makadirio hubadilika kadiri rekodi zinavyosasishwa.',
    'FULL HISTORY': 'HISTORIA YOTE', 'Every movement, with its source and the official who recorded it.': 'Ona kila fedha ilikotoka na kiongozi aliyeirekodi.', 'Demo entries show a sample recorder name; sign-in is not enabled.': 'Mifano inaonyesha jina la kuingiza rekodi; kuingia kwenye akaunti bado hakupo.',
    'Transactions': 'Miamala', 'Search transactions': 'Tafuta miamala', 'All types': 'Aina zote', 'All methods': 'Njia zote',
    'Reference': 'Namba ya kumbukumbu', 'RECORDED BY': 'ALIYEINGIZA', 'Record expense': 'Rekodi matumizi', 'Download full history': 'Pakua historia yote',
    'Financial records are corrected with a reversal and a new entry.': 'Kosa hurekebishwa kwa kufuta athari yake na kuingiza rekodi sahihi.', 'This demo does not include transaction corrections.': 'Mfano huu hauna sehemu ya kusahihisha miamala.',
    'All amounts shown in Tanzanian shillings.': 'Kiasi chote ni kwa shilingi za Tanzania.',
    'Member capital': 'Hisa za mwanachama', 'Operating fee': 'Ada ya uendeshaji', 'Welfare fund': 'Mfuko wa ustawi',
    'Other contribution': 'Mchango mwingine', 'Loan disbursement': 'Mkopo uliotolewa', 'Loan repayment': 'Marejesho ya mkopo',
    'Fine payment': 'Malipo ya faini', 'Fine assessed': 'Faini iliyotolewa', 'Expense': 'Matumizi', 'Other income': 'Mapato mengine',
    'Group': 'Kikundi', 'Cash': 'Taslimu', 'Bank': 'Benki', 'Other': 'Nyingine', 'Monthly': 'Kila mwezi', 'Weekly': 'Kila wiki',
    'Biweekly': 'Kila baada ya wiki mbili', 'Quarterly': 'Kila baada ya miezi mitatu', 'Annually': 'Kila mwaka', 'Custom': 'Ratiba maalum',
    'One-off': 'Mara moja', 'monthly': 'kwa mwezi', 'weekly': 'kwa wiki', 'biweekly': 'kila wiki mbili',
    'quarterly': 'kila miezi mitatu', 'annually': 'kila mwaka', 'custom': 'maalum', 'one-off': 'mara moja',
    'Good morning': 'Habari za asubuhi', 'Good afternoon': 'Habari za mchana', 'Good evening': 'Habari za jioni',
    'Export transactions': 'Pakua miamala', 'Record a contribution': 'Rekodi mchango', 'Loan balances with a due date this week': 'Mizania ya mikopo inayotarajiwa wiki hii', 'Full balances, not installment amounts': 'Mizania yote ya mikopo, si kiasi cha awamu',
    'Here’s the latest on your group’s money.': 'Huu hapa muhtasari wa fedha za kikundi chako.',
    'Search members, loans...': 'Tafuta wanachama au mikopo...', 'Search members and loans': 'Tafuta wanachama na mikopo',
    'Show notifications': 'Ona taarifa muhimu', 'Open navigation': 'Fungua menyu', 'Close navigation': 'Funga menyu', 'Hide menu': 'Ficha menyu', 'Show menu': 'Onyesha menyu', 'Close dialog': 'Funga dirisha', 'Profile options': 'Chaguo za akaunti',
    'GROUP RECORD': 'REKODI YA KIKUNDI', 'Record payment': 'Rekodi malipo', 'Record contribution': 'Rekodi mchango', 'Cancel': 'Ghairi', 'Save record': 'Hifadhi rekodi', 'Done': 'Imekamilika',
    'MEMBER PAYMENT': 'MALIPO YA MWANACHAMA', 'Choose which fund receives this payment. Capital, operating fees and welfare contributions are recorded separately.': 'Chagua mfuko unaopokea malipo haya. Hisa, ada na michango ya ustawi huwekwa tofauti.',
    'Member': 'Mwanachama', 'Contribution fund': 'Mfuko wa mchango', 'Contribution plan': 'Ratiba ya mchango', 'Amount (TSh)': 'Kiasi (TSh)',
    'Payment method': 'Njia ya malipo', 'Date': 'Tarehe', 'Reference / note': 'Namba ya kumbukumbu au maelezo',
    'e.g. M-Pesa transaction code': 'Mfano: namba ya muamala wa M-Pesa', 'MEMBER RECORD': 'TAARIFA ZA MWANACHAMA',
    'Full name': 'Jina kamili', 'Phone number': 'Namba ya simu', 'Date joined': 'Tarehe alipojiunga', 'Opening capital (TSh)': 'Hisa za mwanzo (TSh)',
    'Status': 'Hali', 'Add a group member': 'Ongeza mwanachama', 'Edit member details': 'Badili taarifa za mwanachama',
    'Member ID stays fixed so financial history keeps its link to this person.': 'Namba ya mwanachama haitabadilika ili historia ya fedha ibaki sahihi.',
    'LOAN APPROVAL': 'IDHINI YA MKOPO', 'Create a group loan': 'Toa mkopo wa kikundi',
    'Interest is estimated as a flat annual rate for this demo. Confirm the group’s approved terms before recording a real loan.': 'Mfano huu hukokotoa riba kwa kiwango cha mwaka. Hakiki masharti ya kikundi kabla ya kurekodi mkopo halisi.',
    'Borrower': 'Mkopaji', 'Principal amount': 'Kiasi cha mkopo', 'Principal (TSh)': 'Kiasi cha mkopo (TSh)', 'Term (months)': 'Muda (miezi)',
    'Annual interest (%)': 'Riba ya mwaka (%)', 'First repayment due': 'Tarehe ya marejesho ya kwanza', 'Disbursement method': 'Njia ya kutoa fedha',
    'Approval note': 'Maelezo ya idhini', 'Meeting resolution / minutes ref': 'Namba ya uamuzi au kumbukumbu ya kikao',
    'LOAN COLLECTION': 'MAREJESHO YA MKOPO', 'Record a loan repayment': 'Rekodi marejesho ya mkopo',
    'Amount received (TSh)': 'Kiasi kilichopokelewa (TSh)', 'Reference': 'Kumbukumbu', 'Receipt / transaction ID': 'Risiti au namba ya muamala',
    'Expense description': 'Maelezo ya matumizi', 'e.g. Meeting venue': 'Mfano: Ukumbi wa kikao', 'Category': 'Aina ya matumizi',
    'Paid by': 'Imelipwa kwa njia ya', 'Receipt / note': 'Risiti au maelezo', 'Optional receipt reference': 'Namba ya risiti (si lazima)',
    'Meeting': 'Kikao', 'Transport': 'Usafiri', 'Food': 'Chakula', 'Administration': 'Uendeshaji', 'Emergency': 'Dharura',
    'CASH OUT': 'FEDHA ZILIZOTOKA', 'Record a group expense': 'Rekodi matumizi ya kikundi', 'FINE ASSESSMENT': 'KUTOA FAINI',
    'Record a group fine': 'Rekodi faini ya kikundi', 'Recording an assessed fine does not move cash. Use “Record payment” when a member pays it.': 'Kurekodi faini hakubadili salio. Rekodi malipo baada ya mwanachama kulipa.',
    'Fine amount (TSh)': 'Kiasi cha faini (TSh)', 'Date assessed': 'Tarehe ya kutolewa', 'Reason under group rules': 'Sababu kulingana na kanuni za kikundi',
    'e.g. Missed group meeting': 'Mfano: Hakuhudhuria kikao', 'FINE COLLECTION': 'MALIPO YA FAINI',
    'still due. Repayment is applied to interest first, then to principal.': 'bado inadaiwa. Kwanza hulipwa riba, kisha kiasi cha mkopo.',
    'GROUP RULES': 'KANUNI ZA KIKUNDI', 'Add a contribution plan': 'Ongeza ratiba ya mchango',
    'Set a schedule that fits this group. Expected dues and payment status are shown for the current schedule period.': 'Weka ratiba inayofaa kikundi. Utaona kiasi kinachotarajiwa na malipo ya kipindi hiki.',
    'Plan name': 'Jina la ratiba', 'e.g. Emergency fund': 'Mfano: Mfuko wa dharura', 'Fund type': 'Aina ya mfuko',
    'How often?': 'Mchango hulipwa mara ngapi?', 'Schedule starts': 'Ratiba inaanza', 'Custom interval (days)': 'Idadi ya siku kwa ratiba maalum',
    'Used only when Custom is selected.': 'Jaza hapa ukichagua ratiba maalum.', 'Add a contribution plan': 'Ongeza ratiba ya mchango',
    'CONFIGURE THIS GROUP': 'SANIDI KIKUNDI HIKI',
    'Configure this workspace for a VICOBA, Upatu, Chama cha Hisa, savings group, association, workplace group, or any other community group.': 'Sanidi mfumo huu kwa VICOBA, Upatu, Chama cha Hisa, chama cha akiba, kikundi cha kazini au kikundi kingine.',
    'Group and cycle settings': 'Mipangilio ya kikundi na mzunguko', 'Group name': 'Jina la kikundi', 'Group type': 'Aina ya kikundi',
    'Group phone': 'Simu ya kikundi', 'Location': 'Mahali kilipo', 'Date established': 'Tarehe kilipoanzishwa', 'Description': 'Maelezo',
    'What does this group do?': 'Kikundi hiki kinafanya nini?', 'Cycle name': 'Jina la mzunguko', 'Cycle starts': 'Mzunguko unaanza',
    'Target share-out date': 'Tarehe inayolengwa ya mgao', 'Projected reserve (%)': 'Akiba inayokadiriwa (%)',
    'Illustrative share-out rule': 'Kanuni ya mfano ya mgao', 'Pro rata by paid-up capital': 'Kwa uwiano wa hisa zilizolipwa',
    'Equal amount per active member': 'Kiasi sawa kwa kila mwanachama hai', 'Capital-weighted with equal bonus': 'Kwa uwiano wa hisa pamoja na nyongeza sawa',
    'A projection for planning only. Adopted group rules and final reconciliation control any actual distribution.': 'Haya ni makadirio tu. Kanuni zilizoidhinishwa na hesabu za mwisho ndizo zitaamua mgao halisi.',
    'PLANNING ESTIMATE': 'MAKADIRIO YA MIPANGO', 'Illustrative share-out preview': 'Mfano wa mgao unaokadiriwa',
    'Done': 'Sawa', 'Import members from a spreadsheet': 'Ingiza wanachama kutoka kwenye jedwali', 'STEP 1 OF 4 · UPLOAD': 'HATUA YA 1 KATI YA 4 · PAKIA JEDWALI',
    'Import safely: upload, match columns, review duplicates and missing names, then confirm. Supported formats: CSV and Excel .xlsx.': 'Pakia jedwali, linganisha safu, kagua majina yanayojirudia na yaliyokosekana, kisha thibitisha. Faili za CSV na Excel .xlsx zinakubalika.',
    'Spreadsheet file': 'Faili la jedwali', 'Expected header example: Member Name, Phone Number, Contribution, Loan Balance, Fine Balance': 'Vichwa vya safu: Jina la mwanachama, Simu, Mchango, Deni la mkopo, Deni la faini',
    'Download template': 'Pakua jedwali la mfano', 'Review rows': 'Kagua mistari', 'STEP 2–4 · MATCH, VALIDATE & PREVIEW': 'HATUA YA 2–4 · LINGANISHA, HAKIKI NA ONA MFANO',
    'Review member import': 'Kagua wanachama wa kuingiza', 'Member name': 'Jina la mwanachama', 'Contribution / capital': 'Mchango au hisa',
    'Loan balance': 'Deni la mkopo', 'Fine balance': 'Deni la faini', 'Skip this field': 'Ruka sehemu hii', 'VALIDATION': 'UKAGUZI',
    'Name': 'Jina', 'Phone': 'Simu', 'Missing': 'Haipo', 'Duplicate': 'Linarudiwa', 'Missing name': 'Jina halipo', 'Ready': 'Tayari',
    'Choose another file': 'Chagua faili jingine', 'Confirm import': 'Thibitisha kuingiza', 'MEMBER IMPORT': 'KUINGIZA WANACHAMA',
    'Member profile': 'Taarifa za mwanachama', 'Member ID': 'Namba ya mwanachama', 'Capital paid': 'Hisa alizolipa', 'Loan balance': 'Deni la mkopo',
    'Outstanding fines': 'Faini zinazodaiwa', 'No financial history recorded.': 'Bado hakuna historia ya fedha.', 'Pause member': 'Sitisha mwanachama',
    'Reactivate member': 'Washa tena mwanachama', 'Edit details': 'Badili taarifa',
    'No matching members.': 'Hakuna mwanachama aliyepatikana.', 'No loans match this filter.': 'Hakuna mkopo unaolingana na kichujio hiki.',
    'No fines match this filter.': 'Hakuna faini inayolingana na kichujio hiki.', 'No transactions match those filters.': 'Hakuna muamala unaolingana na vichujio hivi.',
    'Showing': 'Inaonyesha', 'of': 'kati ya', 'members': 'wanachama', 'transactions': 'miamala', 'transaction': 'muamala',
    'Member capital': 'Hisa za mwanachama', 'Operating fee': 'Ada ya uendeshaji', 'Welfare fund': 'Mfuko wa ustawi',
    'Other contribution': 'Mchango mwingine', 'Loan disbursement': 'Mkopo uliotolewa', 'Loan repayment': 'Marejesho ya mkopo',
    'Fine payment': 'Malipo ya faini', 'Fine assessed': 'Faini iliyotolewa', 'Expense': 'Matumizi', 'Other income': 'Mapato mengine',
    'Savings & investment': 'Akiba na uwekezaji', 'Investment group': 'Kikundi cha uwekezaji', 'Savings Group': 'Kikundi cha akiba',
    'Family / community group': 'Kikundi cha familia au jamii', 'Student / College Chama': 'Chama cha wanafunzi',
    'Umoja long-term cycle': 'Mzunguko wa muda mrefu wa Umoja', 'Monthly share': 'Hisa za kila mwezi',
    'Group running fee': 'Ada ya uendeshaji wa kikundi', 'Welfare fund': 'Mfuko wa ustawi',
    'Missed group meeting': 'Hakuhudhuria kikao cha kikundi', 'Late contribution': 'Kuchelewa kulipa mchango',
    'Other: agreed group rule': 'Nyingine: kanuni iliyokubaliwa na kikundi', 'Group administration': 'Uendeshaji wa kikundi',
    'Preview only · not yet approved for payout': 'Makadirio tu · mgao bado haujaidhinishwa',
    'Share-out numbers': 'Makadirio ya mgao', 'Projection only · not yet approved for payout': 'Makadirio tu · mgao bado haujaidhinishwa',
    'Download report': 'Pakua ripoti', 'Switch group': 'Badili kikundi', 'Search members, loans...': 'Tafuta wanachama au mikopo...',
    'Show notifications': 'Ona taarifa muhimu', 'General': 'Jumla', 'Cash available now': 'Fedha zilizopo sasa',
    'Loan principal outstanding': 'Fedha za mkopo ambazo bado hazijarejeshwa', 'Planning reserve': 'Akiba ya mipango',
    'Illustrative amount for distribution': 'Kiasi cha mfano cha kugawa', 'This period': 'Kipindi hiki',
    'payment due': 'mchango unadaiwa', 'All active members are up to date.': 'Wanachama wote hai wamelipa kwa sasa.',
    'No matching transactions.': 'Hakuna miamala iliyopatikana.', 'Group administration': 'Uendeshaji wa kikundi',
    'The requested loan is higher than cash currently available.': 'Mkopo unaotakiwa ni mkubwa kuliko fedha zilizopo.',
    'This expense is higher than the cash currently available.': 'Matumizi haya yanazidi fedha zilizopo.',
    'Enter a valid member and amount.': 'Weka mwanachama na kiasi sahihi.', 'Enter a valid member, plan and amount.': 'Weka mwanachama, ratiba na kiasi sahihi.',
    'Share-out date must be after the cycle start date.': 'Tarehe ya mgao lazima iwe baada ya tarehe ya kuanza kwa mzunguko.',
    'Group and cycle settings saved.': 'Mipangilio ya kikundi na mzunguko imehifadhiwa.', 'Member details updated.': 'Taarifa za mwanachama zimesasishwa.',
    'There are no valid new members to import.': 'Hakuna wanachama wapya wenye taarifa sahihi za kuingiza.',
    'The CSV needs a header row and at least one member row.': 'Faili la CSV linahitaji vichwa vya safu na angalau mwanachama mmoja.',
    'Could not find the first worksheet in this workbook.': 'Haikuweza kupata jedwali la kwanza kwenye faili hili.',
    'This does not look like a valid .xlsx workbook.': 'Faili hili la .xlsx halionekani kuwa sahihi.',
    'Could not read an Excel workbook sheet.': 'Haikuweza kusoma jedwali la Excel.',
    'This browser cannot unpack the Excel file. Save it as CSV and try again.': 'Kivinjari hiki hakiwezi kusoma faili hili la Excel. Hifadhi kama CSV ujaribu tena.',
    'Current projections update as records change.': 'Makadirio hubadilika kadiri rekodi zinavyosasishwa.',
    'A fine is a group record. Recording the fine itself does not change the cash balance; only a fine payment does.': 'Kurekodi faini hakubadili salio. Salio hubadilika tu faini ikilipwa.',
    'Payment method': 'Njia ya malipo', 'Search transactions': 'Tafuta miamala', 'All amounts shown in Tanzanian shillings.': 'Kiasi chote ni kwa shilingi za Tanzania.'
  };

  Object.assign(words, {
    'Record a contribution': 'Rekodi mchango', 'Record a fine payment': 'Rekodi malipo ya faini', 'MEMBER PROFILE': 'TAARIFA ZA MWANACHAMA',
    'LOAN APPROVAL': 'IDHINI YA MKOPO', 'LOAN COLLECTION': 'MAREJESHO YA MKOPO', 'CASH OUT': 'FEDHA ZILIZOTOKA',
    'FINE ASSESSMENT': 'KUTOA FAINI', 'FINE COLLECTION': 'MALIPO YA FAINI', 'PLANNING ESTIMATE': 'MAKADIRIO YA MIPANGO',
    'Import members from a spreadsheet': 'Ingiza wanachama kutoka kwenye jedwali', 'Could not read this spreadsheet.': 'Haikuweza kusoma jedwali hili.',
    'The CSV needs a header row and at least one member row.': 'Faili la CSV linahitaji vichwa vya safu na angalau mwanachama mmoja.',
    'There are no valid new members to import.': 'Hakuna wanachama wapya wenye taarifa sahihi za kuingiza.',
    'No matching members.': 'Hakuna mwanachama aliyepatikana.', 'No loans match this filter.': 'Hakuna mkopo unaolingana na kichujio hiki.',
    'No fines match this filter.': 'Hakuna faini inayolingana na kichujio hiki.', 'No transactions match those filters.': 'Hakuna muamala unaolingana na vichujio hivi.',
    'Enter an amount up to the remaining loan balance.': 'Weka kiasi kisichozidi deni la mkopo lililobaki.',
    'Enter an amount up to the remaining fine balance.': 'Weka kiasi kisichozidi deni la faini lililobaki.',
    'Enter a valid member and amount.': 'Weka mwanachama na kiasi sahihi.', 'Enter a valid member, plan and amount.': 'Weka mwanachama, ratiba na kiasi sahihi.',
    'Share-out date must be after the cycle start date.': 'Tarehe ya mgao lazima iwe baada ya tarehe ya kuanza kwa mzunguko.',
    'Group and cycle settings saved.': 'Mipangilio ya kikundi na mzunguko imehifadhiwa.', 'Member details updated.': 'Taarifa za mwanachama zimesasishwa.',
    'You have been signed out': 'Umetoka kwenye akaunti', 'Upcoming': 'Inayofuata', 'Treasurer': 'Mweka hazina', 'Secretary': 'Katibu',
    'VICOBA': 'VICOBA', 'Upatu': 'Upatu', 'Chama cha Hisa': 'Chama cha Hisa', 'Savings group': 'Kikundi cha akiba',
    'SACCO': 'SACCO', 'Association': 'Chama', 'Workplace group': 'Kikundi cha kazini', 'Family / community group': 'Kikundi cha familia au jamii',
    'Student / College Chama': 'Chama cha wanafunzi', 'Dar es Salaam, Tanzania': 'Dar es Salaam, Tanzania',
    'Kikundi cha Uwekezaji Umoja': 'Umoja Investment Group', 'Mzunguko wa muda mrefu wa Umoja': 'Umoja long-term cycle',
    'Hisa za kila mwezi': 'Monthly share', 'Ada ya uendeshaji wa kikundi': 'Group running fee', 'Mfuko wa ustawi': 'Welfare fund',
    'Not yet approved for payout': 'Bado haujaidhinishwa kutolewa', 'Pro rata by paid-up member capital': 'Pro rata by paid-up member capital',
    'Chagua lugha': 'Switch language', 'Previous page': 'Ukurasa uliopita', 'Next page': 'Ukurasa unaofuata',
    'Share-out': 'Mgao', 'Operating fee': 'Ada ya uendeshaji', 'Contribution': 'Mchango', 'Contributions': 'Michango',
    'Meeting session': 'Kikao cha leo', 'Kikao cha Leo': 'Meeting Mode', 'Meeting Mode': 'Kikao cha Leo',
    'Record meeting session': 'Rekodi kikao cha leo', 'Attendance': 'Mahudhurio', 'Present': 'Yupo', 'Absent': 'Hayupo',
    'Save meeting records': 'Hifadhi rekodi za kikao', 'Meeting summary': 'Muhtasari wa kikao', 'Batch collection': 'Makusanyo ya pamoja',
    'WhatsApp Receipt': 'Stakabadhi ya WhatsApp', 'Share via WhatsApp': 'Tuma WhatsApp', 'Copy message': 'Nakili ujumbe',
    'Official Receipt': 'Stakabadhi Rasmi', 'Receipt copied to clipboard!': 'Stakabadhi imenakiliwa!',
    'Loan Guarantors': 'Wadhamini wa Mkopo', 'First guarantor': 'Mdhamini wa kwanza', 'Second guarantor': 'Mdhamini wa pili',
    'Select guarantor': 'Chagua mdhamini', 'Guarantors must have active capital.': 'Wadhamini lazima wawe na hisa hai.',
    'Welfare Fund': 'Mfuko wa Jamii', 'Disburse welfare grant': 'Toa msaada wa jamii', 'Welfare assistance': 'Msaada wa jamii',
    'Hospital / medical': 'Matibabu ya hospitali', 'Bereavement / funeral': 'Msiba na rambirambi', 'Maternity': 'Uzazi',
    'Single Operator Mode': 'Mtindo wa Mhudumu Mmoja', 'Multi-Officer Approval': 'Idhini ya Viongozi Watatu',
    'SQLite Backend Live': 'Seva ya SQLite Ipo Hewani', 'Data is securely stored in SQLite': 'Data imehifadhiwa salama kwenye SQLite',
    'Saved to SQLite database!': 'Imehifadhiwa kwenye database ya SQLite!',
    'Expenses': 'Matumizi', 'Loan': 'Mkopo', 'Fine': 'Faini', 'Payment': 'Malipo', 'Search': 'Tafuta',
    'Reference / note': 'Namba ya kumbukumbu au maelezo', 'Meeting resolution / minutes ref': 'Namba ya uamuzi au kumbukumbu ya kikao',
    'Reference / receipt': 'Kumbukumbu au risiti', 'Plan': 'Ratiba', 'Date joined': 'Tarehe alipojiunga', 'Notes': 'Maelezo',
    'View all': 'Ona yote', 'Record': 'Rekodi', 'Upcoming this week': 'Inayotarajiwa wiki hii', 'Interest': 'Riba',
    'Cycle & share-out': 'Mzunguko na mgao', 'CURRENT CYCLE': 'MZUNGUKO WA SASA', 'TOTAL': 'JUMLA', 'BORROWER': 'ALIYEKOPA',
    'Lugha': 'Language', 'Chagua lugha': 'Switch language', 'English': 'English',
    'filename downloaded': 'faili limepakuliwa', 'Record a contribution': 'Rekodi mchango',
    'Record a fine payment': 'Rekodi malipo ya faini', 'Record a contribution': 'Rekodi mchango',
    'Expense description': 'Maelezo ya matumizi', 'Paid by': 'Imelipwa kwa njia ya',
    'All active members are up to date.': 'Wanachama wote hai wamelipa kwa sasa.',
    'Could not read this spreadsheet.': 'Haikuweza kusoma jedwali hili.',
    'Selected': 'Imechaguliwa', 'ready to review': 'tayari kukaguliwa',
    'GROUP MONEY · CLEARLY': 'FEDHA ZA KIKUNDI · KWA UWAZI', 'Group finances,': 'Hesabu za kikundi,', 'clear at every step.': 'wazi kwa kila hatua.',
    'Getting your saved records ready on this device…': 'Tunaandaa taarifa ulizohifadhi kwenye kifaa hiki…',
    'Opening records saved on this device…': 'Tunafungua taarifa zilizohifadhiwa kwenye kifaa hiki…',
    'Preparing a sample workspace…': 'Tunaandaa mfano wa app kukuonyesha inavyofanya kazi…',
    'Checking the saved records before continuing…': 'Tunakagua taarifa za zamani kabla ya kuendelea…',
    'Records are stored in this browser': 'Taarifa zinahifadhiwa kwenye kivinjari hiki',
    'GROUP SUMMARY': 'MUHTASARI WA KIKUNDI', 'Your records': 'Rekodi zako', 'Getting them ready': 'Zinaandaliwa kufunguka',
    'Open ChamaBook': 'Inafungua ChamaBook', 'Records and backups': 'Data na nakala', 'DATA CARE': 'UTUNZAJI WA TAARIFA',
    'Saved on this device': 'Imehifadhiwa hapa', 'Not saved yet': 'Bado haijahifadhiwa', 'Save problem': 'Hifadhi imekwama', 'Check data': 'Kagua data',
    'Download full backup': 'Pakua nakala kamili', 'Restore a backup': 'Rejesha nakala', 'Close': 'Funga'
  });
  const reverse = Object.fromEntries(Object.entries(words).map(([en, sw]) => [sw, en]));
  let language = 'sw';
  try { language = localStorage.getItem(KEY) || 'sw'; } catch { /* Storage may be disabled; the interface still opens in Kiswahili. */ }
  let queued = false;

  function translateString(text, target = language) {
    const table = target === 'sw' ? words : reverse;
    const trimmed = text.trim();
    const translated = table[trimmed];
    if (translated) return text.replace(trimmed, translated);
    if (target === 'sw') {
      const milestone = trimmed.match(/^Year (\d+)$/i);
      if (milestone) return `Mwaka ${milestone[1]}`;
      const uppercaseYears = trimmed.match(/^YEAR (\d+) OF (\d+)$/i);
      if (uppercaseYears) return `MWAKA ${uppercaseYears[1]} KATI YA ${uppercaseYears[2]}`;
      const contribution = trimmed.match(/^(.+) contribution recorded for (.+)\.$/);
      if (contribution) return `Mchango wa ${contribution[2]} wa ${contribution[1]} umeandikwa.`;
      const loanRecorded = trimmed.match(/^Loan (.+) recorded\. Estimated interest: (.+)\.$/);
      if (loanRecorded) return `Mkopo ${loanRecorded[1]} umeandikwa. Riba inayokadiriwa: ${loanRecorded[2]}.`;
      const repaymentRecorded = trimmed.match(/^Repayment recorded: (.+) interest and (.+) principal\.$/);
      if (repaymentRecorded) return `Marejesho yameandikwa: riba ${repaymentRecorded[1]}, mtaji ${repaymentRecorded[2]}.`;
      const expense = trimmed.match(/^(.+) expense recorded\.$/);
      if (expense) return `Matumizi ya ${expense[1]} yamerekodiwa.`;
      const fine = trimmed.match(/^(.+) fine recorded for (.+)\.$/);
      if (fine) return `Faini ya ${fine[1]} imerekodiwa kwa ${fine[2]}.`;
      const finePayment = trimmed.match(/^(.+) fine payment recorded\.$/);
      if (finePayment) return `Malipo ya faini ya ${finePayment[1]} yamerekodiwa.`;
      const addedMember = trimmed.match(/^(.+) added to the group\.$/);
      if (addedMember) return `${addedMember[1]} ameongezwa kwenye kikundi.`;
      const plan = trimmed.match(/^(.+) plan added\.$/);
      if (plan) return `Ratiba ya ${plan[1]} imeongezwa.`;
      const imported = trimmed.match(/^(\d+) member records imported\.$/);
      if (imported) return `Rekodi za wanachama ${imported[1]} zimeingizwa.`;
      const due = trimmed.match(/^(\d+) members have a contribution balance due\.$/);
      if (due) return `Wanachama ${due[1]} wana michango ambayo bado hawajalipa.`;
      const download = trimmed.match(/^(.+) downloaded$/i);
      if (download) return `Faili ${download[1]} limepakuliwa.`;
      const selectedFile = trimmed.match(/^Selected (.+) · ready to review$/i);
      if (selectedFile) return `Faili limechaguliwa: ${selectedFile[1]} · tayari kukaguliwa.`;
      const overdueCount = trimmed.match(/^(\d+) loans overdue$/i);
      if (overdueCount) return `Mikopo ${overdueCount[1]} imechelewa`;
      const loanCount = trimmed.match(/^(\d+) loans?$/i);
      if (loanCount) return `Mikopo ${loanCount[1]}`;
      const importReview = trimmed.match(/^(\d+) rows detected · (\d+) ready · (\d+) duplicates · (\d+) missing name\. Only ready records will be imported\.$/i);
      if (importReview) return `Mistari ${importReview[1]} imepatikana · ${importReview[2]} iko tayari · ${importReview[3]} inajirudia · ${importReview[4]} haina jina. Mistari iliyo tayari pekee ndiyo itaingizwa.`;
      const importButton = trimmed.match(/^Confirm import (\d+) members?$/i);
      if (importButton) return `Thibitisha kuingiza wanachama ${importButton[1]}`;
      const contributionHeader = trimmed.match(/^(.+) CONTRIBUTION PLAN · (.*)$/i);
      if (contributionHeader) {
        const cadence = ({ CUSTOM: 'MAALUM', MONTHLY: 'KILA MWEZI', WEEKLY: 'KILA WIKI', BIWEEKLY: 'KILA WIKI MBILI', QUARTERLY: 'KILA MIEZI MITATU', ANNUALLY: 'KILA MWAKA' })[contributionHeader[1].toUpperCase()] || contributionHeader[1];
        return `${cadence} · RATIBA YA MCHANGO · ${contributionHeader[2]}`;
      }
      const expectedTotal = trimmed.match(/^of (.+) expected this period$/i);
      if (expectedTotal) return `kati ya ${expectedTotal[1]} inayotarajiwa kipindi hiki`;
    }
    if (target === 'en') {
      return text
        .replace(/^Habari za asubuhi,\s*/, 'Good morning, ')
        .replace(/^Habari za mchana,\s*/, 'Good afternoon, ')
        .replace(/^Habari za jioni,\s*/, 'Good evening, ')
        .replace(/^Mwaka (\d+) kati ya (\d+)$/, 'Year $1 of $2')
        .replace(/^Inaonyesha (.+) kati ya (\d+) wanachama$/, 'Showing $1 of $2 members')
        .replace(/^MWAKA (\d+) KATI YA (\d+)$/i, 'YEAR $1 OF $2')
        .replace(/^Mwaka (\d+)$/, 'Year $1')
        .replace(/^Mikopo (\d+) imechelewa$/i, '$1 loans overdue')
        .replace(/^Mikopo (\d+)$/i, '$1 loans')
        .replace(/^(\d+) wanachama wameingizwa\.$/, '$1 members imported.')
        .replace(/^(\d+) miamala$/, '$1 transactions');
    }
    let result = text;
    result = result.replace(/^Good morning,\s*/i, 'Habari za asubuhi, ')
      .replace(/^Good afternoon,\s*/i, 'Habari za mchana, ')
      .replace(/^Good evening,\s*/i, 'Habari za jioni, ')
      .replace(/^Year (\d+) of (\d+)$/i, 'Mwaka $1 kati ya $2')
      .replace(/^Showing (.+) of (\d+) members$/i, 'Inaonyesha $1 kati ya $2 wanachama')
      .replace(/^(\d+) members imported\.$/i, '$1 wanachama wameingizwa.')
      .replace(/^(\d+) member records imported\.$/i, '$1 rekodi za wanachama zimeingizwa.')
      .replace(/^(\d+) transactions?$/i, '$1 miamala')
      .replace(/members have a balance due/gi, 'wanachama wana michango inayodaiwa')
      .replace(/members? imported/gi, 'wanachama wameingizwa')
      .replace(/payment due/gi, 'mchango unadaiwa')
      .replace(/still due/gi, 'bado inadaiwa')
      .replace(/total remaining/gi, 'jumla ya deni lililobaki')
      .replace(/is now active/gi, 'sasa ni hai')
      .replace(/is now paused/gi, 'amesitishwa')
      .replace(/just now/gi, 'sasa hivi')
      .replace(/this month/gi, 'mwezi huu')
      .replace(/this cycle/gi, 'mzunguko huu')
      .replace(/due date/gi, 'tarehe ya kulipa')
      .replace(/Operating fee/gi, 'Ada ya uendeshaji')
      .replace(/Member capital/gi, 'Hisa za mwanachama')
      .replace(/Welfare fund/gi, 'Mfuko wa ustawi')
      .replace(/Loan repayment/gi, 'Marejesho ya mkopo')
      .replace(/Loan disbursement/gi, 'Mkopo uliotolewa')
      .replace(/Fine payment/gi, 'Malipo ya faini')
      .replace(/Fine assessed/gi, 'Faini iliyotolewa')
      .replace(/Interest collected/gi, 'Riba iliyokusanywa')
      .replace(/Interest earned/gi, 'Riba iliyopatikana')
      .replace(/Member ID/gi, 'Namba ya mwanachama')
      .replace(/Search transactions/gi, 'Tafuta miamala')
      .replace(/Contribution plan/gi, 'Ratiba ya mchango')
      .replace(/This month ·/gi, 'Mwezi huu ·')
      .replace(/This period ·/gi, 'Kipindi hiki ·')
      .replace(/members/gi, 'wanachama')
      .replace(/transactions/gi, 'miamala');
    return result;
  }

  function apply() {
    document.documentElement.lang = language;
    const title = language === 'sw' ? 'ChamaBook — Fedha za kikundi, kwa uwazi' : 'ChamaBook — Group finance, clearly managed';
    document.title = title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = language === 'sw'
      ? 'ChamaBook husaidia viongozi wa vikundi kufuatilia michango, mikopo, matumizi na mgao kwa uwazi.'
      : 'ChamaBook helps group officials manage contributions, loans, expenses, and share-outs in one place.';
    const tree = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = tree.nextNode())) {
      const parent = node.parentElement;
      if (!parent || parent.closest('script,style,textarea,[contenteditable],#sidebarGroupName,#breadcrumbGroup,#shareoutCycleName,.member-cell,.member-name-wrap')) continue;
      const next = translateString(node.data);
      if (next !== node.data) node.data = next;
    }
    document.querySelectorAll('[placeholder],[aria-label],[title]').forEach(element => {
      for (const attribute of ['placeholder', 'aria-label', 'title']) {
        if (element.hasAttribute(attribute)) element.setAttribute(attribute, translateString(element.getAttribute(attribute)));
      }
    });
    const chooser = document.getElementById('languageSelect');
    if (chooser && chooser.value !== language) chooser.value = language;
  }

  function scheduleApply() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; apply(); });
  }

  const chooser = document.getElementById('languageSelect');
  if (chooser) chooser.addEventListener('change', () => {
    language = chooser.value === 'en' ? 'en' : 'sw';
    try { localStorage.setItem(KEY, language); } catch { /* Language choice remains active for this tab. */ }
    apply();
    window.dispatchEvent(new Event('chama:languagechange'));
  });
  new MutationObserver(scheduleApply).observe(document.body, { childList: true, subtree: true });
  window.ChamaI18n = { get lang() { return language; }, apply, translate: text => translateString(text) };
  apply();
})();
