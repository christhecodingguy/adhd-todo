import React from "react";

export default function ToDoItem({ itemName, completed, setCompleted, setItemName, enabled = true }) {
    return (
        <div>
            <input type="checkbox" disabled={!enabled} checked={completed} onChange={() => setCompleted(!completed)} />
            <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        </div>
    );
}