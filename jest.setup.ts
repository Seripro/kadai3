/* eslint-disable @typescript-eslint/no-explicit-any */

import '@testing-library/jest-dom';
import { config } from 'dotenv';

config();

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

if (!global.structuredClone) {
  global.structuredClone = function structuredClone(objectToClone: any) {
    if (objectToClone === undefined) return undefined;
    return JSON.parse(JSON.stringify(objectToClone));
  };
}
