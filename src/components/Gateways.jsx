import React, { useState } from 'react';
import MacPanel from './MacPanel';
import { CreditCard } from 'lucide-react';

export default function Gateways() {
  const [activeGateway, setActiveGateway] = useState('stripe');

  const gateways = [
    { id: 'stripe', name: 'Stripe', file: 'stripeCheckout.js' },
    { id: 'razorpay', name: 'Razorpay', file: 'razorpayModal.js' },
    { id: 'paypal', name: 'PayPal', file: 'paypalButtons.js' },
    { id: 'shopify', name: 'Shopify', file: 'shopifyCart.js' },
    { id: 'woocommerce', name: 'WooCommerce', file: 'wooCommerceCheckout.js' },
    { id: 'zenoti', name: 'Zenoti', file: 'zenotiBooking.js' },
  ];

  const codeSnippets = {
    stripe: `import { Elysium } from 'elysium-attribution';

// Method 1: Inject checkout token into Stripe PaymentIntent options
const stripeGateway = Elysium.gateways.registry.get('stripe');
const token = await Elysium.getCheckoutToken();

const paymentIntentData = stripeGateway.attachToken({
  amount: 4999, // in cents
  currency: 'usd',
}, token);
// Result: paymentIntentData.metadata.attribution_token = token
//         paymentIntentData.client_reference_id = token

// Method 2: Automatically wrap Stripe instance
const stripe = stripeGateway.wrapStripe(Stripe('pk_test_...'));
await stripe.confirmPayment({
  elements,
  confirmParams: { return_url: 'https://mystore.com/complete' }
});`,

    razorpay: `import { Elysium } from 'elysium-attribution';

const rzpGateway = Elysium.gateways.registry.get('razorpay');
const token = await Elysium.getCheckoutToken();

// Wrap Razorpay checkout options (automatically attaches notes.attribution_token)
const options = rzpGateway.wrapOptions({
  key: 'rzp_test_...',
  amount: 50000, // in paise (500 INR)
  currency: 'INR',
  name: 'Acme Store',
  description: 'Running Shoes Order',
  handler: function(response) {
    console.log('Payment successful:', response.razorpay_payment_id);
  }
}, token);

const rzp = new Razorpay(options);
rzp.open();`,

    paypal: `import { Elysium } from 'elysium-attribution';

const ppGateway = Elysium.gateways.registry.get('paypal');
const token = await Elysium.getCheckoutToken();

paypal.Buttons(ppGateway.wrapButtons({
  createOrder: (data, actions) => {
    return actions.order.create({
      purchase_units: [
        ppGateway.attachToken({
          amount: { value: '99.00', currency_code: 'USD' }
        }, token)
      ]
    });
  },
  onApprove: (data, actions) => {
    console.log('PayPal Order Approved:', data.orderID);
  }
})).render('#paypal-button-container');`,

    shopify: `import { Elysium } from 'elysium-attribution';

// In Shopify themes, attaches 'attribution_token' cart attributes via /cart/update.js
// Runs automatically when user clicks a button with class .elysium-payment-button
// Or trigger programmatically:
const shopifyGateway = Elysium.gateways.registry.get('shopify');
await shopifyGateway.attachCartAttributes();

// The backend Shopify webhook reads cart_attributes.attribution_token
// and matches it directly to the frozen touch snapshot!`,

    woocommerce: `import { Elysium } from 'elysium-attribution';

// Automatically injects hidden input fields into form.woocommerce-checkout:
//   <input type="hidden" name="attribution_token" value="cs_sec_..." />
//   <input type="hidden" name="billing_elysium_visitor_id" value="uuid..." />
const wooGateway = Elysium.gateways.registry.get('woocommerce');
await wooGateway.injectHiddenCheckoutFields();`,

    zenoti: `import { Elysium } from 'elysium-attribution';

const zenotiGateway = Elysium.gateways.registry.get('zenoti');
const token = await Elysium.getCheckoutToken();

// Format appointment notes to include attribution token
// Backend Zenoti processor checks: notes.match(/attribution_token:([a-f0-9-]+)/)
const appointmentNotes = zenotiGateway.formatNote(token, "Customer requested stylist Maya");
// Result: "Customer requested stylist Maya attribution_token:cs_sec_..."`,
  };

  return (
    <section id="gateways" className="pt-10 pb-8 border-b border-stone-200 scroll-mt-20">
      <div className="flex items-center gap-2.5 mb-2">
        <CreditCard className="h-5 w-5 text-stone-700" />
        <h2 className="font-heading text-2xl font-bold text-stone-900 tracking-tight">
          Payment Gateway Connectors
        </h2>
      </div>
      <p className="text-sm text-stone-600 max-w-2xl mb-6">
        The backend supports one-click gateway integrations and inbound webhooks. Use these client-side helpers to automatically pass the checkout token into payment sessions.
      </p>

      {/* Gateway Switcher Tabs - Solid buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {gateways.map((gw) => (
          <button
            key={gw.id}
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

      {/* Gateway Code Panel */}
      <MacPanel
        title={gateways.find(g => g.id === activeGateway)?.file || 'gateway.js'}
        code={codeSnippets[activeGateway]}
        language="javascript"
      />
    </section>
  );
}
