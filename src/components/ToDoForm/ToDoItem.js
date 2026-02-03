import React from "react";
import PropTypes from 'prop-types';

import './ToDoItem.css';

export default function ToDoItem({ itemName, completed, setCompleted, setItemName, enabled = true, testId, label = null, boss }) {
    return (
        <div className={`to-do-item${boss ? ' boss' : ''}`}>
            {label ? <label htmlFor={`${testId}-checkbox`}>{label}</label> : null}
            <input type="checkbox"
                disabled={!enabled}
                checked={completed}
                onChange={() => setCompleted(!completed)}
                data-testid={`${testId}-checkbox`}
                id={`${testId}-checkbox`} />
            <input type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                data-testid={`${testId}-input`}
                id={`${testId}-input`} />
        </div>
    );
}

ToDoItem.propTypes = {
    itemName: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    setCompleted: PropTypes.func.isRequired,
    setItemName: PropTypes.func.isRequired,
    enabled: PropTypes.bool,
    testId: PropTypes.string.isRequired,
    label: PropTypes.string,
    boss: PropTypes.bool,
};