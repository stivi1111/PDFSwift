/** Textele în română ale celor 24 de pagini. Vezi en.js pentru criteriu. */
module.exports = {
  lingua: 'Română',

  casa: {
    titolo: 'Instrumente PDF gratuite pentru conversie și comprimare',
    descrizione: 'Convertește PDF în Word, Word în PDF, Excel și PowerPoint, unește, împarte, comprimă și editează fișiere PDF. Gratuit, fără cont, fișierele se șterg imediat după.',
  },

  etichette: {
    passi: 'Cum se face',
    faq: 'Întrebări frecvente',
    altri: 'Toate cele 24 de instrumente PDF',
    apri: 'Deschide instrumentul',
    browserBadge: 'Rulează în browserul tău — fișierul nu părăsește dispozitivul',
    serverBadge: 'Procesat pe serverul nostru și șters imediat după',
  },

  strumenti: {
    'pdf-to-word': {
      titolo: 'PDF în Word — Gratuit, fără înregistrare',
      descrizione: 'Transformă un PDF într-un document Word editabil. Păstrează titluri, tabele și imagini. Gratuit, până la 100 MB.',
      h1: 'Convertește PDF în Word',
      intro: 'Readuce un PDF la un fișier <strong>.docx</strong> editabil, reconstruind paragrafe, tabele, titluri și imagini în loc să lipească fiecare pagină ca fotografie. Antetele, subsolurile și numerotarea sunt recunoscute și mutate în antetul Word, în loc să ajungă în mijlocul textului.',
      passi: [
        'Trage PDF-ul pe care vrei să îl editezi sau apasă ca să îl alegi de pe dispozitiv.',
        'Așteaptă conversia: un document de 10 pagini durează câteva secunde, o carte de 200 de pagini aproximativ un minut.',
        'Descarcă fișierul .docx și deschide-l în Word, Google Docs, LibreOffice sau Pages.',
      ],
      faq: [
        { d: 'Se păstrează așezarea în pagină?', r: 'Textul, tabelele, titlurile, listele și imaginile trec. Graficele vectoriale complexe devin imagini, pentru că în Word nu ar fi oricum editabile.' },
        { d: 'Funcționează cu un PDF scanat?', r: 'Nu. Dacă PDF-ul este o fotografie a paginilor fără strat de text, nu există nimic de extras, iar documentul Word va conține doar imaginile. Nu facem recunoaștere de caractere.' },
        { d: 'Cât de mare poate fi fișierul?', r: 'Până la 100 MB și până la 400 de pagini. Pentru cărți mai lungi, împarte întâi PDF-ul și convertește părțile.' },
      ],
    },

    'word-to-pdf': {
      titolo: 'Word în PDF — Gratuit și fidel originalului',
      descrizione: 'Convertește .docx sau .doc într-un PDF curat care arată la fel peste tot. Gratuit, până la 100 MB.',
      h1: 'Convertește Word în PDF',
      intro: 'Transformă un document Word într-un PDF care arată identic pe orice dispozitiv — exact motivul pentru care trimiți un PDF în loc de un .docx. Întreruperile de pagină, fonturile, tabelele și imaginile rămân unde le-ai pus.',
      passi: [
        'Încarcă fișierul .docx sau .doc.',
        'Documentul este compus de LibreOffice, programul care citește fișierele Word cel mai fidel în afara Microsoft Office.',
        'Descarcă PDF-ul.',
      ],
      faq: [
        { d: 'Fonturile arată corect?', r: 'Fonturile obișnuite sunt instalate pe serverul nostru și se redau exact. Un font foarte neobișnuit poate fi înlocuit, ceea ce poate deplasa ușor așezarea: dacă asta contează, încorporează-l în .docx sau folosește fonturi standard.' },
        { d: 'Cuprinsul rămâne apăsabil?', r: 'Da, legăturile interne și semnele de carte supraviețuiesc conversiei.' },
        { d: 'Pot converti un fișier .doc vechi?', r: 'Da, acceptăm atât .docx modern, cât și formatul .doc mai vechi.' },
      ],
    },

    'pdf-to-excel': {
      titolo: 'PDF în Excel — Extrage tabele în .xlsx gratuit',
      descrizione: 'Scoate tabelele dintr-un PDF într-o foaie Excel reală, cu celule funcționale. Gratuit, fără cont.',
      h1: 'Convertește PDF în Excel',
      intro: 'Găsește tabelele dintr-un PDF și le reconstruiește ca celule reale de calcul, cu care poți sorta și calcula — nu o poză a unui tabel. Fiecare tabel găsit devine o foaie separată în .xlsx.',
      passi: [
        'Încarcă PDF-ul care conține tabelele.',
        'Se încearcă două metode: una rapidă care citește alinierea textului și una mai lentă care urmărește bordurile desenate. Rămâne rezultatul mai curat.',
        'Descarcă fișierul .xlsx și deschide-l în Excel, Numbers sau Google Sheets.',
      ],
      faq: [
        { d: 'Ce fac dacă spune că nu a găsit niciun tabel?', r: 'Se întâmplă când pagina nu are un tabel pe care detectorul nostru să îl recunoască, de obicei un tabel fără linii și cu spațiere neregulată. Eșuează spunând asta, în loc să îți dea un fișier stricat.' },
        { d: 'Supraviețuiesc celulele îmbinate?', r: 'De obicei da, la tabelele cu borduri desenate. Tabelele fără borduri și cu celule îmbinate sunt cazul cel mai greu și pot ieși aplatizate.' },
        { d: 'Citește un tabel scanat?', r: 'Nu. O scanare nu are text de extras, doar pixeli.' },
      ],
    },

    'excel-to-pdf': {
      titolo: 'Excel în PDF — Gratuit, păstrează formatarea',
      descrizione: 'Convertește .xlsx, .xls sau .csv într-un PDF curat, cu formatarea intactă. Gratuit, fără înregistrare.',
      h1: 'Convertește Excel în PDF',
      intro: 'Tipărește foaia de calcul în PDF așa cum ar ieși din Excel, păstrând formatele numerice, culorile, bordurile și lățimea coloanelor. Util când trebuie să trimiți cifre pe care nimeni nu ar trebui să le poată modifica din greșeală.',
      passi: [
        'Încarcă fișierul .xlsx, .xls sau .csv.',
        'Fiecare foaie este așezată și împărțită în pagini.',
        'Descarcă PDF-ul.',
      ],
      faq: [
        { d: 'Sunt incluse toate foile?', r: 'Da, fiecare foaie din registru este redată în ordine.' },
        { d: 'Trec formulele?', r: 'Trec rezultatele. Un PDF nu are noțiunea de formulă, așa că vezi valoarea calculată.' },
        { d: 'Pot converti un CSV simplu?', r: 'Da, un CSV este așezat ca un tabel simplu.' },
      ],
    },

    'pdf-to-powerpoint': {
      titolo: 'PDF în PowerPoint — Convertește în .pptx gratuit',
      descrizione: 'Transformă paginile unui PDF în diapozitive PowerPoint editabile. Gratuit, până la 100 MB.',
      h1: 'Convertește PDF în PowerPoint',
      intro: 'Transformă fiecare pagină a unui PDF într-un diapozitiv al unei prezentări .pptx, păstrând textul în casete de text reale în loc să îl aplatizeze într-o imagine — deci poți edita în continuare ce scrie.',
      passi: [
        'Încarcă PDF-ul — funcționează cel mai bine cu o prezentare exportată în PDF.',
        'Fiecare pagină devine un diapozitiv.',
        'Descarcă .pptx și deschide-l în PowerPoint, Keynote sau Google Slides.',
      ],
      faq: [
        { d: 'Pot edita textul după?', r: 'Da. Textul ajunge în casete editabile, nu încorporat într-o poză.' },
        { d: 'Revin animațiile?', r: 'Nu. Un PDF nu înregistrează animații sau tranziții — informația s-a pierdut când prezentarea a fost exportată.' },
        { d: 'Dacă PDF-ul meu nu e o prezentare?', r: 'Funcționează oricum, dar o pagină A4 verticală transformată în diapozitiv orizontal va arăta ciudat. Instrumentul e gândit pentru prezentări.' },
      ],
    },

    'powerpoint-to-pdf': {
      titolo: 'PowerPoint în PDF — Convertor .pptx gratuit',
      descrizione: 'Convertește o prezentare PowerPoint într-un PDF pe care îl poate deschide oricine. Gratuit.',
      h1: 'Convertește PowerPoint în PDF',
      intro: 'Transformă o prezentare într-un PDF care se deschide la fel pe orice dispozitiv, fără fonturi lipsă și fără riscul ca cineva să îți modifice diapozitivele.',
      passi: [
        'Încarcă fișierul .pptx sau .ppt.',
        'Fiecare diapozitiv devine o pagină de PDF.',
        'Descarcă PDF-ul.',
      ],
      faq: [
        { d: 'Sunt incluse notele vorbitorului?', r: 'Nu, doar diapozitivele.' },
        { d: 'Ce se întâmplă cu videoclipurile din prezentare?', r: 'Un PDF nu poate reda video, așa că în locul lor rămâne un cadru fix.' },
        { d: 'Se păstrează proporțiile?', r: 'Da, o prezentare 16:9 produce pagini PDF 16:9.' },
      ],
    },

    'pdf-to-html': {
      titolo: 'PDF în HTML — Gratuit, păstrează așezarea',
      descrizione: 'Transformă un PDF într-o pagină web identică cu originalul, fonturi și așezare incluse. Gratuit.',
      h1: 'Convertește PDF în HTML',
      intro: 'Produce un singur fișier HTML care reproduce PDF-ul pagină cu pagină într-un browser, încorporând fonturile și imaginile ca rezultatul să arate bine fără fișiere alături.',
      passi: [
        'Încarcă PDF-ul.',
        'Paginile sunt convertite în HTML cu fonturile încorporate.',
        'Descarcă fișierul .html și deschide-l în orice browser.',
      ],
      faq: [
        { d: 'HTML-ul e destul de curat ca să îl editez de mână?', r: 'Nu prea. Conversia urmărește să semene cu PDF-ul, deci textul e poziționat la milimetru în loc să fie scris ca paragrafe simple. E făcut ca să fie văzut și publicat, nu editat de mână.' },
        { d: 'De ce e fișierul atât de mare?', r: 'Fonturile și imaginile sunt împachetate înăuntru, ca pagina să funcționeze singură, fără să depindă de ceva extern.' },
        { d: 'Pot să îl pun pe un site?', r: 'Da, e un fișier de sine stătător pe care îl poți încărca oriunde.' },
      ],
    },

    'html-to-pdf': {
      titolo: 'HTML în PDF — Convertește pagini web gratuit',
      descrizione: 'Transformă un fișier HTML într-un PDF compus de un motor de browser real. Gratuit, fără înregistrare.',
      h1: 'Convertește HTML în PDF',
      intro: 'Compune HTML-ul tău cu Chromium, motorul din spatele Chrome, deci PDF-ul iese cum arată pagina într-un browser: foi de stil, așezare și tot restul.',
      passi: [
        'Încarcă fișierul .html sau .txt.',
        'Pagina este compusă și împărțită în pagini A4.',
        'Descarcă PDF-ul.',
      ],
      faq: [
        { d: 'Aplică CSS-ul meu?', r: 'Da, stilurile din interiorul fișierului se aplică. Cele încărcate de la o adresă externă nu sunt aduse.' },
        { d: 'Se execută JavaScript?', r: 'Scripturile din fișier rulează înainte de captarea paginii, deci conținutul generat la încărcare apare.' },
        { d: 'Pot converti un site după adresă?', r: 'Nu cu acest instrument — salvează întâi pagina ca fișier HTML și încarc-o.' },
      ],
    },

    'markdown-to-pdf': {
      titolo: 'Markdown în PDF — Convertor .md gratuit',
      descrizione: 'Transformă Markdown într-un PDF bine compus, cu titluri, blocuri de cod și tabele. Gratuit.',
      h1: 'Convertește Markdown în PDF',
      intro: 'Ia un fișier Markdown și îl compune ca pe un document adevărat: titluri într-o ierarhie corectă, blocuri de cod cu spațiere fixă, tabele cu borduri, legături care rămân apăsabile.',
      passi: [
        'Încarcă fișierul .md, .markdown sau .txt.',
        'Markdown-ul este transformat într-un document stilizat și compus în PDF.',
        'Descarcă PDF-ul.',
      ],
      faq: [
        { d: 'Ce variantă de Markdown este acceptată?', r: 'Markdown standard plus extensiile obișnuite: tabele, blocuri de cod delimitate, liste de sarcini și text tăiat.' },
        { d: 'Funcționează imaginile?', r: 'Imaginile indicate printr-o adresă web sunt incluse. Cele care trimit la fișiere de pe calculatorul tău nu pot fi aduse.' },
        { d: 'Codul este colorat?', r: 'Blocurile de cod folosesc un font cu spațiere fixă pe fundal nuanțat; colorarea pe limbaj nu se aplică.' },
      ],
    },

    'compress-pdf': {
      titolo: 'Comprimă PDF — Reduce dimensiunea gratuit',
      descrizione: 'Micșorează un PDF cu trei niveluri de calitate. Măsurat: până la 40% mai mic. Gratuit.',
      h1: 'Comprimă un PDF',
      intro: 'Reduce dimensiunea unui PDF recodificând imaginile din el, cu trei niveluri ca să alegi tu compromisul în loc să accepți ce decide programul.',
      passi: [
        'Încarcă PDF-ul pe care vrei să îl micșorezi.',
        'Alege nivelul: <strong>Ușoară</strong> păstrează calitatea de tipar, <strong>Echilibrată</strong> este alegerea rezonabilă, <strong>Maximă</strong> dă cel mai mic fișier pentru ecran și e-mail.',
        'Descarcă PDF-ul comprimat.',
      ],
      faq: [
        { d: 'Cu cât se micșorează?', r: 'Măsurat pe un document real de 5 MB: cu aproximativ 19% la Ușoară, 34% la Echilibrată și 40% la Maximă. Un PDF făcut aproape numai din text are puțin de comprimat, unul plin de fotografii are foarte mult.' },
        { d: 'Textul devine neclar?', r: 'Nu. Textul și desenele vectoriale rămân clare la orice nivel — doar imaginile sunt recodificate.' },
        { d: 'Ce nivel aleg?', r: 'Echilibrată pentru aproape orice. Ușoară dacă documentul merge la tipar. Maximă doar dacă trebuie să încapă sub limita unui atașament.' },
      ],
    },

    'protect-pdf': {
      titolo: 'Protejează PDF cu parolă — AES-256 gratuit',
      descrizione: 'Blochează un PDF cu parolă și criptare AES-256 reală. Gratuit, fișierul e șters imediat după.',
      h1: 'Protejează un PDF cu parolă',
      intro: 'Criptează PDF-ul cu <strong>AES-256</strong>, același standard folosit pentru documentele clasificate, deci fără parolă fișierul nu se deschide deloc. Este criptare adevărată, nu un semnalizator pe care un cititor îl poate ignora.',
      passi: [
        'Încarcă PDF-ul pe care vrei să îl blochezi.',
        'Scrie parola care va fi necesară pentru a-l deschide.',
        'Descarcă fișierul protejat și transmite parola separat de document.',
      ],
      faq: [
        { d: 'Este criptare adevărată?', r: 'Da — AES-256. Multe instrumente care lucrează în browser doar setează un semnalizator „nu tipări" pe care orice cititor îl poate ignora. Aici fișierul este recriptat, deci conținutul e ilizibil fără parolă.' },
        { d: 'Dacă uit parola?', r: 'Nimeni nu o poate recupera, nici noi. Acesta e rostul criptării. Ține-o într-un loc sigur.' },
        { d: 'Se poate scoate mai târziu?', r: 'Da, cu instrumentul nostru Deblochează PDF — dar numai dacă știi parola.' },
      ],
    },

    'unlock-pdf': {
      titolo: 'Deblochează PDF — Scoate parola și restricțiile',
      descrizione: 'Scoate parola dintr-un PDF al tău ca să îl poți tipări, copia și edita. Gratuit, fără înregistrare.',
      h1: 'Deblochează un PDF',
      intro: 'Scoate parola și restricțiile de tipărire, copiere și editare dintr-un PDF, dând înapoi un fișier normal pe care îl poți folosi liber. Trebuie să știi parola actuală.',
      passi: [
        'Încarcă PDF-ul protejat.',
        'Introdu parola lui actuală.',
        'Descarcă fișierul deblocat.',
      ],
      faq: [
        { d: 'Deschide un PDF a cărui parolă nu o știu?', r: 'Nu, și nici nu e gândit pentru asta. Scoate protecția de pe documente pe care ai deja dreptul să le deschizi.' },
        { d: 'Scoate și limitele de tipărire și copiere?', r: 'Da. Odată înlăturată criptarea, dispar și semnalizatoarele de permisiuni.' },
        { d: 'Se schimbă conținutul?', r: 'Nu. Se înlătură doar stratul de protecție; paginile, textul și imaginile rămân neatinse.' },
      ],
    },

    'grayscale-pdf': {
      titolo: 'PDF în tonuri de gri — Alb-negru gratuit',
      descrizione: 'Transformă un PDF color în tonuri de gri ca să economisești cerneală. Textul rămâne clar.',
      h1: 'Convertește un PDF în tonuri de gri',
      intro: 'Transformă fiecare culoare din document în nuanțe de gri, ceea ce reduce consumul de cerneală color la tipărire și face mai uniforme documentele care par scanate. Textul rămâne text și rămâne clar.',
      passi: [
        'Încarcă PDF-ul color.',
        'Culorile sunt transformate în gri, iar textul și formele vectoriale rămân așa cum sunt.',
        'Descarcă PDF-ul în tonuri de gri.',
      ],
      faq: [
        { d: 'Transformă paginile în imagini?', r: 'Nu. E o scurtătură obișnuită la alte instrumente și face textul neclar și neselectabil. Aici textul rămâne text adevărat.' },
        { d: 'Pot recupera culorile?', r: 'Din fișierul gri nu: informația de culoare nu mai există. Păstrează originalul.' },
        { d: 'Face fișierul mai mic?', r: 'Adesea puțin, fiindcă griul ocupă mai puțin decât culoarea, dar e un efect secundar, nu scopul.' },
      ],
    },

    'pdf-to-markdown': {
      titolo: 'PDF în Markdown — .md gratuit pentru IA și Notion',
      descrizione: 'Transformă un PDF în Markdown curat pentru ChatGPT, Claude, Obsidian sau Notion. În browser.',
      h1: 'Convertește PDF în Markdown',
      intro: 'Extrage textul unui PDF ca Markdown curat, formatul pe care modelele lingvistice și aplicațiile de notițe îl citesc cel mai bine. Acest instrument rulează în întregime în browserul tău — documentul nu părăsește calculatorul.',
      passi: [
        'Trage PDF-ul.',
        'Textul este extras și structurat cu titluri și paragrafe Markdown.',
        'Descarcă fișierul .md și lipește-l unde ai nevoie.',
      ],
      faq: [
        { d: 'De ce Markdown pentru instrumentele de IA?', r: 'Duce cu el structura — titluri, liste, accentuări — în text simplu, deci modelul citește forma documentului în loc de un zid de cuvinte nediferențiate.' },
        { d: 'Fișierul meu este încărcat undeva?', r: 'Nu. Acest instrument rulează în browserul tău. Nu se trimite nimic nicăieri.' },
        { d: 'Păstrează imaginile?', r: 'Nu, doar textul. Markdown singur nu poate purta imagini încorporate.' },
      ],
    },

    'merge-pdf': {
      titolo: 'Unește PDF — Gratuit, direct în browser',
      descrizione: 'Unește mai multe PDF-uri într-unul, în ordinea aleasă. În browser, fișierele nu se încarcă nicăieri.',
      h1: 'Unește fișiere PDF',
      intro: 'Unește mai multe PDF-uri într-un singur document, în ordinea în care le adaugi. Rulează în întregime în browserul tău, deci fișierele nu se încarcă nicăieri — ceea ce contează când e vorba de contracte sau de rezultate medicale.',
      passi: [
        'Selectează sau trage toate PDF-urile pe care vrei să le unești.',
        'Sunt unite în ordinea în care apar în listă.',
        'Descarcă PDF-ul unit.',
      ],
      faq: [
        { d: 'Fișierele mele sunt încărcate pe un server?', r: 'Nu. Unirea se petrece în browser, iar fișierele rămân pe dispozitivul tău.' },
        { d: 'Câte pot uni deodată?', r: 'Câte poate ține dispozitivul tău în memorie. Câteva zeci de documente obișnuite nu sunt o problemă.' },
        { d: 'Supraviețuiesc semnele de carte și legăturile?', r: 'Conținutul paginilor și legăturile interne din fiecare document se păstrează.' },
      ],
    },

    'split-pdf': {
      titolo: 'Împarte PDF — Extrage pagini gratuit în browser',
      descrizione: 'Scoate pagini sau intervale dintr-un PDF într-un fișier nou. În browser, nu se încarcă nimic.',
      h1: 'Împarte un PDF',
      intro: 'Ia paginile pe care le indici și le pune într-un PDF nou, lăsând originalul neatins. Util ca să scoți un capitol dintr-o carte sau o singură factură dintr-un teanc. Rulează în browserul tău.',
      passi: [
        'Trage PDF-ul.',
        'Scrie paginile dorite, de exemplu <strong>1-3, 7, 12-15</strong>.',
        'Descarcă noul PDF cu doar acele pagini.',
      ],
      faq: [
        { d: 'Cum scriu intervalul de pagini?', r: 'Intervale cu liniuță și pagini singulare separate prin virgulă: 1-3, 7, 12-15.' },
        { d: 'Documentul meu este încărcat?', r: 'Nu, împărțirea se petrece în browserul tău.' },
        { d: 'Pot să îl împart în multe fișiere dintr-o dată?', r: 'Acest instrument produce un fișier pe rulare. Relansează-l cu alt interval pentru fiecare parte de care ai nevoie.' },
      ],
    },

    'pdf-to-jpg': {
      titolo: 'PDF în JPG — Convertește paginile în imagini gratuit',
      descrizione: 'Transformă fiecare pagină a unui PDF într-o imagine de înaltă rezoluție, într-o arhivă ZIP.',
      h1: 'Convertește PDF în JPG',
      intro: 'Transformă fiecare pagină a PDF-ului într-o imagine de înaltă rezoluție și le împachetează într-o arhivă ZIP. Comod pentru diapozitive, postări pe rețele sau oriunde o imagine e mai practică decât un document. Rulează în browser.',
      passi: [
        'Trage PDF-ul.',
        'Fiecare pagină este desenată la înaltă rezoluție.',
        'Descarcă arhiva ZIP cu o imagine pe pagină.',
      ],
      faq: [
        { d: 'Ce rezoluție obțin?', r: 'Paginile sunt desenate la aproximativ dublul dimensiunii nominale, suficient de clar pentru ecran și pentru majoritatea tipăririlor.' },
        { d: 'De ce o arhivă ZIP?', r: 'Un PDF de o sută de pagini ar însemna o sută de descărcări separate. O singură arhivă e mai comodă.' },
        { d: 'Paginile mele sunt încărcate?', r: 'Nu, desenarea se petrece în browserul tău.' },
      ],
    },

    'jpg-to-pdf': {
      titolo: 'JPG în PDF — Imagini în PDF gratuit în browser',
      descrizione: 'Transformă poze sau scanări într-un singur PDF ordonat, o imagine pe pagină. În browser.',
      h1: 'Convertește imagini în PDF',
      intro: 'Pune pozele sau scanările tale într-un singur PDF, o imagine pe pagină, în ordinea în care le adaugi. Motivul obișnuit e să transformi pozele făcute cu telefonul unui document în ceva ce se poate chiar trimite. Rulează în browser.',
      passi: [
        'Selectează toate imaginile dorite, în ordinea dorită.',
        'Fiecare imagine devine o pagină dimensionată după ea.',
        'Descarcă PDF-ul.',
      ],
      faq: [
        { d: 'Ce formate de imagine funcționează?', r: 'JPG, PNG și celelalte formate pe care browserul tău le poate afișa.' },
        { d: 'Pot schimba ordinea?', r: 'Paginile urmează ordinea în care fișierele apar în listă, deci selectează-le în ordinea dorită.' },
        { d: 'Pozele mele sunt încărcate?', r: 'Nu. Totul se petrece pe dispozitivul tău.' },
      ],
    },

    'rotate-pdf': {
      titolo: 'Rotește PDF — Corectează orientarea gratuit',
      descrizione: 'Rotește paginile unui PDF cu 90, 180 sau 270 de grade și salvează definitiv. În browser.',
      h1: 'Rotește paginile unui PDF',
      intro: 'Rotește paginile unui PDF și scrie noua orientare în fișier, ca să se deschidă drept peste tot — spre deosebire de rotirea în vizualizator, care de obicei uită imediat ce închizi.',
      passi: [
        'Trage PDF-ul care e pe dos.',
        'Alege cu cât să îl rotești: 90, 180 sau 270 de grade.',
        'Descarcă PDF-ul corectat.',
      ],
      faq: [
        { d: 'Rotirea e definitivă?', r: 'Da, se scrie în fișierul însuși, nu doar în felul în care îl afișează un vizualizator.' },
        { d: 'Pot roti doar câteva pagini?', r: 'Acest instrument rotește toate paginile la fel. Pentru orientări amestecate, împarte întâi documentul.' },
        { d: 'Scade calitatea?', r: 'Nu. Rotirea schimbă un atribut al paginii; nu se recodifică nimic.' },
      ],
    },

    'delete-pdf-pages': {
      titolo: 'Șterge pagini dintr-un PDF — Gratuit online',
      descrizione: 'Scoate paginile nedorite dintr-un PDF și descarcă restul. În browser, nu se încarcă nimic.',
      h1: 'Șterge pagini dintr-un PDF',
      intro: 'Scoate paginile pe care le indici și îți dă restul ca PDF nou. Pagina albă de la sfârșitul unei scanări, coperta pe care nu o vrei, paginile care sunt ale altcuiva. Rulează în browser.',
      passi: [
        'Trage PDF-ul.',
        'Scrie paginile de scos, de exemplu <strong>1, 4, 9</strong>.',
        'Descarcă PDF-ul fără ele.',
      ],
      faq: [
        { d: 'Cum indic paginile?', r: 'Numere de pagină separate prin virgulă: 1, 4, 9.' },
        { d: 'Originalul se modifică?', r: 'Nu. Primești un fișier nou; cel de pe dispozitivul tău rămâne neatins.' },
        { d: 'Se încarcă ceva?', r: 'Nu, totul rulează în browserul tău.' },
      ],
    },

    'add-page-numbers': {
      titolo: 'Numerotează paginile unui PDF — Gratuit online',
      descrizione: 'Adaugă numere de pagină unui PDF care nu le are. În browser, nu se încarcă nimic.',
      h1: 'Adaugă numere de pagină unui PDF',
      intro: 'Pune un număr pe fiecare pagină a unui document venit fără ele — ceea ce contează imediat ce cineva trebuie să se refere la „pagina 12" într-o ședință sau într-un act.',
      passi: [
        'Trage PDF-ul.',
        'Numerele sunt așezate uniform pe fiecare pagină.',
        'Descarcă PDF-ul numerotat.',
      ],
      faq: [
        { d: 'Unde ajung numerele?', r: 'În subsolul paginii, într-o poziție care stă departe de marginile majorității documentelor.' },
        { d: 'Pot începe de la alt număr decât 1?', r: 'Numerotarea începe de la prima pagină a fișierului. Ca să o decalezi, împarte documentul și numerotează partea de care ai nevoie.' },
        { d: 'Se încarcă ceva?', r: 'Nu, numerotarea se petrece în browserul tău.' },
      ],
    },

    'watermark-pdf': {
      titolo: 'Filigran pe PDF — Ștampilă gratuită online',
      descrizione: 'Pune un text ca CIORNĂ sau CONFIDENȚIAL pe toate paginile. În browser, nu se încarcă nimic.',
      h1: 'Adaugă un filigran unui PDF',
      intro: 'Așterne textul tău peste fiecare pagină — <strong>CIORNĂ</strong>, <strong>CONFIDENȚIAL</strong>, numele unui client — ca o copie scăpată să fie limpede marcată. Rulează în browser.',
      passi: [
        'Trage PDF-ul.',
        'Scrie textul pe care vrei să îl ștampilezi peste pagini.',
        'Descarcă PDF-ul cu filigran.',
      ],
      faq: [
        { d: 'Acoperă textul de dedesubt?', r: 'Nu, semnul e desenat ușor peste pagină, ca documentul să rămână lizibil.' },
        { d: 'Se poate scoate filigranul?', r: 'Devine parte din conținutul paginii, deci nu poate fi dezactivat într-un cititor. E un mijloc de descurajare, nu criptare — pentru asta folosește Protejează PDF.' },
        { d: 'Documentul meu e încărcat?', r: 'Nu, rămâne pe dispozitivul tău.' },
      ],
    },

    'extract-images-from-pdf': {
      titolo: 'Extrage imagini dintr-un PDF — Gratuit, calitate originală',
      descrizione: 'Scoate fiecare fotografie încorporată într-un PDF la calitatea originală, ca arhivă ZIP.',
      h1: 'Extrage imaginile dintr-un PDF',
      intro: 'Scoate pozele încorporate într-un PDF la rezoluția lor originală — imaginile adevărate, nu capturi ale paginilor. Totul este împachetat într-o arhivă ZIP.',
      passi: [
        'Trage PDF-ul.',
        'Imaginile încorporate sunt găsite și scoase la calitate deplină.',
        'Descarcă arhiva ZIP.',
      ],
      faq: [
        { d: 'Cu ce diferă de „PDF în JPG"?', r: '„PDF în JPG" fotografiază fiecare pagină așa cum arată. Acesta scoate fișierele imagine originale care au fost puse în document, la rezoluția la care au fost salvate.' },
        { d: 'Dacă nu iese nimic?', r: 'Atunci documentul nu conține imagini încorporate — un PDF făcut doar din text și desene vectoriale nu are ce să scoată.' },
        { d: 'Se încarcă ceva?', r: 'Nu, totul rulează în browserul tău.' },
      ],
    },

    'pdf-to-text': {
      titolo: 'PDF în text — Extrage în .txt gratuit',
      descrizione: 'Scoate tot textul lizibil dintr-un PDF într-un fișier .txt. În browser, nu se încarcă nimic.',
      h1: 'Extrage textul dintr-un PDF',
      intro: 'Scoate tot textul lizibil al unui PDF într-un fișier <strong>.txt</strong> simplu, fără formatare care să încurce. Util pentru căutare, pentru citate sau ca să dai un document altui program.',
      passi: [
        'Trage PDF-ul.',
        'Textul fiecărei pagini este extras în ordinea de citire.',
        'Descarcă fișierul .txt.',
      ],
      faq: [
        { d: 'Se păstrează formatarea?', r: 'Nu, și e intenționat: text simplu înseamnă fără fonturi, fără coloane, fără tabele. Dacă vrei formatarea, folosește „PDF în Word".' },
        { d: 'Citește un document scanat?', r: 'Nu. O scanare e o poză a textului, iar fără recunoaștere de caractere nu există nimic de extras. Noi nu o facem.' },
        { d: 'Documentul meu este încărcat?', r: 'Nu, extragerea se petrece în browserul tău.' },
      ],
    },
  },
};
