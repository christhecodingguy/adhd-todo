import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import ToDoItem from '.';

describe('ToDoItem Component', () => {
    test('renders component successfully with provided props', () => {
        const completedFn = jest.fn();
        const setItemNameFn = jest.fn();

        const view = render(<ToDoItem itemName="to-do item"
            completed={false}
            setCompleted={completedFn}
            setItemName={setItemNameFn}
            testId="level1item1" />);

        expect(view.getByTestId('level1item1-checkbox')).toBeInTheDocument();
        expect(view.getByTestId('level1item1-input')).toBeInTheDocument();
    });

    test('calls completedFn with true when checkbox is clicked', () => {
        const completedFn = jest.fn();
        const setItemNameFn = jest.fn();

        const view = render(<ToDoItem itemName="to-do item"
            completed={false}
            setCompleted={completedFn}
            setItemName={setItemNameFn}
            testId="level1item1" />);

        expect(view.getByTestId('level1item1-checkbox')).toBeInTheDocument();
        expect(view.getByTestId('level1item1-input')).toBeInTheDocument();

        expect(view.getByTestId('level1item1-input')).toHaveValue('to-do item');

        view.getByTestId('level1item1-checkbox').click();
        expect(completedFn).toHaveBeenCalledWith(true);
    });

    test('calls setItemNameFn with new value when input is changed', () => {
        const completedFn = jest.fn();
        const setItemNameFn = jest.fn();

        const view = render(<ToDoItem itemName="to-do item"
            completed={false}
            setCompleted={completedFn}
            setItemName={setItemNameFn}
            testId="level1item1" />);

        fireEvent.change(view.getByTestId('level1item1-input'), { target: { value: 'new to-do item' } });

        expect(setItemNameFn).toHaveBeenCalledWith('new to-do item');
    });
});