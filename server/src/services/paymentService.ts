import axios from 'axios';
import Stripe from 'stripe';
import { config } from '../config';

const stripe = new Stripe(config.stripe.secretKey || 'sk_test_placeholder', {
  apiVersion: '2023-10-16' as any,
});

export const paymentService = {
  async createStripeSession(amount: number, currency: string, customerData: any) {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: 'Donation ASAFS',
              description: 'Soutien à l\'autonomisation des femmes sourdes',
            },
            unit_amount: amount * 100, // amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${config.frontendUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.frontendUrl}/don`,
      customer_email: customerData.email,
    });
    return session;
  },

  async processMaishaPay(amount: number, currency: string, phone: string, customerData: any) {
    // This is a placeholder for Maisha Pay integration
    // Maisha Pay usually requires an API key and merchant ID
    const MAISHA_PAY_API = 'https://maishapay.com/api/payment'; // Placeholder
    
    const response = await axios.post(MAISHA_PAY_API, {
      api_key: config.maishaPay.apiKey,
      merchant_id: config.maishaPay.merchantId,
      amount: amount,
      currency: currency,
      phone: phone,
      description: 'Donation ASAFS',
      callback_url: `${config.backendUrl}/api/payments/callback/maishapay`,
      customer: customerData
    });

    return response.data;
  },

  async processMobileMoney(method: string, amount: number, phone: string) {
    // Placeholder for other mobile money providers if not using Maisha Pay as aggregator
    console.log(`Processing ${method} for ${amount} to ${phone}`);
    return { status: 'pending', message: 'Payment initiated' };
  }
};
