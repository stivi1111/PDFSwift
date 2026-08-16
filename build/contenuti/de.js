/** Deutsche Texte der 24 Seiten. Kriterium siehe en.js. */
module.exports = {
  lingua: 'Deutsch',

  casa: {
    titolo: 'Kostenlose PDF Tools zum Umwandeln und Komprimieren',
    descrizione: 'PDF in Word, Word in PDF, Excel und PowerPoint umwandeln, zusammenfügen, teilen, komprimieren und bearbeiten. Kostenlos, ohne Anmeldung, Dateien werden sofort danach gelöscht.',
  },

  etichette: {
    passi: 'So geht es',
    faq: 'Häufige Fragen',
    altri: 'Alle 24 PDF-Werkzeuge',
    apri: 'Werkzeug öffnen',
    browserBadge: 'Läuft in Ihrem Browser — die Datei verlässt Ihr Gerät nicht',
    serverBadge: 'Auf unserem Server verarbeitet und sofort danach gelöscht',
  },

  strumenti: {
    'pdf-to-word': {
      titolo: 'PDF in Word — Kostenlos, ohne Anmeldung',
      descrizione: 'Wandeln Sie ein PDF in ein bearbeitbares Word-Dokument um. Behält Überschriften, Tabellen und Bilder. Bis 100 MB.',
      h1: 'PDF in Word umwandeln',
      intro: 'Macht aus einem PDF wieder eine bearbeitbare <strong>.docx</strong>-Datei und baut Absätze, Tabellen, Überschriften und Bilder neu auf, statt jede Seite als Foto einzufügen. Kopfzeilen, Fußzeilen und Seitenzahlen werden erkannt und in die Word-Kopfzeile verschoben, statt mitten im Text zu landen.',
      passi: [
        'Ziehen Sie das PDF hinein, das Sie bearbeiten wollen, oder wählen Sie es vom Gerät.',
        'Warten Sie auf die Umwandlung: ein Dokument mit 10 Seiten braucht ein paar Sekunden, ein Buch mit 200 Seiten etwa eine Minute.',
        'Laden Sie die .docx herunter und öffnen Sie sie in Word, Google Docs, LibreOffice oder Pages.',
      ],
      faq: [
        { d: 'Bleibt das Layout erhalten?', r: 'Text, Tabellen, Überschriften, Listen und Bilder kommen durch. Komplexe Vektorgrafiken werden zu Bildern, weil sie in Word ohnehin nicht bearbeitbar wären.' },
        { d: 'Funktioniert es bei einem gescannten PDF?', r: 'Nein. Ist das PDF eine Fotografie der Seiten ohne Textebene, gibt es nichts zu extrahieren, und die Word-Datei enthält nur die Bilder. Wir machen keine Zeichenerkennung.' },
        { d: 'Wie groß darf die Datei sein?', r: 'Bis 100 MB und bis 400 Seiten. Für längere Bücher teilen Sie das PDF vorher und wandeln die Teile um.' },
      ],
    },

    'word-to-pdf': {
      titolo: 'Word in PDF — Kostenlos und originalgetreu',
      descrizione: 'Wandeln Sie .docx oder .doc in ein sauberes PDF um, das überall gleich aussieht. Kostenlos, bis 100 MB.',
      h1: 'Word in PDF umwandeln',
      intro: 'Macht aus einem Word-Dokument ein PDF, das auf jedem Gerät identisch aussieht — genau deshalb verschickt man ja ein PDF und keine .docx. Seitenumbrüche, Schriften, Tabellen und Bilder bleiben, wo Sie sie hingesetzt haben.',
      passi: [
        'Laden Sie Ihre .docx- oder .doc-Datei hoch.',
        'Das Dokument wird von LibreOffice gesetzt, dem Programm, das Word-Dateien außerhalb von Microsoft Office am treuesten liest.',
        'Laden Sie das PDF herunter.',
      ],
      faq: [
        { d: 'Stimmen meine Schriften?', r: 'Gängige Schriften sind auf unserem Server installiert und werden exakt dargestellt. Eine sehr ungewöhnliche Schrift kann ersetzt werden, was das Layout leicht verschieben kann — betten Sie sie dann in die .docx ein oder bleiben Sie bei Standardschriften.' },
        { d: 'Bleibt das Inhaltsverzeichnis anklickbar?', r: 'Ja, interne Verweise und Lesezeichen überstehen die Umwandlung.' },
        { d: 'Kann ich eine alte .doc-Datei umwandeln?', r: 'Ja, sowohl das moderne .docx als auch das alte .doc-Format werden angenommen.' },
      ],
    },

    'pdf-to-excel': {
      titolo: 'PDF in Excel — Tabellen als .xlsx, kostenlos',
      descrizione: 'Holen Sie Tabellen aus einem PDF in eine echte Excel-Datei mit funktionierenden Zellen. Kostenlos.',
      h1: 'PDF in Excel umwandeln',
      intro: 'Findet die Tabellen in einem PDF und baut sie als echte Tabellenzellen wieder auf, mit denen Sie sortieren und rechnen können — kein Bild einer Tabelle. Jede gefundene Tabelle wird zu einem eigenen Blatt in der .xlsx.',
      passi: [
        'Laden Sie das PDF mit den Tabellen hoch.',
        'Zwei Verfahren werden versucht: ein schnelles, das die Ausrichtung des Textes liest, und ein langsameres, das den gezeichneten Rahmen folgt. Das sauberere Ergebnis gewinnt.',
        'Laden Sie die .xlsx herunter und öffnen Sie sie in Excel, Numbers oder Google Tabellen.',
      ],
      faq: [
        { d: 'Was, wenn keine Tabelle gefunden wurde?', r: 'Das passiert, wenn die Seite keine Tabelle enthält, die unsere Erkennung lesen kann — meist eine Tabelle ohne Linien und mit unregelmäßigen Abständen. Sie scheitert ehrlich, statt Ihnen eine zerlegte Datei zu geben.' },
        { d: 'Überstehen verbundene Zellen die Umwandlung?', r: 'Bei Tabellen mit gezeichneten Rahmen meist ja. Rahmenlose Tabellen mit verbundenen Zellen sind der schwierigste Fall und können flachgedrückt herauskommen.' },
        { d: 'Liest es eine gescannte Tabelle?', r: 'Nein. Ein Scan hat keinen Text zum Auslesen, nur Bildpunkte.' },
      ],
    },

    'excel-to-pdf': {
      titolo: 'Excel in PDF — Kostenlos, Formatierung bleibt',
      descrizione: 'Wandeln Sie .xlsx, .xls oder .csv in ein sauberes PDF mit unveränderter Formatierung um. Kostenlos.',
      h1: 'Excel in PDF umwandeln',
      intro: 'Druckt Ihre Tabelle so ins PDF, wie sie aus Excel käme, mit Zahlenformaten, Farben, Rahmen und Spaltenbreiten. Nützlich, wenn Sie Zahlen verschicken müssen, die niemand aus Versehen ändern können soll.',
      passi: [
        'Laden Sie die .xlsx-, .xls- oder .csv-Datei hoch.',
        'Jedes Blatt wird gesetzt und in Seiten aufgeteilt.',
        'Laden Sie das PDF herunter.',
      ],
      faq: [
        { d: 'Sind alle Blätter dabei?', r: 'Ja, jedes Blatt der Arbeitsmappe wird der Reihe nach dargestellt.' },
        { d: 'Kommen Formeln mit?', r: 'Die Ergebnisse schon. Ein PDF kennt keine Formeln, Sie sehen also den berechneten Wert.' },
        { d: 'Kann ich eine einfache CSV umwandeln?', r: 'Ja, eine CSV wird als einfache Tabelle gesetzt.' },
      ],
    },

    'pdf-to-powerpoint': {
      titolo: 'PDF in PowerPoint — .pptx kostenlos erzeugen',
      descrizione: 'Machen Sie aus PDF-Seiten bearbeitbare PowerPoint-Folien. Kostenlos, bis 100 MB.',
      h1: 'PDF in PowerPoint umwandeln',
      intro: 'Macht aus jeder Seite eines PDF eine Folie in einer .pptx-Präsentation und behält den Text als echte Textfelder, statt ihn in ein Bild einzuebnen — Sie können also weiter bearbeiten, was dort steht.',
      passi: [
        'Laden Sie das PDF hoch — am besten eine Präsentation, die als PDF exportiert wurde.',
        'Jede Seite wird zu einer Folie.',
        'Laden Sie die .pptx herunter und öffnen Sie sie in PowerPoint, Keynote oder Google Präsentationen.',
      ],
      faq: [
        { d: 'Kann ich den Text danach bearbeiten?', r: 'Ja. Der Text steht in bearbeitbaren Feldern, nicht in einem Bild eingebacken.' },
        { d: 'Kommen die Animationen zurück?', r: 'Nein. Ein PDF speichert weder Animationen noch Übergänge — diese Information ging beim Export verloren.' },
        { d: 'Was, wenn mein PDF keine Präsentation ist?', r: 'Es funktioniert trotzdem, aber eine hochformatige A4-Seite auf einer querformatigen Folie sieht seltsam aus. Dieses Werkzeug ist für Präsentationen gedacht.' },
      ],
    },

    'powerpoint-to-pdf': {
      titolo: 'PowerPoint in PDF — .pptx kostenlos umwandeln',
      descrizione: 'Wandeln Sie eine PowerPoint-Präsentation in ein PDF um, das jeder öffnen kann. Kostenlos, bis 100 MB.',
      h1: 'PowerPoint in PDF umwandeln',
      intro: 'Macht aus einer Präsentation ein PDF, das auf jedem Gerät gleich aufgeht, ohne fehlende Schriften und ohne das Risiko, dass jemand Ihre Folien verändert.',
      passi: [
        'Laden Sie Ihre .pptx- oder .ppt-Datei hoch.',
        'Jede Folie wird zu einer PDF-Seite.',
        'Laden Sie das PDF herunter.',
      ],
      faq: [
        { d: 'Sind die Notizen für den Vortragenden dabei?', r: 'Nein, nur die Folien selbst.' },
        { d: 'Was passiert mit Videos in der Präsentation?', r: 'Ein PDF kann kein Video abspielen, an seiner Stelle bleibt ein Standbild.' },
        { d: 'Bleiben die Seitenverhältnisse gleich?', r: 'Ja, eine 16:9-Präsentation ergibt 16:9-PDF-Seiten.' },
      ],
    },

    'pdf-to-html': {
      titolo: 'PDF in HTML — Kostenlos, Layout bleibt erhalten',
      descrizione: 'Machen Sie aus einem PDF eine Webseite, die wie das Original aussieht, samt Schriften und Layout.',
      h1: 'PDF in HTML umwandeln',
      intro: 'Erzeugt eine einzelne HTML-Datei, die das PDF Seite für Seite im Browser wiedergibt, mit eingebetteten Schriften und Bildern, damit das Ergebnis ohne zusätzliche Dateien daneben richtig aussieht.',
      passi: [
        'Laden Sie das PDF hoch.',
        'Die Seiten werden mit eingebetteten Schriften in HTML umgewandelt.',
        'Laden Sie die .html-Datei herunter und öffnen Sie sie in einem beliebigen Browser.',
      ],
      faq: [
        { d: 'Ist das HTML sauber genug zum Bearbeiten von Hand?', r: 'Nicht wirklich. Die Umwandlung legt Wert darauf, wie das PDF auszusehen, der Text ist also millimetergenau platziert statt als einfache Absätze geschrieben. Es ist zum Ansehen und Veröffentlichen gedacht, nicht zum Bearbeiten.' },
        { d: 'Warum ist die Datei so groß?', r: 'Schriften und Bilder stecken darin, damit die Seite für sich allein funktioniert, ohne von etwas Externem abzuhängen.' },
        { d: 'Kann ich sie auf eine Webseite stellen?', r: 'Ja, es ist eine eigenständige Datei, die Sie überall hochladen können.' },
      ],
    },

    'html-to-pdf': {
      titolo: 'HTML in PDF — Webseiten kostenlos umwandeln',
      descrizione: 'Machen Sie aus einer HTML-Datei ein PDF, gesetzt von einer echten Browser-Engine. Kostenlos.',
      h1: 'HTML in PDF umwandeln',
      intro: 'Setzt Ihr HTML mit Chromium, der Engine hinter Chrome, damit das PDF so aussieht, wie die Seite im Browser aussieht — Stilvorlagen, Layout und alles Übrige.',
      passi: [
        'Laden Sie Ihre .html- oder .txt-Datei hoch.',
        'Die Seite wird gesetzt und auf A4 in Seiten aufgeteilt.',
        'Laden Sie das PDF herunter.',
      ],
      faq: [
        { d: 'Wird mein CSS angewendet?', r: 'Ja, Stile innerhalb der Datei werden angewendet. Von einer externen Adresse geladene Stile werden nicht geholt.' },
        { d: 'Läuft JavaScript?', r: 'Skripte in der Datei werden ausgeführt, bevor die Seite erfasst wird, beim Laden erzeugte Inhalte erscheinen also.' },
        { d: 'Kann ich eine Webseite über ihre Adresse umwandeln?', r: 'Mit diesem Werkzeug nicht — speichern Sie die Seite zuerst als HTML-Datei und laden Sie diese hoch.' },
      ],
    },

    'markdown-to-pdf': {
      titolo: 'Markdown in PDF — .md kostenlos umwandeln',
      descrizione: 'Machen Sie aus Markdown ein ordentlich gesetztes PDF mit Überschriften, Codeblöcken und Tabellen.',
      h1: 'Markdown in PDF umwandeln',
      intro: 'Nimmt eine Markdown-Datei und setzt sie als richtiges Dokument: Überschriften in einer sauberen Hierarchie, Codeblöcke in einer Festbreitenschrift, Tabellen mit Rahmen, Verweise bleiben anklickbar.',
      passi: [
        'Laden Sie Ihre .md-, .markdown- oder .txt-Datei hoch.',
        'Das Markdown wird in ein gestaltetes Dokument umgewandelt und als PDF gesetzt.',
        'Laden Sie das PDF herunter.',
      ],
      faq: [
        { d: 'Welche Markdown-Variante wird unterstützt?', r: 'Standard-Markdown plus die üblichen Erweiterungen: Tabellen, abgegrenzte Codeblöcke, Aufgabenlisten und Durchgestrichenes.' },
        { d: 'Funktionieren Bilder?', r: 'Über eine Webadresse angegebene Bilder werden eingebunden. Bilder, die auf Dateien Ihres Rechners zeigen, lassen sich nicht holen.' },
        { d: 'Wird der Code farbig hervorgehoben?', r: 'Codeblöcke stehen in einer Festbreitenschrift auf getöntem Grund; eine sprachabhängige Einfärbung gibt es nicht.' },
      ],
    },

    'compress-pdf': {
      titolo: 'PDF verkleinern — Dateigröße kostenlos reduzieren',
      descrizione: 'Verkleinern Sie ein PDF mit drei Qualitätsstufen. Gemessen: bis zu 40% kleiner. Kostenlos.',
      h1: 'PDF verkleinern',
      intro: 'Verkleinert ein PDF, indem die enthaltenen Bilder neu kodiert werden — mit drei Stufen, damit Sie den Kompromiss selbst wählen, statt hinzunehmen, was das Programm entscheidet.',
      passi: [
        'Laden Sie das PDF hoch, das leichter werden soll.',
        'Wählen Sie die Stufe: <strong>Leicht</strong> behält Druckqualität, <strong>Ausgewogen</strong> ist die vernünftige Wahl, <strong>Maximal</strong> ergibt die kleinste Datei für Bildschirm und E-Mail.',
        'Laden Sie das verkleinerte PDF herunter.',
      ],
      faq: [
        { d: 'Wie viel kleiner wird es?', r: 'Gemessen an einem echten 5-MB-Dokument: etwa 19% kleiner bei Leicht, 34% bei Ausgewogen, 40% bei Maximal. Ein PDF fast nur aus Text hat wenig zu holen, eines voller Fotos sehr viel.' },
        { d: 'Wird der Text unscharf?', r: 'Nein. Text und Vektorzeichnungen bleiben auf jeder Stufe scharf — nur die Bilder werden neu kodiert.' },
        { d: 'Welche Stufe soll ich nehmen?', r: 'Ausgewogen für fast alles. Leicht, wenn das Dokument in den Druck geht. Maximal nur, wenn es unter eine Anhangsgrenze passen muss.' },
      ],
    },

    'protect-pdf': {
      titolo: 'PDF mit Passwort schützen — AES-256, kostenlos',
      descrizione: 'Sperren Sie ein PDF mit Passwort und echter AES-256-Verschlüsselung. Datei danach sofort gelöscht.',
      h1: 'PDF mit einem Passwort schützen',
      intro: 'Verschlüsselt das PDF mit <strong>AES-256</strong>, demselben Standard wie für Verschlusssachen, sodass die Datei ohne Passwort überhaupt nicht aufgeht. Das ist echte Verschlüsselung, kein Vermerk, den ein Leseprogramm ignorieren kann.',
      passi: [
        'Laden Sie das PDF hoch, das gesperrt werden soll.',
        'Geben Sie das Passwort ein, das zum Öffnen nötig sein wird.',
        'Laden Sie die geschützte Datei herunter und geben Sie das Passwort getrennt vom Dokument weiter.',
      ],
      faq: [
        { d: 'Ist das echte Verschlüsselung?', r: 'Ja — AES-256. Viele browserbasierte Werkzeuge setzen nur einen "Nicht drucken"-Vermerk, den jedes Leseprogramm ignorieren kann. Hier wird die Datei neu verschlüsselt, der Inhalt ist ohne Passwort also unlesbar.' },
        { d: 'Was, wenn ich das Passwort vergesse?', r: 'Niemand kann es wiederherstellen, wir eingeschlossen. Genau das ist der Sinn von Verschlüsselung. Bewahren Sie es sicher auf.' },
        { d: 'Lässt es sich später entfernen?', r: 'Ja, mit unserem Werkzeug "PDF entsperren" — aber nur, wenn Sie das Passwort kennen.' },
      ],
    },

    'unlock-pdf': {
      titolo: 'PDF entsperren — Passwort und Sperren entfernen',
      descrizione: 'Entfernen Sie das Passwort aus Ihrem eigenen PDF, um zu drucken, zu kopieren und zu bearbeiten.',
      h1: 'Ein PDF entsperren',
      intro: 'Entfernt Passwort und Sperren für Drucken, Kopieren und Bearbeiten aus einem PDF und gibt eine normale Datei zurück, die Sie frei verwenden können. Sie müssen das aktuelle Passwort kennen.',
      passi: [
        'Laden Sie das geschützte PDF hoch.',
        'Geben Sie sein aktuelles Passwort ein.',
        'Laden Sie die entsperrte Datei herunter.',
      ],
      faq: [
        { d: 'Öffnet es ein PDF, dessen Passwort ich nicht kenne?', r: 'Nein, und dafür ist es auch nicht gedacht. Es entfernt den Schutz von Dokumenten, die Sie ohnehin öffnen dürfen.' },
        { d: 'Werden auch Druck- und Kopiersperren entfernt?', r: 'Ja. Mit der Verschlüsselung verschwinden auch die Berechtigungsvermerke.' },
        { d: 'Ändert sich der Inhalt?', r: 'Nein. Nur die Schutzschicht wird entfernt; Seiten, Text und Bilder bleiben unangetastet.' },
      ],
    },

    'grayscale-pdf': {
      titolo: 'PDF in Graustufen — Schwarzweiß, kostenlos',
      descrizione: 'Wandeln Sie ein farbiges PDF in Graustufen um, um Tinte zu sparen. Der Text bleibt scharf.',
      h1: 'Ein PDF in Graustufen umwandeln',
      intro: 'Wandelt jede Farbe im Dokument in Grautöne um, was beim Drucken den Verbrauch an Farbtinte senkt und gescannt wirkende Dokumente einheitlicher macht. Der Text bleibt Text und bleibt scharf.',
      passi: [
        'Laden Sie das farbige PDF hoch.',
        'Farben werden auf Grau abgebildet, während Text und Vektorformen unverändert bleiben.',
        'Laden Sie das Graustufen-PDF herunter.',
      ],
      faq: [
        { d: 'Werden die Seiten zu Bildern?', r: 'Nein. Das ist eine verbreitete Abkürzung anderer Werkzeuge, und sie macht Text unscharf und nicht markierbar. Hier bleibt Text echter Text.' },
        { d: 'Bekomme ich die Farben zurück?', r: 'Aus der Graustufendatei nicht — die Farbinformation ist weg. Bewahren Sie Ihr Original auf.' },
        { d: 'Wird die Datei kleiner?', r: 'Oft etwas, da Grau weniger Daten braucht als Farbe, aber das ist ein Nebeneffekt, nicht das Ziel.' },
      ],
    },

    'pdf-to-markdown': {
      titolo: 'PDF in Markdown — .md kostenlos für KI und Notion',
      descrizione: 'Machen Sie aus einem PDF sauberes Markdown für ChatGPT, Claude, Obsidian oder Notion. Im Browser.',
      h1: 'PDF in Markdown umwandeln',
      intro: 'Zieht den Text eines PDF als sauberes Markdown heraus, das Format, das Sprachmodelle und Notiz-Programme am besten lesen. Dieses Werkzeug läuft vollständig in Ihrem Browser — das Dokument verlässt Ihren Rechner nicht.',
      passi: [
        'Ziehen Sie das PDF hinein.',
        'Der Text wird herausgezogen und mit Markdown-Überschriften und -Absätzen gegliedert.',
        'Laden Sie die .md-Datei herunter und fügen Sie sie ein, wo Sie sie brauchen.',
      ],
      faq: [
        { d: 'Warum Markdown für KI-Werkzeuge?', r: 'Es trägt die Struktur — Überschriften, Listen, Hervorhebungen — im reinen Text mit, das Modell liest also die Form des Dokuments statt einer ununterscheidbaren Wortwand.' },
        { d: 'Wird meine Datei irgendwohin hochgeladen?', r: 'Nein. Dieses Werkzeug läuft in Ihrem Browser. Es wird nichts irgendwohin gesendet.' },
        { d: 'Bleiben Bilder erhalten?', r: 'Nein, nur der Text. Markdown allein kann keine eingebetteten Bilder tragen.' },
      ],
    },

    'merge-pdf': {
      titolo: 'PDF zusammenfügen — Kostenlos, in Ihrem Browser',
      descrizione: 'Fügen Sie mehrere PDF zu einem zusammen, in Ihrer Reihenfolge. Im Browser, nichts wird hochgeladen.',
      h1: 'PDF-Dateien zusammenfügen',
      intro: 'Fügt mehrere PDF zu einem einzigen Dokument zusammen, in der Reihenfolge, in der Sie sie hinzufügen. Läuft vollständig in Ihrem Browser, Ihre Dateien werden also nirgendwohin hochgeladen — was zählt, wenn es Verträge oder Arztbefunde sind.',
      passi: [
        'Wählen oder ziehen Sie alle PDF hinein, die zusammensollen.',
        'Sie werden in der Reihenfolge zusammengefügt, in der sie in der Liste stehen.',
        'Laden Sie das zusammengefügte PDF herunter.',
      ],
      faq: [
        { d: 'Werden meine Dateien auf einen Server geladen?', r: 'Nein. Das Zusammenfügen geschieht in Ihrem Browser, die Dateien bleiben auf Ihrem Gerät.' },
        { d: 'Wie viele kann ich auf einmal zusammenfügen?', r: 'So viele, wie Ihr Gerät im Speicher halten kann. Ein paar Dutzend normale Dokumente sind kein Problem.' },
        { d: 'Bleiben Lesezeichen und Verweise erhalten?', r: 'Der Seiteninhalt und die internen Verweise innerhalb jedes Dokuments bleiben erhalten.' },
      ],
    },

    'split-pdf': {
      titolo: 'PDF teilen — Seiten kostenlos im Browser herauslösen',
      descrizione: 'Lösen Sie einzelne Seiten oder Bereiche aus einem PDF in eine neue Datei. Nichts wird hochgeladen.',
      h1: 'Ein PDF teilen',
      intro: 'Nimmt die Seiten, die Sie angeben, und legt sie in ein neues PDF, während das Original unangetastet bleibt. Nützlich, um ein Kapitel aus einem Buch oder eine einzelne Rechnung aus einem Stapel zu ziehen. Läuft in Ihrem Browser.',
      passi: [
        'Ziehen Sie das PDF hinein.',
        'Geben Sie die gewünschten Seiten ein, etwa <strong>1-3, 7, 12-15</strong>.',
        'Laden Sie das neue PDF mit genau diesen Seiten herunter.',
      ],
      faq: [
        { d: 'Wie schreibe ich den Seitenbereich?', r: 'Bereiche mit Bindestrich, einzelne Seiten durch Kommas getrennt: 1-3, 7, 12-15.' },
        { d: 'Wird mein Dokument hochgeladen?', r: 'Nein, das Teilen geschieht in Ihrem Browser.' },
        { d: 'Kann ich es in einem Durchgang in viele Dateien teilen?', r: 'Dieses Werkzeug erzeugt eine Datei pro Durchgang. Starten Sie es für jeden Teil erneut mit einem anderen Bereich.' },
      ],
    },

    'pdf-to-jpg': {
      titolo: 'PDF in JPG — Seiten kostenlos als Bilder',
      descrizione: 'Machen Sie aus jeder PDF-Seite ein hochaufgelöstes Bild, geliefert als ZIP. Läuft im Browser.',
      h1: 'PDF in JPG umwandeln',
      intro: 'Zeichnet jede Seite des PDF als hochaufgelöstes Bild und packt alles in ein ZIP. Praktisch für Folien, Beiträge in sozialen Netzen oder überall dort, wo ein Bild handlicher ist als ein Dokument. Läuft im Browser.',
      passi: [
        'Ziehen Sie das PDF hinein.',
        'Jede Seite wird hochaufgelöst gezeichnet.',
        'Laden Sie das ZIP mit einem Bild je Seite herunter.',
      ],
      faq: [
        { d: 'Welche Auflösung bekomme ich?', r: 'Seiten werden mit etwa der doppelten Nenngröße gezeichnet, scharf genug für Bildschirme und für die meisten Drucke.' },
        { d: 'Warum ein ZIP?', r: 'Ein PDF mit hundert Seiten hieße hundert einzelne Downloads. Ein Archiv ist bequemer.' },
        { d: 'Werden meine Seiten hochgeladen?', r: 'Nein, gezeichnet wird in Ihrem Browser.' },
      ],
    },

    'jpg-to-pdf': {
      titolo: 'JPG in PDF — Bilder kostenlos im Browser',
      descrizione: 'Machen Sie aus Fotos oder Scans ein einziges ordentliches PDF, ein Bild pro Seite. Im Browser.',
      h1: 'Bilder in ein PDF umwandeln',
      intro: 'Legt Ihre Fotos oder Scans in ein PDF, ein Bild pro Seite, in der Reihenfolge, in der Sie sie hinzufügen. Der übliche Grund: Handyfotos eines Dokuments in etwas verwandeln, das man wirklich verschicken kann. Läuft im Browser.',
      passi: [
        'Wählen Sie alle gewünschten Bilder in der gewünschten Reihenfolge.',
        'Jedes Bild wird zu einer darauf zugeschnittenen Seite.',
        'Laden Sie das PDF herunter.',
      ],
      faq: [
        { d: 'Welche Bildformate funktionieren?', r: 'JPG, PNG und die übrigen Formate, die Ihr Browser anzeigen kann.' },
        { d: 'Kann ich die Reihenfolge ändern?', r: 'Die Seiten folgen der Reihenfolge in der Liste, wählen Sie die Dateien also in der gewünschten Reihenfolge aus.' },
        { d: 'Werden meine Fotos hochgeladen?', r: 'Nein. Alles geschieht auf Ihrem Gerät.' },
      ],
    },

    'rotate-pdf': {
      titolo: 'PDF drehen — Ausrichtung kostenlos korrigieren',
      descrizione: 'Drehen Sie PDF-Seiten um 90, 180 oder 270 Grad und speichern Sie das dauerhaft. Im Browser.',
      h1: 'PDF-Seiten drehen',
      intro: 'Dreht die Seiten eines PDF und schreibt die neue Ausrichtung in die Datei, damit sie überall richtig herum aufgeht — anders als beim Drehen im Betrachter, der es meist beim Schließen wieder vergisst.',
      passi: [
        'Ziehen Sie das falsch herum liegende PDF hinein.',
        'Wählen Sie, wie weit gedreht wird: 90, 180 oder 270 Grad.',
        'Laden Sie das korrigierte PDF herunter.',
      ],
      faq: [
        { d: 'Ist die Drehung dauerhaft?', r: 'Ja, sie wird in die Datei selbst geschrieben, nicht nur in die Anzeige eines einzelnen Betrachters.' },
        { d: 'Kann ich nur einzelne Seiten drehen?', r: 'Dieses Werkzeug dreht alle Seiten gleich weit. Für gemischte Ausrichtungen teilen Sie das Dokument vorher.' },
        { d: 'Leidet die Qualität?', r: 'Nein. Die Drehung ändert eine Seiteneigenschaft; nichts wird neu kodiert.' },
      ],
    },

    'delete-pdf-pages': {
      titolo: 'PDF-Seiten löschen — Kostenlos online entfernen',
      descrizione: 'Nehmen Sie unerwünschte Seiten aus einem PDF und laden Sie den Rest herunter. Im Browser.',
      h1: 'Seiten aus einem PDF löschen',
      intro: 'Entfernt die Seiten, die Sie angeben, und gibt Ihnen den Rest als neues PDF zurück. Die leere Seite am Ende eines Scans, das Deckblatt, das Sie nicht wollen, die Seiten, die jemand anderem gehören. Läuft im Browser.',
      passi: [
        'Ziehen Sie das PDF hinein.',
        'Geben Sie die zu entfernenden Seiten ein, etwa <strong>1, 4, 9</strong>.',
        'Laden Sie das PDF ohne diese Seiten herunter.',
      ],
      faq: [
        { d: 'Wie gebe ich die Seiten an?', r: 'Seitenzahlen durch Kommas getrennt: 1, 4, 9.' },
        { d: 'Wird das Original verändert?', r: 'Nein. Sie bekommen eine neue Datei; die auf Ihrem Gerät bleibt unangetastet.' },
        { d: 'Wird etwas hochgeladen?', r: 'Nein, das läuft vollständig in Ihrem Browser.' },
      ],
    },

    'add-page-numbers': {
      titolo: 'Seitenzahlen in ein PDF einfügen — Kostenlos',
      descrizione: 'Versehen Sie ein PDF ohne Seitenzahlen mit Nummern. Im Browser, nichts wird hochgeladen.',
      h1: 'Seitenzahlen in ein PDF einfügen',
      intro: 'Setzt auf jede Seite eines ohne Nummerierung angekommenen Dokuments eine Seitenzahl — was in dem Moment zählt, in dem sich jemand in einer Besprechung oder einem Schriftsatz auf "Seite 12" beziehen muss.',
      passi: [
        'Ziehen Sie das PDF hinein.',
        'Die Nummern werden auf jeder Seite einheitlich gesetzt.',
        'Laden Sie das nummerierte PDF herunter.',
      ],
      faq: [
        { d: 'Wo stehen die Nummern?', r: 'In der Fußzeile, an einer Stelle, die den Rändern der meisten Dokumente ausweicht.' },
        { d: 'Kann ich mit einer anderen Zahl als 1 beginnen?', r: 'Die Zählung beginnt auf der ersten Seite der Datei. Um sie zu verschieben, teilen Sie das Dokument und nummerieren den benötigten Teil.' },
        { d: 'Wird etwas hochgeladen?', r: 'Nein, das Nummerieren geschieht in Ihrem Browser.' },
      ],
    },

    'watermark-pdf': {
      titolo: 'Wasserzeichen ins PDF — Kostenlos online stempeln',
      descrizione: 'Stempeln Sie Text wie ENTWURF oder VERTRAULICH über jede Seite. Im Browser, nichts wird hochgeladen.',
      h1: 'Ein Wasserzeichen ins PDF setzen',
      intro: 'Legt Ihren eigenen Text über jede Seite — <strong>ENTWURF</strong>, <strong>VERTRAULICH</strong>, ein Kundenname — damit eine entwischte Kopie erkennbar gekennzeichnet ist. Läuft im Browser.',
      passi: [
        'Ziehen Sie das PDF hinein.',
        'Geben Sie den Text ein, der über die Seiten gestempelt werden soll.',
        'Laden Sie das PDF mit Wasserzeichen herunter.',
      ],
      faq: [
        { d: 'Verdeckt es den Text darunter?', r: 'Nein, die Kennzeichnung wird zart über die Seite gezogen, damit das Dokument lesbar bleibt.' },
        { d: 'Lässt sich das Wasserzeichen entfernen?', r: 'Es wird Teil des Seiteninhalts und lässt sich in einem Leseprogramm nicht abschalten. Es ist eine Abschreckung, keine Verschlüsselung — dafür nehmen Sie "PDF schützen".' },
        { d: 'Wird mein Dokument hochgeladen?', r: 'Nein, es bleibt auf Ihrem Gerät.' },
      ],
    },

    'extract-images-from-pdf': {
      titolo: 'Bilder aus PDF extrahieren — Kostenlos, volle Qualität',
      descrizione: 'Holen Sie jedes eingebettete Foto in Originalqualität aus einem PDF, als ZIP. Läuft im Browser.',
      h1: 'Bilder aus einem PDF extrahieren',
      intro: 'Holt die in einem PDF eingebetteten Bilder in ihrer ursprünglichen Auflösung heraus — die echten Bilder, keine Bildschirmfotos der Seiten. Alles wird in ein ZIP gepackt.',
      passi: [
        'Ziehen Sie das PDF hinein.',
        'Die eingebetteten Bilder werden gefunden und in voller Qualität herausgeholt.',
        'Laden Sie das ZIP herunter.',
      ],
      faq: [
        { d: 'Worin unterscheidet sich das von "PDF in JPG"?', r: '"PDF in JPG" fotografiert jede Seite so, wie sie aussieht. Dies holt die ursprünglichen Bilddateien heraus, die ins Dokument gesetzt wurden, in der Auflösung, in der sie gespeichert wurden.' },
        { d: 'Was, wenn nichts herauskommt?', r: 'Dann enthält das Dokument keine eingebetteten Bilder — ein PDF nur aus Text und Vektorzeichnungen hat keine.' },
        { d: 'Wird etwas hochgeladen?', r: 'Nein, das läuft in Ihrem Browser.' },
      ],
    },

    'pdf-to-text': {
      titolo: 'PDF in Text — Kostenlos als .txt extrahieren',
      descrizione: 'Holen Sie den gesamten lesbaren Text aus einem PDF als einfache .txt-Datei. Im Browser.',
      h1: 'Text aus einem PDF extrahieren',
      intro: 'Holt den gesamten lesbaren Text eines PDF in eine einfache <strong>.txt</strong>-Datei, ohne störende Formatierung. Nützlich zum Suchen, Zitieren oder um ein Dokument an ein anderes Programm zu übergeben.',
      passi: [
        'Ziehen Sie das PDF hinein.',
        'Der Text jeder Seite wird in Lesereihenfolge herausgeholt.',
        'Laden Sie die .txt-Datei herunter.',
      ],
      faq: [
        { d: 'Bleibt die Formatierung erhalten?', r: 'Nein, und das ist Absicht: reiner Text heißt keine Schriften, keine Spalten, keine Tabellen. Wenn Sie die Formatierung wollen, nehmen Sie "PDF in Word".' },
        { d: 'Liest es ein gescanntes Dokument?', r: 'Nein. Ein Scan ist ein Bild von Text, und ohne Zeichenerkennung gibt es nichts zu extrahieren. Die machen wir nicht.' },
        { d: 'Wird mein Dokument hochgeladen?', r: 'Nein, extrahiert wird in Ihrem Browser.' },
      ],
    },
  },
};
