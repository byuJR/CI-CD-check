/**
 * Integration Tests
 * Menguji bagaimana multiple functions bekerja bersama dalam sebuah workflow
 * 
 * Integration tests berbeda dengan unit tests:
 * - Unit tests: Menguji 1 function secara isolated
 * - Integration tests: Menguji multiple functions bekerja bersama
 * 
 * Referensi: https://vitest.dev/guide/features.html
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  increment,
  decrement,
  reset,
  formatCurrency,
  isValidEmail,
} from './utils';

// ============================================
// INTEGRATION TEST 1: Counter Workflow
// ============================================
describe('Integration Test 1: Counter Management Workflow', () => {
  let counter = 0;

  beforeEach(() => {
    counter = reset(); // Reset before each test
  });

  it('should manage counter with increment and decrement operations', () => {
    // Start from 0
    expect(counter).toBe(0);

    // Increment 3 times
    counter = increment(counter );
    expect(counter).toBe(1);

    counter = increment(counter);
    expect(counter).toBe(2);

    counter = increment(counter);
    expect(counter).toBe(3);

    // Decrement 2 times
    counter = decrement(counter);
    expect(counter).toBe(2);

    counter = decrement(counter);
    expect(counter).toBe(1);

    // Reset back to 0
    counter = reset();
    expect(counter).toBe(0);
  });

  it('should handle complex counter sequence: increment → increment → decrement → reset → increment', () => {
    // Simulate user interactions sequence
    const operations = [
      { op: 'increment', expectedResult: 1 },
      { op: 'increment', expectedResult: 2 },
      { op: 'decrement', expectedResult: 1 },
      { op: 'reset', expectedResult: 0 },
      { op: 'increment', expectedResult: 1 },
    ];

    operations.forEach(({ op, expectedResult }) => {
      if (op === 'increment') {
        counter = increment(counter);
      } else if (op === 'decrement') {
        counter = decrement(counter);
      } else if (op === 'reset') {
        counter = reset();
      }
      expect(counter).toBe(expectedResult);
    });
  });

  it('should maintain counter state across multiple operations', () => {
    // Simulate continuous user session
    counter = increment(counter); // 0 → 1
    counter = increment(counter); // 1 → 2
    counter = increment(counter); // 2 → 3
    counter = increment(counter); // 3 → 4
    counter = decrement(counter); // 4 → 3
    counter = decrement(counter); // 3 → 2

    expect(counter).toBe(2);

    // Reset
    counter = reset();
    expect(counter).toBe(0);

    // Start new session
    counter = increment(counter); // 0 → 1
    expect(counter).toBe(1);
  });
});

// ============================================
// INTEGRATION TEST 2: Payment Processing Workflow
// ============================================
describe('Integration Test 2: Payment Processing Workflow', () => {
  it('should process payment workflow: validate email → validate amount → format currency', () => {
    // Workflow: Customer melakukan pembayaran online
    // Step 1: Validasi email customer
    const customerEmail = 'customer@example.com';
    const isEmailValid = isValidEmail(customerEmail);
    expect(isEmailValid).toBe(true); // ✓ Email valid

    // Step 2: Validasi amount (harus positive)
    const paymentAmount = 150.50;
    expect(paymentAmount).toBeGreaterThan(0); // ✓ Amount valid

    // Step 3: Format currency untuk display
    const formattedAmount = formatCurrency(paymentAmount);
    expect(formattedAmount).toContain('$');
    expect(formattedAmount).toContain('150');

    // Step 4: Konfirmasi checkout
    expect(isEmailValid && paymentAmount > 0).toBe(true);
  });

  it('should reject payment if email is invalid or amount is negative', () => {
    // Workflow dengan validasi error

    // Invalid email scenario
    const invalidEmail = 'invalid-email-format';
    const isValidEmailCheck = isValidEmail(invalidEmail);
    expect(isValidEmailCheck).toBe(false); // ✗ Email tidak valid

    // If email is invalid, payment should not proceed
    expect(() => {
      if (!isValidEmailCheck) {
        throw new Error('Cannot process payment: Invalid email');
      }
    }).toThrow('Cannot process payment: Invalid email');

    // Negative amount scenario
    const negativeAmount = -50;
    expect(() => {
      formatCurrency(negativeAmount); // Trigger error
    }).toThrow('Amount cannot be negative');
  });

  it('should handle complete payment workflow with multiple customers', () => {
    // Simulate multiple customer transactions
    const customers = [
      {
        email: 'john@example.com',
        amount: 99.99,
        expectedValid: true,
      },
      {
        email: 'jane.doe@company.co.uk',
        amount: 250.00,
        expectedValid: true,
      },
      {
        email: 'bob@shop.org',
        amount: 15.50,
        expectedValid: true,
      },
    ];

    customers.forEach((customer) => {
      // Validate email
      const emailValid = isValidEmail(customer.email);
      expect(emailValid).toBe(customer.expectedValid);

      // Format amount
      if (emailValid && customer.amount > 0) {
        const formatted = formatCurrency(customer.amount);
        expect(formatted).toContain('$');
      }
    });
  });
});
