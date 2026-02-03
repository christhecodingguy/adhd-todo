import React from 'react';
import PropTypes from 'prop-types';

import ToDoItem from './ToDoItem';

export default function LevelTasks({
    toDoItems,
    setItemNameForItem,
    setCompletedForItem,
    index,
    collapsedState = null,
    toggleLevel2CollapsedState = () => null
}) {

    function getCollapsiblePrefix() {
        if (collapsedState === null) return '';
        return collapsedState !== null && collapsedState.collapsed ? '+ ' : '- '
    }

    return (
        <fieldset className={collapsedState !== null && collapsedState.collapsed ? 'collapsed' : ''}>
            <legend onClick={() => toggleLevel2CollapsedState()}>{getCollapsiblePrefix()}Level {index + 1} Tasks</legend>
            <ToDoItem itemName={toDoItems[index].item1.itemName}
                enabled={toDoItems[index].item1.itemName !== ''}
                completed={toDoItems[index].item1.completed}
                setItemName={setItemNameForItem(index, 'item1')}
                setCompleted={setCompletedForItem(index, 'item1')}
                testId={`level${index + 1}item1`}
                label="Task 1" />
            <ToDoItem itemName={toDoItems[index].item2.itemName}
                enabled={toDoItems[index].item2.itemName !== ''}
                completed={toDoItems[index].item2.completed}
                setItemName={setItemNameForItem(index, 'item2')}
                setCompleted={setCompletedForItem(index, 'item2')}
                testId={`level${index + 1}item2`}
                label="Task 2" />
            <ToDoItem itemName={toDoItems[index].miniBoss.itemName}
                enabled={toDoItems[index].item1.completed && toDoItems[index].item2.completed}
                completed={toDoItems[index].miniBoss.completed}
                setItemName={setItemNameForItem(index, 'miniBoss')}
                setCompleted={setCompletedForItem(index, 'miniBoss')}
                testId={`level${index + 1}MiniBoss`}
                label="Mini Boss"
                boss={true} />
        </fieldset>
    );
}

LevelTasks.propTypes = {
    toDoItems: PropTypes.arrayOf(PropTypes.shape({
        item1: PropTypes.shape({
            itemName: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
        }).isRequired,
        item2: PropTypes.shape({
            itemName: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
        }).isRequired,
        miniBoss: PropTypes.shape({
            itemName: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
        }).isRequired,
    })).isRequired,
    setItemNameForItem: PropTypes.func.isRequired,
    setCompletedForItem: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    collapsedState: PropTypes.shape({
        collapsed: PropTypes.bool.isRequired,
    }),
    toggleLevel2CollapsedState: PropTypes.func,
};