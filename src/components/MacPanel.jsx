import React, { useState, useMemo } from 'react';
import { Check, Copy } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';

// Helper to resolve Prism grammar and language ID safely
export function getGrammarAndLang(lang) {
  if (!lang) return { grammar: Prism.languages.javascript, langKey: 'javascript' };
  const l = lang.toLowerCase();
  if (l === 'bash' || l === 'sh' || l === 'shell' || l === 'terminal') {
    return { grammar: Prism.languages.bash || Prism.languages.plain, langKey: 'bash' };
  }
  if (l === 'html' || l === 'xml' || l === 'markup') {
    return { grammar: Prism.languages.markup || Prism.languages.plain, langKey: 'markup' };
  }
  if (l === 'json') {
    return { grammar: Prism.languages.json || Prism.languages.plain, langKey: 'json' };
  }
  return { grammar: Prism.languages.javascript || Prism.languages.plain, langKey: 'javascript' };
}

// Highlight any arbitrary code string with Prism
export function highlightCode(codeStr, lang = 'javascript') {
  if (!codeStr) return '';
  const { grammar, langKey } = getGrammarAndLang(lang);
  try {
    return Prism.highlight(codeStr.trim(), grammar, langKey);
  } catch {
    return codeStr.trim();
  }
}

export default function MacPanel({ 
  title = "example.js", 
  code, 
  language = "javascript", 
  tabs = null, 
  activeTab = null, 
  onTabChange = null,
  showLineNumbers = true 
}) {
  const [copied, setCopied] = useState(false);
  const [isHoveredDots, setIsHoveredDots] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');
  const highlightedHtml = useMemo(() => highlightCode(code, language), [code, language]);

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-stone-800 bg-[#0D1117] shadow-mac-panel transition-all duration-300 hover:border-stone-700">
      {/* macOS Topbar */}
      <div className="flex items-center justify-between border-b border-[#21262D] bg-[#161B22] px-4 py-3 select-none">
        {/* Left: macOS Traffic Lights & Tabs/Title */}
        <div className="flex items-center gap-4">
          {/* Traffic lights with authentic macOS micro-interaction on hover */}
          <div 
            className="flex items-center gap-2 cursor-pointer py-1"
            onMouseEnter={() => setIsHoveredDots(true)}
            onMouseLeave={() => setIsHoveredDots(false)}
          >
            <span className="relative flex h-3 w-3 items-center justify-center rounded-full bg-[#FF5F56] border border-[#E0443E]/60 transition-transform duration-150 hover:scale-110 active:scale-95">
              {isHoveredDots && <span className="text-[8px] font-bold text-red-950 leading-none select-none">×</span>}
            </span>
            <span className="relative flex h-3 w-3 items-center justify-center rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 transition-transform duration-150 hover:scale-110 active:scale-95">
              {isHoveredDots && <span className="text-[8px] font-bold text-amber-950 leading-none select-none">−</span>}
            </span>
            <span className="relative flex h-3 w-3 items-center justify-center rounded-full bg-[#27C93F] border border-[#1AAB29]/60 transition-transform duration-150 hover:scale-110 active:scale-95">
              {isHoveredDots && <span className="text-[7px] font-bold text-green-950 leading-none select-none">+</span>}
            </span>
          </div>

          {/* Optional Tabs or Title */}
          {tabs ? (
            <div className="flex items-center gap-1 border-l border-[#30363D] pl-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange && onTabChange(tab.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 active:scale-95 ${
                    activeTab === tab.id
                      ? 'bg-stone-800 text-white font-semibold shadow-xs'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-xs font-mono text-stone-400 flex items-center gap-2">
              <span className="text-stone-600">/</span>
              <span className="hover:text-stone-300 transition-colors">{title}</span>
            </div>
          )}
        </div>

        {/* Right: Language badge & Copy button with micro-bounce */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-stone-500">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all duration-200 active:scale-90 ${
              copied
                ? 'border-emerald-600 bg-emerald-950/80 text-emerald-400 shadow-sm'
                : 'border-stone-700 bg-stone-800 text-stone-300 hover:border-stone-600 hover:bg-stone-700 hover:text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 animate-bounce-subtle" />
                <span className="font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Area: Pitch Black with syntax highlighting & line numbers */}
      <div className="relative overflow-x-auto p-4 font-mono text-[13px] leading-relaxed bg-[#0D1117] code-highlight">
        <pre className="flex font-mono text-[13px] leading-relaxed">
          {showLineNumbers && (
            <div className="mr-4 flex flex-col text-right select-none text-stone-600 shrink-0 font-mono text-[13px] leading-relaxed">
              {lines.map((_, i) => (
                <span key={i} className="hover:text-stone-400 transition-colors">
                  {i + 1}
                </span>
              ))}
            </div>
          )}
          <code 
            className="flex-1 whitespace-pre font-mono text-[13px] leading-relaxed text-[#E6EDF3]"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </pre>
      </div>
    </div>
  );
}
