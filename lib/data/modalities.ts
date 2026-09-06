import { getAllPractitioners } from './practitioners';
import type { Practitioner } from '@/lib/types/practitioner';

/**
 * Modality pages — QHHT, past-life regression, hypnofertility/hypnobirthing.
 *
 * WHY THESE THREE
 * Search Console, 180 days, shows an inversion worth acting on. The dedicated
 * service pages built for the big terms rank nowhere, while the niche modalities
 * with NO page rank on page one off scattered practitioner listings alone:
 *
 *   cluster            page?   impressions   avg position
 *   anxiety            yes           1989           60.4
 *   phobia             yes            906           56.5
 *   smoking            yes           1489           31.2
 *   qhht / quantum     NO              72            8.7
 *   fertility          NO              52            7.9
 *   past-life          NO              47           19.9
 *
 * "hypnofertility denver" sits at position 5.8 with 40 impressions and zero
 * clicks. QHHT queries are split across 14 different landing pages, which is a
 * textbook consolidation signal — no single page owns the term. These pages give
 * those queries somewhere to land.
 *
 * HOW PRACTITIONERS ARE SELECTED
 * Not from `specialties`. That field is Perplexity enrichment and reads
 * "General Hypnotherapy" on 1111/1152 records, so it carries no signal and
 * asserting it would be inventing a specialism for a real business.
 *
 * Selection instead uses `name` + `title`, which come from the Apify scrape of
 * the practice's own Google Business listing — i.e. the practice's own
 * description of itself ("Journey for Joy | QHHT, Past Life Regression
 * Hypnosis", "Suzanne Wing, CHt, QHHT"). Slugs are enumerated explicitly below
 * rather than matched at runtime so the sets are auditable and nothing new can
 * be swept in silently by a data refresh.
 *
 * Copy must therefore say a practice *lists* or *advertises* the modality. It
 * must never assert certification in it — QHHT in particular is a trademarked
 * training, and we have not verified anyone's credentials.
 */

export interface Modality {
  slug: string;
  /** H1 and nav label. */
  title: string;
  /** <title> tag. */
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  /** Short label for cross-links between modality pages. */
  shortLabel: string;
  intro: string;
  /** Explains the modality in plain terms. Informational, never clinical advice. */
  about: string[];
  faq: { q: string; a: string }[];
  practitionerSlugs: readonly string[];
}

const QHHT_SLUGS = [
  'alter-behaviors-qhht-with-flo-portland-51',
  'charbel-nader-qhht-los-angeles-61',
  'cosmic-creative-quantum-healing-seattle-25',
  'healing-qhht-with-terri-williams-nashville-nashville-11',
  'healing-waves-somatic-breathwork-and-hypnotherapy-regression-qhht-houston-9',
  'infinite-quantum-healing-san-francisco-19',
  'journey-for-joy-austin-0',
  'kevin-foresman-past-life-regression-dallas-22',
  'kevin-foresman-past-life-regression-dallas-36',
  'laurie-faulkner-portland-18',
  'qhht-houston-3',
  'qhht-san-diego-5',
  'qhht-with-tricia-milwaukee-1',
  'quantum-healing-hypnotherapy-with-rome-qhht-los-angeles-104',
  'quantum-healing-jacksonville-16',
  'quantum-healing-san-francisco-48',
  'reiki-with-deanna-energy-healing-san-francisco-25',
  'san-diego-qhht-hypnotherapy-san-diego-11',
  'suzanne-wing-nashville-9',
  'tony-alexander-qhht-san-diego-3',
  'volha-zhamoitsina-hypnotherapy-qhht-los-angeles-86',
] as const;

const PAST_LIFE_SLUGS = [
  'barbara-lamb-regression-therapist-san-diego-72',
  'dr-elena-gabor-hypnotherapy-past-life-regression-los-angeles-100',
  'enlumnia-reiki-dallas-19',
  'enlumnia-reiki-dallas-28',
  'healing-waves-somatic-breathwork-and-hypnotherapy-regression-qhht-houston-9',
  'hipnosis-terapeutica-regresiva-en-dallas-dallas-26',
  'hipnosis-terapeutica-regresiva-en-dallas-dallas-50',
  'hipnosis-terapia-regresiva-dallas-48',
  'hypnotherapy-los-angeles-55',
  'journey-for-joy-austin-0',
  'kevin-foresman-past-life-regression-dallas-22',
  'kevin-foresman-past-life-regression-dallas-36',
  'lorena-borello-hypnotherapy-life-coaching-san-francisco-34',
  'past-life-regression-dallas-dallas-27',
  'past-life-regression-houston-houston-14',
  'past-life-regression-therapy-los-angeles-los-angeles-0',
  'past-life-spirit-releasement-san-francisco-52',
  'rapid-transformational-therapy-and-past-life-regression-therapy-with-ellen-haines-phoenix-2',
  'stephanie-riseley-hypnotherapy-past-life-regressions-los-angeles-19',
] as const;

const FERTILITY_SLUGS = [
  'birth-education-center-san-diego-70',
  'body-centered-seattle-39',
  'hypnobirthing-hub-san-diego-84',
  'hypnobirthing-las-vegas-las-vegas-22',
  'hypnobirthing-los-angeles-los-angeles-105',
  'hypnobirthing-northwest-portland-39',
  'hypnofertility-denver-46',
  'hypnosis-for-fertility-san-francisco-50',
  'seattle-hypnobirthing-seattle-8',
] as const;

export const MODALITIES: readonly Modality[] = [
  {
    slug: 'qhht-quantum-healing',
    title: 'QHHT & Quantum Healing Hypnosis Practitioners',
    metaTitle: 'QHHT Practitioners Near Me | Quantum Healing Hypnosis Directory',
    metaDescription:
      'Find QHHT and quantum healing hypnosis practitioners across the US. Browse practices that list QHHT in 11 cities, then contact them directly to confirm training and approach.',
    keywords:
      'qhht near me, qhht practitioner near me, quantum healing near me, qhht practitioner, quantum healing hypnosis, qhht los angeles, qhht san diego, qhht wisconsin',
    shortLabel: 'QHHT & Quantum Healing',
    intro:
      'QHHT (Quantum Healing Hypnosis Technique) and quantum healing hypnosis are offered by a small number of practitioners, and they can be hard to find in a general directory. The practices below list QHHT or quantum healing in their own business listing.',
    about: [
      'QHHT is a specific hypnosis method developed by Dolores Cannon. Practitioners are trained through her programme, and sessions are typically longer than a standard hypnotherapy appointment — often several hours in a single sitting.',
      'Because QHHT is a trademarked training rather than a licensed healthcare credential, level of training varies between practitioners. Hypnotherapy Finder does not verify anyone\'s QHHT certification, so ask directly about their training, when they completed it, and how they structure a session.',
      'Quantum healing hypnosis is a broader term and different practitioners use it to mean different things. It is worth asking what a session actually involves before booking, since the format varies more than it does in mainstream hypnotherapy.',
    ],
    faq: [
      {
        q: 'How do I find a QHHT practitioner near me?',
        a: 'Browse the practices listed on this page and check which cities they are in, or use the search to filter by location. Every listing includes the contact details on file so you can ask directly about availability and session format.',
      },
      {
        q: 'Are these practitioners certified in QHHT?',
        a: 'We do not verify certifications. The practices on this page list QHHT or quantum healing in their own business listing, which is why they appear here. Ask each practitioner directly about their training level and when they completed it.',
      },
      {
        q: 'How long is a QHHT session?',
        a: 'QHHT sessions are usually much longer than standard hypnotherapy — commonly several hours, sometimes a full day. Confirm the length and price with the practitioner before booking, as this varies between practices.',
      },
      {
        q: 'What is the difference between QHHT and regular hypnotherapy?',
        a: 'QHHT is one specific method with its own training programme and session structure. General hypnotherapy covers a much wider range of approaches and is typically delivered in shorter, repeated sessions. Many practitioners offer both.',
      },
    ],
    practitionerSlugs: QHHT_SLUGS,
  },
  {
    slug: 'past-life-regression',
    title: 'Past Life Regression Therapists',
    metaTitle: 'Past Life Regression Near Me | Regression Therapist Directory',
    metaDescription:
      'Find past life regression therapists across the US. Browse practices that list regression therapy in their own listing, then contact them directly about approach and session format.',
    keywords:
      'past life regression near me, past life regression therapist, regression therapy near me, past life hypnotherapist near me, past life regression columbus ohio, past life regression phoenix, terapia regresiva',
    shortLabel: 'Past Life Regression',
    intro:
      'Past life regression and regression therapy are offered by practitioners who usually also work in general hypnotherapy. The practices below list regression work in their own business listing.',
    about: [
      'Regression therapy uses hypnosis to guide attention toward earlier memories or imagery. Practitioners differ widely in how they frame what surfaces during a session — some treat it literally, others as symbolic material to work with.',
      'It is not a regulated field and there is no single governing credential, so training varies considerably. Ask what approach a practitioner takes, how long they have practised it, and what a session involves.',
      'Regression work is a complementary approach, not a treatment for a medical or psychological condition. If you are dealing with trauma or significant distress, speak with a qualified healthcare provider first.',
    ],
    faq: [
      {
        q: 'How do I find a past life regression therapist near me?',
        a: 'The practices on this page are grouped by city. Browse the listings or use the search to filter by location, then contact a practitioner directly to ask about availability, format and price.',
      },
      {
        q: 'Is past life regression the same as hypnotherapy?',
        a: 'It uses hypnosis, but it is a specific application rather than a separate discipline. Most practitioners offering regression also offer general hypnotherapy, and many list both in their profile.',
      },
      {
        q: 'What happens in a regression session?',
        a: 'Formats vary a great deal between practitioners, more so than in mainstream hypnotherapy. Ask in advance how long a session runs, what the practitioner does during it, and how they handle anything distressing that comes up.',
      },
      {
        q: 'Do you verify regression therapists\' training?',
        a: 'No. Hypnotherapy Finder lists profiles and contact details but does not verify credentials, training or experience. Ask each practitioner directly before booking.',
      },
    ],
    practitionerSlugs: PAST_LIFE_SLUGS,
  },
  {
    slug: 'hypnotherapy-for-fertility',
    title: 'Hypnotherapy for Fertility & Birth',
    metaTitle: 'Hypnotherapy for Fertility & Hypnobirthing | Practitioner Directory',
    metaDescription:
      'Find hypnofertility and hypnobirthing practitioners across the US. Browse practices listing fertility or birth hypnosis, then contact them directly to confirm training and approach.',
    keywords:
      'hypnofertility, hypnotherapy for fertility, fertility hypnotherapy denver, hypnofertility denver, hypnobirthing near me, hypnobirthing classes, hypnosis for birth, fertility hypnosis',
    shortLabel: 'Fertility & Birth',
    intro:
      'Hypnotherapy around fertility and birth covers two related but distinct things: hypnofertility, used alongside trying to conceive, and hypnobirthing, which prepares for labour and delivery. The practices below list one or both in their own business listing.',
    about: [
      'Hypnobirthing is the more established of the two and is usually taught as a structured course rather than one-off sessions, often over several weeks and frequently including a birth partner.',
      'Hypnofertility is typically offered as individual sessions focused on stress and relaxation while trying to conceive. It is a complementary approach and is not a fertility treatment — it does not replace medical care from a fertility specialist or obstetric team.',
      'If you are undergoing fertility treatment or are pregnant, tell your medical team about anything complementary you are considering, and ask the practitioner directly what experience they have in this specific area.',
    ],
    faq: [
      {
        q: 'What is the difference between hypnofertility and hypnobirthing?',
        a: 'Hypnofertility is generally used while trying to conceive and focuses on stress and relaxation. Hypnobirthing prepares for labour and delivery and is usually taught as a multi-week course. Some practitioners offer both, others only one.',
      },
      {
        q: 'Can hypnotherapy help me get pregnant?',
        a: 'Hypnotherapy is a complementary approach, not a fertility treatment, and no practitioner should present it as one. People generally use it alongside medical care to manage the stress of trying to conceive. Speak with your fertility specialist about your treatment plan.',
      },
      {
        q: 'Is hypnobirthing a class or a one-to-one session?',
        a: 'Most commonly a structured course over several weeks, often including a birth partner, though some practitioners offer private sessions. Ask about format, length and price when you contact them.',
      },
      {
        q: 'Do you verify these practitioners?',
        a: 'No. The practices here list fertility or birth work in their own business listing, which is why they appear. Hypnotherapy Finder does not verify credentials, training or experience — confirm directly with the practitioner.',
      },
    ],
    practitionerSlugs: FERTILITY_SLUGS,
  },
];

export function getModalityBySlug(slug: string): Modality | undefined {
  return MODALITIES.find(m => m.slug === slug);
}

export function getModalities(): readonly Modality[] {
  return MODALITIES;
}

/** Resolves a modality's enumerated slugs to full records, skipping any that no longer exist. */
export function getModalityPractitioners(m: Modality): Practitioner[] {
  const bySlug = new Map(getAllPractitioners().map(p => [p.slug, p]));
  return m.practitionerSlugs
    .map(s => bySlug.get(s))
    .filter((p): p is Practitioner => Boolean(p));
}

/** Modalities a given practitioner appears on — used to cross-link from their profile. */
export function getModalitiesForPractitioner(slug: string): Modality[] {
  return MODALITIES.filter(m => m.practitionerSlugs.includes(slug));
}
