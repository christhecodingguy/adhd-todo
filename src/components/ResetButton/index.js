import React from 'react';
import './ResetButton.css';

export function ResetButton({ resetToDoItems }) {
    function confirmAndReset() {
        const userConfirmed = window.confirm('Are you sure you want to reset the to-do list? This action cannot be undone.');
        if (userConfirmed) {
            resetToDoItems();
        }
    }

    return (
        <button className="reset-button" onClick={confirmAndReset}>
            Reset List
        </button>
    );
}