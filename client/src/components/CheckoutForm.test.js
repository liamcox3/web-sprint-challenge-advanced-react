import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

// test("renders correctly", () => {
//     render(<CheckoutForm />);
// });

test("form header renders", () => {
    const { getByText } = render(<CheckoutForm />);

    const header = getByText(/checkout form/i);

    expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", () => {
    const {
        getByLabelText,
        getByTestId,
        getByText,
        findAllByText,
        findByText,
    } = render(<CheckoutForm />);

    const firstNameInput = getByLabelText(/first name:/i);
    const lastNameInput = getByLabelText(/last name:/i);
    const addressInput = getByLabelText(/address:/i);
    const cityInput = getByLabelText(/city/i);
    const stateInput = getByLabelText(/state/i);
    const zipInput = getByLabelText(/zip/i);

    fireEvent.change(firstNameInput, {
        target: { name: "firstName", value: "Ed" },
    });
    fireEvent.change(lastNameInput, {
        target: { name: "lastName", value: "Roberts" },
    });
    fireEvent.change(addressInput, {
        target: { name: "address", value: "345 king rd" },
    });
    fireEvent.change(cityInput, {
        target: { name: "city", value: "New York" },
    });
    fireEvent.change(stateInput, {
        target: { name: "state", value: "New York" },
    });
    fireEvent.change(zipInput, {
        target: { name: "zip", value: "45909" },
    });

    const submitButton = getByTestId("check");

    fireEvent.click(submitButton);

    const message = getByText(/You have ordered some plants! Woo-hoo!/i);

    expect(message).toBeInTheDocument();
});
