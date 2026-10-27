import React, { useState } from 'react';
import { Terminal, Play, UserCheck, Key, ShoppingCart, Trash2, Check } from 'lucide-react';
import { highlightCode } from './MacPanel';

export default function Simulator() {
  const [testUrl, setTestUrl] = useState('https://mystore.com/shop?utm_source=google&utm_medium=cpc&utm_campaign=summer_promo&gclid=Cj0KCQjwp_TEST_12345');
  const [visitorId] = useState(() => 'vis_' + Math.random().toString(36).substring(2, 10));
  const [email, setEmail] = useState('alex.morgan@example.com');
  const [phone, setPhone] = useState('+14155552671');
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [orderId, setOrderId] = useState('ord_998877');
  const [amount, setAmount] = useState('149.99');
  const [selectedGateway, setSelectedGateway] = useState('stripe');
  const [activeAction, setActiveAction] = useState(null);
  
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
        registeredGateways: ['stripe', 'razorpay', 'paypal', 'square', 'shopify', 'woocommerce', 'zenoti'],
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

  const triggerFeedback = (actionName) => {
    setActiveAction(actionName);
    setTimeout(() => setActiveAction(null), 800);
  };

  const handleRecordTouch = () => {
    triggerFeedback('touch');
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
    triggerFeedback('identify');
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
    triggerFeedback('token');
    const token = 'cs_sec_' + Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
    setCheckoutToken(token);
    
    // Gateway payload wrapping simulation
    let gatewayAttachedParams = {};
    if (selectedGateway === 'stripe') {
      gatewayAttachedParams = {
        adapter: 'StripeGateway',
        injected: {
          'metadata.attribution_token': token,
          'metadata.checkout_token': token,
          'client_reference_id': token
        }
      };
    } else if (selectedGateway === 'razorpay') {
      gatewayAttachedParams = {
        adapter: 'RazorpayGateway',
        injected: {
          'notes.attribution_token': token,
          'notes.checkout_token': token
        }
      };
    } else if (selectedGateway === 'paypal') {
      gatewayAttachedParams = {
        adapter: 'PayPalGateway',
        injected: {
          'purchase_units[0].custom_id': token
        }
      };
    } else if (selectedGateway === 'shopify') {
      gatewayAttachedParams = {
        adapter: 'ShopifyGateway',
        injected: {
          'cart.note_attributes.attribution_token': token,
          'cart.note_attributes.elysium_visitor_id': visitorId
        }
      };
    } else {
      gatewayAttachedParams = {
        adapter: `${selectedGateway}Gateway`,
        injected: {
          'attribution_token': token
        }
      };
    }

    const sessionData = {
      checkoutSessionId: 'sess_' + Math.random().toString(36).substring(2, 8),
      token,
      visitorId,
      gateway: selectedGateway,
      gatewayPayloadPreview: gatewayAttachedParams,
      touchIds: ['tch_1a2b', 'tch_3c4d'],
      touchCount: 2,
      expiresAt: new Date(Date.now() + 7200000).toISOString(),
    };
    addLog('TOKEN', 'bg-stone-800 text-emerald-300 border-stone-700', `POST /v1/checkout-sessions (${selectedGateway.toUpperCase()} Token Attached)`, sessionData);
  };

  const handleSubmitOrder = () => {
    triggerFeedback('order');
    const token = checkoutToken || ('cs_sec_' + Math.random().toString(36).substring(2, 12));
    const orderData = {
      orderId: 'ord_uuid_' + Math.random().toString(36).substring(2, 8),
      externalId: orderId,
      customerId: 'cust_987abc',
      visitorId,
      gateway: selectedGateway,
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
        u_shaped: { channel: 'paid_search', share: 0.4, direct: 0.4, organic: 0.2 },
      },
    };
    addLog('ORDER', 'bg-stone-800 text-amber-300 border-stone-700', `POST /v1/orders (${selectedGateway.toUpperCase()} Ingest Attributed)`, orderData);
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

          {/* Record Touch Button - Micro-interaction feedback */}
          <button
            onClick={handleRecordTouch}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold shadow-sm transition-all duration-200 active:scale-95 ${
              activeAction === 'touch'
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            {activeAction === 'touch' ? (
              <>
                <Check className="h-3.5 w-3.5 animate-bounce-subtle" />
                <span>Pageview Logged!</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Simulate Pageview</span>
              </>
            )}
          </button>
        </div>

        {/* Content Body: Left Actions & Right Real-time Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
          {/* Action Panels (5 cols) - Generous spacing */}
          <div className="lg:col-span-5 p-6 sm:p-7 space-y-6 bg-[#FAF8F5]">
            {/* Step 1: Identify */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm hover:border-stone-300 transition-all">
              <div className="flex items-center gap-2.5 mb-3.5">
                <UserCheck className="h-4.5 w-4.5 text-stone-700" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  1. Identify Customer
                </h4>
              </div>
              <div className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="customer@example.com"
                  className="w-full rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 outline-none focus:border-stone-400 shadow-2xs transition-colors"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+14155552671"
                  className="w-full rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 outline-none focus:border-stone-400 shadow-2xs transition-colors"
                />
                <button
                  onClick={handleIdentify}
                  className={`w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold shadow-sm transition-all duration-200 active:scale-98 ${
                    activeAction === 'identify'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-stone-900 text-white hover:bg-stone-800'
                  }`}
                >
                  {activeAction === 'identify' ? (
                    <>
                      <Check className="h-4 w-4 animate-bounce-subtle" />
                      <span>Customer Identity Linked!</span>
                    </>
                  ) : (
                    <span>Send Identify Call</span>
                  )}
                </button>
              </div>
            </div>

            {/* Step 2: Checkout Token & Gateway */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm hover:border-stone-300 transition-all">
              <div className="flex items-center gap-2.5 mb-2.5">
                <Key className="h-4.5 w-4.5 text-stone-700" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  2. Gateway & Token Freeze
                </h4>
              </div>
              <p className="text-xs text-stone-500 mb-3.5 leading-relaxed">
                Select your payment gateway to attach attribution tokens into payment session metadata:
              </p>
              <div className="mb-3.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Active Gateway Adapter
                </label>
                <select
                  value={selectedGateway}
                  onChange={(e) => setSelectedGateway(e.target.value)}
                  className="w-full rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-xs font-medium text-stone-800 outline-none focus:border-stone-400 shadow-2xs transition-colors"
                >
                  <option value="stripe">Stripe (PaymentIntent / Checkout)</option>
                  <option value="razorpay">Razorpay (Modal / Standard)</option>
                  <option value="paypal">PayPal (Smart Buttons)</option>
                  <option value="square">Square (Web Payments SDK)</option>
                  <option value="shopify">Shopify (Cart Attributes)</option>
                  <option value="woocommerce">WooCommerce (Hidden Fields)</option>
                  <option value="zenoti">Zenoti (Appointment Notes)</option>
                </select>
              </div>
              <button
                onClick={handleGetToken}
                className={`w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold shadow-sm transition-all duration-200 active:scale-98 ${
                  activeAction === 'token'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-stone-900 text-white hover:bg-stone-800'
                }`}
              >
                {activeAction === 'token' ? (
                  <>
                    <Check className="h-4 w-4 animate-bounce-subtle" />
                    <span>Attribution Token Frozen & Attached!</span>
                  </>
                ) : (
                  <span>Attach & Generate Token</span>
                )}
              </button>
            </div>

            {/* Step 3: Ingest Order */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm hover:border-stone-300 transition-all">
              <div className="flex items-center gap-2.5 mb-3.5">
                <ShoppingCart className="h-4.5 w-4.5 text-stone-700" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  3. Ingest Paid Order
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3.5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Order Ref</label>
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Order ID"
                    className="w-full rounded-lg border border-stone-200 bg-white px-3.5 py-2 text-xs text-stone-900 outline-none focus:border-stone-400 shadow-2xs transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Amount ($)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    className="w-full rounded-lg border border-stone-200 bg-white px-3.5 py-2 text-xs text-stone-900 outline-none focus:border-stone-400 shadow-2xs transition-colors"
                  />
                </div>
              </div>
              <button
                onClick={handleSubmitOrder}
                className={`w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold shadow-sm transition-all duration-200 active:scale-98 ${
                  activeAction === 'order'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-stone-900 text-white hover:bg-stone-800'
                }`}
              >
                {activeAction === 'order' ? (
                  <>
                    <Check className="h-4 w-4 animate-bounce-subtle" />
                    <span>Order Attributed Across 6 Models!</span>
                  </>
                ) : (
                  <span>Attribute Order Conversion</span>
                )}
              </button>
            </div>
          </div>

          {/* Real-Time Event Console (7 cols): Keep code & log panel black */}
          <div className="lg:col-span-7 flex flex-col h-[560px] bg-[#0D1117]">
            <div className="flex items-center justify-between border-b border-[#21262D] px-5 py-3 bg-[#161B22] text-xs text-stone-400 font-mono">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Live Event Stream</span>
              </span>
              <span className="text-[11px] text-stone-500 font-mono">{logs.length} events logged</span>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 font-mono text-xs">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="animate-fade-in-slide rounded-xl border border-[#30363D] bg-[#161B22]/80 p-4 text-stone-300 transition-all duration-200 hover:border-stone-600 hover:bg-[#161B22]"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className={`rounded border px-2 py-0.5 text-[10px] font-bold ${log.badge}`}>
                        {log.type}
                      </span>
                      <span className="text-white font-semibold text-xs">{log.title}</span>
                    </div>
                    <span className="text-[10px] text-stone-500">{log.timestamp}</span>
                  </div>

                  <pre 
                    className="overflow-x-auto rounded-lg bg-[#0D1117] border border-[#21262D] p-3 text-[11px] leading-relaxed code-highlight text-[#E6EDF3]"
                    dangerouslySetInnerHTML={{ __html: highlightCode(JSON.stringify(log.data, null, 2), 'json') }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
