import { ITEM_TYPES } from '../const';

function isToDoItem(item) {
    return typeof item === 'object' &&
        item !== null &&
        typeof item.itemName === 'string' &&
        typeof item.completed === 'boolean' &&
        typeof item.itemType === 'number';
}

function isToDoItemGroup(value) {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    for (const key in value) {
        if (!isToDoItem(value[key])) {
            return false;
        }
    }

    return true;
}

export function isToDoItemsList(value) {
    return Array.isArray(value)
        && value.every(itemGroup => isToDoItemGroup(itemGroup));
}

function buildToDoItem(itemType) {
    return { itemName: '', completed: false, itemType };
}

function buildToDoItemGroup() {
    return {
        item1: buildToDoItem(ITEM_TYPES.ITEM),
        item2: buildToDoItem(ITEM_TYPES.ITEM),
        miniBoss: buildToDoItem(ITEM_TYPES.MINI_BOSS),
    };
}

function buildBossItemGroup() {
    return {
        boss: buildToDoItem(ITEM_TYPES.BOSS),
    };
}

export function getInitialToDoItemsList() {
    return [
        buildToDoItemGroup(),
        buildToDoItemGroup(),
        buildBossItemGroup(),
    ];
}