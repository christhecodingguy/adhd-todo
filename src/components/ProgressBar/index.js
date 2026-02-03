import React from "react";
import "./ProgressBar.css";

import { ITEM_TYPES } from "../../const";

const factors = {
    [ITEM_TYPES.ITEM]: 1,
    [ITEM_TYPES.MINI_BOSS]: 2,
    [ITEM_TYPES.BOSS]: 3,
};


function progressPoints({ itemName, itemType, completed }) {
    const count = factors[itemType] || 1;
    return Array.from({ length: count }, (_, index) => (<div
        key={`${itemName.replace(/\W/g, '')}-${index}`}
        className={`progress-point${completed ? " completed" : ""}`}
    >&nbsp;</div>));
}

function isToDoListFilled(progressItems) {
    // want: two items, a mini boss, and a boss = progress bar points count would be 1+1+2+3 = 7
    const requiredPoints = 7;
    const currentPoints = progressItems.reduce((total, item) => total + (factors[item.itemType] || 1), 0);
    const hasBoss = progressItems.some(item => item.itemType === ITEM_TYPES.BOSS);
    return currentPoints >= requiredPoints && hasBoss;
}

export default function ProgressBar({ toDoItems }) {
    const progressItems = toDoItems
        .flatMap(level => Object.values(level))
        .filter((item) => item.itemName.trim() !== '');

    const toDoListStarterPoint = {
        itemName: 'to do list filled in',
        itemType: ITEM_TYPES.ITEM,
        completed: isToDoListFilled(progressItems),
    };

    return (
        <fieldset id="progress-bar" data-testid="progress-bar">
            <legend>Progress</legend>
            {[toDoListStarterPoint, ...progressItems].map(item => progressPoints(item)).flat()}
        </fieldset>
    );
}