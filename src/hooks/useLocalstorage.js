import { useState } from 'react';

function safeParse(jsonString, fallback) {
    try {
        return JSON.parse(jsonString);
    } catch {
        return fallback;
    }
}

export function useLocalstorage(key, initialValue) {
    const storedData = safeParse(localStorage.getItem(key), {});
    const [state, setState] = useState(Object.keys(storedData).length >= Object.keys(initialValue).length ? storedData : initialValue);

    function updateStore(newState) {
        console.log(newState);
        const updatedState = {
            ...state,
            ...typeof newState === 'function' ? newState(state) : newState
        };

        try {
            localStorage.setItem(key, JSON.stringify(updatedState));
            setState(updatedState);
        } catch (error) {
            console.error('Error saving to localStorage', error);
        }
    }

    return [state, updateStore];
}