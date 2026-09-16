import type { Site, SpecialtyPage, Story } from "./types";
import { LEGAL } from "./legal";
import en from "./en";
import { BADGES, CALENDLY, CUSTOMER_LOGOS, EMAIL, INTEGRATION_LOGOS, PEOPLE, PHOTOS, SIGN_IN, TEL, VIDEOS } from "./shared";

const callDemo = { label: "Demo-Hotline anrufen", href: TEL };
const contactSales = { label: "Vertrieb kontaktieren", href: "/demo" };
const bookDemo = { label: "Demo buchen", href: "/demo" };
const logos = CUSTOMER_LOGOS(["/customers/omc-amstelland", "/customers/north-texas-eye-specialists", "/customers/cubitts"]);

const TRUST_BADGES = [
  { src: BADGES.hipaa, alt: "HIPAA-konform" },
  { src: BADGES.soc1, alt: "SOC 1 geprüfte Kontrollen" },
  { src: BADGES.iso27001, alt: "ISO 27001 Informationssicherheit" },
  { src: BADGES.gdpr, alt: "DSGVO" },
  { src: BADGES.euai, alt: "Bereit für den EU AI Act" },
  { src: BADGES.fhir, alt: "FHIR-kompatibel" },
  { src: BADGES.baa, alt: "BAA inklusive" },
];
const trust = { title: "Gebaut für Verantwortung im Gesundheitswesen", text: "Jeder Pfad, jede Entscheidung und jede Eskalation ist dokumentiert und prüfbar.", badges: TRUST_BADGES };
const cta = {
  title: "Sehen Sie, wie viele Anrufe mehr Sie beantworten könnten",
  text: "Wir rechnen zurückgewonnene Termine und Personalstunden auf Ihr eigenes Anrufvolumen um.",
  primary: bookDemo, secondary: callDemo, note: "Mit einem Gründer sprechen. Unverbindlich.",
};

function specialty(s: {
  slug: string; name: string; short: string; subtitle: string; description: string; media: typeof VIDEOS.ophthalmology; overlay: SpecialtyPage["hero"]["overlay"];
  cardsTitle: string; tabs: SpecialtyPage["cards"]["tabs"]; journeyTitle: string; journey: { title: string; text: string }[]; photo: string; photoAlt: string;
  quote: SpecialtyPage["quote"]; agents: SpecialtyPage["agents"]["tiles"];
}): SpecialtyPage {
  return {
    slug: s.slug, name: s.name, short: s.short,
    meta: { title: `${s.name} | Optavius`, description: s.description },
    hero: { title: s.name, subtitle: s.subtitle, media: { kind: "video", src: s.media.video, poster: s.media.poster }, overlay: s.overlay },
    logos: { title: "Bearbeitet täglich Hunderte Gespräche bei:", logos },
    cards: { title: s.cardsTitle, tabs: s.tabs },
    journey: { title: s.journeyTitle, features: s.journey, media: { kind: "image", src: s.photo, alt: s.photoAlt }, mediaSide: "right", tone: "product" },
    quote: s.quote,
    agents: { title: "Agenten für die " + s.short, cta: { label: "Alle Agenten", href: "/product/agents" }, tiles: s.agents },
    trust: { ...trust, title: "Gebaut für Vertrauen und Datenschutz in der " + s.short },
    cta,
  };
}

const frontdeskTab = (cards: { title: string; text: string }[]) => ({ label: "Empfang", cards });
const managerTab = (ehr: string) => ({
  label: "Praxismanager",
  cards: [
    { title: "Ein Standard pro Standort", text: "Jede Praxis klingt gleich und folgt denselben Regeln." },
    { title: "Live-Dashboard", text: "Annahmequote, Buchungen, Eskalationen und Gesprächsdauer, pro Standort und Tag." },
    { title: "Prüfpfad", text: "Jede Entscheidung protokolliert, mit der Pfadversion, die sie erzeugt hat." },
    { title: "Klinische Governance", text: "Pfade werden von Ihrer ärztlichen Leitung freigegeben, bevor sie live gehen." },
    { title: "PVS-Anbindung", text: ehr },
    { title: "Mehrsprachig", text: "Deutsch, Englisch, Niederländisch und Spanisch, pro Standort." },
  ],
});

const specialties: SpecialtyPage[] = [
  specialty({
    slug: "ophthalmology", name: "Augenheilkunde", short: "Augenheilkunde",
    subtitle: "Jeder Anruf beantwortet. Jedes Warnsymptom eskaliert.",
    description: "KI-Sprachagenten für Augenarztpraxen. Jeden Anruf beantworten, den richtigen Termin buchen und Warnsymptome nach Protokoll eskalieren.",
    media: VIDEOS.ophthalmology,
    overlay: [
      { side: "start", kind: "user", name: "Anrufer", text: "Ich sehe seit heute Morgen Lichtblitze im linken Auge." },
      { side: "end", kind: "agent", text: "Das kann noch heute abgeklärt werden müssen. Dr. Alvarez hat um 14:40 Uhr einen Notfalltermin. Soll ich ihn buchen?" },
    ],
    cardsTitle: "Bewährt für die häufigsten Anrufe in der Augenheilkunde",
    tabs: [
      { label: "Patienten", cards: [
        { title: "Terminbuchung", text: "Kataraktberatungen, Injektionen, Kontrollen und Nachsorge, mit der passenden Termindauer gebucht." },
        { title: "Warnsymptome", text: "Blitze, Floater, plötzlicher Sehverlust und Schmerzen folgen Ihrem Protokoll und erreichen den Bereitschaftsdienst in Sekunden." },
        { title: "OP-Vorbereitung", text: "Nüchternheit, Tropfenschema und was mitzubringen ist, aus Ihren freigegebenen Skripten." },
        { title: "Rezepte und Folgerezepte", text: "Anfragen mit der Apotheke erfasst und an die richtige Ärztin oder den richtigen Arzt weitergeleitet." },
        { title: "Überweisungen und Versicherung", text: "Was eine Überweisung braucht, welche Kassen Sie annehmen und was ein Termin kostet." },
        { title: "Anfahrt und Öffnungszeiten", text: "Standorte, Parken, Öffnungszeiten und Feiertage, sofort beantwortet." },
      ] },
      frontdeskTab([
        { title: "Überlauf und außerhalb der Sprechzeiten", text: "Anrufe gehen an Optavius, wenn der Empfang besetzt oder geschlossen ist. Nichts landet auf der Mailbox." },
        { title: "Warme Weiterleitung", text: "Komplexe oder verärgerte Anrufer erreichen einen Menschen, mit Transkript und Zusammenfassung." },
        { title: "Erinnerungen und Recalls", text: "Bestätigungen, Erinnerungen und Kontrollaufrufe gehen automatisch raus und landen im Kalender." },
        { title: "No-Show-Rückgewinnung", text: "Versäumte Termine werden innerhalb von zwei Stunden zurückgerufen und neu gebucht." },
        { title: "Warteliste füllen", text: "Ein freigewordener Termin wird der Warteliste angeboten, bis er besetzt ist." },
        { title: "Gesprächszusammenfassungen", text: "Jedes Gespräch wird transkribiert, verschlagwortet und in die Akte geschrieben." },
      ]),
      managerTab("Termine werden in ifa systems, FIDUS, Epic oder Ihr System geschrieben."),
    ],
    journeyTitle: "Bessere Ergebnisse entlang des gesamten Patientenwegs",
    journey: [
      { title: "Patienten schneller zur richtigen Versorgung", text: "Sofort annehmen, den Anrufgrund erkennen und den richtigen Termin beim richtigen Arzt buchen." },
      { title: "Eskalieren, was zählt", text: "Warnsymptome folgen dem Pfad, den Ihre ärztliche Leitung freigegeben hat. Nie ein Ratespiel." },
      { title: "Den OP-Plan voll halten", text: "Recalls, Erinnerungen, No-Show-Rückgewinnung und Wartelistenfüllung schützen jeden Termin." },
      { title: "Dem Empfang seine Zeit zurückgeben", text: "Routinefragen werden ohne Personal beantwortet. Komplexe kommen mit Kontext an." },
      { title: "Berichtet wie ein Teammitglied", text: "Jeder Anruf, jedes Ergebnis und jede Eskalation auf einem Dashboard." },
    ],
    photo: PHOTOS.slitlamp, photoAlt: "Augenärztin untersucht einen Patienten an der Spaltlampe",
    quote: { quote: "Es kennt den Unterschied zwischen einer Kontaktlinsenberatung und einer Nachbestellung. Unser Empfang hat endlich Zeit für den Patienten, der vor ihm steht.", name: "Feike", role: "Praxismanager, OMC Amstelland" },
    agents: [
      { mock: "agent-frontdesk", title: "Empfang", text: "Beantwortet, bucht und verschiebt, rund um die Uhr." },
      { mock: "agent-urgent", title: "Notfall-Routing", text: "Wendet Ihren Warnsymptom-Pfad an und leitet mit Zusammenfassung weiter." },
      { mock: "agent-postop", title: "Post-OP-Nachsorge", text: "Ruft jeden operierten Patienten an und erfasst strukturierte Antworten." },
      { mock: "agent-noshow", title: "No-Show-Rückgewinnung", text: "Bucht versäumte Termine neu und berichtet die zurückgewonnene Zeit." },
    ],
  }),
  specialty({
    slug: "optometry", name: "Optometrie", short: "Optometrie",
    subtitle: "Sehtests gebucht. Bestellungen beantwortet. Linsen nachbestellt.",
    description: "KI-Sprachagenten für Optometristen und Augenoptiker. Sehtests buchen, Bestellstatus beantworten und Kontaktlinsen telefonisch nachbestellen.",
    media: VIDEOS.optometry,
    overlay: [
      { side: "start", kind: "user", name: "Anrufer", text: "Ist meine neue Brille zum Abholen bereit?" },
      { side: "end", kind: "agent", text: "Sie ist heute Morgen angekommen, Herr Okafor. Wir haben heute bis 18 Uhr und samstags von 9 bis 13 Uhr geöffnet." },
    ],
    cardsTitle: "Bewährt für die häufigsten Anrufe in der Optometrie",
    tabs: [
      { label: "Kunden", cards: [
        { title: "Sehtest buchen", text: "Routine-, Kontaktlinsen- und Kinder-Sehtests, mit der richtigen Dauer und dem richtigen Optometristen gebucht." },
        { title: "Bestellstatus", text: "Brillen, Linsen und Reparaturen. Fertig oder noch nicht, mit dem zugesagten Datum." },
        { title: "Kontaktlinsen nachbestellen", text: "Prüft das Rezept und löst die Nachbestellung an die hinterlegte Adresse aus." },
        { title: "Versicherung und Preise", text: "Welche Kassen Sie annehmen, was ein Sehtest kostet und was übernommen wird." },
        { title: "Fragen zu Fassungen und Gläsern", text: "Gleitsicht, Beschichtungen, Blaulicht und Anpassungen, in einfacher Sprache beantwortet." },
        { title: "Öffnungszeiten und Standorte", text: "Öffnungszeiten, Parken und Anfahrt für jedes Geschäft." },
      ] },
      frontdeskTab([
        { title: "Stoßzeiten abfangen", text: "Samstagsschlangen und Mittagsspitzen kosten Sie keine Anrufer mehr." },
        { title: "Abholbereit-Anrufe", text: "Kunden erfahren sofort, wenn eine Bestellung eintrifft, und rufen nicht mehr nach." },
        { title: "Recalls", text: "Jährliche Sehtest-Erinnerungen gehen raus und werden ohne Anrufliste gebucht." },
        { title: "Warme Weiterleitung", text: "Anpassungen, Reklamationen und alles Unklare erreichen einen Menschen mit Kontext." },
        { title: "No-Show-Rückgewinnung", text: "Versäumte Sehtests werden zurückgerufen und neu gebucht." },
        { title: "Gesprächszusammenfassungen", text: "Jedes Gespräch transkribiert und in die Kundenakte geschrieben." },
      ]),
      { label: "Filialleiter", cards: [
        { title: "Jedes Geschäft, ein Standard", text: "Gleiche Begrüßung, gleiche Regeln, ein Dashboard für die Kette." },
        { title: "Labor- und Bestellanbindung", text: "Bestellstatus aus Ihrem Praxissystem oder Laborexport gelesen." },
        { title: "Marketing-Nachfassen", text: "Bestätigungen und Erinnerungen halten die Sehtest-Termine voll." },
        { title: "Reporting", text: "Beantwortete Anrufe, Buchungen und Nachbestellungen pro Geschäft und Tag." },
        { title: "Systemanbindungen", text: "Eyefinity, RevolutionEHR, Crystal PM, Compulink und mehr." },
        { title: "Mehrsprachig", text: "Deutsch, Englisch, Niederländisch und Spanisch, pro Geschäft." },
      ] },
    ],
    journeyTitle: "Vom ersten Anruf bis zum zufriedenen Brillenträger",
    journey: [
      { title: "Den Sehtest-Kalender füllen", text: "Jeden Anruf beantworten, den richtigen Sehtest buchen und per SMS bestätigen." },
      { title: "Die Statusanrufe beenden", text: "Kunden erfahren, dass ihre Brille fertig ist, bevor sie fragen." },
      { title: "Kontaktlinsen-Umsatz steigern", text: "Nachbestellungen per Telefon, Rezept geprüft, nach Hause geliefert." },
      { title: "Das Verkaufsteam entlasten", text: "Weniger Telefonunterbrechungen bedeuten mehr Zeit für den Kunden im Geschäft." },
      { title: "Jedes Geschäft auf einen Blick", text: "Ein Dashboard für Anrufe, Buchungen und Bestellungen über alle Standorte." },
    ],
    photo: PHOTOS.shop, photoAlt: "Optikerin hilft einem Kunden bei der Fassungswahl",
    quote: { quote: "Statusanfragen zu Bestellungen haben früher unsere Samstage gefüllt. Jetzt sagt das Telefon den Leuten, dass ihre Brille fertig ist, bevor sie daran denken zu fragen.", name: "Tom", role: "Gründer, Cubitts" },
    agents: [
      { mock: "agent-frontdesk", title: "Empfang", text: "Bucht Sehtests und beantwortet Fragen, rund um die Uhr." },
      { mock: "agent-orders", title: "Bestellstatus", text: "Sagt Anrufern, wo ihre Brille oder Linsen stehen." },
      { mock: "agent-reorder", title: "Kontaktlinsen-Nachbestellung", text: "Prüft das Rezept und löst die Bestellung aus." },
      { mock: "agent-recall", title: "Recall und Erinnerungen", text: "Findet jeden Kunden, der einen Sehtest braucht, und bucht ihn." },
    ],
  }),
  specialty({
    slug: "dermatology", name: "Dermatologie", short: "Dermatologie",
    subtitle: "Kürzere Wartezeiten. Vollere Kalender. Ruhigere Empfänge.",
    description: "KI-Sprachagenten für Hautarztpraxen. Jeden Anruf beantworten, Beratungen und Kontrollen buchen und dringende Hautbefunde nach Protokoll weiterleiten.",
    media: VIDEOS.dermatology,
    overlay: [
      { side: "start", kind: "user", name: "Anrufer", text: "Ich hätte gern einen Muttermal-Check. Mein Hausarzt hat letzte Woche überwiesen." },
      { side: "end", kind: "agent", text: "Die Überweisung liegt vor. Dr. Lindqvist hat am Donnerstag um 10:20 Uhr Zeit. Soll ich buchen?" },
    ],
    cardsTitle: "Bewährt für die häufigsten Anrufe in der Dermatologie",
    tabs: [
      { label: "Patienten", cards: [
        { title: "Terminbuchung", text: "Hautkrebsvorsorge, Akne- und Ekzemkontrollen sowie ästhetische Beratungen, mit passender Dauer." },
        { title: "Dringende Befunde", text: "Sich schnell verändernde Hautstellen, starke Reaktionen und Probleme nach Eingriffen folgen Ihrem Protokoll." },
        { title: "Vorbereitung auf Eingriffe", text: "Was abzusetzen, was mitzubringen und wie vorzubereiten ist, aus Ihren freigegebenen Skripten." },
        { title: "Rezepte und Folgerezepte", text: "Anfragen erfasst und an die richtige Ärztin oder den richtigen Arzt geleitet." },
        { title: "Überweisungen und Versicherung", text: "Anforderungen an Überweisungen, akzeptierte Kassen und Terminkosten." },
        { title: "Öffnungszeiten und Standorte", text: "Öffnungszeiten, Anfahrt und Parken für jede Praxis." },
      ] },
      frontdeskTab([
        { title: "Überlauf und außerhalb der Sprechzeiten", text: "Anrufe erreichen Optavius, wenn der Empfang besetzt oder geschlossen ist." },
        { title: "Warme Weiterleitung", text: "Komplexe Anrufer erreichen das Team mit Transkript und Zusammenfassung." },
        { title: "Erinnerungen und Recalls", text: "Jährliche Hautchecks und Kontrollen ohne Anrufliste gebucht." },
        { title: "No-Show-Rückgewinnung", text: "Versäumte Termine innerhalb von zwei Stunden zurückgerufen." },
        { title: "Warteliste füllen", text: "Freigewordene Termine der Warteliste angeboten, bis sie besetzt sind." },
        { title: "Gesprächszusammenfassungen", text: "Jedes Gespräch transkribiert und in die Akte geschrieben." },
      ]),
      managerTab("Termine werden in ModMed, Nextech, Epic oder Ihr System geschrieben."),
    ],
    journeyTitle: "Bessere Ergebnisse entlang des gesamten Patientenwegs",
    journey: [
      { title: "Die Wartezeit bis zum ersten Termin verkürzen", text: "Überweisungen gelesen, Patienten angerufen und der richtige Termin gebucht." },
      { title: "Eskalieren, was zählt", text: "Dringende Hautbefunde folgen Ihrem Protokoll und erreichen die richtige Person." },
      { title: "Die Behandlungsräume voll halten", text: "Recalls, Erinnerungen, No-Show-Rückgewinnung und Wartelistenfüllung." },
      { title: "Dem Empfang seine Zeit zurückgeben", text: "Routinefragen ohne Personal beantwortet." },
      { title: "Berichtet wie ein Teammitglied", text: "Jeder Anruf und jedes Ergebnis auf einem Dashboard." },
    ],
    photo: PHOTOS.examroom, photoAlt: "Modernes Behandlungszimmer",
    quote: { quote: "Patienten sagen uns, das Telefon sei endlich einfach. Unser Team sagt dasselbe.", name: "Ahmed", role: "Praxisinhaber, North Texas Eye Specialists" },
    agents: [
      { mock: "agent-frontdesk", title: "Empfang", text: "Beantwortet, bucht und verschiebt, rund um die Uhr." },
      { mock: "agent-referral", title: "Überweisungsaufnahme", text: "Liest Überweisungen, fragt Fehlendes nach und bereitet die Buchung vor." },
      { mock: "agent-recall", title: "Recall und Erinnerungen", text: "Findet jeden Patienten, der eine Kontrolle braucht, und bucht ihn." },
      { mock: "agent-noshow", title: "No-Show-Rückgewinnung", text: "Bucht versäumte Termine neu und berichtet, was zurückgewonnen wurde." },
    ],
  }),
  specialty({
    slug: "veterinary", name: "Tiermedizin", short: "Tiermedizin",
    subtitle: "Jeder Halter gehört. Jedes Tier gebucht.",
    description: "KI-Sprachagenten für Tierarztpraxen. Jeden Anruf beantworten, Sprechstunden und Impfungen buchen und Notfälle an Ihr Team leiten.",
    media: VIDEOS.veterinary,
    overlay: [
      { side: "start", kind: "user", name: "Anrufer", text: "Milo braucht seine Auffrischungsimpfung und kratzt sich viel am Ohr." },
      { side: "end", kind: "agent", text: "Machen wir beides in einem Besuch. Dr. Mensah hat morgen um 16:10 Uhr Zeit. Soll ich buchen?" },
    ],
    cardsTitle: "Bewährt für die häufigsten Anrufe in der Tierarztpraxis",
    tabs: [
      { label: "Tierhalter", cards: [
        { title: "Terminbuchung", text: "Sprechstunden, Impfungen, Zahnbehandlungen und OP-Nachkontrollen, beim richtigen Tierarzt und in der richtigen Dauer." },
        { title: "Notfälle", text: "Vergiftung, Atemnot und Verletzungen folgen Ihrem Protokoll und erreichen sofort den diensthabenden Tierarzt." },
        { title: "Futter- und Medikamentenbestellungen", text: "Folgerezepte und Diätfutter erfasst und bestätigt." },
        { title: "Preise und Versicherung", text: "Was ein Besuch kostet, mit welchen Versicherern Sie arbeiten und welche Zahlungsarten es gibt." },
        { title: "Vorbereitung", text: "Nüchtern vor der OP, was mitzubringen ist und wie das Tier ruhig bleibt." },
        { title: "Öffnungszeiten und Standorte", text: "Öffnungszeiten, Anfahrt und Parken für jede Praxis." },
      ] },
      frontdeskTab([
        { title: "Überlauf und außerhalb der Sprechzeiten", text: "Abende, Wochenenden und volle Vormittage ohne Mailbox beantwortet." },
        { title: "Warme Weiterleitung", text: "Besorgte Halter erreichen einen Menschen mit Transkript und Zusammenfassung." },
        { title: "Erinnerungen und Recalls", text: "Impfungen, Entwurmungen und Jahreschecks automatisch gebucht." },
        { title: "No-Show-Rückgewinnung", text: "Versäumte Termine zurückgerufen und neu gebucht." },
        { title: "Warteliste füllen", text: "Freigewordene Termine der Warteliste angeboten, bis sie besetzt sind." },
        { title: "Gesprächszusammenfassungen", text: "Jedes Gespräch transkribiert und in die Patientenakte geschrieben." },
      ]),
      { label: "Praxismanager", cards: [
        { title: "Ein Standard pro Praxis", text: "Gleiche Begrüßung und Regeln in der gesamten Gruppe." },
        { title: "Live-Dashboard", text: "Annahmequote, Buchungen und Eskalationen pro Praxis." },
        { title: "Prüfpfad", text: "Jede Entscheidung mit ihrer Protokollversion protokolliert." },
        { title: "Klinische Governance", text: "Protokolle von Ihrer leitenden Tierärztin oder Ihrem leitenden Tierarzt freigegeben, bevor sie live gehen." },
        { title: "PVS-Anbindung", text: "Termine werden in Ihr Praxisverwaltungssystem geschrieben." },
        { title: "Mehrsprachig", text: "Deutsch, Englisch, Niederländisch und Spanisch, pro Praxis." },
      ] },
    ],
    journeyTitle: "Bessere Ergebnisse für Tiere, Halter und Ihr Team",
    journey: [
      { title: "Jeden Halter sofort beantworten", text: "Keine Warteschleife, keine Mailbox, auch nicht um 7 Uhr am Montagmorgen." },
      { title: "Echte Notfälle eskalieren", text: "Ihr Protokoll entscheidet, was den diensthabenden Tierarzt erreicht, und wie schnell." },
      { title: "Den Kalender voll halten", text: "Recalls, Erinnerungen und No-Show-Rückgewinnung schützen jeden Termin." },
      { title: "Den Empfang entlasten", text: "Routinefragen ohne Personal beantwortet." },
      { title: "Jede Praxis auf einen Blick", text: "Ein Dashboard für Anrufe und Buchungen über alle Standorte." },
    ],
    photo: PHOTOS.frontdesk, photoAlt: "Empfang einer Praxis",
    quote: { quote: "Die Einführung ging schnell. Wir haben die Nummer an einem Dienstag weitergeleitet und am Donnerstag keine Anrufe mehr verpasst.", name: "Ahmed", role: "Praxisinhaber, North Texas Eye Specialists" },
    agents: [
      { mock: "agent-frontdesk", title: "Empfang", text: "Beantwortet, bucht und verschiebt, rund um die Uhr." },
      { mock: "agent-urgent", title: "Notfall-Routing", text: "Wendet Ihr Protokoll an und erreicht den diensthabenden Tierarzt." },
      { mock: "agent-recall", title: "Recall und Erinnerungen", text: "Impfungen und Checks ohne Anrufliste gebucht." },
      { mock: "agent-noshow", title: "No-Show-Rückgewinnung", text: "Bucht versäumte Termine neu und berichtet, was zurückgewonnen wurde." },
    ],
  }),
];

const stories: Story[] = [
  {
    ...en.customers.stories[0],
    meta: { title: "OMC Amstelland | Optavius", description: "Wie OMC Amstelland im ersten Monat von 30 % verpassten Anrufen auf null kam." },
    title: "Von 30 % verpassten Anrufen auf null, im ersten Monat.",
    stats: [{ value: "0%", label: "Anrufe unbeantwortet" }, { value: ">60%", label: "Ohne Personal erledigt" }, { value: "+23%", label: "Termine gebucht" }],
    industry: "Augenheilkunde",
    body: [
      { type: "h2", text: "Zwei Standorte, eine gemeinsame Leitung." },
      { type: "p", text: "OMC Amstelland ist eine Augenklinik in Diemen bei Amsterdam mit zwei Standorten und einer gemeinsamen Telefonleitung. Der Empfang nimmt auch Patienten auf. Zu Stoßzeiten und nach 17 Uhr blieb ein Drittel der Anrufe unbeantwortet, und die Hälfte der Anrufer, die auf der Mailbox landeten, rief nie zurück." },
      { type: "p", text: "Die Klinik leitete ihre bestehende Nummer an Optavius weiter. Buchen, Verschieben, Bestellstatus und Praxisinformationen wurden in der ersten Woche eingerichtet, zusammen mit einem Warnsymptom-Pfad, den die ärztliche Leitung freigab. Optavius war in unter zwei Wochen live." },
      { type: "media", media: { kind: "mock", name: "story-omc" } },
      { type: "h2", text: "Was sich geändert hat." },
      { type: "p", text: "Jeder Anruf wird jetzt beim ersten Klingeln angenommen, auch fünfzig gleichzeitig. Mehr als sechs von zehn Anrufen werden vollständig ohne Personal erledigt: Auskünfte, Bestellstatus und Buchungen. Warnsymptome erreichen den diensthabenden Augenarzt in Sekunden, mit Zusammenfassung." },
      { type: "p", text: "Die Zahlen stammen aus 8.420 eingehenden Anrufen im Mai und Juni 2026. Anrufer, die früher auflegten, buchen jetzt, ebenso Anrufer außerhalb der Sprechzeiten. Die gebuchten Termine stiegen um 23 Prozent, und der Empfang gewann rund 170 Stunden im Monat zurück." },
      { type: "quote", quote: "Es kennt den Unterschied zwischen einer Kontaktlinsenberatung und einer Nachbestellung. Unser Empfang hat endlich Zeit für den Patienten, der vor ihm steht.", name: "Feike", role: "Praxismanager, OMC Amstelland" },
    ],
    card: { ...en.customers.stories[0].card, stat: { value: "0%", label: "Anrufe unbeantwortet" } },
  },
  {
    ...en.customers.stories[1],
    meta: { title: "North Texas Eye Specialists | Optavius", description: "Wie eine Augenarztgruppe in Texas aufhörte, Anrufer außerhalb der Sprechzeiten zu verlieren." },
    title: "Jeder Anruf außerhalb der Sprechzeiten beantwortet, an allen Standorten der Gruppe.",
    stats: [{ value: "24/7", label: "Erreichbarkeit" }, { value: "2 Sek.", label: "Durchschnittliche Reaktionszeit" }, { value: "48 Std.", label: "Zeit bis live" }],
    industry: "Augenheilkunde",
    body: [
      { type: "h2", text: "Eine Gruppe, die schneller wuchs als ihre Telefonanlage." },
      { type: "p", text: "North Texas Eye Specialists betreibt mehrere augenärztliche Standorte im Raum Dallas. Jeder Standort hatte seine eigene Leitung, seine eigene Begrüßung und seine eigenen Lücken. Nach 17 Uhr und am Wochenende gingen Anrufe an einen Telefonservice, der nur Nachrichten aufnahm." },
      { type: "p", text: "Optavius beantwortet jetzt jeden Standort mit einem Standard. Es bucht Kataraktberatungen, Kontrollen und Injektionen in den richtigen Termin, liest das Notfallprotokoll der Gruppe und leitet mit Zusammenfassung an den diensthabenden Arzt weiter." },
      { type: "media", media: { kind: "mock", name: "story-ntx" } },
      { type: "h2", text: "Live in 48 Stunden." },
      { type: "p", text: "Die Gruppe leitete ihre Nummern an einem Dienstag weiter. Optavius wurde am selben Tag mit Ärzten, Sprechzeiten und Pfaden eingerichtet und ging am Donnerstag live. Die PVS-Anbindung folgte später, ohne das Telefon zu unterbrechen." },
      { type: "quote", quote: "Patienten sagen uns, das Telefon sei endlich einfach. Unser Team sagt dasselbe.", name: "Ahmed", role: "Praxisinhaber, North Texas Eye Specialists" },
    ],
    card: { ...en.customers.stories[1].card, stat: { value: "24/7", label: "Erreichbarkeit" } },
  },
  {
    ...en.customers.stories[2],
    meta: { title: "Cubitts | Optavius", description: "Wie Cubitts Statusanfragen und Nachbestellungen von der Verkaufsfläche holte." },
    title: "Bestellstatus und Nachbestellungen, erledigt bevor das Geschäft öffnet.",
    stats: [{ value: ">60%", label: "Anrufe ohne Personal erledigt" }, { value: "≈170 Std.", label: "Eingesparte Personalstunden pro Monat" }],
    industry: "Optometrie",
    body: [
      { type: "h2", text: "Schöne Geschäfte, volle Telefone." },
      { type: "p", text: "Cubitts entwirft und fertigt Brillen in London und verkauft sie in eigenen Geschäften. Die meisten Anrufe drehten sich um dieselben drei Dinge: Ist meine Bestellung fertig, kann ich meine Linsen nachbestellen und wann habt ihr geöffnet. Jeder davon zog einen Optiker von einem Kunden im Geschäft weg." },
      { type: "p", text: "Optavius beantwortet diese Anrufe aus dem Bestellsystem und dem Geschäftsplan. Abholbereit-Anrufe gehen raus, sobald eine Bestellung eintrifft, sodass Kunden nicht mehr nachfragen. Nachbestellungen werden gegen das Rezept geprüft und an die hinterlegte Adresse ausgelöst." },
      { type: "media", media: { kind: "mock", name: "story-cubitts" } },
      { type: "h2", text: "Was das Verkaufsteam bemerkte." },
      { type: "p", text: "Weniger Unterbrechungen und ruhigere Samstage. Alles, was der Agent nicht beantworten kann, etwa ein Anpassungsproblem oder eine Reklamation, erreicht einen Menschen mit dem Transkript." },
      { type: "quote", quote: "Statusanfragen zu Bestellungen haben früher unsere Samstage gefüllt. Jetzt sagt das Telefon den Leuten, dass ihre Brille fertig ist, bevor sie daran denken zu fragen.", name: "Tom", role: "Gründer, Cubitts" },
    ],
    card: { ...en.customers.stories[2].card, stat: { value: ">60%", label: "Ohne Personal erledigt" } },
  },
];

const related = (exclude: string) =>
  [
    { key: "console", title: "Konsole", text: "Ihr Tag, schon sortiert. Das Morgenbriefing, was Sie braucht, und jeder Anruf an einem Ort.", href: "/product/console", mock: "briefing", zoom: 1.1, linkLabel: "Mehr entdecken" },
    { key: "ask", title: "Ask Optavius", text: "Verbinden Sie Ihre Systeme und fragen Sie alles zu Ihrer eigenen Praxis. 90 Tage kostenlos.", href: "/product/ask-optavius", mock: "insights-query", linkLabel: "Mehr entdecken" },
    { key: "agents", title: "Agenten", text: "Eine Aufgabe, ein Preis, ein Dashboard. Starten Sie mit dem Empfang und fügen Sie den nächsten Agenten per Klick hinzu.", href: "/product/agents", mock: "agent-frontdesk", linkLabel: "Mehr entdecken" },
    { key: "integrations", title: "Integrationen", text: "Funktioniert mit Ihrer Telefonanlage, Ihrem Kalender und Ihrem PVS. Standalone starten, verbinden, wenn Sie bereit sind.", href: "/product/integrations", mock: "hz-context", linkLabel: "Mehr entdecken" },
  ].filter((c) => c.key !== exclude);

const de: Site = {
  lang: "de",
  meta: { ...en.meta, description: "KI-Sprachagenten für Augenheilkunde und Facharztpraxen. Jeder Patientenanruf beantwortet, jeder Termin gebucht, rund um die Uhr." },
  ui: {
    nav: {
      product: "Produkt", specialties: "Fachgebiete", customers: "Kunden", company: "Unternehmen", signIn: "Anmelden", cta: bookDemo,
      productOverview: { title: "Produktübersicht", text: "KI-Sprachagenten, die beantworten, buchen und nachfassen, in einer Konsole.", button: "Optavius kennenlernen" },
      productGroups: [
        { label: "Betreiben", items: [
          { label: "Konsole", text: "Ihr Tag, schon sortiert.", href: "/product/console" },
          { label: "Ask Optavius", text: "Kostenlose Antworten aus Ihren eigenen Praxisdaten.", href: "/product/ask-optavius" },
        ] },
        { label: "Wachsen", items: [
          { label: "Agenten", text: "Empfang, Recall, Bestellstatus und mehr.", href: "/product/agents" },
          { label: "Integrationen", text: "Telefonanlage, Kalender und PVS.", href: "/product/integrations" },
        ] },
        { label: "Tarife", items: [{ label: "Preise", text: "Einfache Monatstarife. Keine Verträge.", href: "/pricing" }] },
      ],
      specialtyItems: [
        { label: "Augenheilkunde", text: "Jeder Anruf beantwortet, jedes Warnsymptom eskaliert.", href: "/specialties/ophthalmology" },
        { label: "Optometrie", text: "Sehtests gebucht, Bestellungen beantwortet, Linsen nachbestellt.", href: "/specialties/optometry" },
        { label: "Dermatologie", text: "Kürzere Wartezeiten und vollere Kalender.", href: "/specialties/dermatology" },
        { label: "Tiermedizin", text: "Jeder Halter gehört, jedes Tier gebucht.", href: "/specialties/veterinary" },
      ],
      companyItems: [
        { label: "Über uns", text: "Wer Optavius baut, und warum.", href: "/about" },
        { label: "Karriere", text: "Helfen Sie Facharztpraxen, jeden Anruf zu beantworten.", href: "/careers" },
        { label: "Ressourcen", text: "Leitfäden, Vergleiche und Kundengeschichten.", href: "/resources" },
        { label: "Demo buchen", text: "Wählen Sie einen Termin mit einem Gründer.", href: "/demo" },
      ],
      language: "Sprache", menu: "Menü", close: "Schließen",
    },
    footer: {
      tagline: "KI-Sprachagenten für Facharztpraxen. Ihre Praxis läuft. Auch wenn Sie nicht da sind.",
      groups: [
        { title: "Produkt", items: [{ label: "Produktübersicht", href: "/product" }, { label: "Konsole", href: "/product/console" }, { label: "Ask Optavius", href: "/product/ask-optavius" }, { label: "Agenten", href: "/product/agents" }, { label: "Integrationen", href: "/product/integrations" }, { label: "Preise", href: "/pricing" }] },
        { title: "Fachgebiete", items: [{ label: "Alle Fachgebiete", href: "/specialties" }, { label: "Augenheilkunde", href: "/specialties/ophthalmology" }, { label: "Optometrie", href: "/specialties/optometry" }, { label: "Dermatologie", href: "/specialties/dermatology" }, { label: "Tiermedizin", href: "/specialties/veterinary" }] },
        { title: "Kunden", items: [{ label: "Kundengeschichten", href: "/customers" }, { label: "OMC Amstelland", href: "/customers/omc-amstelland" }, { label: "North Texas Eye Specialists", href: "/customers/north-texas-eye-specialists" }, { label: "Cubitts", href: "/customers/cubitts" }] },
        { title: "Unternehmen", items: [{ label: "Über uns", href: "/about" }, { label: "Ressourcen", href: "/resources" }, { label: "Karriere", href: "/careers" }, { label: "Demo buchen", href: "/demo" }, { label: "Anmelden", href: SIGN_IN, external: true }] },
      ],
      legal: [{ label: "Datenschutz", href: "/privacy" }, { label: "AGB", href: "/terms" }],
      copyright: "© 2026 Optavius",
    },
    common: {
      bookDemo: "Demo buchen", callDemo: "Demo-Hotline anrufen", demoNote: "Mit einem Gründer sprechen. Unverbindlich.", learnMore: "Mehr erfahren", readStory: "Geschichte lesen", readMore: "Mehr lesen", discoverMore: "Mehr entdecken", fullStory: "Ganze Geschichte", getStarted: "Jetzt starten", contactSales: "Vertrieb kontaktieren", mostPopular: "Am beliebtesten", perMonth: "/Monat", playVideo: "Video abspielen", pauseVideo: "Video pausieren", customerStories: "Kundengeschichten", allSpecialties: "Alle Fachgebiete", openRoles: "Offene Stellen", search: "Suchen", skip: "Zum Inhalt springen",
    },
  },

  home: {
    meta: { title: "KI-Sprachagenten für die Augenheilkunde | Optavius", description: "KI-Sprachagenten für Augenärzte und Augenoptiker, die Fragen beantworten, Termine vereinbaren und Routineanfragen erledigen, rund um die Uhr." },
    hero: {
      title: "Jeder Patientenanruf beantwortet.\nJede Chance genutzt.",
      subtitle: "KI-Sprachagenten für Augenärzte und Augenoptiker, die Fragen beantworten, Termine vereinbaren und Routineanfragen erledigen, rund um die Uhr.",
      primary: bookDemo, secondary: callDemo, note: "Mit einem Gründer sprechen. Unverbindlich.",
      slides: [
        { ...VIDEOS.fold1, bubbles: [
          { side: "end", kind: "agent", text: "Danke für Ihren Anruf bei Augenzentrum West. Hier ist Optavius. Wie kann ich helfen?" },
          { side: "start", kind: "user", name: "Sarah", text: "Ich sehe seit heute Morgen Lichtblitze im linken Auge." },
          { side: "end", kind: "agent", text: "Das kann noch heute abgeklärt werden müssen. Dr. Alvarez hat heute um 14:40 Uhr einen Notfalltermin. Soll ich ihn buchen?" },
          { side: "start", kind: "user", name: "Sarah", text: "Ja, bitte." },
          { side: "end", kind: "agent", text: "Erledigt. Sie sind heute um 14:40 Uhr gebucht. Ich habe eine Bestätigung per SMS geschickt." },
        ] },
        { ...VIDEOS.fold2, bubbles: [
          { side: "end", kind: "agent", text: "Danke für Ihren Anruf bei Cubitts. Hier ist Optavius. Wie kann ich helfen?" },
          { side: "start", kind: "user", name: "Daniel", text: "Ich habe vor zwei Wochen eine neue Brille bestellt. Ist sie fertig?" },
          { side: "end", kind: "agent", text: "Ich schaue nach. Darf ich Ihr Geburtsdatum haben?" },
          { side: "start", kind: "user", name: "Daniel", text: "Dritter März 1981." },
          { side: "end", kind: "agent", text: "Sie ist heute Morgen angekommen, Herr Okafor. Wir haben heute bis 18 Uhr und samstags von 9 bis 13 Uhr geöffnet." },
        ] },
        { ...VIDEOS.fold3, bubbles: [
          { side: "end", kind: "agent", text: "OMC Amstelland, hier ist Optavius. Wie kann ich helfen?" },
          { side: "start", kind: "user", name: "Lena", text: "Ich möchte meine Kontaktlinsen nachbestellen." },
          { side: "end", kind: "agent", text: "Ich sehe ein gültiges Rezept für Acuvue Oasys, minus 2,75 rechts und minus 3,00 links. Dieselben noch einmal?" },
          { side: "start", kind: "user", name: "Lena", text: "Ja, wie beim letzten Mal." },
          { side: "end", kind: "agent", text: "Ihre Nachbestellung ist ausgelöst und geht an die hinterlegte Adresse. Noch etwas?" },
        ] },
      ],
    },
    logos: { title: "Bearbeitet täglich Hunderte Gespräche bei:", logos },
    demo: {
      title: "Hören Sie, wie Optavius einen echten Anruf annimmt",
      lede: "Drücken Sie auf Play, oder rufen Sie die Demo-Hotline an und probieren Sie es selbst.",
      sampleLabel: "Beispielanruf (Englisch) · Augenuntersuchung verschieben",
      duration: "0:47", play: "Beispielanruf abspielen", stop: "Stopp", hint: "Das Transkript folgt dem Anruf.",
      call: callDemo, note: "Es ist Optavius, das abnimmt.",
      transcript: [
        { who: "agent", at: 0, text: "Hi, I'm Julia, Optavius's digital assistant. This call may be recorded. How can I help?" },
        { who: "caller", at: 6, text: "Hey Julia, this is Peter. I have an eye exam scheduled. Can I reschedule it to next week?" },
        { who: "agent", at: 18, text: "Absolutely, Peter. I've found your details connected to the phone number you're calling from. What day and time next week would you prefer for your eye exam?" },
        { who: "caller", at: 26, text: "Tuesday, either 3:00 or 4:00 PM, if that's possible." },
        { who: "agent", at: 32, text: "I've moved your eye exam to Tuesday at 4:00 PM. You're all set, and I'll send a confirmation text message to the number you're calling from. Is there anything else I can help you with?" },
        { who: "caller", at: 41, text: "Amazing. That's it. Thank you." },
        { who: "agent", at: 46, text: "You're very welcome, Peter. Goodbye." },
      ],
    },
    bento: {
      title: "Ihre Praxis läuft.\nAuch wenn Sie nicht da sind.",
      lede: "Optavius beantwortet, bucht und fasst nach, damit sich Ihr Team auf den Patienten vor ihm konzentrieren kann.",
      cards: [
        { id: "green", title: "Aus jedem Anruf einen gebuchten Termin machen", body: "Jeden Anruf beantworten, Tag und Nacht, und direkt in Ihren Kalender buchen.", sr: "Animation von Anrufen verschiedener Augenarztpraxen, die beantwortet und gebucht werden." },
        { id: "blue", title: "Jedem Team seine Zeit zurückgeben", body: "Empfang, Ärzte und Manager hören auf zu telefonieren und kümmern sich um Patienten.", sr: "Animation der Auswahl eines Sehtest-Termins und einer Kontaktlinsen-Nachbestellung." },
        { id: "pink", title: "Ein Agent auf jedem Kanal", body: "Sprache zuerst, mit Webchat, E-Mail, SMS und WhatsApp unter denselben Regeln.", sr: "Animation eines Gesprächs, das sich über Sprache, Chat, E-Mail und SMS bewegt." },
        { id: "orange", title: "Für erledigte Arbeit bezahlen", body: "Einfache Monatstarife. Keine Verträge. Jederzeit kündbar.", sr: "Animation von Bewertungen und einem abgeschlossenen Ergebnis." },
      ],
    },
    console: { title: "Die Konsole kennenlernen", lede: "Jeder Anruf, jede Buchung und jede Eskalation an einem Ort. Fragen Sie alles in einfacher Sprache." },
    proof: {
      title: "Was sich änderte, als Optavius das Telefon übernahm",
      lede: "Gemessen bei Cubitts, vor und nachdem Optavius das Telefon übernahm.",
      outcomes: [
        { after: "+23%", label: "Mehr gebuchte Termine", text: "Anrufer außerhalb der Sprechzeiten und Anrufer, die früher auflegten, buchen jetzt." },
        { after: "≈170 Std.", label: "Eingesparte Personalstunden pro Monat", text: "2.526 Anrufe im Monat ohne Personal erledigt, bei vier Minuten pro Anruf." },
        { before: "4 Min.", after: "2 Sek.", label: "Durchschnittliche Reaktionszeit", text: "Von vier Minuten Warteschleife zu Stoßzeiten zu einer Antwort beim ersten Klingeln." },
        { before: "0%", after: ">60%", label: "Ohne Personal erledigt", text: "Mehr als sechs von zehn Anrufen werden vollständig abgeschlossen: Auskünfte, Bestellstatus, Buchungen." },
        { before: "50%", after: "0%", label: "Verpasste Anrufer, die nie wieder anriefen", text: "Die Hälfte der Anrufer auf der Mailbox rief nie zurück. Es gibt keine Mailbox mehr." },
        { before: "30%", after: "0%", label: "Nie beantwortete Anrufe", text: "Fast ein Drittel der Anrufe blieb unbeantwortet. Jetzt wird jeder Anruf angenommen, auch 50 gleichzeitig." },
      ],
      source: "Ergebnisse aus 8.420 eingehenden Anrufen im Mai und Juni 2026 bei Cubitts.",
    },
    agents: {
      title: "Die Agenten kennenlernen",
      lede: "Jeder erledigt eine Aufgabe, von Anfang bis Ende, und berichtet Ihnen jeden Tag.",
      cta: { label: "Alle Agenten", href: "/product/agents" },
      tiles: [
        { mock: "agent-frontdesk", title: "Empfang", text: "Beantwortet jeden Anruf, bucht, verschiebt und storniert, rund um die Uhr." },
        { mock: "agent-orders", title: "Bestellstatus", text: "Sagt Anrufern, wo ihre Brille, Linsen oder Bestellung stehen." },
        { mock: "agent-recall", title: "Recall und Erinnerungen", text: "Findet jeden Patienten, der eine Kontrolle braucht, und bucht ihn." },
        { mock: "agent-noshow", title: "No-Show-Rückgewinnung", text: "Ruft jeden No-Show innerhalb von zwei Stunden an und bucht neu." },
      ],
    },
    live: {
      title: "Live in 48 Stunden. Nicht in 48 Tagen.",
      lede: "Nichts zu installieren, nichts zu ersetzen. Optavius funktioniert vom ersten Tag an eigenständig.",
      steps: [
        { mock: "hz-proactive", title: "Nummer weiterleiten", text: "Anrufe gehen an Optavius: alle, nur der Überlauf oder nur außerhalb der Sprechzeiten. Ihre Nummer bleibt gleich." },
        { mock: "journeys", title: "Wir richten Ihre Pfade ein", text: "Ärzte, Sprechzeiten, Regeln und Warnsymptom-Protokolle, mit Ihrem Team konfiguriert. Sie geben jede Antwort frei." },
        { mock: "ins-observability", title: "Live gehen", text: "Sehen Sie die ersten Anrufe in Ihrem Dashboard. Verbinden Sie Ihr PVS, wenn Sie bereit sind." },
      ],
    },
    quotes: {
      title: "Die Ergebnisse sprechen für sich",
      lede: "Praxen, die jeden Anruf beantworten, in ihren eigenen Worten.",
      items: [
        { quote: "Es kennt den Unterschied zwischen einer Kontaktlinsenberatung und einer Nachbestellung. Unser Empfang hat endlich Zeit für den Patienten, der vor ihm steht.", name: "Feike", role: "Praxismanager, OMC Amstelland", logo: logos[0].src, logoAlt: "OMC Amstelland", ...PEOPLE.feike, href: "/customers/omc-amstelland" },
        { quote: "Patienten sagen uns, das Telefon sei endlich einfach. Unser Team sagt dasselbe.", name: "Ahmed", role: "Praxisinhaber, North Texas Eye Specialists", logo: logos[1].src, logoAlt: "North Texas Eye Specialists", ...PEOPLE.ahmed, href: "/customers/north-texas-eye-specialists" },
        { quote: "Statusanfragen zu Bestellungen haben früher unsere Samstage gefüllt. Jetzt sagt das Telefon den Leuten, dass ihre Brille fertig ist, bevor sie daran denken zu fragen.", name: "Tom", role: "Gründer, Cubitts", logo: logos[2].src, logoAlt: "Cubitts", ...PEOPLE.tom, href: "/customers/cubitts" },
      ],
    },
    trust: { title: "Vertrauen und Zuverlässigkeit", text: "Optavius ist für Verantwortung im Gesundheitswesen gebaut. Jeder Pfad, jede Entscheidung und jede Eskalation ist dokumentiert und prüfbar.", badges: TRUST_BADGES },
    cta,
  },

  product: {
    meta: { title: "Produktübersicht | Optavius", description: "KI-Sprachagenten, die jeden Anruf beantworten, Termine buchen und eskalieren, was zählt. Sprache zuerst, mit jedem Kanal in einer Konsole." },
    hero: {
      title: "Optavius kennenlernen",
      subtitle: "Der Sprachagent, der Augenheilkunde spricht, beim ersten Klingeln abnimmt und nie einen Patienten warten lässt",
      media: { kind: "video", src: VIDEOS.product.video, poster: VIDEOS.product.poster },
      overlay: [
        { side: "start", kind: "user", name: "Anrufer", text: "Kann ich meinen Sehtest auf Donnerstag verschieben?" },
        { side: "end", kind: "agent", text: "Erledigt. Donnerstag 9:40 Uhr bei Dr. Okafor. Bringen Sie Ihre aktuelle Brille mit." },
      ],
      cta: { label: "Beispielanruf anhören", href: "/#demo" },
    },
    sections: [
      { key: "voice", title: "Ihr Sprachagent", lede: "Ein natürliches Gespräch, kein Sprachmenü. Er hört zu, versteht das Anliegen und erledigt die Aufgabe.", mediaSide: "right", media: { kind: "mock", name: "agent-frontdesk" }, features: [
        { icon: "phone", title: "Beantwortet jeden Anruf, rund um die Uhr", text: "Ein Anrufer oder fünfzig gleichzeitig. Tag, Nacht und Wochenende, ohne Warteschleife und ohne Mailbox." },
        { icon: "calendar", title: "Bucht direkt in Ihren Kalender", text: "Die richtige Untersuchungsart, der richtige Arzt, die richtige Termindauer, per SMS bestätigt." },
        { icon: "shield", title: "Eskaliert, was zählt", text: "Blitze, Floater, plötzlicher Sehverlust: Ihr Protokoll entscheidet, und der Bereitschaftsdienst bekommt in Sekunden eine Zusammenfassung." },
      ] },
      { key: "eyecare", title: "Der einzige Sprachagent, der eigens für die Augenheilkunde gebaut wurde", lede: "Zuerst ausschließlich für Optometrie und Augenheilkunde entwickelt, jetzt auch für Dermatologie und Tiermedizin. Trainiert auf mehr als 10.000 Fachbegriffe der Augenheilkunde.", mediaSide: "left", media: { kind: "mock", name: "eye" }, features: [
        { icon: "eye", title: "Spricht Ihr Fachgebiet", text: "Kennt den Unterschied zwischen einer Kataraktberatung und einer Kontaktlinsenanpassung, und bucht beides korrekt." },
        { icon: "checklist", title: "Folgt Ihren Pfaden", text: "Warnsymptomlisten, Terminregeln und Skripte, von Ihrer klinischen Leitung freigegeben." },
        { icon: "reverse", title: "Lernt aus jeder Korrektur", text: "Markieren Sie einen Anruf per Klick als falsch. Die Korrektur wird getestet, bevor sie live geht." },
      ] },
      { key: "channels", title: "Ein Agent auf jedem Kanal", lede: "Sprache zuerst. Webchat, E-Mail, SMS und WhatsApp folgen denselben Regeln und derselben Aufsicht.", mediaSide: "right", media: { kind: "mock", name: "channels-hero" }, features: [
        { icon: "phone", title: "Sprache", text: "Ein- und ausgehende Anrufe auf Ihrer bestehenden Nummer." },
        { icon: "chat", title: "Webchat und E-Mail", text: "Fragen von Ihrer Website und aus dem gemeinsamen Postfach, aus denselben Skripten beantwortet." },
        { icon: "sms", title: "SMS und WhatsApp", text: "Bestätigungen, Erinnerungen und Buchungslinks dort, wo Patienten ohnehin sind." },
      ] },
      { key: "trust", title: "Vertrauen und Sicherheit", lede: "Jeder Agent wird geprüft. Jede Entscheidung, die zählt, ist Ihre.", mediaSide: "left", media: { kind: "mock", name: "ins-observability" }, features: [
        { icon: "eye", title: "Der Reviewer", text: "Ein überwachender Agent bewertet Stichproben von Gesprächen auf Genauigkeit, Ton und Ihre Regeln. Sie sehen die Bewertungen." },
        { icon: "user", title: "Übergabe an Menschen", text: "Klinische Fragen, Warnsymptome, Beschwerden und Zweifel gehen an Ihr Team, mit dem Transkript." },
        { icon: "lock", title: "Vollständiger Prüfpfad", text: "Jeder Anruf, jede Nachricht und jede Buchung protokolliert und belegt. DSGVO, HIPAA, Datenhaltung in der EU." },
      ] },
    ],
    quote: { logo: logos[0].src, logoAlt: "OMC Amstelland", quote: "Es kennt den Unterschied zwischen einer Kontaktlinsenberatung und einer Nachbestellung. Unser Empfang hat endlich Zeit für den Patienten, der vor ihm steht.", name: "Feike", role: "Praxismanager, OMC Amstelland", link: { label: "Ganze Geschichte", href: "/customers/omc-amstelland" } },
    trust,
    pricingTeaser: { title: "Preise, die den Ergebnissen folgen", text: "Ab 279 € im Monat. Keine Einrichtungsgebühr, keine Verträge. Liefert Optavius keine Ergebnisse, zahlen Sie nichts.", link: { label: "Preise ansehen", href: "/pricing" }, mock: "pricing-card" },
    related: { title: "Die Plattform entdecken", cards: related("") },
    cta,
  },

  consolePage: {
    meta: { title: "Konsole | Optavius", description: "Die Optavius-Konsole: das Morgenbriefing, was Sie braucht, jeder Anruf und jede Buchung, und eine Befehlszeile, die einfache Sprache versteht." },
    hero: { title: "Konsole", subtitle: "Ihr Tag, schon sortiert", media: { kind: "mock", name: "dashboard-full" } },
    sections: [
      { key: "today", title: "Mit dem Briefing beginnen", lede: "Die Konsole öffnet mit dem, was über Nacht passiert ist, und dem, was Sie heute braucht. Tippen ist nicht nötig.", mediaSide: "right", media: { kind: "mock", name: "briefing", zoom: 1.15 }, features: [
        { icon: "sun", title: "Morgenbriefing", text: "Beantwortete Anrufe, gebuchte Termine, Eskalationen und alles Ungewöhnliche, jeden Morgen für Sie geschrieben." },
        { icon: "inbox", title: "Braucht Sie", text: "Freigaben, Weiterleitungen und markierte Anrufe in einer Warteschlange, mit vollem Kontext." },
        { icon: "status", title: "Agentenstatus", text: "Arbeit und Status jedes Agenten in der linken Leiste, pro Standort." },
      ] },
      { key: "dashboards", title: "Dashboards, die sich lesen wie der Bericht eines Teammitglieds", lede: "Klicken Sie auf einen Agenten und sehen Sie seine Arbeit: Annahmequote, Buchungen, Gesprächsdauer, Eskalationen und Qualitätsbewertungen.", mediaSide: "left", media: { kind: "mock", name: "reporting", zoom: 1.15 }, features: [
        { icon: "chart", title: "Ergebnisse, nicht Versendungen", text: "Gebuchte Termine, zurückgewonnene Slots und aufgefangene Telefonstunden, neben dem, was der Agent kostet." },
        { icon: "eye", title: "Reviewer-Panel", text: "Bestehensquote der Stichproben und markierte Läufe, auf jedem Dashboard sichtbar." },
        { icon: "pause", title: "Pausieren per Klick", text: "Jeder Agent, jeder Standort, jederzeit." },
      ] },
      { key: "command", title: "Den Tag aus einer Leiste steuern", lede: "Eine Leiste am unteren Rand jedes Bildschirms. Pausieren Sie einen Agenten, ändern Sie eine Regel oder geben Sie eine Weiterleitung frei, in einem Satz, auf Deutsch, Englisch oder Niederländisch.", mediaSide: "right", media: { kind: "mock", name: "insights-query", zoom: 1.15 }, features: [
        { icon: "search", title: "Belegte Antworten", text: "Jede Antwort nennt das System und den Synchronisationszeitpunkt, aus dem sie stammt." },
        { icon: "undo", title: "Aktionen mit Prüfzeile", text: "Jede Änderung trägt eine Referenz und, wo möglich, ein Rückgängig." },
        { icon: "phone", title: "Auch auf Ihrem Telefon", text: "Dieselbe Konsole als App, mit Push für Freigaben und das Briefing." },
      ] },
    ],
    quote: { logo: logos[1].src, logoAlt: "North Texas Eye Specialists", quote: "Patienten sagen uns, das Telefon sei endlich einfach. Unser Team sagt dasselbe.", name: "Ahmed", role: "Praxisinhaber, North Texas Eye Specialists", link: { label: "Ganze Geschichte", href: "/customers/north-texas-eye-specialists" } },
    related: { title: "Verwandte Produkte", cards: related("console") },
    cta,
  },

  askOptavius: {
    meta: { title: "Ask Optavius | Optavius", description: "Verbinden Sie Kalender, Anrufprotokoll und Dokumente und fragen Sie alles zu Ihrer eigenen Praxis. 90 Tage kostenlos, bei jedem aktiven Agenten inklusive." },
    hero: { title: "Ask Optavius", subtitle: "Kostenlose Antworten aus Ihren eigenen Praxisdaten", media: { kind: "video", src: VIDEOS.insights.video, poster: VIDEOS.insights.poster } },
    sections: [
      { key: "connect", title: "Verbinden, dann fragen", lede: "Nur-Lese-Zugriff auf Ihren Kalender, Ihr Anrufprotokoll und Ihr Dokumentenpostfach. Unbegrenzte Nutzer. 90 Tage kostenlos.", mediaSide: "right", media: { kind: "mock", name: "explorer-table", zoom: 1.15 }, features: [
        { icon: "plug", title: "Standardanbindungen", text: "Kalender, Telefonanlage, PVS-Export und Überweisungspostfach, an einem Tag verbunden." },
        { icon: "search", title: "Fragen Sie alles", text: "No-Shows pro Standort, unbeantwortete Anrufe letzte Woche, Überweisungsrückstand, für nächsten Monat gebuchter Umsatz." },
        { icon: "doc", title: "Antworten mit Quellen", text: "Text plus Tabellen, mit System und Synchronisationszeitpunkt hinter jeder Zahl." },
      ] },
      { key: "baseline", title: "Ihre Ausgangslage, in Ihren eigenen Zahlen", lede: "Woche eins liefert einen festen Bericht zu den sechs Kennzahlen, die Sie ohnehin nach oben melden.", mediaSide: "left", media: { kind: "mock", name: "briefing", zoom: 1.15 }, features: [
        { icon: "chart", title: "Sechs Erreichbarkeitskennzahlen", text: "Annahmegeschwindigkeit, Abbruchquote, Terminierungsgenauigkeit, Anrufe pro Empfangskraft, Volumen außerhalb der Sprechzeiten und Slot-Auslastung." },
        { icon: "trend", title: "Plus das, was Sie verlieren", text: "Zurückgewonnene Slots und Überweisungsrückstand, damit der Business Case für den ersten Agenten aus Ihren eigenen Daten kommt." },
        { icon: "reverse", title: "Monatlich neu berichtet", text: "Die Differenz ist immer Ihre Zahl, nicht unsere." },
      ] },
      { key: "next", title: "Der Einstieg für den nächsten Agenten", lede: "Wenn die kostenlose Ebene zeigt, was Sie verpassen, stellen Sie den Agenten ein, der es behebt. Nach der Testphase bei jedem aktiven Agenten inklusive.", mediaSide: "right", media: { kind: "mock", name: "recommendations", zoom: 1.15 }, features: [
        { icon: "sparkles", title: "Erkenntnisse, die irgendwohin zeigen", text: "Jeder Befund verlinkt auf den Agenten, der ihn ändern würde." },
        { icon: "lock", title: "Nur lesen, per Design", text: "Die kostenlose Ebene schreibt nie in Ihre Systeme." },
        { icon: "calendar", title: "Ein Enddatum für jede Testphase", text: "90 Tage, danach bei jedem aktiven Agenten inklusive. Keine Überraschungen." },
      ] },
    ],
    related: { title: "Verwandte Produkte", cards: related("ask") },
    cta: { ...cta, title: "Verbinden Sie Ihre Daten diese Woche", text: "90 Tage kostenlos. Sehen Sie Ihre eigene Ausgangslage, bevor Sie etwas entscheiden.", primary: { label: "Kostenlos starten", href: "/demo" } },
  },

  agentsPage: {
    meta: { title: "Agenten | Optavius", description: "Stellen Sie KI-Agenten für Empfang, Bestellstatus, Recall, No-Show-Rückgewinnung und mehr ein. Eine Aufgabe, ein Preis, ein Dashboard." },
    hero: { title: "Agenten", subtitle: "Eingestellt wie Personal. Bewiesen, bevor vertraut wird.", media: { kind: "mock", name: "agent-studio-hero" } },
    sections: [
      { key: "hire", title: "Einen Agenten per Klick einstellen", lede: "Starten Sie mit einem. Fügen Sie den nächsten per Klick hinzu. Schalten Sie jeden ab, wann immer Sie wollen.", mediaSide: "right", media: { kind: "mock", name: "simulations", zoom: 1.15 }, features: [
        { icon: "chat", title: "Einrichtung im Gespräch", text: "Der Agent schlägt Regeln aus Ihren Praxisdaten vor. Sie ändern sie in einfacher Sprache und geben frei." },
        { icon: "eye", title: "Schattenmodus", text: "Eine Woche mit echten Anrufen, ohne zu handeln. Sie sehen alles, was er getan hätte, vom Reviewer bewertet." },
        { icon: "check", title: "Freigabe, dann live", text: "Die Abrechnung beginnt an dem Tag, an dem Sie den Schalter umlegen. Nicht vorher." },
      ] },
      { key: "journeys", title: "Agenten, die die Aufgabe zu Ende bringen", lede: "Überweisung rein, Patient gebucht, Formulare vollständig, No-Show zurückgewonnen. Jeder Agent verantwortet ein Ergebnis von Anfang bis Ende.", mediaSide: "left", media: { kind: "mock", name: "hz-optimization" }, features: [
        { icon: "flag", title: "Von der Überweisung zur Versorgung", text: "Liest die Überweisung, fragt Fehlendes nach, ruft den Patienten an und bucht den richtigen Termin." },
        { icon: "calendar", title: "Recall und Erinnerungen", text: "Findet jeden fälligen Patienten, ruft an, bis gebucht ist, und verhindert No-Shows, bevor sie passieren." },
        { icon: "reverse", title: "No-Show-Rückgewinnung und Warteliste", text: "Ruft innerhalb von zwei Stunden an, bucht neu und füllt freigewordene Termine aus der Warteliste." },
      ] },
    ],
    library: {
      title: "Die Agentenbibliothek",
      lede: "Jeder Agent hat eine Aufgabe. Beginnen Sie mit einem und fügen Sie den nächsten mit einem Klick hinzu.",
      classes: { voice: "Sprache", digital: "Digital" },
      items: [
        { name: "Empfang", job: "Beantwortet Routinefragen rund um die Uhr aus Ihren freigegebenen Skripten und leitet Warnsymptome nach Protokoll weiter.", cls: "voice", from: "In jedem Tarif" },
        { name: "Buchen, verschieben und stornieren", job: "Bucht, verschiebt und storniert Termine bei jedem Anruf, direkt in Ihren Kalender.", cls: "voice", from: "In jedem Tarif" },
        { name: "Bestellstatus", job: "Sagt Anrufern ohne Warteschlange, wo ihre Brille, Linsen oder Bestellung stehen.", cls: "voice", from: "Professional" },
        { name: "Recall und Erinnerungen", job: "Findet jeden Patienten, der eine Kontrolle braucht, und ruft an, bis er gebucht ist.", cls: "voice", from: "Professional" },
        { name: "No-Show-Rückgewinnung", job: "Ruft jeden No-Show innerhalb von zwei Stunden an und bucht in den ersten passenden Termin.", cls: "voice", from: "Professional" },
        { name: "Warteliste füllen", job: "Arbeitet bei einem freigewordenen Termin Ihre Warteliste ab, bis er besetzt ist.", cls: "voice", from: "Professional" },
        { name: "Überweisungsaufnahme", job: "Liest jede Überweisung, prüft die Vollständigkeit und fragt Fehlendes nach.", cls: "digital", from: "Professional" },
        { name: "Aufnahme und Formulare", job: "Sendet Formulare und Vorbereitungshinweise und bestätigt, dass der Patient bereit ist.", cls: "digital", from: "Professional" },
        { name: "Webchat und E-Mail", job: "Beantwortet Fragen von Ihrer Website und aus dem Postfach mit denselben Regeln wie am Telefon.", cls: "digital", from: "Professional" },
        { name: "Post-OP-Nachsorge", job: "Ruft jeden operierten Patienten an, stellt Ihre Fragen und meldet Warnzeichen an Ihr Team.", cls: "voice", from: "Enterprise" },
        { name: "Bestellprüfung", job: "Prüft Brillenbestellungen auf Konsistenz von Rezept und Träger, bevor sie ins Labor gehen.", cls: "digital", from: "Enterprise" },
        { name: "Patientenabrechnung", job: "Beantwortet Rechnungsfragen und sendet Zahlungslinks. Streitfälle gehen an Ihr Team.", cls: "digital", from: "Enterprise" },
      ],
    },
    quote: { logo: logos[2].src, logoAlt: "Cubitts", quote: "Statusanfragen zu Bestellungen haben früher unsere Samstage gefüllt. Jetzt sagt das Telefon den Leuten, dass ihre Brille fertig ist, bevor sie daran denken zu fragen.", name: "Tom", role: "Gründer, Cubitts", link: { label: "Ganze Geschichte", href: "/customers/cubitts" } },
    related: { title: "Verwandte Produkte", cards: related("agents") },
    cta,
  },

  integrations: {
    meta: { title: "Integrationen | Optavius", description: "Optavius funktioniert mit Ihrer Telefonanlage, Ihrem Kalender, Ihrem Praxisverwaltungssystem und Ihrer Patientenakte. Standalone starten, verbinden, wenn Sie bereit sind." },
    hero: { title: "Integrationen", subtitle: "Funktioniert mit den Systemen, die Sie schon nutzen", media: { kind: "mock", name: "integrations" } },
    sections: [
      { key: "phone", title: "Ihre Nummer bleibt gleich", lede: "VoIP, Festnetz oder Cloud. Anrufe werden an Optavius weitergeleitet. Nichts wird ersetzt.", mediaSide: "right", media: { kind: "mock", name: "voice-green" }, features: [
        { icon: "phone", title: "Jede Telefonanlage", text: "RingCentral, Zoom Phone, Twilio, Vonage, eine TK-Anlage oder ein SIP-Trunk." },
        { icon: "reverse", title: "Durchstellen als Auffangnetz", text: "Wenn Optavius einen Anruf nicht annehmen kann, klingelt es bei Ihrem Team. Bei jedem Go-live getestet." },
        { icon: "clock", title: "Überlauf und außerhalb der Sprechzeiten", text: "Alle Anrufe weiterleiten, nur den Überlauf oder nur bei geschlossener Praxis." },
      ] },
      { key: "ehr", title: "Buchungen dort geschrieben, wo sie hingehören", lede: "Bidirektionale Synchronisation mit Ihrem Kalender, Praxisverwaltungssystem oder Ihrer Patientenakte, wenn Sie bereit sind.", mediaSide: "left", media: { kind: "mock", name: "hz-context" }, features: [
        { icon: "calendar", title: "Kalender zuerst", text: "Google, Outlook und Cal.com am ersten Tag verbunden, damit jede Buchung in Ihrem eigenen System landet." },
        { icon: "doc", title: "PVS und Patientenakte", text: "ifa systems, FIDUS, RevolutionEHR, Eyefinity, ModMed, Nextech, Epic und ChipSoft über API oder FHIR." },
        { icon: "check", title: "Geprüfte Schreibvorgänge", text: "Jede Buchung wird zurückgelesen, bevor sie dem Patienten bestätigt wird. Keine Doppelbuchungen, keine manuelle Eingabe." },
      ] },
      { key: "data", title: "Gebaut, um Gesundheitsdaten zu halten", lede: "Von Tag eins an FHIR-konform, sodass jeder Datensatz schon die Form hat, die Ihre Systeme erwarten.", mediaSide: "right", media: { kind: "mock", name: "governance" }, features: [
        { icon: "lock", title: "Verschlüsselt und in der Region", text: "AES-256 im Ruhezustand, TLS 1.3 bei der Übertragung, Datenhaltung in der EU oder den USA." },
        { icon: "shield", title: "Minimale Rechte", text: "Zuerst nur lesen. Schreibrechte pro Agent, pro Aktion, protokolliert und umkehrbar." },
        { icon: "plug", title: "API und MCP", text: "Jedes System mit offener API oder MCP-Server, pro Kunde abgegrenzt." },
      ] },
    ],
    logos: { title: "Funktioniert mit dem, was Sie haben", lede: "Standalone starten. Patientenakte, Kalender und Telefonanlage verbinden, wenn Sie bereit sind.", more: "+20 Integrationspartner", groups: [
      { label: "Patientenakte und Praxisverwaltung", items: INTEGRATION_LOGOS.ehr }, { label: "Telefonanlagen", items: INTEGRATION_LOGOS.phone }, { label: "Kalender und CRM", items: INTEGRATION_LOGOS.tools },
    ] },
    related: { title: "Verwandte Produkte", cards: related("integrations") },
    cta,
  },

  pricing: {
    meta: { title: "Preise | Optavius", description: "Ergebnisbasierte Preise für KI-Sprachagenten. Ab 279 € pro Monat. Liefert Optavius keine Ergebnisse, zahlen Sie nichts." },
    title: "Preise, die den Ergebnissen folgen",
    lede: "Sie zahlen für das, was Optavius liefert, nicht für Nutzer oder Minuten.",
    from: "Ab 279 € pro Monat",
    how: {
      title: "So funktioniert ergebnisbasierte Preisgestaltung",
      lede: "Ein Monatsbetrag, gekoppelt an das, was der Agent tatsächlich für Ihre Praxis leistet.",
      items: [
        { icon: "phone", title: "Ein Monatsbetrag ab 279 €", text: "Enthält den Agenten, die Konsole, unbegrenzt Nutzer, Einrichtung und Support. Keine Kosten pro Nutzer oder pro Minute." },
        { icon: "chart", title: "An Ergebnisse gekoppelt", text: "Der Betrag folgt dem, was Optavius liefert: beantwortete Anrufe, gebuchte Termine, zurückgewonnene No-Shows. Die Ziele vereinbaren wir vorab mit Ihnen." },
        { icon: "shield", title: "Keine Ergebnisse, keine Kosten", text: "In einem Monat, in dem Optavius nichts bucht und nichts erledigt, zahlen Sie nichts. Dieses Risiko tragen wir, nicht Sie." },
      ],
    },
    stats: { title: "Die Rechnung geht auf", items: [{ value: "~0 €/Tag", label: "wenn keine Ergebnisse erzielt werden" }, { value: "9K+ €", label: "übliche monatliche Ersparnis" }, { value: "20%", label: "durchschnittliche Umsatzsteigerung" }] },
    calc: { title: "Was Sie das Telefon kostet", text: "Stellen Sie die Regler auf Ihre eigenen Zahlen. Die Rechnung ist bewusst vorsichtig.", calls: "Eingehende Anrufe pro Monat", missed: "Verpasste Anrufe heute", value: "Wert eines Termins", recovered: "zurückgewonnene Termine pro Monat", revenue: "zurückgewonnener Umsatz pro Monat", typical: "Bei Praxen sehen wir vor dem Start typischerweise 20 bis 30 %.", note: "Zurückgewonnene Termine = verpasste Anrufe × 50 %, die nie zurückrufen × 35 %, die buchen wollten. Zahlen von tatsächlichen Kunden.", currency: "€", currencyAfter: true },
    faq: {
      title: "Fragen zu den Preisen",
      items: [
        { q: "Was zählt als Ergebnis?", a: "Ein Vorgang, den der Agent vollständig abschließt: ein Anruf beantwortet und erledigt, ein Termin gebucht oder verschoben, ein No-Show neu gebucht, ein Bestellstatus bestätigt. Sie sehen jeden einzelnen in der Konsole." },
        { q: "Was zahle ich in einem Monat ohne Ergebnisse?", a: "Nichts. Der Monatsbetrag gilt nur, wenn Optavius die vereinbarten Ergebnisse liefert." },
        { q: "Wie wird der Betrag für meine Praxis festgelegt?", a: "Wir betrachten Ihr Anrufvolumen und die Ergebnisse, die für Sie zählen, und vereinbaren vor dem Start einen Monatsbetrag und Ziele. Gruppen mit mehreren Standorten erhalten eine Gruppenvereinbarung." },
        { q: "Gibt es Kosten pro Minute oder pro Nutzer?", a: "Nein. Minuten und Nutzer sind unbegrenzt. Der Betrag ist an Ergebnisse gekoppelt, nicht an die Nutzung." },
        { q: "Gibt es Einrichtungsgebühren?", a: "Nein. Einrichtung, Konfiguration und Onboarding sind enthalten." },
        { q: "Kann ich kündigen?", a: "Ja, monatlich. Es gibt keine langen Verträge." },
        { q: "Gibt es eine Testphase?", a: "Ja. Ask Optavius ist 90 Tage kostenlos, und jeder Agent läuft eine Woche im Schattenmodus, bevor er live geht." },
      ],
    },
    cta: { title: "Angebot für Ihre Praxis anfragen", text: "Wir rechnen zurückgewonnene Termine und Personalstunden auf Ihr eigenes Anrufvolumen um und vereinbaren die Ziele mit Ihnen.", primary: contactSales, secondary: callDemo, note: "Sprechen Sie mit einem Gründer. Unverbindlich." },
  },

  specialties: {
    meta: { title: "Fachgebiete | Optavius", description: "KI-Sprachagenten für Augenheilkunde, Optometrie, Dermatologie und Tierarztpraxen." },
    title: "Ihr Sprachagent für Facharztpraxen.",
    lede: "Gebaut für die Anrufe, die Ihr Fachgebiet wirklich bekommt. Augenheilkunde, Optometrie, Dermatologie und Tiermedizin.",
    logos: { title: "", logos },
    quote: { logo: logos[0].src, logoAlt: "OMC Amstelland", quote: "Es kennt den Unterschied zwischen einer Kontaktlinsenberatung und einer Nachbestellung. Unser Empfang hat endlich Zeit für den Patienten, der vor ihm steht.", name: "Feike", role: "Praxismanager, OMC Amstelland", link: { label: "Ganze Geschichte", href: "/customers/omc-amstelland" } },
    cta,
    pages: specialties,
  },

  customers: {
    meta: { title: "Kundengeschichten | Optavius", description: "Praxen, die jeden Anruf beantworten, in ihren eigenen Worten." },
    title: "Unsere Kunden\nin ihren eigenen Worten",
    heroImage: { src: PHOTOS.story, alt: "Eye clinic team", logo: logos[0].src, logoAlt: "OMC Amstelland" },
    storiesTitle: "Das sind ihre Geschichten",
    featuredTitle: "Ausgewählte Geschichten",
    gridTitle: "Vorreiter in\nFacharztpraxen",
    stories,
    moreTitle: "Weitere Kundengeschichten",
    cta,
  },

  about: {
    meta: { title: "Über uns | Optavius", description: "Optavius nimmt Reibung aus der fachärztlichen Versorgung: für Patienten, für Personal und für Ärzte." },
    title: "Wer wir sind\nund warum wir hier sind.",
    lede: "Über Optavius.",
    image: { src: PHOTOS.examroom, alt: "Untersuchungsraum einer Augenklinik" },
    statement: { title: "Optavius nimmt Reibung aus der fachärztlichen Versorgung: für Patienten, für Personal und für Ärzte.", text: "Der Anfang des Patientenwegs ist oft der frustrierendste Teil. Lange Wartezeiten, uneinheitliche Aufnahme und überlastetes Personal. Wir haben Optavius gebaut, um das zu ändern, angefangen beim Telefon." },
    values: [
      { icon: "shield", title: "Sicherheit zuerst", text: "Jede Funktion, jeder Pfad und jede Entscheidung ist mit Patientensicherheit als Priorität entworfen. Optavius stellt keine Diagnosen und übergeht nie ein ärztliches Urteil. Das ist ein Designprinzip, kein Haftungsausschluss." },
      { icon: "bolt", title: "Schnell zum Nutzen", text: "Live in Tagen, nicht Monaten. Eine Praxis leitet ihre Nummer weiter, gibt ihre Pfade frei und sieht in derselben Woche die ersten Anrufe in ihrem Dashboard." },
      { icon: "chart", title: "Beweise statt Versprechen", text: "Wir messen alles und zeigen Ihnen die Zahlen. Wenn etwas nicht funktioniert, sagen wir es Ihnen und beheben es." },
    ],
    founders: {
      title: "Unsere Gründer",
      lede: "Optavius wurde von Yves Prevoo und Paul Sabou gegründet, die mehr als zwanzig Jahre Gesundheitstechnologie und regulierte Medizinprodukte an den Empfang bringen.",
      people: [
        { name: "Yves Prevoo", role: "Gründer und CEO", image: PHOTOS.yves, text: "Yves hat mehr als zwanzig Jahre in der Gesundheitstechnologie gearbeitet, in Produkt, Regulatorik und klinischem Betrieb. Als Teil des Gründungsteams von Easee, dem digitalen Sehtest-Unternehmen, half er, eines der ersten Produkte mit CE-Klasse IIa unter der EU-MDR zu bauen. Bei Optavius führt er den Weg zur FDA- und CE-Zulassung der KI-Funktionen, die den Agenten schrittweise autonomer machen." },
        { name: "Paul Sabou", role: "Mitgründer und CTO", image: PHOTOS.paul, text: "Paul ist Serienunternehmer und technischer Leiter. Als Mitgründer und CTO von BusyMachines, das vor der Übernahme auf mehr als fünfzig Mitarbeitende wuchs, beriet er sechzig Start-ups zu Technologie und Strategie. Seine Arbeit umfasst Patientenaktensysteme und verteilte Plattformen. Bei Optavius verantwortet er Architektur und Produkt." },
      ],
    },
    offices: { title: "Unsere Standorte", text: "Von {cities} aus arbeiten wir mit Praxen in den USA, den Niederlanden und darüber hinaus.", cities: ["Houston", "Amsterdam"] },
    cta: { ...cta, title: "Mehr erfahren?", text: "Erzählen Sie uns von Ihrer Praxis, und wir zeigen Ihnen, was Optavius mit Ihren Anrufen machen würde." },
  },

  resources: {
    meta: { title: "Ressourcen | Optavius", description: "Leitfäden, Vergleiche und Kundengeschichten zu KI-Sprachagenten für Facharztpraxen." },
    title: "Ressourcen",
    filters: [{ key: "all", label: "Empfohlen" }, { key: "learn", label: "Leitfäden" }, { key: "compare", label: "Vergleiche" }, { key: "case", label: "Kundengeschichten" }, { key: "blog", label: "Blog" }],
    readTime: "Min. Lesezeit",
    backLabel: "Alle Ressourcen",
    cta,
  },

  careers: {
    meta: { title: "Karriere | Optavius", description: "Helfen Sie Facharztpraxen, jeden Anruf zu beantworten. Offene Stellen bei Optavius." },
    title: "Hallo, wir sind Optavius.\nWir freuen uns auf dich.",
    lede: "Baue die Agenten, die für Facharztpraxen das Telefon abnehmen.",
    cta: { label: "Offene Stellen", href: "#open-roles" },
    image: { src: PHOTOS.story, alt: "Praxisteam bei der Arbeit" },
    statement: "Wir sind ein kleines Team, das KI-Agenten baut, die Praxen wie Personal einstellen, beaufsichtigen und bezahlen. Unsere Arbeit sitzt zwischen Patienten und Ärzten, deshalb nehmen wir Sicherheit und Beweise ernst und liefern jede Woche aus. Wenn du echte Kunden, echte Daten und harte Probleme magst, komm und baue mit uns.",
    culture: [
      { icon: "marker", title: "Amsterdam und Houston", text: "Wir arbeiten von Amsterdam und Houston aus und verbringen die meiste Zeit bei Kunden. Remote geht, wenn die Aufgabe es zulässt." },
      { icon: "heart", title: "Kunde null", text: "Wir betreiben Optavius mit Optavius. Unsere eigene Buchhaltung, Sales Ops und Support laufen auf den Agenten, die wir verkaufen." },
      { icon: "sparkles", title: "Kleines Team, große Hebelwirkung", text: "Drei Gründer, ein hands-on Tech Lead und agentische Werkzeuge. Du verantwortest ganze Ergebnisse, keine Tickets." },
      { icon: "users", title: "Klinische Partner", text: "Designpartner in den Niederlanden und Texas prüfen, was wir bauen, bevor es einen Patienten erreicht." },
    ],
    interviewing: { title: "Bewerben bei Optavius", paragraphs: ["Wir stellen nach Urteilsvermögen und Tempo ein. Du triffst die Gründer, arbeitest ein echtes Problem aus unserem Backlog durch und sprichst mit einem Kunden.", "Gespräche finden in Amsterdam, Houston oder per Videocall statt. So oder so siehst du, wie wir arbeiten, bevor du dich entscheidest."] },
    roles: {
      title: "Offene Stellen", lede: "Wir suchen Menschen, die etwas bauen wollen, auf das sich Praxen jeden Tag verlassen.",
      groups: [
        { name: "Vertrieb", roles: [
          { title: "Founding Account Executive, USA", location: "Houston, TX", href: "mailto:" + EMAIL + "?subject=Account%20executive" },
          { title: "Customer Success, Facharztpraxen", location: "Amsterdam", href: "mailto:" + EMAIL + "?subject=Customer%20success" },
        ] },
      ],
    },
    finalCta: { title: "Deine Rolle ist nicht dabei?", text: "Sag uns, was du bauen würdest. Wir lesen jede Nachricht.", primary: { label: "Schreib uns", href: "mailto:" + EMAIL }, note: "" },
  },

  demo: {
    meta: { title: "Demo buchen | Optavius", description: "Wählen Sie einen Termin mit einem Gründer und hören Sie, wie Optavius einen Anruf für Ihre Praxis annimmt. Unverbindlich." },
    title: "Wählen Sie einen Termin mit einem Gründer.",
    points: [
      { icon: "phone", text: "Jeder Patientenanruf beantwortet, rund um die Uhr, auf Ihrer bestehenden Nummer." },
      { icon: "calendar", text: "Termine direkt in Ihren Kalender oder Ihr Praxissystem gebucht." },
      { icon: "shield", text: "Dringende Symptome nach Ihrem Protokoll weitergeleitet, mit Zusammenfassung." },
    ],
    trustedTitle: "Vertrauen von",
    booking: { title: "Zeitfenster wählen", text: "30 Minuten mit Yves. Wir hören uns Ihr Anrufvolumen an und zeigen, was Optavius mit Ihren Anrufen tun würde.", fallback: { label: "Termin wählen", href: CALENDLY, external: true }, note: "Unverbindlich." },
  },

  legal: LEGAL.de,
};

export default de;
