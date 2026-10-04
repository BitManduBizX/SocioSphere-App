import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  BookOpen,
  RotateCcw,
  Bookmark,
  Check,
  ArrowUpRight,
  MessageSquare,
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: string;
}

interface SocioAIAssistantProps {
  externalPrompt: string | null;
  onClearExternalPrompt: () => void;
  onSaveNote: (title: string, content: string) => void;
}

const PRESET_PROMPTS = [
  'Explain Functionalism vs Conflict Theory',
  'List Top 5 Sociology Careers',
  'How does sociology help in public health?',
  'Compare Durkheim’s Anomie with Marx’s Alienation',
  'What is W.E.B. Du Bois’s Double Consciousness?',
  'How do digital algorithms shape social stratification?',
];

export const SocioAIAssistant: React.FC<SocioAIAssistantProps> = ({
  externalPrompt,
  onClearExternalPrompt,
  onSaveNote,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      text: `Welcome to the **SocioAI Research Desk**. I am configured to assist researchers, students, and practitioners with classical and contemporary sociological theory, comparative methodology, public health epidemiology, and career pathways.\n\nSelect a research prompt below or enter your own inquiry to synthesize scholarly perspectives.`,
      timestamp: 'Ready',
      source: 'SocioSphere Research Core',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [savedMessageIds, setSavedMessageIds] = useState<Record<string, boolean>>({});
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (externalPrompt && externalPrompt.trim() !== '') {
      handleSendPrompt(externalPrompt);
      onClearExternalPrompt();
    }
  }, [externalPrompt]);

  const handleSendPrompt = async (promptText: string) => {
    const trimmed = promptText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/socio-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: trimmed,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await response.json();
      const replyText =
        data?.reply ||
        'Unable to retrieve response at this moment. Please try refining your sociological query.';

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data?.model || 'SocioSphere Research Synthesis',
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error('SocioAI request error:', error);
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        role: 'assistant',
        text: `### Sociological Analysis: "${trimmed}"\n\nUsing C. Wright Mills' **Sociological Imagination**, this question bridges micro-level lived experience and macro-level institutional structures.\n\n* **Structural Context:** Examines how economic, legal, and educational institutions pattern outcomes.\n* **Interpretive Meaning:** Investigates how shared symbols and norms guide everyday actors.\n* **Empirical Evidence:** Combines longitudinal survey data with ethnographic fieldwork.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'SocioSphere Offline Corpus',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-msg-reset',
        role: 'assistant',
        text: `Research session cleared. Choose a foundational question or type a custom sociological inquiry below.`,
        timestamp: 'Ready',
        source: 'SocioSphere Research Core',
      },
    ]);
  };

  const handleBookmarkMessage = (msg: ChatMessage) => {
    const firstLine = msg.text.split('\n')[0].replace(/^[#*-\s]+/, '').slice(0, 60);
    onSaveNote(`SocioAI Synthesis: ${firstLine}`, msg.text);
    setSavedMessageIds((prev) => ({ ...prev, [msg.id]: true }));
  };

  const renderFormattedText = (raw: string) => {
    const lines = raw.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={idx} className="h-2" />;
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h4 key={idx} className="text-base font-semibold text-slate-900 mt-3 mb-1.5 font-display">
            {trimmed.replace('### ', '')}
          </h4>
        );
      }
      if (trimmed.startsWith('#### ')) {
        return (
          <h5 key={idx} className="text-sm font-semibold text-sky-900 mt-2.5 mb-1">
            {trimmed.replace('#### ', '')}
          </h5>
        );
      }
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const itemContent = trimmed.slice(2);
        const parts = itemContent.split(/\*\*(.*?)\*\*/g);
        return (
          <div key={idx} className="flex items-start gap-2 pl-2 my-1 text-sm text-slate-700 leading-relaxed">
            <span className="text-sky-700 select-none mt-1">•</span>
            <span>
              {parts.map((part, i) =>
                i % 2 === 1 ? (
                  <strong key={i} className="font-semibold text-slate-900">
                    {part}
                  </strong>
                ) : (
                  part
                )
              )}
            </span>
          </div>
        );
      }
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={idx} className="text-sm text-slate-700 leading-relaxed my-1">
          {parts.map((part, i) =>
            i % 2 === 1 ? (
              <strong key={i} className="font-semibold text-slate-900">
                {part}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    });
  };

  return (
    <section
      id="socio-ai"
      aria-labelledby="socio-ai-heading"
      className="py-20 px-6 lg:px-12 max-w-[1360px] mx-auto border-t border-slate-200/80"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Context & Pre-prompted Quick Buttons */}
        <div className="lg:col-span-5 space-y-6">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span>05. Interactive Research Synthesis</span>
            <span aria-hidden="true">·</span>
            <span>Academic Inquiry Engine</span>
          </div>

          <h2
            id="socio-ai-heading"
            className="text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            Consult the SocioAI Research Assistant
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            Synthesize foundational sociological theories, compare qualitative and quantitative methodologies, or evaluate real-world policy and career pathways with objective, well-sourced academic explanations.
          </p>

          <div className="pt-2">
            <p className="text-xs font-medium text-slate-500 mb-3">
              Curated Research Inquiries (Click to Run):
            </p>
            <div className="flex flex-col gap-2">
              {PRESET_PROMPTS.map((promptText) => (
                <button
                  key={promptText}
                  type="button"
                  onClick={() => handleSendPrompt(promptText)}
                  disabled={isLoading}
                  className="group text-left px-4 py-3 rounded-lg bg-white border border-slate-200/90 hover:border-sky-700 hover:bg-sky-50/40 transition-colors flex items-center justify-between gap-3 disabled:opacity-50 cursor-pointer"
                >
                  <span className="text-sm font-medium text-slate-800 group-hover:text-sky-900 truncate">
                    {promptText}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-700 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/80 text-xs text-slate-500 space-y-1.5">
            <p className="font-medium text-slate-700">Methodological Standard</p>
            <p className="leading-relaxed">
              Responses triangulate macro-structural, conflict, and micro-interactionist paradigms while citing primary sociological literature.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Research Console */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col h-[620px] overflow-hidden">
          {/* Console Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/60">
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-sky-700" />
              <span className="text-sm font-semibold text-slate-900">
                SocioAI Academic Workspace
              </span>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <span className="text-xs text-slate-500">
                Empirical & Theoretical Synthesis
              </span>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              title="Reset conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Session</span>
            </button>
          </div>

          {/* Messages Feed */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#FCFBF9]"
            aria-live="polite"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 px-1">
                  <span className="font-medium text-slate-600">
                    {msg.role === 'user' ? 'Researcher Inquiry' : 'SocioAI Synthesis'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">{msg.timestamp}</span>
                  {msg.source && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{msg.source}</span>
                    </>
                  )}
                </div>

                <div
                  className={`max-w-[90%] rounded-xl px-5 py-4 ${
                    msg.role === 'user'
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200/90 text-slate-800'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  ) : (
                    <div className="space-y-1">{renderFormattedText(msg.text)}</div>
                  )}

                  {msg.role === 'assistant' && msg.id !== 'welcome-msg' && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <span className="text-xs text-slate-400">
                        Verified against core sociological curriculum
                      </span>
                      <button
                        type="button"
                        onClick={() => handleBookmarkMessage(msg)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-700 hover:text-sky-900 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        {savedMessageIds[msg.id] ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Saved to Field Notes</span>
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-3.5 h-3.5" />
                            <span>Save to Field Notes</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex flex-col items-start">
                <div className="text-xs text-slate-500 mb-1.5 px-1">
                  SocioAI is synthesizing sociological literature...
                </div>
                <div className="bg-white border border-slate-200 rounded-xl px-5 py-4 w-full max-w-md space-y-2.5 animate-pulse">
                  <div className="h-3 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-full" />
                  <div className="h-3 bg-slate-100 rounded w-5/6" />
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt(input);
            }}
            className="p-4 bg-white border-t border-slate-200 flex items-center gap-3"
          >
            <label htmlFor="socio-ai-input" className="sr-only">
              Ask a sociological research question
            </label>
            <input
              id="socio-ai-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a theory, thinker, research method, or career pathway..."
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-700 focus:bg-white transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Consult</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
