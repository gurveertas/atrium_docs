import React from 'react';
import MacPanel from './MacPanel';
import { BookOpen } from 'lucide-react';

export default function ApiReference() {
  const initCode = `import Elysium from 'elysium-attribution';

const elysium = Elysium.init({
  apiKey: 'pk_live_51M0x92JKS981...',        // Required: Publishable key
  apiBaseUrl: 'https://api.yourdomain.com', // Optional: defaults to http://localhost:5000
  autoTrack: true,                          // Optional: Auto track pageviews on load
  sessionWindowMs: 30 * 60 * 1000,          // Optional: 30 minute session window
  buttonSelector: '.elysium-payment-button',// Optional: Payment button CSS selector
  cookieDomain: '.yourstore.com',           // Optional: Cross-subdomain tracking
  debug: false,                             // Optional: Console debugging
});`;

  const touchCode = `// Manually trigger a touchpoint (e.g. on client-side route changes)
const response = await Elysium.recordTouch({
  force: false, // Set true to bypass the 30-min deduplication window
  customData: {
    experimentGroup: 'checkout_v2',
    landingVariant: 'green_cta'
  }
});

if (response.ok) {
  console.log('Touch ID:', response.data.touchId);
  console.log('Classified Channel:', response.data.channel); // e.g. "paid_search", "meta", "google"
}`;

  const identifyCode = `// Method 1: Email and optional phone number
await Elysium.identify('jane.doe@gmail.com', '+14155552671');

// Method 2: Structured object format
const result = await Elysium.identify({
  email: 'jane.doe@gmail.com',
  phone: '+14155552671',
});

if (result.ok) {
  console.log('Resolved Customer ID:', result.data.customerId);
  console.log('Total Touchpoints Linked:', result.data.touchCount);
}`;

  const tokenCode = `// Request an attribution snapshot token when checkout starts
const checkoutToken = await Elysium.getCheckoutToken();

// Returns: "cs_sec_999abc123456789..."
console.log('Token ready for Stripe / Razorpay / PayPal:', checkoutToken);

// Or call createCheckoutSession for full metadata:
const session = await Elysium.createCheckoutSession({ expiresInMs: 7200000 });
console.log('Session ID:', session.data.checkoutSessionId);
console.log('Expires At:', session.data.expiresAt);`;

  const orderCode = `// Ingest an order directly from client-side confirmation page
const order = await Elysium.createOrder({
  externalId: 'ord_10293847',               // Required: Your store's unique Order ID
  orderedAt: new Date().toISOString(),      // Required: ISO timestamp
  currency: 'USD',                          // Required: 3-character ISO code
  grossAmount: 149.99,                      // Required: Major units (e.g. 149.99)
  netAmount: 139.99,                        // Required: After discounts
  discountAmount: 10.00,                    // Optional
  taxAmount: 0.00,                          // Optional
  email: 'customer@gmail.com',              // Optional: for identity matching
  // checkoutToken is auto-filled with active session token if not explicitly provided!
  items: [
    {
      name: 'Ultra Lightweight Sneakers',
      quantity: 1,
      unitAmount: 139.99,
      currency: 'USD',
      externalId: 'sku_sneaker_42'
    }
  ]
});

console.log('Order Attribution Result:', order.data);`;

  const bookingCode = `// Ingest a service booking (attributed immediately upon creation)
const booking = await Elysium.createBooking({
  externalId: 'book_554433',                // Required: Unique Booking ID
  appointmentStartAt: '2026-06-01T15:00:00Z',// Required: ISO appointment timestamp
  currency: 'USD',                          // Required: 3-char currency code
  bookedValue: 85.00,                       // Required: Service price
  serviceName: 'Deep Tissue Massage (60m)', // Optional
  email: 'client@example.com',              // Optional: customer email
  phone: '+14155552671'                     // Optional: customer phone
});

console.log('Booking Attribution ID:', booking.data.bookingId);`;

  const visitorCode = `// Get persistent anonymous visitor UUID (e.g. for analytics logs)
const visitorId = Elysium.getVisitorId();
console.log('Current Visitor ID:', visitorId);

// Override or set canonical visitor ID
Elysium.setVisitorId('custom-canonical-uuid-12345');`;

  return (
    <section id="api-reference" className="pt-10 pb-8 border-b border-stone-200 scroll-mt-20">
      <div className="flex items-center gap-2.5 mb-2">
        <BookOpen className="h-5 w-5 text-stone-700" />
        <h2 className="font-heading text-2xl font-bold text-stone-900 tracking-tight">
          Core API Reference
        </h2>
      </div>
      <p className="text-sm text-stone-600 max-w-2xl mb-8">
        Detailed reference for all public SDK methods. All asynchronous methods return resilient response objects with network failure, adblocker, and rate-limit safety.
      </p>

      {/* 1. Elysium.init() */}
      <div id="api-init" className="mb-12 scroll-mt-24">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-base font-bold text-stone-900">Elysium.init(config)</span>
            <span className="rounded bg-stone-100 border border-stone-200 px-2 py-0.5 text-[10px] font-mono font-bold text-stone-700 uppercase">
              Initialization
            </span>
          </div>
        </div>
        <p className="text-xs text-stone-600 mb-3">
          Configures API keys, starts automatic pageview tracking, sets up persistent storage, and initializes gateway registry.
        </p>
        <MacPanel title="init.js" code={initCode} language="javascript" />
      </div>

      {/* 2. Elysium.recordTouch() */}
      <div id="api-record-touch" className="mb-12 scroll-mt-24">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-base font-bold text-stone-900">Elysium.recordTouch(options?)</span>
            <span className="rounded bg-stone-100 border border-stone-200 px-2 py-0.5 text-[10px] font-mono font-bold text-stone-700 uppercase">
              POST /v1/touches
            </span>
          </div>
        </div>
        <p className="text-xs text-stone-600 mb-3">
          Records a marketing touchpoint with UTM parameters, advertising click IDs (<code className="text-stone-800 bg-stone-200/60 px-1 py-0.5 rounded font-mono text-xs">gclid</code>, <code className="text-stone-800 bg-stone-200/60 px-1 py-0.5 rounded font-mono text-xs">fbclid</code>, <code className="text-stone-800 bg-stone-200/60 px-1 py-0.5 rounded font-mono text-xs">ttclid</code>, <code className="text-stone-800 bg-stone-200/60 px-1 py-0.5 rounded font-mono text-xs">msclkid</code>), and ad cookies (<code className="text-stone-800 bg-stone-200/60 px-1 py-0.5 rounded font-mono text-xs">_fbc</code>, <code className="text-stone-800 bg-stone-200/60 px-1 py-0.5 rounded font-mono text-xs">_fbp</code>, <code className="text-stone-800 bg-stone-200/60 px-1 py-0.5 rounded font-mono text-xs">_ga</code>). Deduplicated within 30 minutes.
        </p>
        <MacPanel title="recordTouch.js" code={touchCode} language="javascript" />
      </div>

      {/* 3. Elysium.identify() */}
      <div id="api-identify" className="mb-12 scroll-mt-24">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-base font-bold text-stone-900">Elysium.identify(emailOrData, phone?)</span>
            <span className="rounded bg-stone-100 border border-stone-200 px-2 py-0.5 text-[10px] font-mono font-bold text-stone-700 uppercase">
              POST /v1/identify
            </span>
          </div>
        </div>
        <p className="text-xs text-stone-600 mb-3">
          Links anonymous multi-device touches to a known customer record using hashed emails and phone numbers.
        </p>
        <MacPanel title="identify.js" code={identifyCode} language="javascript" />
      </div>

      {/* 4. Elysium.getCheckoutToken() */}
      <div id="api-checkout-token" className="mb-12 scroll-mt-24">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-base font-bold text-stone-900">Elysium.getCheckoutToken()</span>
            <span className="rounded bg-stone-100 border border-stone-200 px-2 py-0.5 text-[10px] font-mono font-bold text-stone-700 uppercase">
              POST /v1/checkout-sessions
            </span>
          </div>
        </div>
        <p className="text-xs text-stone-600 mb-3">
          Freezes the visitor's touch snapshot into a secure token string (e.g. <code className="text-stone-800 bg-stone-200/60 px-1 py-0.5 rounded font-mono text-xs">cs_sec_...</code>) for passing into Stripe, Razorpay, or PayPal payment metadata.
        </p>
        <MacPanel title="getCheckoutToken.js" code={tokenCode} language="javascript" />
      </div>

      {/* 5. Elysium.createOrder() */}
      <div id="api-create-order" className="mb-12 scroll-mt-24">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-base font-bold text-stone-900">Elysium.createOrder(orderData)</span>
            <span className="rounded bg-stone-100 border border-stone-200 px-2 py-0.5 text-[10px] font-mono font-bold text-stone-700 uppercase">
              POST /v1/orders
            </span>
          </div>
        </div>
        <p className="text-xs text-stone-600 mb-3">
          Ingests paid order conversions. Resolves customer identity, matches touch history, and computes all 6 attribution models in a single atomic transaction.
        </p>
        <MacPanel title="createOrder.js" code={orderCode} language="javascript" />
      </div>

      {/* 6. Elysium.createBooking() */}
      <div id="api-create-booking" className="mb-12 scroll-mt-24">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-base font-bold text-stone-900">Elysium.createBooking(bookingData)</span>
            <span className="rounded bg-stone-100 border border-stone-200 px-2 py-0.5 text-[10px] font-mono font-bold text-stone-700 uppercase">
              POST /v1/bookings
            </span>
          </div>
        </div>
        <p className="text-xs text-stone-600 mb-3">
          Ingests service bookings and reservations. Attributed at booking creation time across all 6 models with complete lifecycle status management.
        </p>
        <MacPanel title="createBooking.js" code={bookingCode} language="javascript" />
      </div>

      {/* 7. Visitor ID */}
      <div id="api-visitor" className="mb-4 scroll-mt-24">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-base font-bold text-stone-900">Elysium.getVisitorId()</span>
            <span className="rounded bg-stone-100 border border-stone-200 px-2 py-0.5 text-[10px] font-mono font-bold text-stone-700 uppercase">
              Identity Helper
            </span>
          </div>
        </div>
        <p className="text-xs text-stone-600 mb-3">
          Returns or overrides the persistent UUIDv4 visitor identifier synchronized across LocalStorage and Safari ITP-safe cookies.
        </p>
        <MacPanel title="visitor.js" code={visitorCode} language="javascript" />
      </div>
    </section>
  );
}
