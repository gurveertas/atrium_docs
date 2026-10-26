import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

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

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-stone-800 bg-[#0D1117] shadow-mac-panel transition-all duration-200">
      {/* macOS Topbar */}
      <div className="flex items-center justify-between border-b border-[#21262D] bg-[#161B22] px-4 py-3 select-none">
        {/* Left: macOS Traffic Lights & Tabs/Title */}
        <div className="flex items-center gap-4">
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 inline-block"></span>
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 inline-block"></span>
            <span className="h-3 w-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/60 inline-block"></span>
          </div>

          {/* Optional Tabs or Title */}
          {tabs ? (
            <div className="flex items-center gap-1 border-l border-[#30363D] pl-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange && onTabChange(tab.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    activeTab === tab.id
                      ? 'bg-stone-800 text-white font-semibold'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-xs font-mono text-stone-400 flex items-center gap-2">
              <span className="text-stone-600">/</span>
              <span>{title}</span>
            </div>
          )}
        </div>

        {/* Right: Language badge & Copy button */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-stone-500">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all ${
              copied
                ? 'border-emerald-600 bg-emerald-950/80 text-emerald-400'
                : 'border-stone-700 bg-stone-800 text-stone-300 hover:border-stone-600 hover:bg-stone-700 hover:text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Area: Pitch Black with Crisp Syntax Text */}
      <div className="relative overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-stone-200 bg-[#0D1117]">
        <pre className="flex">
          {showLineNumbers && (
            <div className="mr-4 flex flex-col text-right select-none text-stone-600">
              {lines.map((_, i) => (
                <span key={i} className="text-xs leading-[1.65]">
                  {i + 1}
                </span>
              ))}
            </div>
          )}
          <code className="flex-1 whitespace-pre">{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
}
