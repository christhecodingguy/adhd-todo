import React from 'react';
import PropTypes from 'prop-types';

import ToDoItem from './ToDoItem';

export default function BossTask({ toDoItems, setItemNameForItem, setCompletedForItem }) {
    return (
        <fieldset>
            <legend>Boss Task</legend>
            <ToDoItem itemName={toDoItems[2].boss.itemName}
                enabled={
                    (toDoItems[0].miniBoss.completed && toDoItems[1].miniBoss.completed) ||
                    (toDoItems[0].miniBoss.completed && toDoItems[1].miniBoss.itemName === '')
                }
                completed={toDoItems[2].boss.completed}
                setItemName={setItemNameForItem(2, 'boss')}
                setCompleted={setCompletedForItem(2, 'boss')}
                testId="toDoBoss"
                label="Main Boss"
                boss={true} />
        </fieldset>
    );
}

BossTask.propTypes = {
    toDoItems: PropTypes.arrayOf(PropTypes.shape({
        miniBoss: PropTypes.shape({
            itemName: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
        }).isRequired,
        boss: PropTypes.shape({
            itemName: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
        }).isRequired,
    })).isRequired,
    setItemNameForItem: PropTypes.func.isRequired,
    setCompletedForItem: PropTypes.func.isRequired,
};