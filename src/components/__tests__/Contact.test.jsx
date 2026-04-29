import {render,screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

describe("Contact Component", () => {
    test("should render contact form", () => {
        render(<Contact />);
        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
    });
    
    test("should render button", () => {
        render(<Contact />);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    });
    
    
    // test("should render name", () => {
    //     render(<Contact />);
    //     const inputName = screen.getAllByPlaceholderText("Name");
    //     expect(inputName).toBeInTheDocument();
    // });
    test("should render inputs", () => {
        render(<Contact />);
        const inputText = screen.getAllByRole("textbox");
        expect(inputText.length).toBe(3);
    });
});