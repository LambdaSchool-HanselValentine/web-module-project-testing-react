import React from "react";
import { render, screen, userEvent, waitFor } from "@testing-library/react";
import App from "./App";
import Episode from "./components/Episode";

test("target dropdown", async () => {
	render(<App />);

	await waitFor(() => {
		const placeholder = screen.queryAllByPlaceholderText("Select an option");
		console.log(placeholder);
	});
});
