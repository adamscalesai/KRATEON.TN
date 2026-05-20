const { useState, useEffect, useRef } = React;

const CALENDLY_URL = "https://calendly.com/adam-krateon/30min";
const WHATSAPP_URL = "https://wa.me/21690005510?text=Bonjour%2C%20j%27aimerais%20en%20savoir%20plus%20sur%20Krateon.tn";

/* ---------- Icons ---------- */
const ArrowRight = ({ className = "" }) =>
<span className={"arrow " + className} aria-hidden="true">→</span>;


const WhatsAppIcon = ({ size = 20, color = "#25D366" }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.768.967-.941 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.981.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.889-9.884a9.823 9.823 0 016.988 2.895 9.825 9.825 0 012.892 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.298A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
  </svg>;


const LinkedInIcon = ({ size = 16 }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>;


/* ---------- Reveal-on-scroll hook ---------- */
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

/* ---------- Nav ---------- */
const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);
  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href="#top" className="logo" aria-label="Krateon.tn — Accueil" onClick={close}>
          <span className="logo__mark" aria-hidden="true">
            <img src="krateon-icon.svg" alt="" />
          </span>
          <span>KRATEON.TN</span>
        </a>
        <nav className={"nav__links" + (menuOpen ? " nav__links--open" : "")} aria-label="Navigation principale">
          <a className="nav__link" href="#probleme" onClick={close}>Votre Problème</a>
          <a className="nav__link" href="#process" onClick={close}>Process</a>
          <a className="nav__link" href="#tarifs" onClick={close}>Tarifs</a>
          <a className="nav__link" href="#faq" onClick={close}>FAQ</a>
        </nav>
        <div className="nav__end">
          <a className="btn btn--wa-nav" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={18} color="#fff" />
            WhatsApp
          </a>
          <button
            className="nav__mobile-toggle"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
          >
            {menuOpen ? "✕" : "≡"}
          </button>
        </div>
      </div>
    </header>
  );
};


/* ---------- Hero background motion graphic ---------- */
const HERO_NODES = [
  { x: "15%", y: "20%" }, { x: "72%", y: "12%" }, { x: "88%", y: "38%" },
  { x: "78%", y: "72%" }, { x: "45%", y: "82%" }, { x: "8%",  y: "62%" },
  { x: "38%", y: "28%" }, { x: "62%", y: "52%" }, { x: "92%", y: "18%" },
  { x: "25%", y: "55%" }, { x: "55%", y: "18%" }, { x: "82%", y: "55%" }
];
const HERO_CONNS = [
  [0,6],[6,1],[1,8],[1,10],[6,9],[7,2],[7,3],[7,11],[3,4],[4,5],[5,9],[10,6],[11,2],[11,3]
];

const HeroBg = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div className="hero__bg" aria-hidden="true">
      <div className="hero__grid" />
      <div className="hero__radial" />
      <svg className="hero__network">
        {HERO_CONNS.map(([a, b], i) => {
          const na = HERO_NODES[a], nb = HERO_NODES[b];
          return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} />;
        })}
      </svg>
      {HERO_NODES.map((n, i) =>
        <span
          key={i}
          className="hero__node"
          style={{
            left: n.x,
            top: n.y,
            animationDelay: `${i * 0.22}s`,
            animationDuration: `${2.5 + (i % 4) * 0.4}s`
          }}
        />
      )}
      <div ref={ref} className="hero__parallax" />
    </div>
  );
};

/* ---------- Hero ---------- */
const Hero = ({ glow }) =>
<section className={"hero" + (glow ? "" : " hero--no-fx")} id="top" data-screen-label="01 Hero">
    {glow && <HeroBg />}
    <div className="container hero__inner reveal">
      <span className="eyebrow">LA PREMIÈRE ENTREPRISE D'IA EN TUNISIE</span>
      <h1>
        Vous Avez Construit l'Entreprise.<br />
        <span className="accent">Arrêtez de Faire le Travail à la Main.</span>
      </h1>
      <p className="lede">
        La plupart des entreprises tunisiennes perdent 20 à 30 heures par semaine
        sur des messages clients, des relances manuelles, et des tâches répétitives
        qui ne génèrent aucun revenu. On déploie les agents IA. Vous gardez le système.
        Votre équipe se concentre sur la vente.
      </p>
      <div className="hero__ctas">
        <a className="btn btn--primary btn--lg" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
          Réserver un appel découverte <ArrowRight />
        </a>
        <a className="link-arrow" href="#process">→ Voir comment ça marche</a>
      </div>
      <dl className="hero__meta">
        <div className="hero__meta-item">
          <dt className="hero__meta-k">Déploiement</dt>
          <dd className="hero__meta-v" style={{ margin: 0 }}>2 semaines</dd>
        </div>
        <div className="hero__meta-item">
          <dt className="hero__meta-k">Basés à</dt>
          <dd className="hero__meta-v" style={{ margin: 0 }}>Tunis, Tunisie</dd>
        </div>
        <div className="hero__meta-item">
          <dt className="hero__meta-k">Support</dt>
          <dd className="hero__meta-v" style={{ margin: 0 }}>WhatsApp</dd>
        </div>
      </dl>
    </div>
  </section>;


/* ---------- Problème ---------- */
const PROBLEMS = [
{
  n: "01",
  t: "Vous Êtes Invisibles En Ligne",
  b: "Vous avez une excellente entreprise, un excellent service. Mais quand vos clients vous cherchent sur Google, ils trouvent un site qui date de 2015 — ou rien du tout. Pendant ce temps, vos concurrents avec un site moderne capturent les clients que vous méritiez.",
  m: "80% — recherchent avant d'acheter"
},
{
  n: "02",
  t: "Vous Voulez l'IA, Mais Vous Ne Savez Pas Par Où Commencer",
  b: "Vous voyez l'IA partout sur Instagram. Vos concurrents commencent à l'utiliser. Vous savez qu'elle peut transformer votre entreprise, mais vous ne savez pas comment l'appliquer chez vous — ni combien investir pour quels résultats.",
  m: "ChatGPT ≠ système IA"
},
{
  n: "03",
  t: "Vous Perdez des Clients Après 18h",
  b: "Un client envoie un message WhatsApp à 21h. Personne ne répond. Le lendemain matin, il a déjà acheté chez votre concurrent. Vos heures d'ouverture sont 35% de la journée. Les 65% restants sont du chiffre d'affaires invisible.",
  m: "65% — heures sans couverture"
},
{
  n: "04",
  t: "Votre Équipe Répète les Mêmes Tâches Toute la Journée",
  b: "Répondre aux mêmes questions. Relancer les paiements. Confirmer les rendez-vous. Trier les leads. 15 à 20 heures par semaine consommées par des tâches qu'une IA peut faire en arrière-plan, sans erreur, sans pause.",
  m: "20-30 h — par semaine perdues"
}];


const Probleme = () =>
<section className="section section--alt" id="probleme" data-screen-label="03 Probleme">
    <div className="container">
      <div className="section-head reveal">
        <span className="eyebrow">— LE PROBLÈME</span>
        <h2>Le Piège du Travail Manuel.</h2>
        <p className="lede">
          Quatre situations que vivent les entreprises tunisiennes chaque jour.
          La plupart les acceptent comme « le coût de faire des affaires. » Ce n'est plus le cas.
        </p>
      </div>
      <div className="grid-4">
        {PROBLEMS.map((p, i) =>
      <article key={p.n} className="pcard reveal" style={{ transitionDelay: `${i * 60}ms` }}>
            <div className="pcard__tag">{p.n}</div>
            <h3>{p.t}</h3>
            <p className="pcard__body">{p.b}</p>
            <div className="pcard__metric">{p.m}</div>
          </article>
      )}
      </div>
    </div>
  </section>;


/* ---------- Process / Comment Ça Marche ---------- */
const STEPS = [
{
  n: "01",
  t: "Appel Découverte & Audit",
  b: "On comprend votre activité, vos défis, et où l'IA peut vous faire gagner le plus de temps et d'argent. On identifie ensemble les opportunités concrètes. 30 minutes. Sans engagement."
},
{
  n: "02",
  t: "Déploiement Rapide",
  b: "On configure votre système — site web intelligent, assistant IA, ou automatisation sur mesure. 3 jours pour un site, 2 semaines pour un système complet. On construit, vous validez, on lance."
},
{
  n: "03",
  t: "Suivi & Optimisation",
  b: "Vous recevez la documentation complète, la propriété totale, et 30 jours de support post-lancement. Appels d'optimisation mensuels en français. On reste avec vous tant que vous avez besoin de nous."
}];


const Process = () =>
<section className="section" id="process" data-screen-label="04 Process">
    <div className="container">
      <div className="section-head reveal">
        <span className="eyebrow">— COMMENT ÇA MARCHE</span>
        <h2>Trois étapes.<br /><span className="accent">Opérations IA entièrement déployées.</span></h2>
      </div>
      <div className="steps reveal">
        {STEPS.map((s) =>
      <div key={s.n} className="step">
            <div className="step__num">{s.n}</div>
            <h3>{s.t}</h3>
            <p className="step__body">{s.b}</p>
          </div>
      )}
      </div>
    </div>
  </section>;


/* ---------- Résultats ---------- */
const RESULTS = [
{
  n: "RÉSULTAT 01",
  t: "20-30 Heures Récupérées par Semaine",
  b: "Par équipe. Messages clients, relances, confirmations de RDV, rapports — automatisés. Votre équipe se concentre sur ce qui génère du revenu. Le bénéfice compose chaque semaine."
},
{
  n: "RÉSULTAT 02",
  t: "Couverture Client 24h/24 et 7j/7",
  b: "Vos clients reçoivent une réponse instantanée à toute heure. Plus jamais de client perdu parce que c'était nuit, weekend, ou Ramadan. Vos heures d'ouverture deviennent 168h par semaine."
},
{
  n: "RÉSULTAT 03",
  t: "Une Présence Professionnelle qui Convertit",
  b: "Un site moderne, un assistant IA qui répond, une capture de leads automatique. Quand un client vous trouve sur Google, il devient un prospect qualifié — pas un visiteur perdu."
}];


const Resultats = () =>
<section className="section section--alt" id="resultats" data-screen-label="05 Resultats">
    <div className="container">
      <div className="section-head reveal">
        <span className="eyebrow">— RÉSULTATS</span>
        <h2>Des résultats réels de<br /><span className="accent">l'automatisation IA.</span></h2>
      </div>
      <div className="grid-3">
        {RESULTS.map((r, i) =>
      <article key={r.n} className="rcard reveal" style={{ transitionDelay: `${i * 60}ms` }}>
            <div className="rcard__tag">{r.n}</div>
            <h3>{r.t}</h3>
            <p className="rcard__body">{r.b}</p>
          </article>
      )}
      </div>
    </div>
  </section>;


/* ---------- Tarifs ---------- */
const TIERS = [
{
  name: "DÉMARRAGE",
  desc: "Pour faire vos premiers pas avec l'IA",
  features: [
  "Un système automatisé (Site Web Intelligent OU Assistant IA OU Automatisation)",
  "Livraison en 5 à 14 jours",
  "Documentation complète et propriété totale",
  "14 jours de support post-lancement",
  "Formation de votre équipe incluse"],

  cta: "Réserver un appel découverte",
  primary: false
},
{
  name: "CROISSANCE",
  desc: "Déploiement multi-système qui évolue avec vous",
  popular: true,
  features: [
  "Tout ce qui est inclus dans Démarrage",
  "Plusieurs systèmes combinés (Site + Assistant IA + Automatisations)",
  "Automatisation multi-canal (WhatsApp, Messenger, Instagram)",
  "Sessions d'optimisation mensuelles",
  "30 jours de support post-lancement",
  "Account manager dédié"],

  cta: "Réserver un appel découverte",
  primary: true
},
{
  name: "SUR MESURE",
  desc: "Déploiement entreprise pour multi-sites ou opérations complexes",
  features: [
  "Déploiement personnalisé pour cliniques multi-sites, BPO, groupes",
  "Account manager dédié",
  "Reporting exécutif et tracking ROI",
  "Intégrations sur mesure",
  "Tarification selon l'engagement"],

  cta: "Réserver un appel découverte",
  primary: false
}];


const Tarifs = () =>
<section className="section" id="tarifs" data-screen-label="06 Tarifs">
    <div className="container">
      <div className="section-head reveal">
        <span className="eyebrow">— TARIFS</span>
        <h2>Choisissez votre<br /><span className="accent">déploiement.</span></h2>
      </div>
      <div className="tiers">
        {TIERS.map((t, i) =>
      <div key={t.name}
      className={"tier reveal" + (t.popular ? " tier--popular" : "")}
      style={{ transitionDelay: `${i * 60}ms` }}>
            <div className="tier__name">{t.name}</div>
            <p className="tier__desc">{t.desc}</p>
            <div className="tier__rule" />
            <ul className="tier__features">
              {t.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <a className={"btn " + (t.primary ? "btn--primary" : "btn--ghost")}
        href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              {t.cta} <ArrowRight />
            </a>
          </div>
      )}
      </div>
    </div>
  </section>;


/* ---------- FAQ ---------- */
const FAQS = [
{
  q: "Je peux pas juste utiliser ChatGPT directement?",
  a: "ChatGPT est un outil. Nous construisons un système. ChatGPT répond quand vous lui parlez. Notre système répond à vos clients sur WhatsApp 24h/24, capture leurs informations, prend des rendez-vous, et fait des relances — automatiquement, sans que vous interveniez."
},
{
  q: "Combien ça coûte vraiment?",
  a: "Nos tarifs dépendent de votre activité et de ce qu'on déploie. Le démarrage commence à partir d'un investissement raisonnable pour une entreprise tunisienne. Réservez un appel découverte — on évalue ensemble et on vous envoie une proposition claire en 48h."
},
{
  q: "Combien de temps pour déployer?",
  a: "Site Web Intelligent : 5 jours ouvrés. Assistant IA : 2 semaines. Automatisation sur mesure : 2 à 3 semaines. Nos délais sont des engagements, pas des estimations."
},
{
  q: "J'ai besoin d'un développeur pour utiliser ça?",
  a: "Non. Tout est configuré, déployé, et géré par nous. Vous utilisez vos outils habituels (WhatsApp, votre site, votre email). Le système travaille en arrière-plan. Aucune compétence technique requise de votre côté."
},
{
  q: "Et si quelque chose se casse et vous n'êtes pas disponibles?",
  a: "Tous nos déploiements incluent une documentation complète, un monitoring automatique, et un support WhatsApp en français. Nous sommes à Tunis — même fuseau horaire, mêmes jours ouvrés. Pas de support à 4h du matin via email en anglais."
},
{
  q: "Mes données sont-elles sécurisées?",
  a: "Oui. Toutes les données sont stockées de manière sécurisée et ne sont jamais partagées avec des tiers. Nous respectons les standards internationaux de protection des données — les mêmes que nous appliquons pour nos clients européens et américains."
}];


const Faq = () => {
  const [open, setOpen] = useState(0);
  return (
    <section className="section section--alt" id="faq" data-screen-label="07 FAQ">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">— FAQ</span>
          <h2>Tout ce que vous devez savoir<br /><span className="accent">avant de déployer.</span></h2>
        </div>
        <div className="faq reveal">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={"faq__item" + (isOpen ? " faq__item--open" : "")}>
                <button className="faq__q"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span>{item.q}</span>
                  <span className="faq__icon" aria-hidden="true" />
                </button>
                <div className="faq__a">
                  <div className="faq__a-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>);

          })}
        </div>

        <div className="faq__footer reveal">
          <div className="faq__footer-text">
            <h3>Vous avez encore des questions?</h3>
            <p>On répond au reste pendant un appel découverte de 30 minutes. Pas de vente forcée.</p>
          </div>
          <a className="btn btn--primary" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            Réserver un appel <ArrowRight />
          </a>
        </div>
      </div>
    </section>);

};

/* ---------- Final CTA ---------- */
const FinalCta = () =>
<section className="section final" id="commencer" data-screen-label="08 Commencer">
    <div className="container final__inner reveal">
      <span className="eyebrow">— COMMENCER</span>
      <h2>Chaque semaine sans automatisation,<br /><span className="accent">c'est du chiffre d'affaires perdu à vie.</span></h2>
      <p className="lede">
        Pendant que vous hésitez, vos concurrents déploient des systèmes qui travaillent
        pendant qu'ils dorment. L'écart se creuse chaque mois. La bonne nouvelle :
        on déploie en 2 semaines.
      </p>
      <div className="final__ctas">
        <a className="btn btn--primary btn--lg" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
          Réserver un appel découverte <ArrowRight />
        </a>
        <a className="btn btn--lg wa-btn" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon size={20} />
          Nous écrire sur WhatsApp
        </a>
      </div>
      <p className="final__note">Appel de 30 min · Ou écrivez-nous à adam@krateon.tn</p>
    </div>
  </section>;


/* ---------- Footer ---------- */
const Footer = () =>
<footer className="footer">
    <div className="container">
      <div className="footer__grid">
        <div>
          <a href="#top" className="logo">
            <span className="logo__mark" aria-hidden="true">
              <img src="krateon-icon.svg" alt="" />
            </span>
            <span>KRATEON.TN</span>
          </a>
          <p className="footer__tag">La première entreprise d'IA en Tunisie.</p>
        </div>
        <div>
          <div className="footer__col-title">Navigation</div>
          <div className="footer__links">
            <a href="#top">Accueil</a>
            <a href="#process">Process</a>
            <a href="#tarifs">Tarifs</a>
            <a href="#faq">FAQ</a>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Contact</a>
          </div>
        </div>
        <div>
          <div className="footer__col-title">Contact</div>
          <div className="footer__links">
            <a href="mailto:adam@krateon.tn">adam@krateon.tn</a>
          </div>
          <div className="footer__social">
            <a className="icon-btn icon-btn--wa" href={WHATSAPP_URL}
          target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <WhatsAppIcon size={16} color="currentColor" />
            </a>
            <a className="icon-btn" href="https://www.linkedin.com/"
          target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedInIcon size={15} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div>© 2026 Krateon. Extension tunisienne de Krateon AI.</div>
        <div className="footer__legal">
          <a href="#">Mentions légales</a>
          <a href="#">Politique de confidentialité</a>
        </div>
      </div>
    </div>
  </footer>;


/* ---------- App ---------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "motion": "spirited",
  "heroGlow": true,
  "blueSections": "final",
  "accent": "#3B82F6"
}/*EDITMODE-END*/;

const ACCENT_HOVERS = {
  "#3B82F6": "#2563EB",
  "#2A6FDB": "#1F58B5",
  "#6366F1": "#4F46E5",
  "#0EA5E9": "#0284C7"
};

const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", t.accent);
    root.style.setProperty("--accent-hover", ACCENT_HOVERS[t.accent] || t.accent);

    const body = document.body;
    body.classList.toggle("motion-off",    t.motion === "off");
    body.classList.toggle("motion-subtle", t.motion === "subtle");
    body.classList.toggle("bs-probleme", t.blueSections === "probleme" || t.blueSections === "both");
    body.classList.toggle("bs-final",    t.blueSections === "final"    || t.blueSections === "both");
  }, [t]);

  return (
    <React.Fragment>
      <Nav />
      <main>
        <Hero glow={t.heroGlow} />
        <Probleme />
        <Process />
        <Resultats />
        <Tarifs />
        <Faq />
        <FinalCta />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Motion" />
        <TweakRadio
          label="Animation"
          value={t.motion}
          options={["off", "subtle", "spirited"]}
          onChange={(v) => setTweak("motion", v)}
        />
        <TweakToggle
          label="Hero motion"
          value={t.heroGlow}
          onChange={(v) => setTweak("heroGlow", v)}
        />

        <TweakSection label="Blue accents" />
        <TweakRadio
          label="Sections en bleu"
          value={t.blueSections}
          options={["none", "probleme", "final", "both"]}
          onChange={(v) => setTweak("blueSections", v)}
        />

        <TweakSection label="Accent color" />
        <TweakColor
          label="Bleu"
          value={t.accent}
          options={["#3B82F6", "#2A6FDB", "#6366F1", "#0EA5E9"]}
          onChange={(v) => setTweak("accent", v)}
        />
      </TweaksPanel>
    </React.Fragment>);

};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);