import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_INSTRUCTION = `You are SocioAI, an expert sociological research assistant for SocioSphere ("A Universal Knowledge Hub for the Science of Society"). Provide objective, well-sourced, empathetic, and academically accurate explanations across classical and contemporary sociological theories, research methodologies, social stratification, public policy, healthcare sociology, digital sociology, and career pathways. Structure responses clearly with headings, bullet points, and citations to foundational or modern scholars where relevant.`;

const FALLBACK_KNOWLEDGE_BASE: Record<string, string> = {
  functionalism: `### Structural Functionalism vs. Conflict Theory

In sociological analysis, **Structural Functionalism** and **Conflict Theory** represent two foundational macro-level paradigms that interpret how social order is maintained and transformed.

#### 1. Structural Functionalism (Durkheim, Parsons, Merton)
* **Core Premise:** Society is a complex, interconnected system whose parts work together to promote solidarity, stability, and equilibrium.
* **Key Mechanisms:** Social institutions (family, education, healthcare, law) perform *manifest functions* (intended outcomes) and *latent functions* (unintended stabilizing consequences).
* **View of Social Change:** Gradual, evolutionary adaptation when dysfunctions arise; rapid disruption is viewed as a threat to social cohesion (*anomie*).

#### 2. Conflict Theory (Marx, Weber, Du Bois, C. Wright Mills)
* **Core Premise:** Society is an arena of structural inequality where groups compete for scarce economic, political, and cultural resources.
* **Key Mechanisms:** Dominant groups maintain power through institutional control, ideology, and material ownership, while marginalized groups advocate for structural redistribution.
* **View of Social Change:** Inevitable and necessary engine of historical progress driven by resolving systemic contradictions across class, race, and gender.

#### Comparative Synthesis
While Functionalism excels at explaining **institutional persistence and consensus**, Conflict Theory illuminates **power asymmetries, stratification, and historical transformation**. Modern sociologists frequently integrate both alongside **Symbolic Interactionism** to capture micro-level meaning-making.`,

  careers: `### Top 5 High-Impact Sociology Career Pathways

A sociology degree cultivates rigorous empirical research skills, statistical literacy, institutional analysis, and cross-cultural competency—skills in high demand across public, private, and non-profit sectors.

#### 1. People Analytics & Organizational Research Scientist
* **Sector:** Technology, Fortune 500 Enterprises, Management Consulting
* **Focus:** Analyzing workplace networks, retention dynamics, equity audits, and organizational culture using quantitative survey design and R/Python.
* **Median Compensation Range:** $92,000 – $145,000+

#### 2. Public Policy & Social Impact Analyst
* **Sector:** Think Tanks, Government Agencies, Legislative Research Bureaus
* **Focus:** Evaluating housing policy, educational equity, criminal justice reform, and welfare programs through quasi-experimental and longitudinal data.
* **Median Compensation Range:** $78,000 – $122,000

#### 3. User Experience (UX) & Mixed-Methods Researcher
* **Sector:** Product Design, Digital Platforms, Civic Tech
* **Focus:** Conducting ethnographic fieldwork, in-depth interviewing, and usability studies to translate human social behavior into accessible digital products.
* **Median Compensation Range:** $95,000 – $155,000

#### 4. Clinical & Public Health Epidemiological Sociologist
* **Sector:** Hospitals, WHO/CDC, Healthcare Systems, Nursing Research
* **Focus:** Investigating social determinants of health (SDOH), patient adherence barriers, healthcare disparities, and community morbidity patterns.
* **Median Compensation Range:** $82,000 – $128,000

#### 5. ESG, Sustainability & NGO Program Director
* **Sector:** International Foundations, Environmental Justice Orgs, Corporate Social Responsibility
* **Focus:** Designing community-led interventions, measuring social return on investment (SROI), and leading global development initiatives.
* **Median Compensation Range:** $75,000 – $118,000`,

  health: `### How Sociology Transforms Public Health & Clinical Nursing

**Medical Sociology** examines how social structures, cultural norms, and economic stratification directly shape physical and mental health outcomes beyond purely biological factors.

#### 1. Social Determinants of Health (SDOH)
Up to **80% of modifiable health outcomes** are driven by non-clinical factors: neighborhood safety, food security, housing stability, occupational hazards, and educational access. Sociological mapping allows public health teams to target upstream root causes rather than only downstream symptoms.

#### 2. Cultural Competency & Patient-Provider Trust
Sociological training equips nurses and physicians to understand *illness behavior*—how patients from diverse cultural, socioeconomic, and linguistic backgrounds interpret symptoms, navigate stigma, and make treatment decisions.

#### 3. Institutional Epidemiology & Health Equity
By analyzing systemic disparities (such as maternal mortality gaps or rural hospital closures), medical sociologists design community-grounded interventions that increase vaccination uptake, chronic disease management, and preventive care access.`
};

function generateScholarlyFallback(prompt: string): string {
  const lower = prompt.toLowerCase();
  if (lower.includes('functionalism') || lower.includes('conflict')) {
    return FALLBACK_KNOWLEDGE_BASE.functionalism;
  }
  if (lower.includes('career') || lower.includes('job') || lower.includes('salary') || lower.includes('earn')) {
    return FALLBACK_KNOWLEDGE_BASE.careers;
  }
  if (lower.includes('health') || lower.includes('nurs') || lower.includes('medical') || lower.includes('epidemiol')) {
    return FALLBACK_KNOWLEDGE_BASE.health;
  }

  return `### Sociological Research Synthesis: "${prompt}"

#### 1. Conceptual Framing & The Sociological Imagination
Drawing on C. Wright Mills' concept of the **Sociological Imagination** (1959), examining *"${prompt}"* requires connecting **personal biographies** (individual lived experiences) with **historical and structural forces** (institutions, norms, and political economy).

#### 2. Multi-Paradigm Analytical Lens
* **Macro-Structural Perspective:** Evaluates how legal, economic, and educational institutions establish the boundaries and resource distribution surrounding this phenomenon.
* **Micro-Interactionist Perspective (Goffman, Mead):** Examines how everyday symbols, language, and face-to-face interactions construct shared meaning and social identity in this domain.
* **Critical & Historical Perspective (Marx, Weber, Du Bois):** Investigates whose interests are served by current arrangements and how historical power dynamics shape contemporary outcomes.

#### 3. Empirical Research Methodology
To study this topic rigorously, sociologists employ **mixed-methods triangulation**:
1. **Quantitative Analysis:** Longitudinal panel surveys, census microdata, and multivariate regression to identify statistically significant macro-patterns.
2. **Qualitative Fieldwork:** Semi-structured interviews, participant observation, and archival content analysis to uncover lived mechanisms and cultural context.`;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '2mb' }));

  // Health check endpoint for Cloud Run / container probes
  app.get('/healthz', (_req, res) => {
    res.status(200).json({ status: 'ok', service: 'SocioSphere', timestamp: new Date().toISOString() });
  });

  // SocioAI Assistant API Endpoint
  app.post('/api/socio-ai', async (req, res) => {
    const { prompt, history = [] } = req.body || {};

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      res.status(400).json({ error: 'A valid sociological query is required.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    const hasValidKey = Boolean(
      apiKey &&
      apiKey.trim() !== '' &&
      apiKey !== 'MY_GEMINI_API_KEY' &&
      apiKey !== 'undefined'
    );

    if (!hasValidKey) {
      res.status(200).json({
        reply: generateScholarlyFallback(prompt.trim()),
        source: 'curated-corpus',
        model: 'SocioSphere Academic Corpus'
      });
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const conversationContext = Array.isArray(history) && history.length > 0
        ? history
            .slice(-6)
            .map((m: { role: string; text: string }) => `${m.role === 'user' ? 'Researcher' : 'SocioAI'}: ${m.text}`)
            .join('\n\n') + `\n\nResearcher: ${prompt.trim()}`
        : prompt.trim();

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: conversationContext,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          temperature: 0.65,
        },
      });

      const replyText = response.text || generateScholarlyFallback(prompt.trim());

      res.status(200).json({
        reply: replyText,
        source: 'gemini-api',
        model: 'gemini-3.8-flash'
      });
    } catch (err) {
      console.error('SocioAI Gemini error, falling back gracefully:', err);
      res.status(200).json({
        reply: generateScholarlyFallback(prompt.trim()),
        source: 'curated-corpus',
        model: 'SocioSphere Academic Corpus'
      });
    }
  });

  const distPath = path.join(__dirname, 'dist');
  const hasBuiltDist = fs.existsSync(path.join(distPath, 'index.html'));

  if (process.env.NODE_ENV === 'production' || (hasBuiltDist && process.env.PORT && process.env.PORT !== '3000')) {
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SocioSphere server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start SocioSphere server:', err);
});
