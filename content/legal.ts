/** Privacy policy and customer terms, one document per language. Structured like the policies of comparable US healthcare AI vendors,
 *  adjusted for an EU and US company that acts as a processor and business associate for practices. */
export type LegalSection = { id: string; title: string; paragraphs: string[]; items?: string[] };
export type LegalDoc = { title: string; updated: string; intro: string; sections: LegalSection[] };

const PRIVACY_EMAIL = "privacy@optavius.com";

export const LEGAL: Record<string, { privacy: LegalDoc; terms: LegalDoc }> = {
  en: {
    privacy: {
      title: "Privacy Policy",
      updated: "Last updated: 11 September 2026",
      intro: "Optavius B.V. (\"Optavius\", \"we\", \"us\") values the privacy of the people who visit optavius.com, use the Optavius console, call our demo line or contact us. This policy explains what we collect, how we use it and the choices you have. By using our website or services you agree to the practices described here.",
      sections: [
        { id: "scope", title: "1. Two roles: controller and processor", paragraphs: [
          "For this website, the console accounts of our customers and our own marketing, Optavius decides how and why personal data is processed. We are the controller under the GDPR and the responsible business under US state privacy laws.",
          "When an Optavius agent answers calls, chats or messages for a practice, the practice decides how and why patient data is processed. The practice is the controller and, in the United States, the covered entity. Optavius acts as processor and business associate under a data processing agreement and, where HIPAA applies, a business associate agreement. The practice's own privacy notice applies to that data. We are not responsible for the privacy practices of our customers.",
        ] },
        { id: "collect", title: "2. Information you give us", paragraphs: ["We collect the information you choose to provide."], items: [
          "Contact and demo requests: name, work email, practice name, specialty, phone number and anything you write in a message or book through our scheduling tool.",
          "Demo line: when you call the demo number, the call is answered by an Optavius agent and recorded and transcribed so you can hear how it works. The recording is deleted within 30 days unless you ask us to keep it.",
          "Console accounts: name, email address, role, practice and the settings you change. The console logs who changed what, so your practice has an audit trail.",
          "Careers: the details in your application and CV, including anything you share through a third-party service such as LinkedIn.",
          "Correspondence: the content of emails and messages you send us, and whether you opened our emails or clicked a link in them.",
        ] },
        { id: "auto", title: "3. Information we collect automatically", paragraphs: ["When you use the website or console we receive technical information from your device."], items: [
          "Device information: IP address, from which we can infer a general location, device type, browser and operating system.",
          "Usage information: pages viewed, the site you came from, dates and times of visits, and interactions with the console.",
          "Cookies and similar technologies: see section 7. We ask for your consent before setting analytics or marketing cookies in the EU and UK.",
        ] },
        { id: "patients", title: "4. Patient information handled for practices", paragraphs: [
          "Calls, transcripts, bookings, order status and messages that an Optavius agent handles for a practice contain personal data about patients, including health information. We process this data only on the practice's documented instructions and only to deliver the agreed service: answering, booking, escalating and reporting.",
          "Callers are informed at the start of a call that they are speaking with an AI assistant and that the call is recorded, in line with the practice's policy and local law. Recordings and transcripts are stored for the retention period agreed with the practice and are then deleted or returned.",
          "We do not sell patient data. We do not use identifiable patient data to train general-purpose models. Where a practice agrees, we may use de-identified, aggregated data to improve pathways and measure quality. De-identified data never contains names, contact details, dates of birth or other identifiers.",
        ] },
        { id: "use", title: "5. How we use information", paragraphs: ["We use the information described in sections 2 and 3 to:"], items: [
          "provide, maintain and improve the website, the console and our services;",
          "respond to demo requests, schedule meetings and provide support;",
          "send administrative messages, and marketing messages you can opt out of at any time;",
          "understand how the website and console are used and develop new features;",
          "detect and prevent fraud, abuse and security incidents;",
          "comply with legal obligations, enforce our terms and protect our rights and those of others;",
          "produce aggregated, de-identified statistics that no longer identify anyone.",
        ] },
        { id: "share", title: "6. How we share information", paragraphs: ["We share personal data only as described here."], items: [
          "Service providers that host, transmit or process data on our behalf: cloud hosting in the EU and US, telephony carriers, speech and language model providers under contracts that prohibit training on your data, email and scheduling tools, analytics and customer support software. Each is bound by a data processing agreement.",
          "Our customers: information about calls and bookings is visible to the practice the agent works for.",
          "Professional advisers such as lawyers, auditors and insurers, under confidentiality.",
          "Authorities, when required by law, a court order or a lawful request, or to protect the safety of a person.",
          "A buyer or successor in a merger, acquisition or sale of assets, under this policy.",
          "Anyone else, with your consent.",
        ] },
        { id: "cookies", title: "7. Cookies and analytics", paragraphs: [
          "The website uses strictly necessary cookies to work. With your consent we use analytics cookies to understand how the site is used and marketing cookies to measure campaigns. You can change your choice at any time through the cookie settings link in the footer. Blocking cookies in your browser also works but may affect how the console behaves.",
          "Our analytics and advertising partners may use cookies and similar technologies across services. You can opt out of personalised advertising through your browser settings and through industry opt-out pages such as youronlinechoices.eu and optout.aboutads.info.",
        ] },
        { id: "security", title: "8. Security", paragraphs: [
          "We protect data with encryption in transit and at rest, role-based access, multi-factor authentication for staff, logging of access to patient data, regular backups and independent testing. Patient data is hosted in the region of the practice: the EU for European practices, the US for American practices.",
          "No system is completely secure. If we become aware of a breach that affects your data we will inform you and, where required, the supervisory authority without undue delay.",
        ] },
        { id: "retention", title: "9. Retention", paragraphs: [
          "We keep contact and demo information for as long as we have a business relationship or a legitimate interest in staying in touch, and at most three years after our last contact. Console account data is kept for the life of the customer contract and deleted within 90 days after it ends, unless the law requires longer. Application data is deleted one year after a vacancy closes unless you ask us to keep it. Patient data is kept for the period agreed with the practice.",
        ] },
        { id: "rights", title: "10. Your rights", paragraphs: [
          "If you are in the EU, the UK or Switzerland you can ask us to access, correct, delete or restrict your personal data, to receive a copy in a portable format, and to object to processing based on our legitimate interests, including direct marketing. You can withdraw consent at any time. You can also complain to your supervisory authority; in the Netherlands that is the Autoriteit Persoonsgegevens.",
          "If you are in a US state with a consumer privacy law, such as California or Texas, you have similar rights to know, access, correct and delete your personal data and to opt out of the sale or sharing of personal data. We do not sell personal data. We will not discriminate against you for exercising your rights.",
          "For patient data handled on behalf of a practice, please contact the practice. We will help the practice respond within the legal deadlines.",
          "To exercise a right, email " + PRIVACY_EMAIL + ". We may ask you to verify your identity first.",
        ] },
        { id: "transfers", title: "11. International transfers", paragraphs: [
          "Optavius operates from Amsterdam and Houston. Data may be processed in the EU and the US. Where personal data leaves the EU, the UK or Switzerland we rely on the EU-US Data Privacy Framework where the recipient is certified, and otherwise on the European Commission's Standard Contractual Clauses with additional safeguards.",
        ] },
        { id: "children", title: "12. Children", paragraphs: [
          "Our website and console are for professionals and are not directed to children. We do not knowingly collect personal data from anyone under 16 through the website. Patient data about children is handled for practices under section 4.",
        ] },
        { id: "changes", title: "13. Changes to this policy", paragraphs: [
          "We post changes on this page with a new date at the top. If a change materially affects how we use personal data we already hold about you, we will tell you by email or in the console before it takes effect.",
        ] },
        { id: "contact", title: "14. Contact", paragraphs: [
          "Optavius B.V., Amsterdam, the Netherlands, and Optavius Inc., Houston, Texas. Questions, requests and complaints: " + PRIVACY_EMAIL + ".",
        ] },
      ],
    },
    terms: {
      title: "Terms and Conditions",
      updated: "Last updated: 11 September 2026",
      intro: "These terms govern the use of the Optavius platform and services by practices and other organisations (\"Customer\", \"you\"). They apply together with each order form you sign with Optavius B.V. or Optavius Inc. (\"Optavius\", \"we\"). Visitors to the website are also bound by section 3.",
      sections: [
        { id: "definitions", title: "1. Definitions", paragraphs: ["Capitalised terms have the following meaning."], items: [
          "Platform: the Optavius software, including voice and digital agents, the console, Ask Optavius, integrations, apps and documentation.",
          "Agent: a configured set of pathways, rules and connections that performs a defined job for the Customer, such as answering the front desk.",
          "Order Form: the document that describes the Agents, targets, fees and term agreed with the Customer.",
          "Customer Data: all data submitted to the Platform by or for the Customer, including call recordings, transcripts, bookings and patient information.",
          "Patient Information: Customer Data that identifies a patient, including protected health information under HIPAA and health data under the GDPR.",
          "Outcome: a task completed end to end by an Agent as defined in the Order Form, for example a call resolved, an appointment booked or a no-show rebooked.",
        ] },
        { id: "services", title: "2. The services", paragraphs: [
          "We make the Platform available and provide the professional services described in each Order Form. You are responsible for the equipment, phone lines, internet access and third-party systems you use to reach the Platform.",
          "We may change the Platform to improve it, provided the changes do not materially reduce its security or performance. We provide support during business hours in the Netherlands and the United States and an emergency line for outages that stop calls from being answered.",
          "All rights not expressly granted are reserved. Nothing in these terms transfers ownership of the Platform.",
        ] },
        { id: "use", title: "3. Accounts and acceptable use", paragraphs: [
          "You are responsible for the people you give access to the console and for keeping credentials confidential. You will notify us promptly of any unauthorised use.",
          "You will not copy, modify, reverse engineer or resell the Platform, use it to build a competing product, probe its security without written permission, upload malicious code, use it for unlawful purposes, or send unsolicited marketing calls or messages through it. You will not use the Platform to make decisions about diagnosis or treatment.",
        ] },
        { id: "customer", title: "4. Your responsibilities", paragraphs: ["Because Agents speak with your patients, you agree to:"], items: [
          "review and approve every pathway, script and escalation rule before an Agent goes live, and keep them current;",
          "designate a clinical lead who signs off on red-flag lists and emergency routing, and a point of contact for operational questions;",
          "obtain any consents and provide any notices required by law for call recording, automated calls and messages, and AI use, including the announcement at the start of each call;",
          "keep your calendar, provider list, opening hours and contact details accurate in the connected systems;",
          "maintain a working fallback so calls reach your team if the Platform is unavailable;",
          "comply with laws that apply to you, including HIPAA, the GDPR, telemarketing and consumer protection laws.",
        ] },
        { id: "safety", title: "5. Patient safety and no medical advice", paragraphs: [
          "Agents do not diagnose, treat or give medical advice. They answer questions, schedule, route and escalate according to the pathways you approve. Clinical judgement remains with you and your clinicians at all times.",
          "Agents tell callers who describe an emergency to hang up and call the local emergency number, and follow your urgent-symptom protocol. You acknowledge that automated systems can misunderstand a caller, and that your protocol and fallback are the safeguard. You remain responsible for the care of your patients.",
        ] },
        { id: "data", title: "6. Customer Data, privacy and patient information", paragraphs: [
          "You own Customer Data. You grant us the right to host, process, transmit and display Customer Data solely to provide the services, support you and comply with the law. We process Patient Information only on your instructions, under our data processing agreement and, where HIPAA applies, our business associate agreement, which form part of these terms.",
          "We do not sell Customer Data and do not use Patient Information to train general-purpose models. With your agreement we may create de-identified, aggregated data to improve pathways and measure quality. Improvements to the Platform that result from processing Customer Data belong to Optavius and contain no Patient Information.",
          "You will make sure you have the right to share Customer Data with us, and that you have given the notices required for us to process it.",
        ] },
        { id: "fees", title: "7. Fees and payment", paragraphs: [
          "Fees are stated in the Order Form. Optavius pricing is tied to Outcomes: the monthly fee applies only in months in which the Agents deliver the Outcomes agreed in the Order Form. There are no per-user or per-minute charges unless the Order Form says otherwise.",
          "We invoice monthly in arrears. Invoices are due within 14 days by card or direct debit. Fees exclude VAT and other taxes, which you pay where applicable. Overdue amounts may accrue statutory interest, and we may suspend the services after written notice if an invoice remains unpaid for 30 days.",
        ] },
        { id: "term", title: "8. Term and termination", paragraphs: [
          "The agreement starts on the date in the Order Form and runs month to month unless the Order Form states a fixed term. Either party may end it at the end of a month with 30 days' written notice.",
          "Either party may terminate immediately if the other materially breaches these terms and does not cure the breach within 15 days of notice, or becomes insolvent. On termination, Agents stop taking calls, your number is released back to you, and within 30 days you can export Customer Data. We delete Customer Data within 90 days after that, except where the law requires us to keep it.",
        ] },
        { id: "confidentiality", title: "9. Confidentiality", paragraphs: [
          "Each party will keep the other's non-public information confidential, use it only to perform this agreement, and protect it with at least reasonable care. This does not cover information that is public, already known, independently developed or lawfully received from a third party. A party may disclose confidential information when required by law, after notifying the other party where permitted. These duties last three years after the agreement ends, and indefinitely for Patient Information and trade secrets.",
        ] },
        { id: "ip", title: "10. Intellectual property", paragraphs: [
          "Optavius owns the Platform and all related intellectual property. You own Customer Data and your pathways, scripts and brand. If you send us suggestions or feedback, we may use them without obligation to you. Your name and logo may be used to identify you as a customer only with your written permission.",
        ] },
        { id: "warranties", title: "11. Warranties and disclaimers", paragraphs: [
          "We warrant that the services will be provided with reasonable skill and care, that we have the rights needed to provide the Platform, and that we maintain the security measures described in our documentation. You warrant that you have the authority to enter this agreement and the rights and consents described in sections 4 and 6.",
          "Except as stated above, the Platform is provided as is. We do not guarantee uninterrupted or error-free operation, that Agents will understand every caller, or that a particular number of Outcomes will be achieved. AI output can be inaccurate; your pathways, review and fallback are part of the service design.",
        ] },
        { id: "liability", title: "12. Limitation of liability", paragraphs: [
          "To the extent permitted by law, neither party is liable for indirect, incidental, special or consequential damages, loss of profit or loss of data, however arising. Each party's total liability under this agreement is limited to the fees paid or payable by you in the twelve months before the event that gave rise to the claim.",
          "These limits do not apply to a party's indemnification obligations, breach of confidentiality, gross negligence or wilful misconduct, or to liability that cannot be limited by law. Neither party is liable for delays caused by events beyond its reasonable control, such as carrier outages, power failures or natural disasters.",
        ] },
        { id: "indemnity", title: "13. Indemnification", paragraphs: [
          "We will defend you against claims that the Platform, used as permitted, infringes a third party's intellectual property, and pay resulting damages and costs. We may modify or replace the Platform or, if that is not reasonable, end the affected service and refund prepaid fees.",
          "You will defend us against claims arising from Customer Data, your pathways and instructions, your failure to obtain required consents or give required notices, or your use of the Platform in breach of these terms, and pay resulting damages and costs. The indemnified party must notify the other promptly, give control of the defence and cooperate reasonably.",
        ] },
        { id: "compliance", title: "14. Regulatory compliance", paragraphs: [
          "Each party will comply with the laws that apply to it, including HIPAA and the GDPR. Neither party is excluded from participating in government healthcare programmes. Our data processing agreement and business associate agreement set out the parties' obligations for Patient Information and prevail over these terms in case of conflict on that subject.",
        ] },
        { id: "law", title: "15. Governing law and disputes", paragraphs: [
          "For customers contracting with Optavius B.V., Dutch law applies and the courts of Amsterdam have exclusive jurisdiction. For customers contracting with Optavius Inc., the laws of the State of Texas apply and the state and federal courts in Harris County, Texas have exclusive jurisdiction. The parties will first try to resolve any dispute through discussion between senior representatives for 30 days. Either party may seek injunctive relief to protect confidential information or intellectual property at any time.",
        ] },
        { id: "general", title: "16. General", paragraphs: [
          "These terms, the Order Form, the data processing agreement and the business associate agreement are the entire agreement and replace prior discussions. If a provision is unenforceable, the rest remains in force. Neither party may assign the agreement without the other's consent, except to a successor in a merger or sale of the business. We may use subcontractors and remain responsible for them. The parties are independent contractors. Notices must be in writing to the addresses in the Order Form. We may update these terms; material changes take effect 30 days after we notify you, and you may terminate before then if you do not accept them.",
        ] },
        { id: "contact", title: "17. Contact", paragraphs: ["Optavius B.V., Amsterdam, the Netherlands, and Optavius Inc., Houston, Texas. Questions about these terms: legal@optavius.com."] },
      ],
    },
  },
  nl: {
    privacy: {
      title: "Privacybeleid",
      updated: "Laatst bijgewerkt: 11 september 2026",
      intro: "Optavius B.V. (\"Optavius\", \"wij\", \"ons\") hecht waarde aan de privacy van mensen die optavius.com bezoeken, de Optavius-console gebruiken, onze demolijn bellen of contact met ons opnemen. Dit beleid legt uit wat we verzamelen, hoe we het gebruiken en welke keuzes u heeft. Door onze website of diensten te gebruiken gaat u akkoord met de hier beschreven werkwijze.",
      sections: [
        { id: "scope", title: "1. Twee rollen: verwerkingsverantwoordelijke en verwerker", paragraphs: [
          "Voor deze website, de consoleaccounts van onze klanten en onze eigen marketing bepaalt Optavius hoe en waarom persoonsgegevens worden verwerkt. Wij zijn dan verwerkingsverantwoordelijke onder de AVG.",
          "Wanneer een Optavius-agent oproepen, chats of berichten voor een praktijk afhandelt, bepaalt de praktijk hoe en waarom patiëntgegevens worden verwerkt. De praktijk is verwerkingsverantwoordelijke; Optavius is verwerker op grond van een verwerkersovereenkomst en, waar HIPAA geldt, een business associate agreement. Het privacybeleid van de praktijk is op die gegevens van toepassing. Wij zijn niet verantwoordelijk voor de privacypraktijken van onze klanten.",
        ] },
        { id: "collect", title: "2. Informatie die u ons geeft", paragraphs: ["We verzamelen de informatie die u zelf verstrekt."], items: [
          "Contact- en demoaanvragen: naam, zakelijk e-mailadres, praktijknaam, specialisme, telefoonnummer en wat u in een bericht schrijft of via onze planningstool boekt.",
          "Demolijn: als u het demonummer belt, wordt het gesprek door een Optavius-agent beantwoord, opgenomen en uitgeschreven zodat u kunt horen hoe het werkt. De opname wordt binnen 30 dagen verwijderd, tenzij u vraagt om die te bewaren.",
          "Consoleaccounts: naam, e-mailadres, rol, praktijk en de instellingen die u wijzigt. De console legt vast wie wat heeft gewijzigd, zodat uw praktijk een audittrail heeft.",
          "Sollicitaties: de gegevens in uw sollicitatie en cv, inclusief wat u deelt via een dienst als LinkedIn.",
          "Correspondentie: de inhoud van e-mails en berichten die u ons stuurt, en of u onze e-mails heeft geopend of op een link heeft geklikt.",
        ] },
        { id: "auto", title: "3. Informatie die we automatisch verzamelen", paragraphs: ["Als u de website of console gebruikt, ontvangen we technische informatie van uw apparaat."], items: [
          "Apparaatinformatie: IP-adres, waaruit we een globale locatie kunnen afleiden, apparaattype, browser en besturingssysteem.",
          "Gebruiksinformatie: bekeken pagina's, de site waar u vandaan kwam, datums en tijden van bezoek en interacties met de console.",
          "Cookies en vergelijkbare technieken: zie paragraaf 7. In de EU vragen we uw toestemming voordat we analytische of marketingcookies plaatsen.",
        ] },
        { id: "patients", title: "4. Patiëntgegevens die we voor praktijken verwerken", paragraphs: [
          "Gesprekken, transcripties, afspraken, bestelstatussen en berichten die een Optavius-agent voor een praktijk afhandelt, bevatten persoonsgegevens van patiënten, waaronder gezondheidsgegevens. We verwerken deze gegevens uitsluitend volgens de schriftelijke instructies van de praktijk en alleen om de afgesproken dienst te leveren: beantwoorden, inplannen, escaleren en rapporteren.",
          "Bellers horen aan het begin van het gesprek dat ze met een AI-assistent spreken en dat het gesprek wordt opgenomen, conform het beleid van de praktijk en de wet. Opnames en transcripties worden bewaard gedurende de met de praktijk afgesproken termijn en daarna verwijderd of teruggegeven.",
          "We verkopen geen patiëntgegevens. We gebruiken geen herleidbare patiëntgegevens om algemene modellen te trainen. Als een praktijk daarmee instemt, kunnen we geanonimiseerde, geaggregeerde gegevens gebruiken om routes te verbeteren en kwaliteit te meten. Geanonimiseerde gegevens bevatten nooit namen, contactgegevens, geboortedata of andere identificerende kenmerken.",
        ] },
        { id: "use", title: "5. Hoe we informatie gebruiken", paragraphs: ["We gebruiken de informatie uit paragraaf 2 en 3 om:"], items: [
          "de website, de console en onze diensten te leveren, te onderhouden en te verbeteren;",
          "demoaanvragen te beantwoorden, afspraken in te plannen en ondersteuning te bieden;",
          "administratieve berichten te sturen, en marketingberichten waarvoor u zich op elk moment kunt afmelden;",
          "te begrijpen hoe de website en console worden gebruikt en nieuwe functies te ontwikkelen;",
          "fraude, misbruik en beveiligingsincidenten op te sporen en te voorkomen;",
          "aan wettelijke verplichtingen te voldoen, onze voorwaarden te handhaven en onze rechten en die van anderen te beschermen;",
          "geaggregeerde, geanonimiseerde statistieken te maken die niemand meer identificeren.",
        ] },
        { id: "share", title: "6. Hoe we informatie delen", paragraphs: ["We delen persoonsgegevens alleen zoals hier beschreven."], items: [
          "Dienstverleners die namens ons gegevens hosten, verzenden of verwerken: cloudhosting in de EU en VS, telefonieproviders, spraak- en taalmodelleveranciers onder contracten die trainen op uw gegevens verbieden, e-mail- en planningstools, analyse- en supportsoftware. Elk is gebonden aan een verwerkersovereenkomst.",
          "Onze klanten: informatie over gesprekken en afspraken is zichtbaar voor de praktijk waarvoor de agent werkt.",
          "Professionele adviseurs zoals advocaten, accountants en verzekeraars, onder geheimhouding.",
          "Autoriteiten, wanneer de wet, een rechterlijk bevel of een rechtmatig verzoek dat vereist, of om de veiligheid van een persoon te beschermen.",
          "Een koper of rechtsopvolger bij een fusie, overname of verkoop van activa, onder dit beleid.",
          "Anderen, met uw toestemming.",
        ] },
        { id: "cookies", title: "7. Cookies en analyse", paragraphs: [
          "De website gebruikt strikt noodzakelijke cookies om te werken. Met uw toestemming gebruiken we analytische cookies om te begrijpen hoe de site wordt gebruikt en marketingcookies om campagnes te meten. U kunt uw keuze op elk moment wijzigen via de link cookie-instellingen in de voettekst. Cookies blokkeren in uw browser kan ook, maar kan het gedrag van de console beïnvloeden.",
          "Onze analyse- en advertentiepartners kunnen cookies en vergelijkbare technieken gebruiken over diensten heen. U kunt zich afmelden voor gepersonaliseerde advertenties via uw browserinstellingen en via youronlinechoices.eu.",
        ] },
        { id: "security", title: "8. Beveiliging", paragraphs: [
          "We beschermen gegevens met versleuteling tijdens transport en in opslag, toegang op basis van rollen, tweestapsverificatie voor medewerkers, logging van toegang tot patiëntgegevens, regelmatige back-ups en onafhankelijke tests. Patiëntgegevens worden gehost in de regio van de praktijk: de EU voor Europese praktijken, de VS voor Amerikaanse praktijken.",
          "Geen enkel systeem is volledig veilig. Als we een inbreuk ontdekken die uw gegevens raakt, informeren we u en, waar vereist, de toezichthouder zonder onnodige vertraging.",
        ] },
        { id: "retention", title: "9. Bewaartermijnen", paragraphs: [
          "Contact- en demogegevens bewaren we zolang we een zakelijke relatie of een gerechtvaardigd belang hebben om contact te houden, en maximaal drie jaar na ons laatste contact. Consoleaccountgegevens bewaren we gedurende het klantcontract en verwijderen we binnen 90 dagen na afloop, tenzij de wet langer vereist. Sollicitatiegegevens verwijderen we een jaar na sluiting van een vacature, tenzij u vraagt om ze te bewaren. Patiëntgegevens bewaren we gedurende de met de praktijk afgesproken termijn.",
        ] },
        { id: "rights", title: "10. Uw rechten", paragraphs: [
          "U kunt ons vragen om inzage, correctie, verwijdering of beperking van uw persoonsgegevens, om een kopie in een overdraagbaar formaat, en u kunt bezwaar maken tegen verwerking op basis van ons gerechtvaardigd belang, waaronder direct marketing. Toestemming kunt u op elk moment intrekken. U kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens.",
          "Voor patiëntgegevens die we namens een praktijk verwerken, kunt u contact opnemen met de praktijk. Wij helpen de praktijk binnen de wettelijke termijnen te reageren.",
          "Om een recht uit te oefenen mailt u naar " + PRIVACY_EMAIL + ". We kunnen u vragen eerst uw identiteit te bevestigen.",
        ] },
        { id: "transfers", title: "11. Internationale doorgifte", paragraphs: [
          "Optavius werkt vanuit Amsterdam en Houston. Gegevens kunnen in de EU en de VS worden verwerkt. Als persoonsgegevens de EU verlaten, steunen we op het EU-VS Data Privacy Framework als de ontvanger gecertificeerd is, en anders op de standaardcontractbepalingen van de Europese Commissie met aanvullende waarborgen.",
        ] },
        { id: "children", title: "12. Kinderen", paragraphs: [
          "Onze website en console zijn bedoeld voor professionals en niet gericht op kinderen. We verzamelen via de website niet bewust persoonsgegevens van personen jonger dan 16 jaar. Patiëntgegevens van kinderen verwerken we voor praktijken volgens paragraaf 4.",
        ] },
        { id: "changes", title: "13. Wijzigingen in dit beleid", paragraphs: [
          "Wijzigingen plaatsen we op deze pagina met een nieuwe datum bovenaan. Als een wijziging wezenlijk verandert hoe we persoonsgegevens gebruiken die we al van u hebben, laten we u dat vooraf per e-mail of in de console weten.",
        ] },
        { id: "contact", title: "14. Contact", paragraphs: ["Optavius B.V., Amsterdam, en Optavius Inc., Houston, Texas. Vragen, verzoeken en klachten: " + PRIVACY_EMAIL + "."] },
      ],
    },
    terms: {
      title: "Algemene voorwaarden",
      updated: "Laatst bijgewerkt: 11 september 2026",
      intro: "Deze voorwaarden gelden voor het gebruik van het Optavius-platform en de diensten door praktijken en andere organisaties (\"Klant\", \"u\"). Ze gelden samen met elk orderformulier dat u met Optavius B.V. of Optavius Inc. (\"Optavius\", \"wij\") ondertekent. Bezoekers van de website zijn ook gebonden aan paragraaf 3.",
      sections: [
        { id: "definitions", title: "1. Definities", paragraphs: ["Begrippen met een hoofdletter hebben de volgende betekenis."], items: [
          "Platform: de Optavius-software, inclusief spraak- en digitale agents, de console, Ask Optavius, koppelingen, apps en documentatie.",
          "Agent: een ingerichte set routes, regels en koppelingen die een afgebakende taak voor de Klant uitvoert, zoals de balie beantwoorden.",
          "Orderformulier: het document met de Agents, doelen, vergoedingen en looptijd die met de Klant zijn afgesproken.",
          "Klantgegevens: alle gegevens die door of voor de Klant aan het Platform worden aangeleverd, inclusief gespreksopnames, transcripties, afspraken en patiëntinformatie.",
          "Patiëntinformatie: Klantgegevens die een patiënt identificeren, inclusief gezondheidsgegevens onder de AVG en beschermde gezondheidsinformatie onder HIPAA.",
          "Resultaat: een taak die een Agent van begin tot eind afrondt zoals omschreven in het Orderformulier, bijvoorbeeld een afgehandeld gesprek, een ingeplande afspraak of een opnieuw ingeplande no-show.",
        ] },
        { id: "services", title: "2. De diensten", paragraphs: [
          "Wij stellen het Platform beschikbaar en leveren de professionele diensten die in elk Orderformulier staan. U bent verantwoordelijk voor de apparatuur, telefoonlijnen, internettoegang en systemen van derden waarmee u het Platform gebruikt.",
          "We mogen het Platform wijzigen om het te verbeteren, mits de beveiliging of prestaties niet wezenlijk verslechteren. We bieden ondersteuning tijdens kantooruren in Nederland en de Verenigde Staten en een noodlijn voor storingen waardoor oproepen niet worden beantwoord.",
          "Alle rechten die niet uitdrukkelijk zijn verleend, blijven voorbehouden. Niets in deze voorwaarden draagt eigendom van het Platform over.",
        ] },
        { id: "use", title: "3. Accounts en toegestaan gebruik", paragraphs: [
          "U bent verantwoordelijk voor de personen aan wie u toegang tot de console geeft en voor het vertrouwelijk houden van inloggegevens. U meldt ongeautoriseerd gebruik direct.",
          "U zult het Platform niet kopiëren, wijzigen, reverse-engineeren of doorverkopen, er geen concurrerend product mee bouwen, de beveiliging niet zonder schriftelijke toestemming testen, geen schadelijke code uploaden, het niet voor onrechtmatige doelen gebruiken en er geen ongevraagde marketingoproepen of -berichten mee versturen. U gebruikt het Platform niet om beslissingen over diagnose of behandeling te nemen.",
        ] },
        { id: "customer", title: "4. Uw verantwoordelijkheden", paragraphs: ["Omdat Agents met uw patiënten spreken, gaat u akkoord met het volgende:"], items: [
          "u beoordeelt en keurt elke route, elk script en elke escalatieregel goed voordat een Agent live gaat, en houdt ze actueel;",
          "u wijst een klinisch verantwoordelijke aan die alarmsymptoomlijsten en spoedroutering goedkeurt, en een contactpersoon voor operationele vragen;",
          "u verkrijgt de toestemmingen en geeft de mededelingen die de wet vereist voor gespreksopname, geautomatiseerde oproepen en berichten en AI-gebruik, inclusief de aankondiging aan het begin van elk gesprek;",
          "u houdt uw agenda, behandelaarslijst, openingstijden en contactgegevens actueel in de gekoppelde systemen;",
          "u zorgt voor een werkende terugvaloptie zodat oproepen uw team bereiken als het Platform niet beschikbaar is;",
          "u voldoet aan de wetten die op u van toepassing zijn, waaronder de AVG, HIPAA en telemarketing- en consumentenwetgeving.",
        ] },
        { id: "safety", title: "5. Patiëntveiligheid en geen medisch advies", paragraphs: [
          "Agents stellen geen diagnose, behandelen niet en geven geen medisch advies. Ze beantwoorden vragen, plannen in, routeren en escaleren volgens de routes die u goedkeurt. Het klinisch oordeel blijft te allen tijde bij u en uw behandelaars.",
          "Agents zeggen bellers die een noodsituatie beschrijven op te hangen en het alarmnummer te bellen, en volgen uw spoedprotocol. U erkent dat geautomatiseerde systemen een beller verkeerd kunnen begrijpen en dat uw protocol en terugvaloptie de waarborg zijn. U blijft verantwoordelijk voor de zorg voor uw patiënten.",
        ] },
        { id: "data", title: "6. Klantgegevens, privacy en patiëntinformatie", paragraphs: [
          "U bent eigenaar van de Klantgegevens. U verleent ons het recht om Klantgegevens te hosten, te verwerken, te verzenden en te tonen, uitsluitend om de diensten te leveren, u te ondersteunen en de wet na te leven. Patiëntinformatie verwerken we alleen op uw instructie, onder onze verwerkersovereenkomst en, waar HIPAA geldt, onze business associate agreement, die deel uitmaken van deze voorwaarden.",
          "We verkopen geen Klantgegevens en gebruiken geen Patiëntinformatie om algemene modellen te trainen. Met uw instemming kunnen we geanonimiseerde, geaggregeerde gegevens maken om routes te verbeteren en kwaliteit te meten. Verbeteringen aan het Platform die voortkomen uit de verwerking van Klantgegevens zijn eigendom van Optavius en bevatten geen Patiëntinformatie.",
          "U zorgt ervoor dat u het recht heeft om Klantgegevens met ons te delen en dat u de mededelingen heeft gedaan die nodig zijn om ze te verwerken.",
        ] },
        { id: "fees", title: "7. Vergoedingen en betaling", paragraphs: [
          "De vergoedingen staan in het Orderformulier. De prijs van Optavius is gekoppeld aan Resultaten: het maandbedrag geldt alleen in maanden waarin de Agents de in het Orderformulier afgesproken Resultaten leveren. Er zijn geen kosten per gebruiker of per minuut, tenzij het Orderformulier anders bepaalt.",
          "We factureren maandelijks achteraf. Facturen zijn binnen 14 dagen te voldoen per kaart of automatische incasso. Bedragen zijn exclusief btw en andere belastingen, die u betaalt waar van toepassing. Over achterstallige bedragen kan wettelijke rente verschuldigd zijn, en na schriftelijke aanmaning kunnen we de diensten opschorten als een factuur 30 dagen onbetaald blijft.",
        ] },
        { id: "term", title: "8. Looptijd en beëindiging", paragraphs: [
          "De overeenkomst begint op de datum in het Orderformulier en loopt per maand, tenzij het Orderformulier een vaste looptijd noemt. Elke partij kan opzeggen tegen het einde van een maand met een opzegtermijn van 30 dagen.",
          "Elke partij kan direct beëindigen als de andere partij deze voorwaarden wezenlijk schendt en dat niet binnen 15 dagen na kennisgeving herstelt, of failliet gaat. Bij beëindiging stoppen de Agents met het aannemen van oproepen, krijgt u uw nummer terug en kunt u binnen 30 dagen de Klantgegevens exporteren. Daarna verwijderen we de Klantgegevens binnen 90 dagen, behalve waar de wet ons verplicht ze te bewaren.",
        ] },
        { id: "confidentiality", title: "9. Geheimhouding", paragraphs: [
          "Elke partij houdt de niet-openbare informatie van de ander geheim, gebruikt die alleen om deze overeenkomst uit te voeren en beschermt die met ten minste redelijke zorg. Dit geldt niet voor informatie die openbaar is, al bekend was, onafhankelijk is ontwikkeld of rechtmatig van een derde is ontvangen. Een partij mag vertrouwelijke informatie bekendmaken als de wet dat vereist, na kennisgeving aan de ander waar toegestaan. Deze verplichtingen gelden drie jaar na afloop van de overeenkomst, en onbeperkt voor Patiëntinformatie en bedrijfsgeheimen.",
        ] },
        { id: "ip", title: "10. Intellectueel eigendom", paragraphs: [
          "Optavius is eigenaar van het Platform en alle bijbehorende intellectuele eigendomsrechten. U bent eigenaar van de Klantgegevens en van uw routes, scripts en merk. Suggesties of feedback die u ons stuurt, mogen we gebruiken zonder verplichting jegens u. Uw naam en logo gebruiken we alleen met uw schriftelijke toestemming om u als klant te noemen.",
        ] },
        { id: "warranties", title: "11. Garanties en uitsluitingen", paragraphs: [
          "Wij garanderen dat de diensten met redelijke vakbekwaamheid en zorg worden geleverd, dat we de rechten hebben die nodig zijn om het Platform te leveren, en dat we de beveiligingsmaatregelen uit onze documentatie in stand houden. U garandeert dat u bevoegd bent deze overeenkomst aan te gaan en beschikt over de rechten en toestemmingen uit paragraaf 4 en 6.",
          "Behoudens het bovenstaande wordt het Platform geleverd in de staat waarin het verkeert. We garanderen geen ononderbroken of foutloze werking, niet dat Agents elke beller begrijpen, en niet dat een bepaald aantal Resultaten wordt behaald. AI-uitvoer kan onjuist zijn; uw routes, beoordeling en terugvaloptie maken deel uit van het ontwerp van de dienst.",
        ] },
        { id: "liability", title: "12. Beperking van aansprakelijkheid", paragraphs: [
          "Voor zover de wet dat toestaat, is geen van beide partijen aansprakelijk voor indirecte schade, gevolgschade, gederfde winst of verlies van gegevens, hoe ook ontstaan. De totale aansprakelijkheid van elke partij onder deze overeenkomst is beperkt tot de vergoedingen die u in de twaalf maanden vóór de schadeveroorzakende gebeurtenis heeft betaald of verschuldigd was.",
          "Deze beperkingen gelden niet voor vrijwaringsverplichtingen, schending van geheimhouding, grove nalatigheid of opzet, of voor aansprakelijkheid die wettelijk niet kan worden beperkt. Geen van beide partijen is aansprakelijk voor vertraging door omstandigheden buiten haar redelijke controle, zoals storingen bij telecomaanbieders, stroomuitval of natuurrampen.",
        ] },
        { id: "indemnity", title: "13. Vrijwaring", paragraphs: [
          "Wij verdedigen u tegen aanspraken dat het Platform, gebruikt zoals toegestaan, inbreuk maakt op intellectueel eigendom van een derde, en betalen de daaruit voortvloeiende schade en kosten. We mogen het Platform aanpassen of vervangen of, als dat niet redelijk is, de betreffende dienst beëindigen en vooruitbetaalde vergoedingen terugbetalen.",
          "U verdedigt ons tegen aanspraken die voortkomen uit Klantgegevens, uw routes en instructies, het niet verkrijgen van vereiste toestemmingen of het niet doen van vereiste mededelingen, of uw gebruik van het Platform in strijd met deze voorwaarden, en betaalt de daaruit voortvloeiende schade en kosten. De gevrijwaarde partij informeert de ander direct, laat de verdediging aan de ander over en werkt redelijk mee.",
        ] },
        { id: "compliance", title: "14. Naleving van regelgeving", paragraphs: [
          "Elke partij voldoet aan de wetten die op haar van toepassing zijn, waaronder de AVG en HIPAA. Onze verwerkersovereenkomst en business associate agreement bevatten de verplichtingen van partijen voor Patiëntinformatie en gaan bij strijdigheid op dat onderwerp vóór deze voorwaarden.",
        ] },
        { id: "law", title: "15. Toepasselijk recht en geschillen", paragraphs: [
          "Voor klanten die contracteren met Optavius B.V. geldt Nederlands recht en is de rechtbank Amsterdam exclusief bevoegd. Voor klanten die contracteren met Optavius Inc. geldt het recht van de staat Texas en zijn de rechtbanken in Harris County, Texas exclusief bevoegd. Partijen proberen een geschil eerst 30 dagen op te lossen in overleg tussen senior vertegenwoordigers. Elke partij kan op elk moment een voorlopige voorziening vragen om vertrouwelijke informatie of intellectueel eigendom te beschermen.",
        ] },
        { id: "general", title: "16. Overige bepalingen", paragraphs: [
          "Deze voorwaarden, het Orderformulier, de verwerkersovereenkomst en de business associate agreement vormen de volledige overeenkomst en vervangen eerdere afspraken. Als een bepaling niet afdwingbaar is, blijft de rest van kracht. Geen van beide partijen mag de overeenkomst overdragen zonder toestemming van de ander, behalve aan een rechtsopvolger bij een fusie of verkoop van de onderneming. We mogen onderaannemers inschakelen en blijven voor hen verantwoordelijk. Partijen zijn onafhankelijke contractspartijen. Kennisgevingen gebeuren schriftelijk aan de adressen in het Orderformulier. We mogen deze voorwaarden bijwerken; wezenlijke wijzigingen gaan 30 dagen na onze kennisgeving in, en u kunt vóór die tijd opzeggen als u ze niet accepteert.",
        ] },
        { id: "contact", title: "17. Contact", paragraphs: ["Optavius B.V., Amsterdam, en Optavius Inc., Houston, Texas. Vragen over deze voorwaarden: legal@optavius.com."] },
      ],
    },
  },
  de: {
    privacy: {
      title: "Datenschutzerklärung",
      updated: "Zuletzt aktualisiert: 11. September 2026",
      intro: "Optavius B.V. (\"Optavius\", \"wir\", \"uns\") legt Wert auf die Privatsphäre der Menschen, die optavius.com besuchen, die Optavius-Konsole nutzen, unsere Demo-Nummer anrufen oder uns kontaktieren. Diese Erklärung beschreibt, was wir erheben, wie wir es verwenden und welche Wahlmöglichkeiten Sie haben. Mit der Nutzung unserer Website oder Dienste stimmen Sie den hier beschriebenen Verfahren zu.",
      sections: [
        { id: "scope", title: "1. Zwei Rollen: Verantwortlicher und Auftragsverarbeiter", paragraphs: [
          "Für diese Website, die Konsolenkonten unserer Kunden und unser eigenes Marketing entscheidet Optavius, wie und warum personenbezogene Daten verarbeitet werden. Wir sind dann Verantwortlicher im Sinne der DSGVO.",
          "Wenn ein Optavius-Agent Anrufe, Chats oder Nachrichten für eine Praxis bearbeitet, entscheidet die Praxis, wie und warum Patientendaten verarbeitet werden. Die Praxis ist Verantwortlicher; Optavius ist Auftragsverarbeiter auf Grundlage eines Auftragsverarbeitungsvertrags und, wo HIPAA gilt, eines Business Associate Agreement. Für diese Daten gilt die Datenschutzerklärung der Praxis. Für die Datenschutzpraktiken unserer Kunden sind wir nicht verantwortlich.",
        ] },
        { id: "collect", title: "2. Informationen, die Sie uns geben", paragraphs: ["Wir erheben die Informationen, die Sie uns selbst mitteilen."], items: [
          "Kontakt- und Demoanfragen: Name, geschäftliche E-Mail-Adresse, Praxisname, Fachrichtung, Telefonnummer und alles, was Sie in einer Nachricht schreiben oder über unser Terminbuchungstool buchen.",
          "Demo-Nummer: Wenn Sie die Demo-Nummer anrufen, nimmt ein Optavius-Agent den Anruf entgegen; er wird aufgezeichnet und transkribiert, damit Sie hören können, wie es funktioniert. Die Aufzeichnung wird innerhalb von 30 Tagen gelöscht, sofern Sie nicht um Aufbewahrung bitten.",
          "Konsolenkonten: Name, E-Mail-Adresse, Rolle, Praxis und die von Ihnen geänderten Einstellungen. Die Konsole protokolliert, wer was geändert hat, damit Ihre Praxis einen Prüfpfad hat.",
          "Bewerbungen: die Angaben in Ihrer Bewerbung und Ihrem Lebenslauf, einschließlich dessen, was Sie über einen Dienst wie LinkedIn teilen.",
          "Korrespondenz: der Inhalt von E-Mails und Nachrichten, die Sie uns senden, sowie ob Sie unsere E-Mails geöffnet oder einen Link darin angeklickt haben.",
        ] },
        { id: "auto", title: "3. Automatisch erhobene Informationen", paragraphs: ["Wenn Sie die Website oder Konsole nutzen, erhalten wir technische Informationen von Ihrem Gerät."], items: [
          "Geräteinformationen: IP-Adresse, aus der sich ein ungefährer Standort ableiten lässt, Gerätetyp, Browser und Betriebssystem.",
          "Nutzungsinformationen: aufgerufene Seiten, die Website, von der Sie kamen, Datum und Uhrzeit der Besuche und Interaktionen mit der Konsole.",
          "Cookies und ähnliche Techniken: siehe Abschnitt 7. In der EU holen wir Ihre Einwilligung ein, bevor wir Analyse- oder Marketing-Cookies setzen.",
        ] },
        { id: "patients", title: "4. Patientendaten, die wir für Praxen verarbeiten", paragraphs: [
          "Anrufe, Transkripte, Termine, Bestellstatus und Nachrichten, die ein Optavius-Agent für eine Praxis bearbeitet, enthalten personenbezogene Daten von Patienten, einschließlich Gesundheitsdaten. Wir verarbeiten diese Daten ausschließlich nach den dokumentierten Weisungen der Praxis und nur, um die vereinbarte Leistung zu erbringen: beantworten, buchen, weiterleiten und berichten.",
          "Anrufer werden zu Beginn des Gesprächs darüber informiert, dass sie mit einem KI-Assistenten sprechen und dass das Gespräch aufgezeichnet wird, entsprechend den Vorgaben der Praxis und dem geltenden Recht. Aufzeichnungen und Transkripte werden für die mit der Praxis vereinbarte Frist gespeichert und danach gelöscht oder zurückgegeben.",
          "Wir verkaufen keine Patientendaten. Wir verwenden keine identifizierbaren Patientendaten, um allgemeine Modelle zu trainieren. Mit Zustimmung der Praxis können wir anonymisierte, aggregierte Daten nutzen, um Abläufe zu verbessern und Qualität zu messen. Anonymisierte Daten enthalten niemals Namen, Kontaktdaten, Geburtsdaten oder andere identifizierende Merkmale.",
        ] },
        { id: "use", title: "5. Wie wir Informationen verwenden", paragraphs: ["Wir verwenden die Informationen aus Abschnitt 2 und 3, um:"], items: [
          "die Website, die Konsole und unsere Dienste bereitzustellen, zu pflegen und zu verbessern;",
          "Demoanfragen zu beantworten, Termine zu vereinbaren und Support zu leisten;",
          "administrative Nachrichten zu senden sowie Marketingnachrichten, die Sie jederzeit abbestellen können;",
          "zu verstehen, wie Website und Konsole genutzt werden, und neue Funktionen zu entwickeln;",
          "Betrug, Missbrauch und Sicherheitsvorfälle zu erkennen und zu verhindern;",
          "gesetzliche Pflichten zu erfüllen, unsere Bedingungen durchzusetzen und unsere Rechte und die anderer zu schützen;",
          "aggregierte, anonymisierte Statistiken zu erstellen, die niemanden mehr identifizieren.",
        ] },
        { id: "share", title: "6. Wie wir Informationen weitergeben", paragraphs: ["Wir geben personenbezogene Daten nur wie hier beschrieben weiter."], items: [
          "Dienstleister, die Daten in unserem Auftrag hosten, übertragen oder verarbeiten: Cloud-Hosting in der EU und den USA, Telefonieanbieter, Sprach- und Sprachmodellanbieter unter Verträgen, die ein Training mit Ihren Daten untersagen, E-Mail- und Terminplanungstools, Analyse- und Supportsoftware. Jeder ist an einen Auftragsverarbeitungsvertrag gebunden.",
          "Unsere Kunden: Informationen zu Anrufen und Terminen sind für die Praxis sichtbar, für die der Agent arbeitet.",
          "Berufliche Berater wie Anwälte, Wirtschaftsprüfer und Versicherer, unter Vertraulichkeit.",
          "Behörden, wenn Gesetz, Gerichtsbeschluss oder ein rechtmäßiges Ersuchen dies verlangen oder um die Sicherheit einer Person zu schützen.",
          "Ein Käufer oder Rechtsnachfolger bei Fusion, Übernahme oder Verkauf von Vermögenswerten, unter dieser Erklärung.",
          "Andere, mit Ihrer Einwilligung.",
        ] },
        { id: "cookies", title: "7. Cookies und Analyse", paragraphs: [
          "Die Website verwendet unbedingt erforderliche Cookies, um zu funktionieren. Mit Ihrer Einwilligung verwenden wir Analyse-Cookies, um die Nutzung der Website zu verstehen, und Marketing-Cookies, um Kampagnen zu messen. Sie können Ihre Wahl jederzeit über den Link Cookie-Einstellungen in der Fußzeile ändern. Cookies im Browser zu blockieren ist ebenfalls möglich, kann aber das Verhalten der Konsole beeinflussen.",
          "Unsere Analyse- und Werbepartner können Cookies und ähnliche Techniken dienstübergreifend einsetzen. Personalisierte Werbung können Sie über Ihre Browsereinstellungen und über youronlinechoices.eu abwählen.",
        ] },
        { id: "security", title: "8. Sicherheit", paragraphs: [
          "Wir schützen Daten durch Verschlüsselung bei der Übertragung und im Ruhezustand, rollenbasierte Zugriffe, Zwei-Faktor-Authentifizierung für Mitarbeiter, Protokollierung des Zugriffs auf Patientendaten, regelmäßige Backups und unabhängige Tests. Patientendaten werden in der Region der Praxis gehostet: in der EU für europäische Praxen, in den USA für amerikanische Praxen.",
          "Kein System ist vollständig sicher. Wenn wir von einer Verletzung erfahren, die Ihre Daten betrifft, informieren wir Sie und, wo erforderlich, die Aufsichtsbehörde ohne unangemessene Verzögerung.",
        ] },
        { id: "retention", title: "9. Speicherdauer", paragraphs: [
          "Kontakt- und Demodaten bewahren wir auf, solange eine Geschäftsbeziehung oder ein berechtigtes Interesse am Kontakt besteht, höchstens jedoch drei Jahre nach unserem letzten Kontakt. Konsolenkontodaten bewahren wir für die Dauer des Kundenvertrags auf und löschen sie innerhalb von 90 Tagen nach dessen Ende, sofern das Gesetz nichts Längeres verlangt. Bewerbungsdaten löschen wir ein Jahr nach Schließung einer Stelle, sofern Sie nicht um Aufbewahrung bitten. Patientendaten bewahren wir für die mit der Praxis vereinbarte Frist auf.",
        ] },
        { id: "rights", title: "10. Ihre Rechte", paragraphs: [
          "Sie können von uns Auskunft, Berichtigung, Löschung oder Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie eine Kopie in einem übertragbaren Format verlangen und der Verarbeitung auf Grundlage unseres berechtigten Interesses, einschließlich Direktwerbung, widersprechen. Eine Einwilligung können Sie jederzeit widerrufen. Sie können sich außerdem bei Ihrer Aufsichtsbehörde beschweren.",
          "Bei Patientendaten, die wir im Auftrag einer Praxis verarbeiten, wenden Sie sich bitte an die Praxis. Wir unterstützen die Praxis dabei, innerhalb der gesetzlichen Fristen zu antworten.",
          "Um ein Recht auszuüben, schreiben Sie an " + PRIVACY_EMAIL + ". Wir können Sie bitten, zunächst Ihre Identität zu bestätigen.",
        ] },
        { id: "transfers", title: "11. Internationale Übermittlungen", paragraphs: [
          "Optavius arbeitet von Amsterdam und Houston aus. Daten können in der EU und in den USA verarbeitet werden. Verlassen personenbezogene Daten die EU, stützen wir uns auf das EU-US Data Privacy Framework, sofern der Empfänger zertifiziert ist, und andernfalls auf die Standardvertragsklauseln der Europäischen Kommission mit zusätzlichen Schutzmaßnahmen.",
        ] },
        { id: "children", title: "12. Kinder", paragraphs: [
          "Unsere Website und Konsole richten sich an Fachleute und nicht an Kinder. Über die Website erheben wir wissentlich keine personenbezogenen Daten von Personen unter 16 Jahren. Patientendaten von Kindern verarbeiten wir für Praxen gemäß Abschnitt 4.",
        ] },
        { id: "changes", title: "13. Änderungen dieser Erklärung", paragraphs: [
          "Änderungen veröffentlichen wir auf dieser Seite mit einem neuen Datum oben. Ändert eine Anpassung wesentlich, wie wir bereits vorhandene personenbezogene Daten von Ihnen verwenden, informieren wir Sie vorab per E-Mail oder in der Konsole.",
        ] },
        { id: "contact", title: "14. Kontakt", paragraphs: ["Optavius B.V., Amsterdam, Niederlande, und Optavius Inc., Houston, Texas. Fragen, Anträge und Beschwerden: " + PRIVACY_EMAIL + "."] },
      ],
    },
    terms: {
      title: "Allgemeine Geschäftsbedingungen",
      updated: "Zuletzt aktualisiert: 11. September 2026",
      intro: "Diese Bedingungen regeln die Nutzung der Optavius-Plattform und der Dienste durch Praxen und andere Organisationen (\"Kunde\", \"Sie\"). Sie gelten zusammen mit jedem Auftragsformular, das Sie mit Optavius B.V. oder Optavius Inc. (\"Optavius\", \"wir\") unterzeichnen. Besucher der Website sind ebenfalls an Abschnitt 3 gebunden.",
      sections: [
        { id: "definitions", title: "1. Begriffsbestimmungen", paragraphs: ["Großgeschriebene Begriffe haben folgende Bedeutung."], items: [
          "Plattform: die Optavius-Software einschließlich Sprach- und digitaler Agenten, der Konsole, Ask Optavius, Integrationen, Apps und Dokumentation.",
          "Agent: ein konfigurierter Satz von Abläufen, Regeln und Verbindungen, der eine definierte Aufgabe für den Kunden erledigt, etwa die Telefonzentrale.",
          "Auftragsformular: das Dokument, das die mit dem Kunden vereinbarten Agenten, Ziele, Vergütungen und Laufzeit beschreibt.",
          "Kundendaten: alle Daten, die vom oder für den Kunden an die Plattform übermittelt werden, einschließlich Gesprächsaufzeichnungen, Transkripten, Terminen und Patienteninformationen.",
          "Patienteninformationen: Kundendaten, die einen Patienten identifizieren, einschließlich Gesundheitsdaten nach der DSGVO und geschützter Gesundheitsinformationen nach HIPAA.",
          "Ergebnis: eine von einem Agenten vollständig erledigte Aufgabe gemäß Auftragsformular, zum Beispiel ein erledigter Anruf, ein gebuchter Termin oder ein neu gebuchter No-Show.",
        ] },
        { id: "services", title: "2. Die Leistungen", paragraphs: [
          "Wir stellen die Plattform bereit und erbringen die im jeweiligen Auftragsformular beschriebenen Dienstleistungen. Für Geräte, Telefonleitungen, Internetzugang und Drittsysteme, mit denen Sie die Plattform nutzen, sind Sie verantwortlich.",
          "Wir dürfen die Plattform ändern, um sie zu verbessern, sofern Sicherheit oder Leistung nicht wesentlich beeinträchtigt werden. Wir bieten Support während der Geschäftszeiten in den Niederlanden und den Vereinigten Staaten sowie eine Notfallnummer für Störungen, durch die Anrufe nicht beantwortet werden.",
          "Alle nicht ausdrücklich eingeräumten Rechte bleiben vorbehalten. Nichts in diesen Bedingungen überträgt Eigentum an der Plattform.",
        ] },
        { id: "use", title: "3. Konten und zulässige Nutzung", paragraphs: [
          "Sie sind verantwortlich für die Personen, denen Sie Zugang zur Konsole gewähren, und für die Vertraulichkeit der Zugangsdaten. Unbefugte Nutzung melden Sie uns unverzüglich.",
          "Sie werden die Plattform nicht kopieren, verändern, zurückentwickeln oder weiterverkaufen, kein konkurrierendes Produkt damit bauen, ihre Sicherheit nicht ohne schriftliche Erlaubnis prüfen, keinen schädlichen Code hochladen, sie nicht für rechtswidrige Zwecke nutzen und keine unerwünschten Werbeanrufe oder -nachrichten darüber versenden. Sie nutzen die Plattform nicht, um Entscheidungen über Diagnose oder Behandlung zu treffen.",
        ] },
        { id: "customer", title: "4. Ihre Pflichten", paragraphs: ["Da Agenten mit Ihren Patienten sprechen, verpflichten Sie sich:"], items: [
          "jeden Ablauf, jedes Skript und jede Eskalationsregel zu prüfen und freizugeben, bevor ein Agent live geht, und sie aktuell zu halten;",
          "eine klinisch verantwortliche Person zu benennen, die Warnsymptomlisten und Notfallweiterleitung freigibt, sowie eine Ansprechperson für operative Fragen;",
          "alle gesetzlich erforderlichen Einwilligungen einzuholen und Hinweise zu geben für Gesprächsaufzeichnung, automatisierte Anrufe und Nachrichten sowie KI-Einsatz, einschließlich der Ansage zu Beginn jedes Gesprächs;",
          "Kalender, Behandlerliste, Öffnungszeiten und Kontaktdaten in den verbundenen Systemen aktuell zu halten;",
          "eine funktionierende Rückfalloption vorzuhalten, damit Anrufe Ihr Team erreichen, wenn die Plattform nicht verfügbar ist;",
          "die für Sie geltenden Gesetze einzuhalten, einschließlich DSGVO, HIPAA sowie Telemarketing- und Verbraucherschutzrecht.",
        ] },
        { id: "safety", title: "5. Patientensicherheit und kein medizinischer Rat", paragraphs: [
          "Agenten stellen keine Diagnosen, behandeln nicht und geben keinen medizinischen Rat. Sie beantworten Fragen, buchen, leiten weiter und eskalieren nach den von Ihnen freigegebenen Abläufen. Die klinische Beurteilung liegt jederzeit bei Ihnen und Ihren Behandlern.",
          "Agenten fordern Anrufer, die einen Notfall schildern, auf, aufzulegen und die Notrufnummer zu wählen, und folgen Ihrem Protokoll für dringende Symptome. Sie erkennen an, dass automatisierte Systeme einen Anrufer missverstehen können und dass Ihr Protokoll und Ihre Rückfalloption die Absicherung sind. Sie bleiben für die Versorgung Ihrer Patienten verantwortlich.",
        ] },
        { id: "data", title: "6. Kundendaten, Datenschutz und Patienteninformationen", paragraphs: [
          "Die Kundendaten gehören Ihnen. Sie räumen uns das Recht ein, Kundendaten zu hosten, zu verarbeiten, zu übertragen und anzuzeigen, ausschließlich um die Leistungen zu erbringen, Sie zu unterstützen und das Gesetz einzuhalten. Patienteninformationen verarbeiten wir nur auf Ihre Weisung, auf Grundlage unseres Auftragsverarbeitungsvertrags und, wo HIPAA gilt, unseres Business Associate Agreement, die Bestandteil dieser Bedingungen sind.",
          "Wir verkaufen keine Kundendaten und nutzen keine Patienteninformationen, um allgemeine Modelle zu trainieren. Mit Ihrer Zustimmung können wir anonymisierte, aggregierte Daten erstellen, um Abläufe zu verbessern und Qualität zu messen. Verbesserungen der Plattform, die aus der Verarbeitung von Kundendaten entstehen, gehören Optavius und enthalten keine Patienteninformationen.",
          "Sie stellen sicher, dass Sie berechtigt sind, Kundendaten mit uns zu teilen, und dass Sie die für die Verarbeitung erforderlichen Hinweise gegeben haben.",
        ] },
        { id: "fees", title: "7. Vergütung und Zahlung", paragraphs: [
          "Die Vergütung ergibt sich aus dem Auftragsformular. Die Preise von Optavius sind an Ergebnisse gekoppelt: Der Monatsbetrag gilt nur in Monaten, in denen die Agenten die im Auftragsformular vereinbarten Ergebnisse liefern. Es fallen keine Kosten pro Nutzer oder pro Minute an, sofern das Auftragsformular nichts anderes bestimmt.",
          "Wir rechnen monatlich nachträglich ab. Rechnungen sind innerhalb von 14 Tagen per Karte oder Lastschrift fällig. Beträge verstehen sich ohne Umsatzsteuer und andere Steuern, die Sie gegebenenfalls tragen. Auf überfällige Beträge können gesetzliche Zinsen anfallen; nach schriftlicher Mahnung können wir die Leistungen aussetzen, wenn eine Rechnung 30 Tage unbezahlt bleibt.",
        ] },
        { id: "term", title: "8. Laufzeit und Kündigung", paragraphs: [
          "Der Vertrag beginnt an dem im Auftragsformular genannten Datum und läuft monatlich, sofern das Auftragsformular keine feste Laufzeit nennt. Jede Partei kann zum Monatsende mit einer Frist von 30 Tagen schriftlich kündigen.",
          "Jede Partei kann fristlos kündigen, wenn die andere diese Bedingungen wesentlich verletzt und den Verstoß nicht innerhalb von 15 Tagen nach Mitteilung behebt oder zahlungsunfähig wird. Bei Beendigung nehmen die Agenten keine Anrufe mehr an, Ihre Nummer wird an Sie zurückgegeben und Sie können innerhalb von 30 Tagen die Kundendaten exportieren. Danach löschen wir die Kundendaten innerhalb von 90 Tagen, außer wo das Gesetz eine Aufbewahrung verlangt.",
        ] },
        { id: "confidentiality", title: "9. Vertraulichkeit", paragraphs: [
          "Jede Partei behandelt die nicht öffentlichen Informationen der anderen vertraulich, nutzt sie nur zur Erfüllung dieses Vertrags und schützt sie mit mindestens angemessener Sorgfalt. Dies gilt nicht für Informationen, die öffentlich sind, bereits bekannt waren, unabhängig entwickelt oder rechtmäßig von Dritten erhalten wurden. Eine Partei darf vertrauliche Informationen offenlegen, wenn das Gesetz dies verlangt, nach Benachrichtigung der anderen Partei, soweit zulässig. Diese Pflichten gelten drei Jahre nach Vertragsende, für Patienteninformationen und Geschäftsgeheimnisse unbefristet.",
        ] },
        { id: "ip", title: "10. Geistiges Eigentum", paragraphs: [
          "Optavius ist Eigentümer der Plattform und aller damit verbundenen Rechte des geistigen Eigentums. Ihnen gehören die Kundendaten sowie Ihre Abläufe, Skripte und Ihre Marke. Vorschläge oder Feedback, die Sie uns senden, dürfen wir ohne Verpflichtung Ihnen gegenüber verwenden. Ihren Namen und Ihr Logo verwenden wir nur mit Ihrer schriftlichen Zustimmung, um Sie als Kunden zu nennen.",
        ] },
        { id: "warranties", title: "11. Gewährleistung und Haftungsausschluss", paragraphs: [
          "Wir gewährleisten, dass die Leistungen mit angemessener Fachkenntnis und Sorgfalt erbracht werden, dass wir über die zur Bereitstellung der Plattform erforderlichen Rechte verfügen und dass wir die in unserer Dokumentation beschriebenen Sicherheitsmaßnahmen aufrechterhalten. Sie gewährleisten, dass Sie befugt sind, diesen Vertrag zu schließen, und über die in Abschnitt 4 und 6 beschriebenen Rechte und Einwilligungen verfügen.",
          "Im Übrigen wird die Plattform wie besehen bereitgestellt. Wir garantieren keinen unterbrechungs- oder fehlerfreien Betrieb, nicht, dass Agenten jeden Anrufer verstehen, und nicht, dass eine bestimmte Anzahl von Ergebnissen erreicht wird. KI-Ausgaben können fehlerhaft sein; Ihre Abläufe, Prüfung und Rückfalloption sind Teil des Leistungsdesigns.",
        ] },
        { id: "liability", title: "12. Haftungsbeschränkung", paragraphs: [
          "Soweit gesetzlich zulässig, haftet keine Partei für indirekte Schäden, Folgeschäden, entgangenen Gewinn oder Datenverlust, gleich aus welchem Rechtsgrund. Die Gesamthaftung jeder Partei aus diesem Vertrag ist auf die Vergütung beschränkt, die Sie in den zwölf Monaten vor dem schadensauslösenden Ereignis gezahlt haben oder schuldeten.",
          "Diese Beschränkungen gelten nicht für Freistellungspflichten, Verletzungen der Vertraulichkeit, grobe Fahrlässigkeit oder Vorsatz oder für Haftung, die gesetzlich nicht beschränkt werden kann. Keine Partei haftet für Verzögerungen durch Umstände außerhalb ihrer angemessenen Kontrolle, etwa Störungen bei Netzbetreibern, Stromausfälle oder Naturkatastrophen.",
        ] },
        { id: "indemnity", title: "13. Freistellung", paragraphs: [
          "Wir verteidigen Sie gegen Ansprüche, dass die Plattform bei zulässiger Nutzung geistiges Eigentum Dritter verletzt, und tragen den daraus entstehenden Schaden und die Kosten. Wir dürfen die Plattform ändern oder ersetzen oder, wenn das nicht zumutbar ist, die betroffene Leistung beenden und vorausbezahlte Vergütungen erstatten.",
          "Sie verteidigen uns gegen Ansprüche, die aus Kundendaten, Ihren Abläufen und Weisungen, dem Fehlen erforderlicher Einwilligungen oder Hinweise oder einer Nutzung der Plattform entgegen diesen Bedingungen entstehen, und tragen den daraus entstehenden Schaden und die Kosten. Die freigestellte Partei informiert die andere unverzüglich, überlässt ihr die Verteidigung und wirkt angemessen mit.",
        ] },
        { id: "compliance", title: "14. Einhaltung von Vorschriften", paragraphs: [
          "Jede Partei hält die für sie geltenden Gesetze ein, einschließlich DSGVO und HIPAA. Unser Auftragsverarbeitungsvertrag und unser Business Associate Agreement regeln die Pflichten der Parteien für Patienteninformationen und gehen diesen Bedingungen bei Widersprüchen in diesem Punkt vor.",
        ] },
        { id: "law", title: "15. Anwendbares Recht und Streitigkeiten", paragraphs: [
          "Für Kunden, die mit Optavius B.V. kontrahieren, gilt niederländisches Recht; ausschließlich zuständig sind die Gerichte in Amsterdam. Für Kunden, die mit Optavius Inc. kontrahieren, gilt das Recht des Bundesstaates Texas; ausschließlich zuständig sind die staatlichen und Bundesgerichte in Harris County, Texas. Die Parteien versuchen zunächst 30 Tage lang, eine Streitigkeit im Gespräch zwischen leitenden Vertretern beizulegen. Jede Partei kann jederzeit einstweiligen Rechtsschutz zum Schutz vertraulicher Informationen oder geistigen Eigentums beantragen.",
        ] },
        { id: "general", title: "16. Sonstiges", paragraphs: [
          "Diese Bedingungen, das Auftragsformular, der Auftragsverarbeitungsvertrag und das Business Associate Agreement bilden die gesamte Vereinbarung und ersetzen frühere Absprachen. Ist eine Bestimmung nicht durchsetzbar, bleibt der Rest wirksam. Keine Partei darf den Vertrag ohne Zustimmung der anderen übertragen, außer an einen Rechtsnachfolger bei Fusion oder Verkauf des Unternehmens. Wir dürfen Unterauftragnehmer einsetzen und bleiben für sie verantwortlich. Die Parteien sind unabhängige Vertragspartner. Mitteilungen erfolgen schriftlich an die im Auftragsformular genannten Adressen. Wir dürfen diese Bedingungen aktualisieren; wesentliche Änderungen werden 30 Tage nach unserer Mitteilung wirksam, und Sie können vorher kündigen, wenn Sie sie nicht akzeptieren.",
        ] },
        { id: "contact", title: "17. Kontakt", paragraphs: ["Optavius B.V., Amsterdam, Niederlande, und Optavius Inc., Houston, Texas. Fragen zu diesen Bedingungen: legal@optavius.com."] },
      ],
    },
  },
};
