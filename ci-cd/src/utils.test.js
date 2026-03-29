/**
 * Unit Tests untuk Utility Functions
 * Framework: Vitest (https://vitest.dev/)
 * Testing Library: Vitest built-in
 * 
 * Cara jalankan tests:
 * npm test
 * 
 * Atau dengan UI:
 * npm run test:ui
 */

import { describe, it, expect } from 'vitest';
import {
  increment,
  decrement,
  reset,
  formatCurrency,
  isValidEmail,
} from './utils';

// ============================================
// TEST 1: Increment Function
// ============================================
describe('Increment Function', () => {
  it('should increment count by 1', () => {
    const result = increment(5);
    expect(result).toBe(6);
  });

  it('should handle zero', () => {
    const result = increment(0);
    expect(result).toBe(1);
  });

  it('should throw error if count is not a number', () => {
    expect(() => increment('5')).toThrow('Count must be a number');
  });
});

// ============================================
// TEST 2: Decrement Function
// ============================================
describe('Decrement Function', () => {
  it('should decrement count by 1', () => {
    const result = decrement(5);
    expect(result).toBe(4);
  });

  it('should handle negative numbers', () => {
    const result = decrement(-5);
    expect(result).toBe(-6);
  });

  it('should throw error if count is not a number', () => {
    expect(() => decrement(null)).toThrow('Count must be a number');
  });
});

// ============================================
// TEST 3: Reset Function
// ============================================
describe('Reset Function', () => {
  it('should reset count to 0', () => {
    const result = reset();
    expect(result).toBe(0);
  });

  it('should always return 0 regardless of state', () => {
    expect(reset()).toBe(0);
    expect(reset()).toBe(0);
    expect(reset()).toBe(0);
  });
});

// ============================================
// TEST 4: Format Currency Function
// ============================================
describe('Format Currency Function', () => {
  it('should format number as USD currency by default', () => {
    const result = formatCurrency(1234.56);
    expect(result).toContain('$');
    expect(result).toContain('1,234');
  });

  it('should format with custom currency', () => {
    const result = formatCurrency(1000, 'EUR');
    expect(result).toContain('€');
  });

  it('should throw error if amount is not a number', () => {
    expect(() => formatCurrency('1000')).toThrow('Amount must be a number');
  });

  it('should throw error if amount is negative', () => {
    expect(() => formatCurrency(-100)).toThrow(
      'Amount cannot be negative'
    );
  });
});

// ============================================
// TEST 5: Email Validator Function
// ============================================
describe('Email Validator Function', () => {
  it('should validate correct email format', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  it('should reject email without @ symbol', () => {
    expect(isValidEmail('userexample.com')).toBe(false);
  });

  it('should reject email without domain', () => {
    expect(isValidEmail('user@')).toBe(false);
  });

  it('should reject email with spaces', () => {
    expect(isValidEmail('user @example.com')).toBe(false);
  });

  it('should validate multiple valid email formats', () => {
    const validEmails = [
      'test@domain.com',
      'user.name@company.co.uk',
      'info@example.org',
    ];
    validEmails.forEach((email) => {
      expect(isValidEmail(email)).toBe(true);
    });
  });
});
