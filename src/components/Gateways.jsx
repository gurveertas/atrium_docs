import React, { useState } from 'react';
import MacPanel from './MacPanel';
import { CreditCard, CheckCircle2, Webhook, Code2, Play, RefreshCw, Zap, ShieldCheck } from 'lucide-react';

export default function Gateways() {
  const [activeGateway, setActiveGateway] = useState('stripe');
  const [activeCodeTab, setActiveCodeTab] = useState('client');
  const [simAmount, setSimAmount] = useState('89.50');
  const [simCurrency, setSimCurrency] = useState('USD');
  const [simOrderId, setSimOrderId] = useState('ord_checkout_7788');
  const [simEmail, setSimEmail] = useState('customer@example.com');
  const [testToken, setTestToken] = useState('cs_sec_9a8b7c6d5e4f3a2b1c0d');
  const [payloadType, setPayloadType] = useState('client'); // 'client' or 'webhook'

  const gateways = [
    {
      id: 'stripe',
      name: 'Stripe',
      tag: 'PaymentIntent & Checkout',
      webhookEvent: 'payment_intent.succeeded',
      tokenField: 'metadata.attribution_token',
      file: 'stripeIntegration.js',
      webhookFile: 'stripeWebhook.js',
    },
    {
      id: 'razorpay',
      name: 'Razorpay',
      tag: 'Orders & Standard Checkout',
      webhookEvent: 'payment.captured',
      tokenField: 'notes.attribution_token',
      file: 'razorpayIntegration.js',
      webhookFile: 'razorpayWebhook.js',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      tag: 'Smart Payment Buttons',
      webhookEvent: 'CHECKOUT.ORDER.APPROVED',
      tokenField: 'purchase_units[0].custom_id',
      file: 'paypalIntegration.js',
      webhookFile: 'paypalWebhook.js',
    },
    {
      id: 'square',
      name: 'Square',
      tag: 'Web Payments SDK',
      webhookEvent: 'payment.updated',
      tokenField: 'reference_id & note',
      file: 'squareIntegration.js',
      webhookFile: 'squareWebhook.js',
    },
    {
      id: 'shopify',
      name: 'Shopify',
      tag: 'Liquid & Hydrogen Storefronts',
      webhookEvent: 'orders/paid',
      tokenField: 'note_attributes.attribution_token',
      file: 'shopifyIntegration.js',
      webhookFile: 'shopifyWebhook.js',
    },
    {
      id: 'woocommerce',
      name: 'WooCommerce',
      tag: 'WordPress Form Hook',
      webhookEvent: 'woocommerce_order_status_completed',
      tokenField: '_elysium_attribution_token',
      file: 'wooCommerceIntegration.js',
      webhookFile: 'wooCommerceWebhook.js',
    },
    {
      id: 'zenoti',
      name: 'Zenoti',
      tag: 'Salon & Spa Appointments',
      webhookEvent: 'appointment.closed',
      tokenField: 'notes (regex token match)',
      file: 'zenotiIntegration.js',
      webhookFile: 'zenotiWebhook.js',
    },
  ];

  const codeSnippets = {
    stripe: {
      client: `import { Elysium } from 'elysium-attribution';

// 1. Get the registered Stripe gateway adapter
const stripeGateway = Elysium.gateways.registry.get('stripe');

// 2. Fetch or reuse active frozen checkout token
const token = await Elysium.getCheckoutToken();

// Method A: Attach directly into PaymentIntent options
const paymentIntentData = stripeGateway.attachToken({
  amount: 8950, // in cents ($89.50)
  currency: 'usd',
  customer_email: 'customer@example.com',
}, token);

// Result produced:
// paymentIntentData.metadata = { attribution_token: token, checkout_token: token }
// paymentIntentData.client_reference_id = token

// Method B: Wrap existing Stripe instance for automatic handling
const stripe = stripeGateway.wrapStripe(Stripe('pk_live_...'));
await stripe.confirmPayment({
  elements,
  confirmParams: { return_url: 'https://mystore.com/checkout/success' }
});`,
      webhook: `// server/routes/stripeWebhook.js (Express / Node.js)
import express from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handleStripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(\`Webhook Error: \${err.message}\`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const attributionToken = paymentIntent.metadata?.attribution_token;

    // Send to Elysium Backend to atomically attribute order
    await fetch('https://api.elysium.ai/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ELYSIUM_SECRET_KEY, // sk_live_...
      },
      body: JSON.stringify({
        externalId: paymentIntent.id,
        checkoutToken: attributionToken,
        grossAmount: paymentIntent.amount / 100,
        currency: paymentIntent.currency.toUpperCase(),
        email: paymentIntent.receipt_email,
        orderedAt: new Date(paymentIntent.created * 1000).toISOString(),
      }),
    });
  }

  res.json({ received: true });
}`,
    },
    razorpay: {
      client: `import { Elysium } from 'elysium-attribution';

const rzpGateway = Elysium.gateways.registry.get('razorpay');
const token = await Elysium.getCheckoutToken();

// Wrap Razorpay options before calling rzp.open()
// Automatically injects notes.attribution_token and records attempt
const options = rzpGateway.wrapOptions({
  key: 'rzp_live_xxxxxxxxxxxxxxxx',
  amount: 895000, // in paise
  currency: 'INR',
  name: 'Acme Store',
  description: 'Pro Subscription Plan',
  prefill: {
    email: 'customer@example.com',
  },
  handler: function (response) {
    console.log('Payment Successful:', response.razorpay_payment_id);
  },
}, token);

const rzp = new Razorpay(options);
rzp.open();`,
      webhook: `// server/routes/razorpayWebhook.js
import crypto from 'crypto';

export async function handleRazorpayWebhook(req, res) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers['x-razorpay-signature'];
  
  // Verify HMAC signature
  const expectedSig = crypto.createHmac('sha256', secret)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (signature !== expectedSig) {
    return res.status(400).send('Invalid signature');
  }

  const { event, payload } = req.body;
  if (event === 'payment.captured') {
    const payment = payload.payment.entity;
    const attributionToken = payment.notes?.attribution_token;

    await fetch('https://api.elysium.ai/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ELYSIUM_SECRET_KEY,
      },
      body: JSON.stringify({
        externalId: payment.id,
        checkoutToken: attributionToken,
        grossAmount: payment.amount / 100,
        currency: payment.currency,
        email: payment.email,
        orderedAt: new Date().toISOString(),
      }),
    });
  }

  res.json({ status: 'ok' });
}`,
    },
    paypal: {
      client: `import { Elysium } from 'elysium-attribution';

const ppGateway = Elysium.gateways.registry.get('paypal');
const token = await Elysium.getCheckoutToken();

// Wrap PayPal smart payment buttons
paypal.Buttons(ppGateway.wrapButtons({
  createOrder: (data, actions) => {
    return actions.order.create({
      purchase_units: [
        // attachToken injects custom_id: token into the purchase unit
        ppGateway.attachToken({
          amount: { value: '89.50', currency_code: 'USD' },
          description: 'Acme Checkout Order',
        }, token)
      ]
    });
  },
  onApprove: (data, actions) => {
    return actions.order.capture().then(details => {
      console.log('Transaction approved by ' + details.payer.name.given_name);
    });
  }
})).render('#paypal-button-container');`,
      webhook: `// server/routes/paypalWebhook.js
export async function handlePayPalWebhook(req, res) {
  const event = req.body;

  if (event.event_type === 'CHECKOUT.ORDER.APPROVED') {
    const order = event.resource;
    const purchaseUnit = order.purchase_units?.[0];
    const attributionToken = purchaseUnit?.custom_id;

    await fetch('https://api.elysium.ai/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ELYSIUM_SECRET_KEY,
      },
      body: JSON.stringify({
        externalId: order.id,
        checkoutToken: attributionToken,
        grossAmount: parseFloat(purchaseUnit.amount.value),
        currency: purchaseUnit.amount.currency_code,
        email: order.payer?.email_address,
        orderedAt: order.create_time,
      }),
    });
  }

  res.status(200).send('OK');
}`,
    },
    square: {
      client: `import { Elysium } from 'elysium-attribution';

const sqGateway = Elysium.gateways.registry.get('square');
const token = await Elysium.getCheckoutToken();

// Web Payments SDK: Attach token to payment request options
const paymentParams = sqGateway.attachToken({
  sourceId: tokenizedCard.token,
  idempotencyKey: crypto.randomUUID(),
  amountMoney: {
    amount: 8950,
    currency: 'USD',
  },
}, token);

// Result:
// paymentParams.reference_id = token
// paymentParams.note = "attribution_token: " + token`,
      webhook: `// server/routes/squareWebhook.js
export async function handleSquareWebhook(req, res) {
  const { type, data } = req.body;

  if (type === 'payment.updated') {
    const payment = data.object.payment;
    if (payment.status === 'COMPLETED') {
      const attributionToken = payment.reference_id;

      await fetch('https://api.elysium.ai/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ELYSIUM_SECRET_KEY,
        },
        body: JSON.stringify({
          externalId: payment.id,
          checkoutToken: attributionToken,
          grossAmount: payment.amount_money.amount / 100,
          currency: payment.amount_money.currency,
          email: payment.buyer_email_address,
          orderedAt: payment.created_at,
        }),
      });
    }
  }

  res.sendStatus(200);
}`,
    },
    shopify: {
      client: `import { Elysium } from 'elysium-attribution';

const shopifyGateway = Elysium.gateways.registry.get('shopify');

// Runs automatically on click of .elysium-payment-button, or trigger manually:
// Injects 'attribution_token' and 'elysium_visitor_id' into Shopify Cart Attributes
await shopifyGateway.attachCartAttributes();

// The backend Shopify webhook reads:
// webhookPayload.note_attributes.find(a => a.name === 'attribution_token').value
// and calculates full 6-model attribution automatically!`,
      webhook: `// Shopify Native Webhook Ingest
// Endpoint configured in Shopify Admin -> Notifications -> Webhooks:
// https://api.elysium.ai/v1/webhooks/shopify

// Incoming Event: orders/paid
// The Elysium Backend automatically unpacks:
// order.note_attributes: [
//   { name: "attribution_token", value: "cs_sec_..." },
//   { name: "elysium_visitor_id", value: "vis_..." }
// ]
// No server code needed! Completely zero-code inbound matching.`,
    },
    woocommerce: {
      client: `import { Elysium } from 'elysium-attribution';

const wooGateway = Elysium.gateways.registry.get('woocommerce');

// Automatically injects hidden input fields into form.woocommerce-checkout:
//   <input type="hidden" name="attribution_token" value="cs_sec_..." />
//   <input type="hidden" name="billing_elysium_visitor_id" value="uuid..." />
await wooGateway.injectHiddenCheckoutFields();`,
      webhook: `// functions.php (WordPress / WooCommerce)
add_action('woocommerce_checkout_update_order_meta', function($order_id) {
    if (!empty($_POST['attribution_token'])) {
        update_post_meta($order_id, '_elysium_attribution_token', sanitize_text_field($_POST['attribution_token']));
    }
});

// On Order Complete, send to Elysium:
add_action('woocommerce_order_status_completed', function($order_id) {
    $order = wc_get_order($order_id);
    $token = get_post_meta($order_id, '_elysium_attribution_token', true);

    wp_remote_post('https://api.elysium.ai/v1/orders', array(
        'headers' => array(
            'Content-Type' => 'application/json',
            'x-api-key' => ELYSIUM_SECRET_KEY
        ),
        'body' => json_encode(array(
            'externalId' => (string)$order_id,
            'checkoutToken' => $token,
            'grossAmount' => (float)$order->get_total(),
            'currency' => $order->get_currency(),
            'email' => $order->get_billing_email()
        ))
    ));
});`,
    },
    zenoti: {
      client: `import { Elysium } from 'elysium-attribution';

const zenotiGateway = Elysium.gateways.registry.get('zenoti');
const token = await Elysium.getCheckoutToken();

// Formats appointment notes to include attribution token
// Backend processor matches: notes.match(/attribution_token:([a-f0-9-]+)/)
const formattedNotes = zenotiGateway.formatNote(token, "Customer requested stylist Maya");
// Result: "Customer requested stylist Maya attribution_token:cs_sec_..."`,
      webhook: `// Zenoti Webhook Processor
// When an appointment transitions to 'Closed' or 'Invoiced':
// Backend extracts notes string:
const tokenMatch = appointment.notes?.match(/attribution_token:([\\w-]+)/);
const attributionToken = tokenMatch ? tokenMatch[1] : null;

// Direct attribution call:
await Elysium.createBooking({
  externalId: appointment.id,
  checkoutToken: attributionToken,
  bookedValue: appointment.total_amount,
  currency: 'USD',
  email: appointment.guest_email,
});`,
    },
  };

  // Helper to generate live simulated payload based on chosen gateway
  const generateSimulatedPayload = () => {
    const amt = parseFloat(simAmount) || 89.50;
    const token = testToken;

    if (payloadType === 'client') {
      switch (activeGateway) {
        case 'stripe':
          return {
            amount: Math.round(amt * 100),
            currency: simCurrency.toLowerCase(),
            metadata: {
              attribution_token: token,
              checkout_token: token,
              order_ref: simOrderId,
            },
            client_reference_id: token,
            receipt_email: simEmail,
          };
        case 'razorpay':
          return {
            key: 'rzp_live_xxxxxxxxxxxxxxxx',
            amount: Math.round(amt * 100),
            currency: simCurrency === 'USD' ? 'INR' : simCurrency,
            notes: {
              attribution_token: token,
              checkout_token: token,
              order_ref: simOrderId,
            },
            prefill: { email: simEmail },
          };
        case 'paypal':
          return {
            purchase_units: [
              {
                amount: { value: amt.toFixed(2), currency_code: simCurrency },
                custom_id: token,
                invoice_id: simOrderId,
                description: 'Elysium Attributed Store Order',
              },
            ],
          };
        case 'square':
          return {
            idempotency_key: 'idemp_' + Math.random().toString(36).substring(2, 10),
            amount_money: { amount: Math.round(amt * 100), currency: simCurrency },
            reference_id: token,
            note: 'attribution_token: ' + token,
          };
        case 'shopify':
          return {
            action: 'POST /cart/update.js',
            attributes: {
              attribution_token: token,
              elysium_visitor_id: 'vis_uuid_99228811',
            },
          };
        case 'woocommerce':
          return {
            injected_dom_elements: [
              `<input type="hidden" name="attribution_token" value="${token}" />`,
              `<input type="hidden" name="billing_elysium_visitor_id" value="vis_uuid_99228811" />`,
            ],
          };
        case 'zenoti':
          return {
            appointment_notes: `Customer requested stylist Maya attribution_token:${token}`,
          };
        default:
          return {};
      }
    } else {
      // Inbound Webhook Payload
      switch (activeGateway) {
        case 'stripe':
          return {
            id: 'evt_stripe_' + Math.random().toString(36).substring(2, 9),
            type: 'payment_intent.succeeded',
            data: {
              object: {
                id: 'pi_' + Math.random().toString(36).substring(2, 12),
                amount: Math.round(amt * 100),
                currency: simCurrency.toLowerCase(),
                metadata: { attribution_token: token },
                receipt_email: simEmail,
                status: 'succeeded',
              },
            },
          };
        case 'razorpay':
          return {
            event: 'payment.captured',
            payload: {
              payment: {
                entity: {
                  id: 'pay_' + Math.random().toString(36).substring(2, 10),
                  amount: Math.round(amt * 100),
                  currency: simCurrency,
                  notes: { attribution_token: token },
                  email: simEmail,
                  status: 'captured',
                },
              },
            },
          };
        case 'paypal':
          return {
            event_type: 'CHECKOUT.ORDER.APPROVED',
            resource: {
              id: 'ord_pp_' + Math.random().toString(36).substring(2, 10),
              purchase_units: [
                {
                  amount: { value: amt.toFixed(2), currency_code: simCurrency },
                  custom_id: token,
                },
              ],
              payer: { email_address: simEmail },
            },
          };
        case 'square':
          return {
            type: 'payment.updated',
            data: {
              object: {
                payment: {
                  id: 'sq_pay_' + Math.random().toString(36).substring(2, 10),
                  amount_money: { amount: Math.round(amt * 100), currency: simCurrency },
                  reference_id: token,
                  status: 'COMPLETED',
                },
              },
            },
          };
        case 'shopify':
          return {
            topic: 'orders/paid',
            id: 987654321,
            total_price: amt.toFixed(2),
            currency: simCurrency,
            email: simEmail,
            note_attributes: [
              { name: 'attribution_token', value: token },
              { name: 'elysium_visitor_id', value: 'vis_uuid_99228811' },
            ],
          };
        case 'woocommerce':
          return {
            action: 'woocommerce_order_status_completed',
            order_id: 1024,
            order_total: amt.toFixed(2),
            currency: simCurrency,
            billing_email: simEmail,
            _elysium_attribution_token: token,
          };
        case 'zenoti':
          return {
            event: 'appointment.closed',
            appointment_id: 'zen_app_4433',
            service_price: amt.toFixed(2),
            notes: `Customer requested stylist Maya attribution_token:${token}`,
            guest_email: simEmail,
          };
        default:
          return {};
      }
    }
  };

  const currentGw = gateways.find((g) => g.id === activeGateway) || gateways[0];
  const simulatedOutput = JSON.stringify(generateSimulatedPayload(), null, 2);

  return (
    <section id="gateways" className="pt-10 pb-8 border-b border-stone-200 scroll-mt-20">
      <div className="flex items-center gap-2.5 mb-2">
        <CreditCard className="h-5 w-5 text-stone-700" />
        <h2 className="font-heading text-2xl font-bold text-stone-900 tracking-tight">
          Payment Gateway Connectors
        </h2>
      </div>
      <p className="text-sm text-stone-600 max-w-2xl mb-6">
        Seamlessly bridge client-side customer touchpoints to server-side payment transactions. Use these adapters to automatically attach attribution tokens into payment session metadata or inbound webhooks.
      </p>

      {/* Gateway Switcher Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {gateways.map((gw) => (
          <button
            key={gw.id}
            id={`gw-${gw.id}`}
            onClick={() => setActiveGateway(gw.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all shadow-sm ${
              activeGateway === gw.id
                ? 'bg-stone-900 border-stone-900 text-white'
                : 'border-stone-200 bg-white text-stone-700 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            {gw.name}
          </button>
        ))}
      </div>

      {/* Active Gateway Information Card */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-7 shadow-sm mb-8 hover:border-stone-300 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-heading text-xl font-bold text-stone-900">
                {currentGw.name} Adapter Architecture
              </span>
              <span className="rounded-md font-mono text-[11px] font-semibold px-2.5 py-1 bg-stone-100 border border-stone-200 text-stone-700">
                {currentGw.tag}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
              Token is preserved through checkout and matched upon webhook delivery.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-stone-600">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Idempotent Webhook Matching</span>
          </div>
        </div>

        {/* Specifications Grid - Generous Card Spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 text-xs">
          <div className="rounded-xl border border-stone-100 bg-stone-50/70 p-4">
            <span className="text-[11px] text-stone-500 font-mono block mb-1">Inbound Webhook Event</span>
            <span className="font-mono text-xs font-bold text-stone-900">{currentGw.webhookEvent}</span>
          </div>
          <div className="rounded-xl border border-stone-100 bg-stone-50/70 p-4">
            <span className="text-[11px] text-stone-500 font-mono block mb-1">Attached Token Field</span>
            <span className="font-mono text-xs font-bold text-stone-900">{currentGw.tokenField}</span>
          </div>
          <div className="rounded-xl border border-stone-100 bg-stone-50/70 p-4">
            <span className="text-[11px] text-stone-500 font-mono block mb-1">Attribution Timing</span>
            <span className="font-mono text-xs font-bold text-stone-900">Real-time Atomic Transaction</span>
          </div>
        </div>
      </div>

      {/* Code Snippet Panel with Multi-Tabs */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
            Implementation Guides
          </span>
          <div className="flex items-center gap-1 rounded-xl border border-stone-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => setActiveCodeTab('client')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCodeTab === 'client'
                  ? 'bg-stone-900 text-white font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Frontend SDK Integration</span>
            </button>
            <button
              onClick={() => setActiveCodeTab('webhook')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCodeTab === 'webhook'
                  ? 'bg-stone-900 text-white font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Webhook className="h-3.5 w-3.5" />
              <span>Server Webhook Listener</span>
            </button>
          </div>
        </div>

        <MacPanel
          title={activeCodeTab === 'client' ? currentGw.file : currentGw.webhookFile}
          code={codeSnippets[activeGateway][activeCodeTab]}
          language="javascript"
        />
      </div>

      {/* Interactive Gateway Testing Playground */}
      <div className="rounded-2xl border border-stone-300 bg-white shadow-sm overflow-hidden mb-8">
        <div className="flex items-center justify-between border-b border-stone-200 bg-[#F5F2EB] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <Play className="h-4 w-4 text-stone-800" />
            <h3 className="font-heading text-sm font-bold text-stone-900">
              Interactive Gateway Payload Simulator
            </h3>
          </div>
          <span className="text-xs text-stone-500 font-mono">
            Active: <strong className="text-stone-800">{currentGw.name}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
          {/* Controls Column (5 cols) - Generous padding & field spacing */}
          <div className="lg:col-span-5 p-6 sm:p-7 space-y-5 bg-[#FAF8F5]">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Order Amount & Currency
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                <input
                  type="number"
                  step="0.01"
                  value={simAmount}
                  onChange={(e) => setSimAmount(e.target.value)}
                  className="col-span-2 rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-900 outline-none focus:border-stone-400 shadow-2xs"
                  placeholder="89.50"
                />
                <select
                  value={simCurrency}
                  onChange={(e) => setSimCurrency(e.target.value)}
                  className="rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-xs text-stone-900 outline-none focus:border-stone-400 shadow-2xs"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Order ID / Reference
              </label>
              <input
                type="text"
                value={simOrderId}
                onChange={(e) => setSimOrderId(e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-900 outline-none focus:border-stone-400 shadow-2xs"
                placeholder="ord_123456"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Customer Email
              </label>
              <input
                type="email"
                value={simEmail}
                onChange={(e) => setSimEmail(e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-900 outline-none focus:border-stone-400 shadow-2xs"
                placeholder="customer@example.com"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Active Attribution Token
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={testToken}
                  onChange={(e) => setTestToken(e.target.value)}
                  className="flex-1 rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-xs font-mono text-stone-900 outline-none focus:border-stone-400 shadow-2xs"
                />
                <button
                  onClick={() => setTestToken('cs_sec_' + Math.random().toString(36).substring(2, 12))}
                  title="Generate new token"
                  className="rounded-lg border border-stone-200 bg-white p-2.5 text-stone-600 hover:text-stone-900 shadow-sm"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Toggle Payload Type */}
            <div className="pt-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-2">
                Inspect Payload
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setPayloadType('client')}
                  className={`py-2.5 px-3.5 text-xs font-semibold rounded-lg border transition-all ${
                    payloadType === 'client'
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                      : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  Frontend Attached
                </button>
                <button
                  onClick={() => setPayloadType('webhook')}
                  className={`py-2.5 px-3.5 text-xs font-semibold rounded-lg border transition-all ${
                    payloadType === 'webhook'
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                      : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  Inbound Webhook
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Code Output (7 cols) */}
          <div className="lg:col-span-7 flex flex-col bg-[#0D1117]">
            <div className="flex items-center justify-between border-b border-[#21262D] px-5 py-3 bg-[#161B22] text-xs font-mono text-stone-400">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                <span>
                  {payloadType === 'client' ? 'Client Payload Outbound' : 'Inbound Webhook Received'}
                </span>
              </span>
              <span className="text-[11px] text-stone-500">JSON Output</span>
            </div>

            <div className="p-5 flex-1 overflow-x-auto font-mono text-xs text-stone-200">
              <pre className="text-cyan-200/90 leading-relaxed whitespace-pre">
                {simulatedOutput}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
