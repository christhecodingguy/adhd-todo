import { renderHook, act } from '@testing-library/react';
import { useLocalstorage } from './useLocalstorage';

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        },
        removeItem: (key) => {
            delete store[key];
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});


describe('useLocalstorage', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorageMock.clear();
    });

    it('should initialize with default value if no value is in localStorage', () => {
        const { result } = renderHook(() => useLocalstorage('testKey', 'defaultValue'));

        expect(result.current[0]).toBe('defaultValue');
    });

    it('should initialize with value from localStorage if it exists', () => {
        localStorageMock.setItem('testKey', JSON.stringify({ testValue: 'storedValue' }));

        const { result } = renderHook(() => useLocalstorage('testKey', { testValue: 'defaultValue' }));

        expect(result.current[0].testValue).toBe('storedValue');
    });

    it('should update localStorage when value is updated', () => {
        const { result } = renderHook(() => useLocalstorage('testKey', { testValue: 'defaultValue' }));

        act(() => {
            result.current[1]({ testValue: 'newValue' });
        });

        expect(result.current[0].testValue).toBe('newValue');
        expect(localStorageMock.getItem('testKey')).toBe(JSON.stringify({ testValue: 'newValue' }));
    });

    it('should handle complex objects', () => {
        const defaultValue = { key: 'value' };
        const { result } = renderHook(() => useLocalstorage('testKey', defaultValue));

        expect(result.current[0]).toEqual(defaultValue);

        const newValue = { newKey: 'newValue' };
        act(() => {
            result.current[1](newValue);
        });

        const expectedOutput = {
            "key": "value",
            "newKey": "newValue",
        };
        expect(result.current[0]).toEqual(expectedOutput);
        expect(JSON.parse(localStorageMock.getItem('testKey'))).toEqual(expectedOutput);
    });
});