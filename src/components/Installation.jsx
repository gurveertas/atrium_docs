import React, { useState } from 'react';
import MacPanel from './MacPanel';
import { Package } from 'lucide-react';

export default function Installation() {
  const [activeTab, setActiveTab] = useState('npm');

  const tabs = [
    { id: 'npm', label: 'npm' },
    { id: 'pnpm', label: 'pnpm' },
    { id: 'yarn', label: 'yarn' },
    { id: 'cdn', label: 'CDN Script' },
  ];

  const codeSnippets = {
    npm: `# Install latest production build via npm\nnpm install elysium-attribution`,
    pnpm: `# Fast, disk space efficient package installation\npnpm add elysium-attribution`,
    yarn: `# Install using Yarn classic or Berry\nyarn add elysium-attribution`,
    cdn: `<!-- Add inside <head> or right before </body> in your HTML -->\n<script src="https://cdn.jsdelivr.net/npm/elysium-attribution@2.0.0/dist/elysium.min.js"></script>\n<script>\n  window.Elysium.init({\n    apiKey: 'pk_live_xxxxxxxxxxxxxxxxxxxxxxxx',\n    apiBaseUrl: 'http://localhost:5000' // Or your production backend URL\n  });\n</script>`,
  };

  return (
    <section id="installation" className="pt-10 pb-8 border-b border-stone-200 scroll-mt-20">
      <div className="flex items-center gap-2.5 mb-2">
        <Package className="h-5 w-5 text-stone-700" />
        <h2 className="font-heading text-2xl font-bold text-stone-900 tracking-tight">
          Installation
        </h2>
      </div>
      <p className="text-sm text-stone-600 max-w-2xl">
        Install the package into your modern web application via your favorite package manager or include it directly via high-speed CDN.
      </p>

      <MacPanel
        title={activeTab === 'cdn' ? 'index.html' : 'terminal'}
        code={codeSnippets[activeTab]}
        language={activeTab === 'cdn' ? 'html' : 'bash'}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showLineNumbers={activeTab === 'cdn'}
      />
    </section>
  );
}
