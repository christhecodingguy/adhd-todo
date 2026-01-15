import { render, screen } from '@testing-library/react';
import ProgressBar from '.';
import { ITEM_TYPES } from '../../const';

describe('ProgressBar Component', () => {
    test('renders with default props', () => {
        render(<ProgressBar toDoItems={{}} />);

        expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
        expect(screen.getByTestId('progress-bar').childNodes.length).toBe(1);
    });

    test('renders single progress points for regular items', () => {
        const toDoItems = {
            level1item1: { itemName: 'test 1', completed: false, itemType: ITEM_TYPES.ITEM },
            level1item2: { itemName: 'test 2', completed: false, itemType: ITEM_TYPES.ITEM },
            level1MiniBoss: { itemName: '', completed: false, itemType: ITEM_TYPES.MINI_BOSS },
            level2item1: { itemName: '', completed: false, itemType: ITEM_TYPES.ITEM },
            level2item2: { itemName: '', completed: false, itemType: ITEM_TYPES.ITEM },
            level2MiniBoss: { itemName: '', completed: false, itemType: ITEM_TYPES.MINI_BOSS },
            toDoBoss: { itemName: '', completed: false, itemType: ITEM_TYPES.BOSS },
        };

        render(<ProgressBar toDoItems={toDoItems} />);

        const progressBar = screen.getByTestId('progress-bar');
        expect(progressBar.childNodes.length).toBe(3);

    });

    test('renders 2 progress points for mini-boss items', () => {
        const toDoItems = {
            level1item1: { itemName: 'test 1', completed: false, itemType: ITEM_TYPES.ITEM },
            level1item2: { itemName: 'test 2', completed: false, itemType: ITEM_TYPES.ITEM },
            level1MiniBoss: { itemName: 'mini-boss 1', completed: false, itemType: ITEM_TYPES.MINI_BOSS },
            level2item1: { itemName: '', completed: false, itemType: ITEM_TYPES.ITEM },
            level2item2: { itemName: '', completed: false, itemType: ITEM_TYPES.ITEM },
            level2MiniBoss: { itemName: '', completed: false, itemType: ITEM_TYPES.MINI_BOSS },
            toDoBoss: { itemName: '', completed: false, itemType: ITEM_TYPES.BOSS },
        };

        render(<ProgressBar toDoItems={toDoItems} />);

        const progressBar = screen.getByTestId('progress-bar');
        expect(progressBar.childNodes.length).toBe(5);

    });

    test('renders 3 progress points for boss items', () => {
        const toDoItems = {
            level1item1: { itemName: 'test 1', completed: false, itemType: ITEM_TYPES.ITEM },
            level1item2: { itemName: 'test 2', completed: false, itemType: ITEM_TYPES.ITEM },
            level1MiniBoss: { itemName: 'mini-boss 1', completed: false, itemType: ITEM_TYPES.MINI_BOSS },
            level2item1: { itemName: '', completed: false, itemType: ITEM_TYPES.ITEM },
            level2item2: { itemName: '', completed: false, itemType: ITEM_TYPES.ITEM },
            level2MiniBoss: { itemName: '', completed: false, itemType: ITEM_TYPES.MINI_BOSS },
            toDoBoss: { itemName: 'boss!', completed: false, itemType: ITEM_TYPES.BOSS },
        };

        render(<ProgressBar toDoItems={toDoItems} />);

        const progressBar = screen.getByTestId('progress-bar');
        expect(progressBar.childNodes.length).toBe(8);

    });
});