export interface TimelineEra {
  id: string;
  year: string;
  era: string;
  figure: string;
  title: string;
  summary: string;
  coreConcept: string;
  methodology: string;
  lastingImpact: string;
}

export interface Thinker {
  id: string;
  name: string;
  lifespan: string;
  tradition: 'Conflict & Critical' | 'Functionalism & Order' | 'Interpretive & Action' | 'Empirical & Public Sociology';
  region: string;
  magnumOpus: string;
  signatureConcepts: string[];
  coreThesis: string;
  modernRelevance: string;
  quote: string;
}

export interface ComparisonDimension {
  id: string;
  dimension: string;
  category: 'Core Focus' | 'Methodology' | 'Application';
  sociology: string;
  psychology: string;
  sharedBridge: string;
}

export interface SociologyBranch {
  id: string;
  name: string;
  scale: 'Macro-Structural' | 'Micro-Interactionist' | 'Meso & Cross-Scale';
  coreQuestion: string;
  overview: string;
  keyMethods: string;
  realWorldExample: string;
  primaryMetric: string;
}

export interface CorePoint {
  number: string;
  title: string;
  domain: string;
  summary: string;
  caseEvidence: string;
  actionableTakeaway: string;
}

export interface CareerPathway {
  id: string;
  role: string;
  pillar: 'Learn' | 'Earn' | 'Serve' | 'Grow' | 'Return';
  sector: 'Public & Policy' | 'Tech & Data' | 'Healthcare & Clinical' | 'NGO & Global' | 'Academia & Research';
  salaryRange: string;
  growthRate: string;
  overview: string;
  coreSkills: string[];
  typicalEmployers: string[];
}

export interface StudyResource {
  id: string;
  title: string;
  format: 'PDF Guide' | 'PPT Deck' | 'Slideshare Notes' | 'Assignment Rubric' | 'Study Template';
  level: string;
  pagesOrSlides: string;
  updatedDate: string;
  summary: string;
  outline: string[];
  fileName: string;
  contentBody: string;
}

export const TIMELINE_ERAS: TimelineEra[] = [
  {
    id: 'comte-1838',
    year: '1838',
    era: 'Positivist Genesis',
    figure: 'Auguste Comte & Harriet Martineau',
    title: 'Coining of Sociology & Methodological Foundations',
    summary: 'Auguste Comte formally coins the term "Sociology" (replacing "social physics") to establish a systematic science of society following the upheaval of the French and Industrial Revolutions. Harriet Martineau translates Comte into English and conducts the first systematic methodological fieldwork in "How to Observe Morals and Manners" (1838).',
    coreConcept: 'Law of Three Stages · Social Statics & Social Dynamics',
    methodology: 'Systematic empirical observation, comparative historical analysis',
    lastingImpact: 'Established that human societies follow discoverable structural regularities rather than arbitrary chance.'
  },
  {
    id: 'marx-1848',
    year: '1848–1867',
    era: 'Industrial Critique',
    figure: 'Karl Marx',
    title: 'Historical Materialism & Class Stratification',
    summary: 'Analyzing the rapid rise of industrial capitalism across Europe, Karl Marx formulates historical materialism—arguing that the mode of production and economic relations form the base upon which legal, political, and cultural superstructures arise.',
    coreConcept: 'Historical Materialism · Alienation · Class Conflict',
    methodology: 'Dialectical critique, political economy archival data, labor factory reports',
    lastingImpact: 'Anchored conflict theory and inequalities research across labor economics, global stratification, and critical sociology.'
  },
  {
    id: 'durkheim-1895',
    year: '1893–1897',
    era: 'Institutionalization',
    figure: 'Émile Durkheim',
    title: 'Social Facts, Collective Conscience & Empirical Rigor',
    summary: 'Durkheim establishes the first European department of sociology at the University of Bordeaux and publishes "The Rules of Sociological Method" (1895) and "Suicide" (1897), demonstrating how deeply personal acts are patterned by macro-level social integration and regulation.',
    coreConcept: 'Social Facts · Mechanical vs. Organic Solidarity · Anomie',
    methodology: 'Multivariate statistical comparison across regional and religious registries',
    lastingImpact: 'Proved that social forces exist external to the individual and can be measured with quantitative precision.'
  },
  {
    id: 'dubois-addams-1899',
    year: '1895–1905',
    era: 'Empirical Urban & Public Sociology',
    figure: 'W.E.B. Du Bois & Jane Addams',
    title: 'The Philadelphia Negro, Hull-House Maps & Verstehen',
    summary: 'W.E.B. Du Bois conducts door-to-door survey research of 9,675 residents in Philadelphia’s Seventh Ward, pioneering urban empirical sociology and the concept of "Double Consciousness." Simultaneously, Jane Addams and the Hull-House collective in Chicago pioneer spatial demographic cartography and applied civic reform, while Max Weber in Germany formalizes interpretive sociology (Verstehen) and bureaucratic rationalization.',
    coreConcept: 'Double Consciousness · Spatial Cartography · Verstehen & Iron Cage',
    methodology: 'Mixed-methods household censuses, spatial mapping, interpretive ideal types',
    lastingImpact: 'Created the blueprint for modern urban sociology, social epidemiology, and community-engaged policy research.'
  },
  {
    id: 'chicago-midcentury-1920',
    year: '1920–1965',
    era: 'Interactionism &The Sociological Imagination',
    figure: 'Mead, Goffman, Parsons & C. Wright Mills',
    title: 'Micro-Interactionism, Grand Theory & Public Critique',
    summary: 'The Chicago School advances urban ethnography and Symbolic Interactionism (George Herbert Mead, Erving Goffman’s dramaturgical analysis). Mid-century sociology debates Talcott Parsons’ structural functionalism against C. Wright Mills’ call for the "Sociological Imagination" linking private troubles to public issues.',
    coreConcept: 'Dramaturgy · The Sociological Imagination · Manifest/Latent Functions',
    methodology: 'Participant observation, national probability surveys, institutional elite mapping',
    lastingImpact: 'Connected everyday face-to-face identity performance with macro-level power elites and institutional rules.'
  },
  {
    id: 'bourdieu-castells-1979',
    year: '1979–2000',
    era: 'Cultural Capital, Intersectionality & Network Society',
    figure: 'Pierre Bourdieu, Kimberlé Crenshaw, Patricia Hill Collins & Manuel Castells',
    title: 'Habitus, Intersectional Matrices & Global Information Flows',
    summary: 'Sociology bridges agency and structure through Pierre Bourdieu’s theory of Habitus and Cultural Capital, Patricia Hill Collins and Kimberlé Crenshaw’s frameworks of intersectional stratification, and Manuel Castells’ analysis of the global Network Society.',
    coreConcept: 'Cultural Capital & Habitus · Intersectionality · Space of Flows',
    methodology: 'Multiple correspondence analysis, standpoint epistemology, global network mapping',
    lastingImpact: 'Revealed how subtle cultural tastes, overlapping identities, and digital telecommunications reproduce or challenge inequality.'
  },
  {
    id: 'digital-ai-2026',
    year: '2010–Present',
    era: 'Computational & Algorithmic Sociology',
    figure: 'Contemporary Global Research Community',
    title: 'Digital Sociology, AI Governance & Planetary Resilience',
    summary: 'Twenty-first century sociology integrates computational social science, algorithmic auditing, climate migration modeling, and digital ethnography to examine how artificial intelligence, platform economies, and planetary ecological shifts reshape human solidarity.',
    coreConcept: 'Algorithmic Stratification · Computational Social Science · Planetary Sociology',
    methodology: 'Large-scale network graphs, digital ethnography, causal inference & AI auditing',
    lastingImpact: 'Guides ethical AI policy, public health preparedness, and sustainable civic architecture worldwide.'
  }
];

export const FOUNDATIONAL_THINKERS: Thinker[] = [
  {
    id: 'durkheim',
    name: 'Émile Durkheim',
    lifespan: '1858–1917',
    tradition: 'Functionalism & Order',
    region: 'France',
    magnumOpus: 'The Division of Labor in Society (1893) · Suicide (1897)',
    signatureConcepts: ['Social Facts', 'Organic Solidarity', 'Anomie', 'Collective Effervescence'],
    coreThesis: 'Society is a reality sui generis—an irreducible moral and structural order whose institutions regulate human desires and bind individuals into cohesive solidarity.',
    modernRelevance: 'Explains contemporary crises of loneliness, digital polarization, and community fragmentation when rapid economic or technological shifts outpace shared moral norms (anomie).',
    quote: 'Man is a moral being only because he lives in society, since morality consists in being solidary with a group.'
  },
  {
    id: 'marx',
    name: 'Karl Marx',
    lifespan: '1818–1883',
    tradition: 'Conflict & Critical',
    region: 'Germany / United Kingdom',
    magnumOpus: 'Das Kapital (1867) · Economic and Philosophic Manuscripts (1844)',
    signatureConcepts: ['Historical Materialism', 'Labor Alienation', 'Commodity Fetishism', 'Class Consciousness'],
    coreThesis: 'Human history unfolds through material struggles over the ownership of the means of production, where economic base relations shape legal, political, and ideological superstructures.',
    modernRelevance: 'Provides analytical tools for studying platform gig-economy precarity, global supply chain inequalities, automation of labor, and wealth concentration.',
    quote: 'Philosophers have hitherto only interpreted the world in various ways; the point is to change it.'
  },
  {
    id: 'weber',
    name: 'Max Weber',
    lifespan: '1864–1920',
    tradition: 'Interpretive & Action',
    region: 'Germany',
    magnumOpus: 'Economy and Society (1921) · The Protestant Ethic (1905)',
    signatureConcepts: ['Verstehen (Interpretive Understanding)', 'Bureaucratic Iron Cage', 'Class, Status & Party', 'Disenchantment'],
    coreThesis: 'Modernity is driven by formal rationalization and bureaucracy, which maximize efficiency and calculability while trapping human spontaneity inside an "iron cage" of rule-bound administration.',
    modernRelevance: 'Directly illuminates algorithmic management, corporate compliance cultures, credentialism, and multidimensional status stratification beyond income alone.',
    quote: 'The fate of our times is characterized by rationalization and intellectualization and, above all, by the disenchantment of the world.'
  },
  {
    id: 'dubois',
    name: 'W.E.B. Du Bois',
    lifespan: '1868–1963',
    tradition: 'Empirical & Public Sociology',
    region: 'United States / Ghana',
    magnumOpus: 'The Philadelphia Negro (1899) · The Souls of Black Folk (1903)',
    signatureConcepts: ['Double Consciousness', 'The Color Line', 'Empirical Urban Ethnography', 'Public & Psychological Wage'],
    coreThesis: 'Racial stratification is not a biological given but a historically constructed structural system intertwined with global capitalism, shaping both institutional access and subjective self-perception.',
    modernRelevance: 'Foundational to modern quantitative urban sociology, health disparity mapping, data visualization in social science, and global postcolonial analysis.',
    quote: 'The problem of the twentieth century is the problem of the color-line.'
  },
  {
    id: 'addams',
    name: 'Jane Addams',
    lifespan: '1860–1935',
    tradition: 'Empirical & Public Sociology',
    region: 'United States',
    magnumOpus: 'Hull-House Maps and Papers (1895) · Democracy and Social Ethics (1902)',
    signatureConcepts: ['Sympathetic Knowledge', 'Settlement Sociology', 'Spatial Demographic Mapping', 'Civic Pragmatism'],
    coreThesis: 'Rigorous sociological inquiry must be practiced alongside communities rather than above them—combining granular neighborhood data mapping with democratic social reform.',
    modernRelevance: 'Pioneered participatory action research, public health sanitation advocacy, labor protections, and GIS neighborhood inequality mapping.',
    quote: 'Action is indeed the sole medium of expression for ethics.'
  },
  {
    id: 'bourdieu',
    name: 'Pierre Bourdieu',
    lifespan: '1930–2002',
    tradition: 'Conflict & Critical',
    region: 'France',
    magnumOpus: 'Distinction: A Social Critique of the Judgement of Taste (1979)',
    signatureConcepts: ['Habitus', 'Cultural & Social Capital', 'Social Fields', 'Symbolic Violence'],
    coreThesis: 'Social inequality is reproduced not only through financial wealth, but through embodied dispositions (habitus), educational credentials, social networks, and cultural tastes treated as natural merit.',
    modernRelevance: 'Essential for analyzing higher education admissions, elite professional networking, digital creator clout, and intergenerational mobility.',
    quote: 'Taste classifies, and it classifies the classifier.'
  }
];

export const COMPARISON_MATRIX: ComparisonDimension[] = [
  {
    id: 'unit-of-analysis',
    dimension: 'Primary Unit of Analysis',
    category: 'Core Focus',
    sociology: 'Social groups, institutions, communities, organizational networks, stratification systems, and macro-societal structures.',
    psychology: 'The individual organism—cognition, emotion, perception, personality traits, neurobiology, and intrapersonal mental processes.',
    sharedBridge: 'Social Psychology examines how institutional norms and group contexts directly shape individual attitudes and identity.'
  },
  {
    id: 'explanatory-locus',
    dimension: 'Explanatory Mechanism',
    category: 'Core Focus',
    sociology: 'External social forces: cultural norms, socioeconomic class, legal rules, neighborhood ecology, and historical power relations.',
    psychology: 'Internal dispositions: cognitive schemas, developmental history, neurochemical pathways, conditioning, and behavioral reinforcement.',
    sharedBridge: 'Both reject simplistic determinism, recognizing a dynamic reciprocal feedback loop between personal agency and social environment.'
  },
  {
    id: 'classic-example',
    dimension: 'Diagnostic Case: Workplace Burnout',
    category: 'Application',
    sociology: 'Investigates shift-work scheduling policies, wage stagnation, algorithmic surveillance, union density, and childcare infrastructure.',
    psychology: 'Investigates individual stress-coping strategies, resilience training, cognitive reframing, and clinical anxiety symptomatology.',
    sharedBridge: 'Occupational Health initiatives combine organizational structural redesign with individual psychological counseling.'
  },
  {
    id: 'research-methods',
    dimension: 'Dominant Research Methodologies',
    category: 'Methodology',
    sociology: 'Population-scale censuses, longitudinal panel surveys, comparative-historical analysis, urban ethnography, and social network analysis.',
    psychology: 'Controlled laboratory experiments, psychometric testing, neuroimaging (fMRI/EEG), clinical trials, and behavioral observation.',
    sharedBridge: 'Mixed-methods survey design, field experiments, and longitudinal developmental cohort studies.'
  },
  {
    id: 'career-trajectories',
    dimension: 'Primary Professional Arenas',
    category: 'Application',
    sociology: 'Public policy analysis, urban planning, people analytics, epidemiology, UX research, NGO leadership, and criminal justice reform.',
    psychology: 'Clinical psychotherapy, counseling, neuropsychology, school psychology, human factors engineering, and psychiatric research.',
    sharedBridge: 'Behavioral public policy, consumer insights research, healthcare patient advocacy, and organizational development.'
  }
];

export const SOCIOLOGY_BRANCHES: SociologyBranch[] = [
  {
    id: 'medical-sociology',
    name: 'Medical & Health Sociology',
    scale: 'Meso & Cross-Scale',
    coreQuestion: 'How do socioeconomic status, neighborhood environment, and institutional care structures determine who gets sick and who recovers?',
    overview: 'Examines the social determinants of health (SDOH), the social construction of illness, hospital organizational cultures, and nurse-patient communication dynamics.',
    keyMethods: 'Epidemiological cohort linkage, clinical ethnography, spatial morbidity mapping',
    realWorldExample: 'Mapping how urban transit access and paid sick-leave policies increase preventive maternal care attendance by 38%.',
    primaryMetric: '80% of modifiable health outcomes trace to non-clinical social determinants'
  },
  {
    id: 'digital-sociology',
    name: 'Digital & Computational Sociology',
    scale: 'Meso & Cross-Scale',
    coreQuestion: 'How do recommendation algorithms, platform architectures, and AI systems reshape human identity, labor, and collective action?',
    overview: 'Investigates online community formation, algorithmic bias in hiring and credit scoring, platform gig work, and computational analysis of digital trace data.',
    keyMethods: 'Network graph topology, algorithmic auditing, digital ethnography, NLP text mining',
    realWorldExample: 'Auditing automated resume-screening pipelines to eliminate demographic penalty bias across 120,000 job applications.',
    primaryMetric: '5.4B+ global internet users embedded in algorithmic information flows'
  },
  {
    id: 'urban-sociology',
    name: 'Urban & Civic Sociology',
    scale: 'Macro-Structural',
    coreQuestion: 'How does the physical and economic design of cities shape social cohesion, housing equity, and climate resilience?',
    overview: 'Studies metropolitan growth, gentrification, residential segregation, public transit equity, and "social infrastructure" such as libraries, parks, and plazas.',
    keyMethods: 'GIS spatial econometrics, neighborhood census panels, street-level observation',
    realWorldExample: 'Eric Klinenberg’s landmark study showing how neighborhoods with active libraries and public squares experienced 60% lower mortality during extreme heatwaves.',
    primaryMetric: '68% of the world population projected to live in urban areas by 2050'
  },
  {
    id: 'education-sociology',
    name: 'Sociology of Education',
    scale: 'Meso & Cross-Scale',
    coreQuestion: 'Do educational institutions act as engines of upward social mobility or mechanisms that reproduce existing class hierarchies?',
    overview: 'Analyzes curriculum design, school funding formulas, teacher expectations, the "hidden curriculum," cultural capital, and digital divide barriers.',
    keyMethods: 'Multilevel longitudinal tracking, classroom interaction coding, policy evaluation',
    realWorldExample: 'Evaluating universal free school meal and early-childhood literacy programs on 10-year college completion rates.',
    primaryMetric: '2.4x higher degree completion when wrap-around family support is integrated'
  },
  {
    id: 'economic-workplace',
    name: 'Economic & Organizational Sociology',
    scale: 'Macro-Structural',
    coreQuestion: 'How are markets, corporations, and labor relations embedded within social networks, trust norms, and institutional rules?',
    overview: 'Explores how interpersonal ties ("the strength of weak ties" by Mark Granovetter), corporate governance, and workplace culture drive innovation and equity.',
    keyMethods: 'Organizational network analysis, labor market panel surveys, board interlock mapping',
    realWorldExample: 'Demonstrating that cross-departmental "weak ties" account for 73% of high-impact career mobility and internal innovation.',
    primaryMetric: '73% of professional role transitions occur via bridged network ties'
  },
  {
    id: 'micro-interaction',
    name: 'Symbolic Interaction & Everyday Life',
    scale: 'Micro-Interactionist',
    coreQuestion: 'How do individuals construct shared reality, social roles, and self-identity through moment-to-moment symbols and conversation?',
    overview: 'Focuses on Erving Goffman’s presentation of self, conversational turn-taking, emotional labor (Arlie Hochschild), and stigma management in daily encounters.',
    keyMethods: 'Ethnomethodology, conversation analysis, micro-observational fieldwork',
    realWorldExample: 'Studying how frontline healthcare workers manage "emotional labor" to prevent burnout and strengthen patient trust.',
    primaryMetric: '100s of micro-rituals per day sustain institutional trust and order'
  }
];

export const TEN_CORE_POINTS: CorePoint[] = [
  {
    number: '01',
    title: 'Understanding Human Behavior in Context',
    domain: 'Foundational Epistemology',
    summary: 'Reveals how personal choices—from marriage and career paths to voting and consumption—are shaped by invisible social norms, historical eras, and group memberships.',
    caseEvidence: 'C. Wright Mills’ distinction between "personal troubles of milieu" and "public issues of social structure."',
    actionableTakeaway: 'Replaces individual blame with rigorous contextual diagnosis when analyzing human decisions.'
  },
  {
    number: '02',
    title: 'Solving Complex Social Problems',
    domain: 'Applied Public Policy',
    summary: 'Equips policymakers and civic leaders with empirical root-cause analysis to address poverty, housing instability, educational gaps, and demographic aging.',
    caseEvidence: 'Housing-First municipal interventions grounded in sociological fieldwork reduced chronic homelessness by up to 71% in trial cities.',
    actionableTakeaway: 'Shifts resources from costly downstream symptom management to upstream structural solutions.'
  },
  {
    number: '03',
    title: 'Personal Growth & Perspective-Taking Empathy',
    domain: 'Human Development',
    summary: 'Cultivates intellectual humility and reflexive self-awareness by enabling individuals to step outside their own biographical bubble and understand diverse lived realities.',
    caseEvidence: 'Peter Berger’s "Invitation to Sociology" (1963): seeing the strange in the familiar and the general in the particular.',
    actionableTakeaway: 'Builds resilient interpersonal leadership and reduces polarization in civic life.'
  },
  {
    number: '04',
    title: 'Policy, Nursing & Healthcare Relevance',
    domain: 'Clinical & Public Health',
    summary: 'Integrates Social Determinants of Health (SDOH) into nursing and clinical practice, improving patient adherence, diagnostic accuracy, and community health equity.',
    caseEvidence: 'WHO Commission on Social Determinants of Health demonstrates that neighborhood and occupational conditions outweigh genetic factors in life expectancy.',
    actionableTakeaway: 'Essential competency for modern nursing curricula, hospital administration, and epidemiology.'
  },
  {
    number: '05',
    title: 'Educational Integration & Equity',
    domain: 'Pedagogy & Mobility',
    summary: 'Uncovers how classroom structures, peer networks, and family cultural capital influence student achievement, guiding inclusive pedagogy.',
    caseEvidence: 'James Coleman and Pierre Bourdieu’s empirical studies on social and cultural capital in schooling.',
    actionableTakeaway: 'Helps educators design classrooms where first-generation and diverse learners thrive.'
  },
  {
    number: '06',
    title: 'Cross-Cultural Competency',
    domain: 'Global Citizenship',
    summary: 'Dismantles ethnocentrism through cultural relativism—analyzing customs, languages, and belief systems within their own historical and ecological logic.',
    caseEvidence: 'Comparative cross-national values surveys (World Values Survey covering 120+ societies).',
    actionableTakeaway: 'Prepares professionals for international diplomacy, global teams, and multicultural service.'
  },
  {
    number: '07',
    title: 'Crime, Law & Restorative Justice Dynamics',
    domain: 'Criminology & Legal Studies',
    summary: 'Examines how laws are created, how neighborhood opportunity structures affect delinquency, and how rehabilitative systems reduce recidivism.',
    caseEvidence: 'Robert Sampson’s Project on Human Development in Chicago Neighborhoods showing "collective efficacy" lowers community violence.',
    actionableTakeaway: 'Informs evidence-based policing, juvenile diversion, and restorative justice programs.'
  },
  {
    number: '08',
    title: 'Economic & Workplace Network Insights',
    domain: 'Organizational Science',
    summary: 'Maps informal communication networks, psychological safety, and organizational culture to boost productivity and equitable advancement.',
    caseEvidence: 'Mark Granovetter’s "Strength of Weak Ties" and modern people-analytics studies on hybrid team cohesion.',
    actionableTakeaway: 'Drives high-performing, low-turnover organizational design in technology and enterprise sectors.'
  },
  {
    number: '09',
    title: 'Global Interdependence & Migration Flows',
    domain: 'Macro-Globalization',
    summary: 'Traces how commodity chains, digital networks, climate patterns, and demographic shifts connect local communities to global political economy.',
    caseEvidence: 'Immanuel Wallerstein’s World-Systems Analysis and Saskia Sassen’s "Global Cities" framework.',
    actionableTakeaway: 'Enables strategic foresight for supply chains, humanitarian NGOs, and international governance.'
  },
  {
    number: '10',
    title: 'Shaping Ethical Future Societies',
    domain: 'Anticipatory Governance',
    summary: 'Provides the ethical and empirical guardrails needed to align emerging technologies—artificial intelligence, biotechnology, and green transitions—with human dignity.',
    caseEvidence: 'Algorithmic impact assessments and sociotechnical systems engineering adopted by global standards bodies.',
    actionableTakeaway: 'Ensures technological progress strengthens rather than erodes democratic solidarity.'
  }
];

export const CAREER_PATHWAYS: CareerPathway[] = [
  {
    id: 'ux-mixed-methods',
    role: 'Staff UX & Mixed-Methods Researcher',
    pillar: 'Earn',
    sector: 'Tech & Data',
    salaryRange: '$98,000 – $158,000',
    growthRate: '+18% (10-Yr Outlook)',
    overview: 'Bridges qualitative ethnography and quantitative product telemetry to ensure digital platforms, AI tools, and civic services fit real human contexts.',
    coreSkills: ['Ethnographic Fieldwork', 'Survey Design', 'Usability Testing', 'SQL / R Statistical Analysis'],
    typicalEmployers: ['Global Tech Platforms', 'Civic Tech Labs', 'Healthcare Digital Products', 'Design Consultancies']
  },
  {
    id: 'people-analytics',
    role: 'People Analytics & Organizational Scientist',
    pillar: 'Grow',
    sector: 'Tech & Data',
    salaryRange: '$94,000 – $148,000',
    growthRate: '+21% (10-Yr Outlook)',
    overview: 'Uses organizational network analysis (ONA) and longitudinal employee surveys to optimize team collaboration, leadership pipelines, and pay equity.',
    coreSkills: ['Organizational Network Analysis', 'Multivariate Regression', 'Python / R', 'Executive Storytelling'],
    typicalEmployers: ['Fortune 500 Enterprises', 'Management Consultancies', 'Research Institutes']
  },
  {
    id: 'public-policy-analyst',
    role: 'Senior Public Policy & Social Impact Analyst',
    pillar: 'Serve',
    sector: 'Public & Policy',
    salaryRange: '$76,000 – $124,000',
    growthRate: '+12% (10-Yr Outlook)',
    overview: 'Evaluates legislation and social programs across housing, education, criminal justice, and climate adaptation using rigorous causal inference.',
    coreSkills: ['Program Evaluation', 'Causal Inference', 'Policy Brief Writing', 'Stakeholder Facilitation'],
    typicalEmployers: ['Brookings / Urban Institute', 'Municipal & Federal Agencies', 'Legislative Research Bureaus']
  },
  {
    id: 'clinical-health-sociologist',
    role: 'Public Health & Clinical Epidemiological Researcher',
    pillar: 'Serve',
    sector: 'Healthcare & Clinical',
    salaryRange: '$82,000 – $130,000',
    growthRate: '+19% (10-Yr Outlook)',
    overview: 'Partners with nursing leaders, hospitals, and public health departments to design interventions addressing social determinants of health and patient equity.',
    coreSkills: ['Social Epidemiology', 'Biostatistics', 'Community-Based Participatory Research', 'Clinical Protocol Design'],
    typicalEmployers: ['Academic Medical Centers', 'WHO / Public Health Agencies', 'Health Equity Foundations']
  },
  {
    id: 'ngo-impact-director',
    role: 'Global Development & Social Return Director',
    pillar: 'Return',
    sector: 'NGO & Global',
    salaryRange: '$75,000 – $118,000',
    growthRate: '+14% (10-Yr Outlook)',
    overview: 'Leads international and community-rooted programs in education, sustainable livelihoods, and humanitarian resilience while measuring Social Return on Investment (SROI).',
    coreSkills: ['Monitoring & Evaluation (M&E)', 'Cross-Cultural Field Leadership', 'Grant Strategy', 'Participatory Rural Appraisal'],
    typicalEmployers: ['UN Agencies', 'International NGOs', 'Philanthropic Endowments', 'Social Enterprises']
  },
  {
    id: 'computational-faculty',
    role: 'Computational Social Scientist & Faculty Fellow',
    pillar: 'Learn',
    sector: 'Academia & Research',
    salaryRange: '$78,000 – $136,000',
    growthRate: '+15% (10-Yr Outlook)',
    overview: 'Advances foundational sociological theory and mentors the next generation of scholars while leading grant-funded labs on digital society and stratification.',
    coreSkills: ['Mixed-Methods Research Design', 'Academic Publishing', 'Curriculum Pedagogy', 'Grant Principal Investigation'],
    typicalEmployers: ['Research Universities', 'National Science Academies', 'Independent Policy Labs']
  }
];

export const STUDY_RESOURCES: StudyResource[] = [
  {
    id: 'res-pdf-foundations',
    title: 'Foundations of Sociology: Complete Compendium (Comte to Digital Era)',
    format: 'PDF Guide',
    level: 'Undergraduate & Graduate Core',
    pagesOrSlides: '42 Pages Equivalent',
    updatedDate: '2026 Edition',
    summary: 'Comprehensive master reference covering definitions, the Sociological Imagination, Functionalism, Conflict Theory, Symbolic Interactionism, and comparative matrices.',
    outline: [
      '1. Defining Sociology & The Sociological Imagination (C. Wright Mills)',
      '2. Classical Triumvirate & Pioneers: Comte, Martineau, Marx, Durkheim, Weber, Du Bois, Addams',
      '3. Side-by-Side Paradigm Matrix: Macro vs. Micro Analytical Levels',
      '4. Sociology vs. Psychology: Boundaries, Overlaps, and Social Psychology'
    ],
    fileName: 'SocioSphere_Foundations_Compendium_2026.txt',
    contentBody: `SOCIOSPHERE ACADEMIC COMPENDIUM (2026 EDITION)
Title: Foundations of Sociology — Complete Reference Guide
Tagline: Learn • Earn • Serve • Grow • Return
====================================================================

1. WHAT IS SOCIOLOGY?
Sociology is the systematic, empirical, and objective study of human society, social institutions, patterns of social relationships, and the cultural norms that both shape and are shaped by human action.

Key Formulation — C. Wright Mills (1959), "The Sociological Imagination":
The vivid awareness of the relationship between personal biography (individual lived experience) and historical/structural context (public issues).

2. CORE THEORETICAL PARADIGMS
A. Structural Functionalism (Durkheim, Parsons, Merton)
   - Level: Macro-Structural
   - Core Question: How is social order, cohesion, and stability maintained across generations?
   - Key Concepts: Social Facts, Mechanical & Organic Solidarity, Anomie, Manifest & Latent Functions.

B. Conflict & Critical Theory (Marx, Du Bois, Bourdieu, Collins)
   - Level: Macro-Structural
   - Core Question: How are scarce resources, power, and prestige unequally distributed, and how do dominant groups reproduce privilege?
   - Key Concepts: Historical Materialism, Class Consciousness, Double Consciousness, Habitus, Cultural Capital, Intersectionality.

C. Symbolic Interactionism (Mead, Blumer, Goffman, Hochschild)
   - Level: Micro-Interactionist
   - Core Question: How do individuals construct meaning, self-identity, and social order through everyday face-to-face interactions and symbols?
   - Key Concepts: Looking-Glass Self, Dramaturgy (Front Stage / Back Stage), Impression Management, Emotional Labor.

3. THE 10 CORE PILLARS OF SOCIOLOGICAL IMPORTANCE
01. Understanding Human Behavior in Context
02. Solving Complex Social Problems Upstream
03. Personal Growth & Perspective-Taking Empathy
04. Policy, Nursing & Clinical Healthcare Relevance (SDOH)
05. Educational Integration & Mobility
06. Cross-Cultural Competency
07. Crime, Law & Restorative Justice Dynamics
08. Economic & Workplace Network Insights
09. Global Interdependence & Migration Flows
10. Shaping Ethical Future Societies & AI Governance`
  },
  {
    id: 'res-ppt-theories',
    title: 'Lecture Slide Deck: Classical vs. Contemporary Sociological Paradigms',
    format: 'PPT Deck',
    level: 'Seminar & Teaching Deck',
    pagesOrSlides: '28 Structured Slides',
    updatedDate: '2026 Edition',
    summary: 'Ready-to-present lecture slide structure with speaker notes, visual diagram prompts, and seminar discussion questions for classroom or study group use.',
    outline: [
      'Slide 01–05: The Industrial & Democratic Revolutions That Birthed Sociology',
      'Slide 06–14: Comparative Deep Dive — Marx, Durkheim, Weber, Du Bois, Addams',
      'Slide 15–22: Micro-Sociology — Goffman’s Dramaturgy & Garfinkel’s Ethnomethodology',
      'Slide 23–28: Digital Sociology — Networks, Algorithms, and Platform Capitalism'
    ],
    fileName: 'SocioSphere_Paradigms_SlideDeck_Outline.txt',
    contentBody: `SOCIOSPHERE LECTURE SLIDE DECK & SPEAKER NOTES
Course Module: Classical & Contemporary Sociological Paradigms
====================================================================

[SLIDE 1] Title: The Science of Society: Why Structure Matters
- Visual Prompt: Isometric diagram linking individual biography to macro-institutions.
- Speaker Note: Begin by asking students to list three decisions they made this morning, then trace the invisible institutional rules behind each.

[SLIDE 2] Durkheim & The Reality of Social Facts
- Definition: Social facts consist of manners of acting, thinking, and feeling external to the individual, invested with a coercive power by virtue of which they exercise control.
- Case Data: Durkheim's 1897 comparative suicide rates across social integration levels.

[SLIDE 3] Marx & Material Relations of Production
- Base vs. Superstructure diagram.
- Four types of alienation in industrial and platform work: from product, act of production, species-being, and fellow workers.

[SLIDE 4] Weber, Verstehen & The Bureaucratic Iron Cage
- Four types of social action: Instrumental-Rational, Value-Rational, Affectual, Traditional.
- Characteristics of ideal-type bureaucracy and modern algorithmic rationalization.

[SLIDE 5] Du Bois & Addams: The Birth of American Empirical Sociology
- Seventh Ward Philadelphia household census (1899) & Hull-House demographic maps (1895).`
  },
  {
    id: 'res-slideshare-nursing',
    title: 'Slideshare Reference: Sociology in Nursing, Medicine & Public Health',
    format: 'Slideshare Notes',
    level: 'Allied Health & Medical Sociology',
    pagesOrSlides: '18 Clinical Modules',
    updatedDate: '2026 Edition',
    summary: 'Specialized study briefing for BSc Nursing, MPH, and pre-med cohorts detailing Social Determinants of Health (SDOH), illness behavior, and community epidemiology.',
    outline: [
      'Module 1: Disease (Biomedical) vs. Illness (Lived Social Experience)',
      'Module 2: Talcott Parsons’ "Sick Role" & Modern Chronic Illness Critiques',
      'Module 3: Social Determinants of Health (Housing, Nutrition, Occupation, Trust)',
      'Module 4: Cultural Safety in Clinical Triage & Patient Advocacy'
    ],
    fileName: 'SocioSphere_Sociology_In_Nursing_And_Health.txt',
    contentBody: `SOCIOSPHERE CLINICAL & PUBLIC HEALTH BRIEFING
Topic: Applied Sociology for Nursing, Medicine & Allied Health Professionals
====================================================================

1. WHY SOCIOLOGY IS MANDATORY IN NURSING & HEALTHCARE
Clinical medicine treats biological pathology inside the body; Medical Sociology examines the social, economic, and environmental conditions outside the body that cause 80% of preventable morbidity.

2. DISEASE VS. ILLNESS
- Disease: Objective physiological dysfunction diagnosed via clinical biomarkers.
- Illness: The subjective, socially patterned experience of symptoms, stigma, help-seeking behavior, and family caretaking.

3. CLINICAL APPLICATION CHECKLIST FOR NURSES & PRACTITIONERS
[ ] Assess Structural Barriers: Does the patient have refrigeration for insulin, reliable transit for follow-ups, and paid leave?
[ ] Practice Cultural Humility: Understand family decision-making structures and linguistic nuances without stereotyping.
[ ] Mitigate Institutional Bias: Ensure pain assessment and triage protocols remain equitable across socioeconomic and racial groups.`
  },
  {
    id: 'res-assignment-rubric',
    title: 'Empirical Research Proposal & Fieldwork Assignment Guidelines',
    format: 'Assignment Rubric',
    level: 'Research Methods Lab',
    pagesOrSlides: '12-Point Rubric & Protocol',
    updatedDate: '2026 Edition',
    summary: 'Step-by-step methodological manual for designing sociological research questions, IRB ethics compliance, sampling strategies, and mixed-methods data coding.',
    outline: [
      'Phase 1: Formulating an Empirical Research Question (Independent vs. Dependent Variables)',
      'Phase 2: Sampling Strategy (Stratified Random vs. Purposive Snowball Sampling)',
      'Phase 3: Instrument Design (Likert Scales & Semi-Structured Interview Guides)',
      'Phase 4: Ethical Safeguards (Informed Consent, Anonymization, Reflexivity)'
    ],
    fileName: 'SocioSphere_Research_Methods_Assignment_Guide.txt',
    contentBody: `SOCIOSPHERE EMPIRICAL RESEARCH ASSIGNMENT & RUBRIC
Module: Sociological Research Methods & Fieldwork Protocol
====================================================================

STEP 1: FORMULATING YOUR RESEARCH QUESTION
Avoid normative "should" questions. Frame an empirical question testing a relationship between social variables:
- Weak: "Is social media bad for teenagers?"
- Strong: "How does daily active engagement on short-form video platforms correlate with perceived neighborhood social cohesion among urban high school students (ages 14–18)?"

STEP 2: METHODOLOGICAL TRIANGULATION
Combine Quantitative Breadth + Qualitative Depth:
1. Survey Instrument (N >= 100): Measure demographic controls and standardized indices.
2. Semi-Structured Interviews (N = 12–15): Probe lived mechanisms and narrative context.

STEP 3: ETHICAL RESEARCH CHECKLIST (IRB STANDARDS)
- Explicit voluntary informed consent
- Strict pseudonymization of participants and field sites
- Transparent researcher reflexivity statement`
  },
  {
    id: 'res-study-template',
    title: 'Structured Study Notes Template: Comparative Thinker & Theory Matrix',
    format: 'Study Template',
    level: 'Exam & Thesis Prep',
    pagesOrSlides: 'Interactive Worksheet',
    updatedDate: '2026 Edition',
    summary: 'Printable and editable Cornell-style sociological synthesis worksheet for comparing theorists, empirical studies, and policy implications.',
    outline: [
      'Section A: Historical Context & Biographical Anchor',
      'Section B: Core Analytical Concepts & Definitions',
      'Section C: Empirical Evidence & Methodological Approach',
      'Section D: Contemporary Critique & Policy Application'
    ],
    fileName: 'SocioSphere_Cornell_Study_Matrix_Template.txt',
    contentBody: `SOCIOSPHERE STRUCTURED STUDY NOTES TEMPLATE
Framework: Comparative Sociological Thinker & Theory Matrix
====================================================================

THEORIST / STUDY TITLE: ____________________________________________
HISTORICAL ERA & CONTEXT: __________________________________________

1. CORE ANALYTICAL THESIS (In 2 Sentences):
____________________________________________________________________
____________________________________________________________________

2. THREE KEY CONCEPTS & DEFINITIONS:
- Concept A: _______________________________________________________
- Concept B: _______________________________________________________
- Concept C: _______________________________________________________

3. LEVEL OF ANALYSIS & METHODOLOGY:
[ ] Macro-Structural   [ ] Meso-Institutional   [ ] Micro-Interactionist
Primary Evidence Used: _____________________________________________

4. DIALOGUE & CRITIQUE:
How would a rival sociological paradigm critique this argument?
____________________________________________________________________

5. MODERN APPLICATION (2026 Case Example):
____________________________________________________________________`
  }
];
