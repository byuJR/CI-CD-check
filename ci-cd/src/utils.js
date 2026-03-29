/**
 * Utility functions untuk testing
 * Referensi: https://vitest.dev/
 */

// Test 1: Fungsi increment counter
export const increment = (count) => {
  if (typeof count !== 'number') {
    throw new Error('Count must be a number');
  }
  return count + 1;
};

// Test 2: Fungsi decrement counter
export const decrement = (count) => {
  if (typeof count !== 'number') {
    throw new Error('Count must be a number');
  }
  return count - 1;
};

// Test 3: Fungsi reset counter
export const reset = () => {
  return 0;
};

// Test 4: Fungsi format number dengan currency
export const formatCurrency = (amount, currency = 'USD') => {
  if (typeof amount !== 'number') {
    throw new Error('Amount must be a number');
  }
  if (amount < 0) {
    throw new Error('Amount cannot be negative');
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Test 5: Fungsi validator email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
