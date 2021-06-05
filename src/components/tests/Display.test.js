import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Display from "../Display";
import mockFetchShow from "../../api/fetchShow";
jest.mock("../../api/fetchShow");

const testShow = {
	name: "test show title",
	summary: "test summary",
	seasons: [
		{ id: 1, name: "season 1", episodes: [] },
		{ id: 2, name: "season 2", episodes: [] },
		{ id: 3, name: "season 3", episodes: [] },
	],
};

test("render Display component without errors", () => {
	render(<Display />);
});

test("when the fetch button is pressed, the show component will display", async () => {
	render(<Display />);

	mockFetchShow.mockResolvedValueOnce(testShow);

	const button = screen.queryByRole("button");
	userEvent.click(button);

	const show = await screen.findByTestId("show-container");
	expect(show).toBeInTheDocument();
});

test("when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data", async () => {
	render(<Display />);

	mockFetchShow.mockResolvedValueOnce(testShow);

	const button = screen.queryByRole("button");
	userEvent.click(button);

	const seasons = await screen.findAllByTestId("season-option");
	expect(seasons).toHaveLength(testShow.seasons.length);
});

test("when the fetch button is pressed, this function is called", async () => {
	const fakeFunction = jest.fn();
	render(<Display displayFunc={fakeFunction} />);

	mockFetchShow.mockResolvedValueOnce(testShow);
	const button = screen.queryByRole("button");
	userEvent.click(button);

	await waitFor(() => expect(fakeFunction).toHaveBeenCalled());
});

///Tasks:
//1. Add in necessary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
