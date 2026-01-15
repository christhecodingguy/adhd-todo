import React from 'react';
import ToDoItem from '../ToDoItem';
import './ToDoForm.css';

export default function ToDoForm({ toDoItems, setToDoItems }) {
    const [collapsed, setCollapsed] = React.useState(true);

    function setCompletedForItem(itemKey, completed) {
        setToDoItems(currentItemsState => ({
            ...currentItemsState,
            [itemKey]: {
                ...currentItemsState[itemKey],
                completed: completed
            }
        }));
    }

    function setItemNameForItem(itemKey, itemName) {
        setToDoItems(currentItemsState => ({
            ...currentItemsState,
            [itemKey]: {
                ...currentItemsState[itemKey],
                itemName: itemName
            }
        }));
    }

    function toggleLevel2CollapsedState() {
        if (!collapsed) {
            setItemNameForItem('level2item1', '');
            setItemNameForItem('level2item2', '');
            setItemNameForItem('level2MiniBoss', '');
            setCompletedForItem('level2item1', false);
            setCompletedForItem('level2item2', false);
            setCompletedForItem('level2MiniBoss', false);
        }

        setCollapsed(!collapsed);
    }

    return (
        <div id="to-do-form">
            <h1>ADHD To-Do List</h1>
            <fieldset>
                <legend>Level 1 Tasks</legend>
                <ToDoItem itemName={toDoItems.level1item1.itemName}
                    enabled={toDoItems.level1item1.itemName !== ''}
                    completed={toDoItems.level1item1.completed}
                    setItemName={(itemName) => setItemNameForItem('level1item1', itemName)}
                    setCompleted={(completed) => setCompletedForItem('level1item1', completed)}
                    testId="level1item1"
                    label="Task 1" />
                <ToDoItem itemName={toDoItems.level1item2.itemName}
                    enabled={toDoItems.level1item2.itemName !== ''}
                    completed={toDoItems.level1item2.completed}
                    setItemName={(itemName) => setItemNameForItem('level1item2', itemName)}
                    setCompleted={(completed) => setCompletedForItem('level1item2', completed)}
                    testId="level1item2"
                    label="Task 2" />
                <ToDoItem itemName={toDoItems.level1MiniBoss.itemName}
                    enabled={toDoItems.level1item1.completed && toDoItems.level1item2.completed}
                    completed={toDoItems.level1MiniBoss.completed}
                    setItemName={(itemName) => setItemNameForItem('level1MiniBoss', itemName)}
                    setCompleted={(completed) => setCompletedForItem('level1MiniBoss', completed)}
                    testId="level1MiniBoss"
                    label="Mini Boss 1"
                    boss={true} />
            </fieldset>

            {
                toDoItems.level1MiniBoss.itemName !== '' ?
                    (<fieldset className={collapsed ? 'collapsed' : ''}>
                        <legend onClick={() => toggleLevel2CollapsedState()}>{collapsed ? '+' : '-'} Level 2 Tasks</legend>
                        <ToDoItem itemName={toDoItems.level2item1.itemName}
                            enabled={toDoItems.level2item1.itemName !== ''}
                            completed={toDoItems.level2item1.completed}
                            setItemName={(itemName) => setItemNameForItem('level2item1', itemName)}
                            setCompleted={(completed) => setCompletedForItem('level2item1', completed)}
                            testId="level2item1"
                            label="Task 3" />
                        <ToDoItem itemName={toDoItems.level2item2.itemName}
                            enabled={toDoItems.level2item2.itemName !== ''}
                            completed={toDoItems.level2item2.completed}
                            setItemName={(itemName) => setItemNameForItem('level2item2', itemName)}
                            setCompleted={(completed) => setCompletedForItem('level2item2', completed)}
                            testId="level2item2"
                            label="Task 4" />
                        <ToDoItem itemName={toDoItems.level2MiniBoss.itemName}
                            enabled={toDoItems.level2item1.completed && toDoItems.level2item2.completed}
                            completed={toDoItems.level2MiniBoss.completed}
                            setItemName={(itemName) => setItemNameForItem('level2MiniBoss', itemName)}
                            setCompleted={(completed) => setCompletedForItem('level2MiniBoss', completed)}
                            testId="level2MiniBoss"
                            label="Mini Boss 2"
                            boss={true} />
                    </fieldset>)
                    : ''
            }

            <fieldset>
                <legend>Boss Task</legend>
                <ToDoItem itemName={toDoItems.toDoBoss.itemName}
                    enabled={
                        (toDoItems.level1MiniBoss.completed && toDoItems.level2MiniBoss.completed) ||
                        (toDoItems.level1MiniBoss.completed && toDoItems.level2MiniBoss.itemName === '')
                    }
                    completed={toDoItems.toDoBoss.completed}
                    setItemName={(itemName) => setItemNameForItem('toDoBoss', itemName)}
                    setCompleted={(completed) => setCompletedForItem('toDoBoss', completed)}
                    testId="toDoBoss"
                    label="Main Boss"
                    boss={true} />
            </fieldset>
        </div>
    );
}