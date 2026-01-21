import { render } from "@testing-library/react";
import { ResetButton } from ".";

jest.mock('../../shared/confirm.js', () => ({
    confirm: jest.fn(),
}));

import { confirm } from '../../shared/confirm.js';

describe("ResetButton", () => {
    it("renders without crashing", () => {
        const mockResetFunction = jest.fn();
        render(<ResetButton resetToDoItems={mockResetFunction} />);
    });

    it("calls resetToDoItems when clicked", () => {
        confirm.mockReturnValue({ then: (cb) => cb(true) }); // Simulate user confirming the action});
        const mockResetFunction = jest.fn();
        const { getByText } = render(<ResetButton resetToDoItems={mockResetFunction} />);

        const button = getByText("Reset List");
        button.click();

        expect(mockResetFunction).toHaveBeenCalled();
    });
});