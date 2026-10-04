import React, { useState, useMemo } from 'react';
import {
  Search,
  Download,
  BookOpen,
  ArrowRight,
  Compass,
  Bookmark,
  Check,
  ShieldCheck,
  Sliders,
  X,
  FileText,
  Sparkles,
  Trash2,
} from 'lucide-react';
import {
  TIMELINE_ERAS,
  FOUNDATIONAL_THINKERS,
  COMPARISON_MATRIX,
  SOCIOLOGY_BRANCHES,
  TEN_CORE_POINTS,
  CAREER_PATHWAYS,
  STUDY_RESOURCES,
  StudyResource,
  Thinker,
} from './data/sociologyData';
import { SocioAIAssistant } from './components/SocioAIAssistant';

// Import generated high-resolution editorial visuals
import heroSociosphereImg from './assets/images/hero_sociosphere_hub_1791092978047.jpg';
import diagramStructuresImg from './assets/images/diagram_social_structures_1791092990083.jpg';
import urbanSociologyImg from './assets/images/editorial_urban_sociology_1791093002440.jpg';
import digitalSocietyImg from './assets/images/editorial_digital_society_1791093012335.jpg';

interface SavedFieldNote {
  id: string;
  title: string;
  content: string;
  savedAt: string;
}

export default function App() {
  // Interactive state for Foundations section
  const [selectedEraId, setSelectedEraId] = useState<string>(TIMELINE_ERAS[0].id);
  const [thinkerFilter, setThinkerFilter] = useState<string>('All');
  const [activeThinkerModal, setActiveThinkerModal] = useState<Thinker | null>(null);
  const [comparisonFilter, setComparisonFilter] = useState<string>('All');

  // Interactive state for Deep Dive & Scope section
  const [branchScaleFilter, setBranchScaleFilter] = useState<string>('All');
  const [selectedBranchId, setSelectedBranchId] = useState<string>(SOCIOLOGY_BRANCHES[0].id);
  const [activeCorePointIndex, setActiveCorePointIndex] = useState<number>(0);

  // Interactive Micro-to-Macro Solidarity & Stratification Simulator
  const [civicInvestmentLevel, setCivicInvestmentLevel] = useState<number>(68);
  const [socialTrustIndex, setSocialTrustIndex] = useState<number>(72);

  // Interactive state for Career Hub & Downloadable Resources
  const [careerPillarFilter, setCareerPillarFilter] = useState<string>('All');
  const [resourceFormatFilter, setResourceFormatFilter] = useState<string>('All');
  const [previewResource, setPreviewResource] = useState<StudyResource | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<Record<string, boolean>>({});

  // Global Search & Study Notebook Drawer
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [externalAiPrompt, setExternalAiPrompt] = useState<string | null>(null);

  // Privacy Consent & LocalStorage Persistence for Field Notes
  const [storageConsentGranted, setStorageConsentGranted] = useState<boolean>(false);
  const [isConsentModalOpen, setIsConsentModalOpen] = useState<boolean>(false);
  const [pendingNoteToSave, setPendingNoteToSave] = useState<{ title: string; content: string } | null>(null);
  const [savedNotes, setSavedNotes] = useState<SavedFieldNote[]>([]);
  const [isNotebookOpen, setIsNotebookOpen] = useState<boolean>(false);

  // Image fallback states
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const selectedEra = useMemo(
    () => TIMELINE_ERAS.find((e) => e.id === selectedEraId) || TIMELINE_ERAS[0],
    [selectedEraId]
  );

  const filteredThinkers = useMemo(() => {
    if (thinkerFilter === 'All') return FOUNDATIONAL_THINKERS;
    return FOUNDATIONAL_THINKERS.filter((t) => t.tradition === thinkerFilter);
  }, [thinkerFilter]);

  const filteredComparison = useMemo(() => {
    if (comparisonFilter === 'All') return COMPARISON_MATRIX;
    return COMPARISON_MATRIX.filter((c) => c.category === comparisonFilter);
  }, [comparisonFilter]);

  const filteredBranches = useMemo(() => {
    if (branchScaleFilter === 'All') return SOCIOLOGY_BRANCHES;
    return SOCIOLOGY_BRANCHES.filter((b) => b.scale === branchScaleFilter);
  }, [branchScaleFilter]);

  const selectedBranch = useMemo(
    () => SOCIOLOGY_BRANCHES.find((b) => b.id === selectedBranchId) || SOCIOLOGY_BRANCHES[0],
    [selectedBranchId]
  );

  const filteredCareers = useMemo(() => {
    if (careerPillarFilter === 'All') return CAREER_PATHWAYS;
    return CAREER_PATHWAYS.filter((c) => c.pillar === careerPillarFilter);
  }, [careerPillarFilter]);

  const filteredResources = useMemo(() => {
    if (resourceFormatFilter === 'All') return STUDY_RESOURCES;
    return STUDY_RESOURCES.filter((r) => r.format === resourceFormatFilter);
  }, [resourceFormatFilter]);

  // Derived metrics for the Sociological Structure Simulator
  const simulatedMetrics = useMemo(() => {
    const mobilityIndex = Math.round(civicInvestmentLevel * 0.58 + socialTrustIndex * 0.42);
    const anomieRisk = Math.max(8, 100 - Math.round(socialTrustIndex * 0.65 + civicInvestmentLevel * 0.35));
    const healthEquityScore = Math.round(civicInvestmentLevel * 0.64 + socialTrustIndex * 0.36);
    const cohesionState =
      mobilityIndex >= 70
        ? 'High Organic Solidarity (Integrated Civic Ecosystem)'
        : mobilityIndex >= 45
        ? 'Transitional Equilibrium (Moderate Institutional Buffering)'
        : 'Elevated Anomie & Stratification Friction';
    return { mobilityIndex, anomieRisk, healthEquityScore, cohesionState };
  }, [civicInvestmentLevel, socialTrustIndex]);

  // Global search results across modules
  const globalSearchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const results: Array<{ type: string; title: string; subtitle: string; targetHref: string }> = [];

    FOUNDATIONAL_THINKERS.forEach((t) => {
      if (
        t.name.toLowerCase().includes(q) ||
        t.coreThesis.toLowerCase().includes(q) ||
        t.signatureConcepts.some((c) => c.toLowerCase().includes(q))
      ) {
        results.push({
          type: 'Thinker',
          title: `${t.name} (${t.lifespan})`,
          subtitle: t.signatureConcepts.join(' · '),
          targetHref: '#foundations',
        });
      }
    });

    SOCIOLOGY_BRANCHES.forEach((b) => {
      if (b.name.toLowerCase().includes(q) || b.overview.toLowerCase().includes(q)) {
        results.push({
          type: 'Branch',
          title: b.name,
          subtitle: b.scale,
          targetHref: '#scope',
        });
      }
    });

    TEN_CORE_POINTS.forEach((p) => {
      if (p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q)) {
        results.push({
          type: 'Importance Pillar',
          title: `${p.number}. ${p.title}`,
          subtitle: p.domain,
          targetHref: '#importance',
        });
      }
    });

    CAREER_PATHWAYS.forEach((c) => {
      if (c.role.toLowerCase().includes(q) || c.overview.toLowerCase().includes(q)) {
        results.push({
          type: 'Career Pathway',
          title: c.role,
          subtitle: `${c.pillar} · ${c.salaryRange}`,
          targetHref: '#careers',
        });
      }
    });

    return results.slice(0, 8);
  }, [searchQuery]);

  // Trigger AI Assistant with a specific prompt and smooth scroll to section
  const triggerAiInquiry = (promptText: string) => {
    setExternalAiPrompt(promptText);
    const el = document.getElementById('socio-ai');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Explicit Privacy Consent workflow before accessing localStorage
  const handleSaveNoteRequest = (title: string, content: string) => {
    const newNote: SavedFieldNote = {
      id: `note-${Date.now()}`,
      title,
      content,
      savedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (storageConsentGranted) {
      const updated = [newNote, ...savedNotes];
      setSavedNotes(updated);
      try {
        window.localStorage.setItem('sociosphere_field_notes', JSON.stringify(updated));
      } catch (e) {
        console.warn('LocalStorage write skipped:', e);
      }
    } else {
      setPendingNoteToSave({ title, content });
      setIsConsentModalOpen(true);
    }
  };

  const handleGrantStorageConsent = (persistToLocalStorage: boolean) => {
    if (persistToLocalStorage) {
      setStorageConsentGranted(true);
      try {
        const existingRaw = window.localStorage.getItem('sociosphere_field_notes');
        const existing: SavedFieldNote[] = existingRaw ? JSON.parse(existingRaw) : [];
        if (pendingNoteToSave) {
          const newNote: SavedFieldNote = {
            id: `note-${Date.now()}`,
            title: pendingNoteToSave.title,
            content: pendingNoteToSave.content,
            savedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          const combined = [newNote, ...existing];
          setSavedNotes(combined);
          window.localStorage.setItem('sociosphere_field_notes', JSON.stringify(combined));
        } else {
          setSavedNotes(existing);
        }
      } catch (e) {
        console.warn('LocalStorage access restricted:', e);
      }
    } else if (pendingNoteToSave) {
      // Session-only memory save without touching localStorage
      const newNote: SavedFieldNote = {
        id: `note-${Date.now()}`,
        title: pendingNoteToSave.title,
        content: pendingNoteToSave.content,
        savedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setSavedNotes((prev) => [newNote, ...prev]);
    }

    setPendingNoteToSave(null);
    setIsConsentModalOpen(false);
    setIsNotebookOpen(true);
  };

  const handleDownloadResource = (resource: StudyResource) => {
    const blob = new Blob([resource.contentBody], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = resource.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedIds((prev) => ({ ...prev, [resource.id]: true }));
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-slate-900 flex flex-col selection:bg-sky-700 selection:text-white">
      {/* =====================================================================
          A. NAVIGATION & HEADER (Strict 3-Zone Top Bar Contract)
         ===================================================================== */}
      <header className="sticky top-0 z-40 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-slate-200/90">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between gap-6">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-xl font-semibold tracking-tight text-slate-900 font-display whitespace-nowrap shrink-0"
          >
            SocioSphere
          </a>

          {/* Zone 2: 5 clean text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            <a
              href="#foundations"
              className="hover:text-slate-900 hover:underline underline-offset-8 decoration-sky-700 decoration-2 transition-colors whitespace-nowrap"
            >
              Foundations
            </a>
            <a
              href="#scope"
              className="hover:text-slate-900 hover:underline underline-offset-8 decoration-sky-700 decoration-2 transition-colors whitespace-nowrap"
            >
              Nature & Scope
            </a>
            <a
              href="#importance"
              className="hover:text-slate-900 hover:underline underline-offset-8 decoration-sky-700 decoration-2 transition-colors whitespace-nowrap"
            >
              10 Core Pillars
            </a>
            <a
              href="#careers"
              className="hover:text-slate-900 hover:underline underline-offset-8 decoration-sky-700 decoration-2 transition-colors whitespace-nowrap"
            >
              Career & Resources
            </a>
            <a
              href="#socio-ai"
              className="hover:text-slate-900 hover:underline underline-offset-8 decoration-sky-700 decoration-2 transition-colors whitespace-nowrap"
            >
              SocioAI Assistant
            </a>
          </nav>

          {/* Zone 3: 2 primary actions (Quick Search & Ask AI / Notebook) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search Sociological Knowledge Hub"
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200/90 rounded-lg hover:border-slate-300 hover:text-slate-900 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Quick Search</span>
            </button>

            <button
              type="button"
              onClick={() => setIsNotebookOpen(true)}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200/90 rounded-lg hover:border-slate-300 hover:text-slate-900 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              title="Open Saved Field Notes"
            >
              <Bookmark className="w-3.5 h-3.5 text-sky-700" />
              <span className="font-mono-tabular">Notes ({savedNotes.length})</span>
            </button>

            <a
              href="#socio-ai"
              className="px-4 py-2 text-xs font-medium text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors whitespace-nowrap"
            >
              Ask SocioAI
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* =====================================================================
            B. HERO SECTION (Editorial Authority + Quantitative Rigor)
           ===================================================================== */}
        <section className="pt-12 pb-20 px-6 lg:px-12 max-w-[1360px] mx-auto">
          {/* Operational & Curatorial Kicker */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-slate-200/80 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-800">Universal Knowledge Hub for the Science of Society</span>
              <span aria-hidden="true">·</span>
              <span>Learn • Earn • Serve • Grow • Return</span>
            </div>
            <div className="flex items-center gap-2 font-mono-tabular">
              <span>1838 Positivist Origins to 2026 Digital Sociology</span>
              <span aria-hidden="true">·</span>
              <span>Open Access Curriculum</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left: Editorial Headline & Primary CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <h1
                className="text-4xl sm:text-5xl lg:text-[54px] font-semibold text-slate-900 tracking-tight leading-[1.1]"
                style={{ textWrap: 'balance' }}
              >
                Understanding the Invisible Architecture of Human Society.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Sociology is the empirical science connecting personal biography to historical structure. Explore foundational thinkers from Auguste Comte and W.E.B. Du Bois to contemporary algorithmic sociology, public health epidemiology, and high-impact global careers.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#foundations"
                  className="px-6 py-3 bg-sky-700 hover:bg-sky-800 text-white text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <span>Explore Key Theories</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#socio-ai"
                  className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
                >
                  Consult SocioAI Assistant
                </a>
              </div>

              {/* Quick Stats Counter Strip */}
              <div className="pt-8 mt-4 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <p className="text-2xl sm:text-3xl font-semibold text-slate-900 font-mono-tabular">
                    10
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Core Societal Pillars
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-semibold text-slate-900 font-mono-tabular">
                    6+
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Major Empirical Branches
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-semibold text-slate-900 font-mono-tabular">
                    50+
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Global Career Pathways
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-semibold text-slate-900 font-mono-tabular">
                    188 Yrs
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Methodological Heritage
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Right: Architectural Knowledge Rotunda Visual */}
            <div className="lg:col-span-5">
              <figure className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs">
                <div className="aspect-16/10 w-full bg-slate-100 relative overflow-hidden">
                  {!imgErrors.hero ? (
                    <img
                      src={heroSociosphereImg}
                      alt="Architectural illustration of the SocioSphere university rotunda and global civic knowledge network"
                      referrerPolicy="no-referrer"
                      onError={() => setImgErrors((p) => ({ ...p, hero: true }))}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-sky-900 to-slate-900 text-white text-center">
                      <Compass className="w-10 h-10 text-sky-300 mb-3" />
                      <p className="text-sm font-medium">SocioSphere Civic Research Rotunda</p>
                    </div>
                  )}
                </div>
                <figcaption className="p-5 bg-white">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                    <span>Fig. 1 — The Sociological Imagination</span>
                    <span className="font-mono-tabular">Macro ⇄ Micro Synthesis</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    “Neither the life of an individual nor the history of a society can be understood without understanding both.” — <strong className="font-semibold text-slate-900">C. Wright Mills (1959)</strong>
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* =====================================================================
            C. FOUNDATIONS OF SOCIOLOGY (Definition, Timeline, Thinkers, Matrix)
           ===================================================================== */}
        <section
          id="foundations"
          aria-labelledby="foundations-heading"
          className="py-20 px-6 lg:px-12 max-w-[1360px] mx-auto border-t border-slate-200/80"
        >
          {/* Section Header */}
          <div className="max-w-3xl mb-14">
            <div className="text-xs text-slate-500 flex items-center gap-2 mb-3">
              <span>01. Foundations of Sociology</span>
              <span aria-hidden="true">·</span>
              <span>Definition, Historical Origin & Paradigm Comparison</span>
            </div>
            <h2
              id="foundations-heading"
              className="text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              What is Sociology? Origin, Epistemology & Foundational Thinkers
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mt-4">
              Coined from the Latin <em>socius</em> (companion) and the Greek <em>logos</em> (rigorous study), <strong className="font-semibold text-slate-900">Sociology</strong> is the systematic, empirical investigation of social institutions, cultural norms, group interactions, and structural stratification that pattern human life.
            </p>
          </div>

          {/* 1. Interactive Timeline: Auguste Comte (1838) to Digital Sociology (2026) */}
          <div className="mb-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Interactive Chronology: From Positivism to Algorithmic Society
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Select a historical milestone below to inspect its primary methods, concepts, and lasting legacy.
                </p>
              </div>
              <span className="text-xs font-mono-tabular text-slate-500">
                7 Defining Eras · 1838 – Present
              </span>
            </div>

            {/* Horizontal Era Selector Buttons */}
            <div
              role="tablist"
              aria-label="Sociological Timeline Eras"
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6"
            >
              {TIMELINE_ERAS.map((item) => {
                const isSelected = item.id === selectedEra.id;
                return (
                  <button
                    key={item.id}
                    role="tab"
                    aria-selected={isSelected}
                    type="button"
                    onClick={() => setSelectedEraId(item.id)}
                    className={`text-left p-3.5 rounded-lg border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200/90 hover:border-slate-300'
                    }`}
                  >
                    <p
                      className={`text-xs font-mono-tabular ${
                        isSelected ? 'text-sky-300' : 'text-sky-700'
                      }`}
                    >
                      {item.year}
                    </p>
                    <p className="text-xs font-semibold mt-1 truncate">{item.era}</p>
                  </button>
                );
              })}
            </div>

            {/* Active Timeline Detail Panel */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono-tabular font-semibold text-sky-700">
                      {selectedEra.year}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-slate-800">{selectedEra.figure}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedEra.era}</span>
                  </div>

                  <h4 className="text-2xl font-semibold text-slate-900">
                    {selectedEra.title}
                  </h4>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {selectedEra.summary}
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        triggerAiInquiry(
                          `Explain the historical significance of ${selectedEra.figure} (${selectedEra.year}) and how "${selectedEra.coreConcept}" applies to modern society.`
                        )
                      }
                      className="text-xs font-medium text-sky-700 hover:text-sky-900 inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore this era deeply in SocioAI Assistant</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <dl className="lg:col-span-5 space-y-4 lg:border-l lg:border-slate-200/80 lg:pl-8">
                  <div>
                    <dt className="text-xs text-slate-500">Core Conceptual Contributions</dt>
                    <dd className="text-sm font-medium text-slate-900 mt-1">
                      {selectedEra.coreConcept}
                    </dd>
                  </div>
                  <div className="pt-3 border-t border-slate-100">
                    <dt className="text-xs text-slate-500">Primary Research Methodology</dt>
                    <dd className="text-sm text-slate-700 mt-1">{selectedEra.methodology}</dd>
                  </div>
                  <div className="pt-3 border-t border-slate-100">
                    <dt className="text-xs text-slate-500">Enduring Scientific Impact</dt>
                    <dd className="text-sm text-slate-700 mt-1">{selectedEra.lastingImpact}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* 2. Core Foundational Thinkers Grid */}
          <div className="mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Core Foundational Thinkers & Architects of Social Theory
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Filter by theoretical tradition or click any scholar to inspect their primary texts and modern relevance.
                </p>
              </div>

              {/* Interactive Segmented Filter Control */}
              <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
                {[
                  'All',
                  'Functionalism & Order',
                  'Conflict & Critical',
                  'Interpretive & Action',
                  'Empirical & Public Sociology',
                ].map((trad) => (
                  <button
                    key={trad}
                    type="button"
                    onClick={() => setThinkerFilter(trad)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      thinkerFilter === trad
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {trad}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredThinkers.map((thinker) => (
                <article
                  key={thinker.id}
                  className="bg-white border border-slate-200/90 rounded-xl p-6 flex flex-col justify-between hover:border-slate-300 transition-colors"
                >
                  <div>
                    {/* Quiet unboxed metadata line */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span>{thinker.tradition}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">{thinker.lifespan}</span>
                    </div>

                    <h4 className="text-xl font-semibold text-slate-900">
                      {thinker.name}
                    </h4>

                    <p className="text-xs text-slate-500 mt-1 italic">
                      {thinker.magnumOpus}
                    </p>

                    <p className="text-sm text-slate-600 leading-relaxed mt-4">
                      {thinker.coreThesis}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">Signature Concepts</p>
                      <p className="text-xs font-medium text-slate-800">
                        {thinker.signatureConcepts.join(' · ')}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveThinkerModal(thinker)}
                      className="text-xs font-medium text-sky-700 hover:text-sky-900 inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
                    >
                      <span>Read Full Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleSaveNoteRequest(
                          `${thinker.name} (${thinker.lifespan})`,
                          `${thinker.coreThesis}\nKey Concepts: ${thinker.signatureConcepts.join(', ')}\n2026 Relevance: ${thinker.modernRelevance}`
                        )
                      }
                      className="text-xs text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save Note</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* 3. Interactive Side-by-Side Comparison Matrix: Sociology vs. Psychology */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Sociology vs. Psychology: Interactive Disciplinary Matrix
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Compare how Sociology and Psychology examine human behavior across complementary analytical scales.
                </p>
              </div>

              <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start">
                {['All', 'Core Focus', 'Methodology', 'Application'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setComparisonFilter(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      comparisonFilter === cat
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-semibold text-slate-600">
                      <th className="py-4 px-6 w-1/5">Analytical Dimension</th>
                      <th className="py-4 px-6 w-2/5 text-sky-900">Sociology (Macro & Institutional)</th>
                      <th className="py-4 px-6 w-2/5 text-indigo-950">Psychology (Micro & Cognitive)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/70 text-sm">
                    {filteredComparison.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-5 px-6 align-top">
                          <p className="font-semibold text-slate-900">{row.dimension}</p>
                          <p className="text-xs text-slate-500 mt-1">{row.category}</p>
                        </td>
                        <td className="py-5 px-6 align-top text-slate-700 leading-relaxed">
                          <p>{row.sociology}</p>
                          <p className="text-xs text-sky-800 mt-2 pt-2 border-t border-slate-100">
                            <strong>Bridge:</strong> {row.sharedBridge}
                          </p>
                        </td>
                        <td className="py-5 px-6 align-top text-slate-700 leading-relaxed">
                          {row.psychology}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            D. DEEP DIVE: NATURE, SCOPE & INTERACTIVE STRUCTURE SIMULATOR
           ===================================================================== */}
        <section
          id="scope"
          aria-labelledby="scope-heading"
          className="py-20 px-6 lg:px-12 max-w-[1360px] mx-auto border-t border-slate-200/80"
        >
          <div className="max-w-3xl mb-14">
            <div className="text-xs text-slate-500 flex items-center gap-2 mb-3">
              <span>02. Nature & Scope of Sociology</span>
              <span aria-hidden="true">·</span>
              <span>Scientific Method, Branches & Structural Simulation</span>
            </div>
            <h2
              id="scope-heading"
              className="text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Empirical Rigor & The Main Branches of Sociological Inquiry
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mt-4">
              As a scientific discipline, sociology relies on empirical verification, cumulative theory building, ethical neutrality, and critical uncovering of latent institutional patterns.
            </p>
          </div>

          {/* Nature of Sociology: 4 Scientific Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                index: '01',
                title: 'Empirical & Evidence-Based',
                desc: 'Hypotheses are tested against verifiable census microdata, longitudinal cohorts, and systematic field observation rather than speculation.',
              },
              {
                index: '02',
                title: 'Cumulative & Theoretical',
                desc: 'New studies build upon, refine, or challenge classical frameworks so explanations grow more precise across generations.',
              },
              {
                index: '03',
                title: 'Value-Reflexive Objectivity',
                desc: 'Applies Max Weber’s standard of rigorous analytical neutrality while transparently disclosing researcher standpoint and structural bias.',
              },
              {
                index: '04',
                title: 'Unmasking Latent Structures',
                desc: 'Looks beneath official institutional statements (manifest functions) to reveal unintended systemic consequences (latent functions).',
              },
            ].map((pillar) => (
              <div
                key={pillar.index}
                className="bg-white border border-slate-200/90 rounded-xl p-6"
              >
                <p className="text-xs font-mono-tabular text-sky-700 font-semibold mb-2">
                  Principle {pillar.index}
                </p>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Scope & Main Branches Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xl font-semibold text-slate-900">
                  Main Branches Explorer
                </h3>
                <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
                  {['All', 'Macro-Structural', 'Meso & Cross-Scale', 'Micro-Interactionist'].map(
                    (sc) => (
                      <button
                        key={sc}
                        type="button"
                        onClick={() => setBranchScaleFilter(sc)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                          branchScaleFilter === sc
                            ? 'bg-white text-slate-900 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {sc === 'All' ? 'All' : sc.split('-')[0].split(' ')[0]}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="space-y-2.5">
                {filteredBranches.map((branch) => {
                  const active = branch.id === selectedBranch.id;
                  return (
                    <button
                      key={branch.id}
                      type="button"
                      onClick={() => setSelectedBranchId(branch.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-colors cursor-pointer ${
                        active
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-800 border-slate-200/90 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className={active ? 'text-sky-300' : 'text-sky-700'}>
                          {branch.scale}
                        </span>
                        <span className={active ? 'text-slate-300' : 'text-slate-400'}>
                          Inspect →
                        </span>
                      </div>
                      <p className="text-base font-semibold">{branch.name}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Branch Spotlight Card + Visual */}
            <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-7 p-6 lg:p-8 space-y-4">
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span>{selectedBranch.scale}</span>
                    <span aria-hidden="true">·</span>
                    <span>Sub-Disciplinary Spotlight</span>
                  </div>

                  <h4 className="text-2xl font-semibold text-slate-900">
                    {selectedBranch.name}
                  </h4>

                  <p className="text-sm font-medium text-sky-900 bg-sky-50/70 border-l-2 border-sky-700 pl-3 py-2">
                    “{selectedBranch.coreQuestion}”
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedBranch.overview}
                  </p>

                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                    <div>
                      <span className="text-slate-500">Primary Methods: </span>
                      <span className="font-medium text-slate-800">
                        {selectedBranch.keyMethods}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Empirical Benchmark: </span>
                      <span className="font-mono-tabular font-semibold text-sky-800">
                        {selectedBranch.primaryMetric}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Applied Case: </span>
                      <span className="text-slate-700">{selectedBranch.realWorldExample}</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 bg-slate-100 border-t md:border-t-0 md:border-l border-slate-200/80 flex flex-col justify-between">
                  <div className="aspect-4/3 md:aspect-auto md:h-full relative overflow-hidden">
                    {!imgErrors.branch ? (
                      <img
                        src={
                          selectedBranch.id === 'digital-sociology'
                            ? digitalSocietyImg
                            : selectedBranch.id === 'urban-sociology'
                            ? urbanSociologyImg
                            : diagramStructuresImg
                        }
                        alt={selectedBranch.name}
                        referrerPolicy="no-referrer"
                        onError={() => setImgErrors((p) => ({ ...p, branch: true }))}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-6 bg-slate-800 text-white text-xs text-center">
                        {selectedBranch.name} Visual Diagram
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Two-Zone Interactive Sociological Simulation Sandbox */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Zone: Interactive Parameter Controls */}
              <div className="lg:col-span-5 space-y-5">
                <div className="flex items-center gap-2 text-xs text-sky-700 font-medium">
                  <Sliders className="w-4 h-4" />
                  <span>Interactive Policy & Solidarity Model</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Simulate Macro-Institutional Buffering & Social Cohesion
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Adjust structural investment (education, healthcare, housing) and community social trust to observe how Durkheimian <em>Anomie</em> and intergenerational mobility shift.
                </p>

                <div className="space-y-4 pt-2">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                      <label htmlFor="slider-civic">
                        Public & Civic Infrastructure Investment
                      </label>
                      <span className="font-mono-tabular font-semibold text-sky-800">
                        {civicInvestmentLevel} / 100 Index
                      </span>
                    </div>
                    <input
                      id="slider-civic"
                      type="range"
                      min={15}
                      max={95}
                      value={civicInvestmentLevel}
                      onChange={(e) => setCivicInvestmentLevel(Number(e.target.value))}
                      className="w-full accent-sky-700 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                      <label htmlFor="slider-trust">
                        Neighborhood Social Capital & Institutional Trust
                      </label>
                      <span className="font-mono-tabular font-semibold text-sky-800">
                        {socialTrustIndex} / 100 Index
                      </span>
                    </div>
                    <input
                      id="slider-trust"
                      type="range"
                      min={15}
                      max={95}
                      value={socialTrustIndex}
                      onChange={(e) => setSocialTrustIndex(Number(e.target.value))}
                      className="w-full accent-sky-700 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Right Zone: Live Sociological Outcomes Readout */}
              <div className="lg:col-span-7 bg-[#F9F8F6] border border-slate-200/80 rounded-xl p-6 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
                  <span className="text-xs text-slate-500">Equilibrium Diagnosis:</span>
                  <span className="text-xs font-semibold text-slate-900">
                    ● {simulatedMetrics.cohesionState}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white border border-slate-200/80 rounded-lg p-4">
                    <p className="text-xs text-slate-500">Upward Mobility Index</p>
                    <p className="text-2xl font-semibold text-slate-900 font-mono-tabular mt-1">
                      {simulatedMetrics.mobilityIndex}%
                    </p>
                    <p className="text-xs text-emerald-700 mt-1">
                      ▲ Intergenerational Access
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200/80 rounded-lg p-4">
                    <p className="text-xs text-slate-500">Durkheimian Anomie Risk</p>
                    <p className="text-2xl font-semibold text-slate-900 font-mono-tabular mt-1">
                      {simulatedMetrics.anomieRisk}%
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      {simulatedMetrics.anomieRisk < 35 ? '● Nominal Friction' : '▲ Elevated Normlessness'}
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200/80 rounded-lg p-4">
                    <p className="text-xs text-slate-500">Public Health SDOH Score</p>
                    <p className="text-2xl font-semibold text-slate-900 font-mono-tabular mt-1">
                      {simulatedMetrics.healthEquityScore}/100
                    </p>
                    <p className="text-xs text-sky-800 mt-1">
                      ● Community Longevity Buffer
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Theoretical Interpretation (Putnam & Durkheim):</strong> When strong public institutions ({civicInvestmentLevel}%) pair with dense civic trust ({socialTrustIndex}%), communities exhibit lower morbidity and higher resilience against economic shocks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            D2. THE 10 CORE POINTS / IMPORTANCE OF SOCIOLOGY
           ===================================================================== */}
        <section
          id="importance"
          aria-labelledby="importance-heading"
          className="py-20 px-6 lg:px-12 max-w-[1360px] mx-auto border-t border-slate-200/80"
        >
          <div className="max-w-3xl mb-12">
            <div className="text-xs text-slate-500 flex items-center gap-2 mb-3">
              <span>03. The 10 Core Points of Importance</span>
              <span aria-hidden="true">·</span>
              <span>Why Sociology Matters Across Every Profession</span>
            </div>
            <h2
              id="importance-heading"
              className="text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Ten Essential Ways Sociology Transforms Individuals & Institutions
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 10-Point Interactive Index */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {TEN_CORE_POINTS.map((pt, idx) => {
                const isSelected = idx === activeCorePointIndex;
                return (
                  <button
                    key={pt.number}
                    type="button"
                    onClick={() => setActiveCorePointIndex(idx)}
                    className={`text-left px-4 py-3 rounded-lg border transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-800 border-slate-200/90 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`text-xs font-mono-tabular font-semibold ${
                          isSelected ? 'text-sky-300' : 'text-sky-700'
                        }`}
                      >
                        {pt.number}.
                      </span>
                      <span className="text-sm font-medium truncate">{pt.title}</span>
                    </div>
                    <span className="text-xs shrink-0 opacity-60">{pt.domain}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Active Core Point Deep Dive + Full 10-Grid Summary */}
            <div className="lg:col-span-7 space-y-6">
              {(() => {
                const activePt = TEN_CORE_POINTS[activeCorePointIndex];
                return (
                  <div className="bg-white border border-slate-200/90 rounded-xl p-8 space-y-5">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-mono-tabular font-semibold text-sky-700">
                        Pillar {activePt.number} of 10
                      </span>
                      <span>{activePt.domain}</span>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-semibold text-slate-900">
                      {activePt.number}. {activePt.title}
                    </h3>

                    <p className="text-base text-slate-700 leading-relaxed">
                      {activePt.summary}
                    </p>

                    <div className="p-4 bg-[#F9F8F6] border border-slate-200/80 rounded-lg space-y-2">
                      <p className="text-xs font-semibold text-slate-900">
                        Empirical & Literature Anchor
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {activePt.caseEvidence}
                      </p>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
                      <div>
                        <p className="text-xs text-slate-500">Practical Takeaway</p>
                        <p className="text-sm font-medium text-slate-900 mt-0.5">
                          {activePt.actionableTakeaway}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          triggerAiInquiry(
                            `Provide concrete case studies showing how "${activePt.title}" (${activePt.domain}) is applied in modern professional practice.`
                          )
                        }
                        className="px-4 py-2 text-xs font-medium bg-sky-700 text-white rounded-lg hover:bg-sky-800 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Ask SocioAI for Case Studies
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Quick 10-Point Overview Matrix */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-6">
                <p className="text-xs font-semibold text-slate-500 mb-4">
                  Complete 10-Point Reference Checklist
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs text-slate-600">
                  {TEN_CORE_POINTS.map((item, i) => (
                    <div
                      key={item.number}
                      onClick={() => setActiveCorePointIndex(i)}
                      className="flex items-baseline gap-2 py-1 border-b border-slate-100 cursor-pointer hover:text-slate-900"
                    >
                      <span className="font-mono-tabular font-semibold text-sky-700">
                        {item.number}
                      </span>
                      <span className="font-medium text-slate-800 truncate">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            E. CAREER HUB & DOWNLOADABLE RESOURCE HUB ("Learn, Earn, Serve, Grow, Return")
           ===================================================================== */}
        <section
          id="careers"
          aria-labelledby="careers-heading"
          className="py-20 px-6 lg:px-12 max-w-[1360px] mx-auto border-t border-slate-200/80"
        >
          <div className="max-w-3xl mb-14">
            <div className="text-xs text-slate-500 flex items-center gap-2 mb-3">
              <span>04. Career Hub & Practical Application</span>
              <span aria-hidden="true">·</span>
              <span>Learn • Earn • Serve • Grow • Return</span>
            </div>
            <h2
              id="careers-heading"
              className="text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Is Sociology a Good Career? High-Impact Sectors & Resource Library
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mt-4">
              Sociology graduates combine quantitative data literacy with deep human systems insight—positioning them for leadership in UX research, people analytics, public health, policy think tanks, and global NGOs.
            </p>
          </div>

          {/* 1. Career Pathways Filterable by "Learn • Earn • Serve • Grow • Return" */}
          <div className="mb-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  High-Growth Career Pathways & Compensation Benchmarks
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Filter pathways by the five SocioSphere lifecycle pillars.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
                {['All', 'Learn', 'Earn', 'Serve', 'Grow', 'Return'].map((pillar) => (
                  <button
                    key={pillar}
                    type="button"
                    onClick={() => setCareerPillarFilter(pillar)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      careerPillarFilter === pillar
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {pillar}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCareers.map((career) => (
                <article
                  key={career.id}
                  className="bg-white border border-slate-200/90 rounded-xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span>
                        Pillar: <strong className="text-sky-800">{career.pillar}</strong> · {career.sector}
                      </span>
                      <span className="font-mono-tabular text-emerald-700 font-medium">
                        {career.growthRate}
                      </span>
                    </div>

                    <h4 className="text-lg font-semibold text-slate-900">
                      {career.role}
                    </h4>

                    <p className="text-base font-semibold text-slate-900 font-mono-tabular mt-2">
                      {career.salaryRange}
                    </p>

                    <p className="text-sm text-slate-600 leading-relaxed mt-3">
                      {career.overview}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">Core Methodological Skills</p>
                      <p className="text-xs font-medium text-slate-800">
                        {career.coreSkills.join(' · ')}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 truncate">
                      {career.typicalEmployers.slice(0, 2).join(' · ')}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        triggerAiInquiry(
                          `How can a sociology student prepare a portfolio and resume for a "${career.role}" position (${career.salaryRange})?`
                        )
                      }
                      className="font-medium text-sky-700 hover:text-sky-900 whitespace-nowrap cursor-pointer"
                    >
                      Career Roadmap →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* 2. Downloadable Resource Hub (PDFs, PPTs, Slideshare, Rubrics, Study Templates) */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Downloadable Academic Resource & Study Hub
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Instant access to structured study guides, lecture slide outlines, clinical nursing notes, and research rubrics.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
                {[
                  'All',
                  'PDF Guide',
                  'PPT Deck',
                  'Slideshare Notes',
                  'Assignment Rubric',
                  'Study Template',
                ].map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setResourceFormatFilter(fmt)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      resourceFormatFilter === fmt
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((res) => (
                <article
                  key={res.id}
                  className="bg-white border border-slate-200/90 rounded-xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-sky-800">{res.format}</span>
                      <span aria-hidden="true">·</span>
                      <span>{res.level}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">{res.pagesOrSlides}</span>
                    </div>

                    <h4 className="text-lg font-semibold text-slate-900">
                      {res.title}
                    </h4>

                    <p className="text-sm text-slate-600 leading-relaxed mt-2">
                      {res.summary}
                    </p>

                    <ul className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                      {res.outline.map((item, i) => (
                        <li key={i} className="truncate">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setPreviewResource(res)}
                      className="text-xs font-medium text-slate-700 hover:text-slate-900 inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                      <span>Preview Contents</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownloadResource(res)}
                      className="px-4 py-2 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                    >
                      {downloadedIds[res.id] ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Downloaded Packet</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Study Packet</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            F. INTERACTIVE SOCIOAI ASSISTANT
           ===================================================================== */}
        <SocioAIAssistant
          externalPrompt={externalAiPrompt}
          onClearExternalPrompt={() => setExternalAiPrompt(null)}
          onSaveNote={handleSaveNoteRequest}
        />
      </main>

      {/* =====================================================================
          CLEAN EDITORIAL FOOTER
         ===================================================================== */}
      <footer className="bg-white border-t border-slate-200/90 py-12 px-6 lg:px-12">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-base font-semibold text-slate-900 font-display">
              SocioSphere — A Universal Knowledge Hub for the Science of Society
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Learn • Earn • Serve • Grow • Return · Open Academic Reference & Empirical Research Platform
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600">
            <a href="#foundations" className="hover:text-slate-900">Foundations</a>
            <a href="#scope" className="hover:text-slate-900">Nature & Scope</a>
            <a href="#importance" className="hover:text-slate-900">10 Core Pillars</a>
            <a href="#careers" className="hover:text-slate-900">Careers & Downloads</a>
            <button
              type="button"
              onClick={() => setIsConsentModalOpen(true)}
              className="hover:text-slate-900 underline underline-offset-4 cursor-pointer"
            >
              Privacy & Storage Preferences
            </button>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          MODAL 1: THINKER ACADEMIC DOSSIER
         ===================================================================== */}
      {activeThinkerModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="thinker-modal-title"
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white border border-slate-200 rounded-xl max-w-xl w-full p-6 lg:p-8 shadow-lg space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500">
                  {activeThinkerModal.tradition} · {activeThinkerModal.region} ({activeThinkerModal.lifespan})
                </p>
                <h3 id="thinker-modal-title" className="text-2xl font-semibold text-slate-900 mt-1">
                  {activeThinkerModal.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveThinkerModal(null)}
                aria-label="Close Dossier"
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <blockquote className="text-base font-display italic text-slate-800 border-l-2 border-sky-700 pl-4 py-1">
              “{activeThinkerModal.quote}”
            </blockquote>

            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-900">Primary Works:</strong> {activeThinkerModal.magnumOpus}
              </p>
              <p>
                <strong className="text-slate-900">Core Thesis:</strong> {activeThinkerModal.coreThesis}
              </p>
              <p>
                <strong className="text-slate-900">21st-Century Relevance:</strong> {activeThinkerModal.modernRelevance}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  const thinkerName = activeThinkerModal.name;
                  setActiveThinkerModal(null);
                  triggerAiInquiry(
                    `Compare ${thinkerName}'s core sociological framework with contemporary digital and urban sociology.`
                  );
                }}
                className="px-4 py-2 text-xs font-medium bg-sky-700 text-white rounded-lg hover:bg-sky-800 transition-colors cursor-pointer"
              >
                Analyze {activeThinkerModal.name} with SocioAI
              </button>
              <button
                type="button"
                onClick={() => setActiveThinkerModal(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: STUDY RESOURCE READER PREVIEW
         ===================================================================== */}
      {previewResource && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="resource-preview-title"
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white border border-slate-200 rounded-xl max-w-2xl w-full p-6 lg:p-8 shadow-lg flex flex-col max-h-[85vh]">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <p className="text-xs text-sky-700 font-medium">
                  {previewResource.format} · {previewResource.pagesOrSlides}
                </p>
                <h3 id="resource-preview-title" className="text-xl font-semibold text-slate-900 mt-1">
                  {previewResource.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewResource(null)}
                aria-label="Close Preview"
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto my-4 p-4 bg-[#F9F8F6] border border-slate-200/80 rounded-lg font-mono-tabular text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">
              {previewResource.contentBody}
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleDownloadResource(previewResource)}
                className="px-4 py-2 text-xs font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Full File ({previewResource.fileName})</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewResource(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: QUICK KNOWLEDGE SEARCH
         ===================================================================== */}
      {isSearchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search SocioSphere"
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-start justify-center pt-20 p-4"
        >
          <div className="bg-white border border-slate-200 rounded-xl max-w-xl w-full p-6 shadow-lg space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
              <Search className="w-4 h-4 text-sky-700 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search thinkers (Durkheim, Du Bois), branches, or careers..."
                className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                Esc
              </button>
            </div>

            {searchQuery.trim() === '' ? (
              <div className="py-4 text-xs text-slate-500 space-y-2">
                <p>Popular Sociological Searches:</p>
                <div className="flex flex-wrap gap-2">
                  {['Durkheim', 'Double Consciousness', 'Medical Sociology', 'UX Researcher', 'Nursing'].map(
                    (term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setSearchQuery(term)}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md cursor-pointer"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
              </div>
            ) : globalSearchResults.length > 0 ? (
              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                {globalSearchResults.map((res, idx) => (
                  <a
                    key={idx}
                    href={res.targetHref}
                    onClick={() => setIsSearchOpen(false)}
                    className="block py-3 px-2 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-medium text-sky-700">{res.type}</span>
                      <span>Jump to Section →</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">{res.title}</p>
                    <p className="text-xs text-slate-500 truncate">{res.subtitle}</p>
                  </a>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center space-y-3">
                <p className="text-sm text-slate-600">
                  No direct index match for “{searchQuery}”.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const q = searchQuery;
                    setIsSearchOpen(false);
                    triggerAiInquiry(q);
                  }}
                  className="px-4 py-2 text-xs font-medium bg-sky-700 text-white rounded-lg hover:bg-sky-800 cursor-pointer"
                >
                  Ask SocioAI Assistant about “{searchQuery}”
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 4: EXPLICIT USER PRIVACY & LOCAL STORAGE CONSENT
         ===================================================================== */}
      {isConsentModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="consent-modal-title"
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-lg space-y-4">
            <div className="flex items-center gap-2.5 text-sky-700">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-semibold">User Privacy & Storage Consent</span>
            </div>

            <h3 id="consent-modal-title" className="text-lg font-semibold text-slate-900">
              Save Field Notes to Browser Storage?
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              SocioSphere respects your privacy and never accesses browser <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">localStorage</code> without explicit permission. Would you like to persist your saved sociological notes across browser sessions, or keep them in temporary memory for this visit only?
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => handleGrantStorageConsent(false)}
                className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Session Memory Only
              </button>
              <button
                type="button"
                onClick={() => handleGrantStorageConsent(true)}
                className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors cursor-pointer"
              >
                Allow LocalStorage Persistence
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          DRAWER: SAVED FIELD NOTES NOTEBOOK
         ===================================================================== */}
      {isNotebookOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Saved Sociological Field Notes"
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end"
        >
          <div className="bg-white w-full max-w-md h-full p-6 flex flex-col justify-between shadow-xl border-l border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Researcher Field Notebook
                </h3>
                <p className="text-xs text-slate-500">
                  {storageConsentGranted
                    ? 'Persisted in Browser LocalStorage'
                    : 'Stored in Temporary Session Memory'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsNotebookOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto my-4 space-y-3">
              {savedNotes.length === 0 ? (
                <div className="text-center py-12 px-4 text-sm text-slate-500">
                  No field notes saved yet. Click “Save Note” on any foundational thinker card or SocioAI synthesis to build your personal study packet.
                </div>
              ) : (
                savedNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 bg-[#F9F8F6] border border-slate-200/90 rounded-lg space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-mono-tabular">{note.savedAt}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const filtered = savedNotes.filter((n) => n.id !== note.id);
                          setSavedNotes(filtered);
                          if (storageConsentGranted) {
                            try {
                              window.localStorage.setItem(
                                'sociosphere_field_notes',
                                JSON.stringify(filtered)
                              );
                            } catch (e) {
                              console.warn(e);
                            }
                          }
                        }}
                        className="text-slate-400 hover:text-red-600 cursor-pointer"
                        title="Delete note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900">{note.title}</h4>
                    <p className="text-xs text-slate-600 whitespace-pre-wrap leading-relaxed">
                      {note.content}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={savedNotes.length === 0}
                onClick={() => {
                  const text = savedNotes
                    .map((n) => `=== ${n.title} (${n.savedAt}) ===\n${n.content}\n`)
                    .join('\n');
                  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'SocioSphere_Custom_Field_Notes.txt';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-4 py-2 text-xs font-medium bg-sky-700 disabled:bg-slate-200 text-white rounded-lg hover:bg-sky-800 transition-colors cursor-pointer"
              >
                Export Notes (.txt)
              </button>
              <button
                type="button"
                onClick={() => setIsNotebookOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
