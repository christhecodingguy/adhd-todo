import { useState } from 'react';

function safeGetItem(key) {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        console.log('Error reading from localStorage', e);
        return null;
    }
}

function safeParse(jsonString, fallback) {
    try {
        return typeof jsonString === 'string' ? JSON.parse(jsonString) : fallback;
    } catch {
        return fallback;
    }
}

export function useLocalstorage(key, initialValue) {
    const storedData = safeParse(safeGetItem(key), initialValue);
    const [state, setState] = useState(Object.keys(storedData).length >= Object.keys(initialValue).length ? storedData : initialValue);

    function updateStore(newState) {
        const updatedState = key !== 'toDoItems' ? {
            ...state,
            ...typeof newState === 'function' ? newState(state) : newState
        } : typeof newState === 'function' ? newState(state) : newState;

        try {
            localStorage.setItem(key, JSON.stringify(updatedState));
            setState(updatedState);
        } catch (error) {
            console.error('Error saving to localStorage', error);
        }
    }

    return [state, updateStore];
}