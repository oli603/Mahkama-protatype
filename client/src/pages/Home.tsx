import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Eye,
  FileSearch,
  Gavel,
  History,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileCheck2,
  FileText,
  Filter,
  Globe2,
  Home as HomeIcon,
  Languages,
  Landmark,
  LayoutGrid,
  LockKeyhole,
  MapPin,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Paperclip,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  TrendingUp,
  UserCheck,
  UserRound,
  UsersRound,
  X,
  WalletCards,
  Zap,
} from "lucide-react";
import { useMemo, useState, type ComponentType, type ReactNode } from "react";

type Icon = ComponentType<{ className?: string }>;
type View = "home" | "intake" | "lawyers" | "case" | "messages" | "profile" | "lawyer" | "admin";

type Category = {
  id: string;
  label: string;
  amh: string;
  description: string;
  icon: Icon;
  tint: string;
};

type Lawyer = {
  id: string;
  name: string;
  title: string;
  initials: string;
  specialties: string[];
  languages: string[];
  location: string;
  years: number;
  rating: number;
  reviews: number;
  price: string;
  availability: string;
  response: string;
  fit: string;
  accent: string;
};

const categories: Category[] = [
  { id: "property", label: "Land & property", amh: "መሬት እና ንብረት", description: "Boundaries, title deeds, possession and ownership", icon: Landmark, tint: "sage" },
  { id: "rent", label: "Rent & eviction", amh: "ኪራይ እና ማስወጣት", description: "Lease agreements, rent notices and eviction matters", icon: HomeIcon, tint: "apricot" },
  { id: "family", label: "Family & divorce", amh: "ቤተሰብ እና ፍቺ", description: "Divorce, marriage, custody and family support", icon: UsersRound, tint: "rose" },
  { id: "inheritance", label: "Inheritance", amh: "ውርስ", description: "Estate sharing, wills and succession questions", icon: FileText, tint: "lavender" },
  { id: "criminal", label: "Criminal defense", amh: "የወንጀል መከላከያ", description: "Police matters, bail and criminal representation", icon: ShieldCheck, tint: "blue" },
  { id: "employment", label: "Employment & wages", amh: "ሥራ እና ደመወዝ", description: "Unpaid wages, dismissal and workplace disputes", icon: BriefcaseBusiness, tint: "mint" },
  { id: "business", label: "Business & partnership", amh: "ንግድ እና ሽርክና", description: "Registration, shareholders and commercial disagreements", icon: LayoutGrid, tint: "gold" },
  { id: "contracts", label: "Contracts & documents", amh: "ውል እና ሰነዶች", description: "Review, drafting questions and breach of contract", icon: FileCheck2, tint: "sky" },
  { id: "debt", label: "Debt recovery", amh: "ዕዳ ማስመለስ", description: "Loans, unpaid invoices and repayment agreements", icon: ArrowRight, tint: "peach" },
  { id: "consumer", label: "Consumer disputes", amh: "የሸማቾች ክርክር", description: "Purchases, services and customer complaints", icon: CircleHelp, tint: "yellow" },
  { id: "traffic", label: "Traffic & accidents", amh: "ትራፊክ እና አደጋ", description: "Vehicle collisions, injury claims and insurance matters", icon: Zap, tint: "orange" },
  { id: "civil", label: "Civil claims", amh: "የሲቪል ጉዳዮች", description: "Compensation, neighbor disputes and civil court matters", icon: ScaleIcon, tint: "plum" },
  { id: "immigration", label: "Immigration & residency", amh: "ኢሚግሬሽን", description: "Residency, permits and immigration paperwork", icon: Globe2, tint: "teal" },
  { id: "tax", label: "Tax & customs", amh: "ግብር እና ጉምሩክ", description: "Tax notices, customs and business compliance", icon: Landmark, tint: "green" },
  { id: "construction", label: "Construction disputes", amh: "የግንባታ ክርክር", description: "Contractors, defects, delays and project disagreements", icon: HomeIcon, tint: "clay" },
  { id: "ip", label: "Intellectual property", amh: "የአእምሯዊ ንብረት", description: "Brands, creative work and business ideas", icon: Sparkles, tint: "violet" },
  { id: "safety", label: "Domestic violence support", amh: "የቤት ውስጥ ጥቃት", description: "Private, safety-first legal support and next steps", icon: ShieldCheck, tint: "red" },
  { id: "other", label: "Something else", amh: "ሌላ ጉዳይ", description: "Tell us what happened and we will help you find a direction", icon: CircleHelp, tint: "neutral" },
];

const lawyers: Lawyer[] = [
  { id: "lydia", name: "Lydia Bekele", title: "Property & civil rights lawyer", initials: "LB", specialties: ["Land & property", "Civil claims", "Inheritance"], languages: ["English", "Amharic"], location: "Bole, Addis Ababa", years: 11, rating: 4.9, reviews: 47, price: "ETB 1,500–3,000", availability: "Available today", response: "Replies in 12 min", fit: "Experience with boundary and title-deed matters", accent: "forest" },
  { id: "nahom", name: "Nahom Tesfaye", title: "Family & employment advocate", initials: "NT", specialties: ["Family & divorce", "Employment & wages", "Child custody"], languages: ["Amharic", "English", "Afaan Oromo"], location: "Kazanchis, Addis Ababa", years: 8, rating: 4.8, reviews: 32, price: "ETB 1,000–2,200", availability: "Available tomorrow", response: "Replies in 24 min", fit: "Often helps clients understand their options clearly", accent: "terracotta" },
  { id: "sara", name: "Sara Mekonnen", title: "Commercial & contracts lawyer", initials: "SM", specialties: ["Business & partnership", "Contracts & documents", "Debt recovery"], languages: ["English", "Amharic"], location: "Kazanchis, Addis Ababa", years: 14, rating: 4.9, reviews: 61, price: "ETB 2,000–4,000", availability: "Available this week", response: "Replies in 36 min", fit: "Strong match for business agreements and unpaid invoices", accent: "ink" },
  { id: "dawit", name: "Dawit Alemu", title: "Criminal defense lawyer", initials: "DA", specialties: ["Criminal defense", "Police matters", "Traffic & accidents"], languages: ["Amharic", "English"], location: "Mexico, Addis Ababa", years: 16, rating: 4.7, reviews: 28, price: "ETB 1,800–3,500", availability: "Available today", response: "Replies in 18 min", fit: "Handles urgent police and court representation requests", accent: "blue" },
  { id: "hana", name: "Hana Girma", title: "Housing & family lawyer", initials: "HG", specialties: ["Rent & eviction", "Family & divorce", "Domestic violence support"], languages: ["Amharic", "English"], location: "Piassa, Addis Ababa", years: 10, rating: 4.8, reviews: 39, price: "ETB 900–2,000", availability: "Available today", response: "Replies in 9 min", fit: "Known for practical, private support in sensitive matters", accent: "plum" },
  { id: "meron", name: "Meron Wondimu", title: "Business & tax consultant lawyer", initials: "MW", specialties: ["Tax & customs", "Business & partnership", "Construction disputes"], languages: ["English", "Amharic", "Tigrinya"], location: "Gerji, Addis Ababa", years: 12, rating: 4.6, reviews: 21, price: "ETB 1,500–3,200", availability: "Available this week", response: "Replies in 52 min", fit: "Helpful for growing businesses and compliance questions", accent: "gold" },
];

const activeCases = [
  { id: "ETH-2026-0148", title: "Land boundary dispute", type: "Land & property", place: "Yeka, Addis Ababa", status: "Comparing lawyers", proposals: 3, updated: "Updated 2 hours ago", progress: 2 },
  { id: "ETH-2026-0112", title: "Unpaid salary claim", type: "Employment & wages", place: "Bole, Addis Ababa", status: "Appointment confirmed", proposals: 1, updated: "Updated yesterday", progress: 4 },
];

const lawyerOpenCases = [
  { title: "Boundary and title deed question", type: "Land & property", location: "Yeka, Addis Ababa", language: "Amharic", urgency: "Within a few weeks", posted: "12 min ago", proposals: 3 },
  { title: "Unpaid salary after dismissal", type: "Employment & wages", location: "Bole, Addis Ababa", language: "English", urgency: "Today or tomorrow", posted: "38 min ago", proposals: 2 },
  { title: "Child maintenance arrangement", type: "Family & divorce", location: "Kirkos, Addis Ababa", language: "Amharic", urgency: "Exploring options", posted: "1 hr ago", proposals: 1 },
];

const verificationQueue = [
  { id: "VR-2048", name: "Mekdes Tadesse", initials: "MT", title: "Family & child protection lawyer", submitted: "Today, 09:14", location: "Bole, Addis Ababa", documents: "4 / 4", risk: "Low", status: "Needs review", accent: "plum" },
  { id: "VR-2045", name: "Yonas Kebede", initials: "YK", title: "Commercial and tax lawyer", submitted: "Today, 08:42", location: "Kazanchis, Addis Ababa", documents: "3 / 4", risk: "Medium", status: "Needs review", accent: "blue" },
  { id: "VR-2041", name: "Rahel Worku", initials: "RW", title: "Land and property lawyer", submitted: "Yesterday, 16:28", location: "Piassa, Addis Ababa", documents: "4 / 4", risk: "Low", status: "Corrections requested", accent: "terracotta" },
  { id: "VR-2037", name: "Abel Girma", initials: "AG", title: "Criminal defense lawyer", submitted: "Yesterday, 14:06", location: "Mexico, Addis Ababa", documents: "4 / 4", risk: "Low", status: "Approved", accent: "forest" },
];

function ScaleIcon({ className }: { className?: string }) {
  return <span className={className} aria-hidden="true">⚖</span>;
}

function Logo() {
  return (
    <div className="brand-lockup">
      <div className="brand-mark">M.</div>
      <div>
        <div className="brand-name">Mahkama</div>
        <div className="brand-subtitle">legal help, made clearer</div>
      </div>
    </div>
  );
}

function Avatar({ initials, accent = "forest", size = "md" }: { initials: string; accent?: string; size?: "sm" | "md" | "lg" }) {
  return <div className={`avatar avatar-${size} avatar-${accent}`}>{initials}</div>;
}

function StatusPill({ children, tone = "green" }: { children: ReactNode; tone?: "green" | "amber" | "blue" | "neutral" | "red" }) {
  return <span className={`status-pill status-${tone}`}><span className="status-dot" />{children}</span>;
}

function SectionHeader({ eyebrow, title, action, onAction }: { eyebrow?: string; title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="section-header">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2>{title}</h2>
      </div>
      {action && <button className="text-button" type="button" onClick={onAction}>{action}<ChevronRight className="size-4" /></button>}
    </div>
  );
}

function Modal({ title, eyebrow, children, onClose }: { title: string; eyebrow?: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close"><X className="size-5" /></button>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

function Sidebar({ view, onNavigate, onCategories, onSwitchToLawyer, onSwitchToAdmin }: { view: View; onNavigate: (view: View) => void; onCategories: () => void; onSwitchToLawyer: () => void; onSwitchToAdmin: () => void }) {
  const nav = [
    { id: "home" as View, label: "Overview", icon: HomeIcon },
    { id: "case" as View, label: "My cases", icon: BriefcaseBusiness },
    { id: "lawyers" as View, label: "Find a lawyer", icon: Search },
    { id: "messages" as View, label: "Messages", icon: MessageCircle, count: 2 },
  ];
  return (
    <aside className="sidebar">
      <Logo />
      <div className="sidebar-label">Your workspace</div>
      <nav className="sidebar-nav" aria-label="Primary navigation">
        {nav.map(({ id, label, icon: NavIcon, count }) => (
          <button className={`nav-item ${view === id ? "nav-active" : ""}`} type="button" key={id} onClick={() => onNavigate(id)}>
            <NavIcon className="size-[18px]" /><span>{label}</span>{count && <span className="nav-count">{count}</span>}
          </button>
        ))}
        <button className="nav-item" type="button" onClick={onCategories}><LayoutGrid className="size-[18px]" /><span>Browse case types</span></button>
      </nav>
      <button className="role-switch" type="button" onClick={onSwitchToLawyer}><BriefcaseBusiness className="size-4" /><span><strong>Are you a lawyer?</strong><small>Open professional workspace</small></span><ArrowRight className="size-4 ml-auto" /></button>
      <button className="role-switch admin-role-switch" type="button" onClick={onSwitchToAdmin}><Gavel className="size-4" /><span><strong>Admin console</strong><small>Review trust & operations</small></span><ArrowRight className="size-4 ml-auto" /></button>
      <div className="sidebar-bottom">
        <div className="help-card">
          <div className="help-icon"><CircleHelp className="size-4" /></div>
          <div><strong>Need a little help?</strong><span>We explain the next step.</span></div>
          <ChevronRight className="size-4 ml-auto opacity-60" />
        </div>
        <button className={`profile-nav ${view === "profile" ? "profile-nav-active" : ""}`} type="button" onClick={() => onNavigate("profile")}>
          <Avatar initials="SA" accent="terracotta" size="sm" /><span><strong>Selamawit A.</strong><small>Client account</small></span><MoreHorizontal className="size-4 ml-auto opacity-50" />
        </button>
      </div>
    </aside>
  );
}

function Topbar({ view, language, onLanguage, onNotifications, onNavigate }: { view: View; language: "en" | "am"; onLanguage: () => void; onNotifications: () => void; onNavigate: (view: View) => void }) {
  const titles: Record<View, string> = { home: "Overview", intake: "Start a case", lawyers: "Find a lawyer", case: "Case details", messages: "Messages", profile: "Your profile", lawyer: "Professional workspace", admin: "Admin console" };
  return (
    <header className="topbar">
      <div className="mobile-brand"><Logo /></div>
      <div className="topbar-title"><div className="breadcrumb">Mahkama <ChevronRight className="size-3" /> {titles[view]}</div><h1>{titles[view]}</h1></div>
      <div className="topbar-actions">
        <div className="top-search"><Search className="size-4" /><input placeholder="Search cases or lawyers" onFocus={() => onNavigate("lawyers")} /><kbd>⌘ K</kbd></div>
        <button className="icon-button language-button" type="button" onClick={onLanguage} aria-label="Change language"><Languages className="size-[18px]" /><span>{language === "en" ? "EN" : "አማ"}</span></button>
        <button className="icon-button notification-button" type="button" onClick={onNotifications} aria-label="Open notifications"><Bell className="size-[18px]" /><span /></button>
        <button className="mobile-menu icon-button" type="button" aria-label="Open menu"><Menu className="size-5" /></button>
      </div>
    </header>
  );
}

function Dashboard({ onStart, onLawyers, onCase, onCategories, onSelectLawyer }: { onStart: (category?: string) => void; onLawyers: () => void; onCase: (id: string) => void; onCategories: () => void; onSelectLawyer: (lawyer: Lawyer) => void }) {
  return (
    <div className="content-wrap page-enter">
      <section className="hero-card">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="hero-kicker-dot" />A calmer way to find legal help</div>
          <h2>Start with what<br /><em>happened.</em></h2>
          <p>Tell us about your situation in your own words. We’ll help you explore relevant case types and compare verified legal professionals.</p>
          <div className="hero-actions"><button className="primary-button" type="button" onClick={() => onStart()}><Sparkles className="size-4" /> Start a case <ArrowRight className="size-4" /></button><button className="ghost-light-button" type="button" onClick={onLawyers}>Browse lawyers</button></div>
          <div className="hero-note"><LockKeyhole className="size-3.5" /> Your case stays private until you choose to connect</div>
        </div>
        <div className="hero-visual" aria-hidden="true"><div className="arch arch-one" /><div className="arch arch-two" /><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-seal"><div className="seal-mark">M.</div><span>እርዳታ</span><small>clearer next steps</small></div><div className="hero-stamp">EST.<br /><strong>2026</strong></div></div>
      </section>

      <div className="trust-strip"><div className="trust-item"><ShieldCheck className="size-4" /><span><strong>Verified professionals</strong> reviewed before joining</span></div><div className="trust-divider" /><div className="trust-item"><LockKeyhole className="size-4" /><span><strong>Private by design</strong> you control what you share</span></div><div className="trust-divider" /><div className="trust-item"><Languages className="size-4" /><span><strong>Local language</strong> English & Amharic support</span></div></div>

      <div className="dashboard-grid">
        <section className="dashboard-main"><SectionHeader eyebrow="In motion" title="Your active cases" action="View all cases" onAction={() => onCase(activeCases[0].id)} /><div className="case-list">{activeCases.map((item, index) => <CaseCard key={item.id} item={item} onOpen={() => onCase(item.id)} featured={index === 0} />)}</div></section>
        <aside className="dashboard-aside"><div className="mini-panel appointment-panel"><div className="panel-topline"><div className="eyebrow">Next up</div><CalendarDays className="size-4 text-[#B85F45]" /></div><h3>Consultation with<br />Abebe & Partners</h3><div className="appointment-date"><div className="date-box"><strong>18</strong><span>OCT</span></div><div><strong>Friday, 10:30 AM</strong><span>Video consultation · 30 min</span></div></div><button className="outline-button full-width" type="button" onClick={() => onCase(activeCases[1].id)}>View appointment <ArrowRight className="size-4" /></button></div><div className="mini-panel note-panel"><div className="note-icon"><Bell className="size-4" /></div><div><strong>One thing to know</strong><p>Mahkama helps you find a professional. It does not provide legal advice or promise an outcome.</p><button className="inline-link" type="button">Read our promise <ArrowRight className="size-3.5" /></button></div></div></aside>
      </div>

      <section className="category-section"><SectionHeader eyebrow="Where can we help?" title="Common case types in Ethiopia" action="See all categories" onAction={onCategories} /><div className="category-grid">{categories.slice(0, 8).map((category) => <CategoryCard category={category} key={category.id} onClick={() => onStart(category.id)} />)}</div></section>

      <section className="lawyer-section"><SectionHeader eyebrow="A few starting points" title="Professionals you may want to compare" action="See all lawyers" onAction={onLawyers} /><div className="lawyer-grid">{lawyers.slice(0, 3).map((lawyer) => <LawyerCard lawyer={lawyer} key={lawyer.id} onClick={() => onSelectLawyer(lawyer)} />)}</div></section>
      <div className="footer-note"><span>Not sure what your case type is?</span><button type="button" onClick={() => onStart()}>Describe it in your own words <ArrowRight className="size-4" /></button></div>
    </div>
  );
}

function CaseCard({ item, onOpen, featured }: { item: (typeof activeCases)[number]; onOpen: () => void; featured?: boolean }) {
  return <button type="button" className={`case-card ${featured ? "case-card-featured" : ""}`} onClick={onOpen}><div className="case-card-top"><div className={`case-icon ${featured ? "case-icon-active" : ""}`}><Landmark className="size-[18px]" /></div><div className="case-card-actions"><StatusPill tone={item.progress > 3 ? "blue" : "amber"}>{item.status}</StatusPill><MoreHorizontal className="size-4 opacity-45" /></div></div><div className="case-card-body"><div className="eyebrow">{item.type} <span>·</span> {item.place}</div><h3>{item.title}</h3><p>{item.updated}</p></div><div className="case-card-bottom"><div className="progress-steps"><span className="step-done" /><span className="step-done" /><span className={item.progress > 2 ? "step-done" : "step-current"} /><span className={item.progress > 3 ? "step-done" : "step-empty"} /><span className="step-empty" /></div><span className="proposal-count">{item.proposals} {item.proposals === 1 ? "proposal" : "proposals"}<ChevronRight className="size-4" /></span></div></button>;
}

function CategoryCard({ category, onClick, compact = false }: { category: Category; onClick: () => void; compact?: boolean }) {
  const CategoryIcon = category.icon;
  return <button type="button" className={`category-card category-${category.tint} ${compact ? "category-card-compact" : ""}`} onClick={onClick}><div className="category-icon"><CategoryIcon className="size-[18px]" /></div><div className="category-label"><strong>{category.label}</strong><span>{category.amh}</span>{!compact && <small>{category.description}</small>}</div><ChevronRight className="size-4 category-arrow" /></button>;
}

function LawyerCard({ lawyer, onClick, compact = false }: { lawyer: Lawyer; onClick: () => void; compact?: boolean }) {
  return <button type="button" className={`lawyer-card ${compact ? "lawyer-card-compact" : ""}`} onClick={onClick}><div className="lawyer-card-head"><Avatar initials={lawyer.initials} accent={lawyer.accent} size={compact ? "sm" : "md"} /><div className="lawyer-identity"><div className="lawyer-name-row"><strong>{lawyer.name}</strong><span className="verified-mini"><Check className="size-3" /></span></div><span>{lawyer.title}</span></div><MoreHorizontal className="size-4 opacity-35 ml-auto" /></div><div className="lawyer-meta"><span><MapPin className="size-3.5" />{lawyer.location}</span><span><BriefcaseBusiness className="size-3.5" />{lawyer.years} years</span></div><div className="lawyer-tags">{lawyer.specialties.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}<span>+{lawyer.specialties.length - 2}</span></div><div className="lawyer-card-foot"><span className="rating"><Star className="size-3.5 fill-current" /> {lawyer.rating} <small>({lawyer.reviews})</small></span><span className="lawyer-price">{lawyer.price}</span></div>{!compact && <div className="lawyer-fit"><Sparkles className="size-3.5" /><span>{lawyer.fit}</span></div>}</button>;
}

function Intake({ selectedType, setSelectedType, step, setStep, onBack, onComplete }: { selectedType: string; setSelectedType: (id: string) => void; step: number; setStep: (step: number) => void; onBack: () => void; onComplete: () => void }) {
  const selectedCategory = categories.find((category) => category.id === selectedType) ?? categories[0];
  const [place, setPlace] = useState("Addis Ababa");
  const [language, setLanguage] = useState("Amharic");
  const [urgency, setUrgency] = useState("Within a few weeks");
  const [description, setDescription] = useState("I need help understanding the boundary shown on our family property deed.");
  const choices = ["Addis Ababa", "Oromia", "Amhara", "Dire Dawa", "Tigray", "Somewhere else"];
  const languages = ["Amharic", "English", "Afaan Oromo", "Tigrinya"];
  const urgencies = ["Today or tomorrow", "Within a few weeks", "I’m exploring options"];
  return <div className="content-wrap intake-wrap page-enter"><button className="back-link" type="button" onClick={onBack}><ArrowLeft className="size-4" /> Back to overview</button><div className="intake-heading"><div><div className="eyebrow">A few simple questions</div><h2>Let’s understand what’s going on.</h2><p>You don’t need to know the legal term. Start in your own words and keep details general for now.</p></div><div className="intake-private"><LockKeyhole className="size-4" /><span><strong>Private first</strong><small>You decide what to share</small></span></div></div><div className="intake-stepper">{["Case type", "Where", "A little more", "Review"].map((label, index) => <div className={`intake-step ${step === index + 1 ? "intake-step-active" : ""} ${step > index + 1 ? "intake-step-done" : ""}`} key={label}><span>{step > index + 1 ? <Check className="size-3.5" /> : index + 1}</span>{label}</div>)}</div><div className="intake-card">{step === 1 && <div className="intake-panel"><div className="panel-intro"><div className="step-count">01</div><div><h3>What is your legal issue about?</h3><p>Choose the closest description. You can always change it later.</p></div></div><div className="intake-category-grid">{categories.map((category) => <button className={`intake-category-option ${selectedType === category.id ? "selected" : ""}`} type="button" onClick={() => setSelectedType(category.id)} key={category.id}><span className={`option-icon option-${category.tint}`}><category.icon className="size-[17px]" /></span><span><strong>{category.label}</strong><small>{category.amh}</small></span>{selectedType === category.id && <span className="selected-check"><Check className="size-3.5" /></span>}</button>)}</div></div>}{step === 2 && <div className="intake-panel narrow-panel"><div className="panel-intro"><div className="step-count">02</div><div><h3>Where did this happen?</h3><p>Location helps us show professionals who can meet or work in your area.</p></div></div><div className="choice-list">{choices.map((choice) => <button type="button" className={`choice-row ${place === choice ? "selected" : ""}`} onClick={() => setPlace(choice)} key={choice}><MapPin className="size-4" /><span>{choice}</span>{place === choice && <Check className="size-4 ml-auto" />}</button>)}</div><div className="field-note"><Globe2 className="size-4" /><span>For this demo, we’re starting in Addis Ababa and showing how the marketplace can grow across Ethiopia.</span></div></div>}{step === 3 && <div className="intake-panel narrow-panel"><div className="panel-intro"><div className="step-count">03</div><div><h3>Tell us a little more</h3><p>These details help us surface relevant experience and language support.</p></div></div><label className="form-label">Preferred language<div className="segmented-control">{languages.map((item) => <button className={language === item ? "selected" : ""} type="button" onClick={() => setLanguage(item)} key={item}>{item}</button>)}</div></label><label className="form-label">How soon do you need help?<div className="segmented-control stacked-mobile">{urgencies.map((item) => <button className={urgency === item ? "selected" : ""} type="button" onClick={() => setUrgency(item)} key={item}>{item}</button>)}</div></label><label className="form-label">In your own words<textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={4} placeholder="What happened? You can keep names and exact addresses out for now." /></label></div>}{step === 4 && <div className="intake-panel narrow-panel"><div className="panel-intro"><div className="step-count">04</div><div><h3>Check your starting point</h3><p>We’ll use this to show suggestions. You stay in control of who you contact.</p></div></div><div className="review-block"><span>Case type</span><strong>{selectedCategory.label}</strong><small>{selectedCategory.amh}</small></div><div className="review-block"><span>Location</span><strong>{place}</strong><small>Professionals who serve this area</small></div><div className="review-block"><span>Language & timing</span><strong>{language} · {urgency}</strong><small>Preferences can be changed later</small></div><div className="review-quote"><Sparkles className="size-4" /><p>We will show potential matches based on your answers. This is not legal advice and no outcome is guaranteed.</p></div></div>}<div className="intake-footer"><div className="intake-progress-text">Step {step} of 4 <span>·</span> Takes about 2 minutes</div><div className="intake-actions">{step > 1 && <button className="outline-button" type="button" onClick={() => setStep(step - 1)}>Back</button>}{step < 4 ? <button className="primary-button" type="button" onClick={() => setStep(step + 1)}>Continue <ArrowRight className="size-4" /></button> : <button className="primary-button" type="button" onClick={onComplete}>See potential matches <ArrowRight className="size-4" /></button>}</div></div></div></div>;
}

function Matches({ selectedType, searchTerm, setSearchTerm, onBack, onSelect }: { selectedType: string; searchTerm: string; setSearchTerm: (value: string) => void; onBack: () => void; onSelect: (lawyer: Lawyer) => void }) {
  const category = categories.find((item) => item.id === selectedType) ?? categories[0];
  const filtered = useMemo(() => lawyers.filter((lawyer) => `${lawyer.name} ${lawyer.title} ${lawyer.specialties.join(" ")} ${lawyer.languages.join(" ")}`.toLowerCase().includes(searchTerm.toLowerCase())), [searchTerm]);
  return <div className="content-wrap page-enter"><div className="matches-top"><button className="back-link" type="button" onClick={onBack}><ArrowLeft className="size-4" /> Edit your case</button><div className="match-reference">Case reference <strong>ETH-2026-0194</strong></div></div><div className="match-hero"><div><div className="eyebrow">Based on your answers · 6 suggestions</div><h2>Professionals who may fit<br />your <em>{category.label.toLowerCase()}</em> case</h2><p>Compare experience, availability and price range. You choose who to contact.</p></div><div className="match-summary"><div className="summary-icon"><Sparkles className="size-5" /></div><span><strong>Good starting point</strong><small>Property experience · Addis Ababa · Amharic</small></span></div></div><div className="matches-toolbar"><div className="match-search"><Search className="size-4" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search by name, area or language" /></div><button className="filter-button" type="button"><SlidersHorizontal className="size-4" /> Filters <span>2</span></button><button className="sort-button" type="button">Recommended <ChevronDown className="size-4" /></button></div><div className="matches-layout"><main><div className="results-count">{filtered.length} professionals to compare <span>·</span> Verified profiles only</div><div className="match-list">{filtered.map((lawyer, index) => <div className="match-row" key={lawyer.id}><div className="match-rank">{String(index + 1).padStart(2, "0")}</div><LawyerCard lawyer={lawyer} onClick={() => onSelect(lawyer)} /><button className="compare-button" type="button" onClick={() => onSelect(lawyer)}>View profile <ArrowRight className="size-4" /></button></div>)}</div>{filtered.length === 0 && <div className="empty-state"><Search className="size-7" /><h3>No exact matches yet</h3><p>Try a name, practice area or language.</p></div>}</main><aside className="matches-aside"><div className="compare-card"><div className="eyebrow">How matching works</div><h3>Suggestions, not promises.</h3><p>We use your answers to surface relevant profiles. You remain the decision-maker.</p><div className="match-rule"><Check className="size-3.5" /><span>Practice area & experience</span></div><div className="match-rule"><Check className="size-3.5" /><span>Location & language</span></div><div className="match-rule"><Check className="size-3.5" /><span>Availability & price range</span></div><button className="inline-link" type="button">Learn about verification <ArrowRight className="size-3.5" /></button></div><div className="quiet-card"><LockKeyhole className="size-4" /><div><strong>Your name stays private</strong><span>until you choose to connect</span></div></div></aside></div></div>;
}

function CaseDetail({ onBack, onLawyers, onSelectLawyer }: { onBack: () => void; onLawyers: () => void; onSelectLawyer: (lawyer: Lawyer) => void }) {
  return <div className="content-wrap page-enter"><button className="back-link" type="button" onClick={onBack}><ArrowLeft className="size-4" /> Back to overview</button><div className="case-detail-head"><div><div className="eyebrow">Case ETH-2026-0148 · Opened 16 Oct 2026</div><h2>Land boundary dispute</h2><p>Yeka, Addis Ababa <span>·</span> Property & civil matter</p></div><StatusPill tone="amber">Comparing lawyers</StatusPill></div><div className="detail-grid"><main><div className="timeline-card"><div className="timeline-heading"><div><div className="eyebrow">Your journey</div><h3>One clear next step at a time</h3></div><button className="icon-button" type="button"><MoreHorizontal className="size-4" /></button></div><div className="journey"><div className="journey-item complete"><span><Check className="size-3.5" /></span><div><strong>Case shared privately</strong><small>16 Oct · Your starting details are saved</small></div></div><div className="journey-item current"><span>2</span><div><strong>Compare professionals</strong><small>3 suggestions are ready for you</small></div></div><div className="journey-item"><span>3</span><div><strong>Choose who to contact</strong><small>Chat unlocks after you choose</small></div></div><div className="journey-item"><span>4</span><div><strong>Meet and review</strong><small>Appointment, payment and review</small></div></div></div></div><div className="proposal-header"><SectionHeader eyebrow="For this case" title="3 proposals to compare" action="Find more lawyers" onAction={onLawyers} /></div><div className="proposal-list">{lawyers.slice(0, 3).map((lawyer, index) => <div className="proposal-row" key={lawyer.id}><div className="proposal-number">0{index + 1}</div><Avatar initials={lawyer.initials} accent={lawyer.accent} size="sm" /><div className="proposal-main"><strong>{lawyer.name}</strong><span>{lawyer.title}</span><small><Star className="size-3 fill-current" /> {lawyer.rating} · {lawyer.years} years · {lawyer.response}</small></div><div className="proposal-price"><span>Consultation range</span><strong>{lawyer.price}</strong></div><button className="small-button" type="button" onClick={() => onSelectLawyer(lawyer)}>Compare <ArrowRight className="size-3.5" /></button></div>)}</div></main><aside className="detail-aside"><div className="case-info-card"><div className="eyebrow">Case snapshot</div><div className="snapshot-line"><span>Preferred language</span><strong>Amharic</strong></div><div className="snapshot-line"><span>Urgency</span><strong>Within a few weeks</strong></div><div className="snapshot-line"><span>Documents</span><strong>Not shared yet</strong></div><button className="outline-button full-width" type="button"><Paperclip className="size-4" /> Secure documents</button><p className="tiny-note"><LockKeyhole className="size-3" /> Only connected professionals can access case documents.</p></div><div className="case-help-card"><div className="note-icon"><CircleHelp className="size-4" /></div><strong>Questions about the process?</strong><p>We can explain how proposals, payment and private chat work.</p><button className="inline-link" type="button">Open support <ArrowRight className="size-3.5" /></button></div></aside></div></div>;
}

function Messages({ onLawyers }: { onLawyers: () => void }) {
  return <div className="content-wrap page-enter"><div className="messages-layout"><aside className="thread-list"><div className="thread-heading"><div><div className="eyebrow">Private workspace</div><h2>Messages</h2></div><button className="icon-button"><MoreHorizontal className="size-4" /></button></div><button className="thread-row thread-selected" type="button"><Avatar initials="LB" accent="forest" size="sm" /><span><strong>Lydia Bekele</strong><small>About your land case</small></span><b>2</b></button><button className="thread-row" type="button"><Avatar initials="AB" accent="blue" size="sm" /><span><strong>Abebe & Partners</strong><small>Appointment confirmed</small></span><time>Mon</time></button><div className="thread-empty"><MessageCircle className="size-5" /><span>Your messages unlock after you choose a professional.</span><button className="inline-link" type="button" onClick={onLawyers}>Find a lawyer <ArrowRight className="size-3.5" /></button></div></aside><section className="chat-panel"><div className="chat-head"><Avatar initials="LB" accent="forest" size="sm" /><div><strong>Lydia Bekele</strong><span><span className="online-dot" /> Replies in about 12 min · Verified</span></div><button className="icon-button ml-auto"><MoreHorizontal className="size-4" /></button></div><div className="chat-privacy"><LockKeyhole className="size-3.5" /> Private case chat · ETH-2026-0148</div><div className="chat-body"><div className="day-divider"><span>Today</span></div><div className="message-bubble lawyer-bubble">Hello — I’ve received your request about the boundary matter. I can share a few questions before we decide if a consultation is useful.<small>10:14 AM</small></div><div className="message-bubble user-bubble">Thank you. I’m not sure which document is most important to start with.</div><div className="message-bubble lawyer-bubble">A copy of the deed and the recent boundary map would be a helpful starting point. You can share them through the separate secure documents area, not here.<small>10:22 AM</small></div><div className="chat-system"><FileCheck2 className="size-4" /><span>Secure document exchange is available for this case</span><ChevronRight className="size-4 ml-auto" /></div></div><div className="chat-composer"><button className="icon-button"><Paperclip className="size-4" /></button><input placeholder="Write a message" /><button className="send-button"><Send className="size-4" /></button></div></section></div></div>;
}

function Profile() {
  return <div className="content-wrap page-enter"><div className="profile-head"><Avatar initials="SA" accent="terracotta" size="lg" /><div><div className="eyebrow">Client account</div><h2>Selamawit Alemu</h2><p>Member since October 2026 · Addis Ababa</p></div><button className="outline-button ml-auto" type="button">Edit profile</button></div><div className="profile-grid"><section className="profile-card"><SectionHeader eyebrow="Your preferences" title="What helps us help you" /><div className="preference-row"><Languages className="size-5" /><span><strong>Preferred language</strong><small>Amharic</small></span><ChevronRight className="size-4 ml-auto opacity-45" /></div><div className="preference-row"><MapPin className="size-5" /><span><strong>Usual location</strong><small>Addis Ababa</small></span><ChevronRight className="size-4 ml-auto opacity-45" /></div><div className="preference-row"><Bell className="size-5" /><span><strong>Notifications</strong><small>Case updates and messages</small></span><ChevronRight className="size-4 ml-auto opacity-45" /></div></section><section className="profile-card trust-profile"><div className="profile-trust-mark"><ShieldCheck className="size-5" /></div><div className="eyebrow">Our promise</div><h3>Clarity without pressure.</h3><p>Mahkama helps you find and work with legal professionals. It is not a law firm and does not give legal advice.</p><button className="inline-link" type="button">Read privacy promise <ArrowRight className="size-3.5" /></button></section></div></div>;
}

function AdminDashboard({ onClientView, onToast }: { onClientView: () => void; onToast: (message: string) => void }) {
  const [section, setSection] = useState<"reviews" | "cases" | "reports" | "finance">("reviews");
  const [selectedReview, setSelectedReview] = useState<(typeof verificationQueue)[number] | null>(null);
  const [statusById, setStatusById] = useState<Record<string, string>>({});
  const getStatus = (review: (typeof verificationQueue)[number]) => statusById[review.id] ?? review.status;
  const decide = (status: string) => {
    if (!selectedReview) return;
    setStatusById((current) => ({ ...current, [selectedReview.id]: status }));
    onToast(`${selectedReview.name}: ${status.toLowerCase()} recorded in the audit log.`);
    setSelectedReview(null);
  };
  const tabs = [{ id: "reviews" as const, label: "Verification queue", count: 7, icon: UserCheck }, { id: "cases" as const, label: "Cases & support", count: 9, icon: Gavel }, { id: "reports" as const, label: "Reports & safety", count: 3, icon: ShieldAlert }, { id: "finance" as const, label: "Payments & payouts", count: 4, icon: CircleDollarSign }];
  return <div className="content-wrap admin-workspace page-enter"><div className="admin-welcome"><div><div className="eyebrow">Mahkama operations · Admin only</div><h2>Trust is a workflow.</h2><p>Review professionals, protect clients and keep marketplace decisions accountable.</p></div><div className="admin-welcome-actions"><StatusPill tone="green"><ShieldCheck className="size-3.5" /> MFA enabled</StatusPill><button className="outline-button" type="button" onClick={onClientView}>View client side <ArrowRight className="size-4" /></button></div></div><div className="admin-stat-grid"><div className="admin-stat"><div className="admin-stat-icon"><UserCheck className="size-4" /></div><span>Pending reviews</span><strong>7</strong><small>Oldest waiting 18h</small></div><div className="admin-stat"><div className="admin-stat-icon"><UsersRound className="size-4" /></div><span>Active professionals</span><strong>112</strong><small>96% verified this month</small></div><div className="admin-stat"><div className="admin-stat-icon"><MessageCircle className="size-4" /></div><span>Open support & disputes</span><strong>9</strong><small>2 need escalation</small></div><div className="admin-stat"><div className="admin-stat-icon"><CircleDollarSign className="size-4" /></div><span>Held payouts</span><strong>ETB 18,400</strong><small>Awaiting completion checks</small></div></div><div className="admin-tabs" role="tablist">{tabs.map(({ id, label, count, icon: TabIcon }) => <button key={id} type="button" className={section === id ? "admin-tab active" : "admin-tab"} onClick={() => setSection(id)}><TabIcon className="size-4" /><span>{label}</span><b>{count}</b></button>)}</div>{section === "reviews" && <div className="admin-review-layout"><main className="admin-panel"><div className="admin-panel-header"><div><div className="eyebrow">Human review required</div><h3>Lawyer verification queue</h3><p>Check credentials before a professional can appear in client matching.</p></div><button className="filter-button" type="button"><SlidersHorizontal className="size-4" /> Filter</button></div><div className="review-list">{verificationQueue.map((review) => <button className="review-row" type="button" key={review.id} onClick={() => setSelectedReview(review)}><Avatar initials={review.initials} accent={review.accent} size="sm" /><div className="review-person"><strong>{review.name}</strong><span>{review.title}</span><small>{review.location} · Submitted {review.submitted}</small></div><div className="review-docs"><FileText className="size-3.5" /> {review.documents} docs</div><StatusPill tone={getStatus(review) === "Approved" ? "green" : getStatus(review) === "Corrections requested" ? "amber" : "blue"}>{getStatus(review)}</StatusPill><ChevronRight className="size-4 opacity-40" /></button>)}</div></main><aside className="admin-side-stack"><div className="admin-side-card"><div className="side-card-icon"><ShieldCheck className="size-4" /></div><div className="eyebrow">Approval guardrails</div><h3>Two-person trust check.</h3><p>Every approval records the reviewer, timestamp, decision reason and document set. A second reviewer is required for high-risk cases.</p><div className="audit-line"><History className="size-3.5" /><span>Last audit: 8 minutes ago</span></div></div><div className="admin-side-card audit-card"><div className="panel-topline"><div className="eyebrow">Recent audit activity</div><History className="size-4" /></div><div className="audit-event"><span className="audit-dot green" /><div><strong>Abel Girma approved</strong><small>by Hana M. · 14:06 yesterday</small></div></div><div className="audit-event"><span className="audit-dot amber" /><div><strong>Rahel requested corrections</strong><small>by Hana M. · 16:31 yesterday</small></div></div><button className="inline-link" type="button" onClick={() => onToast("Full audit log requires an admin permission check in production.")}>View full audit log <ArrowRight className="size-3.5" /></button></div></aside></div>}{section === "cases" && <div className="admin-two-column"><section className="admin-panel"><div className="admin-panel-header"><div><div className="eyebrow">Client protection</div><h3>Cases, support and disputes</h3><p>Keep sensitive escalations separate from ordinary case matching.</p></div><StatusPill tone="red">2 urgent</StatusPill></div><div className="support-case"><div className="support-badge red"><ShieldAlert className="size-4" /></div><div><strong>Safety concern · Case ETH-2026-0182</strong><span>Client requested a private callback after a domestic violence intake.</span><small>Assigned to: Safety support · 22 min ago</small></div><button className="small-button" type="button" onClick={() => onToast("Safety case opened in the protected support queue.")}>Open safely <ArrowRight className="size-3.5" /></button></div><div className="support-case"><div className="support-badge amber"><MessageCircle className="size-4" /></div><div><strong>Client reports no response</strong><span>Lawyer has not replied within the stated response window.</span><small>Assigned to: Support operations · 1 hr ago</small></div><button className="small-button" type="button" onClick={() => onToast("Support ticket assigned to an operations reviewer.")}>Assign <ArrowRight className="size-3.5" /></button></div><div className="support-case"><div className="support-badge blue"><Gavel className="size-4" /></div><div><strong>Fee disagreement · Case ETH-2026-0148</strong><span>Client and lawyer asked Mahkama to clarify the consultation price range.</span><small>Assigned to: Dispute resolution · 3 hr ago</small></div><button className="small-button" type="button" onClick={() => onToast("Dispute record opened with both parties protected.")}>Review <ArrowRight className="size-3.5" /></button></div></section><section className="admin-panel policy-card"><div className="side-card-icon"><LockKeyhole className="size-4" /></div><div className="eyebrow">Privacy controls</div><h3>Admin access is scoped.</h3><p>Support operators see only the minimum case metadata. Verification reviewers see professional documents, not client case details.</p><div className="permission-row"><Check className="size-3.5" /><span>Role-based access</span></div><div className="permission-row"><Check className="size-3.5" /><span>Protected document links</span></div><div className="permission-row"><Check className="size-3.5" /><span>Every action in audit history</span></div></section></div>}{section === "reports" && <div className="admin-two-column"><section className="admin-panel"><div className="admin-panel-header"><div><div className="eyebrow">Moderation & safety</div><h3>Reports needing attention</h3><p>Resolve reports without exposing private case content unnecessarily.</p></div></div><div className="support-case"><div className="support-badge red"><ShieldAlert className="size-4" /></div><div><strong>Potential misleading profile claim</strong><span>Client report: experience description may be overstated.</span><small>Professional: Dawit Alemu · 1 hr ago</small></div><button className="small-button" type="button" onClick={() => onToast("Profile report assigned to moderation.")}>Moderate</button></div><div className="support-case"><div className="support-badge amber"><MessageCircle className="size-4" /></div><div><strong>Review language complaint</strong><span>Review may include personal information.</span><small>Case completed · 4 hr ago</small></div><button className="small-button" type="button" onClick={() => onToast("Review hidden pending moderation decision.")}>Hide review</button></div></section><section className="admin-panel policy-card"><div className="side-card-icon"><ShieldCheck className="size-4" /></div><div className="eyebrow">Safety-first policy</div><h3>No outcome promises.</h3><p>Admin moderation checks for guarantees, discriminatory language, unsafe requests and private data exposure.</p><button className="outline-button full-width" type="button" onClick={() => onToast("Moderation policy opened.")}>Open moderation policy</button></section></div>}{section === "finance" && <div className="admin-two-column"><section className="admin-panel"><div className="admin-panel-header"><div><div className="eyebrow">Chapa operations</div><h3>Payments and payouts</h3><p>Production will connect this view to Chapa webhooks and a reconciliation ledger.</p></div><StatusPill tone="amber">Demo data</StatusPill></div><div className="finance-row"><div className="finance-icon"><CircleDollarSign className="size-4" /></div><div><strong>Consultation payment · ETH-2026-0112</strong><span>ETB 1,800 · Chapa reference CH-48192</span></div><StatusPill tone="green">Captured</StatusPill></div><div className="finance-row"><div className="finance-icon"><WalletCards className="size-4" /></div><div><strong>Lawyer payout · Abebe & Partners</strong><span>ETB 1,530 net · Release after completion</span></div><StatusPill tone="amber">Held</StatusPill></div><div className="finance-row"><div className="finance-icon"><CircleDollarSign className="size-4" /></div><div><strong>Registration fee · VR-2037</strong><span>ETB 500 · Lawyer activation requirement</span></div><StatusPill tone="blue">Awaiting</StatusPill></div></section><section className="admin-panel policy-card"><div className="side-card-icon"><FileText className="size-4" /></div><div className="eyebrow">Finance controls</div><h3>Reconcile before release.</h3><p>Every payment needs a provider reference, internal status, commission entry and payout decision before it reaches a lawyer.</p><button className="outline-button full-width" type="button" onClick={() => onToast("Reconciliation export prepared for finance review.")}>Export reconciliation</button></section></div>}{selectedReview && <Modal eyebrow={`Verification ${selectedReview.id} · ${getStatus(selectedReview)}`} title={`Review ${selectedReview.name}`} onClose={() => setSelectedReview(null)}><div className="review-modal-person"><Avatar initials={selectedReview.initials} accent={selectedReview.accent} size="lg" /><div><strong>{selectedReview.title}</strong><span>{selectedReview.location}</span><small>Submitted {selectedReview.submitted} · Risk flag: {selectedReview.risk}</small></div></div><div className="document-review-list"><div className="document-review-row"><FileText className="size-4" /><div><strong>Professional license</strong><span>PDF · uploaded today · expiry checked</span></div><button className="icon-button" type="button" onClick={() => onToast("License preview opened in a protected viewer.")}><Eye className="size-4" /></button></div><div className="document-review-row"><FileText className="size-4" /><div><strong>Bar association credential</strong><span>PDF · uploaded today · name matched</span></div><button className="icon-button" type="button" onClick={() => onToast("Credential preview opened in a protected viewer.")}><Eye className="size-4" /></button></div><div className="document-review-row"><FileText className="size-4" /><div><strong>Practice and language declaration</strong><span>Form · {selectedReview.documents} complete</span></div><button className="icon-button" type="button" onClick={() => onToast("Declaration details opened.")}><Eye className="size-4" /></button></div></div><div className="review-note"><ShieldCheck className="size-4" /><span>Approve only when the professional identity, license and scope of practice are consistent. Approval does not guarantee legal outcomes.</span></div><div className="modal-actions"><button className="outline-button" type="button" onClick={() => decide("Corrections requested")}>Request corrections</button><button className="danger-button" type="button" onClick={() => decide("Rejected")}>Reject</button><button className="primary-button" type="button" onClick={() => decide("Approved")}>Approve lawyer <Check className="size-4" /></button></div></Modal>}</div>;
}

function LawyerDashboard({ onClientView, onToast }: { onClientView: () => void; onToast: (message: string) => void }) {
  return <div className="content-wrap lawyer-workspace page-enter"><div className="lawyer-welcome"><div className="lawyer-welcome-copy"><div className="eyebrow">Professional workspace</div><h2>Good morning, Lydia.</h2><p>Here are the client matters and next steps that need your attention.</p></div><div className="lawyer-welcome-actions"><StatusPill tone="green"><CheckCircle2 className="size-3.5" /> Verified profile</StatusPill><button className="outline-button" type="button" onClick={onClientView}>View client side <ArrowRight className="size-4" /></button></div></div><div className="lawyer-stat-grid"><div className="lawyer-stat"><div className="stat-icon stat-sage"><ClipboardList className="size-4" /></div><span>New case leads</span><strong>12</strong><small><TrendingUp className="size-3" /> 4 since yesterday</small></div><div className="lawyer-stat"><div className="stat-icon stat-blue"><UsersRound className="size-4" /></div><span>Active clients</span><strong>8</strong><small>2 appointments this week</small></div><div className="lawyer-stat"><div className="stat-icon stat-gold"><CircleDollarSign className="size-4" /></div><span>October earnings</span><strong>ETB 42,600</strong><small>Net of platform commission</small></div><div className="lawyer-stat"><div className="stat-icon stat-terracotta"><Zap className="size-4" /></div><span>Response rate</span><strong>94%</strong><small>Top 20% in your area</small></div></div><div className="lawyer-grid-layout"><main><div className="section-header"><div><div className="eyebrow">Fresh opportunities</div><h2>Case leads that may fit your practice</h2></div><button className="filter-button" type="button"><SlidersHorizontal className="size-4" /> Filter leads</button></div><div className="lead-list">{lawyerOpenCases.map((lead) => <div className="lead-card" key={lead.title}><div className="lead-card-top"><div><StatusPill tone={lead.urgency === "Today or tomorrow" ? "red" : "amber"}>{lead.urgency}</StatusPill><div className="eyebrow lead-type">{lead.type} · {lead.location}</div></div><span className="lead-time">{lead.posted}</span></div><h3>{lead.title}</h3><div className="lead-meta"><span><Languages className="size-3.5" /> {lead.language}</span><span><LockKeyhole className="size-3.5" /> Client name hidden</span><span>{lead.proposals} proposals so far</span></div><div className="lead-card-footer"><span>Share a price range and a short note to express interest.</span><button className="small-button" type="button" onClick={() => onToast(`Proposal draft started for “${lead.title}”.`)}>Send a proposal <ArrowRight className="size-3.5" /></button></div></div>)}</div></main><aside className="lawyer-aside"><div className="verification-panel"><div className="verification-seal"><ShieldCheck className="size-5" /></div><div className="eyebrow">Profile trust</div><h3>You’re ready to match.</h3><p>Your license and bar credential were reviewed by Mahkama.</p><div className="verification-line"><Check className="size-3.5" /><span>License verified</span></div><div className="verification-line"><Check className="size-3.5" /><span>Identity reviewed offline</span></div><button className="inline-link" type="button">Manage verification <ArrowRight className="size-3.5" /></button></div><div className="earnings-panel"><div className="panel-topline"><div className="eyebrow">Payout overview</div><WalletCards className="size-4" /></div><h3>ETB 42,600</h3><p>Available after client confirmations</p><div className="earnings-bar"><span /></div><div className="earnings-foot"><span>This month</span><strong>+18.4%</strong></div></div></aside></div><section className="lawyer-lower-grid"><div className="proposal-panel"><SectionHeader eyebrow="In progress" title="Your proposals" action="View all" /><div className="proposal-mini-row"><Avatar initials="SA" accent="terracotta" size="sm" /><div><strong>Unpaid salary claim</strong><span>Selamawit A. · Sent 2 hours ago</span></div><StatusPill tone="amber">Awaiting reply</StatusPill></div><div className="proposal-mini-row"><Avatar initials="DM" accent="blue" size="sm" /><div><strong>Commercial contract review</strong><span>Dawit M. · Client viewed</span></div><StatusPill tone="green">Shortlisted</StatusPill></div></div><div className="appointment-panel lawyer-appointment"><SectionHeader eyebrow="Your calendar" title="Next appointment" /><div className="lawyer-calendar-row"><div className="date-box"><strong>18</strong><span>OCT</span></div><div><strong>Consultation with Selamawit A.</strong><span>Friday, 10:30 AM · 30 min · Private case chat</span></div><ChevronRight className="size-4 ml-auto" /></div><button className="outline-button full-width" type="button" onClick={() => onToast("Calendar view opened for your appointments.")}><CalendarDays className="size-4" /> Open calendar</button></div></section></div>;
}

export default function Home() {
  const [view, setView] = useState<View>(() => window.location.pathname === "/lawyer" ? "lawyer" : window.location.pathname === "/admin" ? "admin" : "home");
  const [selectedType, setSelectedType] = useState("property");
  const [intakeStep, setIntakeStep] = useState(1);
  const [language, setLanguage] = useState<"en" | "am">("en");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [toast, setToast] = useState("");

  const navigate = (nextView: View) => {
    setView(nextView);
    setNotificationsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startCase = (category?: string) => {
    if (category) setSelectedType(category);
    setIntakeStep(1);
    navigate("intake");
  };

  const completeIntake = () => {
    setToast("Your case is ready — here are potential matches.");
    navigate("lawyers");
  };

  const openLawyer = (lawyer: Lawyer) => setSelectedLawyer(lawyer);

  return <div className="app-shell"><Sidebar view={view} onNavigate={navigate} onCategories={() => setCategoriesOpen(true)} onSwitchToLawyer={() => navigate("lawyer")} onSwitchToAdmin={() => navigate("admin")} /><div className="main-shell"><Topbar view={view} language={language} onLanguage={() => setLanguage(language === "en" ? "am" : "en")} onNotifications={() => setNotificationsOpen((open) => !open)} onNavigate={navigate} />{notificationsOpen && <div className="notification-popover"><div className="notification-head"><strong>Notifications</strong><span>2 new</span></div><div className="notification-item"><div className="notification-dot amber-dot" /><div><strong>3 lawyer proposals</strong><span>Your land case has new suggestions.</span></div><time>2h</time></div><div className="notification-item"><div className="notification-dot blue-dot" /><div><strong>Appointment confirmed</strong><span>Abebe & Partners · Friday, 10:30 AM</span></div><time>1d</time></div><button className="inline-link" type="button" onClick={() => navigate("case")}>See case updates <ArrowRight className="size-3.5" /></button></div>}<main className="main-content">{view === "home" && <Dashboard onStart={startCase} onLawyers={() => navigate("lawyers")} onCase={() => navigate("case")} onCategories={() => setCategoriesOpen(true)} onSelectLawyer={openLawyer} />}{view === "intake" && <Intake selectedType={selectedType} setSelectedType={setSelectedType} step={intakeStep} setStep={setIntakeStep} onBack={() => navigate("home")} onComplete={completeIntake} />}{view === "lawyers" && <Matches selectedType={selectedType} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onBack={() => navigate("home")} onSelect={openLawyer} />}{view === "case" && <CaseDetail onBack={() => navigate("home")} onLawyers={() => navigate("lawyers")} onSelectLawyer={openLawyer} />}{view === "messages" && <Messages onLawyers={() => navigate("lawyers")} />}{view === "profile" && <Profile />}{view === "lawyer" && <LawyerDashboard onClientView={() => navigate("home")} onToast={setToast} />}{view === "admin" && <AdminDashboard onClientView={() => navigate("home")} onToast={setToast} />}</main></div>{categoriesOpen && <Modal eyebrow="Explore legal help" title="What kind of help are you looking for?" onClose={() => setCategoriesOpen(false)}><p className="modal-lede">You do not need to know the correct legal category. Pick a close starting point, or describe what happened in your own words.</p><div className="modal-category-grid">{categories.map((category) => <CategoryCard key={category.id} category={category} compact onClick={() => { setCategoriesOpen(false); startCase(category.id); }} />)}</div><button className="outline-button full-width modal-describe" type="button" onClick={() => { setCategoriesOpen(false); startCase(); }}><Sparkles className="size-4" /> I’m not sure — let me describe it</button></Modal>}{selectedLawyer && <Modal eyebrow="Potential match · Verified profile" title={selectedLawyer.name} onClose={() => setSelectedLawyer(null)}><div className="lawyer-modal-head"><Avatar initials={selectedLawyer.initials} accent={selectedLawyer.accent} size="lg" /><div><strong>{selectedLawyer.title}</strong><span><MapPin className="size-3.5" />{selectedLawyer.location}</span><span><Check className="size-3.5" />Verified by Mahkama</span></div></div><div className="modal-stat-row"><div><span>Experience</span><strong>{selectedLawyer.years} years</strong></div><div><span>Rating</span><strong><Star className="size-3.5 fill-current" /> {selectedLawyer.rating} <small>({selectedLawyer.reviews})</small></strong></div><div><span>Consultation</span><strong>{selectedLawyer.price}</strong></div></div><div className="modal-section"><div className="eyebrow">Why this may fit</div><p>{selectedLawyer.fit}. {selectedLawyer.response}.</p><div className="lawyer-tags">{selectedLawyer.specialties.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="modal-next-step"><div className="modal-next-icon"><LockKeyhole className="size-4" /></div><div><strong>Private next step</strong><span>Selecting a professional opens a private chat and secure document area. You’ll see the Chapa payment step before any consultation is confirmed.</span></div></div><div className="modal-actions"><button className="outline-button" type="button" onClick={() => setSelectedLawyer(null)}>Keep comparing</button><button className="primary-button" type="button" onClick={() => { setSelectedLawyer(null); setToast(`${selectedLawyer.name} is saved for comparison.`); navigate("case"); }}>Save for this case <ArrowRight className="size-4" /></button></div></Modal>}{toast && <div className="toast-message"><Check className="size-4" /><span>{toast}</span><button type="button" onClick={() => setToast("")}><X className="size-3.5" /></button></div>}</div>;
}
