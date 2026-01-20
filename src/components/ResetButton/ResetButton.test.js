import { render } from "@testing-library/react";
import { ResetButton } from ".";

describe("ResetButton", () => {
    it("renders without crashing", () => {
        const mockResetFunction = jest.fn();
        render(<ResetButton resetToDoItems={mockResetFunction} />);
    });

    it("calls resetToDoItems when clicked", () => {
        const mockResetFunction = jest.fn();
        const { getByText } = render(<ResetButton resetToDoItems={mockResetFunction} />);

        const button = getByText("Reset List");
        button.click();

        expect(mockResetFunction).toHaveBeenCalled();
    });
});