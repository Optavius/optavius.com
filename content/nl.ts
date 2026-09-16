import type { Site, SpecialtyPage, Story } from "./types";
import { LEGAL } from "./legal";
import en from "./en";
import { BADGES, CALENDLY, CUSTOMER_LOGOS, EMAIL, INTEGRATION_LOGOS, PEOPLE, PHOTOS, SIGN_IN, TEL_NL as TEL, TEL_NL_DISPLAY as TEL_DISPLAY, VIDEOS } from "./shared";

const callDemo = { label: "Bel de demolijn", href: TEL };
const contactSales = { label: "Neem contact op", href: "/demo" };
const bookDemo = { label: "Demo aanvragen", href: "/demo" };
const logos = CUSTOMER_LOGOS(["/customers/omc-amstelland", "/customers/north-texas-eye-specialists", "/customers/cubitts"]);

const TRUST_BADGES = [
  { src: BADGES.hipaa, alt: "HIPAA-compliant" },
  { src: BADGES.soc1, alt: "SOC 1 geauditeerde controles" },
  { src: BADGES.iso27001, alt: "ISO 27001 informatiebeveiliging" },
  { src: BADGES.gdpr, alt: "AVG / GDPR" },
  { src: BADGES.euai, alt: "Klaar voor de EU AI Act" },
  { src: BADGES.fhir, alt: "FHIR-compatibel" },
  { src: BADGES.baa, alt: "BAA inbegrepen" },
];
const trust = { title: "Gebouwd voor verantwoording in de zorg", text: "Elk pad, elke beslissing en elke escalatie is gedocumenteerd en controleerbaar.", badges: TRUST_BADGES };
const cta = {
  title: "Zie hoeveel meer oproepen u kunt beantwoorden",
  text: "We rekenen teruggewonnen afspraken en personeelsuren door op uw eigen belvolume.",
  primary: bookDemo, secondary: callDemo, note: "Spreek met onze oprichter. Vrijblijvend.",
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
    logos: { title: "Handelt dagelijks honderden gesprekken af bij:", logos },
    cards: { title: s.cardsTitle, tabs: s.tabs },
    journey: { title: s.journeyTitle, features: s.journey, media: { kind: "image", src: s.photo, alt: s.photoAlt }, mediaSide: "right", tone: "product" },
    quote: s.quote,
    agents: { title: "Agents voor " + s.short, cta: { label: "Alle agents", href: "/product/agents" }, tiles: s.agents },
    trust: { ...trust, title: "Gebouwd voor vertrouwen en privacy in " + s.short },
    cta,
  };
}

const frontdeskTab = (extra: { title: string; text: string }[]) => ({ label: "Balie", cards: extra });
const managerTab = (ehr: string) => ({
  label: "Praktijkmanagers",
  cards: [
    { title: "Eén standaard per locatie", text: "Elke vestiging klinkt hetzelfde en volgt dezelfde regels." },
    { title: "Live dashboard", text: "Beantwoordpercentage, afspraken, escalaties en gespreksduur, per locatie en per dag." },
    { title: "Audittrail", text: "Elke beslissing gelogd, met de padversie die haar produceerde." },
    { title: "Medische governance", text: "Paden goedgekeurd door uw medisch verantwoordelijke voordat ze live gaan." },
    { title: "EPD-koppeling", text: ehr },
    { title: "Meertalig", text: "Nederlands, Engels, Duits en Spaans, per locatie." },
  ],
});

const specialties: SpecialtyPage[] = [
  specialty({
    slug: "ophthalmology", name: "Oogheelkunde", short: "oogheelkunde",
    subtitle: "Elke oproep beantwoord. Elk spoedsymptoom geëscaleerd.",
    description: "AI voice agents voor oogheelkundige praktijken. Beantwoord elke oproep, plan het juiste consult en escaleer alarmsymptomen volgens protocol.",
    media: VIDEOS.ophthalmology,
    overlay: [
      { side: "start", kind: "user", name: "Beller", text: "Ik zie sinds vanochtend lichtflitsen in mijn linkeroog." },
      { side: "end", kind: "agent", text: "Dat kan dezelfde dag aandacht nodig hebben. Dr. Alvarez heeft om 14:40 een spoedplek. Zal ik die boeken?" },
    ],
    cardsTitle: "Vertrouwd voor de meest voorkomende oproepen in de oogheelkunde",
    tabs: [
      { label: "Patiënten", cards: [
        { title: "Afspraken inplannen", text: "Cataractconsulten, injecties, controles en nazorg, ingepland in de juiste tijdsduur." },
        { title: "Spoedsymptomen", text: "Flitsen, floaters, plotseling gezichtsverlies en pijn volgen uw protocol en bereiken de dienstdoende arts in seconden." },
        { title: "Voorbereiding op de operatie", text: "Nuchter zijn, druppelschema en wat mee te nemen, voorgelezen uit uw goedgekeurde scripts." },
        { title: "Recepten en herhalingen", text: "Herhaalverzoeken vastgelegd met de apotheek en doorgestuurd naar de juiste arts." },
        { title: "Verwijzingen en verzekering", text: "Wat een verwijzing nodig heeft, welke polissen u accepteert en wat een consult kost." },
        { title: "Route en openingstijden", text: "Locaties, parkeren, openingstijden en feestdagen, direct beantwoord." },
      ] },
      frontdeskTab([
        { title: "Overloop en buiten kantooruren", text: "Oproepen gaan naar Optavius als de balie bezet of gesloten is. Niets gaat naar de voicemail." },
        { title: "Warme doorverbinding", text: "Complexe of boze bellers bereiken een medewerker met het transcript en een samenvatting." },
        { title: "Herinneringen en oproepen", text: "Bevestigingen, herinneringen en controle-oproepen gaan automatisch en landen in de agenda." },
        { title: "No-show herstel", text: "Gemiste afspraken worden binnen twee uur teruggebeld en opnieuw ingepland." },
        { title: "Wachtlijst vullen", text: "Een vrijgekomen plek wordt aan de wachtlijst aangeboden tot hij gevuld is." },
        { title: "Gesprekssamenvattingen", text: "Elk gesprek wordt getranscribeerd, getagd en in het dossier geschreven." },
      ]),
      managerTab("Afspraken geschreven naar H4H, Medicore, Nexus of uw systeem."),
    ],
    journeyTitle: "Betere uitkomsten in het hele patiënttraject",
    journey: [
      { title: "Breng patiënten sneller bij de juiste zorg", text: "Direct opnemen, de reden van de oproep herkennen en het juiste consult bij de juiste arts inplannen." },
      { title: "Escaleer wat ertoe doet", text: "Alarmsymptomen volgen het pad dat uw medisch directeur heeft goedgekeurd. Nooit een gok." },
      { title: "Houd het OK-programma vol", text: "Oproepen, herinneringen, no-show herstel en wachtlijstvulling beschermen elke plek." },
      { title: "Geef de balie haar tijd terug", text: "Routinevragen worden zonder medewerker beantwoord. Complexe vragen komen met context binnen." },
      { title: "Rapporteert als een teamlid", text: "Elke oproep, uitkomst en escalatie op één dashboard." },
    ],
    photo: PHOTOS.slitlamp, photoAlt: "Oogarts onderzoekt een patiënt aan de spleetlamp",
    quote: { quote: "Het kent het verschil tussen een contactlensconsult en een nabestelling. Onze balie heeft eindelijk tijd voor de patiënt die voor hen staat.", name: "Feike", role: "Praktijkmanager, OMC Amstelland" },
    agents: [
      { mock: "agent-frontdesk", title: "Balie", text: "Beantwoordt, plant en verzet, 24/7." },
      { mock: "agent-urgent", title: "Spoedroutering", text: "Past uw alarmsymptomenpad toe en verbindt door met een samenvatting." },
      { mock: "agent-postop", title: "Postoperatieve nazorg", text: "Belt elke geopereerde patiënt en legt gestructureerde antwoorden vast." },
      { mock: "agent-noshow", title: "No-show herstel", text: "Plant gemiste consulten opnieuw in en rapporteert de teruggewonnen tijd." },
    ],
  }),
  specialty({
    slug: "optometry", name: "Optometrie", short: "optometrie",
    subtitle: "Oogmetingen ingepland. Bestellingen beantwoord. Lenzen nabesteld.",
    description: "AI voice agents voor optometristen en opticiens. Plan oogmetingen, beantwoord de status van bestellingen en bestel contactlenzen na via de telefoon.",
    media: VIDEOS.optometry,
    overlay: [
      { side: "start", kind: "user", name: "Beller", text: "Is mijn nieuwe bril klaar om op te halen?" },
      { side: "end", kind: "agent", text: "Hij is vanochtend binnengekomen, meneer Okafor. We zijn vandaag open tot 18:00 en zaterdag van 9 tot 13." },
    ],
    cardsTitle: "Vertrouwd voor de meest voorkomende oproepen in de optometrie",
    tabs: [
      { label: "Klanten", cards: [
        { title: "Oogmeting inplannen", text: "Routine-, contactlens- en kindermetingen, ingepland met de juiste duur en optometrist." },
        { title: "Status van bestellingen", text: "Brillen, lenzen en reparaties. Klaar of nog niet, met de beloofde datum." },
        { title: "Contactlenzen nabestellen", text: "Controleert het recept en plaatst de nabestelling naar het adres in het dossier." },
        { title: "Verzekering en prijzen", text: "Welke verzekeraars u accepteert, wat een meting kost en wat vergoed wordt." },
        { title: "Vragen over monturen en glazen", text: "Multifocaal, coatings, blauwlicht en aanpassingen, in gewone taal beantwoord." },
        { title: "Openingstijden en locaties", text: "Openingstijden, parkeren en route voor elke winkel." },
      ] },
      frontdeskTab([
        { title: "Piekuren opvangen", text: "Zaterdagdrukte en lunchpieken kosten u geen bellers meer." },
        { title: "Klaar-om-op-te-halen", text: "Klanten horen het zodra een bestelling binnen is, dus ze bellen niet meer om het te vragen." },
        { title: "Oproepen", text: "Jaarlijkse oproepen voor een meting gaan uit en worden ingepland zonder bellijst." },
        { title: "Warme doorverbinding", text: "Aanpassingen, klachten en alles wat onduidelijk is, bereiken een medewerker met context." },
        { title: "No-show herstel", text: "Gemiste metingen worden teruggebeld en opnieuw ingepland." },
        { title: "Gesprekssamenvattingen", text: "Elk gesprek getranscribeerd en in het klantdossier geschreven." },
      ]),
      { label: "Winkelmanagers", cards: [
        { title: "Elke winkel, één standaard", text: "Dezelfde begroeting, dezelfde regels, één dashboard voor de keten." },
        { title: "Lab- en bestelkoppeling", text: "Bestelstatus gelezen uit uw praktijksysteem of labexport." },
        { title: "Marketingopvolging", text: "Bevestigingen en herinneringen houden de meetagenda vol." },
        { title: "Rapportage", text: "Beantwoorde oproepen, afspraken en nabestellingen per winkel, per dag." },
        { title: "Koppelingen", text: "Eyefinity, RevolutionEHR, Crystal PM, Compulink en meer." },
        { title: "Meertalig", text: "Nederlands, Engels, Duits en Spaans, per winkel." },
      ] },
    ],
    journeyTitle: "Van eerste telefoontje tot tevreden drager",
    journey: [
      { title: "Vul de meetagenda", text: "Beantwoord elke oproep, plan de juiste meting en bevestig per sms." },
      { title: "Stop de statusvragen", text: "Vertel klanten dat hun bril klaar is voordat ze het vragen." },
      { title: "Laat de lensomzet groeien", text: "Nabestellingen per telefoon, recept gecontroleerd, thuis bezorgd." },
      { title: "Ontlast het winkelteam", text: "Minder telefoononderbrekingen betekent meer tijd voor de klant in de winkel." },
      { title: "Zie elke winkel in één oogopslag", text: "Eén dashboard voor oproepen, afspraken en bestellingen over alle locaties." },
    ],
    photo: PHOTOS.shop, photoAlt: "Opticien helpt een klant met monturen kiezen",
    quote: { quote: "Statusvragen over bestellingen vulden vroeger onze zaterdagen. Nu vertelt de telefoon mensen dat hun bril klaar is voordat ze eraan denken te vragen.", name: "Tom", role: "Oprichter, Cubitts" },
    agents: [
      { mock: "agent-frontdesk", title: "Balie", text: "Plant metingen en beantwoordt vragen, 24/7." },
      { mock: "agent-orders", title: "Bestelstatus", text: "Vertelt bellers hoe het staat met hun bril of lenzen." },
      { mock: "agent-reorder", title: "Contactlenzen nabestellen", text: "Controleert het recept en plaatst de bestelling." },
      { mock: "agent-recall", title: "Oproepen en herinneringen", text: "Vindt elke klant die aan een meting toe is en plant hem in." },
    ],
  }),
  specialty({
    slug: "dermatology", name: "Dermatologie", short: "dermatologie",
    subtitle: "Kortere wachttijden. Vollere agenda's. Rustigere balies.",
    description: "AI voice agents voor dermatologiepraktijken. Beantwoord elke oproep, plan consulten en controles en routeer urgente huidklachten volgens protocol.",
    media: VIDEOS.dermatology,
    overlay: [
      { side: "start", kind: "user", name: "Beller", text: "Ik wil graag een moedervlekcontrole. Mijn huisarts heeft vorige week verwezen." },
      { side: "end", kind: "agent", text: "Ik heb de verwijzing. Dr. Lindqvist heeft donderdag om 10:20 plek. Zal ik dat boeken?" },
    ],
    cardsTitle: "Vertrouwd voor de meest voorkomende oproepen in de dermatologie",
    tabs: [
      { label: "Patiënten", cards: [
        { title: "Consult inplannen", text: "Huidcontroles, acne- en eczeemcontroles en cosmetische consulten, met de juiste duur." },
        { title: "Urgente klachten", text: "Snel veranderende plekjes, heftige reacties en problemen na een ingreep volgen uw protocol." },
        { title: "Voorbereiding op een ingreep", text: "Wat te stoppen, wat mee te nemen en hoe voor te bereiden, uit uw goedgekeurde scripts." },
        { title: "Recepten en herhalingen", text: "Herhaalverzoeken vastgelegd en naar de juiste arts gestuurd." },
        { title: "Verwijzingen en verzekering", text: "Eisen aan een verwijzing, geaccepteerde polissen en kosten van een consult." },
        { title: "Openingstijden en locaties", text: "Openingstijden, route en parkeren voor elke vestiging." },
      ] },
      frontdeskTab([
        { title: "Overloop en buiten kantooruren", text: "Oproepen bereiken Optavius als de balie bezet of gesloten is." },
        { title: "Warme doorverbinding", text: "Complexe bellers bereiken een medewerker met transcript en samenvatting." },
        { title: "Herinneringen en oproepen", text: "Jaarlijkse huidcontroles en vervolgafspraken ingepland zonder bellijst." },
        { title: "No-show herstel", text: "Gemiste afspraken binnen twee uur teruggebeld." },
        { title: "Wachtlijst vullen", text: "Vrijgekomen plekken aangeboden aan de wachtlijst tot ze gevuld zijn." },
        { title: "Gesprekssamenvattingen", text: "Elk gesprek getranscribeerd en in het dossier geschreven." },
      ]),
      managerTab("Afspraken geschreven naar ModMed, Nextech, Epic of uw systeem."),
    ],
    journeyTitle: "Betere uitkomsten in het hele patiënttraject",
    journey: [
      { title: "Verkort de wachttijd tot het eerste consult", text: "Verwijzingen gelezen, patiënten gebeld en de juiste plek ingepland." },
      { title: "Escaleer wat ertoe doet", text: "Urgente huidklachten volgen uw protocol en bereiken de juiste persoon." },
      { title: "Houd de behandelkamers vol", text: "Oproepen, herinneringen, no-show herstel en wachtlijstvulling." },
      { title: "Geef de balie haar tijd terug", text: "Routinevragen beantwoord zonder medewerker." },
      { title: "Rapporteert als een teamlid", text: "Elke oproep en uitkomst op één dashboard." },
    ],
    photo: PHOTOS.examroom, photoAlt: "Moderne spreekkamer",
    quote: { quote: "Patiënten zeggen dat de telefoon eindelijk makkelijk is. Ons team zegt hetzelfde.", name: "Ahmed", role: "Praktijkeigenaar, North Texas Eye Specialists" },
    agents: [
      { mock: "agent-frontdesk", title: "Balie", text: "Beantwoordt, plant en verzet, 24/7." },
      { mock: "agent-referral", title: "Verwijzingsintake", text: "Leest verwijzingen, vraagt na wat ontbreekt en bereidt de afspraak voor." },
      { mock: "agent-recall", title: "Oproepen en herinneringen", text: "Vindt elke patiënt die aan een controle toe is en plant hem in." },
      { mock: "agent-noshow", title: "No-show herstel", text: "Plant gemiste consulten opnieuw in en rapporteert wat het terugwon." },
    ],
  }),
  specialty({
    slug: "veterinary", name: "Diergeneeskunde", short: "diergeneeskunde",
    subtitle: "Elke eigenaar gehoord. Elk dier ingepland.",
    description: "AI voice agents voor dierenklinieken. Beantwoord elke oproep, plan consulten en vaccinaties en routeer spoedgevallen naar uw team.",
    media: VIDEOS.veterinary,
    overlay: [
      { side: "start", kind: "user", name: "Beller", text: "Milo is toe aan zijn booster en hij krabt veel aan zijn oor." },
      { side: "end", kind: "agent", text: "Laten we beide in één bezoek doen. Dr. Mensah heeft morgen om 16:10 plek. Zal ik dat boeken?" },
    ],
    cardsTitle: "Vertrouwd voor de meest voorkomende oproepen in de dierenkliniek",
    tabs: [
      { label: "Eigenaren", cards: [
        { title: "Afspraken inplannen", text: "Consulten, vaccinaties, gebitsreiniging en controles na een operatie, bij de juiste dierenarts." },
        { title: "Spoedgevallen", text: "Vergiftiging, benauwdheid en trauma volgen uw protocol en bereiken direct de dienstdoende dierenarts." },
        { title: "Voer en medicatie bestellen", text: "Herhaalrecepten en dieetvoer vastgelegd en bevestigd." },
        { title: "Prijzen en verzekering", text: "Wat een consult kost, met welke verzekeraars u werkt en hoe er betaald kan worden." },
        { title: "Voorbereiding", text: "Nuchter voor een operatie, wat mee te nemen en hoe een dier rustig te houden." },
        { title: "Openingstijden en locaties", text: "Openingstijden, route en parkeren voor elke kliniek." },
      ] },
      frontdeskTab([
        { title: "Overloop en buiten kantooruren", text: "Avonden, weekenden en drukke ochtenden beantwoord zonder voicemail." },
        { title: "Warme doorverbinding", text: "Bezorgde eigenaren bereiken een medewerker met transcript en samenvatting." },
        { title: "Herinneringen en oproepen", text: "Boosters, ontwormen en jaarlijkse controles automatisch ingepland." },
        { title: "No-show herstel", text: "Gemiste afspraken teruggebeld en opnieuw ingepland." },
        { title: "Wachtlijst vullen", text: "Vrijgekomen plekken aangeboden aan de wachtlijst tot ze gevuld zijn." },
        { title: "Gesprekssamenvattingen", text: "Elk gesprek getranscribeerd en in het patiëntdossier geschreven." },
      ]),
      { label: "Praktijkmanagers", cards: [
        { title: "Eén standaard per kliniek", text: "Dezelfde begroeting en regels in de hele groep." },
        { title: "Live dashboard", text: "Beantwoordpercentage, afspraken en escalaties per kliniek." },
        { title: "Audittrail", text: "Elke beslissing gelogd met haar protocolversie." },
        { title: "Medische governance", text: "Protocollen goedgekeurd door uw hoofddierenarts voordat ze live gaan." },
        { title: "PMS-koppeling", text: "Afspraken geschreven naar uw praktijkmanagementsysteem." },
        { title: "Meertalig", text: "Nederlands, Engels, Duits en Spaans, per kliniek." },
      ] },
    ],
    journeyTitle: "Betere uitkomsten voor dieren, eigenaren en uw team",
    journey: [
      { title: "Beantwoord elke eigenaar direct", text: "Geen wachtmuziek, geen voicemail, ook niet om 7 uur op maandagochtend." },
      { title: "Escaleer echte spoedgevallen", text: "Uw protocol bepaalt wat de dienstdoende dierenarts bereikt, en hoe snel." },
      { title: "Houd de agenda vol", text: "Oproepen, herinneringen en no-show herstel beschermen elke plek." },
      { title: "Ontlast de balie", text: "Routinevragen beantwoord zonder medewerker." },
      { title: "Zie elke kliniek in één oogopslag", text: "Eén dashboard voor oproepen en afspraken over alle vestigingen." },
    ],
    photo: PHOTOS.frontdesk, photoAlt: "Balie van een kliniek",
    quote: { quote: "De implementatie ging snel. We hebben op dinsdag het nummer doorgeschakeld en misten op donderdag geen oproepen meer.", name: "Ahmed", role: "Praktijkeigenaar, North Texas Eye Specialists" },
    agents: [
      { mock: "agent-frontdesk", title: "Balie", text: "Beantwoordt, plant en verzet, 24/7." },
      { mock: "agent-urgent", title: "Spoedroutering", text: "Past uw protocol toe en bereikt de dienstdoende dierenarts." },
      { mock: "agent-recall", title: "Oproepen en herinneringen", text: "Boosters en controles ingepland zonder bellijst." },
      { mock: "agent-noshow", title: "No-show herstel", text: "Plant gemiste consulten opnieuw in en rapporteert wat het terugwon." },
    ],
  }),
];

const stories: Story[] = [
  {
    ...en.customers.stories[0],
    meta: { title: "OMC Amstelland | Optavius", description: "Hoe OMC Amstelland in de eerste maand van 30% gemiste oproepen naar nul ging." },
    title: "Van 30% gemiste oproepen naar nul, in de eerste maand.",
    stats: [{ value: "0%", label: "Oproepen onbeantwoord" }, { value: ">60%", label: "Afgehandeld zonder medewerker" }, { value: "+23%", label: "Afspraken ingepland" }],
    industry: "Oogheelkunde",
    body: [
      { type: "h2", text: "Twee locaties, één gedeelde lijn." },
      { type: "p", text: "OMC Amstelland is een oogkliniek in Diemen, bij Amsterdam, met twee locaties en één gedeelde telefoonlijn. De balie doet ook de inschrijving van patiënten. Op piekmomenten en na 17:00 bleef een derde van de oproepen onbeantwoord, en de helft van de mensen die de voicemail kregen, belde nooit terug." },
      { type: "p", text: "De kliniek schakelde haar bestaande nummer door naar Optavius. Inplannen, verzetten, bestelstatus en winkelinformatie werden in de eerste week ingericht, samen met een alarmsymptomenpad dat de medisch directeur goedkeurde. Optavius was in minder dan twee weken live." },
      { type: "media", media: { kind: "mock", name: "story-omc" } },
      { type: "h2", text: "Wat er veranderde." },
      { type: "p", text: "Elke oproep wordt nu bij de eerste beltoon beantwoord, ook vijftig tegelijk. Meer dan zes op de tien oproepen worden volledig zonder medewerker afgehandeld: informatie, bestelstatus en afspraken. Spoedsymptomen bereiken de dienstdoende oogarts in seconden, met een samenvatting." },
      { type: "p", text: "De cijfers komen uit 8.420 inkomende oproepen in mei en juni 2026. Bellers die vroeger ophingen, plannen nu een afspraak, net als bellers buiten openingstijden. Het aantal ingeplande afspraken steeg met 23 procent, en de balie kreeg ongeveer 170 uur per maand terug." },
      { type: "quote", quote: "Het kent het verschil tussen een contactlensconsult en een nabestelling. Onze balie heeft eindelijk tijd voor de patiënt die voor hen staat.", name: "Feike", role: "Praktijkmanager, OMC Amstelland" },
    ],
    card: { ...en.customers.stories[0].card, stat: { value: "0%", label: "Oproepen onbeantwoord" } },
  },
  {
    ...en.customers.stories[1],
    meta: { title: "North Texas Eye Specialists | Optavius", description: "Hoe een oogheelkundige groep in Texas stopte met het verliezen van bellers buiten kantooruren." },
    title: "Elke oproep buiten kantooruren beantwoord, op alle locaties van de groep.",
    stats: [{ value: "24/7", label: "Bereikbaar" }, { value: "2 sec", label: "Gemiddelde reactietijd" }, { value: "48 u", label: "Tijd tot live" }],
    industry: "Oogheelkunde",
    body: [
      { type: "h2", text: "Een groep die sneller groeide dan haar telefoonsysteem." },
      { type: "p", text: "North Texas Eye Specialists heeft meerdere oogheelkundige locaties in de regio Dallas. Elke vestiging had een eigen lijn, een eigen begroeting en eigen gaten. Na 17:00 en in het weekend gingen oproepen naar een antwoordservice die alleen berichten aannam." },
      { type: "p", text: "Optavius beantwoordt nu elke locatie met één standaard. Het plant cataractconsulten, controles en injecties in de juiste plek, leest het spoedprotocol van de groep en verbindt warm door naar de dienstdoende arts met een samenvatting." },
      { type: "media", media: { kind: "mock", name: "story-ntx" } },
      { type: "h2", text: "Live in 48 uur." },
      { type: "p", text: "De groep schakelde haar nummers op een dinsdag door. Optavius werd dezelfde dag ingericht met de artsen, roosters en paden en ging op donderdag live. De EPD-koppeling volgde later, zonder de telefoon te onderbreken." },
      { type: "quote", quote: "Patiënten zeggen dat de telefoon eindelijk makkelijk is. Ons team zegt hetzelfde.", name: "Ahmed", role: "Praktijkeigenaar, North Texas Eye Specialists" },
    ],
    card: { ...en.customers.stories[1].card, stat: { value: "24/7", label: "Bereikbaar" } },
  },
  {
    ...en.customers.stories[2],
    meta: { title: "Cubitts | Optavius", description: "Hoe Cubitts statusvragen en nabestellingen van de winkelvloer haalde." },
    title: "Bestelstatus en nabestellingen, afgehandeld voordat de winkel opengaat.",
    stats: [{ value: ">60%", label: "Oproepen afgehandeld zonder medewerker" }, { value: "≈170 u", label: "Bespaarde personeelsuren per maand" }],
    industry: "Optometrie",
    body: [
      { type: "h2", text: "Mooie winkels, drukke telefoons." },
      { type: "p", text: "Cubitts ontwerpt en maakt brillen in Londen en verkoopt ze in eigen winkels. De meeste oproepen gingen over dezelfde drie dingen: is mijn bestelling klaar, kan ik mijn lenzen nabestellen en wanneer zijn jullie open. Elke oproep haalde een opticien weg bij een klant in de winkel." },
      { type: "p", text: "Optavius beantwoordt die oproepen vanuit het bestelsysteem en het winkelrooster. Klaar-om-op-te-halen-berichten gaan uit zodra een bestelling binnen is, dus klanten bellen niet meer om het te vragen. Nabestellingen worden gecontroleerd aan het recept en naar het adres in het dossier geplaatst." },
      { type: "media", media: { kind: "mock", name: "story-cubitts" } },
      { type: "h2", text: "Wat het winkelteam merkte." },
      { type: "p", text: "Minder onderbrekingen en rustigere zaterdagen. Alles wat de agent niet kan beantwoorden, zoals een pasprobleem of een klacht, bereikt een medewerker met het transcript erbij." },
      { type: "quote", quote: "Statusvragen over bestellingen vulden vroeger onze zaterdagen. Nu vertelt de telefoon mensen dat hun bril klaar is voordat ze eraan denken te vragen.", name: "Tom", role: "Oprichter, Cubitts" },
    ],
    card: { ...en.customers.stories[2].card, stat: { value: ">60%", label: "Zonder medewerker afgehandeld" } },
  },
];

const related = (exclude: string) =>
  [
    { key: "console", title: "Console", text: "Uw dag, al op orde. Het ochtendoverzicht, wat u nodig heeft en elke oproep op één plek.", href: "/product/console", mock: "briefing", zoom: 1.1, linkLabel: "Ontdek meer" },
    { key: "ask", title: "Ask Optavius", text: "Koppel uw systemen en vraag alles over uw eigen praktijk. 90 dagen gratis.", href: "/product/ask-optavius", mock: "insights-query", linkLabel: "Ontdek meer" },
    { key: "agents", title: "Agents", text: "Eén taak, één prijs, één dashboard. Begin met de balie en voeg de volgende agent toe met één klik.", href: "/product/agents", mock: "agent-frontdesk", linkLabel: "Ontdek meer" },
    { key: "integrations", title: "Koppelingen", text: "Werkt met uw telefooncentrale, agenda en EPD. Begin standalone, koppel wanneer u er klaar voor bent.", href: "/product/integrations", mock: "hz-context", linkLabel: "Ontdek meer" },
  ].filter((c) => c.key !== exclude);

const nl: Site = {
  lang: "nl",
  meta: { ...en.meta, tel: TEL, telDisplay: TEL_DISPLAY, description: "AI voice agents voor oogzorg en specialistische praktijken. Elke patiëntoproep beantwoord, elke afspraak ingepland, 24/7." },
  ui: {
    nav: {
      product: "Product", specialties: "Specialismen", customers: "Klanten", company: "Bedrijf", signIn: "Inloggen", cta: bookDemo,
      productOverview: { title: "Productoverzicht", text: "AI voice agents die beantwoorden, inplannen en opvolgen, in één console.", button: "Maak kennis met Optavius" },
      productGroups: [
        { label: "Werken", items: [
          { label: "Console", text: "Uw dag, al op orde.", href: "/product/console" },
          { label: "Ask Optavius", text: "Gratis antwoorden over uw eigen praktijkdata.", href: "/product/ask-optavius" },
        ] },
        { label: "Groeien", items: [
          { label: "Agents", text: "Balie, oproepen, bestelstatus en meer.", href: "/product/agents" },
          { label: "Koppelingen", text: "Telefooncentrale, agenda en EPD.", href: "/product/integrations" },
        ] },
        { label: "Abonnementen", items: [{ label: "Prijzen", text: "Eenvoudige maandprijzen. Geen contracten.", href: "/pricing" }] },
      ],
      specialtyItems: [
        { label: "Oogheelkunde", text: "Elke oproep beantwoord, elk spoedsymptoom geëscaleerd.", href: "/specialties/ophthalmology" },
        { label: "Optometrie", text: "Metingen ingepland, bestellingen beantwoord, lenzen nabesteld.", href: "/specialties/optometry" },
        { label: "Dermatologie", text: "Kortere wachttijden en vollere agenda's.", href: "/specialties/dermatology" },
        { label: "Diergeneeskunde", text: "Elke eigenaar gehoord, elk dier ingepland.", href: "/specialties/veterinary" },
      ],
      companyItems: [
        { label: "Over ons", text: "Wie Optavius bouwt, en waarom.", href: "/about" },
        { label: "Werken bij", text: "Help specialistische zorg elke oproep te beantwoorden.", href: "/careers" },
        { label: "Kennisbank", text: "Gidsen, vergelijkingen en klantverhalen.", href: "/resources" },
        { label: "Demo plannen", text: "Kies een moment met een oprichter.", href: "/demo" },
      ],
      language: "Taal", menu: "Menu", close: "Sluiten",
    },
    footer: {
      tagline: "AI voice agents voor specialistische zorg. Uw praktijk draait door. Ook als u er niet bent.",
      groups: [
        { title: "Product", items: [{ label: "Productoverzicht", href: "/product" }, { label: "Console", href: "/product/console" }, { label: "Ask Optavius", href: "/product/ask-optavius" }, { label: "Agents", href: "/product/agents" }, { label: "Koppelingen", href: "/product/integrations" }, { label: "Prijzen", href: "/pricing" }] },
        { title: "Specialismen", items: [{ label: "Alle specialismen", href: "/specialties" }, { label: "Oogheelkunde", href: "/specialties/ophthalmology" }, { label: "Optometrie", href: "/specialties/optometry" }, { label: "Dermatologie", href: "/specialties/dermatology" }, { label: "Diergeneeskunde", href: "/specialties/veterinary" }] },
        { title: "Klanten", items: [{ label: "Klantverhalen", href: "/customers" }, { label: "OMC Amstelland", href: "/customers/omc-amstelland" }, { label: "North Texas Eye Specialists", href: "/customers/north-texas-eye-specialists" }, { label: "Cubitts", href: "/customers/cubitts" }] },
        { title: "Bedrijf", items: [{ label: "Over ons", href: "/about" }, { label: "Kennisbank", href: "/resources" }, { label: "Werken bij", href: "/careers" }, { label: "Demo aanvragen", href: "/demo" }, { label: "Inloggen", href: SIGN_IN, external: true }] },
      ],
      legal: [{ label: "Privacybeleid", href: "/privacy" }, { label: "Algemene voorwaarden", href: "/terms" }],
      copyright: "© 2026 Optavius",
    },
    common: {
      bookDemo: "Demo aanvragen", callDemo: "Bel de demolijn", demoNote: "Spreek met onze oprichter. Vrijblijvend.", learnMore: "Meer informatie", readStory: "Lees het verhaal", readMore: "Lees meer", discoverMore: "Ontdek meer", fullStory: "Volledig verhaal", getStarted: "Aan de slag", contactSales: "Neem contact op", mostPopular: "Meest gekozen", perMonth: "/maand", playVideo: "Video afspelen", pauseVideo: "Video pauzeren", customerStories: "Klantverhalen", allSpecialties: "Alle specialismen", openRoles: "Vacatures", search: "Zoeken", skip: "Ga naar de inhoud",
    },
  },

  home: {
    meta: { title: "AI voice agents voor oogzorg | Optavius", description: "AI voice agents voor oogzorgaanbieders die vragen beantwoorden, afspraken inplannen en routineverzoeken afhandelen, 24/7." },
    hero: {
      title: "Elk belletje beantwoord.\nElke kans benut.",
      subtitle: "AI voice agents voor oogzorgaanbieders die vragen beantwoorden, afspraken inplannen en routineverzoeken afhandelen, 24/7.",
      primary: bookDemo, secondary: callDemo, note: "Spreek met onze oprichter. Vrijblijvend.",
      slides: [
        { ...VIDEOS.fold1, bubbles: [
          { side: "end", kind: "agent", text: "Bedankt voor het bellen naar Oogkliniek West. Dit is Optavius. Waarmee kan ik helpen?" },
          { side: "start", kind: "user", name: "Sarah", text: "Ik zie sinds vanochtend lichtflitsen in mijn linkeroog." },
          { side: "end", kind: "agent", text: "Dat kan dezelfde dag aandacht nodig hebben. Dr. Alvarez heeft vandaag om 14:40 een spoedplek. Zal ik die boeken?" },
          { side: "start", kind: "user", name: "Sarah", text: "Ja, graag." },
          { side: "end", kind: "agent", text: "Gedaan. U staat vandaag om 14:40 ingepland. Ik heb een bevestiging per sms gestuurd." },
        ] },
        { ...VIDEOS.fold2, bubbles: [
          { side: "end", kind: "agent", text: "Bedankt voor het bellen naar Cubitts. Dit is Optavius. Waarmee kan ik helpen?" },
          { side: "start", kind: "user", name: "Daniel", text: "Ik heb twee weken geleden een nieuwe bril besteld. Is hij klaar?" },
          { side: "end", kind: "agent", text: "Ik kijk even. Mag ik uw geboortedatum?" },
          { side: "start", kind: "user", name: "Daniel", text: "Drie maart 1981." },
          { side: "end", kind: "agent", text: "Hij is vanochtend binnengekomen, meneer Okafor. We zijn vandaag open tot 18:00 en zaterdag van 9 tot 13." },
        ] },
        { ...VIDEOS.fold3, bubbles: [
          { side: "end", kind: "agent", text: "OMC Amstelland, dit is Optavius. Waarmee kan ik helpen?" },
          { side: "start", kind: "user", name: "Lena", text: "Ik wil mijn contactlenzen nabestellen." },
          { side: "end", kind: "agent", text: "Ik zie een geldig recept voor Acuvue Oasys, min 2,75 rechts en min 3,00 links. Dezelfde weer?" },
          { side: "start", kind: "user", name: "Lena", text: "Ja, hetzelfde als vorige keer." },
          { side: "end", kind: "agent", text: "Uw nabestelling is geplaatst en wordt naar het adres in uw dossier verzonden. Nog iets anders?" },
        ] },
      ],
    },
    logos: { title: "Handelt dagelijks honderden gesprekken af bij:", logos },
    demo: {
      title: "Hoor Optavius een echt gesprek voeren",
      lede: "Druk op afspelen, of bel de demolijn en probeer het zelf.",
      sampleLabel: "Voorbeeldgesprek · openingstijden en een oogonderzoek verzetten",
      duration: "1:05", play: "Beluister het voorbeeldgesprek", stop: "Stop", hint: "Het transcript volgt het gesprek.",
      call: callDemo, note: "Het is Optavius dat opneemt.",
      transcript: [
        { who: "agent", at: 0, text: "Hoi, ik ben Julia, de digitale assistent van Optavius. Dit gesprek kan worden opgenomen. Waarmee kan ik je helpen?" },
        { who: "caller", at: 9, text: "Hoi Julia, met Peter-Paul. Ik vroeg me af wat jullie openingstijden zijn morgen." },
        { who: "agent", at: 16, text: "Morgen, zaterdag, zijn we geopend van half tien 's ochtends tot half zeven 's avonds. Kan ik je nog ergens anders mee helpen?" },
        { who: "caller", at: 23, text: "Ja, ik zou graag mijn oogonderzoek willen verplaatsen. Die had ik gepland staan, dat zou ik naar volgende week willen verplaatsen." },
        { who: "agent", at: 34, text: "Ik heb je gegevens gevonden bij het telefoonnummer waarmee je belt. Naar welke dag en welk tijdstip wil je je oogonderzoek volgende week verplaatsen?" },
        { who: "caller", at: 42, text: "Als het kan naar dinsdag, drie of vier uur." },
        { who: "agent", at: 49, text: "Ik heb je oogonderzoek verzet naar dinsdag om vier uur. Ik stuur een bevestigings-sms naar het nummer waarmee je belt. Kan ik je nog ergens anders mee helpen?" },
        { who: "caller", at: 59, text: "Nee hoor, dat was het. Dank je wel." },
        { who: "agent", at: 63, text: "Graag gedaan Peter-Paul, fijne dag verder." },
      ],
    },
    bento: {
      title: "Uw praktijk draait door.\nOok als u er niet bent.",
      lede: "Optavius beantwoordt, plant in en volgt op, zodat uw team zich kan richten op de patiënt die voor hen staat.",
      cards: [
        { id: "green", title: "Maak van elke oproep een geplande afspraak", body: "Beantwoord elke oproep, dag en nacht, en plan direct in uw agenda.", sr: "Animatie van oproepen van verschillende oogzorgpraktijken die worden beantwoord en ingepland." },
        { id: "blue", title: "Geef elk team zijn tijd terug", body: "Balie, artsen en managers stoppen met de telefoon en beginnen met patiënten.", sr: "Animatie van het kiezen van een meetplek en het plaatsen van een lensnabestelling." },
        { id: "pink", title: "Eén agent op elk kanaal", body: "Spraak eerst, met webchat, e-mail, sms en WhatsApp onder dezelfde regels.", sr: "Animatie van één gesprek dat over spraak, chat, e-mail en sms beweegt." },
        { id: "orange", title: "Betaal voor werk dat gedaan is", body: "Eenvoudige maandprijzen. Geen contracten. Op elk moment opzegbaar.", sr: "Animatie van beoordelingen en een afgeronde uitkomst." },
      ],
    },
    console: { title: "Maak kennis met de console", lede: "Elke oproep, afspraak en escalatie op één plek. Vraag alles in gewone taal." },
    proof: {
      title: "Wat er veranderde toen Optavius de telefoon overnam",
      lede: "Gemeten bij Cubitts, voor en nadat Optavius de telefoon overnam.",
      outcomes: [
        { after: "+23%", label: "Meer afspraken ingepland", text: "Bellers buiten openingstijden en bellers die vroeger ophingen, plannen nu een afspraak." },
        { after: "≈170 u", label: "Bespaarde personeelsuren per maand", text: "2.526 oproepen per maand afgehandeld zonder medewerker, à vier minuten elk." },
        { before: "4 min", after: "2 sec", label: "Gemiddelde reactietijd", text: "Van vier minuten in de wacht op piekmomenten naar een antwoord bij de eerste beltoon." },
        { before: "0%", after: ">60%", label: "Afgehandeld zonder medewerker", text: "Meer dan zes op de tien oproepen worden volledig afgerond: informatie, bestelstatus, afspraken." },
        { before: "50%", after: "0%", label: "Gemiste bellers nooit meer gehoord", text: "De helft van de mensen die de voicemail kreeg, belde nooit terug. Er is geen voicemail meer." },
        { before: "30%", after: "0%", label: "Oproepen nooit beantwoord", text: "Bijna een derde van de oproepen bleef onbeantwoord. Nu wordt elke oproep opgenomen, ook 50 tegelijk." },
      ],
      source: "Resultaten uit 8.420 inkomende oproepen in mei en juni 2026 bij Cubitts.",
    },
    agents: {
      title: "Maak kennis met de agents",
      lede: "Elke agent doet één taak, van begin tot eind, en rapporteert elke dag aan u.",
      cta: { label: "Alle agents", href: "/product/agents" },
      tiles: [
        { mock: "agent-frontdesk", title: "Balie", text: "Beantwoordt elke oproep, plant in, verzet en annuleert, 24/7." },
        { mock: "agent-orders", title: "Bestelstatus", text: "Vertelt bellers hoe het staat met hun bril, lenzen of bestelling." },
        { mock: "agent-recall", title: "Oproepen en herinneringen", text: "Vindt elke patiënt die aan een controle toe is en plant hem in." },
        { mock: "agent-noshow", title: "No-show herstel", text: "Belt elke no-show binnen twee uur en plant opnieuw in." },
      ],
    },
    live: {
      title: "Live in 48 uur. Niet in 48 dagen.",
      lede: "Niets te installeren, niets te vervangen. Optavius werkt vanaf dag één standalone.",
      steps: [
        { mock: "hz-proactive", title: "Schakel uw nummer door", text: "Oproepen gaan naar Optavius: allemaal, alleen de overloop of alleen buiten openingstijden. Uw nummer blijft hetzelfde." },
        { mock: "journeys", title: "Wij richten uw paden in", text: "Artsen, roosters, regels en alarmsymptomenprotocollen, ingericht met uw team. U keurt elk antwoord goed." },
        { mock: "ins-observability", title: "Ga live", text: "Bekijk de eerste gesprekken in uw dashboard. Koppel uw EPD wanneer u er klaar voor bent." },
      ],
    },
    quotes: {
      title: "De resultaten spreken voor zich",
      lede: "Praktijken die elke oproep beantwoorden, in hun eigen woorden.",
      items: [
        { quote: "Het kent het verschil tussen een contactlensconsult en een nabestelling. Onze balie heeft eindelijk tijd voor de patiënt die voor hen staat.", name: "Feike", role: "Praktijkmanager, OMC Amstelland", logo: logos[0].src, logoAlt: "OMC Amstelland", ...PEOPLE.feike, href: "/customers/omc-amstelland" },
        { quote: "Patiënten zeggen dat de telefoon eindelijk makkelijk is. Ons team zegt hetzelfde.", name: "Ahmed", role: "Praktijkeigenaar, North Texas Eye Specialists", logo: logos[1].src, logoAlt: "North Texas Eye Specialists", ...PEOPLE.ahmed, href: "/customers/north-texas-eye-specialists" },
        { quote: "Statusvragen over bestellingen vulden vroeger onze zaterdagen. Nu vertelt de telefoon mensen dat hun bril klaar is voordat ze eraan denken te vragen.", name: "Tom", role: "Oprichter, Cubitts", logo: logos[2].src, logoAlt: "Cubitts", ...PEOPLE.tom, href: "/customers/cubitts" },
      ],
    },
    trust: { title: "Vertrouwen en betrouwbaarheid", text: "Optavius is gebouwd voor verantwoording in de zorg. Elk pad, elke beslissing en elke escalatie is gedocumenteerd en controleerbaar.", badges: TRUST_BADGES },
    cta,
  },

  product: {
    meta: { title: "Productoverzicht | Optavius", description: "AI voice agents die elke oproep beantwoorden, afspraken inplannen en escaleren wat ertoe doet. Spraak eerst, met elk kanaal in één console." },
    hero: {
      title: "Maak kennis met Optavius",
      subtitle: "De voice agent die oogzorg spreekt, bij de eerste beltoon opneemt en nooit een patiënt laat wachten",
      media: { kind: "video", src: VIDEOS.product.video, poster: VIDEOS.product.poster },
      overlay: [
        { side: "start", kind: "user", name: "Beller", text: "Kan ik mijn oogmeting naar donderdag verzetten?" },
        { side: "end", kind: "agent", text: "Gedaan. Donderdag 9:40 bij dr. Okafor. Neem uw huidige bril mee." },
      ],
      cta: { label: "Beluister een voorbeeldgesprek", href: "/#demo" },
    },
    sections: [
      { key: "voice", title: "Uw voice agent", lede: "Een natuurlijk gesprek, geen keuzemenu. Hij luistert, begrijpt het verzoek en rondt de taak af.", mediaSide: "right", media: { kind: "mock", name: "agent-frontdesk" }, features: [
        { icon: "phone", title: "Beantwoordt elke oproep, 24/7", text: "Eén beller of vijftig tegelijk. Dag, nacht en weekend, zonder wachttijd en zonder voicemail." },
        { icon: "calendar", title: "Plant direct in uw agenda", text: "Het juiste type meting, de juiste arts, de juiste tijdsduur, bevestigd per sms." },
        { icon: "shield", title: "Escaleert wat ertoe doet", text: "Flitsen, floaters, plotseling gezichtsverlies: uw protocol beslist, en de dienstdoende arts krijgt in seconden een samenvatting." },
      ] },
      { key: "eyecare", title: "De enige voice agent die speciaal voor oogzorg is gebouwd", lede: "Eerst exclusief gebouwd voor optometrie en oogheelkunde, nu ook voor dermatologie en diergeneeskunde. Getraind op meer dan 10.000 oogzorgtermen.", mediaSide: "left", media: { kind: "mock", name: "eye" }, features: [
        { icon: "eye", title: "Spreekt uw specialisme", text: "Kent het verschil tussen een cataractconsult en een contactlensaanmeting, en plant elk correct in." },
        { icon: "checklist", title: "Volgt uw paden", text: "Alarmsymptomenlijsten, planningsregels en scripts, goedgekeurd door uw medisch verantwoordelijke." },
        { icon: "reverse", title: "Leert van elke correctie", text: "Markeer een gesprek als fout met één klik. De fix wordt getest voordat hij live gaat." },
      ] },
      { key: "channels", title: "Eén agent op elk kanaal", lede: "Spraak eerst. Webchat, e-mail, sms en WhatsApp volgen dezelfde regels en hetzelfde toezicht.", mediaSide: "right", media: { kind: "mock", name: "channels-hero" }, features: [
        { icon: "phone", title: "Spraak", text: "Inkomende en uitgaande gesprekken op uw bestaande nummer." },
        { icon: "chat", title: "Webchat en e-mail", text: "Vragen via uw website en gedeelde inbox, beantwoord uit dezelfde scripts." },
        { icon: "sms", title: "Sms en WhatsApp", text: "Bevestigingen, herinneringen en boekingslinks waar patiënten al zijn." },
      ] },
      { key: "trust", title: "Vertrouwen en veiligheid", lede: "Elke agent wordt gecontroleerd. Elke beslissing die ertoe doet, is van u.", mediaSide: "left", media: { kind: "mock", name: "ins-observability" }, features: [
        { icon: "eye", title: "De Reviewer", text: "Een toezichthoudende agent beoordeelt steekproefgesprekken op juistheid, toon en uw regels. U ziet de scores." },
        { icon: "user", title: "Overdracht aan een mens", text: "Medische vragen, spoedsymptomen, klachten en twijfel gaan naar uw team, met het transcript." },
        { icon: "lock", title: "Volledige audittrail", text: "Elke oproep, elk bericht en elke afspraak gelogd en herleidbaar. AVG, HIPAA, dataopslag in de EU." },
      ] },
    ],
    quote: { logo: logos[0].src, logoAlt: "OMC Amstelland", quote: "Het kent het verschil tussen een contactlensconsult en een nabestelling. Onze balie heeft eindelijk tijd voor de patiënt die voor hen staat.", name: "Feike", role: "Praktijkmanager, OMC Amstelland", link: { label: "Volledig verhaal", href: "/customers/omc-amstelland" } },
    trust,
    pricingTeaser: { title: "Prijzen die de resultaten volgen", text: "Vanaf €279 per maand. Geen opstartkosten, geen contracten. Levert Optavius geen resultaat, dan betaalt u niets.", link: { label: "Bekijk prijzen", href: "/pricing" }, mock: "pricing-card" },
    related: { title: "Ontdek het platform", cards: related("") },
    cta,
  },

  consolePage: {
    meta: { title: "Console | Optavius", description: "De Optavius-console: het ochtendoverzicht, wat u nodig heeft, elke oproep en afspraak, en een opdrachtbalk die gewone taal begrijpt." },
    hero: { title: "Console", subtitle: "Uw dag, al op orde", media: { kind: "mock", name: "dashboard-full" } },
    sections: [
      { key: "today", title: "Begin met het overzicht", lede: "De console opent met wat er vannacht gebeurde en wat vandaag uw aandacht vraagt. Typen is niet nodig.", mediaSide: "right", media: { kind: "mock", name: "briefing", zoom: 1.15 }, features: [
        { icon: "sun", title: "Ochtendoverzicht", text: "Beantwoorde oproepen, geplande afspraken, escalaties en alles wat opviel, elke ochtend voor u geschreven." },
        { icon: "inbox", title: "Vraagt uw aandacht", text: "Goedkeuringen, doorverbindingen en gemarkeerde gesprekken in één wachtrij, met volledige context." },
        { icon: "status", title: "Agentstatus", text: "Het werk en de status van elke agent in de linkerbalk, per locatie." },
      ] },
      { key: "dashboards", title: "Dashboards die lezen als het rapport van een teamlid", lede: "Klik op een agent en zie zijn werk: beantwoordpercentage, afspraken, gespreksduur, escalaties en kwaliteitsscores.", mediaSide: "left", media: { kind: "mock", name: "reporting", zoom: 1.15 }, features: [
        { icon: "chart", title: "Uitkomsten, geen verzendingen", text: "Geplande afspraken, teruggewonnen plekken en opgevangen beluren, naast wat de agent kost." },
        { icon: "eye", title: "Reviewer-paneel", text: "Slagingspercentage van steekproefgesprekken en gemarkeerde runs, zichtbaar op elk dashboard." },
        { icon: "pause", title: "Pauzeren met één klik", text: "Elke agent, elke locatie, elk moment." },
      ] },
      { key: "command", title: "Stuur de dag vanuit één balk", lede: "Eén balk onderaan elk scherm. Pauzeer een agent, wijzig een regel of keur een doorverbinding goed in één zin, in het Nederlands, Engels of Duits.", mediaSide: "right", media: { kind: "mock", name: "insights-query", zoom: 1.15 }, features: [
        { icon: "search", title: "Antwoorden met bron", text: "Elk antwoord vermeldt het systeem en het synchronisatiemoment waar het vandaan komt." },
        { icon: "undo", title: "Acties met een auditregel", text: "Elke wijziging krijgt een referentie en, waar mogelijk, een ongedaan-maken." },
        { icon: "phone", title: "Ook op uw telefoon", text: "Dezelfde console als app, met pushmeldingen voor goedkeuringen en het overzicht." },
      ] },
    ],
    quote: { logo: logos[1].src, logoAlt: "North Texas Eye Specialists", quote: "Patiënten zeggen dat de telefoon eindelijk makkelijk is. Ons team zegt hetzelfde.", name: "Ahmed", role: "Praktijkeigenaar, North Texas Eye Specialists", link: { label: "Volledig verhaal", href: "/customers/north-texas-eye-specialists" } },
    related: { title: "Gerelateerde producten", cards: related("console") },
    cta,
  },

  askOptavius: {
    meta: { title: "Ask Optavius | Optavius", description: "Koppel uw agenda, bellog en documenten en vraag alles over uw eigen praktijk. 90 dagen gratis, inbegrepen bij elke actieve agent." },
    hero: { title: "Ask Optavius", subtitle: "Gratis antwoorden over uw eigen praktijkdata", media: { kind: "video", src: VIDEOS.insights.video, poster: VIDEOS.insights.poster } },
    sections: [
      { key: "connect", title: "Koppel, en vraag", lede: "Alleen-lezen toegang tot uw agenda, bellog en documentenpostbus. Onbeperkt aantal gebruikers. 90 dagen gratis.", mediaSide: "right", media: { kind: "mock", name: "explorer-table", zoom: 1.15 }, features: [
        { icon: "plug", title: "Standaardkoppelingen", text: "Agenda, telefooncentrale, PMS-export en verwijspostbus, in één dag gekoppeld." },
        { icon: "search", title: "Vraag alles", text: "No-shows per locatie, onbeantwoorde oproepen vorige week, verwijsachterstand, omzet geboekt volgende maand." },
        { icon: "doc", title: "Antwoorden met bronnen", text: "Tekst plus tabellen, met het systeem en synchronisatiemoment achter elk getal." },
      ] },
      { key: "baseline", title: "Uw nulmeting, in uw eigen cijfers", lede: "Week één levert een vast rapport over de zes cijfers die u al naar boven rapporteert.", mediaSide: "left", media: { kind: "mock", name: "briefing", zoom: 1.15 }, features: [
        { icon: "chart", title: "Zes bereikbaarheidscijfers", text: "Opneemsnelheid, afhaakpercentage, planningsnauwkeurigheid, oproepen per baliemedewerker, volume buiten openingstijden en plekbenutting." },
        { icon: "trend", title: "Plus wat u misloopt", text: "Teruggewonnen plekken en verwijsachterstand, zodat de businesscase voor de eerste agent uw eigen data is." },
        { icon: "reverse", title: "Maandelijks opnieuw gerapporteerd", text: "Het verschil is altijd uw cijfer, niet het onze." },
      ] },
      { key: "next", title: "De opstap naar de volgende agent", lede: "Als de gratis laag laat zien wat u mist, huurt u de agent die het oplost. Na de proefperiode inbegrepen bij elke actieve agent.", mediaSide: "right", media: { kind: "mock", name: "recommendations", zoom: 1.15 }, features: [
        { icon: "sparkles", title: "Inzichten die ergens naartoe wijzen", text: "Elke bevinding linkt naar de agent die haar zou veranderen." },
        { icon: "lock", title: "Alleen-lezen by design", text: "De gratis laag schrijft nooit naar uw systemen." },
        { icon: "calendar", title: "Een einddatum op elke proef", text: "90 dagen, daarna inbegrepen bij elke actieve agent. Geen verrassingen." },
      ] },
    ],
    related: { title: "Gerelateerde producten", cards: related("ask") },
    cta: { ...cta, title: "Koppel uw data deze week", text: "90 dagen gratis. Zie uw eigen nulmeting voordat u iets beslist.", primary: { label: "Gratis starten", href: "/demo" } },
  },

  agentsPage: {
    meta: { title: "Agents | Optavius", description: "Huur AI-agents voor de balie, bestelstatus, oproepen, no-show herstel en meer. Eén taak, één prijs, één dashboard." },
    hero: { title: "Agents", subtitle: "Aangenomen als personeel. Bewezen voordat ze vertrouwd worden.", media: { kind: "mock", name: "agent-studio-hero" } },
    sections: [
      { key: "hire", title: "Neem een agent aan met één klik", lede: "Begin met één. Voeg de volgende toe met één klik. Zet ze uit wanneer u wilt.", mediaSide: "right", media: { kind: "mock", name: "simulations", zoom: 1.15 }, features: [
        { icon: "chat", title: "Inrichten in gesprek", text: "De agent stelt regels voor op basis van uw praktijkdata. U past ze aan in gewone taal en keurt ze goed." },
        { icon: "eye", title: "Schaduwmodus", text: "Een week op echte gesprekken zonder te handelen. U ziet alles wat hij gedaan zou hebben, beoordeeld door de Reviewer." },
        { icon: "check", title: "Akkoord, dan live", text: "Facturatie begint op de dag dat u de schakelaar omzet. Niet eerder." },
      ] },
      { key: "journeys", title: "Agents die de taak afmaken", lede: "Verwijzing binnen, patiënt ingepland, formulieren compleet, no-show hersteld. Elke agent is eigenaar van één uitkomst, van begin tot eind.", mediaSide: "left", media: { kind: "mock", name: "hz-optimization" }, features: [
        { icon: "flag", title: "Van verwijzing naar zorg", text: "Leest de verwijzing, vraagt na wat ontbreekt, belt de patiënt en plant het juiste consult." },
        { icon: "calendar", title: "Oproepen en herinneringen", text: "Vindt elke patiënt die aan de beurt is, belt tot hij is ingepland en voorkomt no-shows voordat ze gebeuren." },
        { icon: "reverse", title: "No-show herstel en wachtlijst", text: "Belt binnen twee uur, plant opnieuw in en vult vrijgekomen plekken vanaf de wachtlijst." },
      ] },
    ],
    library: {
      title: "De agentbibliotheek",
      lede: "Elke agent heeft één taak. Begin met één en voeg de volgende met één klik toe.",
      classes: { voice: "Spraak", digital: "Digitaal" },
      items: [
        { name: "Balie", job: "Beantwoordt routinevragen 24/7 uit uw goedgekeurde scripts en routeert spoedsymptomen volgens protocol.", cls: "voice", from: "In elk abonnement" },
        { name: "Inplannen, verzetten en annuleren", job: "Plant, verzet en annuleert afspraken bij elk gesprek, direct in uw agenda.", cls: "voice", from: "In elk abonnement" },
        { name: "Bestelstatus", job: "Vertelt bellers hoe het staat met hun bril, lenzen of bestelling, zonder wachtrij.", cls: "voice", from: "Professional" },
        { name: "Oproepen en herinneringen", job: "Vindt elke patiënt die aan een controle toe is en belt tot hij is ingepland.", cls: "voice", from: "Professional" },
        { name: "No-show herstel", job: "Belt elke no-show binnen twee uur en plant opnieuw in op de eerste geschikte plek.", cls: "voice", from: "Professional" },
        { name: "Wachtlijst vullen", job: "Werkt bij een vrijgekomen plek uw wachtlijst af tot de plek gevuld is.", cls: "voice", from: "Professional" },
        { name: "Verwijzingsintake", job: "Leest elke verwijzing, controleert de volledigheid en vraagt na wat ontbreekt.", cls: "digital", from: "Professional" },
        { name: "Intake en formulieren", job: "Verstuurt formulieren en voorbereidingsinstructies en bevestigt dat de patiënt klaar is.", cls: "digital", from: "Professional" },
        { name: "Webchat en e-mail", job: "Beantwoordt vragen via uw website en inbox met dezelfde regels als de telefoon.", cls: "digital", from: "Professional" },
        { name: "Postoperatieve nazorg", job: "Belt elke geopereerde patiënt, stelt uw vragen en markeert alarmsymptomen voor uw team.", cls: "voice", from: "Enterprise" },
        { name: "Bestelcontrole", job: "Controleert brilbestellingen op consistentie van recept en drager voordat ze naar het lab gaan.", cls: "digital", from: "Enterprise" },
        { name: "Patiëntfacturatie", job: "Beantwoordt factuurvragen en verstuurt betaallinks. Geschillen gaan naar uw team.", cls: "digital", from: "Enterprise" },
      ],
    },
    quote: { logo: logos[2].src, logoAlt: "Cubitts", quote: "Statusvragen over bestellingen vulden vroeger onze zaterdagen. Nu vertelt de telefoon mensen dat hun bril klaar is voordat ze eraan denken te vragen.", name: "Tom", role: "Oprichter, Cubitts", link: { label: "Volledig verhaal", href: "/customers/cubitts" } },
    related: { title: "Gerelateerde producten", cards: related("agents") },
    cta,
  },

  integrations: {
    meta: { title: "Koppelingen | Optavius", description: "Optavius werkt met uw telefooncentrale, agenda, praktijksysteem en EPD. Begin standalone, koppel wanneer u er klaar voor bent." },
    hero: { title: "Koppelingen", subtitle: "Werkt met de systemen die u al gebruikt", media: { kind: "mock", name: "integrations" } },
    sections: [
      { key: "phone", title: "Uw nummer blijft hetzelfde", lede: "VoIP, vaste lijn of cloud. Oproepen worden doorgeschakeld naar Optavius. Niets wordt vervangen.", mediaSide: "right", media: { kind: "mock", name: "voice-green" }, features: [
        { icon: "phone", title: "Elke telefooncentrale", text: "RingCentral, Zoom Phone, Twilio, Vonage, een PBX of een SIP-trunk." },
        { icon: "reverse", title: "Doorschakelen als vangnet", text: "Als Optavius een oproep niet kan aannemen, belt hij uw team. Getest bij elke livegang." },
        { icon: "clock", title: "Overloop en buiten openingstijden", text: "Schakel alle oproepen door, alleen de overloop, of alleen als u gesloten bent." },
      ] },
      { key: "ehr", title: "Afspraken geschreven waar ze horen", lede: "Tweerichtingssynchronisatie met uw agenda, praktijksysteem of EPD, wanneer u er klaar voor bent.", mediaSide: "left", media: { kind: "mock", name: "hz-context" }, features: [
        { icon: "calendar", title: "Agenda eerst", text: "Google, Outlook en Cal.com op dag één gekoppeld, zodat elke afspraak in uw eigen systeem landt." },
        { icon: "doc", title: "EPD en PMS", text: "H4H, Medicore, Nexus, ChipSoft, RevolutionEHR, Eyefinity, ModMed en Epic via API of FHIR." },
        { icon: "check", title: "Gecontroleerde schrijfacties", text: "Elke afspraak wordt teruggelezen voordat hij aan de patiënt wordt bevestigd. Geen dubbele boekingen, geen handmatige invoer." },
      ] },
      { key: "data", title: "Gebouwd om zorgdata te dragen", lede: "FHIR-conform vanaf de eerste dag, zodat elk record al de vorm heeft die uw systemen verwachten.", mediaSide: "right", media: { kind: "mock", name: "governance" }, features: [
        { icon: "lock", title: "Versleuteld en in de regio", text: "AES-256 in rust, TLS 1.3 onderweg, dataopslag in de EU of de VS." },
        { icon: "shield", title: "Minimale rechten", text: "Eerst alleen-lezen. Schrijfrechten per agent, per actie, gelogd en omkeerbaar." },
        { icon: "plug", title: "API en MCP", text: "Elk systeem met een open API of MCP-server, per klant afgebakend." },
      ] },
    ],
    logos: { title: "Werkt met wat u heeft", lede: "Begin standalone. Koppel uw EPD, agenda en telefooncentrale wanneer u er klaar voor bent.", more: "+20 integratiepartners", groups: [
      { label: "EPD en praktijkmanagement", items: INTEGRATION_LOGOS.ehr }, { label: "Telefooncentrales", items: INTEGRATION_LOGOS.phone }, { label: "Agenda en CRM", items: INTEGRATION_LOGOS.tools },
    ] },
    related: { title: "Gerelateerde producten", cards: related("integrations") },
    cta,
  },

  pricing: {
    meta: { title: "Prijzen | Optavius", description: "Resultaatgerichte prijzen voor AI-spraakagenten. Vanaf €279 per maand. Levert Optavius geen resultaat, dan betaalt u niets." },
    title: "Prijzen die de resultaten volgen",
    lede: "U betaalt voor wat Optavius oplevert, niet voor gebruikers of minuten.",
    from: "Vanaf €279 per maand",
    how: {
      title: "Zo werkt resultaatgerichte prijsstelling",
      lede: "Eén maandbedrag, gekoppeld aan wat de agent daadwerkelijk voor uw praktijk doet.",
      items: [
        { icon: "phone", title: "Een maandbedrag vanaf €279", text: "Inclusief de agent, de console, onbeperkt gebruikers, installatie en ondersteuning. Geen kosten per gebruiker of per minuut." },
        { icon: "chart", title: "Gekoppeld aan resultaten", text: "Het bedrag volgt wat Optavius oplevert: beantwoorde oproepen, ingeplande afspraken, teruggewonnen no-shows. De doelen spreken we vooraf met u af." },
        { icon: "shield", title: "Geen resultaat, geen kosten", text: "In een maand waarin Optavius niets inplant en niets afhandelt, betaalt u niets. Dat risico nemen wij, niet u." },
      ],
    },
    stats: { title: "De rekensom klopt", items: [{ value: "~€0/dag", label: "als er geen resultaten zijn" }, { value: "€9K+", label: "gebruikelijke maandelijkse besparing" }, { value: "20%", label: "gemiddelde omzetstijging" }] },
    calc: { title: "Wat de telefoon u kost", text: "Zet de schuifjes op uw eigen cijfers. De rekensom is bewust voorzichtig.", calls: "Inkomende oproepen per maand", missed: "Gemiste oproepen nu", value: "Waarde van één afspraak", recovered: "extra afspraken per maand", revenue: "extra omzet per maand", typical: "Bij praktijken zien we meestal 20 tot 30% voordat ze starten.", note: "Extra afspraken = gemiste oproepen × 50% die nooit terugbelt × 35% die wilde boeken. Cijfers van bestaande klanten.", currency: "€" },
    faq: {
      title: "Vragen over prijzen",
      items: [
        { q: "Wat telt als resultaat?", a: "Een uitkomst die de agent van begin tot eind afrondt: een oproep beantwoord en afgehandeld, een afspraak ingepland of verzet, een no-show opnieuw ingepland, een bestelstatus bevestigd. U ziet ze allemaal in de console." },
        { q: "Wat betaal ik in een maand zonder resultaten?", a: "Niets. Het maandbedrag geldt alleen als Optavius de afgesproken resultaten levert." },
        { q: "Hoe wordt het bedrag voor mijn praktijk bepaald?", a: "We kijken naar uw belvolume en de resultaten die voor u tellen, en spreken vooraf een maandbedrag en doelen af. Groepen met meerdere locaties krijgen een groepsafspraak." },
        { q: "Zijn er kosten per minuut of per gebruiker?", a: "Nee. Minuten en gebruikers zijn onbeperkt. Het bedrag is gekoppeld aan resultaten, niet aan gebruik." },
        { q: "Zijn er opstartkosten?", a: "Nee. Installatie, configuratie en onboarding zijn inbegrepen." },
        { q: "Kan ik opzeggen?", a: "Ja, maandelijks. Er zijn geen lange contracten." },
        { q: "Is er een proefperiode?", a: "Ja. Ask Optavius is 90 dagen gratis en elke agent draait een week in schaduwmodus voordat hij live gaat." },
      ],
    },
    cta: { title: "Vraag een offerte voor uw praktijk", text: "We rekenen teruggewonnen afspraken en personeelsuren door op uw eigen belvolume en spreken de doelen met u af.", primary: contactSales, secondary: callDemo, note: "Spreek met onze oprichter. Vrijblijvend." },
  },

  specialties: {
    meta: { title: "Specialismen | Optavius", description: "AI voice agents voor oogheelkunde, optometrie, dermatologie en dierenklinieken." },
    title: "Uw voice agent voor specialistische zorg.",
    lede: "Gebouwd voor de oproepen die uw specialisme echt krijgt. Oogheelkunde, optometrie, dermatologie en diergeneeskunde.",
    logos: { title: "", logos },
    quote: { logo: logos[0].src, logoAlt: "OMC Amstelland", quote: "Het kent het verschil tussen een contactlensconsult en een nabestelling. Onze balie heeft eindelijk tijd voor de patiënt die voor hen staat.", name: "Feike", role: "Praktijkmanager, OMC Amstelland", link: { label: "Volledig verhaal", href: "/customers/omc-amstelland" } },
    cta,
    pages: specialties,
  },

  customers: {
    meta: { title: "Klantverhalen | Optavius", description: "Praktijken die elke oproep beantwoorden, in hun eigen woorden." },
    title: "Onze klanten\nin hun eigen woorden",
    heroImage: { src: PHOTOS.story, alt: "Eye clinic team", logo: logos[0].src, logoAlt: "OMC Amstelland" },
    storiesTitle: "Dit zijn hun verhalen",
    featuredTitle: "Uitgelichte verhalen",
    gridTitle: "Voorlopers in\nspecialistische zorg",
    stories,
    moreTitle: "Meer klantverhalen",
    cta,
  },

  about: {
    meta: { title: "Over ons | Optavius", description: "Optavius vermindert wrijving in specialistische zorg: voor patiënten, voor medewerkers en voor artsen." },
    title: "Wie we zijn\nen waarom we hier zijn.",
    lede: "Over Optavius.",
    image: { src: PHOTOS.examroom, alt: "Onderzoekskamer van een oogkliniek" },
    statement: { title: "Optavius vermindert wrijving in specialistische zorg: voor patiënten, voor medewerkers en voor artsen.", text: "De voorkant van het patiënttraject is vaak het meest frustrerende deel. Lange wachttijden, wisselende intake en overbelaste medewerkers. We hebben Optavius gebouwd om dat op te lossen, te beginnen bij de telefoon." },
    values: [
      { icon: "shield", title: "Veiligheid eerst", text: "Elke functie, elk pad en elke beslissing is ontworpen met patiëntveiligheid als prioriteit. Optavius stelt geen diagnoses en gaat nooit tegen een medisch oordeel in. Dat is een ontwerpprincipe, geen disclaimer." },
      { icon: "bolt", title: "Snel resultaat", text: "Live in dagen, niet in maanden. Een praktijk schakelt haar nummer door, keurt haar paden goed en ziet dezelfde week de eerste gesprekken in haar dashboard." },
      { icon: "chart", title: "Bewijs boven beloftes", text: "We meten alles en laten u de cijfers zien. Werkt iets niet, dan vertellen we het u en lossen we het op." },
    ],
    founders: {
      title: "Onze oprichters",
      lede: "Optavius is opgericht door Yves Prevoo en Paul Sabou, die meer dan twintig jaar zorgtechnologie en gereguleerde medische hulpmiddelen meebrengen naar de balie.",
      people: [
        { name: "Yves Prevoo", role: "Oprichter en CEO", image: PHOTOS.yves, text: "Yves werkte meer dan twintig jaar in zorgtechnologie, in product, regelgeving en klinische operaties. Als lid van het oprichtersteam van Easee, het digitale oogtestbedrijf, hielp hij een van de eerste producten bouwen die CE-klasse IIa onder de EU MDR bereikten. Bij Optavius leidt hij de weg naar FDA- en CE-goedkeuring voor de AI-functies die de agent steeds zelfstandiger maken." },
        { name: "Paul Sabou", role: "Medeoprichter en CTO", image: PHOTOS.paul, text: "Paul is serieondernemer en technisch leider. Als medeoprichter en CTO van BusyMachines, dat groeide tot meer dan vijftig mensen voor de overname, adviseerde hij zestig startups over technologie en strategie. Zijn werk omvat zorgdossiersystemen en gedistribueerde platforms. Bij Optavius is hij eigenaar van de architectuur en het product." },
      ],
    },
    offices: { title: "Onze kantoren", text: "Vanuit {cities} werken we met praktijken in de Verenigde Staten, Nederland en daarbuiten.", cities: ["Houston", "Amsterdam"] },
    cta: { ...cta, title: "Meer weten?", text: "Vertel ons over uw praktijk en we laten zien wat Optavius met uw oproepen zou doen." },
  },

  resources: {
    meta: { title: "Kennisbank | Optavius", description: "Gidsen, vergelijkingen en klantverhalen over AI voice agents voor specialistische zorg." },
    title: "Kennisbank",
    filters: [{ key: "all", label: "Uitgelicht" }, { key: "learn", label: "Gidsen" }, { key: "compare", label: "Vergelijkingen" }, { key: "case", label: "Klantverhalen" }, { key: "blog", label: "Blog" }],
    readTime: "min leestijd",
    backLabel: "Alle artikelen",
    cta,
  },

  careers: {
    meta: { title: "Werken bij | Optavius", description: "Help specialistische zorg elke oproep te beantwoorden. Vacatures bij Optavius." },
    title: "Hoi, wij zijn Optavius.\nWe zien je graag komen.",
    lede: "Bouw de agents die de telefoon opnemen voor specialistische zorg.",
    cta: { label: "Vacatures", href: "#open-roles" },
    image: { src: PHOTOS.story, alt: "Kliniekteam aan het werk" },
    statement: "We zijn een klein team dat AI-agents bouwt die praktijken aannemen, aansturen en betalen als personeel. Ons werk zit tussen patiënten en artsen, dus we nemen veiligheid en bewijs serieus en we leveren elke week. Hou je van echte klanten, echte data en moeilijke problemen, kom dan met ons bouwen.",
    culture: [
      { icon: "marker", title: "Amsterdam en Houston", text: "We werken vanuit Amsterdam en Houston en brengen de meeste tijd door bij klanten. Op afstand werken kan als het werk het toelaat." },
      { icon: "heart", title: "Klant nul", text: "We draaien Optavius op Optavius. Onze eigen financiën, sales ops en support draaien op de agents die we verkopen." },
      { icon: "sparkles", title: "Klein team, grote hefboom", text: "Drie oprichters, een hands-on tech lead en agentische tooling. Je bent eigenaar van hele uitkomsten, niet van tickets." },
      { icon: "users", title: "Klinische partners", text: "Designpartners in Nederland en Texas beoordelen wat we bouwen voordat het een patiënt bereikt." },
    ],
    interviewing: { title: "Solliciteren bij Optavius", paragraphs: ["We nemen aan op oordeelsvermogen en tempo. Je ontmoet de oprichters, werkt een echt probleem uit onze backlog uit en spreekt een klant.", "Gesprekken vinden plaats in Amsterdam, Houston of via een videocall. Hoe dan ook zie je hoe we werken voordat je beslist."] },
    roles: {
      title: "Vacatures", lede: "We zoeken mensen die iets willen bouwen waar praktijken elke dag op vertrouwen.",
      groups: [
        { name: "Commercieel", roles: [
          { title: "Founding account executive, VS", location: "Houston, TX", href: "mailto:" + EMAIL + "?subject=Account%20executive" },
          { title: "Customer success, specialistische zorg", location: "Amsterdam", href: "mailto:" + EMAIL + "?subject=Customer%20success" },
        ] },
      ],
    },
    finalCta: { title: "Staat jouw rol er niet bij?", text: "Vertel ons wat je zou bouwen. We lezen elk bericht.", primary: { label: "Mail ons", href: "mailto:" + EMAIL }, note: "" },
  },

  demo: {
    meta: { title: "Demo plannen | Optavius", description: "Kies een moment met een oprichter en hoor Optavius een gesprek voeren voor uw praktijk. Vrijblijvend." },
    title: "Kies een moment met een oprichter.",
    points: [
      { icon: "phone", text: "Elke patiëntoproep beantwoord, 24/7, op uw bestaande nummer." },
      { icon: "calendar", text: "Afspraken direct in uw agenda of EPD ingepland." },
      { icon: "shield", text: "Spoedsymptomen geëscaleerd volgens uw protocol, met een samenvatting." },
    ],
    trustedTitle: "Vertrouwd door",
    booking: { title: "Kies een tijdslot", text: "30 minuten met Yves. We horen uw belvolume en laten zien wat Optavius met uw oproepen zou doen.", fallback: { label: "Kies een moment", href: CALENDLY, external: true }, note: "Vrijblijvend." },
  },

  legal: LEGAL.nl,
};

export default nl;
