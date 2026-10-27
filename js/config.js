// ===== ONLY FILE YOU NEED TO EDIT AFTER BUILDING YOUR BACKEND =====
window.NAIRA = {
  API_BASE: '',            // '' = offline mode (static products + WhatsApp orders).
                           // Set '/api' (Vercel functions) or 'https://api.yourdomain.com' to go live.
  PHONE: '919876543210',   // WhatsApp / call number with country code
  EMAIL: 'care@nairaagro.in',
  FREE_SHIPPING_MIN: 499,  // free delivery above this subtotal (Rs)
  SHIPPING_FEE: 49,        // shipping below that (Rs). Server must apply the same rule.
  ONLINE_PAYMENT: false    // true once backend returns a paymentUrl (Razorpay/PhonePe etc.)
};
