import React from 'react';
import './ResetButton.css';
import { confirm } from '../../shared/confirm.js';

export function ResetButton({ resetToDoItems }) {
    function confirmAndReset() {
        confirm('Are you sure you want to reset the to-do list? This action cannot be undone.')
            .then(userConfirmed => {
                if (userConfirmed) {
                    resetToDoItems();
                }
            });
    }

    return (
        <button className="reset-button" onClick={confirmAndReset}>
            Reset List
        </button>
    );
}