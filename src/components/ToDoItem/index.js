import React from "react";
import './ToDoItem.css';

export default function ToDoItem({ itemName, completed, setCompleted, setItemName, enabled = true, testId, label = null, boss }) {
    return (
        <div className={`to-do-item${boss ? ' boss' : ''}`}>
            { label ? <label htmlFor={`${testId}-checkbox`}>{label}</label> : null }
            <input type="checkbox" disabled={!enabled} checked={completed} onChange={() => setCompleted(!completed)} data-testid={`${testId}-checkbox`} />
            <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} data-testid={`${testId}-input`} />
        </div>
    );
}