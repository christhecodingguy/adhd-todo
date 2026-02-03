import React, { useEffect } from 'react';
import { useLocalstorage } from '../../hooks/useLocalstorage';

import LevelTasks from './LevelTasks';
import BossTask from './BossTask';

import './ToDoForm.css';

export default function ToDoForm({ toDoItems, setToDoItems, formDirtyState }) {
    const [collapsedState, setCollapsed] = useLocalstorage('level2Collapsed', { collapsed: true });

    useEffect(() => {
        if (!formDirtyState.isDirty) {
            setCollapsed({ collapsed: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- want to run only when formDirtyState changes
    }, [formDirtyState]);

    function setStateForItem(index, itemKey, key, state) {
        setToDoItems(currentItemsState => {
            const newItemState = [...currentItemsState];
            newItemState[index] = {
                ...newItemState[index],
                [itemKey]: {
                    ...newItemState[index][itemKey],
                    [key]: state
                }
            };
            return newItemState;
        });
    }

    const setCompletedForItem = (index, itemKey) => (completed) => setStateForItem(index, itemKey, 'completed', completed);
    const setItemNameForItem = (index, itemKey) => (itemName) => setStateForItem(index, itemKey, 'itemName', itemName);

    function toggleLevel2CollapsedState() {
        if (!collapsedState.collapsed) {
            setToDoItems(currentItemsState => {
                const newItemState = [...currentItemsState];
                newItemState[1] = {
                    item1: { itemName: '', completed: false, itemType: 'item' },
                    item2: { itemName: '', completed: false, itemType: 'item' },
                    miniBoss: { itemName: '', completed: false, itemType: 'mini_boss' },
                };
                return newItemState;
            });
        }

        setCollapsed({ collapsed: !collapsedState.collapsed });
    }

    return (
        <div id="to-do-form">
            <LevelTasks
                toDoItems={toDoItems}
                index={0}
                setItemNameForItem={setItemNameForItem}
                setCompletedForItem={setCompletedForItem} />

            {
                toDoItems[0].miniBoss.itemName !== '' ?
                    (<LevelTasks
                        toDoItems={toDoItems}
                        index={1}
                        setItemNameForItem={setItemNameForItem}
                        setCompletedForItem={setCompletedForItem}
                        collapsedState={collapsedState}
                        toggleLevel2CollapsedState={toggleLevel2CollapsedState} />
                    )
                    : ''
            }

            <BossTask toDoItems={toDoItems}
                setItemNameForItem={setItemNameForItem}
                setCompletedForItem={setCompletedForItem} />
        </div>
    );
}