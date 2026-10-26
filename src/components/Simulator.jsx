import React, { useState } from 'react';
import { Terminal, Play, UserCheck, Key, ShoppingCart, Trash2 } from 'lucide-react';

export default function Simulator() {
  const [testUrl, setTestUrl] = useState('https://mystore.com/shop?utm_source=google&utm_medium=cpc&utm_campaign=summer_promo&gclid=Cj0KCQjwp_TEST_12345');
  const [visitorId] = useState(() => 'vis_' + Math.random().toString(36).substring(2, 10));
  const [email, setEmail] = useState('alex.morgan@example.com');
  const [phone, setPhone] = useState('+14155552671');
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [orderId, setOrderId] = useState('ord_998877');
  const [amount, setAmount] = useState('149.99');
  
  const [logs, setLogs] = useState([
    {
      id: 1,
      type: 'INIT',
      badge: 'bg-stone-800 text-stone-200 border-stone-700',
      title: 'Elysium SDK Initialized',
      timestamp: new Date().toLocaleTimeString(),
      data: {
        apiKey: 'pk_live_sample_key_9988',
        visitorId,
        autoTrack: true,
        sessionWindowMs: 1800000,
      },
    },
  ]);

  const addLog = (type, badge, title, data) => {
    setLogs((prev) => [
      {
        id: Date.now() + Math.random(),
        type,
        badge,
        title,
        timestamp: new Date().toLocaleTimeString(),
        data,
      },
      ...prev,
    ]);
  };

  const handleRecordTouch = () => {
    try {
      const url = new URL(testUrl);
      const params = url.searchParams;
      const touchData = {
        touchId: 'tch_' + Math.random().toString(36).substring(2, 9),
        visitorId,
        touchedAt: new Date().toISOString(),
        source: params.get('utm_source'),
        medium: params.get('utm_medium'),
        campaign: params.get('utm_campaign'),
        term: params.get('utm_term') || null,
        content: params.get('utm_content') || null,
        gclid: params.get('gclid'),
        fbclid: params.get('fbclid'),
        landingPage: testUrl,
        channel: 'paid_search',
      };
      addLog('TOUCH', 'bg-stone-800 text-cyan-300 border-stone-700', 'POST /v1/touches (Pageview Recorded)', touchData);
    } catch (e) {
      addLog('ERROR', 'bg-red-950 text-red-300 border-red-800', 'Invalid URL format', { error: e.message });
    }
  };

  const handleIdentify = () => {
    const identifyData = {
      customerId: 'cust_' + Math.random().toString(36).substring(2, 8),
      visitorId,
      email,
      phone,
      touchCount: 2,
      isNew: false,
    };
    addLog('IDENTIFY', 'bg-stone-800 text-purple-300 border-stone-700', 'POST /v1/identify (Customer Linked)', identifyData);
  };

  const handleGetToken = () => {
    const token = 'cs_sec_' + Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
    setCheckoutToken(token);
    const sessionData = {
      checkoutSessionId: 'sess_' + Math.random().toString(36).substring(2, 8),
      token,
      visitorId,
      touchIds: ['tch_1a2b', 'tch_3c4d'],
      touchCount: 2,
      expiresAt: new Date(Date.now() + 7200000).toISOString(),
    };
    addLog('TOKEN', 'bg-stone-800 text-emerald-300 border-stone-700', 'POST /v1/checkout-sessions (Token Generated)', sessionData);
  };

  const handleSubmitOrder = () => {
    const token = checkoutToken || ('cs_sec_' + Math.random().toString(36).substring(2, 12));
    const orderData = {
      orderId: 'ord_uuid_' + Math.random().toString(36).substring(2, 8),
      externalId: orderId,
      customerId: 'cust_987abc',
      visitorId,
      checkoutToken: token,
      grossAmount: parseFloat(amount),
      netAmount: parseFloat(amount),
      currency: 'USD',
      matchMethod: 'token',
      status: 'paid',
      isNewCustomer: true,
      modelsAttributed: {
        first_touch: { channel: 'paid_search', share: 1.0 },
        last_non_direct: { channel: 'paid_search', share: 1.0 },
        linear: { channel: 'paid_search', share: 0.5, direct: 0.5 },
      },
    };
    addLog('ORDER', 'bg-stone-800 text-amber-300 border-stone-700', 'POST /v1/orders (Attributed Conversion Ingested)', orderData);
  };

  return (
    <section id="simulator" className="pt-10 pb-16 scroll-mt-20">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <Terminal className="h-5 w-5 text-stone-700" />
          <h2 className="font-heading text-2xl font-bold text-stone-900 tracking-tight">
            Live Attribution Simulator
          </h2>
        </div>
        <button
          onClick={() => setLogs([])}
          className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Clear Logs</span>
        </button>
      </div>
      <p className="text-sm text-stone-600 max-w-2xl mb-6">
        Simulate real visitor marketing journeys in real-time. Test UTM parameters, identify calls, checkout token generation, and order conversions.
      </p>

      {/* Simulator Frame */}
      <div className="overflow-hidden rounded-2xl border border-stone-300 bg-white shadow-mac-panel">
        {/* Browser Simulator Bar */}
        <div className="flex items-center gap-3 border-b border-stone-200 bg-[#F5F2EB] p-3">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 pl-1">
            <span className="h-3 w-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 inline-block"></span>
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 inline-block"></span>
            <span className="h-3 w-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/60 inline-block"></span>
          </div>

          {/* URL Input */}
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-mono text-stone-800 shadow-sm">
            <span className="text-stone-400 font-semibold">URL</span>
            <input
              type="text"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
              className="flex-1 bg-transparent text-stone-800 outline-none"
            />
          </div>

          {/* Record Touch Button - Solid Color */}
          <button
            onClick={handleRecordTouch}
            className="flex items-center gap-1.5 rounded-lg bg-stone-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-stone-800 active:scale-95"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Simulate Pageview</span>
          </button>
        </div>

        {/* Content Body: Left Actions & Right Real-time Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
          {/* Action Panels (5 cols) */}
          <div className="lg:col-span-5 p-5 space-y-4 bg-[#FAF8F5]">
            {/* Step 1: Identify */}
            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <UserCheck className="h-4 w-4 text-stone-700" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  1. Identify Customer
                </h4>
              </div>
              <div className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="customer@example.com"
                  className="w-full rounded-md border border-stone-200 bg-white px-2.5 py-1.5 text-xs text-stone-900 placeholder-stone-400 outline-none focus:border-stone-400"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+14155552671"
                  className="w-full rounded-md border border-stone-200 bg-white px-2.5 py-1.5 text-xs text-stone-900 placeholder-stone-400 outline-none focus:border-stone-400"
                />
                <button
                  onClick={handleIdentify}
                  className="w-full rounded-md bg-stone-900 py-1.5 text-xs font-semibold text-white hover:bg-stone-800 transition-all shadow-sm"
                >
                  Send Identify Call
                </button>
              </div>
            </div>

            {/* Step 2: Checkout Token */}
            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Key className="h-4 w-4 text-stone-700" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  2. Freeze Checkout Token
                </h4>
              </div>
              <p className="text-[11px] text-stone-500 mb-3">
                Creates an immutable snapshot of touches for Stripe metadata / Razorpay notes.
              </p>
              <button
                onClick={handleGetToken}
                className="w-full rounded-md bg-stone-900 py-1.5 text-xs font-semibold text-white hover:bg-stone-800 transition-all shadow-sm"
              >
                Generate Checkout Token
              </button>
            </div>

            {/* Step 3: Ingest Order */}
            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingCart className="h-4 w-4 text-stone-700" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  3. Ingest Paid Order
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Order ID"
                  className="rounded-md border border-stone-200 bg-white px-2.5 py-1.5 text-xs text-stone-900 outline-none focus:border-stone-400"
                />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                  className="rounded-md border border-stone-200 bg-white px-2.5 py-1.5 text-xs text-stone-900 outline-none focus:border-stone-400"
                />
              </div>
              <button
                onClick={handleSubmitOrder}
                className="w-full rounded-md bg-stone-900 py-1.5 text-xs font-semibold text-white hover:bg-stone-800 transition-all shadow-sm"
              >
                Attribute Order Conversion
              </button>
            </div>
          </div>

          {/* Real-Time Event Console (7 cols): Keep code & log panel black */}
          <div className="lg:col-span-7 flex flex-col h-[520px] bg-[#0D1117]">
            <div className="flex items-center justify-between border-b border-[#21262D] px-4 py-2.5 bg-[#161B22] text-xs text-stone-400 font-mono">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live Event Stream</span>
              </span>
              <span>{logs.length} events logged</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="rounded-lg border border-[#30363D] bg-[#161B22]/80 p-3 text-stone-300 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`rounded border px-1.5 py-0.5 text-[10px] font-bold ${log.badge}`}>
                        {log.type}
                      </span>
                      <span className="text-white font-semibold text-[11px]">{log.title}</span>
                    </div>
                    <span className="text-[10px] text-stone-500">{log.timestamp}</span>
                  </div>

                  <pre className="overflow-x-auto rounded bg-[#0D1117] border border-[#21262D] p-2.5 text-[11px] text-cyan-200/90 leading-relaxed">
                    {JSON.stringify(log.data, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
