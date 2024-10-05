// client/src/services/stripeService.js
import axios from 'axios';

export const createCheckoutSession = async (items) => {
  const { data } = await axios.post('/api/create-checkout-session', {
    items,
  });
  return data;
};
