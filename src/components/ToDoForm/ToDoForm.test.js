import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import ToDoForm from '.';

describe('ToDoForm Component', () => {
    const mockSetToDoItems = jest.fn();

    test('renders all to-do items correctly', () => {
        const toDoItems = {
            level1item1: { itemName: 'Task 1', completed: false },
            level1item2: { itemName: 'Task 2', completed: false },
            level1MiniBoss: { itemName: 'Mini Boss 1', completed: false },
            level2item1: { itemName: 'Task 3', completed: false },
            level2item2: { itemName: 'Task 4', completed: false },
            level2MiniBoss: { itemName: 'Mini Boss 2', completed: false },
            toDoBoss: { itemName: 'Final Boss', completed: false }
        };

        const { getByText, getByTestId } = render(<ToDoForm toDoItems={toDoItems} setToDoItems={mockSetToDoItems} />);

        expect(getByText('ADHD To-Do List')).toBeInTheDocument();
        expect(getByText('Level 1 Tasks')).toBeInTheDocument();
        expect(getByText('Boss Task')).toBeInTheDocument();

        expect(getByTestId('level1item1-input')).toHaveValue('Task 1');
        expect(getByTestId('level1item2-input')).toHaveValue('Task 2');
        expect(getByTestId('level1MiniBoss-input')).toHaveValue('Mini Boss 1');
        expect(getByTestId('level2item1-input')).toHaveValue('Task 3');
        expect(getByTestId('level2item2-input')).toHaveValue('Task 4');
        expect(getByTestId('level2MiniBoss-input')).toHaveValue('Mini Boss 2');
        expect(getByTestId('toDoBoss-input')).toHaveValue('Final Boss');
    });

    test('does not render level 2 form when level 1 item values are empty', () => {
        const toDoItems = {
            level1item1: { itemName: '', completed: false },
            level1item2: { itemName: '', completed: false },
            level1MiniBoss: { itemName: '', completed: false },
            level2item1: { itemName: '', completed: false },
            level2item2: { itemName: '', completed: false },
            level2MiniBoss: { itemName: '', completed: false },
            toDoBoss: { itemName: '', completed: false }
        };
        const { queryByText } = render(<ToDoForm toDoItems={toDoItems} setToDoItems={mockSetToDoItems} />);

        expect(queryByText('Level 2 Tasks')).not.toBeInTheDocument();
    });

    test('item 2 checkbox is disabled when item name is empty', () => {
        const toDoItems = {
            level1item1: { itemName: 'Task 1', completed: false },
            level1item2: { itemName: '', completed: false },
            level1MiniBoss: { itemName: 'Mini Boss 1', completed: false },
            level2item1: { itemName: '', completed: false },
            level2item2: { itemName: '', completed: false },
            level2MiniBoss: { itemName: '', completed: false },
            toDoBoss: { itemName: '', completed: false }
        };
        const { getByTestId } = render(<ToDoForm toDoItems={toDoItems} setToDoItems={mockSetToDoItems} />);

        expect(getByTestId('level1item2-checkbox')).toBeDisabled();
    });

    test('mini boss checkbox is disabled when level items are not completed', () => {
        const toDoItems = {
            level1item1: { itemName: 'Task 1', completed: false },
            level1item2: { itemName: 'Task 2', completed: false },
            level1MiniBoss: { itemName: 'Mini Boss 1', completed: false },
            level2item1: { itemName: '', completed: false },
            level2item2: { itemName: '', completed: false },
            level2MiniBoss: { itemName: '', completed: false },
            toDoBoss: { itemName: '', completed: false }
        };
        const { getByTestId } = render(<ToDoForm toDoItems={toDoItems} setToDoItems={mockSetToDoItems} />);

        expect(getByTestId('level1MiniBoss-checkbox')).toBeDisabled();
    });

    test('mini boss checkbox is enabled when level items are completed', () => {
        const toDoItems = {
            level1item1: { itemName: 'Task 1', completed: true },
            level1item2: { itemName: 'Task 2', completed: true },
            level1MiniBoss: { itemName: 'Mini Boss 1', completed: false },
            level2item1: { itemName: '', completed: false },
            level2item2: { itemName: '', completed: false },
            level2MiniBoss: { itemName: '', completed: false },
            toDoBoss: { itemName: '', completed: false }
        };
        const { getByTestId } = render(<ToDoForm toDoItems={toDoItems} setToDoItems={mockSetToDoItems} />);

        expect(getByTestId('level1MiniBoss-checkbox')).not.toBeDisabled();
    });

    test('boss task is disabled when mini bosses are not completed', () => {
        const toDoItems = {
            level1item1: { itemName: 'Task 1', completed: true },
            level1item2: { itemName: 'Task 2', completed: true },
            level1MiniBoss: { itemName: 'Mini Boss 1', completed: false },
            level2item1: { itemName: 'Task 3', completed: true },
            level2item2: { itemName: 'Task 4', completed: true },
            level2MiniBoss: { itemName: 'Mini Boss 2', completed: false },
            toDoBoss: { itemName: 'Final Boss', completed: false }
        };
        const { getByTestId } = render(<ToDoForm toDoItems={toDoItems} setToDoItems={mockSetToDoItems} />);

        expect(getByTestId('toDoBoss-checkbox')).toBeDisabled();
    });

    test('boss task is enabled when mini boss 1 is complete and mini-boss 2 is empty', () => {
        const toDoItems = {
            level1item1: { itemName: 'Task 1', completed: true },
            level1item2: { itemName: 'Task 2', completed: true },
            level1MiniBoss: { itemName: 'Mini Boss 1', completed: true },
            level2item1: { itemName: '', completed: false },
            level2item2: { itemName: '', completed: false },
            level2MiniBoss: { itemName: '', completed: false },
            toDoBoss: { itemName: 'Final Boss', completed: false }
        };
        const { getByTestId } = render(<ToDoForm toDoItems={toDoItems} setToDoItems={mockSetToDoItems} />);

        expect(getByTestId('toDoBoss-checkbox')).not.toBeDisabled();
    });

    test('boss task is enabled when mini bosses are completed', () => {
        const toDoItems = {
            level1item1: { itemName: 'Task 1', completed: true },
            level1item2: { itemName: 'Task 2', completed: true },
            level1MiniBoss: { itemName: 'Mini Boss 1', completed: true },
            level2item1: { itemName: 'Task 3', completed: true },
            level2item2: { itemName: 'Task 4', completed: true },
            level2MiniBoss: { itemName: 'Mini Boss 2', completed: true },
            toDoBoss: { itemName: 'Final Boss', completed: false }
        };
        const { getByTestId } = render(<ToDoForm toDoItems={toDoItems} setToDoItems={mockSetToDoItems} />);

        expect(getByTestId('toDoBoss-checkbox')).not.toBeDisabled();
    });
});