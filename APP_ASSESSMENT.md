# ChamaBook: ukaguzi na maboresho ya raundi tano

**Tarehe:** 27 Septemba 2026  
**Aina ya ukaguzi:** ukaguzi wa prototype na marekebisho ya msimbo. Huu si utafiti wa matumizi uliofanywa na wanachama/viongozi halisi, si ukaguzi huru wa usalama, wala uthibitisho wa usahihi wa kisheria au uhasibu.

## Raundi tano nilizopitia

| Raundi | Eneo | Kilichoonekana | Kilichorekebishwa |
|---|---|---|---|
| 1 | Uaminifu wa skrini ya mwanzo | Grafu ilitumia namba zilizozalishwa kwa fomula badala ya miamala. Kadi za dashboard zilionyesha ongezeko la hisa na riba ya mwezi ambazo hazikutokana na rekodi. Hili linaweza kumfanya mtunza fedha aamini namba zisizo sahihi. | Grafu sasa hukusanya miamala ya hisa na riba kwa mwezi. Namba za mwezi kwenye kadi sasa zinatoka kwenye daftari la miamala. Lebo za mhimili wa grafu zinafuata ukubwa wa data. |
| 2 | Michango na matumizi rahisi | Fomu ya michango ingeweza kurekodi mchango wa mpango uleule mara mbili kwa mwanachama ndani ya kipindi kilekile. | Mfumo sasa hukagua ratiba ya mwanachama na kukataa rekodi inayojirudia ya mpango huo katika kipindi hicho. |
| 3 | Mikopo na ufuatiliaji | Mikopo mipya haikuwekwa “imechelewa” yenyewe baada ya tarehe ya marejesho. Orodha na takwimu zingeweza kupitwa na wakati; CSV pia ilitumia hali iliyohifadhiwa ya zamani. | Hali ya mkopo sasa huhesabiwa kutokana na salio na tarehe ya marejesho, na hutumika kwenye dashboard, vichujio, jedwali na CSV. |
| 4 | Tarehe na matumizi ya simu | `toISOString()` hutegemea UTC na inaweza kuonyesha siku tofauti na tarehe ya Tanzania katika baadhi ya saa. Tarehe ya mkopo ya mwanzo ilitumia njia hiyo. | Tarehe za leo, majina ya nakala na tarehe ya marejesho ya mfano sasa hutumia tarehe ya kifaa moja kwa moja. Mipangilio ya skrini ndogo na kupunguza mwendo wa uhuishaji ipo; bado inahitaji kujaribiwa kwenye simu za kawaida za watumiaji. |
| 5 | Utunzaji wa data na soko | Nakala ya kivinjari inasaidia demo, lakini haina akaunti, ruhusa, seva, usimbaji au usawazishaji wa watumiaji wengi. Bidhaa za Tanzania hutangaza zaidi huduma za simu, taarifa kwa wanachama, idhini, ujumbe, ukaguzi na miunganisho ya malipo. | Nimeacha maelezo yanayoonyesha wazi kuwa hii ni demo, nimeandika tathmini ya soko na mahitaji ya kutimiza kabla ya kuuza kama mfumo wa fedha. Faili la app na ripoti ziko pamoja. |

## Tathmini ya soko la Tanzania

Bidhaa za umma kama [Pamoja](https://pamoja.tz/en), [Vikundi by BJP Technologies](https://bjptechnologies.co.tz/products/vikundi/), [SOMA ya SCCULT](https://sccult.tz/soma), na [ZIMA](https://www.zima.co.tz/products/saccos-management-system) zinaonyesha kuwa soko lina bidhaa zinazotaja mikopo, michango, usimamizi wa wanachama, ripoti, idhini, kumbukumbu za ukaguzi na wakati mwingine njia za simu au malipo. Hizi ni taarifa za watoa huduma kwenye tovuti zao; sijazijaribu kwa vitendo wala siwezi kuthibitisha madai yote ya vipengele au ubora wake. Chanzo cha [TCDC cha mwaka 2024](https://www.ushirika.go.tz/uploads/SACCOS_ANNUL_PERFOMANCE_REPORT_2024_%282%29.pdf_Social_Media.pdf) pia kinaweka mifumo ya kidijitali katika mazingira ya changamoto za gharama, ujuzi wa TEHAMA na elimu ya fedha.

ChamaBook ina nafasi nzuri kama bidhaa nyepesi ya kuanzia kwa VICOBA, Upatu na vikundi vidogo: Kiswahili rahisi kwanza, Kiingereza kwa hiari, na mtiririko unaoeleweka kwa mtunza fedha. Hata hivyo, lugha na mwonekano pekee haviitofautishi vya kutosha. Tofauti inayoweza kujengwa ni kuanza kwa vikundi vidogo kwa bei na mafunzo yanayofaa, pamoja na uwazi kwa wanachama na ulinzi thabiti wa taarifa. Hilo linahitaji kuthibitishwa kwa mazungumzo na watumiaji na utafiti wa bei; halijathibitishwa na ukaguzi huu.

## Alama za ukaguzi

- **Urahisi:** mtiririko wa mwanachama, mchango, mkopo, faini, matumizi na daftari upo. Lugha ya msingi ni Kiswahili; Kiingereza kinaweza kuchaguliwa. Hatujathibitisha urahisi wake kwa majaribio ya watu halisi.
- **Muonekano na simu:** muundo unaendana na skrini ndogo, una menyu ya simu na hupunguza mwendo kwa wanaopendelea hivyo. Ukaguzi wa kuona kwenye simu halisi na vipimo vya kasi bado vinahitajika.
- **Uaminifu wa hesabu:** namba za mwenendo wa grafu na kadi za mwezi sasa zinatokana na miamala. Riba ya mkopo ni makadirio ya kiwango tambarare cha mwaka na mgao ni makadirio; vikundi lazima vithibitishe kanuni zao. Prototype hii haijapitiwa kama daftari rasmi la uhasibu.
- **Data na faragha:** kuna hifadhi ya kivinjari, hali ya hifadhi, kujaribu kuhifadhi tena, na kupakua/kurejesha nakala. Hivi havitoi ulinzi wa akaunti, usimbaji, nakala ya seva au usawazishaji. Tumia data ya kubuni pekee.
- **Soko:** bidhaa za hapa tayari zinaeleza baadhi ya vipengele vilivyopo hapa na vipengele vya ziada. ChamaBook haiko tayari kuuzwa kama huduma inayoshikilia fedha au taarifa halisi za wanachama.

## Vizuizi kabla ya matumizi au mauzo ya mfumo halisi

1. Weka hifadhidata ya seva, akaunti salama, ruhusa kwa kila kikundi na ulinzi wa taarifa wakati wa kutumwa na kuhifadhiwa.
2. Tengeneza historia isiyofutika ya miamala, marekebisho kwa njia ya reversal yenye sababu, uthibitisho wa mtumiaji na idhini za hatua nyeti.
3. Weka nakala za seva, ufuatiliaji wa afya ya huduma, na jaribio la kurejesha data baada ya hitilafu.
4. Thibitisha malipo kwa mitandao ya simu kupitia watoa huduma rasmi; usionyeshe M-Pesa/Airtel kama miunganisho hai wakati ni lebo za kuingiza rekodi tu.
5. Ongeza akaunti/taarifa za wanachama, risiti, ratiba halisi za marejesho na upatanisho wa fedha kulingana na kikundi lengwa.
6. Fanya majaribio ya matumizi na viongozi/wanachama wa Tanzania kwenye simu za Android za kawaida na mtandao dhaifu. Pima kama wanaweza kuongeza mwanachama, kurekodi mchango, kurejesha nakala na kuelewa riba/mgao.
7. Kabla ya kulenga SACCOS, pata ushauri wa wataalamu wa ushirika na uthibitishe masharti ya taarifa na miunganisho husika. Usidai ulinganifu wa BOT/TCDC bila uthibitisho.

## Ukaguzi wa kiufundi uliofanywa

- Nimepitia njia za kuhifadhi/kurejesha data, kuingiza CSV/XLSX, michango, mikopo, marejesho, hesabu za mgao, grafu, tarehe na export.
- Nimekagua sintaksia ya JavaScript baada ya marekebisho. Hili si jaribio kamili la browser, hesabu za fedha au usalama.
- Tumia `index.html` kwa demo na `README.md` kwa maelekezo. `chamabook-app.zip` ni toleo linaloweza kusambazwa la demo; si mfumo wa production.

## Maboresho ya urahisi na muonekano — 29 Septemba 2026

- Utafutaji wa skrini ndogo sasa una kitufe cha kufungua na kuweka kishale kwenye sehemu ya kutafuta. Kutafuta hakuhamishi mtumiaji kwenda ukurasa wa wanachama baada ya kila herufi; bonyeza Enter kuonyesha matokeo.
- Menyu ya pembeni sasa inaweza kufichwa kwenye kompyuta kwa kitufe chenye maelezo ya Kiswahili/English na kufunguliwa tena. Kwenye simu, kitufe cha menyu sasa kinafungua na kufunga paneli, na Escape huifunga.
- Nimeongeza ukubwa wa maandishi ya fomu, jedwali na vitufe, na kuongeza eneo la kugusa kwa vitufe. Hii inalenga kusomeka vizuri zaidi kwenye simu.
- Alama ya keyboard focus sasa ina rangi inayoonekana kwenye vitufe na sehemu za kujaza.
- Nimeweka majina ya vitendo wazi zaidi: “Record contribution” badala ya “Record payment” kwenye ukurasa wa mwanzo.
- Muonekano wa ChamaBook bado unatumia kijani cha kikundi na pete ya mzunguko kama alama kuu; nimeboresha usomaji bila kuongeza mapambo yanayoshindana na rekodi.
- Sikuweza kuthibitisha mabadiliko kwa screenshot ya browser: sera ya browser ya mazingira haya imezuia kufungua upya faili ya `file://`. Marekebisho yamehifadhiwa kwenye source; ukifungua upya `index.html` mwenyewe utaona matokeo. Ukaguzi wa sintaksia ya JavaScript unafanywa kabla ya kusambaza ZIP.

## Ukaguzi wa ziada wa chanzo — 29 Septemba 2026

Ukaguzi huu ulifanywa kwa kusoma HTML, CSS na JavaScript bila kufungua faili kwenye browser. Nimeondoa madai ambayo demo haitekelezi: ukurasa wa miamala sasa unaeleza kuwa jina la aliyeingiza ni la mfano na akaunti hazijawashwa; footer ya daftari inasema marekebisho ya miamala hayapo. Takwimu za riba na faini sasa zinaeleza kuwa ni jumla za rekodi, si takwimu zilizochujwa kwa mzunguko. Kwenye simu zenye upana wa hadi px 400, sehemu ya utafutaji ilipanuliwa ili ibaki na nafasi dhidi ya vitufe vya lugha/hali.

Haya ni marekebisho ya uaminifu wa maandishi na msimbo. Bado sijapata picha ya ukurasa unao-run, kwa hiyo mpangilio unaoonekana, kontrasti halisi na matumizi kwa kugusa havijathibitishwa kwa macho.

## UI workbench pass — 29 Septemba 2026

- Nimeweka alama ya taarifa za mfano kwenye top bar ya kompyuta na kubadili maelezo ya mtunza fedha ili yasioneshe akaunti iliyothibitishwa.
- Nimeondoa mistari ya sparklines iliyokuwa ya mapambo na haikutokana na miamala. Inaweza kuonekana kama mwenendo halisi wa fedha.
- Nimeimarisha nafasi, vichwa, kadi, vitufe, focus ya keyboard, hover ya jedwali na dialog; kwenye simu nimehifadhi kadi mbili kwa mstari na kupunguza vitu vya top bar vinavyobana upana.
- Nimeondoa kauli ya “audit trail” kwenye maelezo ya English kwa sababu demo haina historia ya ukaguzi.
- Huu ni uboreshaji wa CSS/HTML na ukaguzi wa source. Nimehakiki sintaksia ya JavaScript; sijaona rendering ya browser kwa screenshot katika mazingira haya.
- Kwenye michango, mtumiaji sasa anaweza kuchagua ratiba anayotaka kuona. Kadi za makusanyo, idadi ya wanaodaiwa na jedwali vinabadilika kufuata mpango huo; kitufe cha kurekodi humfungulia mpango uliochaguliwa.
- Mchango wa sehemu sasa unahesabiwa kwa ratiba na kipindi chake. Salio la mwanachama linaendelea kuonekana hadi kiasi cha mpango kilipwe; fomu inaonyesha salio na inazuia kiasi kuzidi salio. Miamala mipya huhifadhi namba ya ratiba na kipindi, na taarifa hizi zinaingia pia kwenye CSV.
- Nimeondoa vidhibiti vya mapambo visivyokuwa na kitendo (gia/nukta tatu na avatar kama kitufe). Avatar inaelezwa kuwa mtunza fedha wa mfano; vitufe vilivyobaki vina kitendo kinachotambulika.
- Nimekaza mpangilio wa top bar kwenye upana wa tablet (px 681–890) na kuongeza nafasi inayohitajika wakati search ya simu imefunguliwa. Hii imetokana na ukaguzi wa breakpoints za CSS; bado haijathibitishwa kwa screenshot.
- Nimeongeza tafsiri za Kiswahili kwa ujumbe unaotokea baada ya kutoa mkopo au kurekodi marejesho, ili ujumbe wa mafanikio nao ufuate lugha iliyochaguliwa.
- Nimepita maandishi ya HTML dhidi ya kamusi ya Kiswahili: maandishi yote ya kawaida yanayoonekana kwenye ukurasa yana tafsiri. Nimeongeza pia tafsiri mbili za ujumbe wa mkopo/marejesho unaojengwa kwa kiasi cha fedha.
- Nimeongeza kontrasti ya lebo, placeholder, breadcrumbs, maelezo ya kadi na footer. Rangi kuu za kijani zimebaki; maandishi ya usaidizi sasa yana utofauti mkubwa zaidi kwa kusoma.
- Nimeongeza kiungo cha keyboard cha kuruka menyu kwenda kwenye maudhui na `aria-current` kwa ukurasa uliochaguliwa kwenye navigation.
- Nimesahihisha ujumbe wa mafanikio ya mchango ili Kiswahili kisomeke kwa mpangilio wa kawaida, na kuongeza rangi ya focus inayoonekana kwenye menyu ya kijani kwa watumiaji wa keyboard.
- Nimepanua vitufe vya menyu/search/hali ya data na vitufe vya mstari wa jedwali kwenye simu hadi maeneo makubwa zaidi ya kugusa. Nimebadili nafasi ya search inayofunguka ili isifunikane na lugha au hali ya kuhifadhi.
- Kwenye fomu ndefu, kichwa cha modal na vitufe vya mwisho sasa hubaki karibu wakati wa kusogeza. Hii inalenga simu zenye urefu mdogo au keyboard inayofunika sehemu ya chini.
