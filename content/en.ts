import type { Site, SpecialtyPage, Story } from "./types";
import { LEGAL } from "./legal";
import { BADGES, CALENDLY, CUSTOMER_LOGOS, EMAIL, INTEGRATION_LOGOS, LINKEDIN, PEOPLE, PHOTOS, SIGN_IN, TEL, TEL_DISPLAY, VIDEOS } from "./shared";

const callDemo = { label: "Call the demo line", href: TEL };
const contactSales = { label: "Contact sales", href: "/demo" };
const bookDemo = { label: "Book a demo", href: "/demo" };
const logos = CUSTOMER_LOGOS(["/customers/omc-amstelland", "/customers/north-texas-eye-specialists", "/customers/cubitts"]);

const TRUST_BADGES = [
  { src: BADGES.hipaa, alt: "HIPAA compliant" },
  { src: BADGES.soc1, alt: "SOC 1 audited controls" },
  { src: BADGES.iso27001, alt: "ISO 27001 information security" },
  { src: BADGES.gdpr, alt: "GDPR" },
  { src: BADGES.euai, alt: "EU AI Act ready" },
  { src: BADGES.fhir, alt: "FHIR compatible" },
  { src: BADGES.baa, alt: "BAA included" },
];

const trust = {
  title: "Built for healthcare accountability",
  text: "Every pathway, every decision and every escalation is documented and auditable.",
  badges: TRUST_BADGES,
};

const cta = {
  title: "See how many more calls you could answer",
  text: "We'll model recovered appointments and staff hours on your own call volume.",
  primary: bookDemo,
  secondary: callDemo,
  note: "Talk to a founder. No obligations.",
};

/* ---------- specialties ---------- */
function specialty(s: {
  slug: string; name: string; short: string; subtitle: string; description: string; media: typeof VIDEOS.ophthalmology; overlay: SpecialtyPage["hero"]["overlay"];
  cardsTitle: string; tabs: SpecialtyPage["cards"]["tabs"]; journeyTitle: string; journey: { title: string; text: string }[]; photo: string; photoAlt: string;
  quote: SpecialtyPage["quote"]; agents: SpecialtyPage["agents"]["tiles"];
}): SpecialtyPage {
  return {
    slug: s.slug,
    name: s.name,
    short: s.short,
    meta: { title: `${s.name} | Optavius`, description: s.description },
    hero: { title: s.name, subtitle: s.subtitle, media: { kind: "video", src: s.media.video, poster: s.media.poster }, overlay: s.overlay },
    logos: { title: "Handling hundreds of conversations daily at:", logos },
    cards: { title: s.cardsTitle, tabs: s.tabs },
    journey: { title: s.journeyTitle, features: s.journey, media: { kind: "image", src: s.photo, alt: s.photoAlt }, mediaSide: "right", tone: "product" },
    quote: s.quote,
    agents: { title: "Agents for " + s.short, cta: { label: "All agents", href: "/product/agents" }, tiles: s.agents },
    trust: { ...trust, title: "Built for " + s.short + " trust and privacy" },
    cta,
  };
}

const specialties: SpecialtyPage[] = [
  specialty({
    slug: "ophthalmology", name: "Ophthalmology", short: "ophthalmology",
    subtitle: "Every call answered. Every urgent symptom escalated.",
    description: "AI voice agents for ophthalmology practices. Answer every call, book the right visit and escalate red-flag symptoms by protocol.",
    media: VIDEOS.ophthalmology,
    overlay: [
      { side: "start", kind: "user", name: "Caller", text: "I've been seeing flashes in my left eye since this morning." },
      { side: "end", kind: "agent", text: "That can need same-day attention. Dr. Alvarez has an urgent slot at 2:40 PM. Shall I book it?" },
    ],
    cardsTitle: "Trusted for ophthalmology's most common calls",
    tabs: [
      { label: "Patients", cards: [
        { title: "Appointment booking", text: "Cataract evaluations, injections, follow-ups and post-op checks, booked into the right slot length." },
        { title: "Urgent symptoms", text: "Flashes, floaters, sudden vision loss and pain follow your protocol and reach on-call staff in seconds." },
        { title: "Surgery preparation", text: "Fasting instructions, drops schedules and what to bring, read from your approved scripts." },
        { title: "Prescriptions and refills", text: "Refill requests captured with the pharmacy and sent to the right clinician." },
        { title: "Referrals and insurance", text: "What a referral needs, which plans you accept and what a visit costs." },
        { title: "Directions and hours", text: "Locations, parking, opening hours and holiday schedules, answered instantly." },
      ] },
      { label: "Front desk", cards: [
        { title: "Overflow and after hours", text: "Calls ring to Optavius when the desk is busy or closed. Nothing goes to voicemail." },
        { title: "Warm transfers", text: "Complex or upset callers reach a person with the transcript and a summary." },
        { title: "Reminders and recalls", text: "Confirmations, reminders and recalls go out automatically and land in the calendar." },
        { title: "No-show recovery", text: "Missed appointments are called back within two hours and rebooked." },
        { title: "Waitlist fills", text: "A cancelled slot is offered to the waitlist until it's filled." },
        { title: "Call summaries", text: "Every call is transcribed, tagged and written to the record." },
      ] },
      { label: "Practice managers", cards: [
        { title: "One standard per location", text: "Every site sounds the same and follows the same rules." },
        { title: "Live dashboard", text: "Answer rate, bookings, escalations and handle time, per site and per day." },
        { title: "Audit trail", text: "Every decision logged, with the pathway version that produced it." },
        { title: "Clinical governance", text: "Pathways approved by your medical director before they go live." },
        { title: "EHR sync", text: "Bookings written to Eyefinity, RevolutionEHR, ModMed, Nextech or your system." },
        { title: "Multi-language", text: "English, Dutch, German and Spanish, per location." },
      ] },
    ],
    journeyTitle: "Better outcomes across the whole patient journey",
    journey: [
      { title: "Get patients to the right care faster", text: "Answer at once, recognise the reason for the call and book the right visit type with the right doctor." },
      { title: "Escalate what matters", text: "Red-flag symptoms follow the pathway your medical director approved. Never a guess." },
      { title: "Keep the surgery schedule full", text: "Recalls, reminders, no-show recovery and waitlist fills protect every slot." },
      { title: "Give the front desk its time back", text: "Routine questions are answered without staff. Complex ones arrive with context." },
      { title: "Report like a team member", text: "Every call, outcome and escalation on one dashboard." },
    ],
    photo: PHOTOS.slitlamp, photoAlt: "Ophthalmologist examining a patient at a slit lamp",
    quote: { quote: "It knows the difference between a contact lens consult and a reorder. Our front desk finally has time for the patient standing in front of them.", name: "Feike", role: "Practice manager, OMC Amstelland" },
    agents: [
      { mock: "agent-frontdesk", title: "Front desk", text: "Answers, books and reschedules, 24/7." },
      { mock: "agent-urgent", title: "Urgent triage routing", text: "Applies your red-flag pathway and transfers with a summary." },
      { mock: "agent-postop", title: "Post-op follow-up", text: "Calls every surgical patient and records structured answers." },
      { mock: "agent-noshow", title: "No-show recovery", text: "Rebooks missed visits and reports the chair time it recovered." },
    ],
  }),
  specialty({
    slug: "optometry", name: "Optometry", short: "optometry",
    subtitle: "Exams booked. Orders answered. Lenses reordered.",
    description: "AI voice agents for optometry practices and optical stores. Book exams, answer order status and reorder contact lenses by phone.",
    media: VIDEOS.optometry,
    overlay: [
      { side: "start", kind: "user", name: "Caller", text: "Are my new glasses ready to pick up?" },
      { side: "end", kind: "agent", text: "They arrived this morning, Mr. Okafor. We're open until 6 today and 9 to 1 on Saturday." },
    ],
    cardsTitle: "Trusted for optometry's most common calls",
    tabs: [
      { label: "Patients", cards: [
        { title: "Eye exam booking", text: "Routine, contact lens and children's exams, booked with the right duration and optometrist." },
        { title: "Order status", text: "Glasses, lenses and repairs. Ready or not yet, with the promise date." },
        { title: "Contact lens reorders", text: "Verifies the prescription and places the reorder to the address on file." },
        { title: "Insurance and pricing", text: "Which plans you accept, what an exam costs and what's covered." },
        { title: "Frame and lens questions", text: "Progressives, coatings, blue light and adjustments, answered in plain language." },
        { title: "Hours and locations", text: "Opening hours, parking and directions for every store." },
      ] },
      { label: "Front desk", cards: [
        { title: "Peak-hour overflow", text: "Saturday queues and lunchtime peaks no longer cost you callers." },
        { title: "Ready-for-pickup calls", text: "Patients are told the moment an order arrives, so they stop calling to ask." },
        { title: "Recalls", text: "Annual exam recalls go out and get booked without a call list." },
        { title: "Warm transfers", text: "Fittings, complaints and anything unclear reach a person with context." },
        { title: "No-show recovery", text: "Missed exams are called back and rebooked." },
        { title: "Call summaries", text: "Every conversation transcribed and written to the patient record." },
      ] },
      { label: "Store managers", cards: [
        { title: "Every store, one standard", text: "Same greeting, same rules, one dashboard for the chain." },
        { title: "Lab and order sync", text: "Order status read from your practice management system or lab export." },
        { title: "Marketing follow-up", text: "Confirmations and reminders keep exam slots full." },
        { title: "Reporting", text: "Calls answered, bookings and reorders per store, per day." },
        { title: "PMS integrations", text: "Eyefinity, RevolutionEHR, Crystal PM, Compulink and more." },
        { title: "Multi-language", text: "English, Dutch, German and Spanish, per store." },
      ] },
    ],
    journeyTitle: "From first call to happy wearer",
    journey: [
      { title: "Fill the exam schedule", text: "Answer every call, book the right exam and confirm it by text." },
      { title: "Stop the order status calls", text: "Tell patients when their glasses are ready before they ask." },
      { title: "Grow contact lens revenue", text: "Reorders placed by phone, prescription verified, shipped to the door." },
      { title: "Free the floor staff", text: "Fewer phone interruptions means more time for the customer in the store." },
      { title: "See every store at a glance", text: "One dashboard for calls, bookings and orders across locations." },
    ],
    photo: PHOTOS.shop, photoAlt: "Optician helping a customer choose frames",
    quote: { quote: "Order status calls used to fill our Saturdays. Now the phone tells people their glasses are ready before they think to ask.", name: "Tom", role: "Founder, Cubitts" },
    agents: [
      { mock: "agent-frontdesk", title: "Front desk", text: "Books exams and answers questions, 24/7." },
      { mock: "agent-orders", title: "Order status", text: "Tells callers where their glasses or lenses stand." },
      { mock: "agent-reorder", title: "Contact lens reorder", text: "Verifies the prescription and places the order." },
      { mock: "agent-recall", title: "Recall and reminders", text: "Finds every patient due for an exam and books them." },
    ],
  }),
  specialty({
    slug: "dermatology", name: "Dermatology", short: "dermatology",
    subtitle: "Shorter waits. Fuller schedules. Calmer front desks.",
    description: "AI voice agents for dermatology practices. Answer every call, book consultations and follow-ups and route urgent skin concerns by protocol.",
    media: VIDEOS.dermatology,
    overlay: [
      { side: "start", kind: "user", name: "Caller", text: "I'd like a mole check. My GP sent a referral last week." },
      { side: "end", kind: "agent", text: "I have the referral. Dr. Lindqvist has an opening Thursday at 10:20. Shall I book it?" },
    ],
    cardsTitle: "Trusted for dermatology's most common calls",
    tabs: [
      { label: "Patients", cards: [
        { title: "Consultation booking", text: "Skin checks, acne and eczema follow-ups and cosmetic consultations, booked with the right duration." },
        { title: "Urgent concerns", text: "Rapidly changing lesions, severe reactions and post-procedure problems follow your protocol." },
        { title: "Procedure preparation", text: "What to stop, what to bring and how to prepare, from your approved scripts." },
        { title: "Prescriptions and refills", text: "Refill requests captured and routed to the right clinician." },
        { title: "Referrals and insurance", text: "Referral requirements, accepted plans and visit costs." },
        { title: "Hours and locations", text: "Opening hours, directions and parking for every site." },
      ] },
      { label: "Front desk", cards: [
        { title: "Overflow and after hours", text: "Calls reach Optavius when the desk is busy or closed." },
        { title: "Warm transfers", text: "Complex callers reach staff with the transcript and a summary." },
        { title: "Reminders and recalls", text: "Annual skin checks and follow-ups booked without a call list." },
        { title: "No-show recovery", text: "Missed appointments called back within two hours." },
        { title: "Waitlist fills", text: "Cancelled slots offered to the waitlist until filled." },
        { title: "Call summaries", text: "Every call transcribed and written to the record." },
      ] },
      { label: "Practice managers", cards: [
        { title: "One standard per location", text: "Same rules and tone at every site." },
        { title: "Live dashboard", text: "Answer rate, bookings and escalations per site." },
        { title: "Audit trail", text: "Every decision logged with its pathway version." },
        { title: "Clinical governance", text: "Pathways approved by your medical lead before go-live." },
        { title: "EHR sync", text: "Bookings written to ModMed, Nextech, Epic or your system." },
        { title: "Multi-language", text: "English, Dutch, German and Spanish, per location." },
      ] },
    ],
    journeyTitle: "Better outcomes across the whole patient journey",
    journey: [
      { title: "Cut the wait to first visit", text: "Referrals read, patients called and the right slot booked." },
      { title: "Escalate what matters", text: "Urgent skin concerns follow your protocol and reach the right person." },
      { title: "Keep procedure rooms full", text: "Recalls, reminders, no-show recovery and waitlist fills." },
      { title: "Give the front desk its time back", text: "Routine questions answered without staff." },
      { title: "Report like a team member", text: "Every call and outcome on one dashboard." },
    ],
    photo: PHOTOS.examroom, photoAlt: "Modern consultation room",
    quote: { quote: "Patients tell us the phone is finally easy. Our team tells us the same.", name: "Ahmed", role: "Practice owner, North Texas Eye Specialists" },
    agents: [
      { mock: "agent-frontdesk", title: "Front desk", text: "Answers, books and reschedules, 24/7." },
      { mock: "agent-referral", title: "Referral intake", text: "Reads referrals, chases what's missing and prepares the booking." },
      { mock: "agent-recall", title: "Recall and reminders", text: "Finds every patient due for a check and books them." },
      { mock: "agent-noshow", title: "No-show recovery", text: "Rebooks missed visits and reports what it recovered." },
    ],
  }),
  specialty({
    slug: "veterinary", name: "Veterinary", short: "veterinary care",
    subtitle: "Every owner heard. Every pet booked.",
    description: "AI voice agents for veterinary clinics. Answer every call, book consultations and vaccinations and route emergencies to your team.",
    media: VIDEOS.veterinary,
    overlay: [
      { side: "start", kind: "user", name: "Caller", text: "Milo's due for his booster and he's been scratching his ear a lot." },
      { side: "end", kind: "agent", text: "Let's do both in one visit. Dr. Mensah has 4:10 PM tomorrow. Shall I book it?" },
    ],
    cardsTitle: "Trusted for veterinary's most common calls",
    tabs: [
      { label: "Owners", cards: [
        { title: "Appointment booking", text: "Consultations, vaccinations, dental and surgery follow-ups, with the right vet and duration." },
        { title: "Emergencies", text: "Poisoning, breathing trouble and trauma follow your protocol and reach the on-call vet at once." },
        { title: "Food and medication orders", text: "Repeat prescriptions and diet orders captured and confirmed." },
        { title: "Pricing and insurance", text: "What a visit costs, which insurers you work with and payment options." },
        { title: "Preparation", text: "Fasting before surgery, what to bring and how to keep a pet calm." },
        { title: "Hours and locations", text: "Opening hours, directions and parking for every clinic." },
      ] },
      { label: "Front desk", cards: [
        { title: "Overflow and after hours", text: "Evenings, weekends and busy mornings answered without voicemail." },
        { title: "Warm transfers", text: "Worried owners reach a person with the transcript and a summary." },
        { title: "Reminders and recalls", text: "Boosters, worming and annual checks booked automatically." },
        { title: "No-show recovery", text: "Missed appointments called back and rebooked." },
        { title: "Waitlist fills", text: "Cancelled slots offered to the waitlist until filled." },
        { title: "Call summaries", text: "Every call transcribed and written to the patient file." },
      ] },
      { label: "Practice managers", cards: [
        { title: "One standard per clinic", text: "Same greeting and rules across the group." },
        { title: "Live dashboard", text: "Answer rate, bookings and escalations per clinic." },
        { title: "Audit trail", text: "Every decision logged with its pathway version." },
        { title: "Clinical governance", text: "Protocols approved by your lead vet before go-live." },
        { title: "PMS sync", text: "Bookings written to your practice management system." },
        { title: "Multi-language", text: "English, Dutch, German and Spanish, per clinic." },
      ] },
    ],
    journeyTitle: "Better outcomes for pets, owners and your team",
    journey: [
      { title: "Answer every owner at once", text: "No hold music, no voicemail, even at 7 AM on a Monday." },
      { title: "Escalate real emergencies", text: "Your protocol decides what reaches the on-call vet, and how fast." },
      { title: "Keep the schedule full", text: "Recalls, reminders and no-show recovery protect every slot." },
      { title: "Free the front desk", text: "Routine questions answered without staff." },
      { title: "See every clinic at a glance", text: "One dashboard for calls and bookings across sites." },
    ],
    photo: PHOTOS.frontdesk, photoAlt: "Clinic front desk",
    quote: { quote: "Implementation was fast. We forwarded the number on a Tuesday and stopped missing calls on Thursday.", name: "Ahmed", role: "Practice owner, North Texas Eye Specialists" },
    agents: [
      { mock: "agent-frontdesk", title: "Front desk", text: "Answers, books and reschedules, 24/7." },
      { mock: "agent-urgent", title: "Emergency routing", text: "Applies your protocol and reaches the on-call vet." },
      { mock: "agent-recall", title: "Recall and reminders", text: "Boosters and checks booked without a call list." },
      { mock: "agent-noshow", title: "No-show recovery", text: "Rebooks missed visits and reports what it recovered." },
    ],
  }),
];

/* ---------- customer stories ---------- */
const stories: Story[] = [
  {
    slug: "omc-amstelland",
    meta: { title: "OMC Amstelland | Optavius", description: "How OMC Amstelland went from 30% missed calls to none in the first month." },
    customer: "OMC Amstelland", logo: logos[0].src, logoAlt: "OMC Amstelland",
    title: "From 30% missed calls to none, in the first month.",
    hero: { image: PHOTOS.storyOmc, alt: "Eye clinic front desk" },
    stats: [{ value: "0%", label: "Calls unanswered" }, { value: ">60%", label: "Resolved without staff" }, { value: "+23%", label: "Appointments booked" }],
    industry: "Ophthalmology",
    body: [
      { type: "h2", text: "Two locations, one shared line." },
      { type: "p", text: "OMC Amstelland is an eye clinic in Diemen, near Amsterdam, with two locations and one shared phone line. The front desk also checks patients in. At peak times and after 5 PM, a third of calls went unanswered, and half of the people who reached voicemail never called back." },
      { type: "p", text: "The clinic forwarded its existing number to Optavius. Booking, rescheduling, order status and store information were configured in the first week, together with a red-flag pathway approved by the medical director. Optavius was live in under two weeks." },
      { type: "media", media: { kind: "mock", name: "story-omc" } },
      { type: "h2", text: "What changed." },
      { type: "p", text: "Every call is now answered on the first ring, even fifty at once. More than six in ten calls are completed end to end without staff: information, order status and bookings. Urgent symptoms reach the on-call ophthalmologist in seconds, with a summary." },
      { type: "p", text: "The numbers come from 8,420 incoming calls during May and June 2026. Callers who used to hang up now book, and after-hours callers book too. Appointments booked rose by 23 percent, and the front desk got back around 170 hours a month." },
      { type: "quote", quote: "It knows the difference between a contact lens consult and a reorder. Our front desk finally has time for the patient standing in front of them.", name: "Feike", role: "Practice manager, OMC Amstelland" },
    ],
    card: { image: PHOTOS.frontdesk, alt: "Eye clinic front desk", stat: { value: "0%", label: "Calls unanswered" } },
  },
  {
    slug: "north-texas-eye-specialists",
    meta: { title: "North Texas Eye Specialists | Optavius", description: "How a Texas ophthalmology group stopped losing after-hours callers." },
    customer: "North Texas Eye Specialists", logo: logos[1].src, logoAlt: "North Texas Eye Specialists",
    title: "Answering every after-hours call across a multi-location group.",
    hero: { image: VIDEOS.ophthalmology.poster, alt: "Ophthalmology exam" },
    stats: [{ value: "24/7", label: "Call coverage" }, { value: "2 sec", label: "Average response time" }, { value: "48 h", label: "Time to go live" }],
    industry: "Ophthalmology",
    body: [
      { type: "h2", text: "A group that grew faster than its phone system." },
      { type: "p", text: "North Texas Eye Specialists runs several ophthalmology locations across the Dallas area. Each site had its own line, its own greeting and its own gaps. After 5 PM and on weekends, calls went to an answering service that only took messages." },
      { type: "p", text: "Optavius now answers every location with one standard. It books cataract evaluations, follow-ups and injections into the right slot, reads the group's urgent-symptom protocol and warm-transfers to the on-call doctor with a summary." },
      { type: "media", media: { kind: "mock", name: "story-ntx" } },
      { type: "h2", text: "Live in 48 hours." },
      { type: "p", text: "The group forwarded its numbers on a Tuesday. Optavius was configured with the providers, schedules and pathways the same day and went live on Thursday. EHR integration followed later, without interrupting the phones." },
      { type: "quote", quote: "Patients tell us the phone is finally easy. Our team tells us the same.", name: "Ahmed", role: "Practice owner, North Texas Eye Specialists" },
    ],
    card: { image: PHOTOS.slitlamp, alt: "Slit lamp examination", stat: { value: "24/7", label: "Call coverage" } },
  },
  {
    slug: "cubitts",
    meta: { title: "Cubitts | Optavius", description: "How Cubitts took order status and reorder calls off the shop floor." },
    customer: "Cubitts", logo: logos[2].src, logoAlt: "Cubitts",
    title: "Order status and reorders, handled before the shop opens.",
    hero: { image: PHOTOS.storyCubitts, alt: "Eyewear store" },
    stats: [{ value: ">60%", label: "Calls resolved without staff" }, { value: "≈170 h", label: "Staff hours saved per month" }],
    industry: "Optometry",
    body: [
      { type: "h2", text: "Beautiful stores, busy phones." },
      { type: "p", text: "Cubitts designs and makes spectacles in London and sells them in its own stores. Most calls were about the same three things: is my order ready, can I reorder my lenses and when are you open. Every one of them pulled an optician away from a customer in the shop." },
      { type: "p", text: "Optavius answers those calls from the order system and the store schedule. Ready-for-pickup calls go out the moment an order arrives, so customers stop calling to ask. Reorders are verified against the prescription and placed to the address on file." },
      { type: "media", media: { kind: "mock", name: "story-cubitts" } },
      { type: "h2", text: "What the floor staff noticed." },
      { type: "p", text: "Fewer interruptions, and calmer Saturdays. Anything the agent can't answer, such as a fitting problem or a complaint, reaches a person with the transcript attached." },
      { type: "quote", quote: "Order status calls used to fill our Saturdays. Now the phone tells people their glasses are ready before they think to ask.", name: "Tom", role: "Founder, Cubitts" },
    ],
    card: { image: PHOTOS.shop, alt: "Customer trying on frames", stat: { value: ">60%", label: "Resolved without staff" } },
  },
];

/* ---------- product pages ---------- */
const related = (exclude: string) =>
  [
    { key: "console", title: "Console", text: "Your day, already sorted. The morning brief, what needs you and every call in one place.", href: "/product/console", mock: "briefing", zoom: 1.1, linkLabel: "Discover more" },
    { key: "ask", title: "Ask Optavius", text: "Connect your systems and ask anything about your own practice. Free for 90 days.", href: "/product/ask-optavius", mock: "insights-query", linkLabel: "Discover more" },
    { key: "agents", title: "Agents", text: "One job, one price, one dashboard. Start with the front desk and add the next agent in a click.", href: "/product/agents", mock: "agent-frontdesk", linkLabel: "Discover more" },
    { key: "integrations", title: "Integrations", text: "Works with your phone system, calendar and EHR. Start standalone, connect when ready.", href: "/product/integrations", mock: "hz-context", linkLabel: "Discover more" },
  ].filter((c) => c.key !== exclude);

const en: Site = {
  lang: "en",
  meta: {
    name: "Optavius",
    titleSuffix: " | Optavius",
    description: "AI voice agents for eye care and specialty practices. Every patient call answered, every appointment booked, 24/7.",
    tel: TEL, telDisplay: TEL_DISPLAY, email: EMAIL, calendly: CALENDLY, linkedin: LINKEDIN, signIn: SIGN_IN,
  },
  ui: {
    nav: {
      product: "Product", specialties: "Specialties", customers: "Customers", company: "Company", signIn: "Sign in", cta: bookDemo,
      productOverview: { title: "Product overview", text: "AI voice agents that answer, book and follow up, in one console.", button: "Meet Optavius" },
      productGroups: [
        { label: "Operate", items: [
          { label: "Console", text: "Your day, already sorted.", href: "/product/console" },
          { label: "Ask Optavius", text: "Free answers over your own practice data.", href: "/product/ask-optavius" },
        ] },
        { label: "Grow", items: [
          { label: "Agents", text: "Front desk, recall, order status and more.", href: "/product/agents" },
          { label: "Integrations", text: "Phone system, calendar and EHR.", href: "/product/integrations" },
        ] },
        { label: "Plans", items: [
          { label: "Pricing", text: "Simple monthly plans. No contracts.", href: "/pricing" },
        ] },
      ],
      specialtyItems: [
        { label: "Ophthalmology", text: "Every call answered, every urgent symptom escalated.", href: "/specialties/ophthalmology" },
        { label: "Optometry", text: "Exams booked, orders answered, lenses reordered.", href: "/specialties/optometry" },
        { label: "Dermatology", text: "Shorter waits and fuller schedules.", href: "/specialties/dermatology" },
        { label: "Veterinary", text: "Every owner heard, every pet booked.", href: "/specialties/veterinary" },
      ],
      companyItems: [
        { label: "About", text: "Who builds Optavius, and why.", href: "/about" },
        { label: "Careers", text: "Help specialty care answer every call.", href: "/careers" },
        { label: "Resources", text: "Guides, comparisons and customer stories.", href: "/resources" },
        { label: "Book a demo", text: "Pick a time with a founder.", href: "/demo" },
      ],
      language: "Language", menu: "Menu", close: "Close",
    },
    footer: {
      tagline: "AI voice agents for specialty care. Your clinic, running. Even when you aren't.",
      groups: [
        { title: "Product", items: [
          { label: "Product overview", href: "/product" }, { label: "Console", href: "/product/console" }, { label: "Ask Optavius", href: "/product/ask-optavius" }, { label: "Agents", href: "/product/agents" }, { label: "Integrations", href: "/product/integrations" }, { label: "Pricing", href: "/pricing" },
        ] },
        { title: "Specialties", items: [
          { label: "All specialties", href: "/specialties" }, { label: "Ophthalmology", href: "/specialties/ophthalmology" }, { label: "Optometry", href: "/specialties/optometry" }, { label: "Dermatology", href: "/specialties/dermatology" }, { label: "Veterinary", href: "/specialties/veterinary" },
        ] },
        { title: "Customers", items: [{ label: "Customer stories", href: "/customers" }, { label: "OMC Amstelland", href: "/customers/omc-amstelland" }, { label: "North Texas Eye Specialists", href: "/customers/north-texas-eye-specialists" }, { label: "Cubitts", href: "/customers/cubitts" }] },
        { title: "Company", items: [{ label: "About", href: "/about" }, { label: "Resources", href: "/resources" }, { label: "Careers", href: "/careers" }, { label: "Book a demo", href: "/demo" }, { label: "Sign in", href: SIGN_IN, external: true }] },
      ],
      legal: [{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms & Conditions", href: "/terms" }],
      copyright: "© 2026 Optavius",
    },
    common: {
      bookDemo: "Book a demo", callDemo: "Call the demo line", demoNote: "Talk to a founder. No obligations.", learnMore: "Learn more", readStory: "Read the story", readMore: "Read more", discoverMore: "Discover more", fullStory: "Full story", getStarted: "Get started", contactSales: "Contact sales", mostPopular: "Most popular", perMonth: "/month", playVideo: "Play video", pauseVideo: "Pause video", customerStories: "Customer stories", allSpecialties: "All specialties", openRoles: "Open roles", search: "Search", skip: "Skip to main content",
    },
  },

  home: {
    meta: { title: "AI voice agents for eye care | Optavius", description: "AI voice agents for eye-care providers that answer questions, schedule appointments and handle routine requests, 24/7." },
    hero: {
      title: "Every patient call answered.\nEvery opportunity captured.",
      subtitle: "AI voice agents for eye-care providers that answer questions, schedule appointments and handle routine requests, 24/7.",
      primary: bookDemo, secondary: callDemo, note: "Talk to a founder. No obligations.",
      slides: [
        { ...VIDEOS.fold1, bubbles: [
          { side: "end", kind: "agent", text: "Thank you for calling Westside Eye Care. This is Optavius. How can I help?" },
          { side: "start", kind: "user", name: "Sarah", text: "I've been seeing flashes of light in my left eye since this morning." },
          { side: "end", kind: "agent", text: "That can need same-day attention. Dr. Alvarez has an urgent slot today at 2:40 PM. Shall I book it?" },
          { side: "start", kind: "user", name: "Sarah", text: "Yes, please." },
          { side: "end", kind: "agent", text: "Done. You're booked for 2:40 today. I've sent a confirmation by text." },
        ] },
        { ...VIDEOS.fold2, bubbles: [
          { side: "end", kind: "agent", text: "Thanks for calling Cubitts. This is Optavius. How can I help?" },
          { side: "start", kind: "user", name: "Daniel", text: "I ordered new glasses two weeks ago. Are they ready?" },
          { side: "end", kind: "agent", text: "Let me check. Can I have your date of birth?" },
          { side: "start", kind: "user", name: "Daniel", text: "Third of March, 1981." },
          { side: "end", kind: "agent", text: "They arrived this morning, Mr. Okafor. We're open until 6 today and 9 to 1 on Saturday." },
        ] },
        { ...VIDEOS.fold3, bubbles: [
          { side: "end", kind: "agent", text: "OMC Amstelland, this is Optavius. How can I help?" },
          { side: "start", kind: "user", name: "Lena", text: "I need to reorder my contact lenses." },
          { side: "end", kind: "agent", text: "I see a valid prescription for Acuvue Oasys, minus 2.75 right and minus 3.00 left. Same again?" },
          { side: "start", kind: "user", name: "Lena", text: "Yes, same as last time." },
          { side: "end", kind: "agent", text: "Your reorder is placed and ships to the address on file. Anything else?" },
        ] },
      ],
    },
    logos: { title: "Handling hundreds of conversations daily at:", logos },
    demo: {
      title: "Hear Optavius take a real call",
      lede: "Press play, or call the demo line and try it yourself.",
      sampleLabel: "Sample call · rebooking an eye exam",
      duration: "0:47", play: "Play the sample call", stop: "Stop", hint: "The transcript follows the call.",
      call: callDemo, note: "It's Optavius that answers.",
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
      title: "Your clinic, running.\nEven when you aren't.",
      lede: "Optavius answers, books and follows up, so your team can focus on the patient in front of them.",
      cards: [
        { id: "green", title: "Turn every call into a booked visit", body: "Answer every call, day and night, and book straight into your calendar.", sr: "Animation showing calls from different eye-care practices being answered and booked." },
        { id: "blue", title: "Give every team its time back", body: "Front desk, clinicians and managers stop working the phone and start working with patients.", sr: "Animation showing an exam slot being picked and a contact lens reorder being placed." },
        { id: "pink", title: "One agent across every channel", body: "Voice first, with web chat, email, SMS and WhatsApp under the same rules.", sr: "Animation showing one conversation moving across voice, chat, email and SMS." },
        { id: "orange", title: "Pay for a job well done", body: "Simple monthly plans. No contracts. Cancel anytime.", sr: "Animation showing ratings and a completed outcome." },
      ],
    },
    console: { title: "Meet the console", lede: "Every call, booking and escalation in one place. Ask anything in plain language." },
    proof: {
      title: "What changed when Optavius took the phones",
      lede: "Measured at Cubitts, before and after Optavius took the phones.",
      outcomes: [
        { after: "+23%", label: "More appointments booked", text: "After-hours callers and callers who used to hang up now book." },
        { after: "≈170 h", label: "Staff hours saved per month", text: "2,526 calls a month resolved without staff, at four minutes each." },
        { before: "4 min", after: "2 sec", label: "Average response time", text: "From four minutes on hold at peak times to an answer on the first ring." },
        { before: "0%", after: ">60%", label: "Resolved without staff", text: "More than six in ten calls are completed end to end: information, order status, bookings." },
        { before: "50%", after: "0%", label: "Missed callers never heard again", text: "Half the people who reached voicemail never called back. There is no voicemail anymore." },
        { before: "30%", after: "0%", label: "Calls never answered", text: "Nearly a third of calls went unanswered. Now every call is picked up, even 50 at once." },
      ],
      source: "Results from 8,420 incoming calls during May and June 2026 at Cubitts.",
    },
    agents: {
      title: "Meet the agents",
      lede: "Each one does a job, end to end, and reports to you every day.",
      cta: { label: "All agents", href: "/product/agents" },
      tiles: [
        { mock: "agent-frontdesk", title: "Front desk", text: "Answers every call, books, reschedules and cancels, 24/7." },
        { mock: "agent-orders", title: "Order status", text: "Tells callers where their glasses, lenses or order stand." },
        { mock: "agent-recall", title: "Recall and reminders", text: "Finds every patient due for a check-up and books them." },
        { mock: "agent-noshow", title: "No-show recovery", text: "Calls every no-show within two hours and rebooks." },
      ],
    },
    live: {
      title: "Live in 48 hours. Not 48 days.",
      lede: "Nothing to install, nothing to replace. Optavius works standalone from day one.",
      steps: [
        { mock: "hz-proactive", title: "Forward your number", text: "Calls are routed to Optavius: all of them, overflow or after hours. Your number stays the same." },
        { mock: "journeys", title: "We set up your pathways", text: "Providers, schedules, rules and red-flag protocols, configured with your team. You approve every response." },
        { mock: "ins-observability", title: "Go live", text: "Watch the first calls in your dashboard. Connect your EHR when you're ready." },
      ],
    },
    quotes: {
      title: "The results speak for themselves",
      lede: "Practices that answer every call, in their own words.",
      items: [
        { quote: "It knows the difference between a contact lens consult and a reorder. Our front desk finally has time for the patient standing in front of them.", name: "Feike", role: "Practice manager, OMC Amstelland", logo: logos[0].src, logoAlt: "OMC Amstelland", ...PEOPLE.feike, href: "/customers/omc-amstelland" },
        { quote: "Patients tell us the phone is finally easy. Our team tells us the same.", name: "Ahmed", role: "Practice owner, North Texas Eye Specialists", logo: logos[1].src, logoAlt: "North Texas Eye Specialists", ...PEOPLE.ahmed, href: "/customers/north-texas-eye-specialists" },
        { quote: "Order status calls used to fill our Saturdays. Now the phone tells people their glasses are ready before they think to ask.", name: "Tom", role: "Founder, Cubitts", logo: logos[2].src, logoAlt: "Cubitts", ...PEOPLE.tom, href: "/customers/cubitts" },
      ],
    },
    trust: { title: "Trust and reliability", text: "Optavius is built for healthcare accountability. Every pathway, decision and escalation is documented and auditable.", badges: TRUST_BADGES },
    cta,
  },

  product: {
    meta: { title: "Product overview | Optavius", description: "AI voice agents that answer every call, book appointments and escalate what matters. Voice first, with every channel in one console." },
    hero: {
      title: "Meet Optavius",
      subtitle: "The voice agent that speaks eye care, answers on the first ring and never keeps a patient waiting",
      media: { kind: "video", src: VIDEOS.product.video, poster: VIDEOS.product.poster },
      overlay: [
        { side: "start", kind: "user", name: "Caller", text: "Can I move my eye exam to Thursday?" },
        { side: "end", kind: "agent", text: "Done. Thursday 9:40 with Dr. Okafor. Bring your current glasses." },
      ],
      cta: { label: "Hear a sample call", href: "/#demo" },
    },
    sections: [
      { key: "voice", title: "Your voice agent", lede: "Natural conversation, not a phone menu. It listens, understands the request and completes the task.", mediaSide: "right", media: { kind: "mock", name: "agent-frontdesk" }, features: [
        { icon: "phone", title: "Answers every call, 24/7", text: "One caller or fifty at once. Day, night and weekend, with no hold time and no voicemail." },
        { icon: "calendar", title: "Books straight into your calendar", text: "The right exam type, the right provider, the right slot length, confirmed by text." },
        { icon: "shield", title: "Escalates what matters", text: "Flashes, floaters, sudden vision loss: your protocol decides, and on-call staff get a summary in seconds." },
      ] },
      { key: "eyecare", title: "The only voice agent purpose-built for eye care", lede: "Built exclusively for optometry and ophthalmology first, now also for dermatology and veterinary care. Trained on more than 10,000 eye-care terms.", mediaSide: "left", media: { kind: "mock", name: "eye" }, features: [
        { icon: "eye", title: "Speaks your specialty", text: "Knows a cataract evaluation from a contact lens fitting, and books each one correctly." },
        { icon: "checklist", title: "Follows your pathways", text: "Red-flag lists, scheduling rules and scripts approved by your clinical lead." },
        { icon: "reverse", title: "Learns from every correction", text: "Mark any call as wrong in one click. The fix is tested before it goes live." },
      ] },
      { key: "channels", title: "One agent across every channel", lede: "Voice first. Web chat, email, SMS and WhatsApp follow the same rules and the same oversight.", mediaSide: "right", media: { kind: "mock", name: "channels-hero" }, features: [
        { icon: "phone", title: "Voice", text: "Inbound and outbound calls on your existing number." },
        { icon: "chat", title: "Web chat and email", text: "Questions from your website and shared inbox, answered from the same scripts." },
        { icon: "sms", title: "SMS and WhatsApp", text: "Confirmations, reminders and booking links where patients already are." },
      ] },
      { key: "trust", title: "Trust and safety", lede: "Every agent is checked. Every decision that matters is yours.", mediaSide: "left", media: { kind: "mock", name: "ins-observability" }, features: [
        { icon: "eye", title: "The Reviewer", text: "A supervising agent scores sampled conversations on accuracy, tone and your rules. You see the scores." },
        { icon: "user", title: "Human handoff", text: "Clinical questions, urgent symptoms, complaints and doubt go to your team with the transcript." },
        { icon: "lock", title: "Full audit trail", text: "Every call, message and booking logged and sourced. HIPAA, GDPR, EU data residency." },
      ] },
    ],
    quote: { logo: logos[0].src, logoAlt: "OMC Amstelland", quote: "It knows the difference between a contact lens consult and a reorder. Our front desk finally has time for the patient standing in front of them.", name: "Feike", role: "Practice manager, OMC Amstelland", link: { label: "Full story", href: "/customers/omc-amstelland" } },
    trust,
    pricingTeaser: { title: "Pricing that follows results", text: "Starting from $299 a month. No setup fees, no contracts. If Optavius delivers no results, you pay nothing.", link: { label: "See pricing", href: "/pricing" }, mock: "pricing-card" },
    related: { title: "Explore the platform", cards: related("") },
    cta,
  },

  consolePage: {
    meta: { title: "Console | Optavius", description: "The Optavius console: the morning brief, what needs you, every call and booking, and a command bar that understands plain language." },
    hero: { title: "Console", subtitle: "Your day, already sorted", media: { kind: "mock", name: "dashboard-full" } },
    sections: [
      { key: "today", title: "Start with the brief", lede: "The console opens on what happened overnight and what needs you today. No typing required.", mediaSide: "right", media: { kind: "mock", name: "briefing", zoom: 1.15 }, features: [
        { icon: "sun", title: "Morning brief", text: "Calls answered, bookings made, escalations and anything unusual, written for you each morning." },
        { icon: "inbox", title: "Needs you", text: "Approvals, transfers and flagged calls in one queue, with full context attached." },
        { icon: "status", title: "Agent status", text: "Every agent's work count and state in the left rail, per location." },
      ] },
      { key: "dashboards", title: "Dashboards that read like a team member's report", lede: "Click an agent and see its work: answer rate, bookings, handle time, escalations and quality scores.", mediaSide: "left", media: { kind: "mock", name: "reporting", zoom: 1.15 }, features: [
        { icon: "chart", title: "Outcomes, not sends", text: "Bookings made, slots recovered and call hours absorbed, next to what the agent costs." },
        { icon: "eye", title: "Reviewer panel", text: "Sampled-call pass rate and flagged runs, visible on every dashboard." },
        { icon: "pause", title: "Pause in one click", text: "Any agent, any location, any time." },
      ] },
      { key: "command", title: "Run the day from one bar", lede: "One bar at the bottom of every screen. Pause an agent, change a rule or approve a transfer in a sentence, in English, Dutch or German.", mediaSide: "right", media: { kind: "mock", name: "insights-query", zoom: 1.15 }, features: [
        { icon: "search", title: "Sourced answers", text: "Every answer cites the system and sync time it came from." },
        { icon: "undo", title: "Actions with an audit line", text: "Every change carries a reference and, where possible, an undo." },
        { icon: "phone", title: "On your phone too", text: "The same console as an app, with push for approvals and the brief." },
      ] },
    ],
    quote: { logo: logos[1].src, logoAlt: "North Texas Eye Specialists", quote: "Patients tell us the phone is finally easy. Our team tells us the same.", name: "Ahmed", role: "Practice owner, North Texas Eye Specialists", link: { label: "Full story", href: "/customers/north-texas-eye-specialists" } },
    related: { title: "Related products", cards: related("console") },
    cta,
  },

  askOptavius: {
    meta: { title: "Ask Optavius | Optavius", description: "Connect your calendar, call log and documents, then ask anything about your own practice. Free for 90 days, included with every live agent." },
    hero: { title: "Ask Optavius", subtitle: "Free answers over your own practice data", media: { kind: "video", src: VIDEOS.insights.video, poster: VIDEOS.insights.poster } },
    sections: [
      { key: "connect", title: "Connect, then ask", lede: "Read-only access to your calendar, call log and document mailbox. Unlimited users. Free for 90 days.", mediaSide: "right", media: { kind: "mock", name: "explorer-table", zoom: 1.15 }, features: [
        { icon: "plug", title: "Standard connectors", text: "Calendar, phone system, PMS export and referral mailbox, connected in a day." },
        { icon: "search", title: "Ask anything", text: "No-shows per location, unanswered calls last week, referral backlog, revenue booked next month." },
        { icon: "doc", title: "Answers with sources", text: "Prose plus tables, with the system and sync time behind every number." },
      ] },
      { key: "baseline", title: "Your baseline, in your own numbers", lede: "Week one produces a standing report on the six numbers you already report upward.", mediaSide: "left", media: { kind: "mock", name: "briefing", zoom: 1.15 }, features: [
        { icon: "chart", title: "Six access metrics", text: "Speed of answer, abandonment rate, scheduling accuracy, calls per front-desk FTE, after-hours volume and slot utilisation." },
        { icon: "trend", title: "Plus what you're losing", text: "Recovered slots and referral backlog, so the case for the first agent is your own data." },
        { icon: "reverse", title: "Re-reported monthly", text: "The delta is always your number, not ours." },
      ] },
      { key: "next", title: "The wedge for the next agent", lede: "When the free layer shows what you're missing, hire the agent that fixes it. Included with every live agent after the trial.", mediaSide: "right", media: { kind: "mock", name: "recommendations", zoom: 1.15 }, features: [
        { icon: "sparkles", title: "Insights that point somewhere", text: "Every finding links to the agent that would change it." },
        { icon: "lock", title: "Read-only by design", text: "The free layer never writes to your systems." },
        { icon: "calendar", title: "An end date on every trial", text: "90 days, then included with any live agent. No surprises." },
      ] },
    ],
    related: { title: "Related products", cards: related("ask") },
    cta: { ...cta, title: "Connect your data this week", text: "Free for 90 days. See your own baseline before you decide anything.", primary: { label: "Start free", href: "/demo" } },
  },

  agentsPage: {
    meta: { title: "Agents | Optavius", description: "Hire AI agents for the front desk, order status, recall, no-show recovery and more. One job, one price, one dashboard." },
    hero: { title: "Agents", subtitle: "Hired like staff. Proven before trusted.", media: { kind: "mock", name: "agent-studio-hero" } },
    sections: [
      { key: "hire", title: "Hire an agent in a click", lede: "Start with one. Add the next in a click. Switch any of them off whenever you want.", mediaSide: "right", media: { kind: "mock", name: "simulations", zoom: 1.15 }, features: [
        { icon: "chat", title: "Conversational setup", text: "The agent proposes rules from your practice data. You amend them in plain language and approve." },
        { icon: "eye", title: "Shadow mode", text: "A week on real calls without acting. You see everything it would have done, scored by the Reviewer." },
        { icon: "check", title: "Sign-off, then live", text: "Billing starts the day you flip the switch. Not before." },
      ] },
      { key: "journeys", title: "Agents that finish the job", lede: "Referral in, patient booked, forms complete, no-show recovered. Each agent owns one outcome end to end.", mediaSide: "left", media: { kind: "mock", name: "hz-optimization" }, features: [
        { icon: "flag", title: "Referral to care", text: "Reads the referral, chases what's missing, calls the patient and books the right visit." },
        { icon: "calendar", title: "Recall and reminders", text: "Finds every patient due, calls until booked and cuts no-shows before they happen." },
        { icon: "reverse", title: "No-show recovery and waitlist", text: "Calls within two hours, rebooks, and fills cancelled slots from the waitlist." },
      ] },
    ],
    library: {
      title: "The agent library",
      lede: "Every agent has one job. Start with one, add the next in a click.",
      classes: { voice: "Voice", digital: "Digital" },
      items: [
        { name: "Front desk", job: "Answers routine questions 24/7 from your approved scripts and routes urgent symptoms by protocol.", cls: "voice", from: "Included in every plan" },
        { name: "Booking, reschedule and cancel", job: "Books, moves and cancels appointments on every call, straight into your calendar.", cls: "voice", from: "Included in every plan" },
        { name: "Order status", job: "Tells callers where their glasses, lenses or order stands, without a queue.", cls: "voice", from: "Professional plan" },
        { name: "Recall and reminders", job: "Finds every patient due for a check-up and calls until they're booked.", cls: "voice", from: "Professional plan" },
        { name: "No-show recovery", job: "Calls every no-show within two hours and rebooks into the first suitable slot.", cls: "voice", from: "Professional plan" },
        { name: "Waitlist auto-fill", job: "When a slot opens, works down your waitlist until it's filled.", cls: "voice", from: "Professional plan" },
        { name: "Referral intake", job: "Reads every referral, checks completeness and chases what's missing.", cls: "digital", from: "Professional plan" },
        { name: "Intake and forms", job: "Sends forms and preparation instructions and confirms the patient is ready.", cls: "digital", from: "Professional plan" },
        { name: "Web chat and email", job: "Answers questions from your website and inbox with the same rules as the phone.", cls: "digital", from: "Professional plan" },
        { name: "Post-op follow-up", job: "Calls every surgical patient, asks your questions and flags red flags to your team.", cls: "voice", from: "Enterprise" },
        { name: "Order review", job: "Checks eyewear orders for prescription and wearer consistency before they reach the lab.", cls: "digital", from: "Enterprise" },
        { name: "Patient billing", job: "Answers invoice questions and sends payment links. Disputes go to your team.", cls: "digital", from: "Enterprise" },
      ],
    },
    quote: { logo: logos[2].src, logoAlt: "Cubitts", quote: "Order status calls used to fill our Saturdays. Now the phone tells people their glasses are ready before they think to ask.", name: "Tom", role: "Founder, Cubitts", link: { label: "Full story", href: "/customers/cubitts" } },
    related: { title: "Related products", cards: related("agents") },
    cta,
  },

  integrations: {
    meta: { title: "Integrations | Optavius", description: "Optavius works with your phone system, calendar, practice management system and EHR. Start standalone, connect when ready." },
    hero: { title: "Integrations", subtitle: "Works with the systems you already use", media: { kind: "mock", name: "integrations" } },
    sections: [
      { key: "phone", title: "Your number stays the same", lede: "VoIP, landline or cloud. Calls are forwarded to Optavius. Nothing is replaced.", mediaSide: "right", media: { kind: "mock", name: "voice-green" }, features: [
        { icon: "phone", title: "Any phone system", text: "RingCentral, Zoom Phone, Twilio, Vonage, a PBX or a SIP trunk." },
        { icon: "reverse", title: "Ring-through fallback", text: "If Optavius can't take a call, it rings your team. Tested in every go-live." },
        { icon: "clock", title: "Overflow and after hours", text: "Forward all calls, only overflow, or only when you're closed." },
      ] },
      { key: "ehr", title: "Bookings written where they belong", lede: "Two-way sync with your calendar, practice management system or EHR, when you're ready.", mediaSide: "left", media: { kind: "mock", name: "hz-context" }, features: [
        { icon: "calendar", title: "Calendar first", text: "Google, Outlook and Cal.com connected on day one, so every booking finishes in your own system." },
        { icon: "doc", title: "EHR and PMS", text: "RevolutionEHR, Eyefinity, Crystal PM, Compulink, MaximEyes, ModMed, Nextech, Epic and ChipSoft via API or FHIR." },
        { icon: "check", title: "Verified writes", text: "Every booking is read back before it's confirmed to the patient. No double bookings, no manual entry." },
      ] },
      { key: "data", title: "Built to hold health data", lede: "FHIR-aligned from the first day, so every record is already in the shape your systems expect.", mediaSide: "right", media: { kind: "mock", name: "governance" }, features: [
        { icon: "lock", title: "Encrypted and in-region", text: "AES-256 at rest, TLS 1.3 in transit, EU or US data residency." },
        { icon: "shield", title: "Least privilege", text: "Read-only first. Write access per agent, per action, logged and reversible." },
        { icon: "plug", title: "API and MCP", text: "Any system with an open API or MCP server, scoped per deal." },
      ] },
    ],
    logos: {
      title: "Works with what you have",
      lede: "Start standalone. Connect your EHR, calendar and phone system when ready.",
      more: "+20 integration partners",
      groups: [
        { label: "EHR and practice management", items: INTEGRATION_LOGOS.ehr },
        { label: "Phone systems", items: INTEGRATION_LOGOS.phone },
        { label: "Calendar and CRM", items: INTEGRATION_LOGOS.tools },
      ],
    },
    related: { title: "Related products", cards: related("integrations") },
    cta,
  },

  pricing: {
    meta: { title: "Pricing | Optavius", description: "Outcome-based pricing for AI voice agents. Starting from $299 per month. If Optavius delivers no results, you pay nothing." },
    title: "Pricing that follows results",
    lede: "You pay for what Optavius delivers, not for seats or minutes.",
    from: "Starting from $299 per month",
    how: {
      title: "How outcome-based pricing works",
      lede: "One monthly amount, tied to what the agent actually does for your practice.",
      items: [
        { icon: "phone", title: "A monthly fee from $299", text: "Covers the agent, the console, unlimited users, setup and support. No per-seat or per-minute charges." },
        { icon: "chart", title: "Tied to results", text: "The fee follows the outcomes Optavius delivers: calls answered, appointments booked, no-shows recovered. We agree the targets with you up front." },
        { icon: "shield", title: "No results, no cost", text: "In a month where Optavius books nothing and resolves nothing, you pay nothing. We take that risk, not you." },
      ],
    },
    stats: { title: "The math makes sense", items: [{ value: "~$0/day", label: "if no results are made" }, { value: "$10K+", label: "typical monthly savings" }, { value: "20%", label: "average revenue increase" }] },
    calc: { title: "What the phone is costing you", text: "Move the sliders to your own numbers. The math is deliberately conservative.", calls: "Incoming calls per month", missed: "Calls missed today", value: "Value of one appointment", recovered: "appointments recovered per month", revenue: "revenue recovered per month", typical: "We typically see 20 to 30% at practices before they start.", note: "Recovered appointments = missed calls × 50% who never call back × 35% who wanted to book. Figures from actual clients.", currency: "$" },
    faq: {
      title: "Pricing questions",
      items: [
        { q: "What counts as a result?", a: "An outcome the agent completes end to end: a call answered and resolved, an appointment booked or moved, a no-show rebooked, an order status confirmed. You see every one of them in the console." },
        { q: "What do I pay in a month with no results?", a: "Nothing. The monthly fee only applies when Optavius delivers the outcomes we agreed on." },
        { q: "How is the fee set for my practice?", a: "We look at your call volume and the outcomes that matter to you, then agree a monthly fee and targets before you start. Multi-location groups get a group agreement." },
        { q: "Are there per-minute or per-user charges?", a: "No. Minutes and users are unlimited. The fee is tied to outcomes, not usage." },
        { q: "Are there setup fees?", a: "No. Setup, configuration and onboarding are included." },
        { q: "Can I cancel?", a: "Yes, monthly. There are no long contracts." },
        { q: "Is there a trial?", a: "Yes. Ask Optavius is free for 90 days, and every agent runs a week in shadow mode before it goes live." },
      ],
    },
    cta: { title: "Get a quote for your practice", text: "We model recovered appointments and staff hours on your own call volume, then agree the targets with you.", primary: contactSales, secondary: callDemo, note: "Talk to a founder. No obligations." },
  },

  specialties: {
    meta: { title: "Specialties | Optavius", description: "AI voice agents for ophthalmology, optometry, dermatology and veterinary practices." },
    title: "Your voice agent for specialty care.",
    lede: "Built for the calls your specialty actually gets. Ophthalmology, optometry, dermatology and veterinary.",
    logos: { title: "", logos },
    quote: { logo: logos[0].src, logoAlt: "OMC Amstelland", quote: "It knows the difference between a contact lens consult and a reorder. Our front desk finally has time for the patient standing in front of them.", name: "Feike", role: "Practice manager, OMC Amstelland", link: { label: "Full story", href: "/customers/omc-amstelland" } },
    cta,
    pages: specialties,
  },

  customers: {
    meta: { title: "Customer stories | Optavius", description: "Practices that answer every call, in their own words." },
    title: "Our customers\nin their own words",
    heroImage: { src: PHOTOS.story, alt: "Eye clinic team", logo: logos[0].src, logoAlt: "OMC Amstelland" },
    storiesTitle: "These are their stories",
    featuredTitle: "Featured stories",
    gridTitle: "Leaders in\nspecialty care",
    stories,
    moreTitle: "More customer stories",
    cta,
  },

  about: {
    meta: { title: "About | Optavius", description: "Optavius reduces friction in specialty care: for patients, for staff and for clinicians." },
    title: "Who we are\nand why we're here.",
    lede: "About Optavius.",
    image: { src: PHOTOS.examroom, alt: "Eye clinic exam room" },
    statement: { title: "Optavius reduces friction in specialty care: for patients, for staff and for clinicians.", text: "The front end of the patient journey is often the most frustrating part. Long hold times, inconsistent intake and overwhelmed staff. We built Optavius to fix that, starting with the phone." },
    values: [
      { icon: "shield", title: "Safety first", text: "Every feature, every pathway and every decision is designed with patient safety as the priority. Optavius makes no diagnoses and never overrides clinical judgment. That's a design principle, not a disclaimer." },
      { icon: "bolt", title: "Speed to value", text: "Live in days, not months. A practice forwards its number, approves its pathways and sees the first calls in its dashboard the same week." },
      { icon: "chart", title: "Proof over promises", text: "We measure everything and show you the numbers. If something isn't working, we tell you and fix it." },
    ],
    founders: {
      title: "Our founders",
      lede: "Optavius was founded by Yves Prevoo and Paul Sabou, who bring more than twenty years of healthcare technology and regulated medical devices to the front desk.",
      people: [
        { name: "Yves Prevoo", role: "Founder and CEO", image: PHOTOS.yves, text: "Yves spent more than twenty years in healthcare technology across product, regulatory affairs and clinical operations. As part of the founding team at Easee, the digital eye-testing company, he helped build one of the first products to reach CE Class IIa under the EU MDR. At Optavius he leads the push toward FDA and CE approval for the AI functions that make the agent progressively more autonomous." },
        { name: "Paul Sabou", role: "Co-founder and CTO", image: PHOTOS.paul, text: "Paul is a serial entrepreneur and technical leader. As co-founder and CTO of BusyMachines, which grew to more than fifty people before its acquisition, he advised sixty startups on technology and strategy. His work spans healthcare record systems and distributed platforms. At Optavius he owns the architecture and the product." },
      ],
    },
    offices: { title: "Our offices", text: "Based in {cities}, we work with practices in the United States, the Netherlands and beyond.", cities: ["Houston", "Amsterdam"] },
    cta: { ...cta, title: "Want to know more?", text: "Tell us about your practice and we'll show you what Optavius would do with your calls." },
  },

  resources: {
    meta: { title: "Resources | Optavius", description: "Guides, comparisons and customer stories on AI voice agents for specialty care." },
    title: "Resources",
    filters: [{ key: "all", label: "Featured" }, { key: "learn", label: "Guides" }, { key: "compare", label: "Comparisons" }, { key: "case", label: "Customer stories" }, { key: "blog", label: "Blog" }],
    readTime: "min read",
    backLabel: "All resources",
    cta,
  },

  careers: {
    meta: { title: "Careers | Optavius", description: "Help specialty care answer every call. Open roles at Optavius." },
    title: "Hi, we're Optavius.\nWe'd love for you to join us.",
    lede: "Build the agents that answer the phone for specialty care.",
    cta: { label: "Open roles", href: "#open-roles" },
    image: { src: PHOTOS.story, alt: "Clinic team at work" },
    statement: "We're a small team building AI agents that practices hire, supervise and pay for like staff. Our work sits between patients and clinicians, so we take safety and proof seriously and we ship every week. If you like real customers, real data and hard problems, come and build with us.",
    culture: [
      { icon: "marker", title: "Amsterdam and Houston", text: "We work from Amsterdam and Houston and spend most of our time with customers. Remote works when the job allows it." },
      { icon: "heart", title: "Customer zero", text: "We run Optavius on Optavius. Our own finance, sales ops and support run on the agents we sell." },
      { icon: "sparkles", title: "Small team, big leverage", text: "Three founders, a hands-on tech lead and agentic tooling. You'll own whole outcomes, not tickets." },
      { icon: "users", title: "Clinical partners", text: "Design partners in the Netherlands and Texas review what we build before it reaches a patient." },
    ],
    interviewing: { title: "Interviewing at Optavius", paragraphs: ["We hire for judgment and pace. You'll meet the founders, work through a real problem from our backlog and talk to a customer.", "Interviews take place in Amsterdam, Houston or on a call. Either way, you'll see how we work before you decide."] },
    roles: {
      title: "Open roles", lede: "We're looking for people who want to build something practices rely on every day.",
      groups: [
        { name: "Go to market", roles: [
          { title: "Founding account executive, US", location: "Houston, TX", href: "mailto:" + EMAIL + "?subject=Account%20executive" },
          { title: "Customer success, specialty care", location: "Amsterdam", href: "mailto:" + EMAIL + "?subject=Customer%20success" },
        ] },
      ],
    },
    finalCta: { title: "Don't see your role?", text: "Tell us what you'd build. We read every message.", primary: { label: "Email us", href: "mailto:" + EMAIL }, note: "" },
  },

  demo: {
    meta: { title: "Book a demo | Optavius", description: "Pick a time with a founder and hear Optavius take a call for your practice. No obligations." },
    title: "Pick a time with a founder.",
    points: [
      { icon: "phone", text: "Every patient call answered, 24/7, on your existing number." },
      { icon: "calendar", text: "Appointments booked straight into your calendar or EHR." },
      { icon: "shield", text: "Urgent symptoms escalated by your protocol, with a summary." },
    ],
    trustedTitle: "Trusted by",
    booking: { title: "Choose a slot", text: "30 minutes with Yves. We hear your call volume and show what Optavius would do with your calls.", fallback: { label: "Pick a time", href: CALENDLY, external: true }, note: "No obligations." },
  },

  legal: LEGAL.en,
};

export default en;
