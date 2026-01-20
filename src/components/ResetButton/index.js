import React from 'react';
import './ResetButton.css';

export function ResetButton({ resetToDoItems }) {
    return (
        <button className="reset-button" onClick={resetToDoItems}>
            Reset List
        </button>
    );
}