import React, { useState, useEffect } from 'react';


export default function Timer({ toDoItems }) {
    const [currentToDo, setCurrentToDo] = useState(null);

    useEffect(() => {
        const toDoList = Object.values(toDoItems).map(level => Object.values(level)).flat().filter(item => item.itemName !== '' && !item.completed);

        setCurrentToDo(toDoList.length > 0 ? toDoList[0].itemName : 'Nothing to do');
    }, [toDoItems]);

    return (
        <div>
            15:00 start : {currentToDo}
        </div>
    );
}